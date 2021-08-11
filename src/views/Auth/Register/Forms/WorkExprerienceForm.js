import React, { useCallback, useState } from "react"
import { Card, CardBody, Row, Col, Button, Input, Label, InputGroup, InputGroupAddon, InputGroupText, CustomInput } from "reactstrap";
import Select from 'react-select';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Datepicker from "react-datepicker";
import { Stats } from "../Components/Navigation";

export default (props) => {
    const [workExperienceData, setWorkExperienceData] = useState([
        {
            id: 1,
            job: '',
            company: '',
            sector: null,
            employementType: null,
            location: null,
            startDate: '',
            endDate: '',
            endDatePresent: '',
            skills: [],
        }
    ])

    const sectors = [
        { label: 'Sector 1', value: 'Sector 1' },
        { label: 'Sector 2', value: 'Sector 2' },
        { label: 'Sector 3', value: 'Sector 3' },
        { label: 'Sector 4', value: 'Sector 4' },
    ]

    const employementTypes = [
        { label: 'Type 1', value: 'Type 1' },
        { label: 'Type 2', value: 'Type 2' },
        { label: 'Type 3', value: 'Type 3' },
        { label: 'Type 4', value: 'Type 4' },
    ]

    const provinces = [
        { label: 'Jawa Timur', value: 'Jawa Timur' },
        { label: 'Jawa Tengah', value: 'Jawa Tengah' },
        { label: 'Jawa Barat', value: 'Jawa Barat' },
        { label: 'DKI Jakarta', value: 'DKI Jakarta' },
        { label: 'DIY', value: 'DIY' },
        { label: 'Banten', value: 'Banten' },
    ]

    const skills = [
        { label: 'PHP', value: 'php' },
        { label: 'Phyton', value: 'phyton' },
        { label: 'Javascript', value: 'javascript' },
        { label: 'Flutter', value: 'flutter' },
        { label: 'Golang', value: 'golang' },
        { label: 'Laravel', value: 'laravel' },
        { label: 'React JS', value: 'reactjs' },
        { label: 'Node JS', value: 'nodejs' },
        { label: 'React Native', value: 'reactnative' },
    ]

    const handleChangeSector = useCallback((e, i) => {
        setWorkExperienceData(old => [...old].map(work => {
            if (work.id === i) return { ...work, sector: e }
            return { ...work };
        }))
    }, [setWorkExperienceData])

    const handleChangeEmployementType = useCallback((e, i) => {
        setWorkExperienceData(old => [...old].map(work => {
            if (work.id === i) return { ...work, employementType: e }
            return { ...work };
        }))
    }, [setWorkExperienceData])

    const handleChangeLocation = useCallback((e, i) => {
        setWorkExperienceData(old => [...old].map(work => {
            if (work.id === i) return { ...work, location: e }
            return { ...work };
        }))
    }, [setWorkExperienceData])

    const handleChangeJob = useCallback((e, i) => {
        const { value } = e.target;
        setWorkExperienceData(old => [...old].map(work => {
            if (work.id === i) return { ...work, job: value }
            return { ...work };
        }))
    }, [setWorkExperienceData])

    const handleChangeCompany = useCallback((e, i) => {
        const { value } = e.target;
        setWorkExperienceData(old => [...old].map(work => {
            if (work.id === i) return { ...work, company: value }
            return { ...work };
        }))
    }, [setWorkExperienceData])

    const handleChangeStartDate = useCallback((e, i) => {
        setWorkExperienceData(old => [...old].map(work => {
            if (work.id === i) return { ...work, startDate: e }
            return { ...work };
        }))
    }, [setWorkExperienceData])

    const handleChangeEndDate = useCallback((e, i) => {
        setWorkExperienceData(old => [...old].map(work => {
            if (work.id === i) return { ...work, endDate: e }
            return { ...work };
        }))
    }, [setWorkExperienceData])

    const handleChangePresent = useCallback((e, i) => {
        const { value, checked } = e.target;
        setWorkExperienceData(old => [...old].map(work => {
            if (work.id === i) return { ...work, endDatePresent: checked ? value : '' }
            return { ...work };
        }))
    }, [setWorkExperienceData])

    const handleChangeSkills = useCallback((e, i) => {
        setWorkExperienceData(old => [...old].map(work => {
            if (work.id === i) return { ...work, skills: e ?? [] }
            return { ...work };
        }))
    }, [setWorkExperienceData])

    const handleAddWorkExperienceData = useCallback(() => {
        setWorkExperienceData(old => ([...old, { id: old.length + 1, job: '', company: '', sector: null, employementType: null, location: null, startDate: '', endDate: '', endDatePresent: '', skills: [], }]))
    }, [setWorkExperienceData])

    const handleDeleteWorkExperienceData = useCallback((i) => {
        setWorkExperienceData(old => ([...old].filter(work => work.id === i)))
    }, [setWorkExperienceData])

    return (
        <Row>
            <Col xs="12">
                <Card className="shadow-sm">
                    <CardBody>
                        <Row className="px-5">
                            <Col xs="12" className="mb-3">
                                <div className="font-xl font-weight-bold text-uppercase">Work Experience</div>
                            </Col>
                            {workExperienceData.map((work, i) => (
                                <Col xs="12" key={i}>
                                    <Card className="shadow-sm">
                                        <CardBody>
                                            <Row className="my-3">
                                                <Col xs="12">
                                                    <Button color="danger" className="float-right mt-n3 mb-3" onClick={() => handleDeleteWorkExperienceData(i)}><FontAwesomeIcon icon="trash-alt" /></Button>
                                                </Col>
                                            </Row>
                                            <Row className="my-3">
                                                <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                                    <Label for="job">Job Title</Label>
                                                </Col>
                                                <Col xs="12" md="8" lg="9">
                                                    <Input type="text" name="job" id="job" value={work.job} onChange={(e) => handleChangeJob(e, i + 1)} placeholder="Job Title Field..." />
                                                </Col>
                                            </Row>
                                            <Row className="my-3">
                                                <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                                    <Label for="job">Company Name</Label>
                                                </Col>
                                                <Col xs="12" md="8" lg="9">
                                                    <Input type="text" name="company" id="company" value={work.company} onChange={(e) => handleChangeCompany(e, i + 1)} placeholder="Company Name Field..." />
                                                </Col>
                                            </Row>
                                            <Row className="my-3">
                                                <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                                    <Label for="sector">Sector</Label>
                                                </Col>
                                                <Col xs="12" md="8" lg="9">
                                                    <Select
                                                        options={sectors}
                                                        placeholder="Choose sector..."
                                                        onChange={(e) => handleChangeSector(e, i + 1)}
                                                        components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                                        value={work.sector}
                                                    />
                                                </Col>
                                            </Row>
                                            <Row className="my-3">
                                                <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                                    <Label for="employementType">Employment Type</Label>
                                                </Col>
                                                <Col xs="12" md="8" lg="9">
                                                    <Select
                                                        options={employementTypes}
                                                        placeholder="Choose Employment Type..."
                                                        onChange={(e) => handleChangeEmployementType(e, i + 1)}
                                                        components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                                        value={work.employementType}
                                                    />
                                                </Col>
                                            </Row>
                                            <Row className="my-3">
                                                <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                                    <Label for="location">Location</Label>
                                                </Col>
                                                <Col xs="12" md="8" lg="9">
                                                    <Select
                                                        options={provinces}
                                                        placeholder="Choose Location..."
                                                        onChange={(e) => handleChangeLocation(e, i + 1)}
                                                        components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                                        value={work.location}
                                                    />
                                                </Col>
                                            </Row>
                                            <Row className="my-3">
                                                <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                                    <Label for="startDate">Start Date</Label>
                                                </Col>
                                                <Col xs="12" md="8" lg="9">
                                                    <Datepicker
                                                        required
                                                        name="startDate"
                                                        selected={work.startDate}
                                                        onChange={(e) => handleChangeStartDate(e, i + 1)}
                                                        showMonthYearPicker
                                                        showFullMonthYearPicker
                                                        showFourColumnMonthYearPicker
                                                        className="form-control"
                                                        dateFormat="MMMM yyyy"
                                                        maxDate={new Date()}
                                                        placeholderText="Select a date"
                                                        wrapperClassName="form-control"
                                                    />
                                                </Col>
                                            </Row>
                                            <Row className="my-3">
                                                <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                                    <Label for="endDate">End Date</Label>
                                                </Col>
                                                <Col xs="6" md="4" lg="5">
                                                    <Datepicker
                                                        required
                                                        name="endDate"
                                                        selected={work.endDate}
                                                        onChange={(e) => handleChangeEndDate(e, i + 1)}
                                                        showMonthYearPicker
                                                        showFullMonthYearPicker
                                                        showFourColumnMonthYearPicker
                                                        className="form-control"
                                                        dateFormat="MMMM yyyy"
                                                        minDate={work.startDate}
                                                        maxDate={new Date()}
                                                        placeholderText="Select a date"
                                                        wrapperClassName="form-control"
                                                    />
                                                </Col>
                                                <Col xs="6" md="4" lg="4">
                                                    <InputGroup>
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText className="bg-transparent border-0 px-0">
                                                                <CustomInput type="checkbox" id="present" value="present" checked={work.endDatePresent} onChange={(e) => handleChangePresent(e, i + 1)} />
                                                            </InputGroupText>
                                                        </InputGroupAddon>
                                                        <div className="d-flex bg-transparent p-1 align-items-center">
                                                            Present
                                                        </div>
                                                    </InputGroup>
                                                </Col>
                                            </Row>
                                            <Row className="my-3">
                                                <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                                    <Label for="skill">Skill</Label>
                                                </Col>
                                                <Col xs="12" md="8" lg="9">
                                                    <Select
                                                        closeMenuOnSelect={false}
                                                        options={skills}
                                                        isClearable
                                                        isMulti
                                                        placeholder="Choose some skills..."
                                                        onChange={(e) => handleChangeSkills(e, i + 1)}
                                                        components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                                        value={work.skills} />
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                            ))}
                            <Col xs="12">
                                <Button color="success" className="float-right" onClick={handleAddWorkExperienceData}>Add Work Experience</Button>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
            <Col xs="12"><Stats step={3} {...props} /></Col>
        </Row>
    );
}
