import React from "react";
import { useMutation } from "@apollo/client";
import { MUTATION_DELETE_STUDENT } from "../pages/Home/Home"; // Replace with your actual GraphQL file

interface DeletePopupProps {
  studentId: string;
  onClose: () => void;
  onDelete: () => void;
}

const DeletePopup: React.FC<DeletePopupProps> = ({
  studentId,
  onClose,
  onDelete,
}) => {
  const [deleteStudent] = useMutation(MUTATION_DELETE_STUDENT);

  const handleDelete = async () => {
    try {
      await deleteStudent({ variables: { studentId } });
      onDelete();
    } catch (error) {
      console.error("Error deleting student:", error);
    } finally {
      onClose();
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-4">
        <p>Are you sure you want to delete this student?</p>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 mr-2"
        >
          Yes
        </button>
        <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2">
          No
        </button>
      </div>
    </div>
  );
};

export default DeletePopup;
