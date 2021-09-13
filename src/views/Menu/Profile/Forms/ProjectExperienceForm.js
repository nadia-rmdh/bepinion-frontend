import React, { useCallback, useMemo, useState } from "react"
import { Card, CardBody, Row, Col, Button, Input, Label, InputGroup, InputGroupAddon, InputGroupText, CustomInput, Spinner } from "reactstrap";
import Select from 'react-select';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Datepicker from "react-datepicker";
import TextareaAutosize from "react-textarea-autosize";
import { useFormik } from "formik";
import * as Yup from 'yup';
import useDataSectors from "../../../../hooks/useDataSectors";
import useDataProvinces from "../../../../hooks/useDataProvinces";
import useDataSkills from "../../../../hooks/useDataSkills";
import useDataCountries from "../../../../hooks/useDataCountries";

export default (props) => {
    const data = props.data.projectExperience;
    const [isEdit, setIsEdit] = useState(false);
    const currentData = useMemo(() => data.map((v) => (
        {
            id: v.id,
            projectName: v.projectName,
            client: v.clientName,
            projectRole: v.projectRole,
            sector: { label: v.sector.name, value: v.sector.id },
            province: { label: v.province.name, value: v.province.id },
            country: { label: v.country.name, value: v.country.id },
            startDate: new Date(v.startDate),
            endDate: new Date(v.endDate),
            description: v.description,
            skills: v.skills.map(skill => ({ label: skill.skill.name, value: skill.skill.id })),
        }
    )), [data]);

    const [hasProjectExperience, setHasProjectExperience] = useState(data.length > 0 ? true : false);

    const { data: getSector } = useDataSectors();
    const sectors = useMemo(() => getSector.map(p => ({ label: p.name, value: p.id })), [getSector])

    const { data: getProvince } = useDataProvinces();
    const provinces = useMemo(() => getProvince.map(p => ({ label: p.name, value: p.id })), [getProvince])

    const { data: getSkills } = useDataSkills();
    const skills = useMemo(() => getSkills.map(p => ({ label: p.name, value: p.id })), [getSkills])

    const { data: getCountries } = useDataCountries();
    const countries = useMemo(() => getCountries.map(p => ({ label: p.name, value: p.id })), [getCountries])

    const ValidationFormSchema = () => {
        if (!hasProjectExperience) return Yup.array().of(
            Yup.object().shape({
                projectName: Yup.string().label('Project Name'),
            })
        )
        return Yup.array().of(
            Yup.object().shape({
                projectName: Yup.string().required().label('Project Name'),
                client: Yup.string().required().label('Client Name'),
                projectRole: Yup.string().required().label('Project Role'),
                sector: Yup.string().required().label('Sector'),
                province: Yup.string().required().label('province'),
                startDate: Yup.string().required().label('Start Date'),
                endDate: Yup.string().required().label('End Date'),
                description: Yup.string().required().label('Description'),
                skills: Yup.string().required().label('Skills'),
            })
        )
    }

    const { values: projectExperienceData, touched, errors, setValues: setProjectExperienceData, handleSubmit, isSubmitting } = useFormik({
        initialValues: currentData,
        validationSchema: ValidationFormSchema,
        onSubmit: (values, { setSubmitting, setErrors }) => {
            setSubmitting(true)
            props.onSubmitForm(values)
            props.nextStep();
        }
    })

    const handleChangeSector = useCallback((e, i) => {
        setProjectExperienceData(old => [...old].map(project => {
            if (project.id === i) return { ...project, sector: e }
            return { ...project };
        }))
    }, [setProjectExperienceData])

    const handleChangeProvince = useCallback((e, i) => {
        setProjectExperienceData(old => [...old].map(project => {
            if (project.id === i) return { ...project, province: e }
            return { ...project };
        }))
    }, [setProjectExperienceData])

    const handleChangeCountry = useCallback((e, i) => {
        setProjectExperienceData(old => [...old].map(project => {
            if (project.id === i) return { ...project, country: e }
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
        setProjectExperienceData(old => ([...old, { id: old[old.length - 1].id + 1, projectName: '', client: '', projectRole: '', sector: '', province: '', startDate: '', endDate: '', description: '', skills: [], }]))
    }, [setProjectExperienceData])

    const handleDeleteprojectExperienceData = useCallback((i) => {
        setProjectExperienceData(old => ([...old].filter(project => project.id !== i)))
    }, [setProjectExperienceData])

    return (
        <Row>
            <Col xs="12">
                <Card className="shadow-sm">
                    <CardBody>
                        <Row className="px-5">
                            <Col xs="12" className="mb-3 d-flex justify-content-between">
                                <div className="font-xl font-weight-bold text-uppercase">Project Experience</div>
                                <Button color={`${isEdit ? 'danger' : 'primary'}`} onClick={() => {
                                    setIsEdit(!isEdit)
                                    setProjectExperienceData(currentData)
                                }} disabled={isEdit && isSubmitting} > <FontAwesomeIcon icon={`${isEdit ? 'times' : 'edit'}`} /> {isEdit ? 'Cancel' : 'Edit'}</Button>
                            </Col>
                            <Col xs="12" className="mb-3">
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText className="bg-transparent border-0 px-0">
                                            <CustomInput type="checkbox" id="hasProjectExperience" value="hasProjectExperience" checked={hasProjectExperience} onChange={(e) => setHasProjectExperience(e.target.checked)} disabled={!isEdit || isSubmitting} />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Label for="hasProjectExperience" className="d-flex bg-transparent m-0 align-items-center">
                                        Do you have project experience?
                                    </Label>
                                </InputGroup>
                            </Col>
                            {hasProjectExperience &&
                                <>
                                    {projectExperienceData.map((project, i) => (
                                        <Col xs="12" key={i}>
                                            <Card className="shadow-sm">
                                                <CardBody>
                                                    {i > 0 &&
                                                        <Row className="my-3">
                                                            <Col xs="12">
                                                                <Button color="danger" className="float-right mt-n3 mb-3" onClick={() => handleDeleteprojectExperienceData(project.id)} disabled={!isEdit || isSubmitting}><FontAwesomeIcon icon="trash-alt" /></Button>
                                                            </Col>
                                                        </Row>
                                                    }
                                                    <Row className="my-3">
                                                        <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                                            <Label for="projectName">Project Name</Label>
                                                        </Col>
                                                        <Col xs="12" md="8" lg="9">
                                                            <Input type="text" name="projectName" id="projectName" disabled={!isEdit || isSubmitting} value={project.projectName} onChange={(e) => handleChangeProjectName(e, project.id)} placeholder="Job Title Field..." />
                                                            {touched[i]?.projectName && errors[i]?.projectName && <small className="text-danger">{errors[i]?.projectName}</small>}
                                                        </Col>
                                                    </Row>
                                                    <Row className="my-3">
                                                        <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                                            <Label for="client">Client Name</Label>
                                                        </Col>
                                                        <Col xs="12" md="8" lg="9">
                                                            <Input type="text" name="client" id="client" disabled={!isEdit || isSubmitting} value={project.client} onChange={(e) => handleChangeClient(e, project.id)} placeholder="Client Name Field..." />
                                                            {touched[i]?.client && errors[i]?.client && <small className="text-danger">{errors[i]?.client}</small>}
                                                        </Col>
                                                    </Row>
                                                    <Row className="my-3">
                                                        <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                                            <Label for="projectRole">Project Role</Label>
                                                        </Col>
                                                        <Col xs="12" md="8" lg="9">
                                                            <Input type="text" name="projectRole" id="projectRole" disabled={!isEdit || isSubmitting} value={project.projectRole} onChange={(e) => handleChangeProjectRole(e, project.id)} placeholder="Project Role Field..." />
                                                            {touched[i]?.projectRole && errors[i]?.projectRole && <small className="text-danger">{errors[i]?.projectRole}</small>}
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
                                                                onChange={(e) => handleChangeSector(e, project.id)}
                                                                components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                                                value={project.sector}
                                                                isDisabled={!isEdit || isSubmitting}
                                                            />
                                                            {touched[i]?.sector && errors[i]?.sector && <small className="text-danger">{errors[i]?.sector}</small>}
                                                        </Col>
                                                    </Row>
                                                    <Row className="my-3">
                                                        <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                                            <Label for="province">Province</Label>
                                                        </Col>
                                                        <Col xs="12" md="8" lg="9">
                                                            <Select
                                                                options={provinces}
                                                                placeholder="Choose a Province..."
                                                                onChange={(e) => handleChangeProvince(e, project.id)}
                                                                components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                                                value={project.province}
                                                                isDisabled={!isEdit || isSubmitting}
                                                            />
                                                            {touched[i]?.province && errors[i]?.province && <small className="text-danger">{errors[i]?.province}</small>}
                                                        </Col>
                                                    </Row>
                                                    <Row className="my-3">
                                                        <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                                            <Label for="countries">Country</Label>
                                                        </Col>
                                                        <Col xs="12" md="8" lg="9">
                                                            <Select
                                                                options={countries}
                                                                placeholder="Choose a Country..."
                                                                onChange={(e) => handleChangeCountry(e, project.id)}
                                                                components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                                                value={project.country}
                                                                isDisabled={!isEdit || isSubmitting}
                                                            />
                                                            {touched[i]?.country && errors[i]?.country && <small className="text-danger">{errors[i]?.country}</small>}
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
                                                                onChange={(e) => handleChangeStartDate(e, project.id)}
                                                                showMonthYearPicker
                                                                showFullMonthYearPicker
                                                                showFourColumnMonthYearPicker
                                                                dateFormat="MMMM yyyy"
                                                                maxDate={new Date()}
                                                                placeholderText="Select a date"
                                                                className="form-control"
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
                                                            <Datepicker
                                                                required
                                                                name="endDate"
                                                                selected={project.endDate}
                                                                onChange={(e) => handleChangeEndDate(e, project.id)}
                                                                showMonthYearPicker
                                                                showFullMonthYearPicker
                                                                showFourColumnMonthYearPicker
                                                                dateFormat="MMMM yyyy"
                                                                minDate={project.startDate}
                                                                maxDate={new Date()}
                                                                placeholderText="Select a date"
                                                                className="form-control"
                                                                disabled={!isEdit || isSubmitting}
                                                            />
                                                            {touched[i]?.endDate && errors[i]?.endDate && <small className="text-danger">{errors[i]?.endDate}</small>}
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
                                                                onChange={(e) => handleChangeDescription(e, project.id)}
                                                                disabled={!isEdit || isSubmitting}
                                                            />
                                                            {touched[i]?.description && errors[i]?.description && <small className="text-danger">{errors[i]?.description}</small>}
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
                                                                onChange={(e) => handleChangeSkills(e, project.id)}
                                                                components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                                                value={project.skills}
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
                                                <Button color="success" className="float-right rounded-circle shadow-sm" onClick={handleAddprojectExperienceData}><FontAwesomeIcon icon="plus" /></Button>
                                            </Col>
                                            <Col xs="12" className="d-flex justify-content-end">
                                                <Button color="primary" className="float-right" onClick={handleSubmit} disabled={isSubmitting}>{isSubmitting ? <><Spinner color="light" size="sm" /> Loading...</> : "Save"}</Button>
                                            </Col>
                                        </>
                                    }
                                </>
                            }
                        </Row>
                    </CardBody>
                </Card>
            </Col>
        </Row >
    );
}
