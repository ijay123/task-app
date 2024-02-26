import React from "react";

import { useNavigate } from "react-router-dom";


const Sidebar = () => {

  const userInfoFromLocalStorage = localStorage.getItem("taskUserInfo")
  ? JSON.parse(localStorage.getItem("taskUserInfo"))
  : null;
    const navigate = useNavigate()
  return (
    <div className="bg-[#dbd8d8] w-[100vw] min-h-[100vh] hidden lg:flex">
      <div className="w-[22vw] px-[20px] flex flex-col bg-white h-[100vh]">
        <p className="text-[30px] flex justify-center mt-[40px] mb-[50px]">
          ToDo App
        </p>

        <button onClick={()=> navigate('/home')} className="border font-bold py-[15px] rounded-[10px] text-green-900 focus:bg-green-900 bg-green-100 focus:text-white">
          Dashboard
        </button>
        <button onClick={()=> navigate('/tasks')} className="border font-bold py-[15px] rounded-[10px] text-green-900 focus:bg-green-900 bg-green-100 focus:text-white mt-[40px]">
          Tasks
        </button>
        <div className="pt-[38vh] flex flex-col gap-[50px]">
        <p className="flex gap-[10px]"> <img
              className="w-[30px] rounded-[50%]"
              src={userInfoFromLocalStorage?.data?.avatar}
              alt=""
            />
            <span>{userInfoFromLocalStorage?.data?.username}</span></p>
        <p className=" flex justify-center text-[10px]">By Ijeoma Igbokwe</p>
        </div>
      
      </div>
    </div>
  );
};

export default Sidebar;
