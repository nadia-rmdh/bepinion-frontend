import React, { Component } from 'react';
import { Row, Button, Col, Table, Input, Modal, ModalBody, Label, FormGroup } from 'reactstrap';
import Axios from 'axios';
import { connect } from 'react-redux';
import InputMask from 'react-input-mask';
import Select from 'react-select';
import { toast } from 'react-toastify';
import {
    translate,
} from 'react-switch-lang';
class WorkingShift extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modalEditData: false,
            modalEditAll: false,
            workingShift: [],
            officeLocation: [],
            session: props.token,
            editName: '',
            editAll: false,
            objectEditData: {
                personnelId: '',
                days: '',
                start: '',
                end: '',
                locId: {
                    label: '', value: ''
                }
            },
            activePersonnel: [],
            activeNamePersonnel: [],
            workingDays: [],
            isChecked: false,
            mon: false,
            tue: false,
            wed: false,
            thu: false,
            fri: false,
            sat: false,
            sun: false
        }
    }

    componentDidMount = () => {
        this.getData();
    }
    getData = () => {
        Axios.all([
            Axios.get(process.env.REACT_APP_DOMAIN + `/api/v1/working-shifts`, { headers: { "Authorization": `Bearer ${this.state.session}` } }),
            Axios.get(process.env.REACT_APP_DOMAIN + `/api/v1/company/office-location`, { headers: { "Authorization": `Bearer ${this.state.session}` } })
        ])
            .then(Axios.spread((res1, res2) => {
                const workingShift = res1.data.data;
                const officeLocation = res2.data.data;
                this.setState({ workingShift, officeLocation })
            }))
            .catch(error => {
                console.log(error.response)
            });
    }
    modalEditData = (data, days, start, end, locId, workingDays) => {
        let newData = { ...this.state.objectEditData };
        let loc = { ...this.state.objectEditData.locId };
        if (this.state.isChecked === false) {
            newData['personnelId'] = data.id;
            this.setState({
                activeNamePersonnel: data.fullName
            });
        }
        newData['days'] = days;
        newData['start'] = start;
        newData['end'] = end;
        loc['value'] = locId.id;
        loc['label'] = locId.name;
        newData['locId'] = loc;
        this.setState({
            modalEditData: true,
            editName: data.fullName,
            workingDays: workingDays,
            objectEditData: newData
        }, () => {
            console.log(this.state.objectEditData);
            console.log(locId);
        })
    }

    modalEditAll = () => {
        let newData = { ...this.state.objectEditData };
        this.setState({
            modalEditData: true,
            // workingDays: workingDays,
            objectEditData: newData
        }, () => {
            console.log(this.state.objectEditData);
        })
    }

    onChangeLocation(value) {
        let loc = { ...this.state.objectEditData.locId };
        let addDataNew = { ...this.state.objectEditData };
        loc['value'] = value.id;
        loc['label'] = value.name;
        addDataNew['locId'] = loc;
        this.setState({
            objectEditData: addDataNew,
        });
    }
    cancelModalEditData = () => {
        this.setState({
            modalEditData: false,
            workingDays: []
        })
    }

    handleChange = (e) => {
        let changedData = {
            ...this.state.objectEditData,
            start: `${e.target.name === 'start' ? e.target.value : this.state.objectEditData.start}`,
            end: `${e.target.name === 'end' ? e.target.value : this.state.objectEditData.end}`,
        }
        this.setState({
            objectEditData: changedData
        })
    }

    handleChecked = (e) => {
        var day = e.target.value;
        var addDataNew = ''

        if (e.target.checked === true) {
            var arrDay = [];
            arrDay.push(day);
            addDataNew = this.state.workingDays.concat(arrDay);
            this.setState({
                workingDays: addDataNew,
            }, () => {
                var workingDaysJoin = this.state.workingDays.join(",");
                var listDataNew = { ...this.state.objectEditData };
                listDataNew['days'] = workingDaysJoin;
                console.log(workingDaysJoin);
                this.setState({
                    objectEditData: listDataNew
                }, () => { console.log(this.state.objectEditData) });
            })
        } else {
            addDataNew = this.state.workingDays;
            var index = addDataNew.indexOf(day);
            if (index > -1) {
                addDataNew.splice(index, 1);
            }
            this.setState({
                workingDays: addDataNew,
            }, () => {
                var workingDaysJoin = this.state.workingDays.join(",");
                var listDataNew = { ...this.state.objectEditData };
                listDataNew['days'] = workingDaysJoin;
                console.log(workingDaysJoin);
                this.setState({
                    objectEditData: listDataNew
                });
            });
        }

    }
    handleCheckedPersonnel = (e) => {
        console.log(e.target.checked, e.target.value);
        var personnel = parseInt(e.target.value);
        let name = [];
        if (e.target.checked === true) {
            var arrPerson = [];
            arrPerson.push(personnel);
            var addDataNew = this.state.activePersonnel.concat(arrPerson);
            this.setState({
                activePersonnel: addDataNew,
            }, () => {
                // eslint-disable-next-line
                this.state.activePersonnel.map((dataActive, idxActive) => {
                    // eslint-disable-next-line
                    this.state.workingShift.map((data, idx) => {
                        if (dataActive === data.id) {
                            name[idx] = data.fullName;
                            console.log(name);
                        }
                    });
                });
                this.setState({
                    activeNamePersonnel: name,
                    isChecked: true,
                });
                var workingPersonJoin = this.state.activePersonnel.join(",");
                var listDataNew = { ...this.state.objectEditData };
                listDataNew['personnelId'] = workingPersonJoin;
                this.setState({
                    objectEditData: listDataNew
                }, () => { console.log(this.state.objectEditData) });
            });
        } else {
            // eslint-disable-next-line
            var addDataNew = this.state.activePersonnel;
            var index = addDataNew.indexOf(personnel);
            if (index > -1) {
                addDataNew.splice(index, 1);
            }
            this.setState({
                activePersonnel: addDataNew,
            }, () => {
                // eslint-disable-next-line
                this.state.activePersonnel.map((dataActive, idxActive) => {
                    // eslint-disable-next-line
                    this.state.workingShift.map((data, idx) => {
                        if (dataActive === data.id) {
                            name[idx] = data.fullName;
                            console.log(name);
                        }
                    });
                });
                console.log(this.state.activePersonnel);
                if (this.state.activePersonnel === '') {
                    this.setState({
                        isChecked: false,
                    }, () => { console.log(this.state.isChecked) });
                } else {
                    this.setState({
                        isChecked: true,
                    }, () => { console.log(this.state.isChecked) });
                }
                this.setState({
                    activeNamePersonnel: name,
                });
                var workingPersonJoin = this.state.activePersonnel.join(",");
                var listDataNew = { ...this.state.objectEditData };
                listDataNew['personnelId'] = workingPersonJoin;
                this.setState({
                    objectEditData: listDataNew
                }, () => { console.log(this.state.objectEditData) });
            });
        }
    }
    handleCheckedAllPersonnel = (e) => {
        let name = [];
        if (e.target.checked === true) {
            var arrPerson = [];
            // eslint-disable-next-line
            this.state.workingShift.map((data, idx) => {
                arrPerson.push(data.id);
            });
            this.setState({
                activePersonnel: arrPerson
            }, () => {
                // eslint-disable-next-line
                this.state.activePersonnel.map((dataActive, idxActive) => {
                    // eslint-disable-next-line
                    this.state.workingShift.map((data, idx) => {
                        if (dataActive === data.id) {
                            name[idx] = data.fullName;
                            console.log(name);
                        }
                    });
                });
                this.setState({
                    activeNamePersonnel: name,
                });
                var workingPersonJoin = this.state.activePersonnel.join(",");
                var listDataNew = { ...this.state.objectEditData };
                listDataNew['personnelId'] = workingPersonJoin;
                console.log(workingPersonJoin);
                this.setState({
                    objectEditData: listDataNew,
                    isChecked: true,
                    editAll: true
                }, () => { console.log(this.state.objectEditData) });
            });
        } else {
            // eslint-disable-next-line
            var arrPerson = [];
            console.log(arrPerson);
            this.setState({
                activePersonnel: arrPerson,
            }, () => {
                this.setState({
                    activeNamePersonnel: [],
                });
                var workingPersonJoin = this.state.activePersonnel.join(",");
                var listDataNew = { ...this.state.objectEditData };
                listDataNew['personnelId'] = workingPersonJoin;
                console.log(workingPersonJoin);
                this.setState({
                    objectEditData: listDataNew,
                    isChecked: false,
                    editAll: false
                }, () => { console.log(this.state.objectEditData) });
            });
        }
    }
    addDataToAPI(e) {
        e.preventDefault();
        const data = {
            name: this.state.objectEditData.name,
            days: this.state.objectEditData.days,
            end: this.state.objectEditData.end,
            locId: this.state.objectEditData.locId.value,
            personnelId: this.state.objectEditData.personnelId,
            start: this.state.objectEditData.start,
        };
        Axios.put(process.env.REACT_APP_DOMAIN + `/api/v1/working-shifts`, data, { headers: { "Authorization": `Bearer ${this.state.session}` } })
            .then((res) => {
                setTimeout(() => {

                    this.getData();
                    this.setState({
                        modalEditData: !this.state.modalEditData,
                        workingShift: [],
                        officeLocation: [],
                        editName: '',
                        objectEditData: {
                            personnelId: '',
                            days: '',
                            start: '',
                            end: '',
                            locId: ''
                        },
                        workingDays: []
                    }); toast.success('Success', { autoClose: 3000 })
                }, 500);
            }).catch((error) => {
                setTimeout(() => {
                    this.setState({
                        loadingButton: false
                    });
                    toast.error('Error', { autoClose: 3000 })
                }, 500)
            });
    }

    convertIndoDay = (days) => {
        const { t } = this.props;
        let indoDays = [];
        days.forEach((data) => {
            if (data === "mon") indoDays.push(t('senin'))
            if (data === "tue") indoDays.push(t('selasa'))
            if (data === "wed") indoDays.push(t('rabu'))
            if (data === "thu") indoDays.push(t('kamis'))
            if (data === "fri") indoDays.push(t('jumat'))
            if (data === "sat") indoDays.push(t('sabtu'))
            if (data === "sun") indoDays.push(t('minggu'))
        })
        return indoDays
    }

    render() {
        const { t } = this.props;
        // eslint-disable-next-line
        this.state.officeLocation.map((data, idx) => {
            data['value'] = data['id'];
            data['label'] = data['name'];
        });
        return (
            <div className="animated fadeIn">
                <Row className="md-company-header mb-3">
                    <Col className="d-flex justify-content-between align-items-center">
                        <h5 className="content-sub-title mb-0">{t('jadwalkerja')}</h5>
                        {this.state.editAll &&
                            <Button color="primary" onClick={() => this.modalEditAll()}>
                                <i className="fa fa-pencil mr-2"></i>&nbsp;Edit {t('semua')}
                            </Button>
                        }
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" lg="12">
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th className="text-center w-10">
                                        <Input className="form-check-input" type="checkbox" onChange={this.handleCheckedAllPersonnel} />
                                    </th>
                                    <th className="w-30">{t('nama')}</th>
                                    <th className="">{t('harikerja')}</th>
                                    <th className="text-center">{t('jamkerja')}</th>
                                    <th className="text-center">{t('lokasi')}</th>
                                    <th className="text-center w-10">{t('aksi')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.workingShift.map((data, idx) => {
                                    let shiftDetail = {};
                                    let workingDays = [];
                                    let workingTime = '';
                                    let workingLocation = '';
                                    let workingLocationId = '';
                                    if (data.shifts.length > 0) {
                                        shiftDetail = data.shifts[0];
                                        workingTime = `${shiftDetail.start.substring(0, 5)} - ${shiftDetail.end.substring(0, 5)}`;
                                        workingLocation = shiftDetail.loc.name;
                                        workingLocationId = shiftDetail.loc;
                                        data.shifts.forEach((day, idx) => {
                                            workingDays.push(day.day)
                                        })

                                    }
                                    return (
                                        <tr key={idx}>
                                            <td className="text-center">
                                                <Input className="form-check-input" type="checkbox" value={data.id} checked={this.state.activePersonnel.includes(data.id)} onChange={this.handleCheckedPersonnel} />
                                            </td>
                                            <td>{data.fullName}</td>
                                            <td>{this.convertIndoDay(workingDays).join(", ")}</td>
                                            <td className="text-center">{workingTime}</td>
                                            <td className="text-center">{workingLocation}</td>
                                            <td className="text-center">
                                                <Button color={this.state.editAll ? "secondary" : "primary"} disabled={this.state.editAll} onClick={() => this.modalEditData(
                                                    data,
                                                    workingDays.join(),
                                                    shiftDetail.start,
                                                    shiftDetail.end,
                                                    workingLocationId,
                                                    workingDays
                                                )}>
                                                    <i className="fa fa-pencil mr-2"></i>&nbsp;Edit
                                                </Button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </Col>
                </Row>

                {/* Modal Box Edit Data */}
                <Modal isOpen={this.state.modalEditData} toggle={this.cancelModalEditData} className={'modal-lg ' + this.props.className}>
                    <ModalBody>
                        <h5 className="content-sub-title mb-4">Edit {t('jadwalkerja')} {t('karyawan')}</h5>
                        <form onSubmit={(e) => this.addDataToAPI(e)} >
                            <Row className="mb-4">
                                <div className="col-md-6">

                                    <FormGroup>
                                        <Label htmlFor="name" className="input-label">{t('nama')} {t('karyawan')}</Label>
                                        {this.state.isChecked === true ? this.state.activeNamePersonnel.map((dataActive, idxActive) => {
                                            return (
                                                <FormGroup>
                                                    <Input type="text" key={idxActive}
                                                        disabled={true}
                                                        value={dataActive} />
                                                </FormGroup>
                                            );
                                        })
                                            : <FormGroup>
                                                <Input type="text"
                                                    disabled={true}
                                                    value={this.state.activeNamePersonnel} />
                                            </FormGroup>
                                        }
                                    </FormGroup>
                                </div>
                                <div className="col-md-6">
                                    <FormGroup>
                                        <Label htmlFor="start" className="input-label">{t('jam')} {t('mulai')}</Label>
                                        <InputMask className="form-control" name="start" id="start" mask="99:99" value={this.state.objectEditData.start} onChange={this.handleChange} placeholder={t('contoh') + ' 08:00'}>
                                        </InputMask>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="end" className="input-label">{t('jam')} {t('selesai')}</Label>
                                        <InputMask className="form-control" name="end" id="end" mask="99:99" value={this.state.objectEditData.end} onChange={this.handleChange} placeholder={t('contoh') + ' 09:00'}>
                                        </InputMask>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="locId" className="input-label">{t('lokasikerja')}</Label>
                                        {/* <Input type="select" name="locId" id="locId" value={this.state.objectEditData.locId} onChange={this.handleChange} >
                                            {this.state.officeLocation.map((data, idx) => {
                                                return (
                                                    <option key={idx} value={data.id}>{data.name}</option>
                                                );
                                            })}
                                        </Input> */}
                                        <Select
                                            value={this.state.objectEditData.locId}
                                            onChange={value => this.onChangeLocation(value)}
                                            options={this.state.officeLocation}
                                        />
                                    </FormGroup>
                                    <FormGroup className="mb-0">
                                        <Label className="input-label">{t('harikerja')}</Label>
                                    </FormGroup>
                                    <FormGroup className="mb-0">
                                        <FormGroup check inline>
                                            <Input className="form-check-input" type="checkbox" id="senin" name="senin" value="mon"
                                                checked={this.state.workingDays.includes("mon")} onChange={this.handleChecked} />
                                            <Label className="form-check-label" check htmlFor="senin">{t('senin')}</Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                            <Input className="form-check-input" type="checkbox" id="selasa" name="selasa" value="tue"
                                                checked={this.state.workingDays.includes("tue")} onChange={this.handleChecked} />
                                            <Label className="form-check-label" check htmlFor="selasa">{t('selasa')}</Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                            <Input className="form-check-input" type="checkbox" id="rabu" name="rabu" value="wed"
                                                checked={this.state.workingDays.includes("wed")} onChange={this.handleChecked} />
                                            <Label className="form-check-label" check htmlFor="rabu">{t('rabu')}</Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                            <Input className="form-check-input" type="checkbox" id="kmais" name="kmais" value="thu"
                                                checked={this.state.workingDays.includes("thu")} onChange={this.handleChecked} />
                                            <Label className="form-check-label" check htmlFor="kmais">{t('kamis')}</Label>
                                        </FormGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <FormGroup check inline>
                                            <Input className="form-check-input" type="checkbox" id="jumat" name="jumat" value="fri"
                                                checked={this.state.workingDays.includes("fri")} onChange={this.handleChecked} />
                                            <Label className="form-check-label" check htmlFor="jumat">{t('jumat')}</Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                            <Input className="form-check-input" type="checkbox" id="sabtu" name="sabtu" value="sat"
                                                checked={this.state.workingDays.includes("sat")} onChange={this.handleChecked} />
                                            <Label className="form-check-label" check htmlFor="sabtu">{t('sabtu')}</Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                            <Input className="form-check-input" type="checkbox" id="minggu" name="minggu" value="sun"
                                                checked={this.state.workingDays.includes("sun")} onChange={this.handleChecked} />
                                            <Label className="form-check-label" check htmlFor="minggu">{t('minggu')}</Label>
                                        </FormGroup>
                                    </FormGroup>
                                </div>
                            </Row>
                            <Row>
                                <div className="col-12 d-flex justify-content-end">
                                    <Button className="mr-2" color="white" onClick={this.cancelModalEditData}>{t('batal')}</Button>
                                    <Button type="submit" color="netis-color">{t('simpan')}</Button>
                                </div>
                            </Row>
                        </form>
                    </ModalBody>
                </Modal>

                {/* Modal Box Edit All Data */}
                <Modal isOpen={this.state.modalEditAll} toggle={this.modalEditAll} className={'modal-lg ' + this.props.className}>
                    <ModalBody>
                        <h5 className="content-sub-title mb-4">Edit {t('jadwalkerja')} {t('karyawan')}</h5>
                        <form onSubmit={(e) => this.addDataToAPI(e)} >
                            <Row className="mb-4">
                                <div className="col-md-6">
                                    <FormGroup>
                                        <Label htmlFor="name" className="input-label">{t('nama')} {t('karyawan')}</Label>
                                        {this.state.isChecked === true ? this.state.activeNamePersonnel.map((dataActive, idxActive) => {
                                            return (
                                                <FormGroup>
                                                    <Input type="text" key={idxActive}
                                                        disabled={true}
                                                        value={dataActive} />
                                                </FormGroup>
                                            );
                                        })
                                            : <FormGroup>
                                                <Input type="text"
                                                    disabled={true}
                                                    value={this.state.activeNamePersonnel} />
                                            </FormGroup>
                                        }
                                    </FormGroup>
                                </div>
                                <div className="col-md-6">
                                    <FormGroup>
                                        <Label htmlFor="start" className="input-label">{t('jam')} {t('mulai')}</Label>
                                        <InputMask className="form-control" name="start" id="start" mask="99:99" value={this.state.objectEditData.start} onChange={this.handleChange} placeholder={t('contoh') + ' )08:00'}>
                                        </InputMask>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="end" className="input-label">{t('jam')} {t('selesai')}</Label>
                                        <InputMask className="form-control" name="end" id="end" mask="99:99" value={this.state.objectEditData.end} onChange={this.handleChange} placeholder={t('contoh') + ' )09:00'}>
                                        </InputMask>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="locId" className="input-label">{t('lokasikerja')}</Label>
                                        <Select
                                            value={this.state.objectEditData.locId}
                                            onChange={value => this.onChangeLocation(value)}
                                            options={this.state.officeLocation}
                                        />
                                    </FormGroup>
                                    <FormGroup className="mb-0">
                                        <Label className="input-label">{t('harikerja')}</Label>
                                    </FormGroup>
                                    <FormGroup className="mb-0">
                                        <FormGroup check inline>
                                            <Input className="form-check-input" type="checkbox" id="senin" name="senin" value="mon"
                                                checked={this.state.workingDays.includes("mon")} onChange={this.handleChecked} />
                                            <Label className="form-check-label" check htmlFor="senin">{t('senin')}</Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                            <Input className="form-check-input" type="checkbox" id="selasa" name="selasa" value="tue"
                                                checked={this.state.workingDays.includes("tue")} onChange={this.handleChecked} />
                                            <Label className="form-check-label" check htmlFor="selasa">{t('selasa')}</Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                            <Input className="form-check-input" type="checkbox" id="rabu" name="rabu" value="wed"
                                                checked={this.state.workingDays.includes("wed")} onChange={this.handleChecked} />
                                            <Label className="form-check-label" check htmlFor="rabu">{t('rabu')}</Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                            <Input className="form-check-input" type="checkbox" id="kmais" name="kmais" value="thu"
                                                checked={this.state.workingDays.includes("thu")} onChange={this.handleChecked} />
                                            <Label className="form-check-label" check htmlFor="kmais">{t('kamis')}</Label>
                                        </FormGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <FormGroup check inline>
                                            <Input className="form-check-input" type="checkbox" id="jumat" name="jumat" value="fri"
                                                checked={this.state.workingDays.includes("fri")} onChange={this.handleChecked} />
                                            <Label className="form-check-label" check htmlFor="jumat">{t('jumat')}</Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                            <Input className="form-check-input" type="checkbox" id="sabtu" name="sabtu" value="sat"
                                                checked={this.state.workingDays.includes("sat")} onChange={this.handleChecked} />
                                            <Label className="form-check-label" check htmlFor="sabtu">{t('sabtu')}</Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                            <Input className="form-check-input" type="checkbox" id="minggu" name="minggu" value="sun"
                                                checked={this.state.workingDays.includes("sun")} onChange={this.handleChecked} />
                                            <Label className="form-check-label" check htmlFor="minggu">{t('minggu')}</Label>
                                        </FormGroup>
                                    </FormGroup>
                                </div>
                            </Row>
                            <Row>
                                <div className="col-12 d-flex justify-content-end">
                                    <Button className="mr-2" color="white" onClick={this.cancelModalEditData}>{t('batal')}</Button>
                                    <Button type="submit" color="netis-color">{t('simpan')}</Button>
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
        token: state.token
    }
}
export default connect(mapStateToProps)(translate(WorkingShift));
