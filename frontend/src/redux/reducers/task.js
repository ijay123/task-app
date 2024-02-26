import {
  CREATE_TASK_ERROR,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_REQUEST,
  CREATE_TASK_RESET,
  CREATE_TASK_CLEAR_ERROR,
  GET_TASKS_CLEAR_ERROR,
  GET_TASKS_REQUEST,
  GET_TASKS_SUCCESS,
  GET_TASKS_RESET,
  GET_TASKS_ERROR,
  UPDATE_TASK_CLEAR_ERROR,
  UPDATE_TASK_REQUEST,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_RESET,
  UPDATE_TASK_ERROR,
  DELETE_TASK_REQUEST,
  DELETE_TASK_CLEAR_ERROR,
  DELETE_TASK_RESET,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_ERROR,
} from "../constants/task";

export const registerTaskReducer = (
  state = { task: null, loading: false, error: null, success: false },
  action
) => {
  switch (action.type) {
    case CREATE_TASK_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        task: action.payload,
      };

    case CREATE_TASK_RESET:
      return {
        loading: false,
        success: false,
        task: [],
        error: null,
      };

    case CREATE_TASK_CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    case CREATE_TASK_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const getTasksReducer = (
  state = { tasks: [], loading: false, error: null, success: false },
  action
) => {
  switch (action.type) {
    case GET_TASKS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_TASKS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        tasks: action.payload,
        error: null,
      };

    case GET_TASKS_RESET:
      return {
        loading: false,
        success: false,
        tasks: [],
        error: null,
      };

    case GET_TASKS_CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    case GET_TASKS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const updateTaskReducer = (
  state = { task: null, loading: false, error: null, success: false },
  action
) => {
  switch (action.type) {
    case UPDATE_TASK_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        task: action.payload,
      };

    case UPDATE_TASK_RESET:
      return {
        loading: false,
        success: false,
        task: null,
        error: null,
      };

    case UPDATE_TASK_CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    case UPDATE_TASK_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const deleteTaskReducer = (
  state = { task: null, loading: false, error: null, success: false },
  action
) => {
  switch (action.type) {
    case DELETE_TASK_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        task: action.payload,
      };

    case DELETE_TASK_RESET:
      return {
        loading: false,
        success: false,
        task: null,
        error: null,
      };

    case DELETE_TASK_CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    case DELETE_TASK_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
