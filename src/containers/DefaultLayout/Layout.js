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

class DefaultLayout extends Component {
    render() {
        // const { user } = this.props;
        const { Switch, Redirect } = router;

        return (
            <div className="app">
                <AppHeader fixed><DefaultHeader /></AppHeader>
                <div className="app-body">
                    <main className="main">
                        <Container className="p-0 px-md-3 py-lg-5 m-0 m-md-auto">
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
                                    <Redirect exact from="/home" to="/beranda" />
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
