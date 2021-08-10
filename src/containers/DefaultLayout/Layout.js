import React, { Component, Suspense } from 'react';
import * as router from 'react-router-dom';
import {
    // AppSidebar, AppSidebarFooter, AppSidebarForm, AppSidebarHeader,
    // AppSidebarNav2 as AppSidebarNav,
    AppHeader
} from '@coreui/react';
import { translate } from 'react-switch-lang';
import DefaultHeader from './DefaultHeader';
import { Container, Spinner } from 'reactstrap';
import { connect } from 'react-redux';
import AuthRoute from './AuthRoute';
import Menu from './Menu';

class DefaultLayout extends Component {
    generateRoutes = () => {
        return Menu(this.props.user).map((props, idx) => (
            <AuthRoute
                key={idx}
                path={props.url}
                exact={!!props.exact}
                component={props.component}
                {...props}
            />
        ));
    }
    render() {
        const { Switch, Redirect } = router;
        return (
            <div className="app">
                <AppHeader fixed><DefaultHeader /></AppHeader>
                <div className="app-body">
                    <main className="main">
                        <Container className="mt-5">
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
                                <Switch>
                                    <Redirect exact from="/home" to="/dashboard" />
                                    {this.generateRoutes()}
                                </Switch>
                            </Suspense>
                        </Container>
                    </main>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (reduxState) => ({ user: reduxState.user })

export default connect(mapStateToProps)(translate(DefaultLayout));
