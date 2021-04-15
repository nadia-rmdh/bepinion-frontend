import React, { Component, Fragment } from 'react';
import { Row, Button, FormGroup, Input, Label, Col } from 'reactstrap';
import BankCard from '../../../../assets/assets_ari/437.png';
// import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingAnimation from '../../../../components/LoadingAnimation'
import DataNotFound from '../../../../components/DataNotFound'
import ModalComponent from './components/ModalBankComponent';
import {
    translate,
} from 'react-switch-lang';
import { connect } from 'react-redux';
import request from '../../../../utils/request';
toast.configure()
class BankInfo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            banks: [],
            currencies: [],
            data: '',
            modalData: {
                bank: {
                    value: '', label: ''
                },
                holderName: '',
                number: '',
                currency: {
                    value: '', label: ''
                }
            },
            showCreateModal: false,
            showEditModal: false,
            showDeleteModal: false,
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
                data: await request.get('v1/company/bankinfo').then(res => res.data.data),
                banks: await request.get('v1/master/bank').then(res => res.data.data),
                currencies: await request.get('v1/master/currencies').then(res => res.data.data),
            });
        } catch (err) {
            if (err.response) {
                toast.error(err.message, { autoClose: 2000 });
            }
            throw err;
        } finally {
            this.setState({
                loading: false,
                showCreateModal: false,
                showEditModal: false,
                showDeleteModal: false
            })
        }
    }

    toggleCreateModal = () => {
        if (!this.state.userPrivileges.includes('add-company-bank')) {
            toast.error('Maaf anda tidah boleh melakukan aksi ini.')
            return
        }
        this.setState({
            showCreateModal: true,
            modalData: ''
        })
    }
    toggleCancelCreateModal = () => {
        this.setState({
            showCreateModal: false,
            modalData: ''
        })
    }

    toggleEditModal = (data) => {
        if (!this.state.userPrivileges.includes('edit-company-bank')) {
            toast.error('Maaf anda tidah boleh melakukan aksi ini.')
            return
        }
        let modalData = { ...this.state.modalData };
        modalData = data;
        modalData['bank']['value'] = modalData['bank']['id']
        modalData['bank']['label'] = modalData['bank']['name']
        modalData['currency']['value'] = modalData['currency']['id']
        modalData['currency']['label'] = modalData['currency']['name']
        this.setState({
            showEditModal: true,
            modalData
        })
    }
    toggleCancelEditModal = (data) => {
        this.setState({
            showEditModal: false,
            modalData: ''
        })
    }

    toggleDeleteModal = (data) => {
        if (!this.state.userPrivileges.includes('delete-company-bank')) {
            toast.error('Maaf anda tidah boleh melakukan aksi ini.')
            return
        }
        let modalData = { ...this.state.modalData };
        modalData = data;
        this.setState({ modalData, showDeleteModal: true })
    }
    toggleCancelDeleteModal = () => {
        this.setState({
            showDeleteModal: false,
            modalData: ''
        })
    }
    render() {
        const { t } = this.props;
        this.state.banks.forEach((data) => {
            data['value'] = data['id'];
            data['label'] = data['name'];
        });
        this.state.currencies.forEach((data, idx) => {
            data['value'] = data['id'];
            data['label'] = data['name'];
        });
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
                                            <h5 className="content-sub-title mb-0">{data.bank.name} </h5>
                                        </Col>
                                        <Fragment>
                                            <Col col="2" sm="2" md="2" className="text-right padding-0">
                                                <Button color="netis-color" className={`padding-top-bottom-8${this.state.userPrivileges.includes('edit-company-bank') ? '' : ' d-none'}`} onClick={() => this.toggleEditModal(data)}>
                                                    <i className="fa fa-pencil" style={{ marginRight: 5 }}></i>Edit Data
                                                </Button>
                                            </Col>
                                            <Col col="2" sm="2" md="2" className="text-right padding-0">
                                                <Button outline color="danger" className={`${this.state.userPrivileges.includes('delete-company-bank') ? '' : ' d-none'}`} onClick={() => this.toggleDeleteModal(data)}>
                                                    <i className="fa fa-trash mr-2"></i>{t('hapus')} Data
                                                </Button>
                                            </Col>
                                        </Fragment>
                                    </div>
                                    <Row className="border-bottom">
                                        <div className="col-md-5 d-flex align-items-center">
                                            <div className="bank-card" style={{ backgroundImage: `url(${BankCard})` }}>
                                                <p className="mb-5 title-bank">{data.holderName}<br />{data.number}</p>
                                            </div>
                                        </div>
                                        <div className="col-md-7 form-group">
                                            <FormGroup>
                                                <Label className="input-label">{t('matauang')} </Label>
                                                <Input type="text" required readOnly value={data.currency.name} />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label className="input-label">{t('namabank')} </Label>
                                                <Input type="text" required readOnly value={data.bank.name} />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label className="input-label">{t('nomorrekening')} </Label>
                                                <Input type="text" required readOnly value={data.number} />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label className="input-label">{t('namapemilikrekening')} </Label>
                                                <Input type="text" required readOnly value={data.holderName} />
                                            </FormGroup>
                                        </div>
                                    </Row>
                                    <br />
                                </Fragment>
                            )
                        ))
                }
                <br />
                <Row>
                    <div className="col-12 d-flex justify-content-center">
                        <Button color="netis-color" className={`btn-lg${this.state.userPrivileges.includes('add-company-bank') ? '' : ' d-none'}`} onClick={this.toggleCreateModal}>
                            <span className="icon-plus mr-2"></span>{t('tambah')} Data
                            </Button>
                    </div>
                </Row>
                {
                    this.state.showCreateModal === true ?
                        <ModalComponent
                            banks={this.state.banks}
                            currencies={this.state.currencies}
                            data={this.state.modalData}
                            isShow={true}
                            onClickCancel={this.toggleCancelCreateModal}
                            getData={this.getData}
                            url='/v1/company/bankinfo'
                            status='add'
                            title={t('tambahinformasibank')}
                        /> : null
                }
                {
                    this.state.showEditModal === true ?
                        <ModalComponent
                            banks={this.state.banks}
                            currencies={this.state.currencies}
                            data={this.state.modalData}
                            isShow={true}
                            onClickCancel={this.toggleCancelEditModal}
                            getData={this.getData}
                            url='/v1/company/bankinfo'
                            status='edit'
                            title={t('editinformasibank')}
                        /> : null
                }
                {
                    this.state.showDeleteModal === true ?
                        <ModalComponent
                            data={this.state.modalData}
                            isShow={true}
                            onClickCancel={this.toggleCancelDeleteModal}
                            getData={this.getData}
                            url='/v1/company/bankinfo'
                            status='delete'
                            title={t('hapusdataini')}
                        /> : null
                }
            </div>
        );
    }

}

const mapStateToProps = ({ isAdminPanel, user }) => ({ isAdminPanel, user });
export default connect(mapStateToProps)(translate(BankInfo));
