import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  DELETE_TASK_CLEAR_ERROR,
  DELETE_TASK_RESET,
  GET_TASKS_CLEAR_ERROR,
} from "../../redux/constants/task";
import { deleteTaskAction, getTasksAction } from "../../redux/action/task";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner/CustomSpinner";
import { GoPlus } from "react-icons/go";

const Tasks = () => {
  const dispatch = useDispatch();

  const {
    getTasks: { tasks, error },
    deleteTask: { success: deleteSuccess, error: deleteError },
  } = useSelector((state) => state);
  console.log(tasks);

  const navigate = useNavigate();

  useEffect(() => {
    // Dispatch getTasksAction when the component mounts

    dispatch(getTasksAction());
  }, [dispatch]);

  const [deletingTaskId, setDeletingTaskId] = useState(null);

  useEffect(() => {
    if (error) {
      toast.error(`${error}`);
      setTimeout(() => {
        dispatch({ type: GET_TASKS_CLEAR_ERROR });
      }, 3000);
    }
    if (deleteSuccess) {
      toast.success(`Task Deleted Successfully!`);
      dispatch({ type: DELETE_TASK_RESET });
    }
    if (deleteError) {
      toast.error(`Failed to Delete Task - ${deleteError}`);
      setTimeout(() => {
        dispatch({ type: DELETE_TASK_CLEAR_ERROR });
      }, 3000);
    }
    if (!tasks) {
      return (
        <div className="absolute top-[150px] right-0 bg-[blue]">
          Empty TodoList
        </div>
      );
    }
  }, [error, dispatch, deleteError, deleteSuccess, tasks]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setDeletingTaskId(id);
      dispatch(deleteTaskAction(id))
        .then(() => {
          setDeletingTaskId(null);
        })
        .catch(() => {
          setDeletingTaskId(null);
        });
    }
  };

  return (
    <div className="lg:w-[78vw] pt-[150px] w-[100%] lg:absolute flex flex-col lg:right-0 lg:top-[65px] px-[30px] mt-[50px]">
      <button
        onClick={() => navigate("/home")}
        className=" lg:z-50 flex mb-[40px] border w-[150px] py-[10px] justify-center rounded-[8px] font-medium items-center bg-green-600 text-white float-right"
      >
        Add Task <GoPlus />
      </button>
      <div className="flex gap-[20px] lg:flex-wrap overflow-x-auto">
        {tasks &&
          tasks.map((task) => (
            <div className="lg:w-[350px] w-[300px] border p-[30px] rounded-[20px] bg-white ">
              <div className="flex gap-[20px] mb-[20px] text-[20px] font-bold">
                <Link
                  to={`/edit/${task._id}`}
                  className="border rounded-[50%] text-white bg-[green] p-[5px]"
                >
                  <CiEdit />
                </Link>
                {deletingTaskId === task._id ? (
                  <span className="w-[30px]">
                    <Spinner />
                  </span>
                ) : (
                  <div className="border rounded-[50%] text-white bg-[green] p-[5px]">
                    <MdDeleteOutline onClick={() => handleDelete(task._id)} />
                  </div>
                )}
              </div>
              <div key={task._id} className=" flex gap-[30px]">
                <div className="flex flex-col gap-[20px]">
                  {" "}
                  <p>
                    <span className="font-bold">Title: </span>
                    {task.title}
                  </p>
                  <p>
                    <span className="font-bold">Description:</span>{" "}
                    {task.description}
                  </p>
                </div>
                <div>
                  {" "}
                  <span className="font-bold">Due Date: </span>
                  {new Date(task.dueDate).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Tasks;
