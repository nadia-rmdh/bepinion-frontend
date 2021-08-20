import React from "react";
import { Switch, Redirect, withRouter } from "react-router-dom";
import { translate } from "react-switch-lang";
import AuthRoute from '../../../containers/DefaultLayout/AuthRoute'
import { useAuthUser } from "../../../store";
import FilterProjectProvider from "./ProjectContext";

const Project = React.lazy(() => import("./Project"));
const ProjectCreate = React.lazy(() => import("./ProjectCreate"));
const ProjectDetail = React.lazy(() => import("./ProjectDetail"));
const ProjectEdit = React.lazy(() => import("./ProjectEdit"));
const ProjectProfessionalsList = React.lazy(() => import("./ProjectProfessionals/ProjectProfessionalsList"));
const ProjectDashboard = React.lazy(() => import("./ProjectDashboard"));

function ProjectWrapper({ location, match }) {
    const user = useAuthUser();
    const professional = [
        {
            path: match.path + "/",
            exact: true,
            component: Project,
        },
        {
            path: match.path + "/:projectId",
            exact: true,
            component: ProjectDetail,
        },
    ];

    const client = [
        {
            path: match.path + "/create",
            exact: true,
            component: ProjectCreate,
        },
        {
            path: match.path + "/:projectId/edit",
            exact: true,
            component: ProjectEdit,
        },
        {
            path: match.path + "/:projectId/professionals",
            exact: true,
            component: ProjectProfessionalsList,
        },
        {
            path: match.path + "/:projectId/dashboard",
            exact: true,
            component: ProjectDashboard,
        },
    ]

    const routes = user.role === 'company' ? client : professional

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
