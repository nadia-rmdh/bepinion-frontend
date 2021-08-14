import React, { useEffect, useState } from "react"
// import Select from 'react-select';
import {
  translate,
} from 'react-switch-lang';
import PageLayout from "../../LandingPage/PageLayout";
import StepWizard from 'react-step-wizard';
import { NavigationDot } from "./Components/Navigation";
import RegistrantForm from "./Forms/RegistrantForm";
import EducationForm from "./Forms/EducationForm";
import WorkExprerienceForm from "./Forms/WorkExprerienceForm";
import ProjectExperienceForm from "./Forms/ProjectExperienceForm";
import SkillSectorForm from "./Forms/SkillSectorForm";
import DocumentVerificationForm from "./Forms/DocumentVerificationForm";
import { useFormik } from "formik";
import { Button, Col, Modal, ModalBody, Row } from "reactstrap";
import CompanyInformationForm from "./Forms/CompanyInformationForm";
import RegistrantCompanyForm from "./Forms/RegistrantCompanyForm";
import { useLocation } from "react-router-dom";


function Register(props) {
  const location = useLocation();
  const getSearchLocation = new URLSearchParams(location.search);
  const registrationForm = getSearchLocation.get('form')
  const [modalSubmitForm, setModalSubmitForm] = useState(false);
  const [instance, setInstance] = useState(null);

  const { values: registrationData, setValues: setRegistrationData, handleSubmit } = useFormik({
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
      if (registrationForm === 'professional') localStorage.setItem("registrationProfessional", JSON.stringify(values))
      if (registrationForm === 'business') localStorage.setItem("registrationBusiness", JSON.stringify(values))
      if (registrationForm === 'individual') localStorage.setItem("registrationIndividual", JSON.stringify(values))
    }
  })

  useEffect(() => {
    if (instance) {
      if (registrationForm === 'professional') {
        if (!registrationData.registrantForm) { instance.goToNamedStep('registrantInformation'); return; }
        if (!registrationData.educationForm) { instance.goToNamedStep('education'); return; }
        if (!registrationData.workExperienceForm) { instance.goToNamedStep('workExperience'); return; }
        if (!registrationData.projectExperienceForm) { instance.goToNamedStep('projectExperience'); return; }
        if (!registrationData.skillSectorForm) { instance.goToNamedStep('skillSector'); return; }
        if (!registrationData.verificationForm) { instance.goToNamedStep('documentVerification'); return; }
      }
      if (registrationForm === 'business') {
        if (!registrationData.companyInformationForm) { instance.goToNamedStep('companyInformation'); return; }
        if (!registrationData.registrantForm) { instance.goToNamedStep('registrantInformation'); return; }
        if (!registrationData.verificationForm) { instance.goToNamedStep('documentVerification'); return; }
      }
      if (registrationForm === 'individual') {
        if (!registrationData.registrantForm) { instance.goToNamedStep('registrantInformation'); return; }
        if (!registrationData.verificationForm) { instance.goToNamedStep('documentVerification'); return; }
      }
      window.location.replace('/')
    }
    // eslint-disable-next-line
  }, [instance, registrationForm])

  const handleFinishRegistration = () => {
    setModalSubmitForm(!modalSubmitForm)
  }

  return (
    <PageLayout>
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
        {registrationForm === 'professional' && <RegistrantForm step={1} hashKey="registrantInformation" stepName="registrantInformation" onSubmitForm={(data) => setRegistrationData(state => ({ ...state, registrantForm: data }))} />}
        {registrationForm === 'professional' && <EducationForm step={2} hashKey="education" stepName="education" onSubmitForm={(data) => setRegistrationData(state => ({ ...state, educationForm: data }))} />}
        {registrationForm === 'professional' && <WorkExprerienceForm step={3} hashKey="workExperience" stepName="workExperience" onSubmitForm={(data) => setRegistrationData(state => ({ ...state, workExperienceForm: data }))} />}
        {registrationForm === 'professional' && <ProjectExperienceForm step={4} hashKey="projectExperience" stepName="projectExperience" onSubmitForm={(data) => setRegistrationData(state => ({ ...state, projectExperienceForm: data }))} />}
        {registrationForm === 'professional' && <SkillSectorForm step={5} hashKey="skillSector" stepName="skillSector" onSubmitForm={(data) => setRegistrationData(state => ({ ...state, skillSectorForm: data }))} />}
        {registrationForm === 'professional' && <DocumentVerificationForm step={6} hashKey="documentVerification" stepName="documentVerification" onSubmitForm={(data) => setRegistrationData(state => ({ ...state, verificationForm: data }))} onFinishRegistration={handleFinishRegistration} />}

        {registrationForm === 'business' && <CompanyInformationForm step={1} hashKey="companyInformation" stepName="companyInformation" onSubmitForm={(data) => setRegistrationData(state => ({ ...state, companyInformationForm: data }))} />}
        {registrationForm === 'business' && <RegistrantCompanyForm step={2} hashKey="registrantInformation" stepName="registrantInformation" onSubmitForm={(data) => setRegistrationData(state => ({ ...state, registrantForm: data }))} />}
        {registrationForm === 'business' && <DocumentVerificationForm step={3} hashKey="documentVerification" stepName="documentVerification" onSubmitForm={(data) => setRegistrationData(state => ({ ...state, verificationForm: data }))} onFinishRegistration={handleFinishRegistration} />}

        {registrationForm === 'individual' && <RegistrantForm step={1} hashKey="registrantInformation" stepName="registrantInformation" onSubmitForm={(data) => setRegistrationData(state => ({ ...state, registrantForm: data }))} />}
        {registrationForm === 'individual' && <DocumentVerificationForm step={2} hashKey="documentVerification" stepName="documentVerification" onSubmitForm={(data) => setRegistrationData(state => ({ ...state, verificationForm: data }))} onFinishRegistration={handleFinishRegistration} />}
      </StepWizard>
      <Modal isOpen={modalSubmitForm} centered toggle={handleFinishRegistration}>
        <ModalBody className="p-5">
          <Row>
            <Col xs="12" className="mb-5">
              Are you sure with your registration data?
            </Col>
            <Col xs="12" className="d-flex justify-content-end">
              <Button color="secondary" className="mr-2" onClick={handleFinishRegistration}>Cancel</Button>
              <Button color="primary" onClick={handleSubmit}>Submit</Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </PageLayout>
  );
}

export default translate(Register);
