import React, { useState } from 'react';
import { TabContent, Row, Col, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import CompanyCuti from "./CompanyCuti";
import MasterCuti from "./MasterCuti";
import classnames from "classnames";
import { t, translate } from "react-switch-lang";

function SettingCuti() {
    const [activeTab, setActiveTab] = useState("1");
    const toggle = (tab) => {
        if (activeTab !== tab) setActiveTab(tab);
    };

    return (
        <div>
            <Nav tabs>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === "1" })}
                        onClick={() => {
                            toggle("1");
                        }}
                    >
                        {t("kebijakancuti")}
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === "2" })}
                        onClick={() => {
                            toggle("2");
                        }}
                    >
                        {t("masterdatacuti")}
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <Row>
                        <Col sm="12">
                            <CompanyCuti />
                        </Col>
                    </Row>
                </TabPane>

                <TabPane tabId="2">
                    <Row>
                        <Col sm="12">
                            <MasterCuti />
                        </Col>
                    </Row>
                </TabPane>
            </TabContent>
        </div>
    )
}

export default translate(SettingCuti);