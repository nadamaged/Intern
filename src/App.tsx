import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Home from "./pages/Home/Home";

import "./App.css";

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:5002/",
  });

  return (
    <ApolloProvider client={client}>
 <Home />
      
    </ApolloProvider>
  );
}

export default App;
