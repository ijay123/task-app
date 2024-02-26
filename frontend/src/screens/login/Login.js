import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LOGIN_USER_CLEAR_ERROR } from "../../redux/constants/user";
import { loginUserAction } from "../../redux/action/user";
import Spinner from "../../components/Spinner/CustomSpinner";

const Login = () => {
  const dispatch = useDispatch();

  const {
    loggedInUser: { user, success, error, loading },
  } = useSelector((state) => state);

  const userInfoFromLocalStorage = localStorage.getItem("taskUserInfo")
  ? JSON.parse(localStorage.getItem("taskUserInfo"))
  : null;

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  // Handles form data onChange event
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (success) {
      toast.success(`You have successfully logged in, ${userInfoFromLocalStorage?.data?.username}`);
      // Directly use navigate function for redirection without setTimeout
      // if immediate redirection is desired. Otherwise, keep setTimeout for delayed redirection.
      setTimeout(() => {
        navigate("/home");
      }, 3000); // Adjust delay here as needed
    }

    if (error) {
      toast.error(`${error}`);
      setTimeout(() => {
        dispatch({ type: LOGIN_USER_CLEAR_ERROR });
      }, 3000);
    }
  }, [success, user?.data?.username, error, dispatch, navigate, userInfoFromLocalStorage, user]);
  // Submits the signup form to create a new user in the database
  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(
      loginUserAction({
        username: formData.username,
        password: formData.password,
      })
    );
  };

  return (
    <div className="bg-[#9d9a9a] h-[100vh] flex justify-between items-center lg:px-[200px]">
      <div className="lg:flex hidden">
        <img
          src="/img/task1.webp"
          className="w-[440px] rounded-[20px]"
          alt=""
        />
      </div>
      <div className="lg:w-[30vw] border h-[100vh] lg:h-[80vh] px-[30px] gap-[30px] lg:gap-[60px] py-[30px] bg-[white] flex flex-col justify-center lg:rounded-[25px]">
        <p className="text-[30px] text-center">Login</p>
        <form className="flex flex-col gap-[70px]">
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
            <input
              type="password"
              onChange={handleOnChange}
              name="password"
              placeholder="Password"
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
                Login
              </button>
            )}

            <p className="flex gap-[5px] mt-[20px] justify-center">
              You Don't have an acccount? <Link to={"/signup"}>SignUp</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
