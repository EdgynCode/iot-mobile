import { createSlice } from "@reduxjs/toolkit";
import {
  getStudentSubmissions,
  getSubmissionsByAssignment,
  gradeSubmission,
  revokeSubmission,
} from "../actions/submission.action";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const submissionReducer = createSlice({
  name: "submissions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStudentSubmissions.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStudentSubmissions.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getStudentSubmissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getSubmissionsByAssignment.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSubmissionsByAssignment.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getSubmissionsByAssignment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(gradeSubmission.pending, (state) => {
        state.loading = true;
      })
      .addCase(gradeSubmission.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(gradeSubmission.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(revokeSubmission.pending, (state) => {
        state.loading = true;
      })
      .addCase(revokeSubmission.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(revokeSubmission.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const { reducer } = submissionReducer;
export default reducer;
