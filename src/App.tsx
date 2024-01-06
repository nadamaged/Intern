import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import {Home} from "./pages/Home/Home";
import SideBar from "./component/SideBar";
import Profile from "./component/Profile";

import "./App.css";

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:5002/",
  });

  return (
    <ApolloProvider client={client}>
      <div className="  mx-auto min-h-screen lg:max-w-10xl  border border-gray-200 rounded-md overflow-hidden   ">
        <div className="grid grid-cols-5  ">
          <SideBar />
          <div className="col-span-4 w-full">
            <Profile />
            <Home />
          </div>
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
