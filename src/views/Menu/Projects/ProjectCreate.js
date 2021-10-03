import React, { useCallback, useMemo, useState } from "react"
import { Card, CardBody, Row, Col, Button, Label, Input, InputGroup, InputGroupAddon, InputGroupText, CustomInput, ModalBody, Modal, UncontrolledTooltip } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from 'yup';
import Select from 'react-select'
import TextareaAutosize from "react-textarea-autosize";
import DateRangePicker from "react-bootstrap-daterangepicker";
import { toast } from "react-toastify";
import request from "../../../utils/request";
import useDataEducationDegrees from "../../../hooks/useDataEducationDegrees";
import useDataEducationFields from "../../../hooks/useDataEducationFields";
import useDataSectors from "../../../hooks/useDataSectors";
import useDataSkills from "../../../hooks/useDataSkills";
import { useHistory } from "react-router-dom";
import { convertNumberCurrencies } from "../../../utils/formatter";
import { ArcherContainer, ArcherElement } from 'react-archer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment'


function ProjectCreate(props) {
    const history = useHistory();
    const [modalSubmitForm, setModalSubmitForm] = useState(false);

    const ValidationFormSchema = () => {
        return Yup.object().shape({
            projectName: Yup.string().required().label('Business Name'),
            projectOwnerVisibility: Yup.string().required().label('Project Owner Visibility'),
            sectors: Yup.string().required().label('Sector'),
            description: Yup.string().required().label('Description'),
            duration: Yup.number().min(1, 'Min value 1.').label('Duration'),
            budget: Yup.number().min(1, 'Min value 1.').label('budget'),
            budgetVisibility: Yup.string().required().label('Budget Visibility'),
            completionDate: Yup.string().required().label('Completion Date'),
            closingDate: Yup.string().required().label('Tender Closing Date'),
            meetingDate: Yup.string().required().label('Meeting Date'),
            skills: Yup.string().required().label('Skills Requirements'),
            yearExperience: Yup.number().min(1, 'Min value 1.').label('Year Experience'),
            degree: Yup.string().required().label('Degree'),
            education: Yup.string().required().label('Education Field'),
        })
    }

    const { values, touched, errors, setValues, handleSubmit, isSubmitting } = useFormik({
        initialValues: {
            projectName: '',
            projectOwnerVisibility: '',
            sectors: [],
            description: '',
            duration: 0,
            budget: 0,
            budgetVisibility: '',
            completionDate: '',
            closingDate: '',
            meetingDate: '',
            skills: [],
            yearExperience: 0,
            degree: '',
            education: '',
        },
        validationSchema: ValidationFormSchema,
        onSubmit: (values, { setSubmitting, setErrors }) => {
            setSubmitting(true)

            request.post(`v1/project`, {
                name: values.projectName,
                isOwnerDisplayed: values.projectOwnerVisibility === 'displayed' ? true : false,
                sectorIds: values.sectors.map((sector) => sector.value),
                description: values.description,
                duration: values.duration,
                budget: values.budget,
                isBudgetVisible: values.budgetVisibility === 'displayed' ? true : false,
                completeDate: values.completionDate,
                closingDate: values.closingDate,
                idEducationDegree: values.degree.value,
                idEducationField: values.education.value,
                minYearExp: values.yearExperience,
                requirementSkills: values.skills.map((skill) => ({ idSkill: skill.value })),
                meetingDetails: {
                    link: "",
                    date: values.meetingDate
                },
            })
                .then(res => {
                    toast.success('Create Project Successfully')
                    history.push('/')
                })
                .catch(err => {
                    toast.error('Create project failed.');
                })
                .finally(() => {
                    setModalSubmitForm(!modalSubmitForm)
                    setSubmitting(false)
                })
        }
    })

    return (
        <div>
            <Row>
                <Col xs="12"><ProjectInformation projectInformationData={values} setProjectInformationData={setValues} touched={touched} errors={errors} /></Col>
                <Col xs="12"><ProjectRequirements projectRequirementsData={values} setProjectRequirementsData={setValues} touched={touched} errors={errors} /></Col>
                <Col xs="12"><ProjectDetails projectDetailsData={values} setProjectDetailsData={setValues} touched={touched} errors={errors} /></Col>
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
                            Are you sure with this data?
                        </Col>
                        <Col xs="12" className="d-flex justify-content-end">
                            <Button color="secondary" className="mr-2" onClick={() => setModalSubmitForm(!modalSubmitForm)}>Cancel</Button>
                            <Button color="primary" disabled={isSubmitting} onClick={handleSubmit}>Create</Button>
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>
        </div>
    );
}

