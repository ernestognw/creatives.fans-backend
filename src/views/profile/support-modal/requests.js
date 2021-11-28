import { gql } from "@apollo/client";

const SUPPORT = gql`
  mutation createSupport($support: SupportCreateInput!) {
    createSupport(support: $support) {
      id
    }
  }
`;

export { SUPPORT };
