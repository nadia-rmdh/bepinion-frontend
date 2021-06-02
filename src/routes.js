import React from 'react';

const Breadcrumbs = React.lazy(() => import('./views/Base/Breadcrumbs'));
const Cards = React.lazy(() => import('./views/Base/Cards'));
const Carousels = React.lazy(() => import('./views/Base/Carousels'));
const Collapses = React.lazy(() => import('./views/Base/Collapses'));
const Dropdowns = React.lazy(() => import('./views/Base/Dropdowns'));
const Forms = React.lazy(() => import('./views/Base/Forms'));
const Jumbotrons = React.lazy(() => import('./views/Base/Jumbotrons'));
const ListGroups = React.lazy(() => import('./views/Base/ListGroups'));
const Navbars = React.lazy(() => import('./views/Base/Navbars'));
const Navs = React.lazy(() => import('./views/Base/Navs'));
const Paginations = React.lazy(() => import('./views/Base/Paginations'));
const Popovers = React.lazy(() => import('./views/Base/Popovers'));
const ProgressBar = React.lazy(() => import('./views/Base/ProgressBar'));
const Switches = React.lazy(() => import('./views/Base/Switches'));
const Tables = React.lazy(() => import('./views/Base/Tables'));
const Tabs = React.lazy(() => import('./views/Base/Tabs'));
const Tooltips = React.lazy(() => import('./views/Base/Tooltips'));
const BrandButtons = React.lazy(() => import('./views/Buttons/BrandButtons'));
const ButtonDropdowns = React.lazy(() => import('./views/Buttons/ButtonDropdowns'));
const ButtonGroups = React.lazy(() => import('./views/Buttons/ButtonGroups'));
const Buttons = React.lazy(() => import('./views/Buttons/Buttons'));
const Charts = React.lazy(() => import('./views/Charts'));
// const Dashboard = React.lazy(() => import('./views/Dashboard'));
const CoreUIIcons = React.lazy(() => import('./views/Icons/CoreUIIcons'));
const Flags = React.lazy(() => import('./views/Icons/Flags'));
const FontAwesome = React.lazy(() => import('./views/Icons/FontAwesome'));
const SimpleLineIcons = React.lazy(() => import('./views/Icons/SimpleLineIcons'));
const Alerts = React.lazy(() => import('./views/Notifications/Alerts'));
const Badges = React.lazy(() => import('./views/Notifications/Badges'));
const Modals = React.lazy(() => import('./views/Notifications/Modals'));
const Colors = React.lazy(() => import('./views/Theme/Colors'));
const Typography = React.lazy(() => import('./views/Theme/Typography'));
const Widgets = React.lazy(() => import('./views/Widgets/Widgets'));
const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));
// Widya Skilloka
const Dashboard = React.lazy(() => import('./views/Menu/Dashboard/Dashboard'));
const PersonnelMenu = React.lazy(() => import('./views/Menu/Personnel/PersonnelMenu'));
const PersonnelList = React.lazy(() => import('./views/Menu/Personnel/PersonnelList'));
const PersonnelDetail = React.lazy(() => import('./views/Menu/Personnel/PersonnelDetail'));
const PersonnelWorkingShift = React.lazy(() => import('./views/Menu/Personnel/PersonnelWorkingShift/WorkingShift'));
const AttendanceHistory = React.lazy(() => import('./views/Menu/Attendance/History/AttendanceHistory'));
const AttendanceRecap = React.lazy(() => import('./views/Menu/Attendance/Recapitulation/AttendanceRecap'));
const AttendanceRecapDetail = React.lazy(() => import('./views/Menu/Attendance/Recapitulation/AttendanceRecapDetail'));
const CompanyMenu = React.lazy(() => import('./views/Menu/Company/CompanyMenu'));
const PengaturanDasar = React.lazy(() => import('./views/Menu/Company/BasicSetting/PengaturanDasar'));
const PengaturanJabatan = React.lazy(() => import('./views/Menu/Company/PositionSetting/PengaturanJabatan'));
const CompanyProfile = React.lazy(() => import('./views/Menu/Company/CompanyProfile/CompanyProfile'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  // { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/theme', exact: true, name: 'Theme', component: Colors },
  { path: '/theme/colors', name: 'Colors', component: Colors },
  { path: '/theme/typography', name: 'Typography', component: Typography },
  { path: '/base', exact: true, name: 'Base', component: Cards },
  { path: '/base/cards', name: 'Cards', component: Cards },
  { path: '/base/forms', name: 'Forms', component: Forms },
  { path: '/base/switches', name: 'Switches', component: Switches },
  { path: '/base/tables', name: 'Tables', component: Tables },
  { path: '/base/tabs', name: 'Tabs', component: Tabs },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  { path: '/base/carousels', name: 'Carousel', component: Carousels },
  { path: '/base/collapses', name: 'Collapse', component: Collapses },
  { path: '/base/dropdowns', name: 'Dropdowns', component: Dropdowns },
  { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
  { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
  { path: '/base/navbars', name: 'Navbars', component: Navbars },
  { path: '/base/navs', name: 'Navs', component: Navs },
  { path: '/base/paginations', name: 'Paginations', component: Paginations },
  { path: '/base/popovers', name: 'Popovers', component: Popovers },
  { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
  { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
  { path: '/buttons', exact: true, name: 'Buttons', component: Buttons },
  { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  { path: '/buttons/button-dropdowns', name: 'Button Dropdowns', component: ButtonDropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
  { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', component: Flags },
  { path: '/icons/font-awesome', name: 'Font Awesome', component: FontAwesome },
  { path: '/icons/simple-line-icons', name: 'Simple Line Icons', component: SimpleLineIcons },
  { path: '/notifications', exact: true, name: 'Notifications', component: Alerts },
  { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  { path: '/notifications/badges', name: 'Badges', component: Badges },
  { path: '/notifications/modals', name: 'Modals', component: Modals },
  { path: '/widgets', name: 'Widgets', component: Widgets },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/users', exact: true, name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
  // Widya Skilloka
  { path: '/beranda', name: 'Dashboard', component: Dashboard },
  { path: '/personnel', exact: true, name: 'Personnel', component: PersonnelMenu },
  { path: '/personnels', exact: true, name: 'Personnels', component: PersonnelList },
  { path: '/personnels/:id', exact: true, name: 'Personnel Detail', component: PersonnelDetail },
  { path: '/personnel/personnel-working-shift', exact: true, name: 'Personnel Working Shift', component: PersonnelWorkingShift },
  { path: '/attendance', exact: true, name: 'Attendance', component: AttendanceHistory },
  { path: '/attendance/history', name: 'Attendance History', component: AttendanceHistory },
  { path: '/attendance/recap/:id', exact: true, name: 'Attendance Recapitulation Detail', component: AttendanceRecapDetail },
  { path: '/attendance/recap', name: 'Attendance History', component: AttendanceRecap },
  { path: '/company', exact: true, name: 'Company', component: CompanyMenu },
  { path: '/company/pengaturan-dasar', exact: true, name: 'Pengaturan Dasar', component: PengaturanDasar },
  { path: '/company/pengaturan-jabatan', exact: true, name: 'Pengaturan Jabatan', component: PengaturanJabatan },
  { path: '/company/pengaturan-profil-perusahaan', exact: true, name: 'Pengaturan Profil Perusahaan', component: CompanyProfile }
];

export default routes;
