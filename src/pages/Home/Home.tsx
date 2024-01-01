import React, { FC, ReactElement } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import Table, { Student } from "../../component/Table/Table";

const QUERY_LIST_OF_STUDENTS = gql`
  query {
    allStudents {
      name
      email
      phone
      role
      id
      tags
      dateJoined
    }
  }
`;

interface RemoveStudentData {
  removeStudent: Student;
}

interface RemoveStudentVariables {
  studentId: string;
}

const MUTATION_DELETE_STUDENT = gql`
  mutation removeStudent($studentId: ID!) {
    removeStudent(id: $studentId) {
      name
      email
      phone
      role
      id
      tags
      dateJoined
    }
  }
`;

interface UpdateStudentData {
  updateStudent: Student;
}

interface UpdateStudentVariables {
  studentId: string;
  name: string;
  email: string;
  phone: string;
}

const MUTATION_UPDATE_STUDENT = gql`
  mutation updateStudent(
    $studentId: ID!
    $name: String!
    $email: String!
    $phone: String!
  ) {
    updateStudent(id: $studentId, name: $name, email: $email, phone: $phone) {
      id
      name
      email
      phone
      dateJoined
    }
  }
`;

interface HomeProps {}

const Home: FC<HomeProps> = (): ReactElement => {
  const { data, loading, error } = useQuery(QUERY_LIST_OF_STUDENTS);
  const [removeStudent] = useMutation<
    RemoveStudentData,
    RemoveStudentVariables
  >(MUTATION_DELETE_STUDENT);
  const [updateStudent] = useMutation<
    UpdateStudentData,
    UpdateStudentVariables
  >(MUTATION_UPDATE_STUDENT);

  const handleDelete = async (studentId: string): Promise<void> => {
    try {
      await removeStudent({
        variables: { studentId },
        refetchQueries: [{ query: QUERY_LIST_OF_STUDENTS }],
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (updatedData: {
    id: string;
    name: string;
    email: string;
    phone: string;
  }): Promise<void> => {
    try {
      await updateStudent({
        variables: {
          studentId: updatedData.id,
          name: updatedData.name,
          email: updatedData.email,
          phone: updatedData.phone,
        },
        refetchQueries: [{ query: QUERY_LIST_OF_STUDENTS }],
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="listOfCountries">
      <div className="home">
        <div className="title">
          <h1>List Of Student</h1>
        </div>
        {loading && <h3>Data is loading...</h3>}
        {error && <h3>{error.message}</h3>}
        {data && (
          <Table
            students={data.allStudents}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
