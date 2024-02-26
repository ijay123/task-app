import axios from "axios";

import {
  CREATE_TASK_ERROR,
  CREATE_TASK_REQUEST,
  CREATE_TASK_SUCCESS,
  GET_TASKS_ERROR,
  GET_TASKS_REQUEST,
  GET_TASKS_SUCCESS,
  GET_TASK_ERROR,
  GET_TASK_REQUEST,
  GET_TASK_SUCCESS,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_REQUEST,
  UPDATE_TASK_REQUEST,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_ERROR,
  DELETE_TASK_ERROR,
} from "../constants/task";
import { toast } from "react-toastify";

// import { toast } from "react-toastify";

const userInfoFromLocalStorage = localStorage.getItem("taskUserInfo")
  ? JSON.parse(localStorage.getItem("taskUserInfo"))
  : null;

const baseUrl = "https://task-app-backend-2a3h.onrender.com";

export const createTaskAction = (formData) => async (dispatch, state) => {
  dispatch({
    type: CREATE_TASK_REQUEST,
  });

  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${userInfoFromLocalStorage.token}`,
    },
  };

  try {
    //make API call
    const { data } = await axios.post(`${baseUrl}/tasks`, formData, config);
    //2. after the API call success
    console.log(data, "data");
    dispatch({
      type: CREATE_TASK_SUCCESS,
      payload: data.data,
    });
    console.log(data);
  } catch (error) {
    //3. after the API call failure
    console.log(error);
    let message =
      error.response && error.response.data.errors
        ? error.response.data.errors.join(",")
        : error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: CREATE_TASK_ERROR,
      payload: message,
    });
  }
};

export const getTaskAction = () => async (dispatch, state) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${userInfoFromLocalStorage.token}`,
    },
  };
  try {
    console.log(dispatch, "dispatch");
    dispatch({
      type: GET_TASK_REQUEST,
    });
    // make the call
    const { data } = await axios.get(`${baseUrl}/task`, config);
    console.log(data, "data");
    //if we get here, then request is a success case
    dispatch({
      type: GET_TASK_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    let message =
      error.response && error.response.data.errors
        ? error.response.data.errors.join(",")
        : error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    // console.log(error, "error");
    // if (message.toLowerCase().includes("jwt")) {
    //   dispatch(logout());
    // }
    dispatch({
      type: GET_TASK_ERROR,
      payload: message,
    });
  }
};

export const getTasksAction = () => async (dispatch, state) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${userInfoFromLocalStorage.token}`,
    },
  };
  try {
    console.log(dispatch, "dispatch");
    dispatch({
      type: GET_TASKS_REQUEST,
    });

    // make the call
    const { data } = await axios.get(
      `${baseUrl}/tasks?id=${userInfoFromLocalStorage.data?._id}`,

      config
    );
    console.log(data, "data");
    //if we get here, then request is a success case
    dispatch({
      type: GET_TASKS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    let message =
      error.response && error.response.data.errors
        ? error.response.data.errors.join(",")
        : error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: GET_TASKS_ERROR,
      payload: message,
    });
  }
};

export const deleteTaskAction = (id) => async (dispatch, state) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${userInfoFromLocalStorage.token}`,
    },
  };
  try {
    console.log(dispatch, "dispatch");
    dispatch({
      type: DELETE_TASK_REQUEST,
    });
    // make the call
    const { data } = await axios.delete(`${baseUrl}/tasks/${id}`, config);
    console.log(data, "data");
    //if we get here, then request is a success case
    dispatch({
      type: DELETE_TASK_SUCCESS,
      payload: data.payload,
    });
  } catch (error) {
    let message =
      error.response && error.response.data.errors
        ? error.response.data.errors.join(",")
        : error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    console.log(message, "error");
    dispatch({
      type: DELETE_TASK_ERROR,
      payload: message,
    });
  }
};

export const updateTaskAction = (id, formData) => async (dispatch, state) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${userInfoFromLocalStorage.token}`,
    },
  };
  try {
    console.log(dispatch, "dispatch");
    dispatch({
      type: UPDATE_TASK_REQUEST,
    });
    // make the call
    const { data } = await axios.patch(
      `${baseUrl}/tasks/${id}`,
      formData,
      config
    );
    console.log(data, "data");
    //if we get here, then request is a success case
    dispatch({
      type: UPDATE_TASK_SUCCESS,
      payload: data.payload,
    });
  } catch (error) {
    let message =
      error.response && error.response.data.errors
        ? error.response.data.errors.join(",")
        : error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    console.log(message, "error");
    toast.error(message);
    dispatch({
      type: UPDATE_TASK_ERROR,
      payload: message,
    });
  }
};
