import { gql } from "@apollo/client";

const REQUEST_STRIPE_INTENT = gql`
  query stripeSetupIntentByToken {
    stripeSetupIntentByToken {
      clientSecret
    }
  }
`;

export { REQUEST_STRIPE_INTENT };
