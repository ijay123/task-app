import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CREATE_TASK_CLEAR_ERROR, CREATE_TASK_REQUEST, CREATE_TASK_RESET } from "../../redux/constants/task";
import { createTaskAction } from "../../redux/action/task";
import Spinner from "../../components/Spinner/CustomSpinner";

const Home = () => {
  const dispatch = useDispatch();

  const {
    createdTask: { success, error, loading },
  } = useSelector((state) => state);

  const userInfoFromLocalStorage = localStorage.getItem("taskUserInfo")
    ? JSON.parse(localStorage.getItem("taskUserInfo"))
    : null;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    userId: userInfoFromLocalStorage.data?._id,
  });
  // Handles form data onChange event
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (success) {
      toast.success(`You have successfully added task`);
   
      // Directly use navigate function for redirection without setTimeout
      // if immediate redirection is desired. Otherwise, keep setTimeout for delayed redirection.
      setTimeout(() => {
        dispatch({ type: CREATE_TASK_RESET});
        navigate("/tasks");
      }, 3000); 
    }

    if (error) {
      toast.error(`${error}`);
      setTimeout(() => {
        dispatch({ type: CREATE_TASK_CLEAR_ERROR });
      }, 3000);
    }
  }, [success, error, dispatch, navigate]);
  // Submits the signup form to create a new user in the database
  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(createTaskAction(formData));
    dispatch({type: CREATE_TASK_REQUEST})
  };
  return (
    <div className=" lg:absolute lg:right-0 lg:top-[100px] relative lg:w-[78vw] flex justify-center items-center m-auto">
      <form className="lg:w-[40vw] border px-[20px] py-[30px] mt-[100px] lg:mt-[50px] bg-green-100 rounded-[20px]">
        <p className="text-[30px] mb-[30px] font-semibold">Add Task</p>
        <p>
          <input
            type="text"
            name="title"
            onChange={handleOnChange}
            placeholder="Title"
            className="w-[100%] py-[10px] lg:py-[20px] rounded-[10px] mb-[30px] pl-[10px] outline-none"
          />
        </p>
        <p>
          <textarea
            type="text"
            onChange={handleOnChange}
            name="description"
            placeholder="Description"
            className="w-[100%] py-[10px] lg:py-[20px] rounded-[10px] mb-[30px] pl-[10px] outline-none"
          />
        </p>
        <p>
          <label className="font-bold">Due Date</label>
          <input
            type="date"
            onChange={handleOnChange}
            name="dueDate"
            className="w-[100%] py-[10px] lg:py-[20px] rounded-[10px] mt-[10px] mb-[30px] pl-[10px] outline-none"
          />
        </p>
        {loading ? (
          <Spinner />
        ) : (
          <button
            onClick={submitHandler}
            className="border bg-green-900 text-white px-[50px] py-[10px] lg:py-[20px] rounded-[10px] outline-none"
          >
            Add Task
          </button>
        )}
      </form>
    </div>
  );
};

export default Home;
