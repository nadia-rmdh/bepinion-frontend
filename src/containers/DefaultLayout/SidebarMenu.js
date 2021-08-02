import { lazy } from "react";
import { t } from "react-switch-lang";

const Dashboard = lazy(() =>
  import("../../views/Menu/Dashboard/Dashboard")
)
const ProjectWrapper = lazy(() =>
  import("../../views/Menu/Project/ProjectWrapper")
)
const Search = lazy(() => 
  import("../../views/Menu/Search/Search")
)
const Profile = lazy(() =>
  import("../../views/Menu/Profile/Profile")
)

export default () => [
  {
    url: "/beranda",
    component: Dashboard,
    menu: {
      name: t("Beranda"),
      icon: "icon-home",
    },
  },
  {
    url: "/project",
    component: ProjectWrapper,
    menu: {
      name: t("Proyek"),
      icon: "icon-briefcase",
    },
  },
  {
    url: "/Profile",
    component: Profile
  },
  {
    url: "/search",
    component: Search
  }
];