import React, { useCallback } from "react"
import { Card, CardBody, Row, Col, Button, Input, Label, InputGroup, InputGroupAddon, InputGroupText, CustomInput } from "reactstrap";
import Select from 'react-select';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Datepicker from "react-datepicker";
import { Stats } from "../Components/Navigation";
import { useFormik } from "formik";
import * as Yup from 'yup';

export default (props) => {
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

    const ValidationFormSchema = () => {
        return Yup.array().of(
            Yup.object().shape({
                job: Yup.string().required().label('Job'),
                company: Yup.string().required().label('Company Name'),
                sector: Yup.string().required().label('Sector'),
                employementType: Yup.string().required().label('Employement Type'),
                location: Yup.string().required().label('Location'),
                startDate: Yup.string().required().label('Start Date'),
                endDate: Yup.string().required().label('End Date'),
                skills: Yup.string().required().label('Skills'),
            })
        )
    }

    const { values: workExperienceData, touched, errors, setValues: setWorkExperienceData, handleSubmit } = useFormik({
        initialValues: [
            {
                id: 1,
                job: '',
                company: '',
                sector: '',
                employementType: '',
                location: '',
                startDate: '',
                endDate: '',
                endDatePresent: '',
                skills: [],
            }
        ],
        validationSchema: ValidationFormSchema,
        onSubmit: (values, { setSubmitting, setErrors }) => {
            setSubmitting(true)
            props.onSubmitForm(values)
            props.nextStep();
        }
    })

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
        setWorkExperienceData(old => ([...old, { id: old[old.length - 1].id + 1, job: '', company: '', sector: '', employementType: '', location: '', startDate: '', endDate: '', endDatePresent: '', skills: [], }]))
    }, [setWorkExperienceData])

    const handleDeleteWorkExperienceData = useCallback((i) => {
        setWorkExperienceData(old => ([...old].filter(work => work.id !== i)))
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
                                            {i > 0 &&
                                                <Row className="my-3">
                                                    <Col xs="12">
                                                        <Button color="danger" className="float-right mt-n3 mb-3" onClick={() => handleDeleteWorkExperienceData(work.id)}><FontAwesomeIcon icon="trash-alt" /></Button>
                                                    </Col>
                                                </Row>
                                            }
                                            <Row className="my-3">
                                                <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                                    <Label for="job">Job Title</Label>
                                                </Col>
                                                <Col xs="12" md="8" lg="9">
                                                    <Input type="text" name="job" id="job" value={work.job} onChange={(e) => handleChangeJob(e, work.id)} placeholder="Job Title Field..." />
                                                    {touched[i]?.job && errors[i]?.job && <small className="text-danger">{errors[i]?.job}</small>}
                                                </Col>
                                            </Row>
                                            <Row className="my-3">
                                                <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                                    <Label for="job">Company Name</Label>
                                                </Col>
                                                <Col xs="12" md="8" lg="9">
                                                    <Input type="text" name="company" id="company" value={work.company} onChange={(e) => handleChangeCompany(e, work.id)} placeholder="Company Name Field..." />
                                                    {touched[i]?.company && errors[i]?.company && <small className="text-danger">{errors[i]?.company}</small>}
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
                                                        onChange={(e) => handleChangeSector(e, work.id)}
                                                        components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                                        value={work.sector}
                                                    />
                                                    {touched[i]?.sector && errors[i]?.sector && <small className="text-danger">{errors[i]?.sector}</small>}
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
                                                        onChange={(e) => handleChangeEmployementType(e, work.id)}
                                                        components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                                        value={work.employementType}
                                                    />
                                                    {touched[i]?.employementType && errors[i]?.employementType && <small className="text-danger">{errors[i]?.employementType}</small>}
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
                                                        onChange={(e) => handleChangeLocation(e, work.id)}
                                                        components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                                        value={work.location}
                                                    />
                                                    {touched[i]?.location && errors[i]?.location && <small className="text-danger">{errors[i]?.location}</small>}
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
                                                        onChange={(e) => handleChangeStartDate(e, work.id)}
                                                        showMonthYearPicker
                                                        showFullMonthYearPicker
                                                        showFourColumnMonthYearPicker
                                                        className="form-control"
                                                        dateFormat="MMMM yyyy"
                                                        maxDate={new Date()}
                                                        placeholderText="Select a date"
                                                        wrapperClassName="form-control"
                                                    />
                                                    {touched[i]?.startDate && errors[i]?.startDate && <small className="text-danger">{errors[i]?.startDate}</small>}
                                                </Col>
                                            </Row>
                                            <Row className="my-3">
                                                <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                                    <Label for="endDate">End Date</Label>
                                                </Col>
                                                <Col xs="12" md="8" lg="9">
                                                    <Row>
                                                        <Col xs="6" md="4" lg="5">
                                                            <Datepicker
                                                                required
                                                                name="endDate"
                                                                selected={work.endDate}
                                                                onChange={(e) => handleChangeEndDate(e, work.id)}
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
                                                                        <CustomInput type="checkbox" id="present" value="present" checked={work.endDatePresent} onChange={(e) => handleChangePresent(e, work.id)} />
                                                                    </InputGroupText>
                                                                </InputGroupAddon>
                                                                <div className="d-flex bg-transparent p-1 align-items-center">
                                                                    Present
                                                                </div>
                                                            </InputGroup>
                                                        </Col>
                                                        <Col xs="12">
                                                            {touched[i]?.endDate && errors[i]?.endDate && <small className="text-danger">{errors[i]?.endDate}</small>}
                                                        </Col>
                                                    </Row>
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
                                                        onChange={(e) => handleChangeSkills(e, work.id)}
                                                        components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                                        value={work.skills} />
                                                    {touched[i]?.skills && errors[i]?.skills && <small className="text-danger">{errors[i]?.skills}</small>}
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
            <Col xs="12"><Stats step={3} {...props} nextStep={handleSubmit} /></Col>
        </Row>
    );
}
