import React from 'react';
import Navbar from './navbar/navbar';
import Wrapper, { WrapperVariant } from './wrapper';

interface LayoutProps {
  variant?: WrapperVariant;
  children: JSX.Element | JSX.Element[];
}

const Layout = ({ variant, children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <Wrapper variant={variant}>{children}</Wrapper>
    </>
  );
};

export default Layout;
