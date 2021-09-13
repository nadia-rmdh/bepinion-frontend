import React, { useCallback, useEffect, useState } from "react"
// import Select from 'react-select';
import {
    translate,
} from 'react-switch-lang';
import StepWizard from 'react-step-wizard';
import { NavigationDot } from "./Components/Navigation";
import RegistrantForm from "./Forms/RegistrantForm";
import EducationForm from "./Forms/EducationForm";
import WorkExprerienceForm from "./Forms/WorkExprerienceForm";
import ProjectExperienceForm from "./Forms/ProjectExperienceForm";
import SkillSectorForm from "./Forms/SkillSectorForm";
import DocumentVerificationForm from "./Forms/DocumentVerificationForm";
import { useFormik } from "formik";
import { Button, Card, CardBody, Col, Modal, ModalBody, Row, Spinner } from "reactstrap";
import CompanyInformationForm from "./Forms/CompanyInformationForm";
import RegistrantCompanyForm from "./Forms/RegistrantCompanyForm";
import { useHistory, useLocation } from "react-router-dom";
import request from "../../../utils/request";
import { toast } from "react-toastify";
import moment from "moment";
import { useAuthUser } from "../../../store";
import noImage from '../../../assets/illustrations/image-error.png'
import { DefaultImageUser } from '../../../components/DefaultImageUser/DefaultImageUser';


