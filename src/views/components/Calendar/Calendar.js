import React, { Component, Fragment } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { Row, Col, Button, Modal, ModalBody, FormGroup, Label, Input, Spinner } from "reactstrap";
import { connect } from 'react-redux';
import Axios from "axios";
import moment from "moment";
import Select from 'react-select';
import { DatePickerInput } from "rc-datepicker";
import ReactInputMask from "react-input-mask";
import { toast } from "react-toastify";
import { formatDate } from "../../../utils/formatter";
import request from "../../../utils/request";
import {
    t,
    translate,
} from 'react-switch-lang';

const localizer = momentLocalizer(moment);

toast.configure()

class CalendarMenu extends Component {

    state = {
        dropdownOpen: [false, false],
        loading: false,
        modalAddEvent: false,
        modalDetailEvent: false,
        editEvent: false,
        idEditEvent: '',
        targetUnit: false,
        targetJob: false,
        targetPersonnel: false,
        targetAll: true,
        eventDate: new Date(),
        date: new Date(),
        startDate: '',
        endDate: '',
        units: [],
        jobs: [],
        personnels: [],
        selectedPersonnels: [],
        OfficeLocation: [],
        events: [],
        event: {},
        userPrivileges: this.props.user.privileges
    }
    componentDidMount = async () => {
        this.setState({
            startDate: formatDate(new Date(this.state.date.getFullYear(), this.state.date.getMonth(), 1)),
            endDate: formatDate(new Date(this.state.date.getFullYear(), this.state.date.getMonth() + 1, 0))
        }, () => this.getDataFromAPI(this.state.startDate, this.state.endDate))
        this.getDataUnits()
        this.getDataJobs()
        this.getDataPersonnels()
        this.getDataOfficeLocation()
    }

    modalAddEvent = () => {
        if (!this.state.userPrivileges.includes('add-calendar')) {
            toast.error(t('Maaf anda tidah boleh melakukan aksi ini'))
            return
        }
        const event = { ...this.state.event, date: formatDate(this.state.eventDate) }
        this.setState({
            event,
            modalAddEvent: !this.state.modalAddEvent
        })
    }

    modalDetailEvent = (event) => {
        if (!this.state.userPrivileges.includes('read-calendar')) {
            toast.error(t('Maaf anda tidah boleh melakukan aksi ini'))
            return
        }
        let unitId = []
        let jobId = []
        let personnelId = []
        let personnel = {}
        if (event.unit.id !== null) unitId.push({ value: event.unit.id, label: event.unit.name })
        if (event.job.id !== null) jobId.push({ value: event.job.id, label: event.job.name })
        if (event.personnel !== null) {
            event.personnel.map(data => {
                let data1 = Number(data.id)
                let label = data.name

                personnel = { value: data1, label: label }
                return personnelId.push(personnel)
            })
        }
        const eventApi = {
            ...event,
            date: formatDate(event.date),
            start: event.startTime,
            end: event.endTime,
            description: event.title,
            unitId: event.unit.id,
            jobId: event.job.id,
            personnelId: event.personnel && event.personnel.join(',')
        }
        this.setState({
            modalDetailEvent: !this.state.modalDetailEvent,
            idEditEvent: event.id,
            event: eventApi,
            eventDate: new Date(event.date),
            selectedUnits: unitId,
            selectedJobs: jobId,
            selectedPersonnels: personnelId,
            targetAll: event.unit.id === null && event.job.id === null && event.personnel === null ? true : false
        })
    }

    editEvent = () => {
        if (!this.state.userPrivileges.includes('edit-calendar')) {
            toast.error(t('Maaf anda tidah boleh melakukan aksi ini'))
            return
        }
        this.setState({ editEvent: !this.state.editEvent }, () => {
            if (this.state.editEvent === false) this.setState({
                targetUnit: false,
                targetJob: false,
                targetPersonnel: false,
                // targetAll: false
            })
        })
    }

    cancelModalDetailEvent = () => {
        this.setState({
            event: {},
            eventDate: new Date(),
            modalDetailEvent: !this.state.modalDetailEvent,
            targetAll: !this.state.targetAll
        })
    }

    handleChange = (e) => {
        let event = { ...this.state.event }
        if (e.target.name === 'start') { event = { ...this.state.event, start: e.target.value + ':00' } }
        if (e.target.name === 'end') { event = { ...this.state.event, end: e.target.value + ':00' } }
        if (e.target.name === 'description') { event = { ...this.state.event, description: e.target.value, title: e.target.value } }
        this.setState({ event })
    }

