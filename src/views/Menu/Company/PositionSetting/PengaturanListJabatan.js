import React, { Component } from 'react';
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
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import {
    translate,
} from 'react-switch-lang';
toast.configure()
class PengaturanListJabatan extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dropdownOpen: [false, false],
            modalAddData: false,
            session: props.token,
            loadingButton: false,
            modalEditData: false,
            jobs: [],
            name: null,
            level: null,
            search: null,
            editJobs: [],
            idEditData: null,
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
        axios.get(process.env.REACT_APP_DOMAIN + `/api/v1/master/jobs`, { headers: { "Authorization": `Bearer ${this.state.session}` } })
            .then(res => {
                const jobs = res.data.data;
                this.setState({ jobs });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onChangeName(e) {
        this.setState({ name: e.target.value })
    }

    onChangeLevel(e) {
        this.setState({ level: e.target.value })
    }

    modalAddData() {
        if (!this.state.userPrivileges.includes('edit-company-structure-jabatan')) {
            toast.error('Maaf anda tidah boleh melakukan aksi ini.')
            return
        }
        this.setState({
            modalAddData: !this.state.modalAddData,
        });
    }
    modalEditData(data) {
        if (!this.state.userPrivileges.includes('edit-company-structure-jabatan')) {
            toast.error('Maaf anda tidah boleh melakukan aksi ini.')
            return
        }
        this.setState({
            modalEditData: !this.state.modalEditData,
            editJobs: data,
            idEditData: data.id
        });
    }
    onChangeEditName(e) {
        e.preventDefault();
        this.setState({
            editJobs:
            {
                name: e.target.value,
                level: this.state.editJobs.level
            }
        });
    }
    onChangeEditLevel(e) {
        e.preventDefault();
        this.setState({
            editJobs:
            {
                level: e.target.value,
                name: this.state.editJobs.name
            }
        });
    }
    addData(e) {
        if (!this.state.userPrivileges.includes('edit-company-structure-jabatan')) {
            toast.error('Maaf anda tidah boleh melakukan aksi ini.')
            return
        }
        this.setState({ loadingButton: true })
        e.preventDefault();
        const dataObject = {
            name: this.state.name,
            level: this.state.level
        };
        axios.post(process.env.REACT_APP_DOMAIN + '/api/v1/master/jobs', dataObject, { headers: { "Authorization": `Bearer ${this.state.session}` } })
            .then((res) => {
                let newPost = res.data.data;
                let newData = [...this.state.jobs, newPost];
                newData.sort((a, b) => {
                    if (a.level < b.level) return -1;
                    if (a.level > b.level) return 1;
                    return 0;
                })
                setTimeout(() => {
                    this.setState({
                        loadingButton: false,
                        jobs: newData,
                        modalAddData: !this.state.modalAddData,
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
    editData(e, id) {
        if (!this.state.userPrivileges.includes('edit-company-structure-jabatan')) {
            toast.error('Maaf anda tidah boleh melakukan aksi ini.')
            return
        }
        this.setState({ loadingButton: true })
        e.preventDefault();
        console.log(id);
        const dataObject = {
            name: this.state.editJobs.name,
            level: this.state.editJobs.level
        };
        axios.put(process.env.REACT_APP_DOMAIN + '/api/v1/master/jobs/' + id, dataObject, { headers: { "Authorization": `Bearer ${this.state.session}` } })
            .then((res) => {
                let newData = [...this.state.jobs];
                const item = newData.find(item => item.id === id);
                item.name = dataObject.name;
                item.level = dataObject.level;
                const itemIndex = newData.findIndex(item => item.id === id);
                newData.splice(itemIndex, 1);
                newData.splice(itemIndex, 0, item);
                newData.sort((a, b) => {
                    if (a.level < b.level) return -1;
                    if (a.level > b.level) return 1;
                    return 0;
                })
                setTimeout(() => {
                    this.setState({
                        loadingButton: false,
                        jobs: newData,
                        modalEditData: !this.state.modalEditData,
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
    deleteData(e, id) {
        if (!this.state.userPrivileges.includes('edit-company-structure-jabatan')) {
            toast.error('Maaf anda tidah boleh melakukan aksi ini.')
            return
        }
        e.preventDefault();
        axios.delete(process.env.REACT_APP_DOMAIN + '/api/v1/master/jobs/' + id, { headers: { "Authorization": `Bearer ${this.state.session}` } })
            .then((res) => {
                let newData = [...this.state.jobs];
                const itemIndex = newData.findIndex(item => item.id === id);
                newData.splice(itemIndex, 1);
                setTimeout(() => {
                    this.setState({
                        loadingButton: false,
                        jobs: newData,
                        modalEditData: !this.state.modalEditData
                    })
                    toast.success('Delete Success', { autoClose: 3000 })
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
        const items = this.state.jobs.filter((data) => {
            if (this.state.search === null)
                return data;
            else if (data.name.toLowerCase().includes(this.state.search.toLowerCase())) {
                return data;
            }
        }).map((data, idx) => {
            return (
                <tr key={idx}>
                    <td className="text-center">{idx+1}</td>
                    <td>{data.name}</td>
                    <td className="text-center">
                        <Button className={`${this.state.userPrivileges.includes('edit-company-structure-jabatan') ? '' : ' d-none'}`} color="primary"
                            onClick={() => this.modalEditData(data)} >
                            <i className="fa fa-pencil mr-2"></i>
                            &nbsp;Edit
                        </Button>
                    </td>
                </tr>
            );
        });

        return (
            <div className="animated fadeIn">
                <Row className="justify-content-between align-items-center md-company-header mb-3">
                    <Col col="4" sm="4" md="4" xl >
                        <h5 className="content-sub-title mb-0">{t('daftar')} {t('jabatan')} </h5>
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
                        <Button color="netis-color" className={`${this.state.userPrivileges.includes('edit-company-structure-jabatan') ? '' : ' d-none'}`} onClick={this.modalAddData}>
                            <i className="fa fa-plus mr-2"></i>{t('tambah')}  Data
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" lg="12">
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th className="text-center w-10">No.</th>
                                    <th className="w-50">{t('nama')} </th>
                                    <th className="text-center w-20">{t('aksi')} </th>
                                </tr>
                            </thead>
                            <tbody>
                                {items}
                            </tbody>
                        </Table>
                    </Col>
                </Row>

                {/* Modal Box Add Data */}
                <Modal isOpen={this.state.modalAddData} toggle={this.modalAddData} className={this.props.className}>
                    <ModalBody>
                        <h5 className="content-sub-title mb-4">{t('tambah')}  Data {t('jabatan')} </h5>
                        <form onSubmit={(e) => this.addData(e)}>
                            <Row className="mb-5">
                                <div className="col-md-12">
                                    <FormGroup>
                                        <Label htmlFor="job-name" className="input-label">{t('nama')}  {t('jabatan')} </Label>
                                        <Input type="text" name="job-name" id="job-name" onChange={(e) => this.onChangeName(e)} required />
                                    </FormGroup>
                                </div>
                                <div className="col-md-12">
                                    <FormGroup>
                                        <Label htmlFor="job-level" className="input-label">Level {t('jabatan')} </Label>
                                        <Input type="select" name="job-level" id="job-level" disabled={this.state.editDetail === false ? true : false} onChange={(e) => this.onChangeLevel(e)}>
                                            <option value="">--</option>
                                            <option value="1">1: Director / C-Level / Stakeholder</option>
                                            <option value="2">2: Vice President</option>
                                            <option value="3">3: Manager</option>
                                            <option value="4">4: Supervisor / Senior Staff</option>
                                            <option value="5">5: Staff / Supporting Staff / Internship / Freelance</option>
                                        </Input>
                                    </FormGroup>
                                </div>
                            </Row>

                            <Row>
                                <div className="col-12 d-flex justify-content-end">
                                    <Button className="mr-2" color="white" onClick={this.modalAddData}>{t('batal')} </Button>
                                    <Button className={`${this.state.userPrivileges.includes('edit-company-structure-jabatan') ? '' : ' d-none'}`} type="submit" color="netis-color" style={{ width: '70px' }}>
                                        {this.state.loadingButton ? <Spinner color="light" size="sm" /> : t('simpan')}
                                    </Button>
                                </div>
                            </Row>
                        </form>
                    </ModalBody>
                </Modal>

                {/* Modal Box Edit Data */}
                <Modal isOpen={this.state.modalEditData} toggle={this.modalEditData}>
                    <ModalBody>
                        <h5 className="content-sub-title mb-4">Edit Data {t('jabatan')} </h5>
                        <form onSubmit={(e) => this.editData(e, this.state.idEditData)}>
                            <Row className="mb-5">
                                <div className="col-md-12">
                                    <FormGroup>
                                        <Label htmlFor="job-name" className="input-label">{t('nama')}  {t('jabatan')} </Label>
                                        <Input type="text" name="job-name" id="job-name" value={this.state.editJobs.name} onChange={(e) => this.onChangeEditName(e)} required />
                                    </FormGroup>
                                </div>
                                <div className="col-md-12">
                                    <FormGroup>
                                        <Label htmlFor="job-level" className="input-label">Level {t('jabatan')} </Label>
                                        <Input type="select" name="job-level" value={this.state.editJobs.level} onChange={(e) => this.onChangeEditLevel(e)} >
                                            <option value="">--</option>
                                            <option value="1">1: Director / C-Level / Stakeholder</option>
                                            <option value="2">2: Vice President</option>
                                            <option value="3">3: Manager</option>
                                            <option value="4">4: Supervisor / Senior Staff</option>
                                            <option value="5">5: Staff / Supporting Staff / Internship / Freelance</option>
                                        </Input>
                                    </FormGroup>
                                </div>
                            </Row>
                            <Row>
                                <div className="col-12 d-flex justify-content-between">
                                    <div>
                                        <Button color="red-custom" value={this.state.editJobs} onClick={(e) => this.deleteData(e, this.state.editJobs.id)}>{t('hapus')}  Data</Button>
                                    </div>
                                    <div>
                                        <Button className="mr-2" color="white" onClick={this.modalEditData}>{t('batal')} </Button>
                                        <Button className={`${this.state.userPrivileges.includes('edit-company-structure-jabatan') ? '' : ' d-none'}`} type="submit" color="netis-color" style={{ width: '70px' }}>
                                            {this.state.loadingButton ? <Spinner color="light" size="sm" /> : t('simpan')}
                                        </Button>
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
export default connect(mapStateToProps)(translate(PengaturanListJabatan));
