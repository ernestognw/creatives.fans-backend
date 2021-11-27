import { gql } from "@apollo/client";

const GET_USERS = gql`
  query users(
    $search: UserSearchInput!
    $params: QueryParams!
    $supports: QueryOperators
  ) {
    users(search: $search, params: $params, supports: $supports) {
      info {
        count
        next
      }
      results {
        id
        username
        firstName
        lastName
        profileImg
      }
    }
  }
`;

export { GET_USERS };
