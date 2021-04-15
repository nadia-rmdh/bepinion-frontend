import React, { Suspense } from "react";
import { Switch, Redirect, withRouter } from "react-router-dom";
import { TabContent, TabPane } from "reactstrap";
import { translate } from "react-switch-lang";
import AuthRoute from "../../../components/AuthRoute";
import Spinner from "reactstrap/lib/Spinner";
import RecruitmentsFiltersProvider from "./Context/RecruitmentContext";

const RecruitmentVacancies = React.lazy(() => import("./RecruitmentVacancies"));
// const RecruitmentMenu = React.lazy(() => import("./RecruitmentMenu"));
const RecruitmentCreate = React.lazy(() => import("./RecruitmentCreate"));
const ApplicantList = React.lazy(() => import('./Applicants/ApplicantList'));
const ApplicantDetail = React.lazy(() =>
  import("./Applicants/ApplicantDetail")
);
const RecruitmentDetail = React.lazy(() => import("./RecruitmentDetail"));
const VacancyApplicantList = React.lazy(() =>
  import("./Applicants/VacancyApplicantList")
);
const LinkAssessmentCreate = React.lazy(() => import("./Internal/LinkAssessmentCreate"))

function RecruitmentWrapper({ location, match }) {
  const routes = [
    {
      path: match.path + "/",
      exact: true,
      // privileges: ["canManagementJob"],
      component: RecruitmentVacancies,
    },
    {
      path: match.path + "/vacancies/create",
      exact: true,
      privileges: ["canManagementJob"],
      component: RecruitmentCreate,
    },
    {
      path: match.path + "/vacancies/:id/edit",
      exact: true,
      privileges: ["canManagementJob"],
      component: RecruitmentDetail,
    },
    {
      path: match.path + "/vacancies/:id/applicants",
      exact: true,
      // privileges: ["canManagementJob"],
      component: VacancyApplicantList,
    },
    {
      path: match.path + '/applicants',
      exact: true,
      // privileges: ["canManagementJob"],
      component: ApplicantList,
    },
    {
      path: match.path + "/applicants/:applicantId",
      exact: true,
      // privileges: ["canManagementJob"],
      component: ApplicantDetail,
    },
    {
      path: match.path + "/internal/create",
      exact: true,
      privileges: ["canInternalAssesment"],
      component: LinkAssessmentCreate,
    },
  ];
  return (
    <TabContent className="shadow-sm rounded">
      <TabPane className="p-0">
        <Suspense
          fallback={<div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              background: "rgba(255,255,255, 0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spinner style={{ width: 48, height: 48 }} />
          </div>}
        >
          <RecruitmentsFiltersProvider>
            <Switch>
              {routes.map((route) => (
                <AuthRoute key={route.path} {...route} />
              ))}
              {routes[0] && (
                <Redirect exact from={match.path} to={routes[0].path} />
              )}
            </Switch>
          </RecruitmentsFiltersProvider>
        </Suspense>
      </TabPane>
    </TabContent>
  );
}

export default translate(withRouter(RecruitmentWrapper));
