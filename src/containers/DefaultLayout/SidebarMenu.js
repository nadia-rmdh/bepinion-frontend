import { lazy } from "react";
import { t } from "react-switch-lang";

const Dashboard = lazy(() =>
  import("../../views/Menu/Dashboard/Dashboard")
)
const Project = lazy(() =>
  import("../../views/Menu/Project/Project")
)

export default () => [
  {
    url: "/dashboard",
    component: Dashboard,
    menu: {
      name: t("Beranda"),
      icon: "icon-home",
    },
  },
  {
    url: "/profile",
    component: Project,
    menu: {
      name: t("Proyek"),
      icon: "icon-briefcase",
    },
  },
];