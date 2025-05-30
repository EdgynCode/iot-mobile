import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slice";
import classSessionReducer from "./slices/classSession.slice";
import labReducer from "./slices/lab.slice";
import deviceTypeReducer from "./slices/deviceType.slice";
import deviceReducer from "./slices/device.slice";
import studentReducer from "./slices/student.slice";
import classroomReducer from "./slices/classroom.slice";
import experimentReducer from "./slices/experiment.slice";
import assignmentReducer from "./slices/assignment.slice";
import groupReducer from "./slices/group.slice";
import submissionReducer from "./slices/submission.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    classSession: classSessionReducer,
    classrooms: classroomReducer,
    labs: labReducer,
    devicetypes: deviceTypeReducer,
    devices: deviceReducer,
    students: studentReducer,
    experiments: experimentReducer,
    assignments: assignmentReducer,
    groups: groupReducer,
    submissions: submissionReducer,
  },
  devTools: true,
});
