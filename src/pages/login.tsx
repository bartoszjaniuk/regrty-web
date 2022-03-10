import { Box, Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import Wrapper from 'components/wrapper';
import CustomInput from 'shared/custom-input/custom-input';
import { useLoginMutation } from 'generated/graphql';
import { toErrorMap } from 'utils/toErrorMap';
import { useRouter } from 'next/router';

interface LoginProps {}

const LoginPage = () => {
  const [, login] = useLoginMutation();
  const router = useRouter();
  return (
    <Wrapper>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={async (values, { setErrors, resetForm }) => {
          console.log(values);
          const response = await login({ userCredentials: values });
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            router.push('/');
            resetForm();
          }
        }}
      >
        {({ values, handleChange, isSubmitting }) => {
          const { username, password } = values;
          return (
            <Form>
              <Box>
                <CustomInput name="username" placeholder="Username" label="Username" type="text" />
              </Box>
              <Box mt={4}>
                <CustomInput
                  name="password"
                  placeholder="Password"
                  label="Password"
                  type="password"
                />
              </Box>
              <Button mt={4} type="submit" isLoading={isSubmitting} colorScheme="purple">
                Login
              </Button>
            </Form>
          );
        }}
      </Formik>
    </Wrapper>
  );
};

export default LoginPage;
