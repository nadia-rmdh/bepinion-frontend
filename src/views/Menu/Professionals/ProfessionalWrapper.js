import React from "react";
import { Switch, Redirect, withRouter } from "react-router-dom";
import { translate } from "react-switch-lang";
import AuthRoute from '../../../containers/DefaultLayout/AuthRoute'
import { useAuthUser } from "../../../store";
import FilterProfessionalProvider from "./ProfessionalContext";

const Professional = React.lazy(() => import("./Professional"));
const ProfessionalDashboard = React.lazy(() => import("./ProfessionalDashboard"));
const ProfessionalDetail = React.lazy(() => import("./ProfessionalDetail"));

function ProfessionalWrapper({ location, match }) {
    const user = useAuthUser();
    const professional = [
        {
            path: match.path + "/",
            exact: true,
            component: ProfessionalDashboard,
        },
    ];

    const client = [
        {
            path: match.path + "/",
            exact: true,
            component: Professional,
        },
        {
            path: match.path + "/:professionalId/detail",
            exact: true,
            component: ProfessionalDetail,
        },
    ];

    const routes = user.role === 'client' ? client : professional
    return (
        <FilterProfessionalProvider>
            <Switch>
                {routes.map((route) => (
                    <AuthRoute key={route.path} {...route} />
                ))}
                {routes[0] && (
                    <Redirect exact from={match.path} to={routes[0].path} />
                )}
            </Switch>
        </FilterProfessionalProvider>
    );
}

export default translate(withRouter(ProfessionalWrapper));
