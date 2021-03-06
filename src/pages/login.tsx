import { Box, Button, Flex, Link } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import Wrapper from 'components/wrapper';
import CustomInput from 'shared/custom-input/custom-input';
import { useLoginMutation } from 'generated/graphql';
import { toErrorMap } from 'utils/toErrorMap';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from 'utils/createUrqlClient';
import NextLink from 'next/link';

interface LoginProps {}

const LoginPage = () => {
  const [, login] = useLoginMutation();
  const router = useRouter();
  return (
    <Wrapper>
      <Formik
        initialValues={{ usernameOrEmail: '', password: '' }}
        onSubmit={async (values, { setErrors, resetForm }) => {
          console.log(values);
          const response = await login({ ...values });
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            if (typeof router.query.next === 'string') {
              router.push(router.query.next);
            } else {
              router.push('/');
            }
            resetForm();
          }
        }}
      >
        {({ isSubmitting }) => {
          return (
            <Form>
              <Box>
                <CustomInput
                  name="usernameOrEmail"
                  placeholder="Username or Email"
                  label="Username or Email"
                  type="text"
                />
              </Box>
              <Box mt={4}>
                <CustomInput
                  name="password"
                  placeholder="Password"
                  label="Password"
                  type="password"
                />
              </Box>
              <Flex mt={4}>
                <Button type="submit" isLoading={isSubmitting} colorScheme="purple">
                  Login
                </Button>
                <NextLink href="/forgotPassword">
                  <Link ml={'auto'}>forgot password?</Link>
                </NextLink>
              </Flex>
            </Form>
          );
        }}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(LoginPage);
