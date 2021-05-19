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
    url: "/beranda",
    component: Dashboard,
    menu: {
      name: t("Beranda"),
      icon: "icon-home",
    },
  },
  {
    url: "/project",
    component: Project,
    menu: {
      name: t("Proyek"),
      icon: "icon-briefcase",
    },
  },
];