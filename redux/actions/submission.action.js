import SubmissionService from "../services/submission.service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "../slices/message";

export const getStudentSubmissions = createAsyncThunk(
  "Submission/GetSubmissionsByStudent",
  async ({ studentId, assignmentId }, thunkAPI) => {
    try {
      const data = await SubmissionService.getStudentSubmissions(
        studentId,
        assignmentId
      );
      thunkAPI.dispatch(setMessage("Submission data fetched successfully!"));
      return data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getSubmissionsByAssignment = createAsyncThunk(
  "Submission/GetSubmissionsByAssignmentId",
  async (assignmentId, thunkAPI) => {
    try {
      const data = await SubmissionService.getSubmissionsByAssignment(
        assignmentId
      );
      thunkAPI.dispatch(setMessage("Submission data fetched successfully!"));
      return data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const gradeSubmission = createAsyncThunk(
  "Submission/GradeSubmission",
  async (formData, thunkAPI) => {
    try {
      const data = await SubmissionService.gradeSubmission(formData);
      thunkAPI.dispatch(setMessage("Submission graded successfully!"));
      return data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const revokeSubmission = createAsyncThunk(
  "Submission/RevokeSubmission",
  async (submissionId, thunkAPI) => {
    try {
      const data = await SubmissionService.revokeSubmission(submissionId);
      thunkAPI.dispatch(setMessage("Submission revoked successfully!"));
      return data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
