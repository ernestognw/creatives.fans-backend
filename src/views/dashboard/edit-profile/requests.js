import { gql } from "@apollo/client";

const UPDATE_USER = gql`
  mutation updateUserByToken($user: UserUpdateInput!) {
    updateUserByToken(user: $user) {
      id
      username
      firstName
      lastName
      description
    }
  }
`;

export { UPDATE_USER };
