import React, { Component, Fragment } from 'react';
import { Row, Button } from 'reactstrap';
import InputText from '../atom/InputText';
import Axios from 'axios';
import InputSelect from '../atom/InputSelect';
import InputDate from '../atom/InputDate';

class GeneralInfoPersonnel extends Component {
    state = {
        edit: false,
        units: [],
        jobs: [],
        personnel: this.props.personnel,
        data: {}
    }

    componentDidMount() {
        Axios.all([
            Axios.get(`https://hris.gabri-ns.info/api/v1/master/units`),
            Axios.get(`https://hris.gabri-ns.info/api/v1/master/jobs`)
        ])
            .then(Axios.spread((res1, res2) => {
                const units = res1.data.data;
                const jobs = res2.data.data;
                this.setState({ units, jobs })
            }))
            .catch(error => console.log(error));
    }

    handleEdit = () => {
        this.setState({
            edit: true
        })
    }

    canceledit = () => {
        this.setState({
            edit: false
        })
    }

    handleChangeValue = (newValue) => {
        let personnelEdit = { ...this.state.personnel, newValue };
        this.setState({
            data: personnelEdit
        })
    }

    updateDataAPI = () => {
        console.log(this.state);
        this.setState({
            edit: false
        })
    }

    render() {
        return (
            <div className="content-body">
                <Row>
                    <div className="col-12 d-flex justify-content-between align-items-center mb-3">
                        <h5 className="content-sub-title mb-0">Informasi Umum</h5>
                        {this.state.edit === false ?
                            <Button color="netis-color" className="btn-netis-color" onClick={this.handleEdit}>
                                <span className="icon-edit-3 mr-2"></span>Edit
                            </Button> : null
                        }
                    </div>
                </Row>
                <Row>
                    <div className="col-md-4">
                        <div className="frame-profile-picture">
                            <img src="https://www.liscr.com/sites/default/files/styles/adaptive/public/blog_images/Headshot%20-%20Chiang%20Wan%20Ching.jpg?itok=Mr1ohKTL" alt="Profile" />
                        </div>
                    </div>
                    <div className="col-md-8">
                        <InputText id="fullName" label="Nama Lengkap" disabled={!this.state.edit} value="Ayu Setyaningrum"
                        // changeValue={(value) => { this.handleChangeValue(value) }} 
                        />
                        <InputText id="nickName" label="Nama Panggilan" disabled={!this.state.edit} value="Ayu"
                        // changeValue={(value) => { this.handleChangeValue(value) }} 
                        />
                    </div>
                </Row>
                <Row>
                    <div className="col-md-4">
                        <InputSelect id="unit" label="Unit" disabled={!this.state.edit} data={this.state.units} value={4} />
                    </div>
                    <div className="col-md-4">
                        <InputSelect id="job" label="Jabatan" disabled={!this.state.edit} data={this.state.jobs} value={34} />
                    </div>
                    <div className="col-md-4">
                        <InputSelect id="parentId" label="Atasan" disabled={!this.state.edit} />
                    </div>
                </Row>
                <Row>
                    <div className="col-md-6">
                        <InputDate id="joinDate" label="Tanggal Bergabung" disabled={!this.state.edit} value={new Date("2020-04-06")} />
                    </div>
                    <div className="col-md-6">
                        <InputSelect id="contractStatus" label="Status Kontrak" disabled={!this.state.edit} />
                    </div>
                </Row>
                <Row>
                    <div className="col-12 d-flex justify-content-end">
                        {this.state.edit === true ?
                            <Fragment>
                                <Button color="white" className="btn-white mr-3" onClick={this.canceledit}>Batal</Button>
                                <Button color="netis-color" className="btn-netis-color" onClick={this.updateDataAPI}>Simpan</Button>
                            </Fragment>
                            : null
                        }
                    </div>
                </Row>
            </div>
        );
    }
}

export default GeneralInfoPersonnel;