function Profile(props) {
    const location = useLocation();
    const history = useHistory();
    const authUser = useAuthUser();
    const registrationForm = authUser.role
    const [modalSubmitForm, setModalSubmitForm] = useState(false);
    const [instance, setInstance] = useState(null);

    const { values: registrationData, setValues: setRegistrationData, handleSubmit, isSubmitting } = useFormik({
        initialValues: {
            companyInformationForm: '',
            registrantForm: '',
            educationForm: '',
            workExperienceForm: '',
            projectExperienceForm: '',
            skillSectorForm: '',
            verificationForm: '',
        },
        // validationSchema: ValidationFormSchema,
        onSubmit: (values, { setSubmitting, setErrors }) => {
            setSubmitting(true)
            // if (!validationForm(instance, registrationForm, registrationData)) setModalSubmitForm(false)

            let formData = new FormData()
            formData.append('role', registrationForm)
            formData.append('email', values.registrantForm.email)
            formData.append('password', values.verificationForm.password)
            formData.append('firstName', values.registrantForm.firstName)
            formData.append('lastName', values.registrantForm.lastName)
            formData.append('phoneNumber', values.registrantForm.phone)
            formData.append('identityType', values.registrantForm.idType.value)
            formData.append('identityNumber', values.registrantForm.idNumber)

            if (registrationForm === 'company') {
                formData.append('clientIdSector', values.companyInformationForm.sector.value)
                formData.append('companyName', values.companyInformationForm.businessName)
                formData.append('companySize', values.companyInformationForm.companySize)
                formData.append('about', values.companyInformationForm.aboutUs)
                formData.append('npwp', values.companyInformationForm.npwpNumber)
                formData.append('address', values.companyInformationForm.address)
                formData.append('idProvince', values.companyInformationForm.province.value)
                formData.append('companyPhoneNumber', values.companyInformationForm.phone)
                formData.append('jobTitle', values.registrantForm.jobTitle)
            } else {
                formData.append('idProvince', values.registrantForm.province.value)
                formData.append('address', values.registrantForm.address)
                formData.append('dob', moment(values.registrantForm.dateOfBirth).format('YYYY-MM-DD'))
                formData.append('gender', values.registrantForm.gender)
                formData.append('npwp', values.registrantForm.npwpNumber)

                if (registrationForm === 'individual') {
                    formData.append('clientIdSector', values.registrantForm.sector.value)
                }

                if (registrationForm === 'professional') {
                    formData.append('educations', JSON.stringify(values.educationForm.map(v => ({ idSchool: v.school.value, idEducationDegree: v.degree.value, idEducationField: v.education.value, graduationYear: v.graduationYear.value }))))
                    formData.append('workExperiences', JSON.stringify(values.workExperienceForm.map(v => ({ idProvince: v.location.value, idSector: v.sector.value, jobTitle: v.job, companyName: v.company, employmentType: v.employementType.value, startDate: moment(v.startDate).format('YYYY-MM-DD'), endDate: moment(v.endDate).format('YYYY-MM-DD'), isStillPresent: v.endDatePresent, skills: v.skills.map(s => ({ idSkill: s.value })) }))))
                    formData.append('projectExperiences', JSON.stringify(values.projectExperienceForm.map(v => ({ idProvince: v.province.value, idCountry: v.country.value, idSector: v.sector.value, clientName: v.client, projectName: v.projectName, projectRole: v.projectRole, description: v.description, startDate: moment(v.startDate).format('YYYY-MM-DD'), endDate: moment(v.endDate).format('YYYY-MM-DD'), skills: v.skills.map(s => ({ idSkill: s.value })) }))))
                    formData.append('skills', JSON.stringify(values.skillSectorForm.skills.map(v => ({ idSkill: v.value }))))
                    formData.append('sectors', JSON.stringify(values.skillSectorForm.sectors.map(v => ({ idSector: v.value }))))
                }
            }

            if (values.verificationForm.photo) formData.append('avatar', values.verificationForm.photo.file, values.verificationForm.photo.file.name)
            if (values.verificationForm.npwp) formData.append('npwp', values.verificationForm.npwp.file, values.verificationForm.npwp.file.name)
            if (values.verificationForm.regId) formData.append('identity', values.verificationForm.regId.file, values.verificationForm.regId.file.name)
            request.post(`v1/auth/signup`, formData)
                .then(() => {
                    toast.success('Register success')
                    setModalSubmitForm(false)
                    history.push('/')
                })
                .catch((error) => toast.error(error.response.data.message))
                .finally(() => setSubmitting(false))
        }
    })

    // useEffect(() => {
    //     if (instance) {
    //         validationForm(instance, registrationForm, registrationData)
    //     }
    //     // eslint-disable-next-line
    // }, [instance, registrationForm])

    const handleFinishRegistration = () => {
        setModalSubmitForm(!modalSubmitForm)
    }

    return (
        <Row className="mt-md-3 mt-lg-n2">
            <Col xs="12">
                <Biodata data={authUser} />
            </Col>
            <Col xs="12">
                <Card className="shadow-sm">
                    <CardBody>
                        <StepWizard
                            isHashEnabled
                            className="register-form"
                            nav={<NavigationDot role={registrationForm} />}
                            instance={setInstance}
                            transitions={{
                                enterRight: ``,
                                enterLeft: ``,
                                exitRight: ``,
                                exitLeft: ``,
                                intro: ``,
                            }}
                        >
                            {registrationForm === 'professional' && <RegistrantForm data={authUser} step={1} registrationForm={registrationForm} hashKey="registrantInformation" stepName="registrantInformation" onSubmitForm={(data) => setRegistrationData(state => ({ ...state, registrantForm: data }))} />}
                            {registrationForm === 'professional' && <EducationForm data={authUser} step={2} registrationForm={registrationForm} hashKey="education" stepName="education" onSubmitForm={(data) => setRegistrationData(state => ({ ...state, educationForm: data }))} />}
                            {registrationForm === 'professional' && <WorkExprerienceForm data={authUser} step={3} registrationForm={registrationForm} hashKey="workExperience" stepName="workExperience" onSubmitForm={(data) => setRegistrationData(state => ({ ...state, workExperienceForm: data }))} />}
                            {registrationForm === 'professional' && <ProjectExperienceForm data={authUser} step={4} registrationForm={registrationForm} hashKey="projectExperience" stepName="projectExperience" onSubmitForm={(data) => setRegistrationData(state => ({ ...state, projectExperienceForm: data }))} />}
                            {registrationForm === 'professional' && <SkillSectorForm data={authUser} step={5} registrationForm={registrationForm} hashKey="skillSector" stepName="skillSector" onSubmitForm={(data) => setRegistrationData(state => ({ ...state, skillSectorForm: data }))} />}
                            {registrationForm === 'professional' && <DocumentVerificationForm data={authUser} step={6} registrationForm={registrationForm} hashKey="documentVerification" stepName="documentVerification" onSubmitForm={(data) => setRegistrationData(state => ({ ...state, verificationForm: data }))} onFinishRegistration={handleFinishRegistration} />}

                            {registrationForm === 'company' && <CompanyInformationForm data={authUser} step={1} registrationForm={registrationForm} hashKey="companyInformation" stepName="companyInformation" onSubmitForm={(data) => setRegistrationData(state => ({ ...state, companyInformationForm: data }))} />}
                            {registrationForm === 'company' && <RegistrantCompanyForm data={authUser} step={2} registrationForm={registrationForm} hashKey="registrantInformation" stepName="registrantInformation" onSubmitForm={(data) => setRegistrationData(state => ({ ...state, registrantForm: data }))} />}
                            {registrationForm === 'company' && <DocumentVerificationForm data={authUser} step={3} registrationForm={registrationForm} hashKey="documentVerification" stepName="documentVerification" onSubmitForm={(data) => setRegistrationData(state => ({ ...state, verificationForm: data }))} onFinishRegistration={handleFinishRegistration} />}

                            {registrationForm === 'individual' && <RegistrantForm data={authUser} step={1} registrationForm={registrationForm} hashKey="registrantInformation" stepName="registrantInformation" onSubmitForm={(data) => setRegistrationData(state => ({ ...state, registrantForm: data }))} />}
                            {registrationForm === 'individual' && <DocumentVerificationForm data={authUser} step={2} registrationForm={registrationForm} hashKey="documentVerification" stepName="documentVerification" onSubmitForm={(data) => setRegistrationData(state => ({ ...state, verificationForm: data }))} onFinishRegistration={handleFinishRegistration} />}
                        </StepWizard>
                    </CardBody>
                </Card>
                <Modal isOpen={modalSubmitForm} centered toggle={handleFinishRegistration}>
                    <ModalBody className="p-5">
                        <Row>
                            <Col xs="12" className="mb-5">
                                Are you sure with your registration data?
                            </Col>
                            <Col xs="12" className="d-flex justify-content-end">
                                <Button color="secondary" className="mr-2" onClick={handleFinishRegistration}>Cancel</Button>
                                <Button color="primary" disabled={isSubmitting} onClick={handleSubmit}>
                                    {isSubmitting ? <><Spinner color="light" size="sm" /> Loading...</> : 'Submit'}
                                </Button>
                            </Col>
                        </Row>
                    </ModalBody>
                </Modal>
            </Col>
        </Row>
    );
}

