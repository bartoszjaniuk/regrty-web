import React from 'react';
import { Provider, createClient } from 'urql';
const client = createClient({
  url: 'http://localhost:5000/graphql',
  fetchOptions: {
    credentials: 'include',
  },
});
const GraphQLProvider = ({ children }: { children: JSX.Element }) => {
  return <Provider value={client}>{children}</Provider>;
};

export default GraphQLProvider;
