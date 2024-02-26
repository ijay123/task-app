import { combineReducers } from "redux";
import {
  registerUserReducer,
  loginUserReducer,
  getUsersReducer,
  getUserReducer,
} from "./reducers/user";

import {
  registerTaskReducer,
  getTasksReducer,
  updateTaskReducer,
  deleteTaskReducer,
} from "./reducers/task";

export const combined = combineReducers({
  createdUser: registerUserReducer,
  loggedInUser: loginUserReducer,
  allUsers: getUsersReducer,
  singleUser: getUserReducer,
  createdTask: registerTaskReducer,
  getTasks: getTasksReducer,

  updateTask: updateTaskReducer,
  deleteTask: deleteTaskReducer,
});