const Biodata = ({ data }) => {
    const onErrorImage = useCallback((e) => {
        e.target.src = noImage;
        e.target.onerror = null;
    }, [])

    return (
        <Card className="shadow-sm">
            <CardBody>
                <Row>
                    <Col xs="12" className="d-flex py-3">
                        {data.avatar ?
                            <img src={data.avatar} className="rounded-circle shadow-sm ml-4" alt="avatar" style={{ objectFit: 'cover', width: '200px', height: '200px' }} onError={(e) => onErrorImage(e)} />
                            :
                            <DefaultImageUser text={data?.name ?? data.firstName} size={200} className="ml-4" />
                        }
                        <div className="ml-5 w-100">
                            {data.role === 'professional' ?
                                <div className="font-2xl font-weight-bold mb-2">{data.firstName} {data.lastName}</div>
                                :
                                <>
                                    <div className="font-2xl font-weight-bold mb-2">{data.name}</div>
                                    <div className="font-lg mb-2">{data.registrantInformation.firstName} {data.registrantInformation.lastName}</div>
                                </>
                            }
                            <Row className="mb-2">
                                <Col xs="3">
                                    <small>Phone number</small>
                                    <div className="font-weight-bold">{data.phoneNumber}</div>
                                </Col>
                                <Col xs="3">
                                    <small>Joined at</small>
                                    <div className="font-weight-bold">{moment(data.createdAt).format('DD MMMM YYYY')}</div>
                                </Col>
                                <Col xs="6">
                                    <small>
                                        About me
                                    </small>
                                    <div>
                                        {data.about ?? 'Nothing about me'}
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
}

const validationForm = (instance, registrationForm, registrationData) => {
    if (registrationForm === 'professional') {
        if (!registrationData.registrantForm) { instance.goToNamedStep('registrantInformation'); return false; }
        if (!registrationData.educationForm) { instance.goToNamedStep('education'); return false; }
        if (!registrationData.workExperienceForm) { instance.goToNamedStep('workExperience'); return false; }
        if (!registrationData.projectExperienceForm) { instance.goToNamedStep('projectExperience'); return false; }
        if (!registrationData.skillSectorForm) { instance.goToNamedStep('skillSector'); return false; }
        if (!registrationData.verificationForm) { instance.goToNamedStep('documentVerification'); return false; }
    }
    if (registrationForm === 'company') {
        if (!registrationData.companyInformationForm) { instance.goToNamedStep('companyInformation'); return false; }
        if (!registrationData.registrantForm) { instance.goToNamedStep('registrantInformation'); return false; }
        if (!registrationData.verificationForm) { instance.goToNamedStep('documentVerification'); return false; }
    }
    if (registrationForm === 'individual') {
        if (!registrationData.registrantForm) { instance.goToNamedStep('registrantInformation'); return false; }
        if (!registrationData.verificationForm) { instance.goToNamedStep('documentVerification'); return false; }
    }
    return true;
}
export default translate(Profile);
