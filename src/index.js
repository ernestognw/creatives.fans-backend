import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import client from "@graphql";
import { UserProvider } from "@providers/user";
import { LayoutProvider } from "@providers/layout";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router basename="/">
        <ChakraProvider>
          <UserProvider>
            <LayoutProvider>
              <App />
            </LayoutProvider>
          </UserProvider>
        </ChakraProvider>
      </Router>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
