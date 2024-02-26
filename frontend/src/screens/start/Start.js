import React from "react";
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-[100vh] w-[100vw] ">
      <div className="lg:flex items-center justify-between lg:px-[300px] lg:pt-[100px]">
        <div className="text-[white] px-[10px] pt-[200px] w-[100%] lg:w-[50%] flex flex-col  text-[30px] lg:text-[60px]">
          Welcome To To-Do list App{" "}
          <Link to={"/signup"}>
            <button className="text-white w-[200px] flex mx-auto justify-center text-[20px] py-[10px] mt-[40px] bg-green-400 rounded-[10px]">
              Get Started
            </button>
          </Link>
        </div>
        <div className="lg:flex hidden">
          <img
            src="/img/task1.webp"
            className="w-[400px] rounded-l-[50%]"
            alt=""
          />{" "}
        </div>
      </div>
    </div>
  );
};

export default Start;
