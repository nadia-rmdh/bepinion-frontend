import { apiRequest } from "../actions/api";
import { LOGIN, LOGOUT } from "../actions/auth";

const SERVER_URL = `https://hris.widyaskilloka.com`;

export const appMiddleware = () => next => action => {
    next(action);
    switch (action.type) {
        case LOGIN: {
            next(
                apiRequest({
                    url: `${SERVER_URL}/login`,
                    method: "POST",
                    data: action.payload
                })
            );
            break;
        }
        case LOGOUT: {
            next(
                apiRequest({
                    url: `${SERVER_URL}/logout`,
                    method: "POST"
                })
            );
        }
        default:
            break;
    }
};