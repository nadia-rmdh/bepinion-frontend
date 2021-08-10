import React, { useCallback, useState } from "react"
import { Card, CardBody, Row, Col, Button, Input, Label } from "reactstrap";
import Select from 'react-select';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Datepicker from "react-datepicker";
import TextareaAutosize from "react-textarea-autosize";

export default () => {
    const [projectExperienceData, setProjectExperienceData] = useState([
        {
            id: 1,
            projectName: '',
            client: '',
            projectRole: '',
            sector: null,
            location: null,
            startDate: '',
            endDate: '',
            description: '',
            skills: [],
        }
    ])

    const sectors = [
        { label: 'Sector 1', value: 'Sector 1' },
        { label: 'Sector 2', value: 'Sector 2' },
        { label: 'Sector 3', value: 'Sector 3' },
        { label: 'Sector 4', value: 'Sector 4' },
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
        setProjectExperienceData(old => [...old].map(project => {
            if (project.id === i) return { ...project, sector: e }
            return { ...project };
        }))
    }, [setProjectExperienceData])

    const handleChangeLocation = useCallback((e, i) => {
        setProjectExperienceData(old => [...old].map(project => {
            if (project.id === i) return { ...project, location: e }
            return { ...project };
        }))
    }, [setProjectExperienceData])

    const handleChangeProjectName = useCallback((e, i) => {
        const { value } = e.target;
        setProjectExperienceData(old => [...old].map(project => {
            if (project.id === i) return { ...project, projectName: value }
            return { ...project };
        }))
    }, [setProjectExperienceData])

    const handleChangeClient = useCallback((e, i) => {
        const { value } = e.target;
        setProjectExperienceData(old => [...old].map(project => {
            if (project.id === i) return { ...project, client: value }
            return { ...project };
        }))
    }, [setProjectExperienceData])

    const handleChangeProjectRole = useCallback((e, i) => {
        const { value } = e.target;
        setProjectExperienceData(old => [...old].map(project => {
            if (project.id === i) return { ...project, projectRole: value }
            return { ...project };
        }))
    }, [setProjectExperienceData])

    const handleChangeStartDate = useCallback((e, i) => {
        setProjectExperienceData(old => [...old].map(project => {
            if (project.id === i) return { ...project, startDate: e }
            return { ...project };
        }))
    }, [setProjectExperienceData])

    const handleChangeEndDate = useCallback((e, i) => {
        setProjectExperienceData(old => [...old].map(project => {
            if (project.id === i) return { ...project, endDate: e }
            return { ...project };
        }))
    }, [setProjectExperienceData])

    const handleChangeDescription = useCallback((e, i) => {
        const { value } = e.target;
        setProjectExperienceData(old => [...old].map(project => {
            if (project.id === i) return { ...project, description: value }
            return { ...project };
        }))
    }, [setProjectExperienceData])

    const handleChangeSkills = useCallback((e, i) => {
        setProjectExperienceData(old => [...old].map(project => {
            if (project.id === i) return { ...project, skills: e ?? [] }
            return { ...project };
        }))
    }, [setProjectExperienceData])

    const handleAddprojectExperienceData = useCallback(() => {
        setProjectExperienceData(old => ([...old, { id: old.length + 1, job: '', company: '', sector: null, employementType: null, location: null, startDate: '', endDate: '', endDatePresent: '', skills: [], }]))
    }, [setProjectExperienceData])

    const handleDeleteprojectExperienceData = useCallback((i) => {
        setProjectExperienceData(old => ([...old].filter(project => project.id === i)))
    }, [setProjectExperienceData])

    return (
        <Row>
            <Col xs="12">
                <Card className="shadow-sm">
                    <CardBody>
                        <Row className="px-5">
                            <Col xs="12" className="mb-3">
                                <div className="font-xl font-weight-bold text-uppercase">project Experience</div>
                            </Col>
                            {projectExperienceData.map((project, i) => (
                                <Col xs="12" key={i}>
                                    <Card className="shadow-sm">
                                        <CardBody>
                                            <Row className="my-3">
                                                <Col xs="12">
                                                    <Button color="danger" className="float-right mt-n3 mb-3" onClick={() => handleDeleteprojectExperienceData(i)}><FontAwesomeIcon icon="trash-alt" /></Button>
                                                </Col>
                                            </Row>
                                            <Row className="my-3">
                                                <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                                    <Label for="projectName">Project Name</Label>
                                                </Col>
                                                <Col xs="12" md="8" lg="9">
                                                    <Input type="text" name="projectName" id="projectName" value={project.projectName} onChange={(e) => handleChangeProjectName(e, i + 1)} placeholder="Job Title Field..." />
                                                </Col>
                                            </Row>
                                            <Row className="my-3">
                                                <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                                    <Label for="client">Client Name</Label>
                                                </Col>
                                                <Col xs="12" md="8" lg="9">
                                                    <Input type="text" name="client" id="client" value={project.client} onChange={(e) => handleChangeClient(e, i + 1)} placeholder="Client Name Field..." />
                                                </Col>
                                            </Row>
                                            <Row className="my-3">
                                                <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                                    <Label for="projectRole">Project Role</Label>
                                                </Col>
                                                <Col xs="12" md="8" lg="9">
                                                    <Input type="text" name="projectRole" id="projectRole" value={project.projectRole} onChange={(e) => handleChangeProjectRole(e, i + 1)} placeholder="Project Role Field..." />
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
                                                        value={project.sector}
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
                                                        value={project.location}
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
                                                        selected={project.startDate}
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
                                                <Col xs="12" md="8" lg="9">
                                                    <Datepicker
                                                        required
                                                        name="endDate"
                                                        selected={project.endDate}
                                                        onChange={(e) => handleChangeEndDate(e, i + 1)}
                                                        showMonthYearPicker
                                                        showFullMonthYearPicker
                                                        showFourColumnMonthYearPicker
                                                        className="form-control"
                                                        dateFormat="MMMM yyyy"
                                                        minDate={project.startDate}
                                                        maxDate={new Date()}
                                                        placeholderText="Select a date"
                                                        wrapperClassName="form-control"
                                                    />
                                                </Col>
                                            </Row>
                                            <Row className="my-3">
                                                <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                                    <Label for="description">Description</Label>
                                                </Col>
                                                <Col xs="12" md="8" lg="9">
                                                    <TextareaAutosize
                                                        minRows={3}
                                                        name="description"
                                                        id="description"
                                                        className="form-control"
                                                        placeholder="Description Field..."
                                                        value={project.description}
                                                        onChange={(e) => handleChangeDescription(e, i + 1)}
                                                    />
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
                                                        value={project.skills} />
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                            ))}
                            <Col xs="12">
                                <Button color="success" className="float-right" onClick={handleAddprojectExperienceData}>Add project Experience</Button>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
}
