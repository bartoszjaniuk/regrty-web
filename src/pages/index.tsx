import { Box, Button, Flex, Heading, Link, Spinner, Stack, Text } from '@chakra-ui/react';
import Layout from 'components/layout';
import { usePostsQuery } from 'generated/graphql';
import { withUrqlClient } from 'next-urql';
import React, { useState } from 'react';
import { createUrqlClient } from 'utils/createUrqlClient';
import NextLink from 'next/link';

const Index = () => {
  const [variables, setVariables] = useState({ limit: 10, cursor: null as string | null });
  const [{ data, fetching }] = usePostsQuery({
    variables,
  });

  if (!fetching && !data) {
    return <Box>💣 Something went very wrong ... </Box>;
  }

  return (
    <Layout>
      <Flex align={'center'}>
        <Heading p={2}>Regrty</Heading>
        <NextLink href="/createPost">
          <Link ml={'auto'}>Create Post</Link>
        </NextLink>
      </Flex>
      <Stack spacing={8}>
        {!data && fetching ? (
          <Spinner></Spinner>
        ) : (
          data!.posts.posts.map(p => (
            <Box key={p._id} shadow="md" p="5" borderWidth="1px">
              <Heading fontSize="xl">{p.title}</Heading>
              <Text mt={4}>{p.textSnippet}</Text>
            </Box>
          ))
        )}
      </Stack>
      {data && data.posts.hasMore ? (
        <Flex justifyContent={'center'}>
          <Button
            m="auto"
            my={8}
            colorScheme="orange"
            isLoading={fetching}
            onClick={() =>
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              })
            }
          >
            Load more
          </Button>
        </Flex>
      ) : (
        <div></div>
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
