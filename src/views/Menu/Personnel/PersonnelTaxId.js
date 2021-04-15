import React, { Component, Fragment } from 'react';
import { Row, Button, FormGroup, Input, Label, Spinner } from 'reactstrap';
import Select from 'react-select';
import ReactInputMask from 'react-input-mask';
import request from '../../../utils/request';
import { toast } from 'react-toastify';
// import { connect } from 'react-redux';
import {
    translate,
} from 'react-switch-lang';
import { connect } from 'react-redux';
toast.configure()
class PersonnelTaxId extends Component {

    constructor(props) {
        super(props);
        const { t } = props;
        this.state = {
            session: props.token,
            personnel: this.props.personnel,
            loadingButton: false,
            editTaxId: false,
            image: {
                'preview': null, 'raw': null
            },
            maritalStatus: [
                { value: '1', label: t('kawin') },
                { value: '2', label: t('tidakkawin') }
            ],
            burden: [
                { value: '0', label: '0' },
                { value: '1', label: '1' },
                { value: '2', label: '2' },
                { value: '3', label: '3' }
            ],
            personnelMaritalStatus: {},
            personnelBurden: {},
            taxId: {},
            userPrivileges: props.user.privileges
        }
    }

    componentDidMount = () => {
        this.getDataTaxId(this.state.personnel.id)
    }

    reactSelectStyle = {
        control: (styles, { data, isDisabled, isFocused, isSelected }) => {
            return {
                ...styles,
                backgroundColor: isDisabled ? '#fafbfd' : null,
                cursor: isDisabled ? 'no-drop' : 'default',
                border: '1px solid #e4e7ea'
            };
        },
        indicatorSeparator: styles => ({
            ...styles,
            display: "none"
        }),
        dropdownIndicator: (styles, { data, isDisabled, isFocused, isSelected }) => {
            return {
                ...styles,
                display: isDisabled ? 'none' : null
            };
        }
    }

    editTaxId = () => {
        this.setState({
            editTaxId: !this.state.editTaxId, image: {
                'preview': '', 'raw': ''
            },
        })
    }

    handleInputChange = (e) => {
        e.preventDefault();
        const taxId = { ...this.state.taxId, npwp: e.target.value.replace(/[^\d]/g, '') };
        this.setState({
            taxId
        });
    }

    onChangeMaritalStatus = (value) => {
        const marital = { ...this.state.taxId, marital: value.value }
        this.setState({
            personnelMaritalStatus: value,
            taxId: marital
        })
    }

    onChangeBurden = (value) => {
        const burden = { ...this.state.taxId, burden: value.value }
        this.setState({
            personnelBurden: value,
            taxId: burden
        })
    }

    onChangeDocument = (e) => {
        e.preventDefault();
        if (e.target.files.length) {
            const preview = { ...this.state.image };
            const document = { ...this.state.taxId };
            document['path'] = e.target.files[0];
            preview['preview'] = URL.createObjectURL(e.target.files[0]);
            console.log(preview)
            this.setState({
                taxId: document,
                image: preview
            });
        }
    }

    getDataTaxId = async (id) => {
        const { t } = this.props;
        const { data } = await request.get(`v1/personnels/${id}/tax`)
        let burden = null;
        if (data.data.burden === 0) burden = { value: '0', label: '0' }
        if (data.data.burden === 1) burden = { value: '1', label: '1' }
        if (data.data.burden === 2) burden = { value: '2', label: '2' }
        if (data.data.burden === 3) burden = { value: '3', label: '3' }
        const taxId = { ...data.data, marital: data.data.marital === 'K' ? '1' : '2' }
        this.setState({
            taxId: taxId,
            personnelMaritalStatus: data.data.marital === 'K' ? { value: '1', label: t('kawin') } : { value: '2', label: t('tidakkawin') },
            personnelBurden: burden
        })
    }

    addTaxIdToAPI = async (e) => {
        if (!this.state.userPrivileges.includes('edit-employee-pajak')) {
            toast.error('Maaf anda tidah boleh melakukan aksi ini.')
            return
        }
        this.setState({ loadingButton: true })
        e.preventDefault();
        var formData = new FormData();
        if (this.state.image.preview === '') {
            formData.append('npwp', this.state.taxId.npwp);
            formData.append('marital', this.state.taxId.marital);
            formData.append('burden', this.state.taxId.burden);
        } else {
            formData.append('tax', this.state.taxId.path, this.state.taxId.path.name);
            formData.append('npwp', this.state.taxId.npwp);
            formData.append('marital', this.state.taxId.marital);
            formData.append('burden', this.state.taxId.burden);
        }
        try {
            const response = await request.post(`v1/personnels/${this.state.personnel.id}/tax`, formData);
            // setTimeout(() => {
            // this.setState({ loadingButton: false, editTaxId: false })
            //     toast.success('Data Berhasil Disimpan', { autoClose: 3000 })
            // }, 500);
            toast.success(response.data.message || 'Berhasil diperbarui')
        } catch (err) {
            if (err.response && err.response.data) {
                toast.error(err.response.data.message || 'Error')
            }
            console.log(err)
        } finally {
            this.getDataTaxId(this.state.personnel.id)
            this.setState({ loadingButton: false, editTaxId: false });
        }
    }

