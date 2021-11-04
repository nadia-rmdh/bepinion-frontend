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

export default store;
