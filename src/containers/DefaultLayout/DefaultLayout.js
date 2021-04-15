import React, { Component, Suspense } from "react";
import * as router from "react-router-dom";

import {
  // AppAside,
  // AppFooter,
  // AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  // AppSidebarMinimizer,
  // AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from "@coreui/react";
import { translate } from "react-switch-lang";
class DefaultLayout extends Component {
  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  render() {
    const { t, user, menu } = this.props;
    const props = {...this.props, user: undefined, menu: undefined, t: undefined }

    const itemsAdmin = {
      items: [
        {
          name: "Dashboard",
          url: "/dashboard",
          icon: "icon-home",
        },
        {
          name: t("perusahaan"),
          url: "/company",
          icon: "icon-note",
        },
        {
          name: t("karyawan"),
          url: "/personnel",
          icon: "icon-people",
        },
        {
          name: t("kalender"),
          url: "/calendar",
          icon: "icon-calendar",
        },
        {
          name: t("absensi"),
          url: "/attendance",
          icon: "icon-pencil",
        },
        {
          name: t("Lembur"),
          url: "/overtimes",
          icon: "icon-hourglass",
        },
        {
          name: t("cuti"),
          url: "/cuti",
          icon: "icon-user-unfollow",
        },
        {
          name: "Reimburse",
          url: "/reimburse",
          icon: "icon-wallet",
        },
        {
          name: t("Asesmen"),
          url: "/assessment",
          icon: "icon-puzzle",
        },
        {
          name: t("Rekrutmen"),
          url: "/dashboard",
          icon: "icon-user-follow",
        },
        // TODO: RELEASE KONSULTASI
        // {
        //   name: t('Konsul'),
        //   url: '/consulting',
        //   icon: 'icon-directions'
        // }
      ],
    };

    return (
      <AppSidebar fixed display="lg">
        <AppSidebarHeader />
        <AppSidebarForm />
        <Suspense>
          <AppSidebarNav navConfig={itemsAdmin} {...props} router={router} />
        </Suspense>
        <AppSidebarFooter />
        {/* <AppSidebarMinimizer /> */}
      </AppSidebar>
    );
  }
}

export default connect(({ user, panelMenu: menu}) => ({user, menu}))(translate(DefaultLayout));
