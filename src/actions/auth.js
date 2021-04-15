export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const GET_ME = "GET_ME";
export const SET_USER = "SET_USER";

export const login = user => {
    return {
        type: LOGIN,
        payload: user
    };
};

export const logout = () => {
    return {
        type: LOGOUT
    };
};

export const getMe = () => ({ type: GET_ME });

export const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user
    };
};
