import { createSlice } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";
import {
  getCurrentUser,
  login,
  logout,
  updateUserInfo,
} from "../actions/auth.action";

const initialState = {
  isLoggedIn: false,
  user: null,
  roles: null,
};

const authReducer = createSlice({
  name: "Account",
  initialState,
  reducers: {
    setUser(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.roles = action.payload.roles;
    },
    clearUser(state) {
      state.isLoggedIn = false;
      state.user = null;
      state.roles = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload.user;
        state.roles = action.payload.roles;
        SecureStore.setItemAsync("user", JSON.stringify(action.payload.user));
      })
      .addCase(login.rejected, (state) => {
        state.isLoggedIn = false;
        state.user = null;
        state.roles = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.user = null;
        state.roles = null;
        SecureStore.deleteItemAsync("user");
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.user = null;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateUserInfo.rejected, (state) => {
        state.user = null;
      });
  },
});

const { reducer } = authReducer;
export default reducer;
