import React, { Component, Fragment } from 'react';
import { Row, Button, FormGroup, Input, Label, Col } from 'reactstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingAnimation from '../../../../components/LoadingAnimation'
import DataNotFound from '../../../../components/DataNotFound'
import ModalComponent from './components/ModalDocumentComponent';
import moment from '../../../../utils/moment'
import { HandleChangeInput } from '../../../../utils/HandleChangeInput';
import { HandleChangeDropdown } from '../../../../utils/HandleChangeDropdown';
import { HandleChangeDocument } from '../../../../utils/HandleChangeDocument';
import { HandleChangeDate } from '../../../../utils/HandleChangeDate';
import { AddData } from '../../../../utils/AddData';
import { DeleteData } from '../../../../utils/DeleteData';
import { IsPdf } from '../../../../utils/IsPdf';
import ImagePdf from '../../../../assets/assets_ari/pdf.png';
import {
    translate,
} from 'react-switch-lang';
import { connect } from 'react-redux';
import request from '../../../../utils/request';
toast.configure()
class CompanyDocument extends Component {

    constructor(props) {
        super(props);
        this.isPdf = IsPdf;
        this.state = {
            loading: true,
            documentTypes: [],
            data: '',
            modalData: {
                type: {
                    value: '', label: ''
                },
                expiryDate: null,
                number: '',
                document: null
            },
            isShow: false,
            url: '',
            title: '',
            preview: null,
            previewType: '',
            previewName: '',
            status: '',
            userPrivileges: this.props.user.privileges
        };
    }
    componentDidMount() {
        this.setState({ loading: true })
        this.getData()
    }
    getData = async () => {
        try {
            this.setState({
                data: await request.get('v1/company/documents').then(res => res.data.data),
                documentTypes: await request.get('v1/master/company-document-types').then(res => res.data.data),
            });
        } catch (err) {
            if (err.response) {
                toast.error(err.message, { autoClose: 2000 });
            }
            throw err;
        } finally {
            this.setState({
                loading: false,
                isShow: false,
                status: '',
                preview: null
            })
        }
    }

    toggleCreateModal = () => {
        if (!this.state.userPrivileges.includes('add-company-document')) {
            toast.error('Maaf anda tidah boleh melakukan aksi ini.')
            return
        }
        this.setState({
            isShow: true,
            modalData: {
                type: {
                    value: '', label: ''
                },
                expiryDate: '',
                number: '',
                document: null
            },
            status: 'add',
            url: '/v1/company/documents',
            title: 'Tambah Dokumen'
        })
    }

    toggleEditModal = (data) => {
        if (!this.state.userPrivileges.includes('edit-company-document')) {
            toast.error('Maaf anda tidah boleh melakukan aksi ini.')
            return
        }
        let modalData = data;
        modalData['type']['value'] = modalData['type']['id']
        modalData['type']['label'] = modalData['type']['name']
        this.setState({
            isShow: true,
            modalData,
            status: 'edit',
            url: '/v1/company/documents/' + data.id,
            title: 'Edit Dokumen'
        })
    }

