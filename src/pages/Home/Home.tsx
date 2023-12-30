import React from "react";
import { useQuery, gql, QueryResult } from "@apollo/client";
import Table from "../../component/Table/Table";

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateJoined: string;
}

interface QueryResultWithData {
  allStudents: Student[];
}

const QUERY_LIST_OF_STUDENTS = gql`
  query {
    allStudents {
      id
      name
      email
      phone
      dateJoined
    }
  }
`;

function Home() {
  const { data, loading, error }: QueryResult<QueryResultWithData> = useQuery(QUERY_LIST_OF_STUDENTS);

  console.log(data);

  return (
    <div className="listOfCountries">
      <div className="home">
        <div className="title">
          <h1>List Of Student</h1>
        </div>
        {loading && <h3>Data is loading...</h3>}
        {error && <h3>{error.message}</h3>}
        {data && <Table Students={data.allStudents} />}
      </div>
    </div>
  );
}

export default Home;
