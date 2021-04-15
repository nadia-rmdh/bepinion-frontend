import React, { Component, Fragment } from 'react';
import { Row, Col, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import PersonnelProfile from './User/PersonnelProfile';
import PersonnelDocument from './User/PersonnelDocument';
import PersonnelResume from './User/PersonnelResume';
// import Axios from 'axios';
// import { Redirect } from "react-router";
// import NoData from '../../../assets/assets_ari/481.png';
// import LoadingAnimation from './component/atom/LoadingAnimation';
import { connect } from 'react-redux';
// import PersonnelTaxId from './PersonnelTaxId';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'rc-datepicker/lib/style.css';
import {
    translate,
} from 'react-switch-lang';
import PersonnelAssessmentResult from './PersonnelAssessmentResult';
toast.configure()
class PersonnelDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dropdownOpen: [false, false],
            activeTab: new Array(5).fill('1'),
            loading: true,
            loadingButton: false,
            personnel: props.user,
        };
    }

    toggle(tabPane, tab) {
        const newArray = this.state.activeTab.slice()
        newArray[tabPane] = tab
        this.setState({
            activeTab: newArray,
        });
    }

    // componentDidMount = () => {
    //     Axios.get(process.env.REACT_APP_DOMAIN + `/api/v1/personnels?id=` + this.props.match.params.id, { headers: { "Authorization": `Bearer ${this.state.session}` } })
    //         .then(res => {
    //             const personnel = res.data.data[0];
    //             personnel !== undefined ? this.setState({ personnel }) : this.setState({ personnel: this.state.personnel })
    //             // this.setState({ personnel });
    //             setTimeout(() => {
    //                 this.setState({
    //                     loading: false
    //                 })
    //             }, 500)
    //         })
    //         .catch(error => {
    //             console.log(error)
    //             setTimeout(() => {
    //                 this.setState({
    //                     loading: false
    //                 })
    //             }, 500)
    //         });
    // }

    render() {
        const { t } = this.props;
        let tabContent;
        if (this.state.activeTab[0] === '1') {
            tabContent = <PersonnelProfile personnel={this.state.personnel.personnel} />
        } else if (this.state.activeTab[0] === '2') {
            tabContent = <PersonnelDocument personnel={this.state.personnel.personnel} />
        } else if (this.state.activeTab[0] === '3') {
            tabContent = <PersonnelResume personnel={this.state.personnel.personnel} />
        }
        else if (this.state.activeTab[0] === '4') {
            tabContent = <PersonnelAssessmentResult isProfile={true} personnel={this.state.personnel.personnel} />
        }
        return (
            <div className="">
                < Fragment >
                    <Row>
                        <Col sm="12" md="12">
                            <h4 className="content-title">Detail {t('karyawan')}</h4>
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
                                        Profile
                                            </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        active={this.state.activeTab[0] === '2'}
                                        onClick={() => { this.toggle(0, '2'); }}
                                    >
                                        {t('dokumen')}
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        active={this.state.activeTab[0] === '3'}
                                        onClick={() => { this.toggle(0, '3'); }}
                                    >
                                        Resume
                                            </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        active={this.state.activeTab[0] === '4'}
                                        onClick={() => { this.toggle(0, '4'); }}
                                    >
                                        Hasil Asesmen
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <TabContent activeTab={this.state.activeTab[0]}>
                                <TabPane tabId={this.state.activeTab[0]}>
                                    {tabContent}
                                </TabPane>
                            </TabContent>
                        </Col>
                    </Row>
                </Fragment>
            </div >
        );
    }
}

export default connect(({user}) => ({user}))(translate(PersonnelDetail));
