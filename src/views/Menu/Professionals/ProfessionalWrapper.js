import React from "react";
import { Switch, Redirect, withRouter } from "react-router-dom";
import { translate } from "react-switch-lang";
import AuthRoute from '../../../containers/DefaultLayout/AuthRoute'
import FilterProfessionalProvider from "./ProfessionalContext";

const Professional = React.lazy(() => import("./Professional"));

function ProfessionalWrapper({ location, match }) {
    const routes = [
        {
            path: match.path + "/",
            exact: true,
            component: Professional,
        },
    ];
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
