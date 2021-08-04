import { lazy } from "react";
import { t } from "react-switch-lang";

const Dashboard = lazy(() =>
  import("../../views/Menu/Dashboard/Dashboard")
)
const ProjectWrapper = lazy(() =>
  import("../../views/Menu/Project/ProjectWrapper")
)
const Search = lazy(() =>
  import("../../views/Menu/Project/Search/Search")
)
const Profile = lazy(() =>
  import("../../views/Menu/Profile/Profile")
)
const Notification = lazy(() =>
  import("../../views/Menu/Notification/Notification")
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
  },
  {
    url: "/notifications",
    component: Notification,
    menu: {
      name: t("Notifikasi"),
      icon: "icon-bell",
    },
  },
];