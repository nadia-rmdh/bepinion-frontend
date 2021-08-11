import React, { useState } from "react"
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


function Register(props) {
  const onStepChange = (stats) => {
    console.log(stats);
  };

  return (
    <PageLayout>
      <StepWizard
        onStepChange={onStepChange}
        isHashEnabled
        className="register-form mt-5"
        nav={<NavigationDot />}
        transitions={{
          enterRight: ``,
          enterLeft: ``,
          exitRight: ``,
          exitLeft: ``,
          intro: ``,
        }}
      >
        <RegistrantForm hashKey="registrantInformation" onSubmitForm={(e) => console.log(e)} />
        <EducationForm hashKey="education" onSubmitForm={(e) => console.log(e)} />
        <WorkExprerienceForm hashKey="workExperience" onSubmitForm={(e) => console.log(e)} />
        <ProjectExperienceForm hashKey="projectExperience" onSubmitForm={(e) => console.log(e)} />
        <SkillSectorForm hashKey="skillSector" onSubmitForm={(e) => console.log(e)} />
        <DocumentVerificationForm hashKey="documentVerification" onSubmitForm={(e) => console.log(e)} />
      </StepWizard>
    </PageLayout>
  );
}

export default translate(Register);
