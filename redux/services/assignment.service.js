import axiosInstance from "./axiosInstance";

const createAssignment = async (
  id,
  classSessionId,
  title,
  description,
  dueDate,
  embeddedFile
) => {
  try {
    const response = await axiosInstance.post("Assignment/CreateAssignment", {
      id,
      classSessionId,
      title,
      description,
      dueDate,
      embeddedFile,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error creating assignment:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

const getAllAssignments = async () => {
  try {
    const response = await axiosInstance.get("Assignment/GetAllAssignments");
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching assignment data:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

const getAssignmentsByClassId = async (classId) => {
  try {
    const response = await axiosInstance.get(
      `Assignment/GetAssignmentsByClassId?classId=${classId}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching assignment data:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

const updateAssignment = async (
  id,
  classSessionId,
  title,
  description,
  dueDate,
  embeddedFile
) => {
  try {
    const response = await axiosInstance.patch("Assignment/UpdateAssignment", {
      id,
      classSessionId,
      title,
      description,
      dueDate,
      embeddedFile,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error updating assignment:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

const removeAssignment = async (assigmentId) => {
  try {
    const response = await axiosInstance.delete(
      `Assignment/RemoveAssignment?assigmentId=${assigmentId}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error removing assignment:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

const AssignmentService = {
  createAssignment,
  getAllAssignments,
  getAssignmentsByClassId,
  updateAssignment,
  removeAssignment,
};

export default AssignmentService;
