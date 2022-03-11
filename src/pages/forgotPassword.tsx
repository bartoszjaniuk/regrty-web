import { Box, Flex, Button } from '@chakra-ui/react';
import Wrapper from 'components/wrapper';
import { Form, Formik } from 'formik';
import { useForgotPasswordMutation } from 'generated/graphql';
import { withUrqlClient } from 'next-urql';
import router from 'next/router';
import React from 'react';
import CustomInput from 'shared/custom-input/custom-input';
import { createUrqlClient } from 'utils/createUrqlClient';
import { toErrorMap } from 'utils/toErrorMap';

const ForgotPassword = () => {
  const [, forgotPassword] = useForgotPasswordMutation();
  return (
    <Wrapper>
      <Formik
        initialValues={{ email: '' }}
        onSubmit={async (values, { setErrors, resetForm }) => {
          console.log(values);
          const response = await forgotPassword({ email: values.email });
          if (response.data?.forgotPassword.errors) {
            setErrors(toErrorMap(response.data.forgotPassword.errors));
          } else if (response.data?.forgotPassword.isCompleted) {
            router.push('/');
            resetForm();
          }
        }}
      >
        {({ isSubmitting }) => {
          return (
            <Form>
              <Box>
                <CustomInput name="email" placeholder="email" label="email" type="email" />
              </Box>
              <Box mt={4}>
                <Button type="submit" isLoading={isSubmitting} colorScheme="purple">
                  Forgot password
                </Button>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
