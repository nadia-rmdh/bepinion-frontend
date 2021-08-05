import { apiRequestLogin, apiRequestLogout } from "../actions/api";
import { LOGIN, GET_ME, setUser, LOGOUT } from "../actions/auth";
import request from "../utils/request";

export const appMiddleware = ({ dispatch }) => next => action => {
    next(action);
    switch (action.type) {
        case LOGOUT: {
            next(
                apiRequestLogout({
                    url: `auth/logout`,
                    method: "POST"
                })
            );
            break;
        }
        case LOGIN: {
            next(
                apiRequestLogin({
                    url: `v1/auth/login`,
                    method: 'POST',
                    data: action.payload
                })
            );
            break;
        }
        case GET_ME: {
            request.get(`v1/auth/me`)
                .then(response => {
                    dispatch(setUser(response.data))
                })
            break;
        }
        default:
            break;
    }
};