    handleChangeDate = date => {
        this.setState({ eventDate: date })
        const eventDate = { ...this.state.event, date: formatDate(date) }
        this.setState({
            event: eventDate
        });
    }

    handleRadioTarget = (e) => {
        if (e.currentTarget.value === 'unit') {
            this.setState({
                targetUnit: true,
                targetJob: false,
                targetPersonnel: false,
                targetAll: false,
                event: { ...this.state.event, jobId: null, personnelId: null }
            })
        }
        if (e.currentTarget.value === 'job') this.setState({
            targetUnit: false,
            targetJob: true,
            targetPersonnel: false,
            targetAll: false,
            event: { ...this.state.event, unitId: null, personnelId: null }
        })
        if (e.currentTarget.value === 'personnel') this.setState({
            targetUnit: false,
            targetJob: false,
            targetPersonnel: true,
            targetAll: false,
            event: { ...this.state.event, unitId: null, jobId: null }
        })
        if (e.currentTarget.value === 'all') {
            this.setState({
                targetUnit: false,
                targetJob: false,
                targetPersonnel: false,
                targetAll: true,
                event: { ...this.state.event, unitId: null, jobId: null, personnelId: null }
            })
        }
    }

    onChangeUnit = (option) => {
        const unitId = []
        if (option === null) option = []
        option.map(data => unitId.push(data.value))
        this.setState({
            selectedUnits: option,
            event: { ...this.state.event, unitId: unitId.join(',') }
        })
    }

    onChangeJob = (option) => {
        const jobId = []
        if (option === null) option = []
        option.map(data => jobId.push(data.value))
        this.setState({
            selectedJobs: option,
            event: { ...this.state.event, jobId: jobId.join(',') }
        })
    }

    onChangePersonnelTarget = (option) => {
        const personnelId = []
        if (option === null) option = []
        option.map(data => personnelId.push(data.value))
        this.setState({
            selectedPersonnels: option,
            event: { ...this.state.event, personnelId: personnelId.join(',') }
        })
    }

    onNavigate = (date, view) => {
        this.setState({
            startDate: formatDate(new Date(date.getFullYear(), date.getMonth(), 1)),
            endDate: formatDate(new Date(date.getFullYear(), date.getMonth() + 1, 0))
        }, () => this.getDataFromAPI(this.state.startDate, this.state.endDate))
    }

    eventStyleGetter = (event, start, end, isSelected) => {
        var backgroundColor = event.id ? '#4dbd74' : '#f86c6b';
        var style = {
            backgroundColor: backgroundColor
        }
        return { style: style }
    }

