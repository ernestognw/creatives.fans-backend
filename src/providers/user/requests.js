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
      stripeCustomer {
        id
        paymentMethods {
          id
          card {
            id
            expirationMonth
            expirationYear
            brand
            funding
            last4
          }
        }
      }
    }
  }
`;

export { GET_USER };
