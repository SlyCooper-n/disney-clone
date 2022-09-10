import { gql } from "@apollo/client";

export const CREATE_ACCOUNT = gql`
  mutation CreateAccount(
    $firestoreId: String!
    $profileUsername: String!
    $avatarUrl: String
  ) {
    createAccount(
      data: {
        firestoreId: $firestoreId
        profiles: {
          create: { username: $profileUsername, avatarUrl: $avatarUrl }
        }
      }
    ) {
      id
    }
  }
`;

export const PUBLISH_INITIAL_ACCOUNT = gql`
  mutation PublishAccount($firestoreId: String!) {
    publishAccount(to: PUBLISHED, where: { firestoreId: $firestoreId }) {
      id
    }

    publishManyProfiles(to: PUBLISHED) {
      count
    }
  }
`;

export const ADD_PROFILE = gql`
  mutation AddProfile(
    $firestoreId: String!
    $username: String!
    $avatarUrl: String
  ) {
    updateAccount(
      where: { firestoreId: $firestoreId }
      data: {
        profiles: { create: { username: $username, avatarUrl: $avatarUrl } }
      }
    ) {
      profiles(where: { username: $username }) {
        id
        username
        avatarUrl
      }
    }
  }
`;

export const PUBLISH_ACCOUNT_AND_PROFILE = gql`
  mutation PublishAccount($firestoreId: String!) {
    publishAccount(to: PUBLISHED, where: { firestoreId: $firestoreId }) {
      id
    }

    publishManyProfilesConnection(to: PUBLISHED) {
      edges {
        node {
          id
        }
      }
    }
  }
`;
