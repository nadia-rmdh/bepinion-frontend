import { API_REQUEST_LOGIN, API_REQUEST_LOGOUT, apiError, apiSuccess } from "../actions/api";
import { setLoader } from "../actions/ui";
import { toast } from 'react-toastify';
import request from "../utils/request";
import { LOGOUT } from "../actions/auth";
export const apiMiddleware = ({ dispatch }) => next => action => {
    next(action);

    if (action.type === API_REQUEST_LOGIN) {
        dispatch(setLoader(true));
        const { url, data } = action.meta;
        request.post(url, data)
            .then(({ data }) => dispatch(apiSuccess({ response: data })))
            .catch((error) => {
                dispatch(apiError({ error }));
                toast.error(error.response.data.message, { autoClose: 3000 });
            }).finally(() => {
                dispatch(setLoader(false))
            });
    }

    if (action.type === API_REQUEST_LOGOUT) {
        dispatch(setLoader(true));
        const { url, data } = action.meta;
        request.post(url, data)
            .then(() => dispatch(LOGOUT))
            .catch(error => {
                dispatch(apiError({ error }));
            }).finally(() => {
                dispatch(setLoader(false))
                localStorage.removeItem("session");
            });
    }
};
