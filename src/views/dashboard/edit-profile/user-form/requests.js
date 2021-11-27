import { gql } from "@apollo/client";

const USERNAME_EXISTS = gql`
  query usernameExists($username: String!) {
    usernameExists(username: $username)
  }
`;

export { USERNAME_EXISTS };
