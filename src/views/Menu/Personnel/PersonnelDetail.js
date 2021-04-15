import React, { Component, Fragment } from 'react';
import { Row, Col, Nav, NavItem, NavLink, TabContent, TabPane, Button, Modal, ModalBody, Spinner, FormGroup, Label, CustomInput, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown } from 'reactstrap';
// import PersonnelProfile from './PersonnelProfile';
import PersonnelDocument from './PersonnelDocument';
import PersonnelResume from './PersonnelResume';
import PersonnelProfileNew from './PersonnelProfileNew';
import PersonnelContractHistory from './PersonnelContractHistory';
import Axios from 'axios';
// import { Redirect } from "react-router";
import NoData from '../../../assets/assets_ari/481.png';
import LoadingAnimation from './component/atom/LoadingAnimation';
import { connect } from 'react-redux';
import PersonnelTaxId from './PersonnelTaxId';
import { toast } from 'react-toastify';
import { DatePickerInput } from 'rc-datepicker';
import 'react-toastify/dist/ReactToastify.css';
import 'rc-datepicker/lib/style.css';
import { requestDownload } from '../../../utils/request';
import {
    translate,
} from 'react-switch-lang';
import PersonnelAssessmentResult from './PersonnelAssessmentResult';
import { setUser } from '../../../actions/auth';
toast.configure()
class PersonnelDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dropdownOpen: [false, false],
            activeTab: new Array(5).fill('1'),
            loading: true,
            loadingButton: false,
            modalDeleteData: false,
            modalNonaktifData: false,
            personnel: {},
            session: props.token,
            documents: [],
            date: new Date(),
            endDate: this.formatDate(new Date()),
            userLogin: props.user,
            checkSaved: false,
            downloadProfileLoading: false,
            userPrivileges: props.user.privileges
        };
    }

    setActivePane(privileges) {
        const newArray = this.state.activeTab.slice()
        if (privileges.includes('read-employee-profile')) {
            newArray[0] = '1'
        } else if (privileges.includes('read-employee-document')) {
            newArray[0] = '2'
        } else if (privileges.includes('read-employee-pajak')) {
            newArray[0] = '3'
        } else if (privileges.includes('read-employee-resume')) {
            newArray[0] = '4'
        } else if (privileges.includes('read-employee-history')) {
            newArray[0] = '5'
        } else if (privileges.includes('read-assessment-result')) {
            newArray[0] = '6'
        }

        this.setState({
            activeTab: newArray,
        });
    }

    toggleCheckSaved = () => {
        this.setState({ checkSaved: !this.state.checkSaved });
    }

    downloadProfile = () => {
        if (this.state.downloadProfileLoading) {
            return;
        }
        this.setState({ downloadProfileLoading: true });
        requestDownload(`v1/personnels/${this.state.personnel.id}/download-profile`)
            .finally(() => {
                this.setState({ downloadProfileLoading: false })
            })
    }

    toggle(tabPane, tab) {
        const newArray = this.state.activeTab.slice()
        newArray[tabPane] = tab
        this.setState({
            activeTab: newArray,
        });
    }

    componentDidMount = () => {
        Axios.get(process.env.REACT_APP_DOMAIN + `/api/v1/personnels?id=` + this.props.match.params.id, { headers: { "Authorization": `Bearer ${this.state.session}` } })
            .then(res => {
                const personnel = res.data.data;
                personnel !== undefined ? this.setState({ personnel }) : this.setState({ personnel: this.state.personnel })
                // this.setState({ personnel });
                setTimeout(() => {
                    this.setState({
                        loading: false
                    })
                }, 500)
            })
            .catch(error => {
                console.log(error)
                setTimeout(() => {
                    this.setState({
                        loading: false
                    })
                }, 500)
            });
        this.setActivePane(this.state.userPrivileges);
    }

    handleChangeDate = date => {
        this.setState({ date, endDate: this.formatDate(date) })
    }

    formatDate = (date) => {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }
    modalNonaktifData = () => {
        this.setState({ modalNonaktifData: !this.state.modalNonaktifData, modalDeleteData: false })
    }
    modalDeleteData = () => {
        this.setState({ modalDeleteData: !this.state.modalDeleteData, modalNonaktifData: false })
    }

    disableData = () => {
        if(!this.state.userPrivileges.includes('verify-employee')){
            toast.error('Maaf anda tidah boleh melakukan aksi ini.')
            return
        }
        this.setState({ loadingButton: true })
        const objectData = {
            fullName: this.state.personnel.fullName,
            nickName: this.state.personnel.nickName,
            phone: this.state.personnel.phone,
            email: this.state.personnel.email,
            dateOfBirth: this.state.personnel.dateOfBirth,
            active: 2,
            endDate: this.state.endDate
        }
        Axios.put(process.env.REACT_APP_DOMAIN + '/api/v1/personnels/' + this.state.personnel.id, objectData, { headers: { "Authorization": `Bearer ${this.state.session}` } })
            .then(res => {
                setTimeout(() => {
                    this.setState({ loadingButton: false })
                    toast.success('Success Non Active', { autoClose: 3000 })
                    this.props.history.push('/personnels')
                }, 500)
            })
            .catch(error => {
                toast.error('Error', { autoClose: 3000 })
            })
    }

    deleteData = () => {
        if(!this.state.userPrivileges.includes('delete-employee')){
            toast.error('Maaf anda tidah boleh melakukan aksi ini.')
            return
        }
        this.setState({ loadingButton: true })
        Axios.delete(process.env.REACT_APP_DOMAIN + '/api/v1/personnels/' + this.state.personnel.id, { headers: { "Authorization": `Bearer ${this.state.session}` } })
            .then(res => {
                setTimeout(() => {
                    this.setState({ loadingButton: false })
                    toast.success('Success Delete', { autoClose: 3000 })
                    this.props.history.push('/personnels')
                }, 500)
            })
            .catch(error => {
                toast.error('Error', { autoClose: 3000 })
                console.log(error)
            })
    }
    verifData = () => {
        if(!this.state.userPrivileges.includes('verify-employee')){
            toast.error('Maaf anda tidah boleh melakukan aksi ini.')
            return
        }
        // let verif = { ...this.state.personnel, verif: 1 };
        // this.setState({
        //     personnel: verif,
        // }, () => {
        //     Axios.put(process.env.REACT_APP_DOMAIN + '/api/v1/personnels/' + this.state.personnel.id, this.state.personnel, { headers: { "Authorization": `Bearer ${this.state.session}`, 'content-type': 'multipart/form-data' } })
        //         .then(res => {
        //             setTimeout(() => {
        //                 toast.success('Karyawan Berhasil Diunverifikasi', { autoClose: 3000 })
        //             }, 500)
        //         })
        //         .catch(
        //             toast.error('Error', { autoClose: 3000 }))
        // });
        let verifState = { ...this.state.personnel };
        verifState['verif'] = 'verified';
        // const verif = {
        //     verif: 1
        // }
        this.setState({
            personnel: verifState,
        }, () => {
            Axios.put(process.env.REACT_APP_DOMAIN + '/api/v1/personnels/' + this.state.personnel.id + '/verif', null, { headers: { "Authorization": `Bearer ${this.state.session}` } })
                .then(res => {
                    toast.success('Success Verified', { autoClose: 3000 });
                    // window.location.reload();
                    if (this.state.personnel.id === this.state.userLogin.id) {
                        let user = { ...this.state.userLogin };
                        user['verif'] = 'verified';
                        this.props.setUser(user);
                    }
                })
                .catch((error) => {
                    console.log(error)
                    toast.error('Error', { autoClose: 3000 })
                })
        }
        )
    }
    unverifData = () => {
        if(!this.state.userPrivileges.includes('verify-employee')){
            toast.error('Maaf anda tidah boleh melakukan aksi ini.')
            return
        }
        // e.preventDefault();
        let verifState = { ...this.state.personnel };
        verifState['verif'] = 'unverified';
        // const verif = {
        //     verif: 2
        // }
        // console.log(verifState)
        this.setState({
            personnel: verifState,
        }, () => {
            Axios.put(process.env.REACT_APP_DOMAIN + '/api/v1/personnels/' + this.state.personnel.id + '/verif', null, { headers: { "Authorization": `Bearer ${this.state.session}` } })
                .then(res => {
                    toast.success('Success Unverified', { autoClose: 3000 });
                    if (this.state.personnel.id === this.state.userLogin.id) {
                        let user = { ...this.state.userLogin };
                        user['verif'] = 'unverified';
                        this.props.setUser(user);
                    }
                })
                .catch((error) => {
                    toast.error('Error', { autoClose: 3000 })
                })
        }
        )
    }
    handleResign(e) {
        if(!this.state.userPrivileges.includes('edit-employee')){
            toast.error('Maaf anda tidah boleh melakukan aksi ini.')
            return
        }
        e.preventDefault();
        let active = { ...this.state.personnel, active: 2 };
        this.setState({
            personnel: active,
        }, () => {
            Axios.put(process.env.REACT_APP_DOMAIN + '/api/v1/personnels/' + this.state.personnel.id + '/active', this.state.personnel, { headers: { "Authorization": `Bearer ${this.state.session}`, 'content-type': 'multipart/form-data' } })
                .then(res => {
                    setTimeout(() => {
                        this.setState({ loadingButton: false })
                        toast.success('Success Non Active', { autoClose: 3000 })
                        this.props.history.push('/personnels')
                    }, 500)
                })
                .catch(
                    toast.error('Error', { autoClose: 3000 }))
        });

    };

    render() {
        const isPersonnelActive = this.state.personnel.active === 'aktif' || this.state.personnel.active === null;
        let tabContent;
        if (this.state.activeTab[0] === '1') {
            tabContent = <PersonnelProfileNew personnel={this.state.personnel} />
        } else if (this.state.activeTab[0] === '2') {
            tabContent = <PersonnelDocument personnel={this.state.personnel} />
        } 
        else if (this.state.activeTab[0] === '3') {
            tabContent = <PersonnelTaxId personnel={this.state.personnel} />
        } else if (this.state.activeTab[0] === '4') {
            tabContent = <PersonnelResume personnel={this.state.personnel} />
        } else if (this.state.activeTab[0] === '5') {
            tabContent = <PersonnelContractHistory personnel={this.state.personnel} />
        } else if (this.state.activeTab[0] === '6') {
            tabContent = <PersonnelAssessmentResult personnel={this.state.personnel} />
        }
        const { t } = this.props;
        return (
            <div className="">
                {this.state.loading ? <LoadingAnimation /> :
                    Object.entries(this.state.personnel).length > 0 ?
                        < Fragment >
                            <Row className="align-items-center">
                                <Col sm="6" md="6">
                                    <h4 className="content-title">Detail {t('karyawan')}</h4>
                                </Col>
                                <Col sm="6" className="text-right">
                                    <div className="d-flex justify-content-end align-items-center h-100">
                                        {this.state.personnel.verif === 'unverified' || this.state.personnel.verif === null ?
                                            <Button className={`${this.state.userPrivileges.includes('verify-employee') ? '' : ' d-none'}`} color="primary" onClick={this.verifData}>
                                                <i className='fa fa-check mr-2'></i>
                                                {t('verifikasi')} {t('karyawan')}
                                            </Button>
                                            :
                                            <Button className={`${this.state.userPrivileges.includes('verify-employee') ? '' : ' d-none'}`} color="primary" onClick={this.unverifData}>
                                                <i className='fa fa-close mr-2'></i>
                                                {t('hapus')} {t('verifikasi')} {t('karyawan')}
                                            </Button>
                                        }
                                        <UncontrolledDropdown className="ml-3">
                                            <DropdownToggle outline color="dark">
                                                <i className="fa fa-bars mr-2"></i> {t('lainnya')}
                                            </DropdownToggle>
                                            <DropdownMenu right>
                                                <DropdownItem toggle={false} onClick={this.downloadProfile} className={`${this.state.userPrivileges.includes('download-employee') ? '' : ' d-none'}`}>
                                                    {this.state.downloadProfileLoading ? <Fragment><Spinner size="sm" /> Loading... </Fragment> : <span><i className="fa fa-download mr-1"></i> {t('unduh')} profile PDF</span>}
                                                </DropdownItem>
                                                <DropdownItem className={`${this.state.userPrivileges.includes('verify-employee') ? '' : ' d-none'}`} onClick={this.modalDeleteData}>
                                                    {isPersonnelActive ?
                                                        <Fragment><i className="fa fa-user-times mr-2"></i> {t('nonaktifkan')} {t('karyawan')}</Fragment>
                                                        : <Fragment><i className="fa fa-trash mr-2"></i> {t('hapus')} {t('karyawan')}</Fragment>
                                                    }
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="12" md="12" className="mb-12">
                                    <Nav tabs>
                                        {this.state.userPrivileges.includes('read-employee-profile') &&
                                            <NavItem >
                                                <NavLink
                                                    active={this.state.activeTab[0] === '1'}
                                                    onClick={() => { this.toggle(0, '1'); }}
                                                >
                                                    Profile
                                            </NavLink>
                                            </NavItem>
                                        }
                                        {/* {this.state.userPrivileges.includes('read-employee-profile') &&
                                            <NavItem >
                                                <NavLink
                                                    active={this.state.activeTab[0] === '0'}
                                                    onClick={() => { this.toggle(0, '0'); }}
                                                >
                                                    V2
                                            </NavLink>
                                            </NavItem>
                                        } */}
                                        {this.state.userPrivileges.includes('browse-employee-document') &&
                                            <NavItem>
                                                <NavLink
                                                    active={this.state.activeTab[0] === '2'}
                                                    onClick={() => { this.toggle(0, '2'); }}
                                                >
                                                    {t('dokumen')}
                                                </NavLink>
                                            </NavItem>
                                        }
                                        {this.state.userPrivileges.includes('read-employee-pajak') &&
                                            <NavItem>
                                                <NavLink
                                                    active={this.state.activeTab[0] === '3'}
                                                    onClick={() => { this.toggle(0, '3'); }}
                                                >
                                                    {t('identitaspajak')}
                                                </NavLink>
                                            </NavItem>
                                        }
                                        {this.state.userPrivileges.includes('browse-employee-resume') &&
                                            <NavItem>
                                                <NavLink
                                                    active={this.state.activeTab[0] === '4'}
                                                    onClick={() => { this.toggle(0, '4'); }}
                                                >
                                                    Resume
                                            </NavLink>
                                            </NavItem>
                                        }
                                        {this.state.userPrivileges.includes('browse-employee-history') &&
                                            <NavItem>
                                                <NavLink
                                                    active={this.state.activeTab[0] === '5'}
                                                    onClick={() => { this.toggle(0, '5'); }}
                                                >
                                                    {t('riwayatkontrak')}
                                                </NavLink>
                                            </NavItem>
                                        }
                                        {this.state.userPrivileges.includes('browse-assessment-result') &&
                                            <NavItem>
                                                <NavLink active={this.state.activeTab[0] === '6'} onClick={() => { this.toggle(0, '6') }}>
                                                    {t('Hasil Asesmen')}
                                                </NavLink>
                                            </NavItem>
                                        }
                                    </Nav>
                                    <TabContent activeTab={this.state.activeTab[0]}>
                                        <TabPane tabId={this.state.activeTab[0]}>
                                            {tabContent}
                                        </TabPane>
                                    </TabContent>
                                </Col>
                            </Row>
                        </Fragment> :
                        <Fragment>
                            <Row>
                                <Col md="12" className="d-flex justify-content-between mb-4">
                                    <h4 className="content-title">Detail  {t('karyawan')}</h4>
                                </Col>
                            </Row>
                            <Row>
                                <div className="col-12 d-flex justify-content-center mt-3 mb-3">
                                    <img src={NoData} alt="no-data" />
                                </div>
                            </Row>
                        </Fragment>
                }

                {/* Modal Box {t('nonaktifkan')} Karyawan */}
                <Modal isOpen={this.state.modalDeleteData} toggle={this.modalDeleteData} className={this.props.className}>
                    <ModalBody>
                        <h5 className="content-sub-title mb-5">
                            {this.state.personnel.active === 'aktif' || this.state.personnel.active === null ? t('nonaktifkan') : t('hapus') + " Data"}  {t('karyawan')}
                        </h5>
                        <Row className="mb-5">
                            {this.state.personnel.active === 'aktif' || this.state.personnel.active === null ?
                                <div className="col-12">
                                    <h6>{t('yakinnonaktif')} <strong>{this.state.personnel.fullName}</strong> {t('telahresign')}</h6>
                                    <FormGroup>
                                        <Label htmlFor="endDate" className="input-label">{t('pilihtglresign')}</Label>
                                        <DatePickerInput
                                            name="endDate"
                                            id="endDate"
                                            onChange={this.handleChangeDate}
                                            value={this.state.date}
                                            className='my-custom-datepicker-component'
                                            required
                                            showOnInputClick={true}
                                            closeOnClickOutside={true}
                                            displayFormat="DD MMMM YYYY"
                                            readOnly
                                        />
                                    </FormGroup>
                                </div> :
                                <div className="col-12 text-center">
                                    <h6>{t('yakinmenghapuskaryawan')} <strong>{this.state.personnel.fullName}</strong> ?</h6>
                                </div>
                            }
                        </Row>
                        <Row>
                            {(this.state.personnel.active === 'aktif' || this.state.personnel.active === null) &&
                                <div className="col-12 d-flex justify-content-end">
                                    <Button className="mr-2" color="white" onClick={this.modalDeleteData}>{t('batal')}</Button>
                                    <Button color="danger" style={{ width: '70px' }} onClick={this.disableData}>
                                        {this.state.loadingButton ? <Spinner color="light" size="sm" /> : t('setuju')}
                                    </Button>
                                </div>
                            }
                            {this.state.personnel.active === 'nonaktif' &&
                                <div className="col-12">
                                    <CustomInput type="checkbox" id="areyousureSwitch" checked={this.state.checkSaved} onChange={this.toggleCheckSaved} name="switchSaved" label="Saya sudah mengunduh profil karyawan ini dan bersedia menghapus karyawan ini untuk selamanya" />
                                    <div className="d-flex justify-content-between mt-4 align-items-center">
                                        <Button color="link" size="sm" onClick={this.downloadProfile}>
                                            {this.state.downloadProfileLoading ? <Fragment><Spinner className="mr-1" size="sm" /> Loading...</Fragment> : <span><i className="fa fa-download mr-1"></i> {t('unduh')} Profile PDF</span>}
                                        </Button>
                                        <Button color="danger" style={{ width: '70px', float: 'right' }} onClick={this.deleteData} disabled={!this.state.checkSaved}>
                                            {this.state.loadingButton ? <Spinner color="light" size="sm" /> : t('hapus')}
                                        </Button>
                                    </div>
                                </div>
                            }
                        </Row>
                    </ModalBody>
                </Modal>
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.token,
        user: state.user
    }
}
export default connect(mapStateToProps, { setUser })(translate(PersonnelDetail));
