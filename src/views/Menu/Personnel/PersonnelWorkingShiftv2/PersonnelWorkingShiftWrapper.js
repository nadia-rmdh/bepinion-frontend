import React, { lazy, Suspense, useMemo } from 'react';
import { Switch, Redirect } from 'react-router';
import LoadingAnimation from '../../../../components/LoadingAnimation'
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { Link } from 'react-router-dom';
import { translate } from 'react-switch-lang';
import { connect } from 'react-redux';
import AuthRoute from '../../../../components/AuthRoute';
const PersonnelWorkingShift = lazy(() => import('./PersonnelWorkingShift'));
const WorkingShift = lazy(() => import('./master/WorkingShift'));

function matchWildcard(str, wildcard) {
    var escapeRegex = (str) => str.replace(/([.*+?^=!:${}()|[\]/\\])/g, "\\$1");
    return new RegExp("^" + wildcard.split("*").map(escapeRegex).join(".*") + "$").test(str);
}

function getRoutes(props) {
    const { match } = props;
    const routes = [];

    routes.push(
        {
            path: match.path, privileges: ['read-employee-workingShift'], exact: true, component: PersonnelWorkingShift,
            tab: 'Jadwal Karyawan', active: match.path
        },
        {
            path: match.path + '/master', privileges: ['read-employee-workingShift-master'], exact: true, component: WorkingShift,
            tab: 'Pengaturan Jadwal Kerja', active: match.path + '/master'
        }
    );


    return routes;
}

function PersonnelWorkingShiftWrapper(props) {
    const routes = useMemo(() => getRoutes(props), [props])
    const { match, location } = props;
    return (
        <div className="animated">
            <Nav tabs className="flex-nowrap">
                {routes.filter(route => !!route.tab).map(route => (
                    <NavItem key={route.path} className="text-nowrap">
                        <NavLink tag={Link} to={route.path} active={route.active && matchWildcard(location.pathname, route.active)}>{route.tab}</NavLink>
                    </NavItem>
                ))}
            </Nav>
            <TabContent>
                <TabPane className="px-0">
                    <Suspense fallback={<LoadingAnimation />}>
                        <Switch>
                            {routes.map(route => (
                                <AuthRoute key={route.path} {...route} />
                            ))}
                            {routes[0] && <Redirect exact from={match.path} to={routes[0].path} />}
                        </Switch>
                    </Suspense>
                </TabPane>
            </TabContent>
        </div>
    )
}



const mapStateToProps = ({ user, token, menu }) => ({ user, token, menu });
export default connect(mapStateToProps)(translate(PersonnelWorkingShiftWrapper));
