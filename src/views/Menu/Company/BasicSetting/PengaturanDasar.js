import React, { Component } from 'react';
import { Row, Col, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import PengaturanDasarAgama from './PengaturanDasarAgama';
import PengaturanDasarDokumen from './PengaturanDasarDokumen';
import PengaturanDasarJk from './PengaturanDasarJk';
import PengaturanDasarPernikahan from './PengaturanDasarPernikahan';
import { connect } from 'react-redux';
import {
    translate,
} from 'react-switch-lang';
class PengaturanDasar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dropdownOpen: [false, false],
            activeTab: new Array(4).fill('1'),
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
                    <PengaturanDasarAgama />
                </TabPane>
                <TabPane tabId="2">
                    <PengaturanDasarJk />
                </TabPane>
                <TabPane tabId="3">
                    <PengaturanDasarDokumen />
                </TabPane>
                <TabPane tabId="4">
                    <PengaturanDasarPernikahan />
                </TabPane>
            </>
        );
    }

    render() {
        const { t } = this.props;
        return (
            <div className="animated fadeIn">
                <h4 className="content-title mb-4">{t('pengaturandasar')} </h4>
                <Row>
                    <Col xs="12" md="12" className="mb-12">
                        <Nav tabs>
                            <NavItem >
                                <NavLink
                                    active={this.state.activeTab[0] === '1'}
                                    onClick={() => { this.toggle(0, '1'); }}
                                >
                                    {t('agama')}
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    active={this.state.activeTab[0] === '2'}
                                    onClick={() => { this.toggle(0, '2'); }}
                                >
                                    {t('jk')}
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    active={this.state.activeTab[0] === '3'}
                                    onClick={() => { this.toggle(0, '3'); }}
                                >
                                    {t('tipedokumen')}
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    active={this.state.activeTab[0] === '4'}
                                    onClick={() => { this.toggle(0, '4'); }}
                                >
                                    {t('statuspernikahan')}
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
export default connect(mapStateToProps)(translate(PengaturanDasar));