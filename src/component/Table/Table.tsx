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
                  className="px-4 py-2 text-sm font-semibold  text-gray-500 uppercase"
                >
                  {column}
                </th>
              ))}
              <th className="px-4 py-2 text-sm font-semibold  text-gray-500 uppercase">
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
                    className="px-4 py-2 whitespace-nowrap text-gray-500"
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
                        <span className="text-black ">{student[column]}</span>
                      ) : (
                        student[column]
                      )}
                  </td>
                ))}
                <td className="px-4 py-2 whitespace-nowrap">
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
        <div className="flex justify-center items-center mt-4">
          <button
            onClick={() =>
              setCurrentPage((prevPage) =>
                prevPage > 1 ? prevPage - 1 : prevPage
              )
            }
            disabled={currentPage === 1}
            className="text-gray-500 font-bold py-2 px-4 rounded cursor-pointer"
          >
            Previous
          </button>

          <div className="flex space-x-2 items-center text-gray-500 font-bold">
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => setCurrentPage(number)}
                className={`${currentPage === number ? "text-white" : "text-gray-500"
                  } hover:bg-gray-200 hover:text-gray-700 font-bold py-2 px-4 rounded cursor-pointer`}
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
            className="text-gray-500 font-bold py-2 px-4 rounded cursor-pointer"
          >
            Next
          </button>
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
