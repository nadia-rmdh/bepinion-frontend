import { SET_LOADER } from "./actions/ui";
import { API_SUCCESS, API_ERROR } from "./actions/api";
import { LOGOUT, SET_USER } from "./actions/auth";

export default (
  state = {
    user: null,
    isLoading: false,
    error: null,
    token: localStorage.getItem("session"),
  },
  action
) => {
  switch (action.type) {
    case API_SUCCESS:
      console.log(action)
      localStorage.setItem("session", action.payload.data.token);
      return {
        ...state,
        user: action.payload.data,
        token: action.payload.data.token,
        error: null,
        isLoading: false
      };
    case API_ERROR:
      return { ...state, error: "Login Salah", isLoading: false };
    case SET_LOADER:
      return { ...state, isLoading: action.payload.data };
    case LOGOUT:
      return { ...state, user: null, error: null, token: null };
    case SET_USER:
      return { ...state, user: action.payload.data };
    default:
      return state;
  }
};
