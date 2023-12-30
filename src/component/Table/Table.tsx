import React from "react";

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateJoined: string;
}

interface TableProps {
  Students: Student[]; // Update the interface name here
}

const Table: React.FC<TableProps> = ({ Students }) => {
  if (!Students || Students.length === 0) {
    return <p>No data available</p>;
  }

  // Exclude the "__typename" field from the columns
  const columns = Object.keys(Students[0]).filter(
    (column) => column !== "__typename"
  );

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            {columns.map((column) => (
              <th
                key={column}
                className="py-2 px-4 border-b border-gray-300 font-semibold text-sm text-gray-700"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Students.map((Student: any) => (
            <tr key={Student.id} className="hover:bg-gray-50">
              {columns.map((column) => (
                <td
                  key={column}
                  className="py-3 px-4 border-b border-gray-300 text-sm"
                >
                  {Student[column]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

// import React from "react";

// interface TableProps {
//   Students: TestStudent[]; // Update the interface name here
// }

// const Table: React.FC<TableProps> = ({ Students }) => {
//   // Your table component code here
//   return <div>Your table component</div>;
// };

// export default Table;
