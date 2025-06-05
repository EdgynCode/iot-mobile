import AssignmentService from "../services/assignment.service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "../slices/message";

export const createAssignment = createAsyncThunk(
  "Assignment/CreateAssignment",
  async (
    { id, classSessionId, title, description, dueDate, embeddedFile },
    thunkAPI
  ) => {
    try {
      const data = await AssignmentService.createAssignment(
        id,
        classSessionId,
        title,
        description,
        dueDate,
        embeddedFile
      );
      thunkAPI.dispatch(setMessage("The assignment was successfully created!"));
      return data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const getAllAssignments = createAsyncThunk(
  "Assignment/GetAllAssignments",
  async (_, thunkAPI) => {
    try {
      const data = await AssignmentService.getAllAssignments();
      thunkAPI.dispatch(setMessage("Assignments fetched successfully!"));
      return data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAssignmentsByClassId = createAsyncThunk(
  "Assignment/GetAssignmentsByClassId",
  async (classId, thunkAPI) => {
    try {
      const data = await AssignmentService.getAssignmentsByClassId(classId);
      thunkAPI.dispatch(
        setMessage("Assignments for class fetched successfully!")
      );
      return data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateAssignment = createAsyncThunk(
  "Assignment/UpdateAssignment",
  async ({ id, title, description, dueDate, embeddedFile }, thunkAPI) => {
    try {
      const data = await AssignmentService.updateAssignment(
        id,
        title,
        description,
        dueDate,
        embeddedFile
      );
      thunkAPI.dispatch(setMessage("Assignment updated successfully!"));
      return data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const removeAssignment = createAsyncThunk(
  "Assignment/RemoveAssignment",
  async (assignmentId, thunkAPI) => {
    try {
      const data = await AssignmentService.removeAssignment(assignmentId);
      thunkAPI.dispatch(setMessage("Assignment removed successfully!"));
      return data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
