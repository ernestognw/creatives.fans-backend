import { gql } from "@apollo/client";

const GET_SUPPORTS_SENT = gql`
  query supports(
    $params: QueryParams!
    $search: SupportSearchInput!
    $sortBy: SupportSortInput!
    $fan: QueryOperators
  ) {
    supports(params: $params, search: $search, sortBy: $sortBy, fan: $fan) {
      info {
        next
        count
      }
      results {
        id
        description
        amount
        fan {
          id
          username
          firstName
          lastName
          profileImg
        }
        creative {
          id
          username
          firstName
          lastName
          profileImg
        }
      }
    }
  }
`;

export { GET_SUPPORTS_SENT };
