import React, { Component, Fragment } from 'react';
import { Row, Button, Modal, ModalBody, FormGroup, Label, Input, Col, Spinner } from 'reactstrap';
import NoData from '../../../../assets/assets_ari/481.png';
import Axios from 'axios';
import Select from 'react-select';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import {
    translate,
} from 'react-switch-lang';
import request from '../../../../utils/request';
toast.configure()
class PersonnelDocument extends Component {

    constructor(props) {
        super(props);

        this.state = {
            roleIdLogin: props.user,
            dropdownOpen: [false, false],
            modalAddData: false,
            session: props.token,
            loadingButton: false,
            editDocument: false,
            modalEditData: false,
            documents: [],
            documentsTypes: [],
            personnel: this.props.personnel,
            modalDeleteData: false,
            dataDelete: '',
            documentNumber: '',
            documentExpire: '',
            document: '',
            editDocumentNumber: '',
            editDocumentImage: null,
            editDocumentExpire: '',
            editDocumentType: {
                'value': '', 'label': ''
            },
            image: {
                'preview': '', 'raw': ''
            },
            editData: [],
            idEditData: null,
            documentType: '',
        }
        this.onChangeDocument = this.onChangeDocument.bind(this);
        this.onChangeEditDocument = this.onChangeEditDocument.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.modalAddData = this.modalAddData.bind(this);
    }

