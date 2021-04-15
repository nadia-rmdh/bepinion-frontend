import { t } from "react-switch-lang";
import { lazy } from "react";

export default () => [
    {
        url: "/dashboard",
        component: lazy(() =>
            import("../../views/Menu/DashboardUser/DashboardUser")
        ),
        menu: {
            name: "Dashboard",
            icon: "icon-home",
        },
    },
    {
        url: "/notifications",
        component: lazy(() => import('../../views/Menu/Notification/Notification'))
    },
    {
        url: "/profile",
        component: lazy(() =>
            import("../../views/Menu/Personnel/PersonnelDetailUser")
        ),
    },
    {
        url: "/attendance/user",
        component: lazy(() =>
            import("../../views/Menu/AttendanceUser/AttendanceUser")
        ),
        menu: {
            name: t("absensi"),
            icon: "icon-people",
        },
    },
    {
        url: "/cuti",
        component: lazy(() => import("../../views/Menu/Cuti/CutiWrapper")),
        menu: {
            name: t("cuti"),
            icon: "icon-user-unfollow",
        },
    },
    {
        url: "/reimburse",
        component: lazy(() =>
            import("../../views/Menu/Reimburse/ReimburseWrapper")
        ),
        menu: {
            name: "Reimburse",
            icon: "icon-wallet",
        },
    },
    {
        url: "/overtimes",
        component: lazy(() => import("../../views/Menu/Overtime/OvertimeWrapper")),
        menu: {
            name: t("Lembur"),
            icon: "icon-hourglass",
        },
    },
    {
        url: "/assessment",
        component: lazy(() => import("../../views/Menu/Assesment/AssesmentMenu")),
        exact: true,
        menu: {
            name: t("Asesmen"),
            icon: "icon-puzzle",
        },
    },
    {
        url: "/assessment/mbti-tes",
        component: lazy(() =>
            import("../../views/Menu/Assesment/mbti/AssesmentMbti")
        ),
    },
    {
        url: "/assessment/papikostick-tes",
        component: lazy(() =>
            import("../../views/Menu/Assesment/papikostick/AssesmentPapikostick")
        ),
    },
    {
        url: "/assessment/disc-tes",
        component: lazy(() =>
            import("../../views/Menu/Assesment/disc/AssesmentDisc")
        ),
    },
];
