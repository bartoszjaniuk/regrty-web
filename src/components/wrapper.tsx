import { Box } from '@chakra-ui/react';
import React from 'react';

interface WrapperProps {
  variant?: 'small' | 'regular';
  children: JSX.Element;
}

const Wrapper = ({ children, variant = 'regular' }: WrapperProps) => {
  return (
    <Box maxW={variant === 'regular' ? '800px' : '400px'} w="100%" mx="auto" mt="8">
      {children}
    </Box>
  );
};

export default Wrapper;
