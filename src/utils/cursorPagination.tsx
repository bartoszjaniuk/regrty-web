import { stringifyVariables } from '@urql/core';
import { Resolver } from '@urql/exchange-graphcache';

export const cursorPagination = (): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    // entityKey = 'Query', fieldName = 'posts'
    const { parentKey: entityKey, fieldName } = info;

    // RETURNS ALL QUERIES CONTAINED IN THE CACHE
    const allFields = cache.inspectFields(entityKey);

    // FILTER  QUERIES 'POSTS
    const postQueries = allFields.filter(field => field.fieldName === fieldName);
    const postQueriesSize = postQueries.length;

    // THERE IS NO DATA STORED IN THE CACHE
    if (postQueriesSize === 0) return undefined;

    // RETURNS Query.posts({"limit":10})
    const fieldKey = `${entityKey}.${fieldName}(${stringifyVariables(fieldArgs)})`;

    // RETURNS isInCache [
    //   'Post:267', 'Post:255',
    //   'Post:283', 'Post:218',
    //   'Post:207', 'Post:305',
    //   'Post:277', 'Post:208',
    //   'Post:229', 'Post:213'
    // ]
    const isInCache = cache.resolve(fieldKey, 'posts');

    // IF DATA FOR FIELD KEY IS NOT IN CACHE, TELL URQL TO FETCH IT FROM SERVER
    info.partial = !isInCache;

    const results: string[] = [];
    let hasMore = true;

    postQueries.forEach(fieldInfo => {
      const key = `${entityKey}.${fieldInfo.fieldKey}`;
      const data = cache.resolve(key, 'posts') as string[];
      const _hasMore = cache.resolve(key, 'hasMore');
      if (!_hasMore) {
        hasMore = _hasMore as boolean;
      }
      results.push(...data);
    });

    return { __typename: 'PaginatedPosts', hasMore, posts: results };
  };
};

// https://github.com/FormidableLabs/urql/blob/main/exchanges/graphcache/src/extras/simplePagination.ts
