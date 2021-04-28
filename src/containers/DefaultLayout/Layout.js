import React, { Component, Suspense } from 'react';
import * as router from 'react-router-dom';
import { AppSidebar, AppSidebarFooter, AppSidebarForm, AppSidebarHeader, AppSidebarNav2 as AppSidebarNav, AppHeader } from '@coreui/react';
import { translate } from 'react-switch-lang';
import DefaultHeader from './DefaultHeader';
import { Container, Spinner } from 'reactstrap';
import sidebarMenu from './SidebarMenu';
// import userMenus from './user-menu';
// import LoadingAnimation from '../../views/Menu/Personnel/component/atom/LoadingAnimation';
import AuthRoute from '../../components/AuthRoute';
import { connect } from 'react-redux';
// import * as firebase from '../../firebaseInit';
// import request from '../../utils/request';
// import { setPanel } from '../../actions/ui';
// import { logout } from '../../actions/auth';
// import { PANEL_ADMIN } from '../../constants';
// import { setLanguage } from 'react-switch-lang';

class SidebarNav extends AppSidebarNav {

    // nav type
    navType(item, idx) {
        return (
            item.title ? this.navTitle(item, idx)
                : item.divider ? this.navDivider(item, idx)
                    : item.label ? this.navLabel(item, idx)
                        : item.children ? this.navDropdown(item, idx)
                            : typeof item.render === 'function' ? item.render(item, idx)
                                : this.navItem(item, idx)
        );
    }
}

class DefaultLayout extends Component {
    // componentDidMount() {
    //     setLanguage(localStorage.getItem('language'))
    //     firebase.requestNotificationPermission().then(token => {
    //         request.post('/auth/addtoken', { token, platform: navigator?.userAgent ?? 'web' })
    //     }).catch((err) => {
    //         console.log(err.message)
    //     })
    // }

    generateMenus(menu) {
        const { privileges: userPrivileges = [] } = this.props.user;
        const checkPrivileges = (routeObj) => {
            if (routeObj.privileges) {
                return routeObj.privileges.every(p => userPrivileges.includes(p));
            }

            if (routeObj.oneOfPrivileges) {
                return routeObj.oneOfPrivileges.some(p => userPrivileges.includes(p));
            }

            return true;
        }

        return sidebarMenu(this.props.user)
                .filter(routeObj => !!routeObj.menu)
                .filter(checkPrivileges)
                .map(({ menu, url }) => {
                    return { ...menu, url }
                });
    }

    generateRoutes = (menu) => {
      return sidebarMenu(this.props.user).map((props, idx) => (
          <AuthRoute
              key={idx}
              path={props.url}
              exact={!!props.exact}
              component={props.component}
              {...props}
          />
      ));
    }

    // generateRoutes(menu) {
    //   return adminMenus(this.props.user)
    //   .map((props, idx) => {
    //       if (props.url && (props.redirect || props.component)) {
    //           return <AuthRoute key={idx} path={props.url} exact={!!props.exact} component={props.component} {...props} />
    //       }
    //       return null;
    //   });
    // }

    render() {
        const menu = this.props.panelMenu;
        // const { user } = this.props;
        const { Switch, Redirect } = router;

        return (
            <div className="app">
                <AppHeader fixed><DefaultHeader /></AppHeader>
                <div className="app-body">
                    <AppSidebar fixed display="lg">
                        <AppSidebarHeader />
                        <AppSidebarForm />
                        <Suspense>
                            <SidebarNav navConfig={{ items: this.generateMenus(menu) }} router={router} location={this.props.location} />
                        </Suspense>
                        <AppSidebarFooter />
                    </AppSidebar>

                    <main className="main">
                        <Container fluid className="ml-1 ml-lg-4">
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
                                    {this.generateRoutes(menu)}
                                </Switch>
                            </Suspense>
                        </Container>
                    </main>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (reduxState) => ({ user: reduxState.user, panelMenu: reduxState.menu })

export default connect(mapStateToProps)(translate(DefaultLayout));
