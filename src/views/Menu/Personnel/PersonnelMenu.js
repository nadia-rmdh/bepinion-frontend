import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import banner from '../../../assets/assets_ari/333.png';
// import leaf from '../../../assets/assets_ari/leaf.svg';
// import { FormGroup, Label, Input } from 'reactstrap';
// import axios from 'axios';
import {
    translate,
} from 'react-switch-lang';
class PersonnelMenu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dropdownOpen: [false, false],
            session: props.token
        };
    }

    render() {
        const { privileges: userPrivileges = [] } = this.props.user;
        const { t } = this.props;
        return (
            <div className="animated fadeIn">
                <h4 className="content-title mb-4 text-capitalize">{t('informasi')} {t('karyawan')}</h4>
                <div className="content-body">
                    <div className="row">
                        <div className="menu col-md-8">
                            <div className="row">
                                {userPrivileges.includes('browse-employee-dataActive') && <div className="col-12 col-sm-4 col-lg-4">
                                    <Link to="/personnels">
                                        <div className="card menu-item">
                                            <div className="card-body">
                                                <div className="menu-img mt-2 mb-3">
                                                    <img src={require("../../../assets/assets_ari/daftar.png")} alt="" />
                                                </div>
                                                <div className="menu-title mb-2">
                                                    <p className="mb-0 title-menu-company">{t('daftar')}<br />{t('karyawan')}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>}
                                {userPrivileges.includes('read-employee-workingShift') && <div className="col-12 col-sm-4 col-lg-4">
                                    <Link to="/personnel/working-shift">
                                        <div className="card menu-item">
                                            <div className="card-body">
                                                <div className="menu-img mt-2 mb-3">
                                                    <img src={require("../../../assets/assets_ari/jadwal.png")} alt="" />
                                                </div>
                                                <div className="menu-title mb-2">
                                                    <p className="mb-0 title-menu-company">{t('jadwalkerja')}<br /> {t('karyawan')}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

const mapStateToProps = (reduxState) => ({ user: reduxState.user, token: reduxState.token })

export default connect(mapStateToProps)(translate(PersonnelMenu));
