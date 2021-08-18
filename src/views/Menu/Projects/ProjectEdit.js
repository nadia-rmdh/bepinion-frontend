import React, { useCallback, useState } from "react"
import { Card, CardBody, Row, Col, Button, Label, Input, InputGroup, InputGroupAddon, InputGroupText, CustomInput, ModalBody, Modal } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from 'yup';
import Select from 'react-select'
import TextareaAutosize from "react-textarea-autosize";
import degrees from '../../DataDummy/DegreeDummy'
import skills from '../../DataDummy/SkillsDummy'
import educations from '../../DataDummy/EducationDummy'
import DateRangePicker from "react-bootstrap-daterangepicker";


export default ({ data }) => {
    const [modalSubmitForm, setModalSubmitForm] = useState(false);

    const ValidationFormSchema = () => {
        return Yup.object().shape({
            projectName: Yup.string().required().label('Business Name'),
            projectOwnerVisibility: Yup.boolean().oneOf([true], "You must choose one for display name or not"),
            sector: Yup.string().required().label('Sector'),
            description: Yup.string().required().label('Description'),
            duration: Yup.number().min(1, 'Min value 1.').label('Duration'),
            budget: Yup.number().min(1, 'Min value 1.').label('budget'),
            budgetVisibility: Yup.boolean().oneOf([true], "You must choose one for display budget or not"),
            completionDate: Yup.string().required().label('Completion Date'),
            closingDate: Yup.string().required().label('Tender Closing Date'),
            skills: Yup.array().min(1).max(5).label('Skills'),
            yearExperience: Yup.number().min(1, 'Min value 1.').label('Minimum years of experience'),
            degree: Yup.string().required().label('Degree'),
            education: Yup.string().required().label('Field of study'),
        })
    }

    const { values, touched, errors, setValues, handleSubmit } = useFormik({
        initialValues: {
            projectName: '',
            projectOwnerVisibility: true,
            sector: '',
            description: '',
            duration: 0,
            budget: 0,
            budgetVisibility: true,
            completionDate: '',
            closingDate: '',
            skills: [],
            yearExperience: 0,
            degree: '',
            education: '',
        },
        validationSchema: ValidationFormSchema,
        onSubmit: (values, { setSubmitting, setErrors }) => {
            setSubmitting(true)
        }
    })

    return (
        <div>
            <Row>
                <Col xs="12"><ProjectInformation projectInformationData={values} setProjectInformationData={setValues} touched={touched} errors={errors} /></Col>
                <Col xs="12"><ProjectRequirements projectRequirementsData={values} setProjectRequirementsData={setValues} touched={touched} errors={errors} /></Col>
                <Col xs="12" className="d-flex justify-content-end">
                    <Button color="secondary" className="mr-2">Cancel</Button>
                    <Button color="primary" onClick={() => setModalSubmitForm(!modalSubmitForm)}>
                        Create
                    </Button>
                </Col>
            </Row>
            <Modal isOpen={modalSubmitForm} centered toggle={() => setModalSubmitForm(!modalSubmitForm)}>
                <ModalBody className="p-5">
                    <Row>
                        <Col xs="12" className="mb-5">
                            Are you sure with your registration data?
                        </Col>
                        <Col xs="12" className="d-flex justify-content-end">
                            <Button color="secondary" className="mr-2" toggle={() => setModalSubmitForm(!modalSubmitForm)}>Cancel</Button>
                            <Button color="primary" onClick={handleSubmit}>Create</Button>
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>
        </div>
    );
}

