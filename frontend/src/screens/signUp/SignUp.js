import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner/CustomSpinner";
import { toast } from "react-toastify";
import { CREATE_USER_CLEAR_ERROR, CREATE_USER_RESET } from "../../redux/constants/user";
import { createUserAction } from "../../redux/action/user";

const SignUp = () => {
  const dispatch = useDispatch();

  const {
    createdUser: { user, success, error, loading },
  } = useSelector((state) => state);

  const userInfoFromLocalStorage = localStorage.getItem("taskUserInfo")
    ? JSON.parse(localStorage.getItem("taskUserInfo"))
    : null;

  const [formData, setFormData] = useState({
    username: "",
    gender: "",
    password: "",
  });
  // Handles form data onChange event
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (success) {
      toast.success(
        `Welcome, you have succesfully signedup, ${userInfoFromLocalStorage?.data?.username}`
      );
      setTimeout(() => {
        dispatch({ type: CREATE_USER_RESET });
      }, 3000);
    }

    if (error) {
      toast.error(`${error}`);
      setTimeout(() => {
        dispatch({ type: CREATE_USER_CLEAR_ERROR });
      }, 3000);
    }
  }, [
    success,
    user?.data?.username,
    error,
    dispatch,
    userInfoFromLocalStorage?.data?.username,
  ]);
  // Submits the signup form to create a new user in the database
  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(
      createUserAction({
        username: formData.username,
        gender: formData.gender,
        password: formData.password,
      })
    );
  };

  return (
    <div className="bg-[#9d9a9a] h-[100vh] w-[100vw] flex justify-between items-center lg:px-[200px]">
      <div className="lg:flex hidden">
        <img
          src="/img/task1.webp"
          className="w-[440px] rounded-[20px]"
          alt=""
        />
      </div>
      <div className="lg:w-[30vw] border h-[100vh] lg:h-[80vh] px-[30px] gap-[60px] py-[30px] bg-[white] flex flex-col justify-center lg:rounded-[25px]">
        <p className="text-[30px] text-center">Sign Up</p>
        <form className="flex flex-col gap-[40px] lg:gap-[70px]">
          <p>
            <input
              type="text"
              onChange={handleOnChange}
              name="username"
              placeholder="Username"
              className="w-[100%] border px-[10px] py-[16px] rounded-[15px] outline-none"
            />
          </p>
          <p>
            <select
              onChange={handleOnChange}
              name="gender"
              className="w-[100%] border px-[10px] py-[16px] rounded-[15px] outline-none"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </p>
          <p>
            <input
              type="password"
              placeholder="Password"
              onChange={handleOnChange}
              name="password"
              className="w-[100%] border px-[10px] py-[16px] rounded-[15px] outline-none "
            />
          </p>
          <div className="flex flex-col">
            {loading ? (
              <Spinner />
            ) : (
              <button
                onClick={submitHandler}
                className="border py-[15px] rounded-[10px] bg-green-500 text-[white]"
              >
                {" "}
                Sign Up
              </button>
            )}

            <p className="flex gap-[5px] mt-[20px] justify-center">
              All ready have an acccount? <Link to={"/login"}>Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
