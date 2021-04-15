import React, {useState, useEffect} from 'react';
import { TabContent, Row, Col, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import RecruitmentMenu from "./RecruitmentMenu"
import ApplicantList from "./Applicants/ApplicantList"
import { Link, useLocation } from "react-router-dom";
import { useAuthUser, useUserPrivileges } from '../../../store';
import InternalAssessment from './Internal/InternalAssessment';
import ModalPrivilegeForbidden from '../../../components/ModalPrivilegeForbidden';

const tabs = {
    'jobs': 'Daftar Lowongan',
    'applicants': 'Daftar Pelamar',
    'assessment': 'Assessment Center'
}

const tabsArray = Object.keys(tabs);

function RecruitmentVacancies() {
    const user = useAuthUser();
    const [tabApplicant, setTabApplicant] = useState(false);
    const [tabRecruitment, setTabRecruitment] = useState(false);
    const [tabAssessment, setTabAssessment] = useState(false);
    const [forbidden, setForbidden] = useState(false);
    const {can} = useUserPrivileges();
    const location = useLocation();
    const [selectedTab, setSelectedTab] = useState(location.hash ? location.hash.substring(1) : tabsArray[0]);

    useEffect(() => {
        if(user.guidance.jobList && user.guidance.applicantList && user.guidance.internalAssessmentBefore && user.guidance.internalAssessmentAfter){
            setTabApplicant(true);
            setTabRecruitment(true);
            setTabAssessment(true);
        }
        else {
            if(selectedTab === 'jobs'){
                setTabRecruitment(true);
                setTabApplicant(false);
                setTabAssessment(false);
            }
            else if(selectedTab === 'applicants'){
                setTabApplicant(true);
                setTabRecruitment(false);
                setTabAssessment(false);
            }
            else if(selectedTab === 'assessment'){
                setTabRecruitment(false);
                setTabApplicant(false);
                setTabAssessment(true);
            }
        }
    }, [user, selectedTab])

    return (
        <div>
            {forbidden && <ModalPrivilegeForbidden isOpen={true} forbidden="canInternalAssesment" isClose={() => setForbidden(false)} />}
            <div className="d-flex bd-highlight mb-3">
                <div className="mr-auto bd-highlight">
                </div>
            </div>
            <Nav tabs className="mx-3 tour-jobtab">
                <NavItem>
                    <NavLink tag={Link} className="pt-2/5" onClick={() => setSelectedTab('jobs')} active={selectedTab === "jobs"} replace to={{ hash: "#jobs" }}>
                        Daftar Lowongan
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} className="pt-2/5" onClick={() => setSelectedTab('applicants')} active={selectedTab === "applicants"} replace to={{ hash: "#applicants" }}>
                        Daftar Pelamar
                    </NavLink>
                </NavItem>
                {can('canInternalAssesment') ?
                    <NavItem>
                        <NavLink tag={Link} className="pt-2/5" onClick={() => setSelectedTab('assessment')} active={selectedTab === "assessment"} replace to={{ hash: "#assessment" }}>
                            Assessment Center
                        </NavLink>
                    </NavItem>
                :
                    <NavItem>
                        <NavLink style={{color:"#73818f"}} className="pt-2/5" onClick={() => setForbidden(true)}>
                            Assessment Center
                        </NavLink>
                    </NavItem>
                }
            </Nav>
            <TabContent activeTab={selectedTab}>
                <TabPane tabId="jobs">
                    <Row>
                        <Col sm="12">
                            {tabRecruitment && <RecruitmentMenu />}
                        </Col>
                    </Row>
                </TabPane>

                <TabPane tabId="applicants">
                    <Row>
                        <Col sm="12">
                            {tabApplicant && <ApplicantList />}
                        </Col>
                    </Row>
                </TabPane>

                <TabPane tabId="assessment">
                    <Row>
                        <Col sm="12">
                            {!can('canInternalAssesment') ?
                                <div><center><h1>403 Sorry, this page is forbidden.</h1></center></div>
                                :
                                (tabAssessment && <InternalAssessment />)
                            }
                        </Col>
                    </Row>
                </TabPane>
            </TabContent>
        </div>
    )
}

export default RecruitmentVacancies;
