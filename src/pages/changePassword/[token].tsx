import { Box, Button } from '@chakra-ui/react';
import Wrapper from 'components/wrapper';
import { Form, Formik } from 'formik';
import { useResetPasswordMutation } from 'generated/graphql';
import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import CustomInput from 'shared/custom-input/custom-input';
import { createUrqlClient } from 'utils/createUrqlClient';
import { toErrorMap } from 'utils/toErrorMap';

const ChangePassword = () => {
  const [{}, resetPassword] = useResetPasswordMutation();
  const [tokenError, setTokenError] = useState('');
  const router = useRouter();
  const token = typeof router.query.token === 'string' ? router.query.token : '';
  return (
    <Wrapper>
      <Formik
        initialValues={{ newPassword: '' }}
        onSubmit={async (values, { setErrors, resetForm }) => {
          const response = await resetPassword({
            newPassword: values.newPassword,
            token,
          });
          if (response.data?.resetPassword.errors) {
            const errorMap = toErrorMap(response.data.resetPassword.errors);

            if ('token' in errorMap) {
              setTokenError(errorMap.token);
            }
            setErrors(toErrorMap(response.data.resetPassword.errors));
          } else if (response.data?.resetPassword.user) {
            router.push('/');
            resetForm();
          }
        }}
      >
        {({ isSubmitting }) => {
          return (
            <Form>
              <Box>
                <CustomInput
                  name="newPassword"
                  placeholder="New Password"
                  label="New Password"
                  type="password"
                />
                <Box color="red">{tokenError ? tokenError : ''}</Box>
              </Box>
              <Button mt={4} type="submit" isLoading={isSubmitting} colorScheme="linkedin">
                Update password
              </Button>
            </Form>
          );
        }}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(ChangePassword);
