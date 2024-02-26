import express from "express";
const TaskRouter = express.Router();

import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
 
} from "../controllers/tasks/Tasks.js";
import { createTaskSchema } from "../controllers/tasks/TaskSchema.js";
import { validationMiddleware } from "../middlewares/validation.js";
import { verifyUser } from "../middlewares/verifyUser.js";
import { authorizeUser } from "../middlewares/authorizeUser.js";

TaskRouter.route("/")
  .post(
    verifyUser,
    validationMiddleware(createTaskSchema),
    authorizeUser(["admin", "regular"]),
    createTask
  )
  .get(verifyUser, getTasks);

TaskRouter.route("/:id")
  .patch(verifyUser, authorizeUser(["regular", "admin"]), updateTask)
  .delete(verifyUser, authorizeUser(["regular", "admin"]), deleteTask);

export default TaskRouter;