const ProjectInformation = ({ projectInformationData, setProjectInformationData, touched, errors }) => {
    const sectors = [
        { label: 'Sector 1', value: 'Sector 1' },
        { label: 'Sector 2', value: 'Sector 2' },
        { label: 'Sector 3', value: 'Sector 3' },
        { label: 'Sector 4', value: 'Sector 4' },
    ]

    const handleChangeProjectName = useCallback((e) => {
        const { value } = e.target;
        setProjectInformationData(old => ({ ...old, projectName: value }))
    }, [setProjectInformationData])

    const handleChangeProjectOwnerVisibility = useCallback((e) => {
        const { value, checked } = e.target;
        setProjectInformationData(old => ({ ...old, projectOwnerVisibility: checked ? value : '' }))
    }, [setProjectInformationData])

    const handleChangeSector = useCallback((e) => {
        setProjectInformationData(old => ({ ...old, sector: e }))
    }, [setProjectInformationData])

    const handleChangeDescription = useCallback((e) => {
        const { value } = e.target;
        setProjectInformationData(old => ({ ...old, description: value }))
    }, [setProjectInformationData])

    const handleChangeDuration = useCallback((e) => {
        const { value } = e.target;
        setProjectInformationData(old => ({ ...old, duration: value }))
    }, [setProjectInformationData])

    const handleChangeBudget = useCallback((e) => {
        const { value } = e.target;
        setProjectInformationData(old => ({ ...old, budget: value }))
    }, [setProjectInformationData])

    const handleChangeBudgetVisibility = useCallback((e) => {
        const { value } = e.target;
        setProjectInformationData(old => ({ ...old, budgetVisibility: value }))
    }, [setProjectInformationData])

    const handleChangeCompletionDate = useCallback((value) => {
        setProjectInformationData(old => ({ ...old, completionDate: value }))
    }, [setProjectInformationData])

    const handleChangeClosingDate = useCallback((value) => {
        setProjectInformationData(old => ({ ...old, closingDate: value }))
    }, [setProjectInformationData])

    return (
        <Card className="shadow-sm">
            <CardBody>
                <Row className="px-5">
                    <Col xs="12" className="mb-3">
                        <div className="font-xl font-weight-bold">REGISTRANT INFORMATION</div>
                    </Col>
                    <Col xs="12">
                        <Row className="my-3">
                            <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                <Label for="projectName">Project Name</Label>
                            </Col>
                            <Col xs="12" md="8" lg="9">
                                <Input type="text" name="projectName" id="projectName" value={projectInformationData.projectName} onChange={(e) => handleChangeProjectName(e)} placeholder="Business Entity Field..." />
                                {touched.projectName && errors.projectName && <small className="text-danger">{errors.projectName}</small>}
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                <Label for="projectOwnerVisibility">Project Owner Visibility</Label>
                            </Col>
                            <Col xs="12" md="8" lg="9">
                                <div className="d-flex">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText className="bg-transparent border-0 px-0">
                                                <CustomInput type="radio" id="displayed" value="displayed" checked={projectInformationData.projectOwnerVisibility === "displayed" ? true : false} onChange={(e) => handleChangeProjectOwnerVisibility(e)} />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Label for="displayed" className="d-flex bg-transparent p-1 m-0 align-items-center">
                                            Displayed
                                        </Label>
                                    </InputGroup>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText className="bg-transparent border-0 px-0">
                                                <CustomInput type="radio" id="undisclosed" value="undisclosed" checked={projectInformationData.projectOwnerVisibility === "undisclosed" ? true : false} onChange={(e) => handleChangeProjectOwnerVisibility(e)} />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Label for="undisclosed" className="d-flex bg-transparent p-1 m-0 align-items-center">
                                            Undisclosed
                                        </Label>
                                    </InputGroup>
                                </div>
                                {touched.projectOwnerVisibility && errors.projectOwnerVisibility && <small className="text-danger">{errors.projectOwnerVisibility}</small>}
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                <Label for="sector">Sector</Label>
                            </Col>
                            <Col xs="12" md="8" lg="9">
                                <Select
                                    options={sectors}
                                    placeholder="Choose a socter..."
                                    value={projectInformationData.sector}
                                    onChange={(e) => handleChangeSector(e)}
                                    components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                />
                                {touched.sector && errors.sector && <small className="text-danger">{errors.sector}</small>}
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
                                    value={projectInformationData.description}
                                    onChange={(e) => handleChangeDescription(e)}
                                />
                                {touched.description && errors.description && <small className="text-danger">{errors.description}</small>}
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                <Label for="duration">Duration</Label>
                            </Col>
                            <Col xs="12" md="8" lg="9">
                                <Input type="number" name="duration" id="duration" value={projectInformationData.duration} onChange={(e) => handleChangeDuration(e)} placeholder="Duration Field..." />
                                {touched.duration && errors.duration && <small className="text-danger">{errors.duration}</small>}
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                <Label for="budget">Budget</Label>
                            </Col>
                            <Col xs="12" md="8" lg="9">
                                <Input type="number" name="budget" id="budget" value={projectInformationData.budget} onChange={(e) => handleChangeBudget(e)} placeholder="Budget Field..." />
                                {touched.budget && errors.budget && <small className="text-danger">{errors.budget}</small>}
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                <Label for="budgetVisibility">Budget Visibility</Label>
                            </Col>
                            <Col xs="12" md="8" lg="9">
                                <div className="d-flex">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText className="bg-transparent border-0 px-0">
                                                <CustomInput type="radio" id="displayed" value="displayed" checked={projectInformationData.budgetVisibility === "displayed" ? true : false} onChange={(e) => handleChangeBudgetVisibility(e)} />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Label for="displayed" className="d-flex bg-transparent p-1 m-0 align-items-center">
                                            Displayed
                                        </Label>
                                    </InputGroup>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText className="bg-transparent border-0 px-0">
                                                <CustomInput type="radio" id="undisclosed" value="undisclosed" checked={projectInformationData.budgetVisibility === "undisclosed" ? true : false} onChange={(e) => handleChangeBudgetVisibility(e)} />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Label for="undisclosed" className="d-flex bg-transparent p-1 m-0 align-items-center">
                                            Undisclosed
                                        </Label>
                                    </InputGroup>
                                </div>
                                {touched.budgetVisibility && errors.budgetVisibility && <small className="text-danger">{errors.budgetVisibility}</small>}
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                <Label for="completionDate">Completion Date</Label>
                            </Col>
                            <Col xs="12" md="8" lg="9">
                                <DateRangePicker
                                    initialSettings={{
                                        singleDatePicker: true,
                                        showDropdowns: true,
                                        startDate: new Date(),
                                        maxDate: new Date(),
                                        autoApply: true,
                                    }}
                                    onApply={(e, p) => handleChangeCompletionDate(p.startDate)}
                                >
                                    <div id="reportrange" style={{ background: '#fff', cursor: 'pointer', padding: '5px 10px', border: '1px solid #ccc', width: '100%' }}>
                                        <i className="fa fa-calendar mr-2"></i><span>{projectInformationData.completionDate ? projectInformationData.completionDate.format('DD/MM/YYYY') : 'DD/MMMM/YYYY'}</span> <i className="fa fa-caret-down float-right"></i>
                                    </div>
                                </DateRangePicker>
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                <Label for="closingDate">Tender Closing Date</Label>
                            </Col>
                            <Col xs="12" md="8" lg="9">
                                <DateRangePicker
                                    initialSettings={{
                                        singleDatePicker: true,
                                        showDropdowns: true,
                                        startDate: new Date(),
                                        maxDate: new Date(),
                                        autoApply: true,
                                    }}
                                    onApply={(e, p) => handleChangeClosingDate(p.startDate)}
                                >
                                    <div id="reportrange" style={{ background: '#fff', cursor: 'pointer', padding: '5px 10px', border: '1px solid #ccc', width: '100%' }}>
                                        <i className="fa fa-calendar mr-2"></i><span>{projectInformationData.closingDate ? projectInformationData.closingDate.format('DD/MM/YYYY') : 'DD/MMMM/YYYY'}</span> <i className="fa fa-caret-down float-right"></i>
                                    </div>
                                </DateRangePicker>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
}

const ProjectRequirements = ({ projectRequirementsData, setProjectRequirementsData, touched, errors }) => {

    const handleChangeSkills = useCallback((e) => {
        setProjectRequirementsData(old => ({ ...old, skills: e ?? [] }))
    }, [setProjectRequirementsData])

    const handleChangeDegree = useCallback((e) => {
        setProjectRequirementsData(old => ({ ...old, sector: e ?? [] }))
    }, [setProjectRequirementsData])

    const handleChangeYearExperience = useCallback((e) => {
        const { value } = e.target;
        setProjectRequirementsData(old => ({ ...old, yearExperience: value }))
    }, [setProjectRequirementsData])

    const handleChangeEducation = useCallback((e) => {
        setProjectRequirementsData(old => ({ ...old, education: e ?? [] }))
    }, [setProjectRequirementsData])

    return (
        <Card className="shadow-sm">
            <CardBody>
                <Row className="px-5">
                    <Col xs="12" className="mb-3">
                        <div className="font-xl font-weight-bold">REGISTRANT INFORMATION</div>
                    </Col>
                    <Col xs="12">
                        <Row className="my-3">
                            <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                <Label for="skills">Skiils</Label>
                            </Col>
                            <Col xs="12" md="8" lg="9">
                                <Select
                                    options={skills}
                                    placeholder="Choose a socter..."
                                    value={projectRequirementsData.skills}
                                    onChange={(e) => handleChangeSkills(e)}
                                    components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                />
                                {touched.skills && errors.skills && <small className="text-danger">{errors.skills}</small>}
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                <Label for="yearExperience">Minimum years of experience</Label>
                            </Col>
                            <Col xs="12" md="8" lg="9">
                                <Input type="number" name="yearExperience" id="yearExperience" value={projectRequirementsData.yearExperience} onChange={(e) => handleChangeYearExperience(e)} placeholder="Budget Field..." />
                                {touched.yearExperience && errors.yearExperience && <small className="text-danger">{errors.yearExperience}</small>}
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                <Label for="degree">Degree</Label>
                            </Col>
                            <Col xs="12" md="8" lg="9">
                                <Select
                                    options={degrees}
                                    placeholder="Choose a socter..."
                                    value={projectRequirementsData.degree}
                                    onChange={(e) => handleChangeDegree(e)}
                                    components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                />
                                {touched.degree && errors.degree && <small className="text-danger">{errors.degree}</small>}
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                <Label for="education">Field of study</Label>
                            </Col>
                            <Col xs="12" md="8" lg="9">
                                <Select
                                    options={educations}
                                    placeholder="Choose a socter..."
                                    value={projectRequirementsData.education}
                                    onChange={(e) => handleChangeEducation(e)}
                                    components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                />
                                {touched.education && errors.education && <small className="text-danger">{errors.education}</small>}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
}
