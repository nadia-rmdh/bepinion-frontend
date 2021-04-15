import React, { Component } from 'react';
import { Row, Col, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import PengaturanListJabatan from './PengaturanListJabatan';
import PengaturanListUnit from './PengaturanListUnit';
import { connect } from 'react-redux';
import PengaturanStruktur from './PengaturanStruktur';
import {
    translate,
} from 'react-switch-lang';
class PengaturanJabatan extends Component {

    constructor(props) {
        super(props);
        const { t } = this.props;
        this.state = {
            activeTab: 0,
            userPrivileges: this.props.user.privileges
        };

        this.tabs = [
            { name: t('jabatan'), component: PengaturanListJabatan, privileges: 'read-company-structure-jabatan' },
            { name: 'Unit', component: PengaturanListUnit, privileges: 'read-company-structure-unit' },
            { name: t('strukturunit'), component: PengaturanStruktur, privileges: 'read-company-structure' },
        ];
    }

    componentDidMount() {
        this.getActivePane(this.state.userPrivileges);
    }

    getActivePane(privileges) {
        if (privileges.includes('read-company-structure-jabatan')) {
            this.setActiveTab(0)
        } else if (privileges.includes('read-company-structure-unit')) {
            this.setActiveTab(1)
        } else if (privileges.includes('read-company-structure')) {
            this.setActiveTab(2)
        }
    }

    setActiveTab(activeTab) {
        console.log(activeTab);
        this.setState({ activeTab })
    }

    render() {
        const { t } = this.props;
        return (
            <div className="animated fadeIn">
                <h4 className="content-title mb-4">{t('pengaturan')} {t('jabatan')} &amp; Unit</h4>
                <Row>
                    <Col xs="12" md="12" className="mb-12">
                        <Nav tabs>
                            {this.tabs.map((item, index) => (
                                <>
                                    {this.state.userPrivileges.includes(item.privileges) &&
                                        <NavItem key={index}>
                                            <NavLink active={this.state.activeTab === index} onClick={() => this.setActiveTab(index)}>
                                                {item.name}
                                            </NavLink>
                                        </NavItem>
                                    }
                                </>
                            ))}
                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                            {this.tabs.map((item, index) => {
                                const TabComponent = item.component;
                                return (<TabPane tabId={index} key={index}>
                                    <TabComponent />
                                </TabPane>
                                )
                            })}
                        </TabContent>
                    </Col>
                </Row>
            </div>
        );
    }
}
// const mapStateToProps = (state) => {
//     return {
//         sessionId: state.sessionId
//     }
// }
const mapStateToProps = ({ isAdminPanel, user }) => ({ isAdminPanel, user });
export default connect(mapStateToProps)(translate(PengaturanJabatan));