    render() {
        const { t } = this.props;
        return (
            <div className="animated fadeIn">
                <div className="content-body">
                    <Row className="md-company-header">
                        <div className="col-12 d-flex justify-content-between align-items-center mb-3">
                            <h5 className="content-sub-title mb-0">{t('identitaspajak')}</h5>
                            {this.state.editTaxId === false ?
                                <Button color="netis-color" className={`${this.state.userPrivileges.includes('edit-employee-pajak') ? '' : ' d-none'}`} onClick={this.editTaxId}>
                                    <i className="fa fa-pencil mr-2"></i>Edit
                                </Button>
                                : null
                            }
                        </div>
                    </Row>
                    <form onSubmit={(e) => this.addTaxIdToAPI(e)}>
                        <Row>
                            <div className="col-md-5 d-flex justify-content-center align-items-center">
                                {this.state.editTaxId === true ?
                                    this.state.image.preview ? (
                                        <Row>
                                            <div className="col-md-12 d-flex justify-content-center align-items-center">
                                                <p>Upload {t('foto')} {t('dokumen')} ( Max. 5 MB ) :</p>
                                            </div>
                                            <div className="col-md-12 d-flex justify-content-center align-items-center">
                                                <FormGroup>
                                                    <img src={this.state.image.preview} alt="preview" width="300" height="300" />
                                                </FormGroup>
                                            </div>
                                            <div className="col-md-12 d-flex justify-content-center align-items-center">
                                                <FormGroup>
                                                    <Input type="file" id="document-img-upload" name="document-img-upload" onChange={this.onChangeDocument} />
                                                </FormGroup>
                                            </div>
                                        </Row>
                                    ) : this.state.tax === null ? (
                                        <Row>
                                            <div className="col-md-12 d-flex justify-content-center align-items-center">
                                                <p>Upload {t('foto')} {t('dokumen')} ( Max. 5 MB ) :</p>
                                            </div>
                                            <div className="col-md-12 d-flex justify-content-center align-items-center">
                                                <div className="input-personnel-document d-flex justify-content-center align-items-center">
                                                    <Label htmlFor="document-img-upload" className="input-label btn-circle"><span className="fa fa-plus"></span></Label>
                                                    <Input type="file" id="document-img-upload" name="document-img-upload" className="d-none" onChange={this.onChangeDocument} />
                                                </div>
                                            </div>
                                        </Row>
                                    ) : (
                                                <Row>
                                                    <div className="col-md-12 d-flex justify-content-center align-items-center">
                                                        <p>Upload {t('foto')} {t('dokumen')} ( Max. 5 MB ) :</p>
                                                    </div>
                                                    <div className="col-md-12 d-flex justify-content-center align-items-center">
                                                        <FormGroup>
                                                            <img src={process.env.REACT_APP_DOMAIN + "" + this.state.taxId.path} alt="Document" className="img-fluid" />
                                                        </FormGroup>
                                                    </div>
                                                    <div className="col-md-12 d-flex justify-content-center align-items-center">
                                                        <FormGroup>
                                                            <Input type="file" id="document-img-upload" name="document-img-upload" onChange={this.onChangeDocument} />
                                                        </FormGroup>
                                                    </div>
                                                </Row>
                                            )
                                    : this.state.tax === null ? (
                                        <h5>Data {t('foto')} {t('dokumen')} {t('kosong')}</h5>
                                    ) : (
                                            <img src={process.env.REACT_APP_DOMAIN + "" + this.state.taxId.path} alt="Document" className="img-fluid" />
                                        )
                                }
                            </div>
                            <div className="col-md-7 form-group">
                                <FormGroup>
                                    <Label className="input-label">{t('nomor')} NPWP</Label>
                                    <ReactInputMask className="form-control" name="start" mask="99.999.999.9-999.999" placeholder={t('nomor') + "NPWP"}
                                        value={this.state.taxId.npwp}
                                        disabled={!this.state.editTaxId}
                                        onChange={this.handleInputChange} />
                                </FormGroup>
                                <FormGroup>
                                    <Label className="input-label">{t('statusperkawinan')}</Label>
                                    <Select
                                        name="maritalStatus"
                                        value={this.state.personnelMaritalStatus}
                                        options={this.state.maritalStatus}
                                        onChange={value => this.onChangeMaritalStatus(value)}
                                        isDisabled={!this.state.editTaxId}
                                        styles={this.reactSelectStyle}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label className="input-label">{t('jumlahtanggungan')}</Label>
                                    <Select
                                        name="burden"
                                        value={this.state.personnelBurden}
                                        options={this.state.burden}
                                        onChange={value => this.onChangeBurden(value)}
                                        isDisabled={!this.state.editTaxId}
                                        styles={this.reactSelectStyle}
                                    />
                                </FormGroup>
                            </div>
                        </Row>
                        <Row>
                            <div className="col-12 d-flex justify-content-end">
                                {this.state.editTaxId === true ?
                                    this.state.loadingButton ? <Spinner color="dark" size="sm" /> :
                                        <Fragment>
                                            <Button color="white" className="btn-white mr-3" onClick={this.editTaxId}>{t('batal')}</Button>
                                            <Button color="netis-color" style={{ width: '67px' }}>
                                                {t('simpan')}
                                            </Button>
                                        </Fragment>
                                    : null
                                }
                            </div>
                        </Row>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.token,
        user: state.user
    }
}
export default connect(mapStateToProps)(translate(PersonnelTaxId));
