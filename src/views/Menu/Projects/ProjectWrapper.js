import React from "react";
import { Switch, Redirect, withRouter } from "react-router-dom";
import { translate } from "react-switch-lang";
import AuthRoute from '../../../containers/DefaultLayout/AuthRoute'
import FilterProjectProvider from "./ProjectContext";

const Project = React.lazy(() => import("./Project"));

function ProjectWrapper({ location, match }) {
    const routes = [
        {
            path: match.path + "/",
            exact: true,
            component: Project,
        },
    ];
    return (
        <FilterProjectProvider>
            <Switch>
                {routes.map((route) => (
                    <AuthRoute key={route.path} {...route} />
                ))}
                {routes[0] && (
                    <Redirect exact from={match.path} to={routes[0].path} />
                )}
            </Switch>
        </FilterProjectProvider>
    );
}

export default translate(withRouter(ProjectWrapper));
