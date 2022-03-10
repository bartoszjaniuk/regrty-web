import { Box, Button } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import Wrapper from 'components/wrapper';
import CustomInput from 'shared/custom-input/custom-input';
import { useRegisterMutation } from 'generated/graphql';
import { toErrorMap } from 'utils/toErrorMap';
import { useRouter } from 'next/router';

interface RegisterProps {}

const RegisterPage = () => {
  const [, register] = useRegisterMutation();
  const router = useRouter();
  return (
    <Wrapper>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={async (values, { setErrors, resetForm }) => {
          console.log(values);
          const response = await register({ userCredentials: values });
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
          } else if (response.data?.register.user) {
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
              <Button mt={4} type="submit" isLoading={isSubmitting} colorScheme="blackAlpha">
                Register
              </Button>
            </Form>
          );
        }}
      </Formik>
    </Wrapper>
  );
};

export default RegisterPage;

// https://www.youtube.com/watch?v=I6ypD7qv3Z8&t=239s  2:20
