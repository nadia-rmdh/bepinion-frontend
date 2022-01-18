import React from "react";
import { Switch, Redirect, withRouter } from "react-router-dom";
import { translate } from "react-switch-lang";
import AuthRoute from '../../../containers/DefaultLayout/AuthRoute'
import { useAuthUser } from "../../../store";
import FilterProjectProvider from "./ProjectContext";

const Project = React.lazy(() => import("./Project"));
const ProjectCreate = React.lazy(() => import("./ProjectCreate"));
const ProjectDetail = React.lazy(() => import("./ProjectDetail"));
// const ProjectEdit = React.lazy(() => import("./ProjectEdit"));
const ProjectProfessionalsList = React.lazy(() => import("./ProjectProfessionals/ProjectProfessionalsList"));
const ProjectWall = React.lazy(() => import("./ProjectWall/ProjectWall"));

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
        {
            path: match.path + "/:projectId/wall",
            exact: true,
            component: ProjectWall,
        },
    ];

    const client = [
        {
            path: match.path + "/create",
            exact: true,
            component: ProjectCreate,
        },
        {
            path: match.path + "/:projectId",
            exact: true,
            component: ProjectDetail,
        },
        {
            path: match.path + "/:projectId/professionals",
            exact: true,
            component: ProjectProfessionalsList,
        },
        {
            path: match.path + "/:projectId/wall",
            exact: true,
            component: ProjectWall,
        },
    ]

    const routes = user.role === 'professional' ? professional : client

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
