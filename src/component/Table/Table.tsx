// import React from "react";

// interface Student {
//   id: string;
//   name: string;
//   email: string;
//   phone: string;
//   dateJoined: string;
// }

// interface TableProps {
//   Students: Student[]; // Update the interface name here
// }

// const Table: React.FC<TableProps> = ({ Students }) => {
//   if (!Students || Students.length === 0) {
//     return <p>No data available</p>;
//   }

//   // Exclude the "__typename" field from the columns
//   const columns = Object.keys(Students[0]).filter(
//     (column) => column !== "__typename"
//   );

//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full bg-white border border-gray-300">
//         <thead>
//           <tr className="bg-gray-100">
//             {columns.map((column) => (
//               <th
//                 key={column}
//                 className="py-2 px-4 border-b border-gray-300 font-semibold text-sm text-gray-700"
//               >
//                 {column}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {Students.map((Student: any) => (
//             <tr key={Student.id} className="hover:bg-gray-50">
//               {columns.map((column) => (
//                 <td
//                   key={column}
//                   className="py-3 px-4 border-b border-gray-300 text-sm"
//                 >
//                   {Student[column]}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Table;



// import React, { useState } from "react";

// interface Student {
//  id: string;
//  name: string;
//  email: string;
//  phone: string;
//  dateJoined: string;
// }

// interface TableProps {
//  Students: Student[]; // Update the interface name here
// }

// const Table: React.FC<TableProps> = ({ Students }) => {
//  const [currentPage, setCurrentPage] = useState(1);
//  const [itemsPerPage, setItemsPerPage] = useState(7);

//  const indexOfLastItem = currentPage * itemsPerPage;
//  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//  const currentItems = Students.slice(indexOfFirstItem, indexOfLastItem);

//  if (!Students || Students.length === 0) {
//   return <p>No data available</p>;
//  }

//  const columns = Object.keys(Students[0]).filter(
//   (column) => column !== "__typename"
//  );

//  return (
//   <div>
//     <div className="overflow-x-auto">
//       <table className="min-w-full bg-white border border-gray-300">
//         <thead>
//           <tr className="bg-gray-100">
//             {columns.map((column) => (
//               <th
//                key={column}
//                className="py-2 px-4 border-b border-gray-300 font-semibold text-sm text-gray-700"
//               >
//                {column}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {currentItems.map((Student: any) => (
//             <tr key={Student.id} className="hover:bg-gray-50">
//               {columns.map((column) => (
//                <td
//                 key={column}
//                 className="py-3 px-4 border-b border-gray-300 text-sm"
//                >
//                 {Student[column]}
//                </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//     <button onClick={() => setCurrentPage(prevPage => prevPage - 1)} disabled={currentPage === 1} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer mx-5">
//       Previous
//     </button>
//     <button onClick={() => setCurrentPage(prevPage => prevPage + 1)} disabled={currentPage === Math.ceil(Students.length / itemsPerPage)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
//       Next
//     </button>
//   </div>
//  );
// };

// export default Table;



import React, { useState } from "react";

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
 const [currentPage, setCurrentPage] = useState(1);
 const [itemsPerPage, setItemsPerPage] = useState(7);

 const indexOfLastItem = currentPage * itemsPerPage;
 const indexOfFirstItem = indexOfLastItem - itemsPerPage;
 const currentItems = Students.slice(indexOfFirstItem, indexOfLastItem);

 const totalPages = Math.ceil(Students.length / itemsPerPage);
 const pageNumbers = [];
 for(let i=1 ; i<=totalPages; i++){
  pageNumbers.push(i);
 }

 if (!Students || Students.length === 0) {
 return <p>No data available</p>;
 }

 const columns = Object.keys(Students[0]).filter(
 (column) => column !== "__typename"
 );

 return (
 <div>
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
        {currentItems.map((Student: any) => (
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
  <div>
    {pageNumbers.map(number => (
      <button key={number} onClick={() => setCurrentPage(number)}>
        {number}
      </button>
    ))}
  </div>
  <button onClick={() => setCurrentPage(prevPage => prevPage - 1)} disabled={currentPage === 1} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer mx-5">
    Previous
  </button>
  <button onClick={() => setCurrentPage(prevPage => prevPage + 1)} disabled={currentPage === totalPages} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
    Next
  </button>
 </div>
 );
};

export default Table;
