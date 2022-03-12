import { Box, Link } from '@chakra-ui/react';
import Layout from 'components/layout';
import { usePostsQuery } from 'generated/graphql';
import { withUrqlClient } from 'next-urql';
import React from 'react';
import { createUrqlClient } from 'utils/createUrqlClient';
import NextLink from 'next/link';

const Index = () => {
  const [{ data }] = usePostsQuery();
  return (
    <Layout>
      <NextLink href="/createPost">
        <Link>Create Post</Link>
      </NextLink>
      <Box backgroundColor="blue">
        {!data ? 'lol' : data.posts.map(p => <div key={p._id}>{p.title}</div>)}
      </Box>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
