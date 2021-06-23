import React, { useMemo } from 'react'
import { Link, useLocation, useRouteMatch } from 'react-router-dom';
// import { toast } from 'react-toastify';
import { Spinner, Nav, NavItem, NavLink, Row, Col, Card, CardHeader, CardBody, TabContent, TabPane } from 'reactstrap'
import useSWR from 'swr';
import DesignSprint from './Sprint/DesignSprint';
import profilePhotoNotFound from '../../../assets/img/no-photo.png';
import TeamDetail from './TeamDetail';

const tabs = {
    'sprint': 'Design Sprint',
    'myteam': 'Detail Team',
}

const tabsArray = Object.keys(tabs);

function TeamWrapper() {
    const matchRoute = useRouteMatch();
    const location = useLocation()
    const selectedTab = location.hash ? location.hash.substring(1) : tabsArray[0];
    const { data, error: dataError } = useSWR('v1/teams/' + matchRoute.params.teamId, { refreshInterval: 1000000 });
    const loading = !data && !dataError;
    const getTeam = useMemo(() => data?.data?.data ?? [], [data]);

    const onErrorImage = (e) => {
        e.target.src = profilePhotoNotFound;
        e.target.onerror = null;
    }

    if (loading) {
        return (
            <div className="text-center" style={{ position: 'absolute', width: '100%', height: '100%', zIndex: '99', backgroundColor: 'rgba(255,255,255, 0.7)', justifyContent: 'center', alignItems: 'center' }}>
                <div
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
                </div>
            </div>
        )
    }

    return (
        <Row>
            <Col xs="2" className="px-0">
                <Card className="shadow-sm design-sprint border-0">
                    <CardHeader className="design-sprint-header border-bottom-0 text-center">
                        <div className="rounded-circle lead-photo mb-3 d-flex justify-content-center align-items-center">
                            {getTeam?.lead?.leadPhoto ?
                                <img src={getTeam?.lead?.leadPhoto} alt="profile" className="rounded-circle" onError={(e) => onErrorImage(e)} />
                                :
                                <img src={require('../../../assets/img/no-photo.png')} alt="profile" />
                            }
                        </div>
                        <div className="ml-2"><b className="font-xl">Tim {getTeam?.lead?.leadName}</b></div>
                    </CardHeader>
                    <CardBody>
                        <Nav vertical className="tour-tabApplicantDetail">
                            {tabsArray.map(tab => (
                                <NavItem key={tab}>
                                    <NavLink tag={Link} active={selectedTab === tab} replace to={{ hash: "#" + tab }}>
                                        {tabs[tab]}
                                    </NavLink>
                                </NavItem>
                            ))}
                        </Nav>
                    </CardBody>
                </Card>
            </Col>
            <Col xs="10" className="px-0">
                <TabContent activeTab={selectedTab} className="p-0">
                    <TabPane tabId="sprint" className="py-0">
                        <Row>
                            <Col sm="12">
                                <DesignSprint />
                            </Col>
                        </Row>
                    </TabPane>

                    <TabPane tabId="myteam" className="py-0">
                        <Row>
                            <Col sm="12">
                                <TeamDetail />
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>
            </Col>
        </Row>
    )
}

export default TeamWrapper;