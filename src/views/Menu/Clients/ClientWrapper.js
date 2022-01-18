import React from "react";
import { Switch, Redirect, withRouter } from "react-router-dom";
import { translate } from "react-switch-lang";
import AuthRoute from '../../../containers/DefaultLayout/AuthRoute'
import { useAuthUser } from "../../../store";
// import FilterClientProvider from "./ClientContext";

const ClientDashboard = React.lazy(() => import("./ClientDashboard"));
const ClientDetail = React.lazy(() => import("./ClientDetail"));

function ClientWrapper({ location, match }) {
    const user = useAuthUser();
    const professional = [
        {
            path: match.path + "/:ClientId",
            exact: true,
            component: ClientDetail,
        },
    ];

    const client = [
        {
            path: match.path + "/dashboard",
            exact: true,
            component: ClientDashboard,
        },
        {
            path: match.path + "/:ClientId",
            exact: true,
            component: ClientDetail,
        },
    ];

    const routes = user.role === 'professional' ? professional : client
    return (
        // <FilterClientProvider>
        <Switch>
            {routes.map((route) => (
                <AuthRoute key={route.path} {...route} />
            ))}
            {routes[0] && (
                <Redirect exact from={match.path} to={routes[0].path} />
            )}
        </Switch>
        // </FilterClientProvider>
    );
}

export default translate(withRouter(ClientWrapper));
