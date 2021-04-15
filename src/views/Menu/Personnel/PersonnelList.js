import React, { Component } from 'react';
import { Row, Col, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { connect } from 'react-redux';
import PersonnelActive from './PersonnelActive';
import PersonnelNonActive from './PersonnelNonActive';
import {
    translate,
} from 'react-switch-lang';
class PersonnelList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dropdownOpen: [false, false],
            activeTab: 0,
        };


        const { t } = props;
        const tabs = [
            { name: t('karyawan') + ' ' + t('aktif'), component: PersonnelActive, privileges: ['browse-employee-dataActive']},
            { name: t('karyawan') + ' Non ' + t('aktif'), component: PersonnelNonActive, privileges: ['browse-employee-dataNonactive']},
        ]

        this.tabs = tabs.filter((tabObj) => tabObj.privileges.every(p => props.user.privileges.includes(p)))
    }

    setActiveTab(index) {
        this.setState({ activeTab: index });
    }

    toggle(tabPane, tab) {
        const newArray = this.state.activeTab.slice()
        newArray[tabPane] = tab
        this.setState({
            activeTab: newArray,
        });
    }

    tabPane() {
        return (
            <>
                <TabPane tabId="1">
                    <PersonnelActive />
                </TabPane>
                <TabPane tabId="2">
                    <PersonnelNonActive />
                </TabPane>
            </>
        );
    }

    render() {
        const { t } = this.props;
        return (
            <div className="animated fadeIn">
                <h4 className="content-title mb-4">Data {t('karyawan')}</h4>
                <Row>
                    <Col xs="12" md="12" className="mb-12">
                        <Nav tabs>
                            {this.tabs.filter(Boolean).map((tabObj, idx) => (
                                <NavItem key={idx}>
                                    <NavLink active={this.state.activeTab === idx} onClick={() => this.setActiveTab(idx)}>
                                        {tabObj.name}
                                    </NavLink>
                                </NavItem>
                            ))}
                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                            {this.tabs.map((tabObj, idx) => (
                                <TabPane key={idx} tabId={idx}><tabObj.component /></TabPane>
                            ))}
                        </TabContent>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        sessionId: state.sessionId,
        user: state.user
    }
}
export default connect(mapStateToProps)(translate(PersonnelList));