const ProjectInformation = ({ projectInformationData, setProjectInformationData, touched, errors }) => {
    const { data: getSector } = useDataSectors();
    const sectors = useMemo(() => getSector.map(p => ({ label: p.name, value: p.id })), [getSector])

    const handleChangeProjectName = useCallback((e) => {
        const { value } = e.target;
        setProjectInformationData(old => ({ ...old, projectName: value }))
    }, [setProjectInformationData])

    const handleChangeProjectOwnerVisibility = useCallback((e) => {
        const { value, checked } = e.target;
        setProjectInformationData(old => ({ ...old, projectOwnerVisibility: checked ? value : '' }))
    }, [setProjectInformationData])

    const handleChangeSector = useCallback((e) => {
        setProjectInformationData(old => ({ ...old, sectors: e ?? [] }))
    }, [setProjectInformationData])

    const handleChangeDescription = useCallback((e) => {
        const { value } = e.target;
        setProjectInformationData(old => ({ ...old, description: value }))
    }, [setProjectInformationData])

    return (
        <Card className="shadow-sm">
            <CardBody>
                <Row className="px-5">
                    <Col xs="12" className="mb-3">
                        <div className="font-xl font-weight-bold">PROJECT INFORMATION</div>
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
                                    closeMenuOnSelect={false}
                                    isClearable
                                    isMulti
                                    options={sectors}
                                    placeholder="Choose some sectors..."
                                    value={projectInformationData.sectors}
                                    onChange={(e) => handleChangeSector(e)}
                                    components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                    isOptionDisabled={(option) => projectInformationData.sectors.length >= 3}
                                />
                                {touched.sector && errors.sector && <small className="text-danger">{errors.sector}</small>}
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col xs="12" className="d-flex align-items-center">
                                <Label for="description">Description</Label>
                            </Col>
                            <Col xs="12">
                                <div className="position-relative">
                                    <FontAwesomeIcon icon="question-circle" color="#20a8d8" id="UncontrolledTooltipExample" size="lg" className="position-absolute" style={{ right: 10, top: 10 }} />
                                    <UncontrolledTooltip placement="bottom" target="UncontrolledTooltipExample">
                                        The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                                        Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form,
                                        accompanied by English versions from the 1914 translation by H. Rackham.
                                    </UncontrolledTooltip>
                                    <TextareaAutosize
                                        minRows={5}
                                        name="description"
                                        id="description"
                                        className="form-control"
                                        placeholder="Description Field..."
                                        value={projectInformationData.description}
                                        onChange={(e) => handleChangeDescription(e)}
                                    />
                                    {touched.description && errors.description && <small className="text-danger">{errors.description}</small>}
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
}

const ProjectRequirements = ({ projectRequirementsData, setProjectRequirementsData, touched, errors }) => {
    const { data: getSkills } = useDataSkills();
    const skills = useMemo(() => getSkills.map(p => ({ label: p.name, value: p.id })), [getSkills])

    const { data: getDegree } = useDataEducationDegrees();
    const degrees = useMemo(() => getDegree.map(p => ({ label: p.name, value: p.id })), [getDegree])

    const { data: getEduField } = useDataEducationFields();
    const educations = useMemo(() => getEduField.map(p => ({ label: p.name, value: p.id })), [getEduField])

    const handleChangeSkills = useCallback((e) => {
        setProjectRequirementsData(old => ({ ...old, skills: e ?? [] }))
    }, [setProjectRequirementsData])

    const handleChangeDegree = useCallback((e) => {
        setProjectRequirementsData(old => ({ ...old, degree: e ?? [] }))
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
                        <div className="font-xl font-weight-bold">REQUIREMENTS</div>
                    </Col>
                    <Col xs="12">
                        <Row className="my-3">
                            <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                <Label for="skills">Skiils</Label>
                            </Col>
                            <Col xs="12" md="8" lg="9">
                                <Select
                                    closeMenuOnSelect={false}
                                    options={skills}
                                    isClearable
                                    isMulti
                                    placeholder="Choose some skills..."
                                    onChange={(e) => handleChangeSkills(e)}
                                    components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                    value={projectRequirementsData.skills} />
                                {touched.skills && errors.skills && <small className="text-danger">{errors.skills}</small>}
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                <Label for="yearExperience">Minimum years of experience</Label>
                            </Col>
                            <Col xs="12" md="8" lg="9">
                                <Input type="number" name="yearExperience" id="yearExperience" value={projectRequirementsData.yearExperience} onChange={(e) => handleChangeYearExperience(e)} placeholder="Budget Field..."
                                    onWheel={(e) => { e.target.blur() }}
                                />
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
                                    placeholder="Choose a degree..."
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
                                    placeholder="Choose a education field..."
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

const ProjectDetails = ({ projectDetailsData, setProjectDetailsData, touched, errors }) => {
    const handleChangeDuration = useCallback((e) => {
        const { value } = e.target;
        setProjectDetailsData(old => ({ ...old, duration: value }))
    }, [setProjectDetailsData])

    const handleChangeBudget = useCallback((e) => {
        const { value } = e.target;
        setProjectDetailsData(old => ({ ...old, budget: value }))
    }, [setProjectDetailsData])

    const handleChangeBudgetVisibility = useCallback((e) => {
        const { value } = e.target;
        setProjectDetailsData(old => ({ ...old, budgetVisibility: value }))
    }, [setProjectDetailsData])

    return (

        <Card className="shadow-sm">
            <CardBody>
                <Row className="px-5">
                    <Col xs="12" className="mb-3">
                        <div className="font-xl font-weight-bold">PROJECT DETAILS</div>
                    </Col>
                    <Col xs="12">
                        <Row className="my-3">
                            <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                <Label for="duration">Meeting Duration</Label>
                            </Col>
                            <Col xs="12" md="8" lg="9">
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <Input type="number" name="duration" id="duration" value={projectDetailsData.duration} onChange={(e) => handleChangeDuration(e)} placeholder="Duration Field..."
                                            onWheel={(e) => { e.target.blur() }}
                                        />
                                        <InputGroupText>
                                            hours
                                        </InputGroupText>
                                    </InputGroupAddon>
                                </InputGroup>
                                {touched.duration && errors.duration && <small className="text-danger">{errors.duration}</small>}
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                <Label for="budget">Budget</Label>
                            </Col>
                            <Col xs="12" md="8" lg="9">
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            IDR
                                        </InputGroupText>
                                        <Input type="number" name="budget" id="budget" value={projectDetailsData.budget} onChange={(e) => handleChangeBudget(e)} placeholder="Budget Field..."
                                            onWheel={(e) => { e.target.blur() }}
                                        />
                                    </InputGroupAddon>
                                    <div className="d-flex align-items-center ml-3 text-muted">
                                        Estimated cost per hour IDR {convertNumberCurrencies(projectDetailsData.budget)}
                                    </div>
                                </InputGroup>
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
                                                <CustomInput type="radio" id="displayedbudget" value="displayed" checked={projectDetailsData.budgetVisibility === "displayed" ? true : false} onChange={(e) => handleChangeBudgetVisibility(e)} />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Label for="displayedbudget" className="d-flex bg-transparent p-1 m-0 align-items-center">
                                            Displayed
                                        </Label>
                                    </InputGroup>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText className="bg-transparent border-0 px-0">
                                                <CustomInput type="radio" id="undisclosedbudget" value="undisclosed" checked={projectDetailsData.budgetVisibility === "undisclosed" ? true : false} onChange={(e) => handleChangeBudgetVisibility(e)} />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Label for="undisclosedbudget" className="d-flex bg-transparent p-1 m-0 align-items-center">
                                            Undisclosed
                                        </Label>
                                    </InputGroup>
                                </div>
                                {touched.budgetVisibility && errors.budgetVisibility && <small className="text-danger">{errors.budgetVisibility}</small>}
                            </Col>
                        </Row>
                    </Col>
                    <Col xs="12" className="mt-5"><ProjectTimelines projectTimelinesData={projectDetailsData} setProjectTimelinesData={setProjectDetailsData} touched={touched} errors={errors} /></Col>
                </Row>
            </CardBody>
        </Card>
    )
}

const ProjectTimelines = ({ projectTimelinesData, setProjectTimelinesData, touched, errors }) => {
    const handleChangeClosingDate = useCallback((value) => {
        setProjectTimelinesData(old => ({ ...old, closingDate: value }))
    }, [setProjectTimelinesData])

    const handleChangeMeetingDate = useCallback((value) => {
        setProjectTimelinesData(old => ({ ...old, meetingDate: value, completionDate: moment(value).add(7, 'days') }))
    }, [setProjectTimelinesData])
    return (
        <Row>
            <Col xs="12">
                <ArcherContainer>
                    <div className="text-center d-flex justify-content-between">
                        <div>
                            <div>
                                Create Project
                            </div>
                            <ArcherElement
                                id={`step-1-1`}
                                relations={[]}
                            >
                                <div
                                    className={`mx-auto round-100 text-center d-flex justify-content-center align-items-center`}
                                    style={{ backgroundColor: '#000000', border: 'solid 1px #000000', width: '10px', height: '10px' }}
                                >
                                </div>
                            </ArcherElement>
                            <div className="mt-2" style={{ height: '26px' }}>
                            </div>
                            <ArcherElement
                                id={`step-1`}
                                relations={[
                                    {
                                        targetId: `step-1-1`,
                                        targetAnchor: 'middle',
                                        sourceAnchor: 'middle',
                                        style: { strokeColor: '#000000', strokeWidth: 2, endMarker: false },
                                    },
                                    {
                                        targetId: `step-2`,
                                        targetAnchor: 'middle',
                                        sourceAnchor: 'middle',
                                        style: { strokeColor: '#20a8d7', strokeWidth: 5, endMarker: false },
                                    },
                                ]}
                            >
                                <div
                                    className={`mx-auto text-center d-flex justify-content-center align-items-center`}
                                    style={{ backgroundColor: '#000000', border: 'solid 1px #000000', width: '10px', height: '10px' }}
                                >
                                </div>
                            </ArcherElement>
                            <span className="mt-2">
                                <br />
                                {moment().format('DD-MM-YYYY')}
                            </span>
                        </div>
                        <div>
                            <span className="mb-3">
                                <DateRangePicker
                                    initialSettings={{
                                        singleDatePicker: true,
                                        showDropdowns: true,
                                        startDate: new Date(),
                                        minDate: new Date(),
                                        autoApply: true,
                                        drops: "up",
                                    }}
                                    onApply={(e, p) => handleChangeClosingDate(p.startDate)}
                                >
                                    <div id="reportrange" style={{ background: '#fff', cursor: 'pointer', padding: '5px 10px', border: '1px solid #ccc', width: '100%' }}>
                                        <i className="fa fa-calendar mr-2"></i><span>{projectTimelinesData.closingDate ? projectTimelinesData.closingDate.format('DD-MM-YYYY') : 'DD-MM-YYY'}</span> <i className="fa fa-caret-down float-right"></i>
                                    </div>
                                </DateRangePicker>
                                {touched.closingDate && errors.closingDate && <small className="text-danger">{errors.closingDate}</small>}
                            </span>
                            <ArcherElement
                                id={`step-2`}
                                relations={[
                                    {
                                        targetId: `step-2-1`,
                                        targetAnchor: 'middle',
                                        sourceAnchor: 'middle',
                                        style: { strokeColor: '#000000', strokeWidth: 2, endMarker: false },
                                    },
                                    {
                                        targetId: `step-3`,
                                        targetAnchor: 'middle',
                                        sourceAnchor: 'middle',
                                        style: { strokeColor: '#20a8d7', strokeWidth: 5, endMarker: false },
                                    },
                                ]}
                            >
                                <div
                                    className={`mx-auto text-center d-flex justify-content-center align-items-center`}
                                    style={{ backgroundColor: '#000000', border: 'solid 1px #000000', width: '10px', height: '10px', marginTop: '30px' }}
                                >
                                </div>
                            </ArcherElement>
                            <div className="mt-2" style={{ height: '30px' }}>
                            </div>
                            <ArcherElement
                                id={`step-2-1`}
                                relations={[]}
                            >
                                <div
                                    className={`mx-auto round-100 text-center d-flex justify-content-center align-items-center`}
                                    style={{ backgroundColor: '#000000', border: 'solid 1px #000000', width: '10px', height: '10px' }}
                                >
                                </div>
                            </ArcherElement>
                            <div>
                                Tender Closing Date
                            </div>
                        </div>
                        <div>
                            <div>
                                Project Wall Access
                            </div>
                            <ArcherElement
                                id={`step-3-1`}
                                relations={[]}
                            >
                                <div
                                    className={`mx-auto round-100 text-center d-flex justify-content-center align-items-center`}
                                    style={{ backgroundColor: '#000000', border: 'solid 1px #000000', width: '10px', height: '10px' }}
                                >
                                </div>
                            </ArcherElement>
                            <div className="mt-2" style={{ height: '26px' }}>
                            </div>
                            <ArcherElement
                                id={`step-3`}
                                relations={[
                                    {
                                        targetId: `step-3-1`,
                                        targetAnchor: 'middle',
                                        sourceAnchor: 'middle',
                                        style: { strokeColor: '#000000', strokeWidth: 2, endMarker: false },
                                    },
                                    {
                                        targetId: `step-4`,
                                        targetAnchor: 'middle',
                                        sourceAnchor: 'middle',
                                        style: { strokeColor: '#20a8d7', strokeWidth: 5, endMarker: false },
                                    },
                                ]}
                            >
                                <div
                                    className={`mx-auto text-center d-flex justify-content-center align-items-center`}
                                    style={{ backgroundColor: '#000000', border: 'solid 1px #000000', width: '10px', height: '10px' }}
                                >
                                </div>
                            </ArcherElement>
                            <span className="mt-2">
                                <br />
                                {projectTimelinesData.meetingDate ? moment(projectTimelinesData.meetingDate).subtract(7, 'day').format('DD-MM-YYYY') : 'DD-MM-YYYY'}
                            </span>
                        </div>
                        <div>
                            <span className="mb-3">
                                <DateRangePicker
                                    initialSettings={{
                                        singleDatePicker: true,
                                        showDropdowns: true,
                                        startDate: new Date(),
                                        minDate: new Date(),
                                        autoApply: true,
                                        drops: "up",
                                    }}
                                    onApply={(e, p) => handleChangeMeetingDate(p.startDate)}
                                >
                                    <div id="reportrange" style={{ background: '#fff', cursor: 'pointer', padding: '5px 10px', border: '1px solid #ccc', width: '100%' }}>
                                        <i className="fa fa-calendar mr-2"></i><span>{projectTimelinesData.meetingDate ? projectTimelinesData.meetingDate.format('DD-MM-YYYY') : 'DD-MM-YYY'}</span> <i className="fa fa-caret-down float-right"></i>
                                    </div>
                                </DateRangePicker>
                                {touched.meetingDate && errors.meetingDate && <small className="text-danger">{errors.meetingDate}</small>}
                            </span>
                            <ArcherElement
                                id={`step-4`}
                                relations={[
                                    {
                                        targetId: `step-4-1`,
                                        targetAnchor: 'middle',
                                        sourceAnchor: 'middle',
                                        style: { strokeColor: '#000000', strokeWidth: 2, endMarker: false },
                                    },
                                    {
                                        targetId: `step-5`,
                                        targetAnchor: 'middle',
                                        sourceAnchor: 'middle',
                                        style: { strokeColor: '#20a8d7', strokeWidth: 5, endMarker: false },
                                    },
                                ]}
                            >
                                <div
                                    className={`mx-auto text-center d-flex justify-content-center align-items-center`}
                                    style={{ backgroundColor: '#000000', border: 'solid 1px #000000', width: '10px', height: '10px', marginTop: '30px' }}
                                >
                                </div>
                            </ArcherElement>
                            <div className="mt-2" style={{ height: '26px' }}>
                            </div>
                            <ArcherElement
                                id={`step-4-1`}
                                relations={[]}
                            >
                                <div
                                    className={`mx-auto round-100 text-center d-flex justify-content-center align-items-center`}
                                    style={{ backgroundColor: '#000000', border: 'solid 1px #000000', width: '10px', height: '10px' }}
                                >
                                </div>
                            </ArcherElement>
                            <div>
                                Meeting Date
                            </div>
                        </div>
                        <div>
                            <div>
                                Project Completion
                            </div>
                            <ArcherElement
                                id={`step-5-1`}
                                relations={[]}
                            >
                                <div
                                    className={`mx-auto round-100 text-center d-flex justify-content-center align-items-center`}
                                    style={{ backgroundColor: '#000000', border: 'solid 1px #000000', width: '10px', height: '10px' }}
                                >
                                </div>
                            </ArcherElement>
                            <div className="mt-2" style={{ height: '26px' }}>
                            </div>
                            <ArcherElement
                                id={`step-5`}
                                relations={[
                                    {
                                        targetId: `step-5-1`,
                                        targetAnchor: 'middle',
                                        sourceAnchor: 'middle',
                                        style: { strokeColor: '#000000', strokeWidth: 2, endMarker: false },
                                    },
                                ]}
                            >
                                <div
                                    className={`mx-auto text-center d-flex justify-content-center align-items-center`}
                                    style={{ backgroundColor: '#000000', border: 'solid 1px #000000', width: '10px', height: '10px' }}
                                >
                                </div>
                            </ArcherElement>
                            <span className="mt-2">
                                <br />
                                {projectTimelinesData.completionDate ? projectTimelinesData.completionDate.format('DD-MM-YYYY') : 'DD-MM-YYYY'}
                            </span>
                        </div>
                    </div>
                </ArcherContainer>
            </Col>
        </Row>
    )
}
export default ProjectCreate;