    toggleDeleteModal = (data) => {
        if (!this.state.userPrivileges.includes('delete-company-document')) {
            toast.error('Maaf anda tidah boleh melakukan aksi ini.')
            return
        }
        let modalData = { ...this.state.modalData };
        modalData = data;
        this.setState({
            modalData,
            isShow: true,
            status: 'delete',
            url: '/v1/company/documents',
            title: 'Hapus Dokumen'
        })
    }
    toggleCancelModal = () => {
        this.setState({
            isShow: false,
            status: '',
            modalData: {
                type: {
                    value: '', label: ''
                },
                expiryDate: '',
                number: '',
                document: null
            },
            preview: null
        })
    }
    changeInput = (e) => {
        e.preventDefault();
        let dataNew = { ...this.state.modalData };
        let data = HandleChangeInput(dataNew, e);
        this.setState({
            modalData: data,
        }, () => {
            console.log(this.state.modalData)
        });
    }
    changeDate = (param) => (value) => {
        let dataNew = { ...this.state.modalData };
        let data = HandleChangeDate(param, dataNew, value);
        this.setState({
            modalData: data,
        });
    }
    changeDocument = (e) => {
        let dataNew = { ...this.state.modalData };
        let dataDocument = HandleChangeDocument(dataNew, e);
        let data = dataDocument.data;
        let preview = dataDocument.preview;
        this.setState({
            modalData: data,
            preview: preview.preview,
            previewType: preview.previewType,
            previewName: preview.previewName
        });
    }
    changeInputDropdown = (param) => (e) => {
        let dataNew = { ...this.state.modalData };
        let data = HandleChangeDropdown(param, dataNew, e);
        this.setState({
            modalData: data,
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
    processData = async (e) => {
        e.preventDefault();
        this.setState({
            loading: true
        });
        let response;
        const id = this.state.modalData.id;
        const url = this.state.url;
        let date;
        var formData = new FormData();
        if (this.state.modalData.expiryDate !== null) {
            date = this.formatDate(this.state.modalData.expiryDate)
        }
        if (this.state.preview === null) {
            formData.append('number', this.state.modalData.number);
            formData.append('typeId', this.state.modalData.type.id);
            formData.append('expiryDate', date);
        } else {
            formData.append('document', this.state.modalData.document, this.state.modalData.document.name);
            formData.append('number', this.state.modalData.number);
            formData.append('typeId', this.state.modalData.type.id);
            formData.append('expiryDate', date);
        }
        if (this.state.status === 'add') {
            if (this.state.preview === null) {
                toast.error('Error Document Empty')
            } else {
                response = await AddData(url, formData);
            }
        } else if (this.state.status === 'edit') {
            response = await AddData(url, formData);
        } else if (this.state.status === 'delete') {
            response = await DeleteData(url, id);
        }
        if (response === true) {
            this.setState({
                loading: false,
            });
            this.toggleCancelModal();
            this.getData();
        } else {
            this.setState({
                loading: false
            });
        }
    }
    render() {
        this.state.documentTypes.forEach((data) => {
            data['value'] = data['id'];
            data['label'] = data['name'];
        });
        const { t } = this.props;
        return (
            <div className="animated fadeIn">
                {this.state.loading ? <LoadingAnimation />
                    :
                    !this.state.data.length ? <DataNotFound />
                        :
                        this.state.data.map((data, idx) => (
                            (
                                <Fragment key={idx}>
                                    <div className="col-12 d-flex justify-content-between align-items-center mb-3">
                                        <Col col="8" sm="8" md="8">
                                            <h5 className="content-sub-title mb-0">{data.type.name} </h5>
                                        </Col>
                                        <Fragment>
                                            <Col col="2" sm="2" md="2" className="text-right padding-0">
                                                <Button color="netis-color" className={`padding-top-bottom-8${this.state.userPrivileges.includes('edit-company-document') ? '' : ' d-none'}`} onClick={() => this.toggleEditModal(data)}>
                                                    <i className="fa fa-pencil" style={{ marginRight: 5 }}></i>Edit Data
                                                </Button>
                                            </Col>
                                            <Col col="2" sm="2" md="2" className="text-right padding-0">
                                                <Button outline color="danger" className={`${this.state.userPrivileges.includes('delete-company-document') ? '' : ' d-none'}`} onClick={() => this.toggleDeleteModal(data)}>
                                                    <i className="fa fa-trash mr-2"></i>{t('hapus')} Data
                                                </Button>
                                            </Col>
                                        </Fragment>
                                    </div>
                                    <Row className="border-bottom">
                                        <div className="col-md-5 d-flex align-items-center">
                                            <div className="img-document">
                                                {this.isPdf(data.path) ?
                                                    <>
                                                        <img src={ImagePdf} alt="pdf" width="130" height="130" /><br />
                                                        <Button href={process.env.REACT_APP_DOMAIN + "" + data.path} target="_blank" rel="noopener noreferrer" color="link"><i className="fa fa-file-pdf-o"></i> {t('bukalampiran')}</Button> </> :
                                                    <><img src={process.env.REACT_APP_DOMAIN + "" + data.path} alt="Dokumen" className="img-fluid" /></>
                                                }

                                            </div>
                                        </div>
                                        <div className="col-md-7 form-group">
                                            <FormGroup>
                                                <Label className="input-label">{t('tipedokumen')} </Label>
                                                <Input type="text" required readOnly value={data.type.name} />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label className="input-label">{t('nomordokumen')}</Label>
                                                <Input type="text" required readOnly value={data.number} />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label className="input-label">{t('berlakuhingga')}</Label>
                                                <Input type="text" required readOnly value={data.expiryDate !== null ? moment(data.expiryDate).format('DD MMM YYYY') : t('seumurhidup')} />
                                            </FormGroup>
                                        </div>
                                    </Row>
                                    <br />
                                    <br />
                                </Fragment>
                            )
                        ))
                }
                <br />
                <Row>
                    <div className="col-12 d-flex justify-content-center">
                        <Button color="netis-color" className={`btn-lg${this.state.userPrivileges.includes('add-company-document') ? '' : ' d-none'}`} onClick={this.toggleCreateModal}>
                            <span className="icon-plus mr-2"></span>{t('tambah')} Data
                        </Button>
                    </div>
                </Row>
                <ModalComponent
                    types={this.state.documentTypes}
                    data={this.state.modalData}
                    isShow={this.state.isShow}
                    status={this.state.status}
                    onClickCancel={this.toggleCancelModal}
                    getData={this.getData}
                    title={this.state.title}
                    processData={this.processData}
                    changeDocument={this.changeDocument}
                    changeInput={this.changeInput}
                    changeInputDropdown={this.changeInputDropdown}
                    changeDate={this.changeDate}
                    preview={this.state.preview}
                    previewName={this.state.previewName}
                    previewType={this.state.previewType}
                />

            </div>
        );
    }
}

const mapStateToProps = ({ isAdminPanel, user }) => ({ isAdminPanel, user });
export default connect(mapStateToProps)(translate(CompanyDocument));
