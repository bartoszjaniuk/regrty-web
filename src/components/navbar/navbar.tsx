import { Box, Button, Flex, Link } from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link';
import { useLogoutMutation, useMeQuery } from 'generated/graphql';
import { isServer } from 'utils/isServer';

const Navbar = () => {
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();

  let body = null;
  // data is loading
  if (fetching) {
    // user not logged in
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link mr={2} color="white">
            LOGIN
          </Link>
        </NextLink>
        <NextLink href="/register">
          <Link color="white">REGISTER</Link>
        </NextLink>
      </>
    );
  }
  // use is logged in
  else {
    body = (
      <Flex>
        <Box mr={2}>{data.me.username}</Box>
        <Button isLoading={logoutFetching} variant={'link'} onClick={() => logout()}>
          Logout
        </Button>
      </Flex>
    );
  }
  return (
    <Flex bg="turquoise" p={4}>
      <Box ml={'auto'}>{body}</Box>
    </Flex>
  );
};

export default Navbar;
