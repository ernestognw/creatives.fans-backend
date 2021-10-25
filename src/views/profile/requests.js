import { gql } from '@apollo/client';

const GET_USER = gql`
  query user($username: String!) {
    user(username: $username) {
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
      createdAt
    }
  }
`

export { GET_USER }
