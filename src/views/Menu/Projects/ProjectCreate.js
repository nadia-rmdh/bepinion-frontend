import React, { useCallback, useMemo, useState } from "react"
import { Card, CardBody, Row, Col, Button, Label, Input, InputGroup, InputGroupAddon, InputGroupText, CustomInput, ModalBody, Modal, UncontrolledTooltip } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from 'yup';
import Select from 'react-select'
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "react-toastify";
import request from "../../../utils/request";
import useDataEducationDegrees from "../../../hooks/useDataEducationDegrees";
import useDataEducationFields from "../../../hooks/useDataEducationFields";
import useDataSectors from "../../../hooks/useDataSectors";
import useDataSkills from "../../../hooks/useDataSkills";
import { useHistory } from "react-router-dom";
import { ArcherContainer, ArcherElement } from 'react-archer'
import moment from 'moment'
import { useAuthUser } from "../../../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Datepicker from "react-datepicker";
import CurrencyInput from 'react-currency-input-field';
import { convertToRupiah } from '../../../utils/formatter';

function ProjectCreate(props) {
    const history = useHistory();
    const authUser = useAuthUser();
    const [modalSubmitForm, setModalSubmitForm] = useState(false);

    const ValidationFormSchema = () => {
        return Yup.object().shape({
            projectName: Yup.string().required().label('Business Name'),
            projectOwnerVisibility: Yup.string().required().label('Project Owner Visibility'),
            sectors: Yup.string().required().label('Sector'),
            description: Yup.string().required().label('Description'),
            prerequisite: Yup.string().required().label('Supporting Materials'),
            duration: Yup.number().min(1, 'Min value 1.').label('Duration'),
            estimatedContractValue: Yup.number().min(authUser.smcv, 'Min value ' + authUser.smcv).label('Estimated Contract Value'),
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
            prerequisite: '',
            duration: 0,
            budget: authUser.smcv,
            minimumContractValue: 0,
            estimatedContractValue: 0,
            budgetVisibility: '',
            completionDate: moment().add(14, 'day'),
            closingDate: new Date(moment().add(3, 'day')),
            meetingDate: new Date(moment().add(21, 'day')),
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
                prerequisite: values.prerequisite,
                duration: values.duration,
                budget: values.budget,
                minimumContractValue: values.minimumContractValue,
                estimatedContractValue: values.estimatedContractValue,
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
        <Row>
            <Col xs="12"><ProjectInformation projectInformationData={values} setProjectInformationData={setValues} touched={touched} errors={errors} /></Col>
            <Col xs="12"><ProjectSchedule projectScheduleData={values} setProjectScheduleData={setValues} touched={touched} errors={errors} /></Col>
            <Col xs="12"><ProjectRequirements projectRequirementsData={values} setProjectRequirementsData={setValues} touched={touched} errors={errors} /></Col>
            <Col xs="12"><ProjectDetails projectDetailsData={values} setProjectDetailsData={setValues} touched={touched} errors={errors} authUser={authUser} /></Col>
            <Col xs="12" className="d-flex justify-content-end">
                <Button color="secondary" className="mr-2">Cancel</Button>
                <Button color="primary" onClick={() => setModalSubmitForm(!modalSubmitForm)}>
                    Create
                </Button>
            </Col>
            <Modal isOpen={modalSubmitForm} centered toggle={() => setModalSubmitForm(!modalSubmitForm)}>
                <ModalBody className="p-5">
                    <Row>
                        <Col xs="12" className="mb-5">
                            By clicking submit, you confirm that all the information provided is true and correct.
                        </Col>
                        <Col xs="12" className="d-flex justify-content-end">
                            <Button color="secondary" className="mr-2" onClick={() => setModalSubmitForm(!modalSubmitForm)}>Cancel</Button>
                            <Button color="primary" disabled={isSubmitting} onClick={handleSubmit}>Create</Button>
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>
        </Row>
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
        if (e.length > 3) return;
        setProjectInformationData(old => ({ ...old, sectors: e ?? [] }))
    }, [setProjectInformationData])

    const handleChangeDescription = useCallback((e) => {
        const { value } = e.target;
        setProjectInformationData(old => ({ ...old, description: value }))
    }, [setProjectInformationData])

    const handleChangePrerequisite = useCallback((e) => {
        const { value } = e.target;
        setProjectInformationData(old => ({ ...old, prerequisite: value }))
    }, [setProjectInformationData])

    return (
        <Card className="shadow-sm">
            <CardBody>
                <Row className="px-md-5">
                    <Col xs="12" className="mb-3">
                        <div className="font-xl font-weight-bold">PROJECT INFORMATION</div>
                    </Col>
                    <Col xs="12">
                        <Row className="my-3">
                            <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                <Label for="projectName">Project Name</Label>
                            </Col>
                            <Col xs="12" md="8" lg="9">
                                <Input type="text" name="projectName" id="projectName" value={projectInformationData.projectName} onChange={(e) => handleChangeProjectName(e)} />
                                {touched.projectName && errors.projectName && <small className="text-danger">{errors.projectName}</small>}
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                <Label for="projectOwnerVisibility" className="m-0">Project Owner Visibility</Label>
                                <FontAwesomeIcon icon="question-circle" id="projectOwnerVisibilityTooltip" className="text-pinion-primary ml-1" />
                                <UncontrolledTooltip target="projectOwnerVisibilityTooltip">
                                    You may choose to hide your name/company in the bidding stage. It will only be disclosed to the appointed party when the project is still open.
                                </UncontrolledTooltip>
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
                                    placeholder="Choose max 3 sectors..."
                                    value={projectInformationData.sectors}
                                    onChange={(e) => handleChangeSector(e)}
                                    components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                />
                                {touched.sector && errors.sector && <small className="text-danger">{errors.sector}</small>}
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col xs="12" className="d-flex align-items-center">
                                <Label for="description" className="mb-1">Description</Label>
                            </Col>
                            <Col xs="12" className="mb-3">
                                <small className="text-muted">
                                    1. Tell us about the background story of this project. <br />
                                    2. Tell us about your objectives of this project. <br />
                                    3. Tell us about the important decisions you need to make based on the result of this project. <br />
                                    4. Tell us where to focus our attention to. <br />
                                    5. Tell us about the boundary conditions of this issue (if any). <br />
                                </small>
                            </Col>
                            <Col xs="12">
                                <TextareaAutosize
                                    minRows={5}
                                    name="description"
                                    id="description"
                                    className="form-control"
                                    value={projectInformationData.description}
                                    onChange={(e) => handleChangeDescription(e)}
                                />
                                {touched.description && errors.description && <small className="text-danger">{errors.description}</small>}
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col xs="12" className="d-flex align-items-center">
                                <Label for="prerequisite">Supporting Materials</Label>
                            </Col>
                            <Col xs="12">
                                <TextareaAutosize
                                    minRows={5}
                                    name="prerequisite"
                                    id="prerequisite"
                                    className="form-control"
                                    value={projectInformationData.prerequisite}
                                    onChange={(e) => handleChangePrerequisite(e)}
                                />
                                {touched.prerequisite && errors.prerequisite && <small className="text-danger">{errors.prerequisite}</small>}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
}

const ProjectSchedule = ({ projectScheduleData, setProjectScheduleData, touched, errors }) => {
    const handleChangeDuration = useCallback((e) => {
        const { value } = e.target;
        setProjectScheduleData(old => ({ ...old, duration: value }))
    }, [setProjectScheduleData])

    return (
        <Card className="shadow-sm">
            <CardBody>
                <Row className="px-md-5">
                    <Col xs="12" className="mb-3">
                        <div className="font-xl font-weight-bold">PROJECT SCHEDULE</div>
                    </Col>
                    <Col xs="12">
                        <Row className="my-3">
                            <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                <Label for="duration">Meeting Duration</Label>
                            </Col>
                            <Col xs="12" md="8" lg="9">
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <Input type="number" name="duration" id="duration" value={projectScheduleData.duration} onChange={(e) => handleChangeDuration(e)}
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
                    </Col>
                    <Col xs="12" className="mt-5"><ProjectTimelines projectTimelinesData={projectScheduleData} setProjectTimelinesData={setProjectScheduleData} touched={touched} errors={errors} /></Col>
                </Row>
            </CardBody>
        </Card>
    )
}

const ProjectRequirements = ({ projectRequirementsData, setProjectRequirementsData, touched, errors }) => {
    const { data: getSkills } = useDataSkills();
    const skills = useMemo(() => getSkills.map(p => ({ label: p.name, value: p.id })), [getSkills])

    const { data: getDegree } = useDataEducationDegrees();
    const degrees = useMemo(() => getDegree.map(p => ({ label: p.name, value: p.id })), [getDegree])

    const { data: getEduField } = useDataEducationFields();
    const educations = useMemo(() => getEduField.map(p => ({ label: p.name, value: p.id })), [getEduField])

    const handleChangeSkills = useCallback((e) => {
        if (e.length > 5) return;
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
                <Row className="px-md-5">
                    <Col xs="12" className="mb-3">
                        <div className="font-xl font-weight-bold">CONSULTANT REQUIREMENTS</div>
                    </Col>
                    <Col xs="12">
                        <Row className="my-3">
                            <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                <Label for="skills">Skills</Label>
                            </Col>
                            <Col xs="12" md="8" lg="9">
                                <Select
                                    closeMenuOnSelect={false}
                                    options={skills}
                                    isClearable
                                    isMulti
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
                                <Input type="number" name="yearExperience" id="yearExperience" value={projectRequirementsData.yearExperience} onChange={(e) => handleChangeYearExperience(e)}
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

const ProjectDetails = ({ projectDetailsData, setProjectDetailsData, touched, errors, authUser }) => {
    const [mcv, setMcv] = useState(authUser.smcv);
    const handleChangeMinimum = useCallback((e) => {
        const value = parseInt(e ?? authUser.smcv);
        setMcv(value)
        setProjectDetailsData(old => ({ ...old, minimumContractValue: value }))
    }, [setProjectDetailsData, authUser])

    const handleChangeEstimated = useCallback((e) => {
        setProjectDetailsData(old => ({ ...old, estimatedContractValue: parseInt(e) }))
    }, [setProjectDetailsData])

    const handleChangeBudgetVisibility = useCallback((e) => {
        const { value } = e.target;
        setProjectDetailsData(old => ({ ...old, budgetVisibility: value }))
    }, [setProjectDetailsData])

    return (
        <Card className="shadow-sm">
            <CardBody>
                <Row className="px-md-5">
                    <Col xs="12" className="mb-3">
                        <div className="font-xl font-weight-bold">COMMERCIAL DETAILS</div>
                    </Col>
                    <Col xs="12">
                        <Row className="my-3">
                            <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                <Label for="minimumContractValue" className="m-0">Minimum Contract Value (Optional)</Label>
                                <FontAwesomeIcon icon="question-circle" id="minimumContractValueTooltip" className="text-pinion-primary ml-1" />
                                <UncontrolledTooltip target="minimumContractValueTooltip">
                                    A minimum contract value of Rp {convertToRupiah(authUser?.smcv ?? 0)} is required. If it is deemed to low, Client is able to determine a user defined minimum contract value to filter out applicants.
                                </UncontrolledTooltip>
                            </Col>
                            <Col xs="12" md="8" lg="9">
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            IDR
                                        </InputGroupText>
                                        <CurrencyInput
                                            placeholder={`Min. value ${convertToRupiah(authUser?.smcv ?? 0)}`}
                                            decimalsLimit={2}
                                            groupSeparator="."
                                            decimalSeparator=","
                                            onValueChange={(value) => handleChangeMinimum(value)}
                                            className="form-control"
                                        />
                                    </InputGroupAddon>
                                </InputGroup>
                                {mcv > 0 && mcv < authUser?.smcv && <small className="text-danger">Min. value {convertToRupiah(authUser?.smcv ?? 0)}</small>}
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                <Label for="estimatedContractValue" className="m-0">Estimated Contract Value</Label>
                                <FontAwesomeIcon icon="question-circle" id="estimatedContractValueTooltip" className="text-pinion-primary ml-1" />
                                <UncontrolledTooltip target="estimatedContractValueTooltip">
                                    Client is required to enter the estimated contract value to provide gauge for service fees expected from applicants.
                                </UncontrolledTooltip>
                            </Col>
                            <Col xs="12" md="8" lg="9">
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            IDR
                                        </InputGroupText>
                                        <CurrencyInput
                                            placeholder={`Min. value ${convertToRupiah(mcv ?? (authUser?.smcv ?? 0))}`}
                                            decimalsLimit={2}
                                            groupSeparator="."
                                            decimalSeparator=","
                                            onValueChange={(value) => handleChangeEstimated(value)}
                                            className="form-control"
                                        />
                                    </InputGroupAddon>
                                </InputGroup>
                                {((touched.estimatedContractValue && errors.estimatedContractValue) || (projectDetailsData.estimatedContractValue > 0 && projectDetailsData.estimatedContractValue < mcv)) && <small className="text-danger">Min. value {convertToRupiah(mcv)}</small>}
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                <Label for="budgetVisibility" className="m-0">Budget Visibility</Label>
                                <FontAwesomeIcon icon="question-circle" id="budgetVisibilityTooltip" className="text-pinion-primary ml-1" />
                                <UncontrolledTooltip target="budgetVisibilityTooltip">
                                    You may choose to hide the estimated contract value in the bidding stage. Applicants will propose their service fee based on their own discretion.
                                </UncontrolledTooltip>
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
            <Col xs="12" className="create-project-timeline p-0 p-md-3">
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
                                <Datepicker
                                    required
                                    name="startDate"
                                    selected={projectTimelinesData.closingDate}
                                    onChange={(e) => handleChangeClosingDate(e)}
                                    className="form-control"
                                    dateFormat="dd MMMM yyyy"
                                    minDate={new Date(moment().add(3, 'day'))}
                                    wrapperClassName="form-control"
                                />
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
                                Project Environment
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
                                <Datepicker
                                    required
                                    name="startDate"
                                    selected={projectTimelinesData.meetingDate}
                                    onChange={(e) => handleChangeMeetingDate(e)}
                                    className="form-control"
                                    dateFormat="dd MMMM yyyy"
                                    minDate={new Date(moment(projectTimelinesData.closingDate).add(7, 'day'))}
                                    wrapperClassName="form-control"
                                />
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
                {moment(projectTimelinesData.meetingDate).subtract(7, 'day').diff(projectTimelinesData.closingDate, 'days') <= 0 && <small className="text-danger">Closing date must be less than Project environment date</small>}
            </Col>
        </Row>
    )
}
export default ProjectCreate;
