import { gql } from "@apollo/client";

const GET_USERS = gql`
  query users($search: UserSearchInput!, $params: QueryParams!) {
    users(search: $search, params: $params) {
      info {
        count
        pages
        prev
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
