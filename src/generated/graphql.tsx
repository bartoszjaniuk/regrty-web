import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type ForgotPasswordResponse = {
  __typename?: 'ForgotPasswordResponse';
  errors?: Maybe<Array<FieldError>>;
  isCompleted?: Maybe<Scalars['Boolean']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost?: Maybe<Post>;
  deletePost: Scalars['Boolean'];
  forgotPassword: ForgotPasswordResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  resetPassword: UserResponse;
  updatePost?: Maybe<Post>;
};


export type MutationCreatePostArgs = {
  postInput: PostInput;
};


export type MutationDeletePostArgs = {
  id: Scalars['Int'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationRegisterArgs = {
  userCredentials: UserCredentials;
};


export type MutationResetPasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationUpdatePostArgs = {
  id: Scalars['Int'];
  title?: InputMaybe<Scalars['String']>;
};

export type PaginatedPosts = {
  __typename?: 'PaginatedPosts';
  hasMore: Scalars['Boolean'];
  posts: Array<Post>;
};

export type Post = {
  __typename?: 'Post';
  _id: Scalars['Float'];
  createdAt: Scalars['String'];
  creatorId: Scalars['Float'];
  points: Scalars['String'];
  text: Scalars['String'];
  textSnippet: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type PostInput = {
  text: Scalars['String'];
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  me?: Maybe<User>;
  post?: Maybe<Post>;
  posts: PaginatedPosts;
};


export type QueryPostArgs = {
  id: Scalars['Int'];
};


export type QueryPostsArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['Float'];
  createdAt: Scalars['String'];
  email: Scalars['String'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type UserCredentials = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type RegularErrorFragment = { __typename?: 'FieldError', field: string, message: string };

export type RegularUserFragment = { __typename?: 'User', _id: number, username: string };

export type RegularUserResponseFragment = { __typename?: 'UserResponse', user?: { __typename?: 'User', _id: number, username: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null };

export type CreatePostMutationVariables = Exact<{
  postInput: PostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost?: { __typename?: 'Post', creatorId: number, text: string, title: string, createdAt: string, points: string } | null };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: { __typename?: 'ForgotPasswordResponse', isCompleted?: boolean | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type LoginMutationVariables = Exact<{
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', user?: { __typename?: 'User', _id: number, username: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  userCredentials: UserCredentials;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', user?: { __typename?: 'User', _id: number, username: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type ResetPasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: { __typename?: 'UserResponse', user?: { __typename?: 'User', _id: number, username: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', _id: number, username: string } | null };

export type PostsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type PostsQuery = { __typename?: 'Query', posts: { __typename?: 'PaginatedPosts', hasMore: boolean, posts: Array<{ __typename?: 'Post', _id: number, createdAt: string, updatedAt: string, title: string, textSnippet: string, points: string, creatorId: number }> } };

export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  _id
  username
}
    `;
export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  user {
    ...RegularUser
  }
  errors {
    ...RegularError
  }
}
    ${RegularUserFragmentDoc}
${RegularErrorFragmentDoc}`;
export const CreatePostDocument = gql`
    mutation CreatePost($postInput: PostInput!) {
  createPost(postInput: $postInput) {
    creatorId
    text
    title
    createdAt
    points
  }
}
    `;

export function useCreatePostMutation() {
  return Urql.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument);
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email) {
    errors {
      field
      message
    }
    isCompleted
  }
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const LoginDocument = gql`
    mutation Login($password: String!, $usernameOrEmail: String!) {
  login(password: $password, usernameOrEmail: $usernameOrEmail) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($userCredentials: UserCredentials!) {
  register(userCredentials: $userCredentials) {
    user {
      ...RegularUser
    }
    errors {
      ...RegularError
    }
  }
}
    ${RegularUserFragmentDoc}
${RegularErrorFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const ResetPasswordDocument = gql`
    mutation ResetPassword($token: String!, $newPassword: String!) {
  resetPassword(token: $token, newPassword: $newPassword) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useResetPasswordMutation() {
  return Urql.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument);
};
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const PostsDocument = gql`
    query Posts($limit: Int!, $cursor: String) {
  posts(limit: $limit, cursor: $cursor) {
    posts {
      _id
      createdAt
      updatedAt
      title
      textSnippet
      points
      creatorId
    }
    hasMore
  }
}
    `;

export function usePostsQuery(options: Omit<Urql.UseQueryArgs<PostsQueryVariables>, 'query'>) {
  return Urql.useQuery<PostsQuery>({ query: PostsDocument, ...options });
};