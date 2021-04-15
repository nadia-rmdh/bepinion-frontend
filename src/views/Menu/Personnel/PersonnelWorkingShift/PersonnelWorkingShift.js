import React, { Component } from 'react';
import { Row, Col, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import WorkingShift from './WorkingShift';
// import LoadingAnimation from './component/atom/LoadingAnimation';
import { connect } from 'react-redux';
class PersonnelWorkingShift extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dropdownOpen: [false, false],
            activeTab: new Array(4).fill('1'),
            personnels: [],
            officeLocation: []
        };
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
                    <WorkingShift />
                </TabPane>
                <TabPane tabId="2">
                    {/* <OfficeLocation /> */}
                </TabPane>
            </>
        );
    }

    render() {
        return (
            <div className="">
                <Row>
                    <Col md="12" className="d-flex justify-content-between mb-4">
                        <h4 className="content-title">Jadwal Kerja Karyawan</h4>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" md="12" className="mb-12">
                        <Nav tabs>
                            <NavItem >
                                <NavLink
                                    active={this.state.activeTab[0] === '1'}
                                    onClick={() => { this.toggle(0, '1'); }}
                                >
                                    Jadwal Kerja
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    active={this.state.activeTab[0] === '2'}
                                    onClick={() => { this.toggle(0, '2'); }}
                                >
                                    Lokasi Kantor
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={this.state.activeTab[0]}>
                            {this.tabPane()}
                        </TabContent>
                    </Col>
                </Row>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        sessionId: state.sessionId
    }
}
export default connect(mapStateToProps)(PersonnelWorkingShift);