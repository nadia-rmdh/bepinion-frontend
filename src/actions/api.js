// action types
export const API_REQUEST_LOGIN = "API_REQUEST_LOGIN";
export const API_REQUEST_LOGOUT = "API_REQUEST_LOGOUT";
export const API_SUCCESS = "API_SUCCESS";
export const API_ERROR = "API_ERROR";
export const CANCEL_API_REQUEST = "CANCEL_API_REQUEST";

// action creators
export const apiRequestLogin = ({ url, method, data }) => {
    return {
        type: API_REQUEST_LOGIN,
        meta: { url, method, data }
    };
};

export const apiRequestLogout = ({ url, method }) => {
    return {
        type: API_REQUEST_LOGOUT,
        meta: { url, method }
    };
};

export const cancelApiRequest = () => {
    return {
        type: CANCEL_API_REQUEST
    };
};

export const apiSuccess = ({ response }) => ({
    type: API_SUCCESS,
    payload: response
});

export const apiError = ({ error }) => ({
    type: API_ERROR,
    payload: error
});