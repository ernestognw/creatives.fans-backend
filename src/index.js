import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <Router basename="/">
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
