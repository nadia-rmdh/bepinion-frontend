import React, { useCallback, useMemo } from "react"
import { Card, CardBody, Row, Col, Button, Input, Label, InputGroup, InputGroupAddon, InputGroupText, CustomInput } from "reactstrap";
import Select from 'react-select';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Datepicker from "react-datepicker";
import { Stats } from "../Components/Navigation";
import { useFormik } from "formik";
import * as Yup from 'yup';
import useDataSectors from "../../../../hooks/useDataSectors";
import useDataProvinces from "../../../../hooks/useDataProvinces";
import useDataSkills from "../../../../hooks/useDataSkills";

export default (props) => {
    const { data: getSector } = useDataSectors();
    const sectors = useMemo(() => getSector.map(p => ({ label: p.name, value: p.id })), [getSector])

    const { data: getProvince } = useDataProvinces();
    const provinces = useMemo(() => getProvince.map(p => ({ label: p.name, value: p.id })), [getProvince])

    const employementTypes = [
        { label: 'Permanent employee', value: 'permanent_employee' },
        { label: 'Part-time Employee', value: 'part_time_employee' },
        { label: 'Fixed-Term Contract Employee', value: 'fixed_term_contract_employee' },
        { label: 'Intern', value: 'intern' },
        { label: 'Freelancer', value: 'freelancer' },
    ]

    const { data: getSkills } = useDataSkills();
    const skills = useMemo(() => getSkills.map(p => ({ label: p.name, value: p.id })), [getSkills])

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
                endDatePresent: false,
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
        const { checked } = e.target;
        setWorkExperienceData(old => [...old].map(work => {
            if (work.id === i) return { ...work, endDate: new Date(), endDatePresent: checked }
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
        setWorkExperienceData(old => ([...old, { id: old[old.length - 1].id + 1, job: '', company: '', sector: '', employementType: '', location: '', startDate: '', endDate: '', endDatePresent: false, skills: [], }]))
    }, [setWorkExperienceData])

    const handleDeleteWorkExperienceData = useCallback((i) => {
        setWorkExperienceData(old => ([...old].filter(work => work.id !== i)))
    }, [setWorkExperienceData])

    return (
        <Row>
            <Col xs="12">
                <Card className="shadow-sm">
                    <CardBody>
                        <Row className="px-md-5">
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
                                                    <Input type="text" value={work.job} onChange={(e) => handleChangeJob(e, work.id)}/>
                                                    {touched[i]?.job && errors[i]?.job && <small className="text-danger">{errors[i]?.job}</small>}
                                                </Col>
                                            </Row>
                                            <Row className="my-3">
                                                <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                                    <Label for="job">Company Name</Label>
                                                </Col>
                                                <Col xs="12" md="8" lg="9">
                                                    <Input type="text" name="company" id="company" value={work.company} onChange={(e) => handleChangeCompany(e, work.id)}/>
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
                                                        {!work.endDatePresent &&
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
                                                                    wrapperClassName="form-control"
                                                                />
                                                            </Col>
                                                        }
                                                        <Col xs="6" md="4" lg="4">
                                                            <InputGroup>
                                                                <InputGroupAddon addonType="prepend">
                                                                    <InputGroupText className="bg-transparent border-0 px-0">
                                                                        <CustomInput type="checkbox" id={`present-${work.id}`} value="present" checked={work.endDatePresent} onChange={(e) => handleChangePresent(e, work.id)} />
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
            <Col xs="12"><Stats step={props.step} {...props} nextStep={handleSubmit} /></Col>
        </Row>
    );
}
