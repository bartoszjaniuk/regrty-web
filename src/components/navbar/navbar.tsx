import { Box, Flex, Link } from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link';

const Navbar = () => {
  return (
    <Flex bg="turquoise" p={4}>
      <Box ml={'auto'}>
        <NextLink href="/login">
          <Link mr={2} color="white">
            LOGIN
          </Link>
        </NextLink>
        <NextLink href="/register">
          <Link color="white">REGISTER</Link>
        </NextLink>
      </Box>
    </Flex>
  );
};

export default Navbar;
