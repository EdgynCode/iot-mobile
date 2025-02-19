import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slice";
import classSessionReducer from "./slices/classSession.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    classSession: classSessionReducer,
  },
  devTools: true,
});
