import React, { Suspense } from "react";
import { Switch, Redirect, withRouter } from "react-router-dom";
import { TabContent, TabPane } from "reactstrap";
import { translate } from "react-switch-lang";
import AuthRoute from "../../../../components/AuthRoute";
import Spinner from "reactstrap/lib/Spinner";
import SolvingProvider from "./SolvingContext";

const SolvingMessage = React.lazy(() => import("./SolvingMessage"));

function Solving({ location, match }) {
    const routes = [
        {
            path: match.path + "/",
            exact: true,
            // privileges: ["canManagementJob"],
            component: SolvingMessage,
        },
    ];
    return (
        // <TabContent className="shadow-sm rounded">
        //     <TabPane className="p-0">
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
        //     </TabPane>
        // </TabContent>
    );
}

export default translate(withRouter(Solving));
