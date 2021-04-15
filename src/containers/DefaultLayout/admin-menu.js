import { lazy } from "react";
import { t } from "react-switch-lang";

const RecruitmentWrapper = lazy(() =>
  import("../../views/Menu/Recruitment/RecruitmentWrapper")
)
const Company = lazy(() =>
  import("../../views/Menu/Company/CompanyProfile/CompanyProfile")
)

const Invoices = lazy(() =>
  import("../../views/Menu/Recruitment/HistoryInvoices.js")
)

const UserList = lazy(() => 
  import("../../views/Menu/Privileges/PrivilegeList")
)

const UserCreate = lazy(() =>
  import("../../views/Menu/Privileges/PrivilegeCreate")
)

const UserEdit = lazy(() =>
  import("../../views/Menu/Privileges/PrivilegeEdit")
)

const TokenHistory = lazy(() =>
  import("../../views/Menu/Recruitment/TokenHistory")
)

const CompanyInfo = lazy(() =>
  import("../../views/Menu/Company/CompanyProfile/CompanyInfo")
)
// route object
// {url, component, privileges, menu: { name, icon }}

export default () => [
  {
    url: "/dashboard",
    component: RecruitmentWrapper,
    menu: {
      name: t("Rekrutmen"),
      icon: "icon-user-follow",
    },
  },
  {
    url: "/company",
    exact: true,
    component: Company,
    privileges: ["canManagementCompany"],
  },
  {
    url: "/invoices",
    exact: true,
    component: Invoices
  },
  {
    url: "/manage-user",
    exact: true,
    privileges: ["canManagementUser"],
    component: UserList
  },
  {
    url: "/manage-user/create",
    exact: true,
    privileges: ["canManagementUser"],
    component: UserCreate
  },
  {
    url: "/manage-user/:id/edit",
    exact: true,
    privileges: ["canManagementUser"],
    component: UserEdit
  },
  {
    url: "/tokenhistory",
    component: TokenHistory,
    privileges: ["canManagementJob"],
  },
  {
    url: "/profile",
    component: CompanyInfo,
    oneOfPrivileges: ["canManagementCompany"],
    menu: {
      name: t("perusahaan"),
      icon: "icon-note",
    },
  },
];