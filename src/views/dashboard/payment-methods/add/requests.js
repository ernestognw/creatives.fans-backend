import { gql } from "@apollo/client";

const REQUEST_STRIPE_INTENT = gql`
  query setupIntentByToken {
    setupIntentByToken {
      clientSecret
    }
  }
`;

export { REQUEST_STRIPE_INTENT };
