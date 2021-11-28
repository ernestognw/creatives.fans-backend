import { gql } from "@apollo/client";

const DETACH_PAYMENT_METHOD = gql`
  mutation stripeDetachPaymentMethod($id: ID!) {
    stripeDetachPaymentMethod(id: $id)
  }
`;

export { DETACH_PAYMENT_METHOD };
