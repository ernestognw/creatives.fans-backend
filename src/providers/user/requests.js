import { gql } from "@apollo/client";

const GET_USER = gql`
  query userByToken {
    userByToken {
      id
      username
      firstName
      lastName
      email
      profileImg
      description
      social {
        facebook
        instagram
        twitter
        website
      }
    }
  }
`;

export { GET_USER };
