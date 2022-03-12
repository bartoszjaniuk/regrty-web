import { Box } from '@chakra-ui/react';
import React from 'react';

export type WrapperVariant = 'small' | 'regular';

interface WrapperProps {
  variant?: WrapperVariant;
  children: JSX.Element | JSX.Element[];
}

const Wrapper = ({ children, variant = 'regular' }: WrapperProps) => {
  return (
    <Box maxW={variant === 'regular' ? '800px' : '400px'} w="100%" mx="auto" mt="8">
      {children}
    </Box>
  );
};

export default Wrapper;
