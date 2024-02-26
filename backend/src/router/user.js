import express from "express";
import {
  createUserSchema,
  loginUserSchema,
  getUserSchema,
  
} from "../controllers/user/UserSchema.js";
import { validationMiddleware } from "../middlewares/validation.js";
const router = express.Router();
import {
  createUser,
  loginUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/user/User.js";
import { verifyUser } from "../middlewares/verifyUser.js";

router
  .route("/")
  .post(validationMiddleware(createUserSchema), createUser)
  .get(verifyUser, getUsers);
router
  .route("/login")
  .post(validationMiddleware(loginUserSchema), loginUser)
  .patch(updateUser)
  .delete(deleteUser);

router
  .route("/:id")
  .get(verifyUser, validationMiddleware(getUserSchema, "QUERY"), getUser)
  .patch(updateUser)
  .delete(deleteUser);

// middleware sits between the request and controller

export default router;
