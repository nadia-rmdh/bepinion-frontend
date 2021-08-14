import { lazy } from "react";

const ProfessionalDashboard = lazy(() =>
  import("../../views/Menu/Professionals/ProfessionalDashboard")
)

const ClientDashboard = lazy(() =>
  import("../../views/Menu/Clients/ClientDashboard")
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

export default (user) => user === 'professional' ? menuProfessional() : menuClient();

const menuProfessional = () => [
  {
    url: "/dashboard",
    component: ProfessionalDashboard,
  },
  {
    url: "/project",
    component: ProjectWrapper,
  },
  {
    url: "/profile",
    component: Profile
  },
]

const menuClient = () => [
  {
    url: "/dashboard",
    component: ClientDashboard,
  },
  {
    url: "/professional",
    component: ProfessionalWrapper,
  },
  {
    url: "/project",
    component: ProjectWrapper,
  },
  {
    url: "/profile",
    component: Profile
  },
]