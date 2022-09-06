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
