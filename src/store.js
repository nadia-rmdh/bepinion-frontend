import { useSelector } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { appMiddleware } from "./middlewares/app";
import { apiMiddleware } from "./middlewares/core";
import reducer from './reducer'

const createStoreWithMiddleware = applyMiddleware(
    appMiddleware,
    apiMiddleware
)(createStore);

const store = createStoreWithMiddleware(reducer);

export function useAuthUser() {
    const user = useSelector(state => state.user);
    return user;
}

export function useUserPrivileges() {
    const privileges = useSelector(state => state.user.privileges)
    const can = (privilegeName) => privileges.includes(privilegeName)
    const canAll = (arr) => arr.every(p => can(p))
    const canAny = (arr) => arr.some(p => can(p))

    return { privileges, can, canAll, canAny }
}

export function useToken() {
    const token = useSelector(state => state.token);
    return token;
}

export default store;
