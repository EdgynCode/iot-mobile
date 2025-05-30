import { createAsyncThunk } from "@reduxjs/toolkit";
import LabService from "../services/lab.service";
import { setMessage } from "../slices/message.js";

export const createLab = createAsyncThunk(
  "Lab/CreateLab",
  async ({ name, pathImage }, thunkAPI) => {
    try {
      const learner = await LabService.createLab(name, pathImage);
      thunkAPI.dispatch(setMessage("Lab created successfully!"));
      return learner;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to create lab";
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllLabs = createAsyncThunk(
  "Lab/GetAllLabs",
  async (_, thunkAPI) => {
    try {
      const experiments = await LabService.getAllLabs();
      return experiments;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch lab data";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteLabs = createAsyncThunk(
  "Lab/DeleteLabs",
  async (labIds, thunkAPI) => {
    try {
      const experiments = await LabService.deleteLabs(labIds);
      return experiments;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to delete labs";
      return thunkAPI.rejectWithValue(message);
    }
  }
);