    reactSelectStyle = {
        control: (styles, { data, isDisabled, isFocused, isSelected }) => {
            return {
                ...styles,
                backgroundColor: isDisabled ? '#fafbfd' : null,
                cursor: isDisabled ? 'no-drop' : 'default',
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

    getDataUnits = async () => {
        const { data } = await request.get('v1/master/units')
        let units = [];
        let unit = {};
        data.data.map(data => {
            unit = {
                value: data.id,
                label: data.name
            }
            return units.push(unit)
        })
        this.setState({ units })
    }

    getDataJobs = async () => {
        const { data } = await request.get('v1/master/jobs')
        let jobs = [];
        let job = {};
        data.data.map(data => {
            job = {
                value: data.id,
                label: data.name
            }
            return jobs.push(job)
        })
        this.setState({ jobs })
    }

    getDataPersonnels = async () => {
        const { data } = await request.get('v1/personnels/all/aktif')
        const dataPersonnels = data.data;
        let personnels = [];
        let personnel = {};
        dataPersonnels.map(data => {
            personnel = {
                value: data.id,
                label: data.fullName
            }
            return personnels.push(personnel)
        })
        this.setState({ personnels })
    }

    getDataOfficeLocation = async () => {
        const { data } = await request.get('v1/company/office-location')
        this.setState({ OfficeLocation: data.data })
    }

    getDataFromAPI = (start, end) => {
        Axios.get(process.env.REACT_APP_DOMAIN + `/api/v1/company/event?start=${start}&end=${end}`, { headers: { "Authorization": `Bearer ${this.props.token}` } })
            .then((res) => {
                const data = res.data.data;
                let events = [];
                let event = {};
                data.map(data => {
                    event = {
                        id: data.id,
                        date: data.date,
                        start: new Date(`${data.date} ${data.start || '00:00:00'}`),
                        end: new Date(`${data.date} ${data.end || '00:00:00'}`),
                        startTime: data.start,
                        endTime: data.end,
                        title: data.description,
                        unit: data.unit,
                        job: data.job,
                        personnel: data.personnel
                    }
                    return (
                        events.push(event)
                    );
                })
                this.setState({ events }, () => this.setState({ loading: false }))
            })
            .catch(error => {
                console.log(error)
            });
    }

    addDataToAPI = () => {
        // console.log(this.state.event)
        if (!this.state.userPrivileges.includes('add-calendar')) {
            toast.error(t('Maaf anda tidah boleh melakukan aksi ini'))
            return
        }
        const requiredFields = ['date', 'start', 'end', 'description'];
        for (let field of requiredFields) {
            if (!this.state.event[field]) {
                toast.error(t('isiantidakbolehkosong'));
                return;
            }
        }

        this.setState({ loading: true })
        Axios.post(process.env.REACT_APP_DOMAIN + '/api/v1/company/event', this.state.event, { headers: { "Authorization": `Bearer ${this.props.token}` } })
            .then((res) => {
                setTimeout(() => {
                    this.getDataFromAPI(this.state.startDate, this.state.endDate)
                    this.setState({
                        loading: false,
                        event: {}
                    }, () => { this.setState({ modalAddEvent: !this.state.modalAddEvent }) })
                    toast.success('Success', { autoClose: 3000 })
                }, 500)
            }).catch((error) => {
                setTimeout(() => {
                    this.setState({ loading: false })
                }, 500)
                toast.error('Error', { autoClose: 3000 })
            });
    }

    editDataToAPI = (id) => {
        if (!this.state.userPrivileges.includes('edit-calendar')) {
            toast.error(t('Maaf anda tidah boleh melakukan aksi ini'))
            return
        }
        const requiredFields = ['date', 'start', 'end', 'description'];
        for (let field of requiredFields) {
            if (!this.state.event[field]) {
                toast.error(t('isiantidakbolehkosong'));
                return;
            }
        }

        // console.log(this.state.event)
        this.setState({ loading: true })
        Axios.put(process.env.REACT_APP_DOMAIN + '/api/v1/company/event/' + id, this.state.event, { headers: { "Authorization": `Bearer ${this.props.token}` } })
            .then((res) => {
                setTimeout(() => {
                    this.getDataFromAPI(this.state.startDate, this.state.endDate)
                    this.setState({
                        loading: false,
                        modalDetailEvent: !this.state.modalDetailEvent,
                        eventDate: new Date(),
                        editEvent: false
                    })
                    toast.success('Success', { autoClose: 3000 })
                }, 500)
            }).catch((error) => {
                setTimeout(() => {
                    this.setState({ loading: false })
                }, 500)
                toast.error('Error', { autoClose: 3000 })
            });
    }

    deleteEvent = (id) => {
        if (!this.state.userPrivileges.includes('edit-calendar')) {
            toast.error(t('Maaf anda tidah boleh melakukan aksi ini'))
            return
        }
        this.setState({ editEvent: false, loading: true })
        Axios.delete(process.env.REACT_APP_DOMAIN + '/api/v1/company/event/' + id, { headers: { "Authorization": `Bearer ${this.props.token}` } })
            .then((res) => {
                setTimeout(() => {
                    this.getDataFromAPI(this.state.startDate, this.state.endDate)
                    this.setState({
                        modalDetailEvent: !this.state.modalDetailEvent,
                        loading: false
                    })
                    toast.success('Succes', { autoClose: 3000 })
                }, 500)
            }).catch((error) => {
                setTimeout(() => {
                    this.setState({ loading: false })
                }, 500)
                toast.error('Error', { autoClose: 3000 })
            });
    }

    render() {
        const { t } = this.props;
        moment.locale(t('id'))
        const calendarToolbar = {
            today: t("hariini"),
            previous: <i className="fa fa-angle-left"></i>,
            next: <i className="fa fa-angle-right"></i>,
            month: t("bulanan"),
            week: t("mingguan"),
            day: t("harian")
        }
        return (
            <div className="animated fadeIn">
                <h4 className="content-title mb-4">{t('Kalender Perusahaan')}</h4>
                <div className="content">
                    <Row>
                        <Col xs="12" className="d-flex justify-content-end mb-4">
                            <Button className={`${this.state.userPrivileges.includes('add-calendar') ? '' : ' d-none'}`} color="netis-color" onClick={() => this.modalAddEvent()}>
                                <i className="fa fa-plus mr-2"></i>{t('tambah')} Agenda
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12">
                            <Calendar
                                popup={true}
                                localizer={localizer}
                                defaultDate={this.state.date}
                                messages={calendarToolbar}
                                defaultView="month"
                                views={["month", "week", "day"]}
                                events={this.state.events}
                                style={{ height: "100vh" }}
                                onSelectEvent={event => this.modalDetailEvent(event)}
                                onNavigate={this.onNavigate}
                                eventPropGetter={(this.eventStyleGetter)}
                            />
                        </Col>
                    </Row>
                </div>

                {/* Modal Box Add Event */}
                <Modal isOpen={this.state.modalAddEvent} toggle={this.modalAddEvent} className={this.props.className} >
                    <ModalBody>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h5 className="content-sub-title mb-0">{t('tambah')} Agenda</h5>
                            <Button color="link" size="lg" className="text-danger" onClick={this.modalAddEvent}><strong>&times;</strong></Button>
                        </div>
                        <Row>
                            <div className="col-md-4">
                                <FormGroup>
                                    <Label htmlFor="start" className="input-label">{t('tanggal')}</Label>
                                    <DatePickerInput
                                        name="start"
                                        id="start"
                                        onChange={this.handleChangeDate}
                                        value={this.state.eventDate}
                                        className='my-custom-datepicker-component'
                                        disabled={this.state.event.id !== null ? false : true}
                                        showOnInputClick={true}
                                        closeOnClickOutside={true}
                                        displayFormat="DD MMMM YYYY"
                                        readOnly
                                    />
                                </FormGroup>
                            </div>
                            <div className="col-md-8">
                                <FormGroup>
                                    <Label htmlFor="time" className="input-label">{t('jam')}</Label>
                                    <FormGroup className="row">
                                        <div className="col-5 pr-0">
                                            <ReactInputMask className="form-control" name="start" mask="99:99" placeholder={t('contoh') + ' : 08:00'}
                                                disabled={this.state.event.id !== null ? false : true}
                                                value={this.state.event.start}
                                                onChange={this.handleChange} />
                                        </div>
                                        <div className="col-2 p-0 d-flex align-items-center justify-content-center">
                                            <Label className="input-label m-0">{t('s/d')}</Label>
                                        </div>
                                        <div className="col-5 pl-0">
                                            <ReactInputMask className="form-control" name="end" mask="99:99" placeholder={t('contoh') + ' : 09:00'}
                                                disabled={this.state.event.id !== null ? false : true}
                                                value={this.state.event.end}
                                                onChange={this.handleChange} />
                                        </div>
                                    </FormGroup>
                                </FormGroup>
                            </div>
                        </Row>
                        <Row>
                            <div className="col-12">
                                <FormGroup>
                                    <Label htmlFor="description" className="input-label">{t('deskripsi')}</Label>
                                    <Input type="text" name="description" id="description" placeholder={t('deskripsi')}
                                        disabled={this.state.event.id !== null ? false : true}
                                        value={this.state.event.title}
                                        onChange={this.handleChange} />
                                </FormGroup>
                            </div>
                        </Row>
                        <Row>
                            <div className="col-12">
                                <Label htmlFor="" className="input-label">Target Agenda</Label>
                            </div>
                            <div className="col-12">
                                <FormGroup check inline>
                                    <Input className="form-check-input" type="radio" id="all" name="event-target" value="all"
                                        onChange={this.handleRadioTarget}
                                        checked={this.state.targetAll} />
                                    <Label className="form-check-label" check htmlFor="all">{t('semua')} {t('karyawan')}</Label>
                                </FormGroup>
                            </div>
                            <div className="col-12 mb-2">
                                <FormGroup check inline>
                                    <Input className="form-check-input" type="radio" id="unit" name="event-target" value="unit"
                                        onChange={this.handleRadioTarget} />
                                    <Label className="form-check-label" check htmlFor="unit">{t('karyawan')} Unit</Label>
                                </FormGroup>
                                <Select
                                    name="Unit"
                                    isMulti
                                    // value={this.state.selectedUnits}
                                    options={this.state.units}
                                    onChange={value => this.onChangeUnit(value)}
                                    isDisabled={!this.state.targetUnit}
                                    styles={this.reactSelectStyle}
                                />
                            </div>
                            <div className="col-12 mb-2">
                                <FormGroup check inline>
                                    <Input className="form-check-input" type="radio" id="job" name="event-target" value="job"
                                        onChange={this.handleRadioTarget} />
                                    <Label className="form-check-label" check htmlFor="job">{t('karyawan')} {t('jabatan')}</Label>
                                </FormGroup>
                                <Select
                                    name="Job"
                                    isMulti
                                    options={this.state.jobs}
                                    onChange={value => this.onChangeJob(value)}
                                    isDisabled={!this.state.targetJob}
                                    styles={this.reactSelectStyle}
                                />
                            </div>
                        </Row>
                        <Row>
                            <div className="col-12">
                                <FormGroup>
                                    <FormGroup check inline>
                                        <Input className="form-check-input" type="radio" id="personnel" name="event-target" value="personnel"
                                            onChange={this.handleRadioTarget} />
                                        <Label className="form-check-label" check htmlFor="personnel">{t('beberapa')} {t('karyawan')}</Label>
                                    </FormGroup>
                                    <Select
                                        name="Personnel"
                                        isMulti
                                        options={this.state.personnels}
                                        onChange={value => this.onChangePersonnelTarget(value)}
                                        isDisabled={!this.state.targetPersonnel}
                                        styles={this.reactSelectStyle}
                                    />
                                </FormGroup>
                            </div>
                        </Row>
                        <Row>
                            <div className="col-12 d-flex justify-content-end">
                                <Button className="mr-2" color="white" onClick={this.modalAddEvent}>{t('batal')}</Button>
                                <Button color="netis-color" style={{ width: '67px' }} disabled={this.state.loading} onClick={this.addDataToAPI}>
                                    {this.state.loading ? <Spinner color="light" size="sm" /> : t('simpan')}
                                </Button>
                            </div>
                        </Row>
                    </ModalBody>
                </Modal>

                {/* Modal Box Detail Event */}
                <Modal isOpen={this.state.modalDetailEvent} toggle={this.cancelModalDetailEvent} className={this.props.className} >
                    <ModalBody>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h5 className="content-sub-title mb-0">{t('Detail Agenda')}</h5>
                            <Button color="link" size="lg" className="text-danger" onClick={this.cancelModalDetailEvent}><strong>&times;</strong></Button>
                        </div>
                        <Row>
                            <div className="col-md-4">
                                <FormGroup>
                                    <Label htmlFor="fullName" className="input-label">{t('tanggal')}</Label>
                                    <DatePickerInput
                                        name="dateOfBirth"
                                        id="dateOfBirth"
                                        onChange={this.handleChangeDate}
                                        value={this.state.eventDate}
                                        className='my-custom-datepicker-component'
                                        disabled={!this.state.editEvent}
                                        showOnInputClick={true}
                                        closeOnClickOutside={true}
                                        displayFormat="DD MMMM YYYY"
                                        readOnly
                                    />
                                </FormGroup>
                            </div>
                            <div className="col-md-8">
                                <FormGroup>
                                    <Label htmlFor="time" className="input-label">{t('jam')}</Label>
                                    <FormGroup className="row">
                                        <div className="col-5 pr-0">
                                            <ReactInputMask className="form-control" name="start" mask="99:99" placeholder={t('contoh') + ' : 08:00'}
                                                disabled={!this.state.editEvent}
                                                value={this.state.event.start || ''}
                                                onChange={this.handleChange} />

                                        </div>
                                        <div className="col-2 p-0 d-flex align-items-center justify-content-center">
                                            <Label className="input-label m-0">{t('s/d')}</Label>
                                        </div>
                                        <div className="col-5 pl-0">
                                            <ReactInputMask className="form-control" name="end" mask="99:99" placeholder={t('contoh') + ' : 09:00'}
                                                disabled={!this.state.editEvent}
                                                value={this.state.event.end || ''}
                                                onChange={this.handleChange} />
                                        </div>
                                    </FormGroup>
                                </FormGroup>
                            </div>
                        </Row>
                        <Row>
                            <div className="col-12">
                                <FormGroup>
                                    <Label htmlFor="description" className="input-label">{t('deskripsi')}</Label>
                                    <Input type="text" name="description" id="description" placeholder={t('deskripsi')}
                                        disabled={!this.state.editEvent}
                                        value={this.state.event.title || ''}
                                        onChange={this.handleChange} />
                                </FormGroup>
                            </div>
                        </Row>
                        {this.state.event.id &&
                            <>
                                <Row>
                                    <div className="col-12">
                                        <Label htmlFor="" className="input-label">Target Agenda</Label>
                                    </div>
                                    <div className="col-12">
                                        <FormGroup check inline>
                                            <Input className="form-check-input" type="radio" id="all" name="event-target" value="all"
                                                onChange={this.handleRadioTarget}
                                                checked={this.state.targetAll}
                                                disabled={!this.state.editEvent} />
                                            <Label className="form-check-label" check htmlFor="all">{t('semua')} {t('karyawan')}</Label>
                                        </FormGroup>
                                    </div>
                                    <div className="col-12 mb-2">
                                        <FormGroup check inline>
                                            <Input className="form-check-input" type="radio" id="unit" name="event-target" value="unit"
                                                onChange={this.handleRadioTarget}
                                                checked={this.state.selectedUnits.length > 0 ? true : false}
                                                disabled={!this.state.editEvent} />
                                            <Label className="form-check-label" check htmlFor="unit">{t('karyawan')} Unit</Label>
                                        </FormGroup>
                                        <Select
                                            name="Unit"
                                            isMulti
                                            value={this.state.selectedUnits}
                                            options={this.state.units}
                                            onChange={value => this.onChangeUnit(value)}
                                            isDisabled={!this.state.targetUnit}
                                            styles={this.reactSelectStyle}
                                        />
                                    </div>
                                    <div className="col-12 mb-2">
                                        <FormGroup check inline>
                                            <Input className="form-check-input" type="radio" id="job" name="event-target" value="job"
                                                onChange={this.handleRadioTarget}
                                                checked={this.state.selectedJobs.length > 0 ? true : false}
                                                disabled={!this.state.editEvent} />
                                            <Label className="form-check-label" check htmlFor="job">{t('karyawan')} {t('jabatan')}</Label>
                                        </FormGroup>
                                        <Select
                                            name="Job"
                                            isMulti
                                            value={this.state.selectedJobs}
                                            options={this.state.jobs}
                                            onChange={value => this.onChangeJob(value)}
                                            isDisabled={!this.state.targetJob}
                                            styles={this.reactSelectStyle}
                                        />
                                    </div>
                                </Row>
                                <Row>
                                    <div className="col-12">
                                        <FormGroup>
                                            <FormGroup check inline>
                                                <Input className="form-check-input" type="radio" id="personnel" name="event-target" value="personnel"
                                                    onChange={this.handleRadioTarget}
                                                    checked={this.state.selectedPersonnels.length > 0 ? true : false}
                                                    disabled={!this.state.editEvent} />
                                                <Label className="form-check-label" check htmlFor="personnel">{t('beberapa')} Karyawan</Label>
                                            </FormGroup>
                                            <Select
                                                name="Personnel"
                                                isMulti
                                                value={this.state.selectedPersonnels}
                                                options={this.state.personnels}
                                                onChange={value => this.onChangePersonnelTarget(value)}
                                                isDisabled={!this.state.targetPersonnel}
                                                styles={this.reactSelectStyle}
                                            />
                                        </FormGroup>
                                    </div>
                                </Row>
                            </>
                        }
                        <Row>
                            <div className="col-12 d-flex justify-content-between">
                                <div>
                                    {this.state.event.id !== null ?
                                        <Button className="mt-3" color="red-custom" disabled={this.state.loading} onClick={() => this.deleteEvent(this.state.idEditEvent)}>{t('hapus')} Data</Button>
                                        : null
                                    }
                                </div>
                                <div>
                                    {this.state.event.id !== null ?
                                        this.state.editEvent ?
                                            < Fragment >
                                                <Button className="mr-3 mt-3" color="white" onClick={this.editEvent}>{t('batal')}</Button>
                                                <Button className="mt-3" color="netis-color" style={{ width: '67px' }} disabled={this.state.loading} onClick={() => this.editDataToAPI(this.state.idEditEvent)}>
                                                    {this.state.loading ? <Spinner color="light" size="sm" /> : t('simpan')}
                                                </Button>
                                            </Fragment>
                                            :
                                            <Button type="submit" className={`mt-3${this.state.userPrivileges.includes('edit-calendar') ? '' : ' d-none'}`} color="netis-color" onClick={this.editEvent}><i className="fa fa-pencil" style={{ marginRight: 5 }}></i>Edit</Button>
                                        :
                                        <Button className="mt-3" color="netis-color" onClick={this.cancelModalDetailEvent}>{t('tutup')}</Button>
                                    }
                                </div>
                            </div>
                        </Row>
                    </ModalBody>
                </Modal>
            </div >
        );
    }
}

const mapStateToProps = ({ isAdminPanel, user, token }) => ({ isAdminPanel, user, token });
export default connect(mapStateToProps)(translate(CalendarMenu));
