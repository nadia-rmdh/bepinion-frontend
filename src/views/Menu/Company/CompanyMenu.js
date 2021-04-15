import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import banner from '../../../assets/assets_ari/333.png';
import leaf from '../../../assets/assets_ari/leaf.svg';
import { FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import request from '../../../utils/request';
import {
    translate,
} from 'react-switch-lang';
class CompanyMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: [false, false],
            session: props.token
        };
    }

    componentDidMount() {
        this.getDataCompany(this.props);
    }

    getDataCompany = async (props) => {
        try {
            const { data } = await request.get('v1/company');
            const companies = data.data[0]
            this.setState({
                name: companies.name,
                email: companies.email,
                domain: companies.domain,
                address: companies.address,
                country: companies.country.name,
                parent: companies.parent.name
            })
        } catch (err) {
            console.log(err)
            throw err;
        }
    }

    render() {
        const { privileges: userPrivileges = [] } = this.props.user;
        const { t } = this.props;
        return (
            <div className="animated fadeIn">
                <h4 className="content-title mb-4">{t('informasiperusahaan')}</h4>
                <div className="content-body">
                    <div className="row">
                        <div className="menu col-md-8">
                            <div className="row">
                                {userPrivileges.includes('read-company-profile') && <div className="col-12 col-sm-4 col-lg-4">
                                    <Link to="/company/pengaturan-profil-perusahaan">
                                        <div className="card menu-item">
                                            <div className="card-body">
                                                <div className="menu-img mt-2 mb-3">
                                                    <img src={require("../../../assets/assets_ari/336.svg")} alt="" />
                                                </div>
                                                <div className="menu-title mb-2">
                                                    <p className="mb-0 title-menu-company">{t('Profil')} <br />{t('perusahaan')}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>}
                                {/*
                                <div className="col-12 col-sm-4 col-lg-4">
                                    <Link to="/company/pengaturan-dasar">
                                        <div className="card menu-item">
                                            <div className="card-body">
                                                <div className="menu-img mt-2 mb-3">
                                                    <img src={require("../../../assets/assets_ari/334.svg")} alt="" />
                                                </div>
                                                <div className="menu-title mb-2">
                                                    <p className="mb-0 title-menu-company">{t('pengaturan')}<br />{t('dasar')}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
								*/}
                                {userPrivileges.includes('read-company-structure') && <div className="col-12 col-sm-4 col-lg-4">
                                    <Link to="/company/pengaturan-jabatan">
                                        <div className="card menu-item">
                                            <div className="card-body">
                                                <div className="menu-img mt-2 mb-3">
                                                    <img src={require("../../../assets/assets_ari/335.svg")} alt="" />
                                                </div>
                                                <div className="menu-title mb-2">
                                                    <p className="mb-0 title-menu-company">{t('pengaturan')}<br />{t('jabatan')} &amp; Unit</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>}
                                {userPrivileges.includes('read-company-holiday') && <div className="col-12 col-sm-4 col-lg-4">
                                    <Link to="/company/pengaturan-cuti-perusahaan">
                                    {/* TODO: RELEASE TO MVP6 
                                    <Link to="/company/pengaturan-cuti-perusahaan/master"> */}
                                        <div className="card menu-item">
                                            <div className="card-body">
                                                <div className="menu-img mt-2 mb-3">
                                                    <img src={require("../../../assets/assets_ari/cuti.png")} alt="" />
                                                </div>
                                                <div className="menu-title mb-2">
                                                    <p className="mb-0 title-menu-company">{t('pengaturan')}<br />{t('cuti')} </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>}
                                {userPrivileges.includes('read-company-role') && <div className="col-12 col-sm-4 col-lg-4">
                                    <Link to="/company/pengaturan-role">
                                        <div className="card menu-item">
                                            <div className="card-body">
                                                <div className="menu-img mt-2 mb-3">
                                                    <img className="mt-auto" src={require("../../../assets/img/illustrations/pengaturan-role.svg")} alt="" />
                                                </div>
                                                <div className="menu-title mb-2">
                                                    <p className="mb-0 title-menu-company">{t('pengaturan')}<br />{t('role')} & Hak Akses </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>}

                                {userPrivileges.includes('read-company-overtime') && <div className="col-12 col-sm-4 col-lg-4">
                                    <Link to="/company/pengaturan-lembur-perusahaan">
                                        <div className="card menu-item">
                                            <div className="card-body">
                                                <div className="menu-img mt-2 mb-3">
                                                    <img src={require("../../../assets/assets_ari/334.svg")} alt="" />
                                                </div>
                                                <div className="menu-title mb-2">
                                                    <p className="mb-0 title-menu-company">{t('pengaturan')}<br />{t('kebijakan lembur')} </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>}
                            </div>
                        </div>
                        <div className="col-md-4  padding-0">
                            <div className="col-12">
                                <div className="card banner-upgrade" style={{ backgroundImage: `url(${banner})` }}>
                                    <div className="card-body">
                                        <p className="mb-5 title-upgrade">{t('rasakan')} <br /> {t('kemudahan')} <br />{t('ditangananda')}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="card banner-information" style={{ backgroundImage: `url(${leaf})` }}>
                                    <div className="card-body">
                                        <h5 className="mb-5 text-center title-information-company">{t('ringakasaninformasiperusahaan')}</h5>
                                        <FormGroup>
                                            <Label htmlFor="name" className="label-information">{t('namaperusahaan')}</Label>
                                            <Input type="text" id="name" defaultValue={this.state.name} className="input-information" disabled />
                                        </FormGroup>
                                        <br />
                                        <FormGroup>
                                            <Label htmlFor="email" className="label-information">{t('emailperusahaan')}</Label>
                                            <Input type="text" id="email" defaultValue={this.state.email} className="input-information" disabled />
                                        </FormGroup>
                                        <br />
                                        <FormGroup>
                                            <Label htmlFor="negara" className="label-information">{t('negaraperusahaan')}</Label>
                                            <Input type="text" id="negara" defaultValue={this.state.country} className="input-information" disabled />
                                        </FormGroup>
                                        <br />
                                        <FormGroup>
                                            <Label htmlFor="alamat" className="label-information">{t('alamatperusahaan')}</Label>
                                            <Input type="textarea" id="alamat" defaultValue={this.state.address} className="input-information" rows="4" disabled />
                                        </FormGroup>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

const mapStateToProps = (reduxState) => ({ user: reduxState.user, token: reduxState.token })

export default connect(mapStateToProps)(translate(CompanyMenu));
