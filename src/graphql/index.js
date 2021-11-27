import { ApolloClient, InMemoryCache, ApolloLink } from "@apollo/client";
import authLink from "./links/auth";
import httpLink from "./links/http";

const link = ApolloLink.from([authLink, httpLink]);

const mergePlural = (existing, incoming) => {
  return {
    info: incoming.info,
    results: [...(existing?.results ?? []), ...incoming.results],
  };
};

const client = new ApolloClient({
  link,
  credentials: "include",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          users: {
            keyArgs: ["id", "search", "supports", "supportedBy"],
            merge: mergePlural,
          },
          supports: {
            keyArgs: ["id", "search", "fan", "creative"],
            merge: mergePlural,
          },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-first",
      errorPolicy: "all",
    },
    query: {
      fetchPolicy: "cache-first",
      errorPolicy: "all",
    },
    mutate: {
      errorPolicy: "all",
    },
  },
});

export default client;
