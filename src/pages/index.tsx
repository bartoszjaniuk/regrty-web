import { Box } from '@chakra-ui/react';
import Navbar from 'components/navbar/navbar';
import { usePostsQuery } from 'generated/graphql';
import { withUrqlClient } from 'next-urql';
import React from 'react';
import { createUrqlClient } from 'utils/createUrqlClient';

const Index = () => {
  const [{ data }] = usePostsQuery();
  return (
    <div>
      <Navbar />
      <p>Index</p>
      <Box backgroundColor="blue">
        {!data ? 'lol' : data.posts.map(p => <div key={p._id}>{p.title}</div>)}
      </Box>
    </div>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
