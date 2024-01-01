// import React, { useState } from "react";

// export interface Student {
//   id: string;
//   name: string;
//   email: string;
//   phone: string;
//   // Add other fields if needed
// }

// interface TableProps {
//   students: Student[];
//   onDelete: (studentId: string) => void;
//   onUpdate: (updatedData: {
//     id: string;
//     name: string;
//     email: string;
//     phone: string;
//   }) => void;
// }


// const Table: React.FC<TableProps> = ({ students, onDelete, onUpdate }) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(7);

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = students.slice(indexOfFirstItem, indexOfLastItem);

//   const totalPages = Math.ceil(students.length / itemsPerPage);
//   const pageNumbers = [];
//   for (let i = 1; i <= totalPages; i++) {
//     pageNumbers.push(i);
//   }
//   const [isEditing, setIsEditing] = useState(false);
//   const [editData, setEditData] = useState({
//     id: "",
//     name: "",
//     email: "",
//     phone: "",
//   });

//   const handleEditClick = (student: Student) => {
//     setEditData({
//       id: student.id,
//       name: student.name,
//       email: student.email,
//       phone: student.phone,
//     });
//     setIsEditing(true);
//   };

//   const handleUpdate = () => {
//     onUpdate(editData);
//     setIsEditing(false);
//     setEditData({
//       id: "",
//       name: "",
//       email: "",
//       phone: "",
//     });
//   };

//   // Exclude the "__typename" field from the columns
//   const columns = Object.keys(students[0]).filter(
//     (column) => column !== "__typename"
//   ) as (keyof Student)[];


//   return (
//     <>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-300">
//           <thead>
//             <tr className="bg-gray-100">
//               {columns.map((column) => (
//                 <th
//                   key={column}
//                   className="py-2 px-4 border-b border-gray-300 font-semibold text-sm text-gray-700"
//                 >
//                   {column}
//                 </th>
//               ))}
//               <th className="py-2 px-4 border-b border-gray-300 font-semibold text-sm text-gray-700">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {students.map((student) => (
//               <tr key={student.id} className="hover:bg-gray-50">
//                 {columns.map((column) => (
//                   <td
//                     key={column}
//                     className="py-3 px-4 border-b border-gray-300 text-sm"
//                   >
//                     {student[column]}
//                   </td>
//                 ))}
//                 <td className="py-3 px-4 border-b border-gray-300 text-sm">
//                   <button
//                     onClick={() => onDelete(student.id)}
//                     className="text-red-500"
//                   >
//                     Delete
//                   </button>
//                   <button
//                     onClick={() => handleEditClick(student)}
//                     className="ml-2 text-blue-500"
//                   >
//                     Edit
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {isEditing && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center">
//             <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
//             <div className="bg-white p-8 rounded-lg z-10 max-w-md w-full">
//               <h2 className="text-2xl font-semibold mb-4">Edit Student</h2>
//               <div className="mb-4">
//                 <label
//                   htmlFor="name"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Name:
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   value={editData.name}
//                   onChange={(e) =>
//                     setEditData({ ...editData, name: e.target.value })
//                   }
//                   className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label
//                   htmlFor="email"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Email:
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   value={editData.email}
//                   onChange={(e) =>
//                     setEditData({ ...editData, email: e.target.value })
//                   }
//                   className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label
//                   htmlFor="phone"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Phone:
//                 </label>
//                 <input
//                   type="tel"
//                   id="phone"
//                   value={editData.phone}
//                   onChange={(e) =>
//                     setEditData({ ...editData, phone: e.target.value })
//                   }
//                   className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
//                 />
//               </div>
//               <button
//                 onClick={handleUpdate}
//                 className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
//               >
//                 Update
//               </button>
//             </div>
//           </div>
//         )}
        
   
//       </div>


//     </>

//   );
// };

// export default Table;


import React, { useState } from "react";

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  // Add other fields if needed
}

interface TableProps {
  students: Student[];
  onDelete: (studentId: string) => void;
  onUpdate: (updatedData: {
    id: string;
    name: string;
    email: string;
    phone: string;
  }) => void;
}

const Table: React.FC<TableProps> = ({ students, onDelete, onUpdate }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = students.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(students.length / itemsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
  });

  const handleEditClick = (student: Student) => {
    setEditData({
      id: student.id,
      name: student.name,
      email: student.email,
      phone: student.phone,
    });
    setIsEditing(true);
  };

  const handleUpdate = () => {
    onUpdate(editData);
    setIsEditing(false);
    setEditData({
      id: "",
      name: "",
      email: "",
      phone: "",
    });
  };

  // Exclude the "__typename" field from the columns
  const columns = Object.keys(students[0]).filter(
    (column) => column !== "__typename"
  ) as (keyof Student)[];

  return (
    <>
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
              <th className="py-2 px-4 border-b border-gray-300 font-semibold text-sm text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50">
                {columns.map((column) => (
                  <td
                    key={column}
                    className="py-3 px-4 border-b border-gray-300 text-sm"
                  >
                    {student[column]}
                  </td>
                ))}
                <td className="py-3 px-4 border-b border-gray-300 text-sm">
                  <button
                    onClick={() => onDelete(student.id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleEditClick(student)}
                    className="ml-2 text-blue-500"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-center items-center mt-4">
          <button
            onClick={() =>
              setCurrentPage((prevPage) =>
                prevPage > 1 ? prevPage - 1 : prevPage
              )
            }
            disabled={currentPage === 1}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer mx-2"
          >
            Previous
          </button>

          <div>
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => setCurrentPage(number)}
                className={`mx-2 ${
                  currentPage === number
                    ? "bg-blue-500 text-white"
                    : "bg-white text-blue-500"
                } hover:bg-blue-700 hover:text-white font-bold py-2 px-4 rounded cursor-pointer`}
              >
                {number}
              </button>
            ))}
          </div>

          <button
            onClick={() =>
              setCurrentPage((prevPage) =>
                prevPage < totalPages ? prevPage + 1 : prevPage
              )
            }
            disabled={currentPage === totalPages}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer mx-2"
          >
            Next
          </button>
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
          <div className="bg-white p-8 rounded-lg z-10 max-w-md w-full">
            <h2 className="text-2xl font-semibold mb-4">Edit Student</h2>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name:
              </label>
              <input
                type="text"
                id="name"
                value={editData.name}
                onChange={(e) =>
                  setEditData({ ...editData, name: e.target.value })
                }
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                value={editData.email}
                onChange={(e) =>
                  setEditData({ ...editData, email: e.target.value })
                }
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone:
              </label>
              <input
                type="tel"
                id="phone"
                value={editData.phone}
                onChange={(e) =>
                  setEditData({ ...editData, phone: e.target.value })
                }
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <button
              onClick={handleUpdate}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Update
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Table;
