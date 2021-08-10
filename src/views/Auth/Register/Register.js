import React, { useState } from "react"
// import Select from 'react-select';
import {
  translate,
} from 'react-switch-lang';
import PageLayout from "../../LandingPage/PageLayout";
import StepWizard from 'react-step-wizard';
import { NavigationDot, NavigationPage } from "./Components/Navigation";
import RegistrantForm from "./Forms/RegistrantForm";
import EducationForm from "./Forms/EducationForm";
import WorkExprerienceForm from "./Forms/WorkExprerienceForm";
import transitions from './transitions.less';
import ProjectExperienceForm from "./Forms/ProjectExperienceForm";
import SkillSectorForm from "./Forms/SkillSectorForm";
import DocumentVerificationForm from "./Forms/DocumentVerificationForm";


function Register(props) {
  const [SW, setSW] = useState(null);

  const onStepChange = (stats) => {
    console.log(stats);
  };
  const setInstance = SW => setSW(SW);

  return (
    <PageLayout>
      <StepWizard
        onStepChange={onStepChange}
        isHashEnabled
        className="register-form mt-5"
        nav={<NavigationDot />}
        instance={setInstance}
        transitions={{
          enterRight: `${transitions.animated} ${transitions.enterRight}`,
          enterLeft: `${transitions.animated} ${transitions.enterLeft}`,
          exitRight: `${transitions.animated} ${transitions.exitRight}`,
          exitLeft: `${transitions.animated} ${transitions.exitLeft}`,
          intro: `${transitions.animated} ${transitions.intro}`,
        }}
      >
        <RegistrantForm hashKey="registrantInformation" />
        <EducationForm hashKey="education" />
        <WorkExprerienceForm hashKey="workExperience" />
        <ProjectExperienceForm hashKey="projectExperience" />
        <SkillSectorForm hashKey="skillSector" />
        <DocumentVerificationForm hashKey="documentVerification" />
      </StepWizard>
      {SW && <NavigationPage SW={SW} />}
    </PageLayout>
  );
}

export default translate(Register);
