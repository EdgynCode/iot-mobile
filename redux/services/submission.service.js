import axiosInstance from "./axiosInstance";

const getStudentSubmissions = async (studentId, assignmentId) => {
  try {
    const response = await axiosInstance.get(
      `Submission/GetSubmissionsByStudent?studentId=${studentId}&assignmentId=${assignmentId}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching submission data:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

const getSubmissionsByAssignment = async (assignmentId) => {
  try {
    const response = await axiosInstance.get(
      `Submission/GetSubmissionsByAssignmentId?assignmentId=${assignmentId}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching submission data:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

const gradeSubmission = async (formData) => {
  try {
    const response = await axiosInstance.patch(
      "Submission/GradeSubmission",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error grading assignment:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

const revokeSubmission = async (submissionId) => {
  try {
    const response = await axiosInstance.delete(
      `Submission/RevokeSubmission?submissionId=${submissionId}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error revoking submission:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

const SubmissionService = {
  getStudentSubmissions,
  getSubmissionsByAssignment,
  gradeSubmission,
  revokeSubmission,
};

export default SubmissionService;
