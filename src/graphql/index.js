import { ApolloClient, InMemoryCache, ApolloLink } from "@apollo/client";
import authLink from "./links/auth";
import httpLink from "./links/http";

const link = ApolloLink.from([authLink, httpLink]);

const client = new ApolloClient({
  link,
  credentials: "include",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          users: {
            keyArgs: false,
            merge: (existing, incoming) => {
              return {
                info: incoming.info,
                results: [...(existing?.results ?? []), ...incoming.results],
              };
            },
          },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
      errorPolicy: "all",
    },
    query: {
      fetchPolicy: "cache-and-network",
      errorPolicy: "all",
    },
    mutate: {
      errorPolicy: "all",
    },
  },
});

export default client;
