import React, { Component, Fragment } from 'react';
import {
    Table,
    Col,
    Row,
    InputGroup,
    InputGroupText,
    InputGroupAddon,
    Input,
    Button,
    Modal,
    ModalBody,
    FormGroup,
    Label,
    Spinner
} from 'reactstrap';
import axios from 'axios';
import Select from 'react-select';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import DiagramUnitView from './components/DiagramUnitView'
import request from '../../../../utils/request'
import {
    translate,
} from 'react-switch-lang';
toast.configure()
class PengaturanListUnit extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dropdownOpen: [false, false],
            modalAddData: false,
            modalEditData: false,
            session: props.token,
            loadingButton: false,
            units: [],
            heads: [],
            name: null,
            parent: null,
            head: { value: 0, label: '--' },
            search: null,
            editUnits: [],
            idEditData: null,
            showDiagramDialog: false,
            userPrivileges: this.props.user.privileges
        };

        this.modalAddData = this.modalAddData.bind(this);
        this.modalEditData = this.modalEditData.bind(this);
    }

    searchSpace = (event) => {
        let keyword = event.target.value;
        this.setState({
            search: keyword
        })
    }

    componentDidMount() {
        this.getData();
    }
    getData = async () => {
        try {
            const res = await request.get('v1/master/units');
            const res2 = await request.get('v1/master/units/head');
            const units = res.data.data;
            const noHead = { value: 0, label: '--' };
            const heads = res2.data.data;
            heads.unshift(noHead)
            this.setState({ units, heads });
        } catch (err) {
            console.log(err);
        }
    }
    onChangeName(e) {
        this.setState({ name: e.target.value })
    }

    onChangeParent(e) {
        this.setState({ parent: e.target.value })
    }

    modalAddData() {
        if (!this.state.userPrivileges.includes('edit-company-structure-unit')) {
            toast.error('Maaf anda tidah boleh melakukan aksi ini.')
            return
        }
        this.setState({
            modalAddData: !this.state.modalAddData,
        });
    }
    modalEditData(data) {
        if (!this.state.userPrivileges.includes('edit-company-structure-unit')) {
            toast.error('Maaf anda tidah boleh melakukan aksi ini.')
            return
        }
        this.setState({
            modalEditData: !this.state.modalEditData,
            editUnits: data,
            idEditData: data.id,
            parent: data.parent !== null ? data.parent.id : null
        });
    }
    cancelModalEditData = () => {
        this.setState({
            modalEditData: !this.state.modalEditData
        });
    }
    onChangeEditName(e) {
    console.log(this.state.editUnits);
        e.preventDefault();
        this.setState({
            editUnits: {
                ...this.state.editUnits,
                name: e.target.value,
                parent: this.state.editUnits.parent
            }
        });
    }
    onChangeHead(value) {
        this.setState({
            head: value,
        });
    }
    onChangeHeadEdit(value) {
        this.setState({
            editUnits:
            {
                head: value,
            }
        });
    }
    onChangeEditParent(e) {
        e.preventDefault();
        this.setState({
            parent: e.target.value,
            editUnits:
            {
                ...this.state.editUnits,
                parent: e.target.value,
            }
        });
    }
    addData(e) {
        if (!this.state.userPrivileges.includes('edit-company-structure-unit')) {
            toast.error('Maaf anda tidah boleh melakukan aksi ini.')
            return
        }
        this.setState({ loadingButton: true })
        e.preventDefault();
        if (this.state.head === null) {
            setTimeout(() => {
                this.setState({ loadingButton: false })
                toast.error('Choose Parent Unit', { autoClose: 3000 })
            }, 500)

        } else {
            const dataObject = {
                name: this.state.name,
                parent: this.state.parent,
                head: this.state.head.value
            };

            axios.post(process.env.REACT_APP_DOMAIN + '/api/v1/master/units', dataObject, { headers: { "Authorization": `Bearer ${this.state.session}` } })
                .then((res) => {
                    let newPost = res.data.data;
                    let newData = [...this.state.units, newPost];
                    setTimeout(() => {
                        this.setState({
                            loadingButton: false,
                            units: newData,
                            modalAddData: !this.state.modalAddData,
                            head: { value: 0, label: '--' }
                        })
                        toast.success('Success', { autoClose: 3000 })
                    }, 500)
                })
                .catch((error) => {
                    setTimeout(() => {
                        this.setState({ loadingButton: false })
                    }, 500)
                    toast.error('Error', { autoClose: 3000 })
                    console.log(error.response.data.errors)
                });
        }
    }
    editData(e, id) {
        if (!this.state.userPrivileges.includes('edit-company-structure-unit')) {
            toast.error('Maaf anda tidah boleh melakukan aksi ini.')
            return
        }
        this.setState({ loadingButton: true })
        e.preventDefault();
        const dataObject = {
            name: this.state.editUnits.name,
            parent: this.state.parent,
            head: this.state.editUnits.head.value
        };
        axios.put(process.env.REACT_APP_DOMAIN + '/api/v1/master/units/' + id, dataObject, { headers: { "Authorization": `Bearer ${this.state.session}` } })
            .then((res) => {
                setTimeout(() => {
                    this.setState({
                        loadingButton: false,
                        modalEditData: !this.state.modalEditData,
                        head: { value: 0, label: '--' }
                    })
                    this.getData()
                    toast.success('Success', { autoClose: 3000 })
                }, 500)
            })
            .catch((error) => {
                setTimeout(() => {
                    this.setState({ loadingButton: false })
                }, 500)
                toast.error('Error', { autoClose: 3000 })
                console.log(error.response.data.errors)
            });
    }
    deleteData(e, id) {
        if (!this.state.userPrivileges.includes('edit-company-structure-unit')) {
            toast.error('Maaf anda tidah boleh melakukan aksi ini.')
            return
        }
        e.preventDefault();
        axios.delete(process.env.REACT_APP_DOMAIN + '/api/v1/master/units/' + id, { headers: { "Authorization": `Bearer ${this.state.session}` } })
            .then((res) => {
                let newData = [...this.state.units];
                const itemIndex = newData.findIndex(item => item.id === id);
                newData.splice(itemIndex, 1);
                setTimeout(() => {
                    this.setState({
                        loadingButton: false,
                        units: newData,
                        modalEditData: !this.state.modalEditData
                    })
                    toast.success('Success', { autoClose: 3000 })
                }, 500)
            })
            .catch((error) => {
                setTimeout(() => {
                    this.setState({ loadingButton: false })
                }, 500)
                toast.error('Error', { autoClose: 3000 })
                console.log(error.response.data.errors)
            });
    }

    render() {
        const { t } = this.props;
        // eslint-disable-next-line
        const items = this.state.units.filter((data) => {
            if (this.state.search === null)
                return data;
            else if (data.name.toLowerCase().includes(this.state.search.toLowerCase())) {
                return data;
            }
        }).map((data, idx) => {
            return (
                <tr key={idx}>
                    <td className="text-center">{idx + 1}</td>
                    <td>{data.name}</td>
                    <td>{data.head.label}</td>
                    <td>{data.parent !== null ? data.parent.name : null}</td>
                    <td className="text-center">
                        <Button className={`${this.state.userPrivileges.includes('edit-company-structure-unit') ? '' : ' d-none'}`} color="primary" onClick={() => this.modalEditData(data)} >
                            <i className="fa fa-pencil mr-2"></i>&nbsp;Edit
                        </Button>
                    </td>
                </tr>
            );
        });
        return (
            <div className="animated fadeIn">
                <Row className="justify-content-between align-items-center md-company-header mb-3">
                    <Col col="4" sm="4" md="4" xl >
                        <h5 className="content-sub-title mb-0">{t('daftar')}  Unit  <small className="ml-2"><Button color="info" outline onClick={() => { this.setState({ showDiagramDialog: true }) }}><i className="fa fa-sitemap"></i> {t('lihat')}  Diagram</Button></small></h5>
                    </Col>
                    <Col col="8" sm="8" md="8" className="d-flex justify-content-end">
                        <InputGroup className="mr-3">
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText className="input-group-transparent">
                                    <i className="fa fa-search"></i>
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" placeholder="Search" className="input-search" onChange={(e) => this.searchSpace(e)} />
                        </InputGroup>
                        <Button className={`${this.state.userPrivileges.includes('edit-company-structure-unit') ? '' : ' d-none'}`} color="netis-color" onClick={this.modalAddData}>
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
                                    <th className="w-35">{t('nama')}  Unit</th>
                                    <th className="w-35">{t('kepalaunit')} </th>
                                    <th>{t('indukunit')} </th>
                                    <th className="text-center w-20">{t('aksi')} </th>
                                </tr>
                            </thead>
                            <tbody>
                                {items}
                            </tbody>
                        </Table>
                    </Col>
                </Row>

                {this.state.units.length > 0 && <Modal className="modal-xl" isOpen={this.state.showDiagramDialog} toggle={() => { this.setState({ showDiagramDialog: !this.state.showDiagramDialog }) }}>
                    <ModalBody>
                        <DiagramUnitView data={this.state.units}></DiagramUnitView>
                    </ModalBody>
                </Modal>}

                {/* Modal Box Add Data */}
                <Modal isOpen={this.state.modalAddData} toggle={this.modalAddData} className={this.props.className}>
                    <ModalBody>
                        <h5 className="content-sub-title mb-4">{t('tambah')} Data Unit</h5>
                        <form onSubmit={(e) => this.addData(e)}>
                            <Row className="mb-5">
                                <div className="col-12">
                                    <FormGroup>
                                        <Label htmlFor="unit-name" className="input-label">{t('nama')} Unit</Label>
                                        <Input type="text" name="unit-name" id="unit-name" placeholder={t('contoh') + ' Department of Production'} onChange={(e) => this.onChangeName(e)} required />
                                    </FormGroup>
                                </div>
                                <div className="col-12">
                                    <FormGroup>
                                        <Label htmlFor="head-unit" className="input-label">{t('kepalaunit')}</Label>
                                        <Select
                                            value={this.state.head}
                                            onChange={value => this.onChangeHead(value)}
                                            options={this.state.heads}
                                        />
                                    </FormGroup>
                                </div>
                                <div className="col-12">
                                    <FormGroup>
                                        <Label htmlFor="unit-parent" className="input-label">{t('indukunit')}</Label>
                                        <Input type="select" name="unit-parent" id="unit-parent" onChange={(e) => this.onChangeParent(e)}>
                                            <option value={""}>--</option>
                                            {this.state.units.map((data, idx) => {
                                                return (
                                                    <option key={idx} value={data.id}>{data.name}</option>
                                                )
                                            })}
                                        </Input>
                                    </FormGroup>
                                </div>
                            </Row>
                            <Row>
                                <div className="col-12 d-flex justify-content-end">
                                    {this.state.loadingButton ? <Spinner color="dark" size="sm" /> :
                                        <Fragment>
                                            <Button className="mr-2" color="white" onClick={this.modalAddData}>{t('batal')}</Button>
                                            <Button color="netis-color" style={{ width: '70px' }}>
                                                {t('tambah')}
                                            </Button>
                                        </Fragment>
                                    }
                                </div>
                            </Row>
                        </form>
                    </ModalBody>
                </Modal>

                {/* Modal Box Edit Data */}
                <Modal isOpen={this.state.modalEditData} toggle={this.cancelModalEditData} className={this.props.className}>
                    <ModalBody>
                        <h5 className="content-sub-title mb-4">Edit Data Unit</h5>
                        <form onSubmit={(e) => this.editData(e, this.state.idEditData)}>
                            <Row className="mb-5">
                                <div className="col-12">
                                    <FormGroup>
                                        <Label htmlFor="unit-name" className="input-label">{t('nama')} Unit</Label>
                                        <Input type="text" name="unit-name" id="unit-name" placeholder={t('contoh') + ' Department of Production'} value={this.state.editUnits.name} onChange={(e) => this.onChangeEditName(e)} required />
                                    </FormGroup>
                                </div>
                                <div className="col-12">
                                    <FormGroup>
                                        <Label htmlFor="head-unit" className="input-label">{t('kepalaunit')}</Label>
                                        <Select
                                            value={this.state.editUnits.head}
                                            onChange={value => this.onChangeHeadEdit(value)}
                                            options={this.state.heads}
                                        />
                                    </FormGroup>
                                </div>
                                <div className="col-12">
                                    <FormGroup>
                                        <Label htmlFor="unit-parent" className="input-label">{t('indukunit')}</Label>
                                        <Input type="select" name="unit-parent" id="unit-parent" value={this.state.parent} onChange={(e) => this.onChangeEditParent(e)}>
                                            <option value={""}>--</option>
                                            {this.state.units.map((data, idx) => {
                                                return (
                                                    this.state.idEditData !== data.id ?
                                                        <option key={idx} value={data.id}>{data.name}</option>
                                                        : null
                                                )
                                            })}
                                        </Input>
                                    </FormGroup>
                                </div>
                            </Row>
                            <Row>
                                <div className="col-12 d-flex justify-content-between">
                                    <div>
                                        <Button className={`${this.state.userPrivileges.includes('edit-company-structure-unit') ? '' : ' d-none'}`} color="red-custom" value={this.state.editUnits} onClick={(e) => this.deleteData(e, this.state.editUnits.id)}>{t('hapus')} Data</Button>
                                    </div>
                                    <div>
                                        {this.state.loadingButton ? <Spinner color="dark" size="sm" /> :
                                            <Fragment>
                                                <Button className="mr-2" color="white" onClick={this.cancelModalEditData}>{t('batal')}</Button>
                                                <Button color="netis-color" style={{ width: '70px' }}>
                                                    {t('simpan')}
                                                </Button>
                                            </Fragment>
                                        }
                                    </div>
                                </div>
                            </Row>
                        </form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}
// const mapStateToProps = (state) => {
//     return {
//         sessionId: state.sessionId
//     }
// }
const mapStateToProps = ({ isAdminPanel, user, token }) => ({ isAdminPanel, user, token });
export default connect(mapStateToProps)(translate(PengaturanListUnit));
