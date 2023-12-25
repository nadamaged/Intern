import "./App.css";
import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Table from "./component/Table/Table";


const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://countries.trevorblades.com",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Table/>
    </ApolloProvider>
  );
}

export default App;