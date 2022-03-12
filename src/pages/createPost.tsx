import { Box, Flex, Button } from '@chakra-ui/react';
import Layout from 'components/layout';
import { useIsAuth } from 'custom-hooks/useIsAuth';
import { Formik, Form } from 'formik';
import { useCreatePostMutation } from 'generated/graphql';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import CustomInput from 'shared/custom-input/custom-input';
import { createUrqlClient } from 'utils/createUrqlClient';

const CreatePost = () => {
  const router = useRouter();
  useIsAuth();
  const [, createPost] = useCreatePostMutation();
  return (
    <Layout variant="small">
      <Formik
        initialValues={{ title: '', text: '' }}
        onSubmit={async (values, { setErrors, resetForm }) => {
          const { error } = await createPost({ postInput: values });
          console.log('error: ', error);
          if (!error) {
            router.push('/');
          }
        }}
      >
        {({ isSubmitting }) => {
          return (
            <Form>
              <Box>
                <CustomInput name="title" placeholder="title" label="title" type="text" />
              </Box>
              <Box mt={4}>
                <CustomInput textarea name="text" placeholder="text" label="text" type="text" />
              </Box>
              <Flex mt={4}>
                <Button type="submit" isLoading={isSubmitting} colorScheme="purple">
                  Create post
                </Button>
              </Flex>
            </Form>
          );
        }}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreatePost);
