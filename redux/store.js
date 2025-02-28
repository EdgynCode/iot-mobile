import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slice";
import classSessionReducer from "./slices/classSession.slice";
import labReducer from "./slices/lab.slice";
import deviceTypeReducer from "./slices/deviceType.slice";
import deviceReducer from "./slices/device.slice";
import studentReducer from "./slices/student.slice";
import classroomReducer from "./slices/classroom.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    classSession: classSessionReducer,
    classrooms: classroomReducer,
    labs: labReducer,
    devicetypes: deviceTypeReducer,
    devices: deviceReducer,
    students: studentReducer,
  },
  devTools: true,
});
