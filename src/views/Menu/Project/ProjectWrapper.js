import React, { Suspense } from "react";
import { Switch, Redirect, withRouter } from "react-router-dom";
import { TabContent, TabPane } from "reactstrap";
import { translate } from "react-switch-lang";
import AuthRoute from "../../../components/AuthRoute";
import Spinner from "reactstrap/lib/Spinner";
import ProjectProvider from "./ProjectContext";
import SolvingProvider from "./Solving/SolvingContext";

const Project = React.lazy(() => import("./Project"));
const ProjectCreateDetail = React.lazy(() => import("./Create/ProjectCreateDetail"));
const ProjectDetail = React.lazy(() => import("./ProjectDetail"));
const SolvingMessage = React.lazy(() => import("./Solving/SolvingMessage"));
const SolvingTeam = React.lazy(() => import("./Solving/SolvingTeam"));
const DesignSprint = React.lazy(() => import ("./Sprint/DesignSprint"))

function ProjectWrapper({ location, match }) {
    const routes = [
        {
            path: match.path + "/",
            exact: true,
            // privileges: ["canManagementJob"],
            component: Project,
        },
        {
            path: match.path + "/create",
            exact: true,
            // privileges: ["canManagementJob"],
            component: ProjectCreateDetail,
        },
        {
            path: match.path + "/:code",
            exact: true,
            // privileges: ["canManagementJob"],
            component: ProjectDetail,
        },
        {
            path: match.path + "/:code/solving",
            exact: true,
            // privileges: ["canManagementJob"],
            component: SolvingMessage,
        },
        {
            path: match.path + "/:code/solving/team",
            exact: true,
            // privileges: ["canManagementJob"],
            component: SolvingTeam,
        },
        {
            path: match.path + "/:code/sprint",
            exact: true,
            component: DesignSprint,
        },
    ];
    return (
        <TabContent className="rounded">
            <TabPane className="p-0 d-flex justify-content-center">
                <Suspense
                    fallback={<div
                        style={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0,
                            background: "rgba(255,255,255, 0.5)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Spinner style={{ width: 48, height: 48 }} />
                    </div>}
                >
                    <SolvingProvider>
                        <Switch>
                            {routes.map((route) => (
                                <AuthRoute key={route.path} {...route} />
                            ))}
                            {routes[0] && (
                                <Redirect exact from={match.path} to={routes[0].path} />
                            )}
                        </Switch>
                    </SolvingProvider>
                </Suspense>
            </TabPane>
        </TabContent>
    );
}

export default translate(withRouter(ProjectWrapper));
