import React from 'react'
import { Link, useLocation } from "react-router-dom";
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import ProjectList from './ProjectList';

const tabs = {
    'unverified': 'Belum diverifikasi',
    'accepted': 'Disetujui',
    'rejected': 'Ditolak'
}
const tabsArray = Object.keys(tabs);

function Project() {
    const location = useLocation();
    const selectedTab = location.hash ? location.hash.substring(1) : tabsArray[0];
    return (
        <div className="container p-2 project-tab">
            <h4>Proyek</h4>
            <Nav tabs>
                {tabsArray.map(tab => (
                    <NavItem key={tab}>
                        <NavLink tag={Link} className="pt-2/5" active={selectedTab === tab} replace to={{ hash: "#" + tab }}>
                            {tabs[tab]}
                        </NavLink>
                    </NavItem>
                ))}
            </Nav>
            <TabContent activeTab={selectedTab}>
                <TabPane tabId="unverified">
                    <ProjectList data={data.filter(item => item.status === 'unverified')} />
                </TabPane>
                <TabPane tabId="accepted">
                    <ProjectList data={data.filter(item => item.status === 'accepted')} />
                </TabPane>
                <TabPane tabId="rejected">
                    <ProjectList data={data.filter(item => item.status === 'rejected')} />
                </TabPane>
            </TabContent>

        </div>
    )
}

export default Project