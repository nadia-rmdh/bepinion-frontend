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
import * as Yup from 'yup';
import { Button, Col, Modal, ModalBody, Row } from "reactstrap";


function Register(props) {
  const [modalSubmitForm, setModalSubmitForm] = useState(false);
  const [instance, setInstance] = useState(null);

  const ValidationFormSchema = () => {
    return Yup.object().shape({
      registrantForm: Yup.string().required('registrantInformation'),
      educationForm: Yup.string().required('education'),
      workExperienceForm: Yup.string().required('workExperience'),
      projectExperienceForm: Yup.string().required('projectExperience'),
      skillSectorForm: Yup.string().required('skillSector'),
      verificationForm: Yup.string().required('documentVerification'),
    })
  }

  const { values: registrationData, errors, setValues: setRegistrationData, handleSubmit } = useFormik({
    initialValues: {
      registrantForm: '',
      educationForm: '',
      workExperienceForm: '',
      projectExperienceForm: '',
      skillSectorForm: '',
      verificationForm: '',
    },
    validationSchema: ValidationFormSchema,
    onSubmit: (values, { setSubmitting, setErrors }) => {
      setSubmitting(true)
      localStorage.setItem("registraionProfessional", JSON.stringify(values));
    }
  })

  useEffect(() => {
    if (instance) {
      if (!registrationData.registrantForm || errors.registrantForm) { instance.goToNamedStep('registrantInformation'); return; }
      if (!registrationData.educationForm || errors.educationForm) { instance.goToNamedStep('education'); return; }
      if (!registrationData.workExperienceForm || errors.workExperienceForm) { instance.goToNamedStep('workExperience'); return; }
      if (!registrationData.projectExperienceForm || errors.projectExperienceForm) { instance.goToNamedStep('projectExperience'); return; }
      if (!registrationData.skillSectorForm || errors.skillSectorForm) { instance.goToNamedStep('skillSector'); return; }
      if (!registrationData.verificationForm || errors.verificationForm) { instance.goToNamedStep('documentVerification'); return; }
    }
    // eslint-disable-next-line
  }, [instance])

  const onStepChange = (stats) => {
    console.log(stats);
  };

  const handleFinishRegistration = () => {
    setModalSubmitForm(!modalSubmitForm)
  }

  return (
    <PageLayout>
      <StepWizard
        onStepChange={onStepChange}
        isHashEnabled
        className="register-form"
        nav={<NavigationDot />}
        instance={setInstance}
        transitions={{
          enterRight: ``,
          enterLeft: ``,
          exitRight: ``,
          exitLeft: ``,
          intro: ``,
        }}
      >
        <RegistrantForm hashKey="registrantInformation" stepName="registrantInformation" onSubmitForm={(data) => setRegistrationData(state => ({ ...state, registrantForm: data }))} />
        <EducationForm hashKey="education" stepName="education" onSubmitForm={(data) => setRegistrationData(state => ({ ...state, educationForm: data }))} />
        <WorkExprerienceForm hashKey="workExperience" stepName="workExperience" onSubmitForm={(data) => setRegistrationData(state => ({ ...state, workExperienceForm: data }))} />
        <ProjectExperienceForm hashKey="projectExperience" stepName="projectExperience" onSubmitForm={(data) => setRegistrationData(state => ({ ...state, projectExperienceForm: data }))} />
        <SkillSectorForm hashKey="skillSector" stepName="skillSector" onSubmitForm={(data) => setRegistrationData(state => ({ ...state, skillSectorForm: data }))} />
        <DocumentVerificationForm hashKey="documentVerification" stepName="documentVerification" onSubmitForm={(data) => setRegistrationData(state => ({ ...state, verificationForm: data }))} onFinishRegistration={handleFinishRegistration} />
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