    componentDidMount = () => {
        this.getData();
    }
    getData = () => {
        request.get(`v1/master/document-types?all=true`)
            .then((res) => {
                const documentsTypes = res.data.data;
                this.setState({
                    documentsTypes,
                });
            })
        request.get('v1/personnels/' + this.state.personnel.id + '/document')
            .then((res) => {
                const documents = res.data.data;
                this.setState({
                    documents,
                });
            })
    }
    modalDeleteData = (e) => {
        this.setState({
            modalDeleteData: !this.state.modalDeleteData,
            dataDelete: e.target.value
        })
    }
    deleteData = () => {
        this.setState({ loadingButton: true })
        Axios.delete(process.env.REACT_APP_DOMAIN + '/api/v1/personnels/' + this.state.personnel.id + '/document/' + this.state.dataDelete, { headers: { "Authorization": `Bearer ${this.state.session}` } })
            .then(res => {
                let newData = [...this.state.documents];
                const itemIndex = newData.findIndex(item => item.id === this.state.dataDelete);
                newData.splice(itemIndex, 1);
                setTimeout(() => {
                    this.setState({
                        documents: newData,
                        modalDeleteData: !this.state.modalDeleteData,
                        loadingButton: false
                    })
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

    modalEditData(data) {
        this.setState({
            modalEditData: !this.state.modalEditData,
            editData: data,
            editDocumentType: {
                'value': data.type, 'label': data.typeName
            },
            editDocumentNumber: data.number,
            editDocumentExpire: data.expire,
            editDocumentImage: data.path,
            idEditData: data.id,
            image: {
                'preview': '', 'raw': ''
            },
        })
    }
    cancelModalEditData() {
        this.setState({
            modalEditData: !this.state.modalEditData,
            image: {
                'preview': '', 'raw': ''
            },
        })
    }
    modalAddData = () => {
        this.setState({
            modalAddData: !this.state.modalAddData,
            image: {
                'preview': '', 'raw': ''
            },
        })
    }
    handleInputChange(e) {
        e.preventDefault();
        const stateName = e.target.name;

        this.setState({
            [stateName]: e.target.value
        });
    }
    onChangeDocumentType(value) {
        this.setState({
            "documentType": value
        });
    }
    onChangeEditDocumentType(value) {
        this.setState({
            "editDocumentType": value
        });
    }
    onChangeDocument(e) {
        e.preventDefault();

        if (e.target.files.length) {
            var preview = { ...this.state.image };
            preview['preview'] = URL.createObjectURL(e.target.files[0]);
            this.setState({
                document: e.target.files[0],
                image: preview
            });
        }
    }
    onChangeEditDocument(e) {
        e.preventDefault();
        if (e.target.files.length) {
            var preview = { ...this.state.image };
            preview['preview'] = URL.createObjectURL(e.target.files[0]);
            this.setState({
                editDocumentImage: e.target.files[0],
                image: preview
            });
        }
    }
    handleSubmit(e) {
        this.setState({ loadingButton: true })
        e.preventDefault();
        var formData = new FormData();
        if (this.state.image.preview === '') {
            toast.error('Document Belum diisi');
            this.setState({ loadingButton: false })
        } else {
            formData.append('img', this.state.document, this.state.document.name);
            formData.append('type', this.state.documentType.value);
            formData.append('number', this.state.documentNumber);
            formData.append('expire', this.state.documentExpire);
            Axios.post(process.env.REACT_APP_DOMAIN + '/api/v1/personnels/' + this.state.personnel.id + '/document', formData, { headers: { "Authorization": `Bearer ${this.state.session}`, 'content-type': 'multipart/form-data' } })
                .then(res => {
                    console.log(res.data);
                    let newPost = res.data.data;
                    let newData = [...this.state.documents, newPost];
                    setTimeout(() => {
                        this.setState({
                            documents: newData,
                            modalAddData: !this.state.modalAddData,
                            image: {
                                'preview': '', 'raw': ''
                            },
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
                        toast.error('Data Cannot Empty', { autoClose: 3000 })
                    }, 500)
                    console.log(error)
                });
        }
    };
    handleEditSubmit(e, id) {
        this.setState({ loadingButton: true })
        e.preventDefault();
        var formData = new FormData();
        if (this.state.image.preview === '') {
            formData.append('type', this.state.editDocumentType.value);
            formData.append('number', this.state.editDocumentNumber);
            formData.append('expire', this.state.editDocumentExpire);
        } else {
            formData.append('type', this.state.editDocumentType.value);
            formData.append('number', this.state.editDocumentNumber);
            formData.append('expire', this.state.editDocumentExpire);
            formData.append('img', this.state.editDocumentImage, this.state.document.editDocumentImage);
        }
        Axios.post(process.env.REACT_APP_DOMAIN + '/api/v1/personnels/' + this.state.personnel.id + '/document/' + id, formData, { headers: { "Authorization": `Bearer ${this.state.session}` } })
            .then(res => {
                setTimeout(() => {
                    this.setState({
                        modalEditData: !this.state.modalEditData,
                        image: {
                            'preview': '', 'raw': ''
                        },
                        loadingButton: false
                    })
                    this.getData();
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
            })
    };
    render() {
        // eslint-disable-next-line
        this.state.documentsTypes.map((data, idx) => {
            data['value'] = data['id'];
            data['label'] = data['name'];
        });
        console.log('types', this.state.documentsTypes);
        const { t } = this.props;
        return (
            <div className="animated fadeIn">
                {this.state.documents?.length > 0 ?
                    this.state.documents.map((data, idx) => {
                        return (
                            <div key={idx} className="content-body">
                                <Row>
                                    <div className="col-12 d-flex justify-content-between align-items-center mb-3">
                                        <Col col="8" sm="8" md="8">
                                            <h5 className="content-sub-title mb-0">{data.typeName}</h5>
                                        </Col>
                                        <Fragment>
                                            <Col col="2" sm="2" md="2" className="text-right padding-0">
                                                {this.state.editDocument === false ?
                                                    <Button color="netis-color" className="btn-netis-color padding-top-bottom-8" onClick={() => this.modalEditData(data)}>
                                                        <i className="fa fa-pencil mr-2"></i>Edit Data
                                                </Button>

                                                    : null
                                                }
                                            </Col>
                                            <Col col="2" sm="2" md="2" className="text-right padding-0">
                                                {this.state.editDocument === false ?
                                                    <Button outline color="danger" value={data.id} onClick={this.modalDeleteData}>
                                                        <i className="fa fa-trash mr-2"></i>{t('hapus')} Data
                                                </Button>
                                                    : null
                                                }
                                            </Col>
                                        </Fragment>
                                    </div>
                                </Row>
                                <Row>
                                    <div className="col-md-5 d-flex justify-content-center align-items-center">
                                        <div className="img-document">
                                            <img src={process.env.REACT_APP_DOMAIN + "" + data.path} alt="Document" className="img-fluid" />
                                        </div>
                                    </div>
                                    <div className="col-md-7 form-group">
                                        <FormGroup>
                                            <Label htmlFor="nomor-rekening" className="input-label">{t('nomor')} {t('dokumen')}</Label>
                                            <Input type="text" id="nomor-rekening" disabled={this.state.editDocument === false ? true : false} placeholder={t('nomor') + t('dokumen')} value={data.number} onChange={(e) => this.onChangeNumber(e)} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label htmlFor="nama-rekening" className="input-label">{t('berlakuhingga')}</Label>
                                            <Input type="text" id="nama-rekening" disabled={this.state.editDocument === false ? true : false} placeholder={t('berlakuhingga')} value={data.expire} onChange={(e) => this.onChangeExpire(e)} />
                                        </FormGroup>
                                    </div>
                                </Row>
                                <Row>
                                    <div className="col-12 d-flex justify-content-end">
                                        {this.state.editDocument === true ?
                                            <Fragment>
                                                <Button color="white" className="btn-white mr-3" onClick={this.cancelEditDocument}>{t('batal')}</Button>
                                                <Button color="netis-color" className="btn-netis-color">{t('simpan')}</Button>
                                            </Fragment>
                                            : null
                                        }
                                    </div>
                                </Row>
                            </div>
                        );
                    })
                    :
                    <div className="content-body mb-0">
                        <Row>
                            <div className="col-12 d-flex justify-content-center mt-3 mb-3">
                                <img src={NoData} alt="no-data" />
                            </div>
                        </Row>
                    </div>
                }
                <Row>
                    <div className="col-12 d-flex justify-content-center">
                        <Button color="netis-color" className="button-add-doc" onClick={this.modalAddData}>
                            <span className="fa fa-plus mr-2"></span>{t('tambah')} {t('dokumen')}
                        </Button>
                    </div>
                </Row>
                <Modal isOpen={this.state.modalAddData} toggle={this.modalAddData} className={'modal-lg ' + this.props.className}>
                    <ModalBody>
                        {console.log('modal types', this.state.documentsTypes)}
                        <h5 className="content-sub-title mb-4">{t('tambah')} {t('dokumen')} {t('karyawan')}</h5>
                        <form onSubmit={(e) => this.handleSubmit(e)} >
                            <Row className="mb-4">
                                <div className="col-md-6 d-flex justify-content-center align-items-center">
                                    {this.state.image.preview ? (
                                        <Row>
                                            <div className="col-md-12 d-flex justify-content-center align-items-center">
                                                <p>Upload {t('foto')} {t('dokumen')} ( Max. 5 MB ) :</p>
                                            </div>
                                            <div className="col-md-12 d-flex justify-content-center align-items-center">
                                                <FormGroup>
                                                    <img src={this.state.image.preview} alt="dummy" width="300" height="300" />
                                                </FormGroup>
                                            </div>
                                            <div className="col-md-12 d-flex justify-content-center align-items-center">
                                                <FormGroup>
                                                    <Input type="file" id="document-img-upload" name="document-img-upload" onChange={this.onChangeDocument} />
                                                </FormGroup>
                                            </div>
                                        </Row>
                                    ) : (
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
                                        )}
                                </div>
                                <div className="col-md-6">
                                    <FormGroup>
                                        <Label htmlFor="documentType" className="input-label">{t('tipedokumen')}</Label>
                                        <Select
                                            value={this.state.documentType}
                                            onChange={value => this.onChangeDocumentType(value)}
                                            options={this.state.documentsTypes}
                                            required
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="documentNumber" className="input-label">{t('nomordokumen')}</Label>
                                        <Input type="text" name="documentNumber" id="documentNumber" onChange={this.handleInputChange} placeholder={t('nomordokumen')} required={true} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="documentExpire" className="input-label">{t('berlakuhingga')}</Label>
                                        <Input type="text" name="documentExpire" id="documentExpire" onChange={this.handleInputChange} placeholder={t('berlakuhingga')} required={true} />
                                    </FormGroup>
                                </div>
                            </Row>
                            <Row>
                                <div className="col-12 d-flex justify-content-end">
                                    {this.state.loadingButton ? <Spinner color="dark" size="sm" /> :
                                        <Fragment>
                                            <Button className="mr-2" color="white" onClick={this.modalAddData}>{t('batal')}</Button>
                                            <Button type="submit" color="netis-color" style={{ width: '67px' }}>
                                                {t('simpan')}
                                            </Button>
                                        </Fragment>
                                    }
                                </div>
                            </Row>
                        </form>
                    </ModalBody>
                </Modal>

                {/* Modal Box Edit Data */}
                <Modal isOpen={this.state.modalEditData} toggle={this.modalEditData} className={'modal-lg ' + this.props.className}>
                    <ModalBody>
                        <h5 className="content-sub-title mb-4">Edit {t('dokumen')} {t('karyawan')}</h5>
                        <form onSubmit={(e) => this.handleEditSubmit(e, this.state.idEditData)}>
                            <Row className="mb-4">
                                <div className="col-md-6 d-flex justify-content-center align-items-center">
                                    {this.state.image.preview ? (
                                        <Row>
                                            <div className="col-md-12 d-flex justify-content-center align-items-center">
                                                <p>Upload {t('foto')} {t('dokumen')} ( Max 5 MB ) :</p>
                                            </div>
                                            <div className="col-md-12 d-flex justify-content-center align-items-center">
                                                <FormGroup>
                                                    <img src={this.state.image.preview} alt="dummy" width="300" height="300" />
                                                </FormGroup>
                                            </div>
                                            <div className="col-md-12 d-flex justify-content-center align-items-center">
                                                <FormGroup>
                                                    <Input type="file" id="edit-document-img-upload" name="edit-document-img-upload" onChange={this.onChangeEditDocument} />
                                                </FormGroup>
                                            </div>
                                        </Row>
                                    ) : (
                                            <Row>
                                                <div className="col-md-12 d-flex justify-content-center align-items-center">
                                                    <p>Upload {t('foto')} {t('dokumen')} ( Max 5 MB ) :</p>
                                                </div>
                                                <div className="col-md-12 d-flex justify-content-center align-items-center">
                                                    <FormGroup>
                                                        <img src={process.env.REACT_APP_DOMAIN + "" + this.state.editDocumentImage} alt="dummy" width="300" height="300" />
                                                    </FormGroup>
                                                </div>
                                                <div className="col-md-12 d-flex justify-content-center align-items-center">
                                                    <FormGroup>
                                                        <Input type="file" id="edit-document-img-upload" name="edit-document-img-upload" onChange={this.onChangeEditDocument} />
                                                    </FormGroup>
                                                </div>
                                            </Row>
                                        )}

                                </div>
                                <div className="col-md-6">
                                    <FormGroup>
                                        <Label htmlFor="documentType" className="input-label">{t('tipedokumen')}</Label>
                                        <Select
                                            value={this.state.editDocumentType}
                                            onChange={value => this.onChangeEditDocumentType(value)}
                                            options={this.state.documentsTypes}

                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="documentNumber" className="input-label">{t('nomordokumen')}</Label>
                                        <Input type="text" name="editDocumentNumber" id="documentNumber" value={this.state.editDocumentNumber} onChange={this.handleInputChange} placeholder={t('nomordokumen')} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="documentExpire" className="input-label">{t('berlakuhingga')}</Label>
                                        <Input type="text" name="editDocumentExpire" id="documentExpire" value={this.state.editDocumentExpire} onChange={this.handleInputChange} placeholder={t('berlakuhingga')} />
                                    </FormGroup>
                                </div>
                            </Row>
                            <Row>
                                <div className="col-12 d-flex justify-content-end">
                                    {this.state.loadingButton ? <Spinner color="dark" size="sm" /> :
                                        <Fragment>
                                            <Button className="mr-2" color="white" onClick={() => this.cancelModalEditData()}>{t('batal')}</Button>
                                            <Button type="submit" color="netis-color" style={{ width: '67px' }}>
                                                {t('simpan')}
                                            </Button>
                                        </Fragment>
                                    }
                                </div>
                            </Row>
                        </form>
                    </ModalBody>
                </Modal>

                {/* Modal Box Delete Data */}
                <Modal isOpen={this.state.modalDeleteData} toggle={this.modalDeleteData} className="personnel-name">
                    <ModalBody>
                        <h5 className="content-sub-title mb-5">{t('hapus')} {t('dokumen')}</h5>
                        <Row className="mb-5">
                            <div className="col-12 text-center">
                                <h6>{t('yakinmenghapus')}</h6>
                            </div>
                        </Row>
                        <Row>
                            <div className="col-12 d-flex justify-content-end">
                                {this.state.loadingButton ? <Spinner color="dark" size="sm" /> :
                                    <Fragment>
                                        <Button className="mr-2" color="white" onClick={this.modalDeleteData}>{t('batal')}</Button>
                                        <Button color="danger" style={{ width: '67px' }} onClick={this.deleteData}>
                                            {t('hapus')}
                                        </Button>
                                    </Fragment>
                                }
                            </div>
                        </Row>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.token,
        user: state.user,
    }
}
export default connect(mapStateToProps)(translate(PersonnelDocument));
