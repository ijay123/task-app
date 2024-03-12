import TaskModel from "../../model/task/TaskList.js";
import httpStatus from "http-status";
import { paginate } from "../../util/paginate.js";

const createTask = async (req, res) => {
  //collect the data from req body
  const data = req.body;
  const userId = req.user.id;

  const titleExist = await TaskModel.findOne({
    title: data.title,
    userId: data.userId,
  });
  console.log(titleExist);
  if (titleExist) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      message: "category already exist",
    });
    return;
  }

  const createdTask = await TaskModel.create({
    title: data.title,
    description: data.description,
    dueDate: data.dueDate,
    userId: data.userId,
  });

  const newTask = await TaskModel.findOne({
    _id: createdTask._id,
  }).populate("userId");

  res.status(httpStatus.CREATED).json({
    status: "success",
    data: newTask,
  });
};

const getTasks = async (req, res) => {
  const userId = req.query.id;
  console.log("params", req.params);
  console.log("query", req.query);
  const getTask = await TaskModel.find({ userId: req.user.id }).populate(
    "userId"
  );

  res.status(httpStatus.OK).json({
    status: "success",
    data: getTask,
  });
};

// updated Task

const updateTask = async (req, res) => {
  const { title, description, dueDate } = req.body;
  const { id } = req.params;

  try {
    const updatedTask = await TaskModel.findByIdAndUpdate(
      id,
      { title, description, dueDate },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: "error",
        message: "Task not found",
      });
    }

    res.status(httpStatus.OK).json({
      status: "success",
      data: updatedTask,
    });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: "error",
      message: "An error occurred while updating the task",
      error: error.message,
    });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  const foundTask = await TaskModel.findOne({ _id: id });
  if (!foundTask) {
    res.status(httpStatus.NOT_FOUND).json({
      status: "error",
      message: "Task not found",
    });
    return;
  }

  await TaskModel.findByIdAndDelete({ _id: id });

  res.status(httpStatus.OK).json({
    status: "success",
    data: `Task with ID ${id} is deleted`,
  });
};

export { createTask, getTasks, updateTask, deleteTask };
