import { lazy } from "react";
import { t } from "react-switch-lang";

const Dashboard = lazy(() =>
  import("../../views/Menu/Dashboard/Dashboard")
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
    url: "/Profile",
    component: Profile
  },
];