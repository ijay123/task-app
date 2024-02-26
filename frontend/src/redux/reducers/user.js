//A reducer is a function that takes in two argument (initialState and action)
//and mutate the store based on the action
import {
  CREATE_USER_CLEAR_ERROR,
  CREATE_USER_ERROR,
  CREATE_USER_RESET,
  CREATE_USER_SUCCESS,
  CREATE_USER_REQUEST,
  LOGIN_USER_CLEAR_ERROR,
  LOGIN_USER_ERROR,
  LOGIN_USER_REQUEST,
  LOGIN_USER_RESET,
  LOGIN_USER_SUCCESS,
  GET_USERS_CLEAR_ERROR,
  GET_USERS_REQUEST,
  GET_USERS_RESET,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  GET_USER_CLEAR_ERROR,
  GET_USER_REQUEST,
  GET_USER_RESET,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
} from "../constants/user";

const userInfoFromLocalStorage = localStorage.getItem("libraryUserInfo")
  ? JSON.parse(localStorage.getItem("libraryUserInfo"))
  : null;

export const registerUserReducer = (
  state = { user: null, loading: false, error: null, success: false },
  action
) => {
  switch (action.type) {
    case CREATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        user: action.payload,
      };

    case CREATE_USER_RESET:
      return {
        loading: false,
        success: false,
        user: null,
        error: null,
      };

    case CREATE_USER_CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    case CREATE_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const loginUserReducer = (
  state = {
    user: userInfoFromLocalStorage,
    loading: false,
    error: null,
    success: false,
  },
  action
) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        user: action.payload,
      };

    case LOGIN_USER_RESET:
      return {
        loading: false,
        success: false,
        user: null,
        error: null,
      };

    case LOGIN_USER_CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    case LOGIN_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const getUsersReducer = (
  state = {
    users: [],
    loading: false,
    error: null,
    success: false,
  },
  action
) => {
  switch (action.type) {
    case GET_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        users: action.payload,
      };

    case GET_USERS_RESET:
      return {
        loading: false,
        success: false,
        users: [],
        error: null,
      };

    case GET_USERS_CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    case GET_USERS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const getUserReducer = (
  state = {
    user:[],
    loading: false,
    error: null,
    success: false,
  },
  action
) => {
  switch (action.type) {
    case GET_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        user: action.payload,
      };

    case GET_USER_RESET:
      return {
        loading: false,
        success: false,
        user: [],
        error: null,
      };

    case GET_USER_CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    case GET_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
