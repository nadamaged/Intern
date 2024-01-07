import React, { useState } from "react";
import DeletePopup from "../DeletePopup";

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
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
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const isTagsColumn = (column: string): column is keyof Student => {
    return column === "tags";
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = students.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(students.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

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
    setEditData({ id: "", name: "", email: "", phone: "" });
  };

  // Exclude the "__typename" field from the columns
  const columns = Object.keys(students[0]).filter(
    (column) => column !== "__typename"
  ) as (keyof Student)[];

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(
    null
  );

  const handleDeleteClick = (studentId: string) => {
    setSelectedStudentId(studentId);
    setShowDeletePopup(true);
  };

  const handleDeletePopupClose = () => {
    setSelectedStudentId(null);
    setShowDeletePopup(false);
  };

  const handleDelete = () => {
    handleDeletePopupClose();
  };

  return (
    <>
      <div className=" overflow-x-auto">
        <table className="min-w-full border">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column}
                  className="px-4 py-1 text-sm font-semibold  text-gray-500 uppercase"
                >
                  {column}
                </th>
              ))}
              <th className="px-4 pt-2 pb-2 text-sm font-semibold  text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((student) => (
              <tr key={student.id} className="hover:bg-gray-100">
                {columns.map((column) => (
                  <td
                    key={column}
                    className="px-3 pt-0 pb-3 whitespace-nowrap text-gray-500"
                  >
                    {isTagsColumn(column) && Array.isArray(student[column]) ? (
                      <div>
                        {(student[column] as any)[0]
                          .split(",")
                          .map((tag: string, index: number) => (
                            <span
                              key={index}
                              className={`${tag.trim() === "football"
                                  ? "bg-green-100 text-light-green-800 rounded-full px-2"
                                  : ""
                                } ${tag.trim() === "supplay ch"
                                  ? "bg-pink-100 text-light-pink-800 rounded-full px-2"
                                  : ""
                                }`}
                            >
                              {tag.trim()}
                            </span>
                          ))}
                      </div>
                    ) : // Check for "name" column and apply styles accordingly
                      column === "name" ? (
                        <span className="text-black font-semibold">
                          {student[column]}
                        </span>
                      ) : (
                        student[column]
                      )}
                  </td>
                ))}
                <td className="px-4 pt-0 pb-2 whitespace-nowrap">
                  <button
                    onClick={() => handleEditClick(student)}
                    className="text-blue-500 mr-3"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDeleteClick(student.id)}
                    className="text-red-500 mr-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* pagination */}
        <div className="flex items-center justify-center pt-0 pb-0 lg:px-0 sm:px-4 px-4 fixed bottom-0 right-0 w-4/5 bg-white p-0">
          <div className="lg:w-5/5 w-full  flex items-center justify-between border-t border-gray-200 ">
            <div className="flex items-center py-3 px-3 text-gray-600 hover:text-indigo-700 cursor-pointer">
              <svg
                width="14"
                height="8"
                viewBox="0 0 11 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.1665 4H12.8332"
                  stroke="currentColor"
                  stroke-width="1.55"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M1.1665 4L4.49984 7.33333"
                  stroke="currentColor"
                  stroke-width="1.35"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M1.1665 4.00002L4.49984 0.666687"
                  stroke="currentColor"
                  stroke-width="1.55"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <button
                onClick={() =>
                  setCurrentPage((prevPage) =>
                    prevPage > 1 ? prevPage - 1 : prevPage
                  )
                }
                disabled={currentPage === 1}
                className="text-gray-500 font-bold py-2 px-2 rounded cursor-pointer"
              >
                Previous
              </button>
            </div>
            <div className="sm:flex hidden py-0">
              {pageNumbers.map((number) => (
                <button
                  key={number}
                  onClick={() => setCurrentPage(number)}
                  className={`${currentPage === number ? "text-indigo-700" : "text-gray-500"
                    } inline-flex items-center px-4 py-1 text-sm font-semibold dark:bg-violet-400 dark:text-gray-900 hover:text-indigo-700 `}
                >
                  {number}
                </button>
              ))}
            </div>
            <div className="flex items-center py-2 px-3 text-gray-600 hover:text-indigo-700 cursor-pointer">
              <button
                onClick={() =>
                  setCurrentPage((prevPage) =>
                    prevPage < totalPages ? prevPage + 1 : prevPage
                  )
                }
                disabled={currentPage === totalPages}
                className="text-gray-500 font-bold py-2 px-3 rounded cursor-pointer"
              >
                Next
              </button>
              <svg
                width="14"
                height="8"
                viewBox="0 0 14 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.1665 4H12.8332"
                  stroke="currentColor"
                  stroke-width="1.55"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9.5 7.33333L12.8333 4"
                  stroke="currentColor"
                  stroke-width="1.55"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9.5 0.666687L12.8333 4.00002"
                  stroke="currentColor"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>


      {/* ////////////////////////////////////////////////////////////////////////////// */}

      {/* delete */}
      {showDeletePopup && (
        <DeletePopup
          studentId={selectedStudentId || ""}
          onClose={handleDeletePopupClose}
          onDelete={handleDelete}
        />
      )}
      {/* delete */}

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