import React, { useCallback, useMemo, useState } from "react"
import { Card, CardBody, Row, Col, Button, Input, Label, InputGroup, InputGroupAddon, InputGroupText, CustomInput, Spinner } from "reactstrap";
import Select from 'react-select';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Datepicker from "react-datepicker";
import { useFormik } from "formik";
import * as Yup from 'yup';
import useDataSectors from "../../../../hooks/useDataSectors";
import useDataProvinces from "../../../../hooks/useDataProvinces";
import useDataSkills from "../../../../hooks/useDataSkills";

export default (props) => {
    const data = props.data.workExperience;
    const [isEdit, ] = useState(false);
    const currentData = useMemo(() => data.map((v) => (
        {
            id: v.id,
            job: v.jobTitle,
            company: v.companyName,
            sector: { label: v.sector.name, value: v.sector.id },
            employementType: { label: v.employmentType.replace(/_/g, ' ').charAt(0).toUpperCase() + v.employmentType.replace(/_/g, ' ').slice(1), value: v.employmentType },
            location: { label: v.province.name, value: v.province.id },
            startDate: new Date(v.startDate),
            endDate: new Date(v.endDate),
            endDatePresent: v.isStillPresent ? true : false,
            skills: v.skills.map(skill => ({ label: skill.skill.name, value: skill.skill.id })),
        }
    )), [data])

    const { data: getSector } = useDataSectors();
    const sectors = useMemo(() => getSector.map(p => ({ label: p.name, value: p.id })), [getSector])

    const { data: getProvince } = useDataProvinces();
    const provinces = useMemo(() => getProvince.map(p => ({ label: p.name, value: p.id })), [getProvince])

    const employementTypes = [
        { label: 'Self employed', value: 'self_employed' },
        { label: 'Employee', value: 'employee' },
        { label: 'Public servant', value: 'public_servant' },
        { label: 'Retiree', value: 'retiree' },
        { label: 'Unemployed', value: 'unemployed' },
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

    const { values: workExperienceData, touched, errors, setValues: setWorkExperienceData, handleSubmit, isSubmitting } = useFormik({
        initialValues: currentData,
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
            if (work.id === i) return { ...work, endDate: new Date(), endDatePresent: checked ? value : '' }
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
                        <Row className="px-md-5">
                            <Col xs="12" className="mb-3 d-flex justify-content-between">
                                <div className="font-xl font-weight-bold text-uppercase">Work Experience</div>
                                {/* <Button color={`${isEdit ? 'danger' : 'primary'}`} onClick={() => {
                                    setIsEdit(!isEdit)
                                    setWorkExperienceData(currentData)
                                }} disabled={isEdit && isSubmitting}> <FontAwesomeIcon icon={`${isEdit ? 'times' : 'edit'}`} /> {isEdit ? 'Cancel' : 'Edit'}</Button> */}
                            </Col>
                            {workExperienceData.map((work, i) => (
                                <Col xs="12" key={i}>
                                    <Card className="shadow-sm">
                                        <CardBody>
                                            {i > 0 &&
                                                <Row className="my-3">
                                                    <Col xs="12">
                                                        <Button color="danger" className="float-right mt-n3 mb-3" onClick={() => handleDeleteWorkExperienceData(work.id)} disabled={!isEdit || isSubmitting}><FontAwesomeIcon icon="trash-alt" /></Button>
                                                    </Col>
                                                </Row>
                                            }
                                            <Row className="my-3">
                                                <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                                    <Label for="job">Job Title</Label>
                                                </Col>
                                                <Col xs="12" md="8" lg="9">
                                                    <Input type="text" name="job" id="job" value={work.job} disabled={!isEdit || isSubmitting} onChange={(e) => handleChangeJob(e, work.id)} placeholder="Job Title Field..." />
                                                    {touched[i]?.job && errors[i]?.job && <small className="text-danger">{errors[i]?.job}</small>}
                                                </Col>
                                            </Row>
                                            <Row className="my-3">
                                                <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                                    <Label for="job">Company Name</Label>
                                                </Col>
                                                <Col xs="12" md="8" lg="9">
                                                    <Input type="text" name="company" id="company" value={work.company} disabled={!isEdit || isSubmitting} onChange={(e) => handleChangeCompany(e, work.id)} placeholder="Company Name Field..." />
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
                                                        isDisabled={!isEdit || isSubmitting}
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
                                                        isDisabled={!isEdit || isSubmitting}
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
                                                        isDisabled={!isEdit || isSubmitting}
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
                                                        disabled={!isEdit || isSubmitting}
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
                                                                    placeholderText="Select a date"
                                                                    wrapperClassName="form-control"
                                                                    disabled={!isEdit || isSubmitting}
                                                                />
                                                            </Col>
                                                        }
                                                        <Col xs="6" md="4" lg="4">
                                                            <InputGroup>
                                                                <InputGroupAddon addonType="prepend">
                                                                    <InputGroupText className="bg-transparent border-0 px-0">
                                                                        <CustomInput type="checkbox" id={`present-${work.id}`} value="present" disabled={!isEdit || isSubmitting} checked={work.endDatePresent} onChange={(e) => handleChangePresent(e, work.id)} />
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
                                                        value={work.skills}
                                                        isDisabled={!isEdit || isSubmitting}
                                                    />
                                                    {touched[i]?.skills && errors[i]?.skills && <small className="text-danger">{errors[i]?.skills}</small>}
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                            ))}
                            {isEdit &&
                                <>
                                    <Col xs="12" className="d-flex justify-content-center">
                                        <Button color="success" className="float-right" onClick={handleAddWorkExperienceData}>Add Work Experience</Button>
                                    </Col>
                                    <Col xs="12" className="d-flex justify-content-end">
                                        <Button color="primary" className="float-right" onClick={handleSubmit} disabled={isSubmitting}>{isSubmitting ? <><Spinner color="light" size="sm" /> Loading...</> : "Save"}</Button>
                                    </Col>
                                </>
                            }
                        </Row>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
}
