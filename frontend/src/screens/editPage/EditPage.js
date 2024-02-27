import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTaskAction,
  getTasksAction,
  updateTaskAction,
} from "../../redux/action/task";
import { toast } from "react-toastify";
import {
  GET_TASKS_CLEAR_ERROR,
  UPDATE_TASK_CLEAR_ERROR,
  DELETE_TASK_CLEAR_ERROR,
} from "../../redux/constants/task";
import Spinner from "../../components/Spinner/CustomSpinner";
import { useParams } from "react-router-dom";

const EditPage = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const {
    getTasks: { tasks, error },
    updateTask: { success, loading, error: updateError },
  } = useSelector((state) => state);
  console.log(tasks);

  const userInfoFromLocalStorage = localStorage.getItem("taskUserInfo")
    ? JSON.parse(localStorage.getItem("taskUserInfo"))
    : null;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    userId: userInfoFromLocalStorage.data?._id,
  });

  useEffect(() => {
    if (!tasks || tasks.length === 0) {
      dispatch(getTasksAction());
    } else {
      const task = tasks.find((tsk) => tsk._id === id);
      console.log(task, "task");
      if (task) {
        setFormData({
          title: task?.title,
          description: task?.description,
          dueDate: task.dueDate.slice(0, 10),
          userId: userInfoFromLocalStorage?.data?._id,
        });
      }
    } // Dispatch getTasksAction when the component mounts
  }, [dispatch, tasks, id, userInfoFromLocalStorage.data?._id]); // Removed error from dependency array to avoid repeated fetching due to errors

  useEffect(() => {
    if (error) {
      toast.error(`${error}`);
      setTimeout(() => {
        dispatch({ type: GET_TASKS_CLEAR_ERROR });
      }, 3000);
    }
    if (success) {
      toast.success(`Task Updated Successfully!`);
    }

    if (updateError) {
      toast.error(`Failed to Update Task - ${updateError}`);
    }
  }, [error, dispatch, success, updateError]); // This useEffect is dedicated to handling errors

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleUpdate = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    // Dispatch the update task action, passing the formData
    dispatch(updateTaskAction(id, formData));
  };

  return (
    <div className="pt-[80px] min-h-[100%] lg:w-[78vw] bg-[grey] lg:absolute lg:top-[66px] lg:right-0">
      <form className="lg:w-[35vw] px-[20px] flex flex-col pb-[50px] justify-center m-auto">
        <p className="lg:text-[30px] text-[25px] mb-[30px] font-semibold">Edit Task</p>
        <p>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleOnChange}
            placeholder="Title"
            className="w-[100%] py-[20px]  rounded-[10px] mb-[30px] pl-[10px]"
          />
        </p>
        <p>
          <textarea
            type="text"
            onChange={handleOnChange}
            value={formData.description}
            name="description"
            placeholder="Description"
            className="w-[100%] py-[20px] rounded-[10px] mb-[30px] pl-[10px]"
          />
        </p>
        <p>
          <label className="font-bold">Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleOnChange}
            className="w-[100%] py-[20px] rounded-[10px] mt-[10px] mb-[30px] pl-[10px]"
          />
        </p>

        {loading ? (
          <Spinner />
        ) : (
          <button
            onClick={handleUpdate}
            className="border bg-green-900 text-white px-[50px] py-[20px] rounded-[10px]"
          >
            Update Task
          </button>
        )}
      </form>
    </div>
  );
};

export default EditPage;
