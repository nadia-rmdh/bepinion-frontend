import React, { Component, Fragment } from 'react';
import {
    Row,
    Button,
    Col,
    Table,
    Modal,
    ModalBody,
    FormGroup,
    Label,
    Input,
    Spinner
} from 'reactstrap';
import Axios from 'axios';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { DatePickerInput } from 'rc-datepicker';
import moment from '../../../utils/moment';
import {
    translate,
} from 'react-switch-lang';
toast.configure()
class PersonnelContractHistory extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dropdownOpen: [false, false],
            modalData: false,
            session: props.token,
            loadingButton: false,
            contracts: [],
            personnel: this.props.personnel,
            addData: {
                id: null,
                number: '',
                start_date: '',
                end_date: '',
                status: '',
                document: null
            },
            image: {
                'preview': '', 'raw': ''
            },
            isUpdate: false,
            isDocumentChange: false,
            userPrivileges: props.user.privileges
        }
        this.modalAddData = this.modalAddData.bind(this);
    }

    componentDidMount = () => {
        this.getData();
    }
    getData = () => {
        Axios.get(process.env.REACT_APP_DOMAIN + '/api/v1/personnels/' + this.state.personnel.id + '/contract-history', { headers: { "Authorization": `Bearer ${this.state.session}` } })
            .then(res => {
                // eslint-disable-next-line
                res.data.data.map((data, idx) => {
                    var startDate = new Date(data.start_date);
                    var startDateFormat = this.changeDateFormat(startDate);
                    data.start_date = startDateFormat;
                    var endDate = new Date(data.end_date);
                    var endDateFormat = this.changeDateFormat(endDate);
                    data.end_date = endDateFormat;
                });
                const contracts = res.data.data;
                this.setState({
                    contracts,
                }, () => {
                    console.log(contracts);
                });
            }).catch(error => console.log(error));
    }
    changeDateFormat(date) {
        var year = date.getFullYear();
        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        return year + '-' + month + '-' + day;
    }
    modalAddData() {
        if (!this.state.userPrivileges.includes('add-employee-history')) {
            toast.error('Maaf anda tidah boleh melakukan aksi ini.')
            return
        }
        this.setState({
            modalData: !this.state.modalData,
            addData: {
                id: null,
                number: '',
                start_date: '',
                end_date: '',
                status: '',
                document: null,
                image: {
                    'preview': '', 'raw': ''
                },
            },
            isUpdate: false
        });
    }
    modalEditData(data) {
        if (!this.state.userPrivileges.includes('edit-employee-history')) {
            toast.error('Maaf anda tidah boleh melakukan aksi ini.')
            return
        }
        let addDataNew = { ...this.state.addData };
        addDataNew = data;
        this.setState({
            modalData: !this.state.modalData,
            addData: addDataNew,
            isUpdate: true,
            image: {
                'preview': '', 'raw': ''
            },
        });
    }

    handleChange = (e) => {
        let addDataNew = { ...this.state.addData };
        addDataNew[e.target.name] = e.target.value;
        this.setState({
            addData: addDataNew
        });
    }
    handleChangeDocument = (e) => {
        if (e.target.files.length) {
            var preview = { ...this.state.image };
            preview['preview'] = URL.createObjectURL(e.target.files[0]);
            this.setState({
                image: preview
            });
        }
        let addDataNew = { ...this.state.addData };
        addDataNew[e.target.name] = e.target.files[0];
        this.setState({
            addData: addDataNew,
            isDocumentChange: true
        });
    }
    handleChangeDateStart = date => {
        let startDate = { ...this.state.addData, start_date: this.formatDate(date) }
        this.setState({
            addData: startDate
        });
    }
    handleChangeDateEnd = date => {
        let endDate = { ...this.state.addData, end_date: this.formatDate(date) }
        this.setState({
            addData: endDate
        });
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
    deleteData(e, id) {
        if (!this.state.userPrivileges.includes('delete-employee-history')) {
            toast.error('Maaf anda tidah boleh melakukan aksi ini.')
            return
        }
        Axios.delete(process.env.REACT_APP_DOMAIN + '/api/v1/personnels/' + this.state.personnel.id + '/contract-history/' + id, { headers: { "Authorization": `Bearer ${this.state.session}` } })
            .then((res) => {
                setTimeout(() => {
                    this.setState({
                        modalData: !this.state.modalData,
                        addData: {
                            id: null,
                            number: '',
                            start_date: '',
                            end_date: '',
                            status: '',
                            document: null
                        },
                        isUpdate: false,
                        loadingButton: false
                    })
                    this.getData()
                    toast.success('Success Delete', { autoClose: 3000 })
                }, 500)
            })
            .catch((error) => {
                setTimeout(() => {
                    this.setState({
                        loadingButton: false
                    });
                    toast.error('Error', { autoClose: 3000 })
                }, 500)
                console.log(error)
            });
    }
    submitAddData = (e) => {
        this.setState({ loadingButton: true })
        e.preventDefault();
        var formData = new FormData();
        if (this.state.image.preview === '') {
            formData.append('number', this.state.addData.number);
            formData.append('start_date', this.state.addData.start_date);
            formData.append('end_date', this.state.addData.end_date);
            formData.append('status', this.state.addData.status);
        } else {
            formData.append('document', this.state.addData.document, this.state.addData.document.name);
            formData.append('number', this.state.addData.number);
            formData.append('start_date', this.state.addData.start_date);
            formData.append('end_date', this.state.addData.end_date);
            formData.append('status', this.state.addData.status);
        }
        if (this.state.isUpdate === false) {
            if (!this.state.userPrivileges.includes('add-employee-history')) {
                toast.error('Maaf anda tidah boleh melakukan aksi ini.')
                this.setState({ loadingButton: false })
                return
            }
            Axios.post(process.env.REACT_APP_DOMAIN + '/api/v1/personnels/' + this.state.personnel.id + '/contract-history', formData, { headers: { "Authorization": `Bearer ${this.state.session}`, 'content-type': 'multipart/form-data' } })
                .then(res => {

                    var data = res.data.data;
                    var startDate = new Date(data.start_date);
                    var startDateFormat = this.changeDateFormat(startDate);
                    data.start_date = startDateFormat;
                    var endDate = new Date(data.end_date);
                    var endDateFormat = this.changeDateFormat(endDate);
                    data.end_date = endDateFormat;
                    let newPost = res.data.data;
                    console.log(newPost);
                    let newData = [...this.state.contracts, newPost];
                    setTimeout(() => {
                        this.setState({
                            contracts: newData,
                            modalData: !this.state.modalData,
                            addData: {
                                id: null,
                                number: '',
                                start_date: '',
                                end_date: '',
                                status: '',
                                document: null
                            },
                            isUpdate: false,
                            loadingButton: false
                        })
                        toast.success('Success', { autoClose: 3000 })
                    }, 500)
                })
                .catch((error) => {
                    setTimeout(() => {
                        this.setState({
                            loadingButton: false
                        });
                        toast.error('Error', { autoClose: 3000 })
                    }, 500)
                    console.log(error)
                });
        } else {
            if (!this.state.userPrivileges.includes('edit-employee-history')) {
                toast.error('Maaf anda tidah boleh melakukan aksi ini.')
                this.setState({ loadingButton: false })
                return
            }
            Axios.post(process.env.REACT_APP_DOMAIN + '/api/v1/personnels/' + this.state.personnel.id + '/contract-history/' + this.state.addData.id, formData, { headers: { "Authorization": `Bearer ${this.state.session}`, 'content-type': 'multipart/form-data' } })
                .then(res => {
                    setTimeout(() => {
                        this.setState({
                            modalData: !this.state.modalData,
                            addData: {
                                id: null,
                                number: '',
                                start_date: '',
                                end_date: '',
                                status: '',
                                document: null
                            },
                            isUpdate: false,
                            loadingButton: false
                        })
                        this.getData()
                        toast.success('Success', { autoClose: 3000 })
                    }, 500)
                })
                .catch((error) => {
                    setTimeout(() => {
                        this.setState({
                            loadingButton: false
                        });
                        toast.error('Error', { autoClose: 3000 })
                    }, 500)
                    console.log(error)
                });
        }
    }
    render() {
        const { t } = this.props;
        var status = '';
        const items = this.state.contracts.length > 0 ?
            this.state.contracts.map((data, idx) => {
                if (data.status === 'permanen') {
                    status = t('pekerjatetap')
                } else if (data.status === 'kontrak') {
                    status = t('pekerjakontrak')
                } else if (data.status === 'pekerjalepas') {
                    status = t('pekerjalepas')
                } else if (data.status === 'magang') {
                    status = t('magang')
                }
                return (
                    <tr key={idx}>
                        <td className="text-center">{idx + 1}</td>
                        <td>{data.number}</td>
                        <td className="text-center">{moment(data.start_date).format('DD MMM YYYY')}</td>
                        <td className="text-center">{moment(data.end_date).format('DD MMM YYYY')}</td>
                        <td className="text-center">{status}</td>
                        <td className="text-center">
                            <Button color="secondary" className={`${this.state.userPrivileges.includes('edit-employee-history') ? '' : ' d-none'}`}
                                onClick={() => this.modalEditData(data)}
                                outline>
                                <i className="fa fa-pencil mr-2"></i>
                            &nbsp;Edit
                        </Button>
                        </td>
                    </tr>
                );
            }) : null;
        return (
            <div className="animated fadeIn">
                <Row className="md-company-header mb-3">
                    <Col className="d-flex justify-content-between align-items-center">
                        <h5 className="content-sub-title mb-0">{t('riwayatkontrak')}</h5>
                        <Button color="netis-color" className={`${this.state.userPrivileges.includes('add-employee-history') ? '' : ' d-none'}`} onClick={this.modalAddData}>
                            <i className="fa fa-plus mr-2"></i>{t('tambah')} Data
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" lg="12">
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th className="text-center w-10">No.</th>
                                    <th className=" w-30">{t('nomor')}</th>
                                    <th className="text-center">{t('tanggal')} {t('mulai')}</th>
                                    <th className="text-center">{t('tanggal')} {t('selesai')}</th>
                                    <th className="text-center">Status {t('kontrak')}</th>
                                    <th className="text-center w-10">{t('aksi')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                {/* Modal Add Data */}
                <Modal isOpen={this.state.modalData} toggle={this.modalData} className={'modal-lg ' + this.props.className}>
                    <ModalBody>
                        <h5 className="content-sub-title mb-4">Data {t('riwayatkontrak')}</h5>
                        <form onSubmit={this.submitAddData}>
                            <Row className="mb-4">
                                <div className="col-md-6 d-flex justify-content-center align-items-center">
                                    <Fragment>
                                        <div className="col-md-6 d-flex justify-content-center align-items-center">
                                            {this.state.addData.document === null ?
                                                this.state.image.preview ? (
                                                    <Row>
                                                        <div className="col-md-12 d-flex justify-content-center align-items-center">
                                                            <p>Upload {t('foto')} {t('buktikontrak')} ( Max. 5 MB ) :</p>
                                                        </div>
                                                        <div className="col-md-12 d-flex justify-content-center align-items-center">
                                                            <FormGroup>
                                                                <img src={this.state.image.preview} alt="dummy" width="300" height="300" />
                                                            </FormGroup>
                                                        </div>
                                                        <div className="col-md-12 d-flex justify-content-center align-items-center">
                                                            <FormGroup>
                                                                <Input type="file" id="document" name="document" onChange={this.handleChangeDocument} />
                                                            </FormGroup>
                                                        </div>
                                                    </Row>
                                                ) : (
                                                        <Row>
                                                            <div className="col-md-12 d-flex justify-content-center align-items-center">
                                                                <p>Upload {t('foto')} {t('buktikontrak')} ( Max. 5 MB ) :</p>
                                                            </div>
                                                            <div className="col-md-12 d-flex justify-content-center align-items-center">
                                                                <div className="input-personnel-document d-flex justify-content-center align-items-center">
                                                                    <Label htmlFor="document" className="input-label btn-circle"><span className="fa fa-plus"></span></Label>
                                                                    <Input type="file" id="document" name="document" className="d-none" onChange={this.handleChangeDocument} />
                                                                </div>
                                                            </div>
                                                        </Row>
                                                    )
                                                :
                                                this.state.image.preview ? (
                                                    <Row>
                                                        <div className="col-md-12 d-flex justify-content-center align-items-center">
                                                            <p>Upload {t('foto')} {t('buktikontrak')} ( Max. 5 MB ) :</p>
                                                        </div>
                                                        <div className="col-md-12 d-flex justify-content-center align-items-center">
                                                            <FormGroup>
                                                                <img src={this.state.image.preview} alt="dummy" width="300" height="300" />
                                                            </FormGroup>
                                                        </div>
                                                        <div className="col-md-12 d-flex justify-content-center align-items-center">
                                                            <FormGroup>
                                                                <Input type="file" id="document" name="document" onChange={this.handleChangeDocument} />
                                                            </FormGroup>
                                                        </div>
                                                    </Row>
                                                ) : (
                                                        <Row>
                                                            <div className="col-md-12 d-flex justify-content-center align-items-center">
                                                                <p>Upload {t('foto')} {t('buktikontrak')} ( Max 5 MB ) :</p>
                                                            </div>
                                                            <div className="col-md-12 d-flex justify-content-center align-items-center">
                                                                <FormGroup>
                                                                    <img src={process.env.REACT_APP_DOMAIN + "" + this.state.addData.document} alt="dummy" width="300" height="300" />
                                                                </FormGroup>
                                                            </div>
                                                            <div className="col-md-12 d-flex justify-content-center align-items-center">
                                                                <FormGroup>
                                                                    <Input type="file" id="document" name="document" onChange={this.handleChangeDocument} />
                                                                </FormGroup>
                                                            </div>
                                                        </Row>
                                                    )
                                            }
                                        </div>
                                    </Fragment>
                                </div>
                                <div className="col-md-6">
                                    <FormGroup>
                                        <Label htmlFor="number" className="input-label">{t('nomor')}</Label>
                                        <Input type="text" name="number" id="number" value={this.state.addData.number} onChange={this.handleChange} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="start_date" className="input-label">{t('tanggal')} {t('mulai')}</Label>
                                        <DatePickerInput
                                            name="start_date"
                                            id="start_date"
                                            onChange={this.handleChangeDateStart}
                                            value={this.state.addData.start_date}
                                            className='my-custom-datepicker-component'
                                            showOnInputClick={true}
                                            closeOnClickOutside={true}
                                            displayFormat="DD MMMM YYYY"
                                            readOnly
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="end_date" className="input-label">{t('tanggal')} {t('selesai')}</Label>

                                        <DatePickerInput
                                            name="end_date"
                                            id="end_date"
                                            onChange={this.handleChangeDateEnd}
                                            value={this.state.addData.end_date}
                                            className='my-custom-datepicker-component'
                                            showOnInputClick={true}
                                            closeOnClickOutside={true}
                                            displayFormat="DD MMMM YYYY"
                                            readOnly
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="status" className="input-label">Status</Label>
                                        <Input type="select" name="status" id="status" value={this.state.addData.status} onChange={this.handleChange}>
                                            <option value="">-- {t('pilih')} {t('kontrak')} --</option>
                                            <option value="permanen">{t('pekerjatetap')}</option>
                                            <option value="kontrak">{t('pekerjakontrak')}</option>
                                            <option value="pekerjalepas">{t('pekerjalepas')}</option>
                                            <option value="magang">{t('magang')}</option>
                                        </Input>

                                    </FormGroup>
                                </div>
                            </Row>
                            <Row>
                                <div className="col-8 d-flex ">
                                    {this.state.isUpdate === true ?
                                        (<Button color="red-custom" onClick={(e) => this.deleteData(e, this.state.addData.id)}>{t('hapus')} Data</Button>)
                                        : null}
                                </div>
                                <div className="col-4 d-flex justify-content-end">
                                    <Button className="mr-2" color="white" onClick={this.modalAddData}>{t('batal')}</Button>
                                    <Button type="submit" color="netis-color" style={{ width: '67px' }}>
                                        {this.state.loadingButton ? <Spinner color="light" size="sm" /> : t('simpan')}
                                    </Button>
                                </div>
                            </Row>
                        </form>
                    </ModalBody>
                </Modal>
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
export default connect(mapStateToProps)(translate(PersonnelContractHistory));
