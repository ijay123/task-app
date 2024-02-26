import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { logout } from "../../redux/action/user";
import { useDispatch } from "react-redux";

const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout());
    navigate("/")
  };


  const userInfoFromLocalStorage = localStorage.getItem("taskUserInfo")
    ? JSON.parse(localStorage.getItem("taskUserInfo"))
    : null;

  const [openBar, setOpenBar] = useState(false);

  return (
    <div className="lg:w-[78vw] w-[100vw] lg:gap-[100px]  lg:justify-center flex float-right py-[20px] border bg-[white]">
      <p
        className="flex lg:hidden pl-[20px]"
        onClick={() => setOpenBar(!openBar)}
      >
        <IoMdMenu />
      </p>
      <Link to={"/home"} className="lg:flex hidden">
        Home
      </Link>
      <p className="text-[red] lg:flex hidden" onClick={handleLogout}>Log out</p>
      <Link>
        <img src="" alt="" />
      </Link>

   

      {openBar && (
        <div className="flex flex-col lg:hidden border px-[40px] py-[20px] gap-[10px] absolute left-0 top-[58px] z-50 bg-[#e1dede]">
          <Link to={"/home"} className="hover:text-green-800">
            Dashboard
          </Link>
          <Link to={"/tasks"} className="hover:text-green-800">
            Tasks
          </Link>
          <p className="flex gap-[10px]">
            <img
              className="w-[30px] rounded-[50%]"
              src={userInfoFromLocalStorage?.data?.avatar}
              alt=""
            />
            <span>{userInfoFromLocalStorage?.data?.username}</span>
          </p>

          <p className="hover:text-green-800" onClick={handleLogout}>Log out</p>
        </div>
      )}
    </div>
  );
};

export default Navigation;
