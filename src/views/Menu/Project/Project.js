import React from 'react'
import { Link, useLocation } from "react-router-dom";
import { Nav, NavItem, NavLink } from 'reactstrap';

const tabs = {
    'unverified' : 'Belum diverifikasi',
    'accepted' : 'Disetujui',
    'rejected' : 'Ditolak'
}
const tabsArray = Object.keys(tabs);

function Project(){
    const location = useLocation();
    const selectedTab = location.hash ? location.hash.substring(1) : tabsArray[0];
    return(
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
        </div>
    )
}

export default Project