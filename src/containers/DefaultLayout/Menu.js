import { lazy } from "react";

const DashboardProfessional = lazy(() =>
  import("../../views/Menu/Professionals/DashboardProfessional")
)
const ProjectWrapper = lazy(() =>
  import("../../views/Menu/Projects/ProjectWrapper")
)
const ProfessionalWrapper = lazy(() =>
  import("../../views/Menu/Professionals/ProfessionalWrapper")
)
const Profile = lazy(() =>
  import("../../views/Menu/Profile/Profile")
)

export default (user) => menuProfessional();

const menuProfessional = () => [
  {
    url: "/dashboard",
    component: DashboardProfessional,
  },
  {
    url: "/project",
    component: ProjectWrapper,
  },
  {
    url: "/professional",
    component: ProfessionalWrapper,
  },
  {
    url: "/profile",
    component: Profile
  },
]