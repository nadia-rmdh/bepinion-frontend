import { SET_LOADER, SET_PANEL } from "./actions/ui";
import { API_SUCCESS, API_ERROR } from "./actions/api";
import { LOGOUT, SET_USER } from "./actions/auth";

export default (
  state = {
    user: null,
    isLoading: false,
    error: null,
    token: localStorage.getItem("session"),
    isAdminPanel: localStorage.getItem("menu") === "2",
    menu: localStorage.getItem("menu") ?? "3",
  },
  action
) => {
  switch (action.type) {
    case API_SUCCESS:
      localStorage.setItem("session", action.payload.session_id);
      localStorage.setItem("menu", "3");
      return {
        ...state,
        user: action.payload,
        token: action.payload.session_id,
        error: null,
        isLoading:false
      };
    case API_ERROR:
      return { ...state, error: "Login Salah", isLoading:false };
    case SET_LOADER:
      return { ...state, isLoading: action.payload };
    case LOGOUT:
      localStorage.removeItem("menu");
      return { ...state, user: null, error: null, token: null, menu: "3", isAdminPanel: false };
    case SET_PANEL:
      localStorage.setItem("menu", action.value);
      return { ...state, menu: action.value, isAdminPanel: action.value === '2' };
    case SET_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
