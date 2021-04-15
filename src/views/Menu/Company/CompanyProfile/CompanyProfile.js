import React, { Component } from 'react';
import { Row, Col, 
    // Nav, NavItem, NavLink, TabContent, 
    TabPane} from 'reactstrap';
import CompanyInfo from './CompanyInfo';
import BankInfo from './BankInfo';
import OfficeLocation from './OfficeLocation';
import CompanyDocument from './CompanyDocument';
import { connect } from 'react-redux';
import CompanyAdditionalInfo from './CompanyAdditionalInfo';
// import request from '../../../../utils/request';
import {
    translate,
} from 'react-switch-lang';
class CompanyProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dropdownOpen: [false, false],
            activeTab: new Array(5).fill('1'),
            profileDownloading: false,
            userPrivileges: this.props.user.privileges
        };
    }

    componentDidMount() {
        this.setActivePane(this.state.userPrivileges);
    }

    toggle(tabPane, tab) {
        const newArray = this.state.activeTab.slice()
        newArray[tabPane] = tab
        this.setState({
            activeTab: newArray,
        });
    }

    setActivePane(privileges) {
        const newArray = this.state.activeTab.slice()
        if (privileges.includes('read-company-profile')) {
            newArray[0] = '1'
        } else if (privileges.includes('read-company-document')) {
            newArray[0] = '3'
        } else if (privileges.includes('read-company-bank')) {
            newArray[0] = '4'
        } else if (privileges.includes('read-company-location')) {
            newArray[0] = '5'
        }

        this.setState({
            activeTab: newArray,
        });
    }

    tabPane() {
        return (
            <>
                <TabPane tabId="1">
                    <CompanyInfo />
                </TabPane>
                <TabPane tabId="2">
                    <CompanyAdditionalInfo />
                </TabPane>
                <TabPane tabId="3">
                    <CompanyDocument />
                </TabPane>
                <TabPane tabId="4">
                    <BankInfo />
                </TabPane>
                <TabPane tabId="5">
                    <OfficeLocation />
                </TabPane>
            </>
        );
    }

    // downloadCompanyProfile = () => {
    //     if (this.state.profileDownloading) {
    //         return;
    //     }
    //     this.setState({ profileDownloading: true })
    //     request.get(`v1/company/download_profile`, { responseType: 'arraybuffer' })
    //         .then(res => {
    //             const type = res.headers['content-type']
    //             const blob = new Blob([res.data], { type: type, encoding: 'UTF-8' })
    //             let filename = "company_profile.pdf";
    //             const disposition = res.headers['content-disposition'];
    //             if (disposition && disposition.indexOf('inline') !== -1) {
    //                 const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    //                 const matches = filenameRegex.exec(disposition);
    //                 if (matches != null && matches[1]) {
    //                     filename = matches[1].replace(/['"]/g, '');
    //                 }
    //             }

    //             const URL = window.URL || window.webkitURL;
    //             const downloadUrl = URL.createObjectURL(blob);
    //             let newWindow = null;

    //             const iOS = window.navigator.platform && /iPad|iPhone|iPod/.test(window.navigator.platform)
    //             if (iOS) {
    //                 const reader = new FileReader();
    //                 reader.onload = function (e) {
    //                     newWindow = window.open(reader.result);
    //                     newWindow.onload = function () {
    //                         newWindow.document.getElementsByTagName('html')[0]
    //                             .appendChild(document.createElement('head'))
    //                             .appendChild(document.createElement('title'))
    //                             .appendChild(document.createTextNode(filename));
    //                     }
    //                     setTimeout(() => {
    //                         newWindow.document.title = filename;
    //                     }, 100)
    //                 }
    //                 reader.readAsDataURL(blob);
    //             } else {
    //                 const link = document.createElement('a')
    //                 link.href = downloadUrl
    //                 link.download = filename;
    //                 link.click();
    //                 setTimeout(() => {
    //                     link.remove();
    //                 }, 1500);
    //             }
    //         })
    //         .catch(err => {
    //             console.error(err)
    //         }).finally(() => {
    //             this.setState({ profileDownloading: false })
    //         })
    // }

    render() {
        const { t } = this.props;
        return (
            <div className="animated fadeIn">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 className="content-title mb-0">{t('Profil')} {t('perusahaan')}</h4>
                    {/* <Button className={`${this.state.userPrivileges.includes('download-company-profile') ? '' : ' d-none'}`} color="netis-color" onClick={this.downloadCompanyProfile}>
                        {this.state.profileDownloading ? <Fragment><Spinner size="sm"></Spinner> Loading...</Fragment>
                            : <Fragment><i className="fa fa-download mr-1"></i> {t('unduh')} Profile {t('perusahaan')}</Fragment>}
                    </Button> */}
                </div>
                <Row>
                    <Col xs="12" md="12" className="mb-12">
                        <CompanyInfo />
                        {/* <Nav tabs>
                            {this.state.userPrivileges.includes('read-company-profile') &&
                                <NavItem >
                                    <NavLink
                                        active={this.state.activeTab[0] === '1'}
                                        onClick={() => { this.toggle(0, '1'); }}
                                    >
                                        {t('informasidasar')}
                                    </NavLink>
                                </NavItem>
                            }
                            {this.state.userPrivileges.includes('read-company-profile') &&
                                <NavItem >
                                    <NavLink
                                        active={this.state.activeTab[0] === '2'}
                                        onClick={() => { this.toggle(0, '2'); }}
                                    >
                                        {t('informasitambahan')}
                                    </NavLink>
                                </NavItem>
                            }
                            {this.state.userPrivileges.includes('read-company-document') &&
                                <NavItem>
                                    <NavLink
                                        active={this.state.activeTab[0] === '3'}
                                        onClick={() => { this.toggle(0, '3'); }}
                                    >
                                        {t('dokumenperusahaan')}
                                    </NavLink>
                                </NavItem>
                            }
                            {this.state.userPrivileges.includes('read-company-bank') &&
                                <NavItem>
                                    <NavLink
                                        active={this.state.activeTab[0] === '4'}
                                        onClick={() => { this.toggle(0, '4'); }}
                                    >
                                        {t('informasibank')}
                                    </NavLink>
                                </NavItem>
                            }
                            {this.state.userPrivileges.includes('read-company-location') &&
                                <NavItem>
                                    <NavLink
                                        active={this.state.activeTab[0] === '5'}
                                        onClick={() => { this.toggle(0, '5'); }}
                                    >
                                        {t('lokasikerja')}
                                    </NavLink>
                                </NavItem>
                            }
                        </Nav>
                        <TabContent activeTab={
                            this.state.activeTab[0]
                        }>
                            {this.tabPane()}
                        </TabContent> */}
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

export default connect(mapStateToProps)(translate(CompanyProfile));
