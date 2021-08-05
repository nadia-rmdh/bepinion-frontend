import React, {
  Component, useRef
} from "react";
import { useHistory, withRouter } from "react-router";
import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavItem,
  NavLink
} from "reactstrap";
import PropTypes from "prop-types";
import {
  Row,
  Button,
  Modal,
  ModalBody,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import {
  AppNavbarBrand
} from "@coreui/react";
import logo from "../../assets/assets_ari/logo.png";
import icon from "../../assets/img/icon.png";
import { connect } from "react-redux";
import { getMe, logout, setUser } from "../../actions/auth";
import { setPanel } from "../../actions/ui";
import Axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { translate } from "react-switch-lang";
import langUtils from "../../utils/language/index";
import * as moment from "moment";
import NotificationDropdown from "./NotificationDropdown";
// import MessageDropdown from "./MessageDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useProjectContext } from "../../views/Menu/Project/ProjectContext";

function UploadProject() {
  const inputFile = useRef(null)
  const history = useHistory()
  const [, setProjectCtx] = useProjectContext();

  const onButtonClick = () => {
    inputFile.current.click();
  };

  const onChangeFile = (e) => {
    setProjectCtx(state => ({ ...state, file: e.target.files[0] }))
    if (e.target.files) {
      history.push('/project/create')
    }
  }

  return (
    <>
      <input type='file' id='file' ref={inputFile} style={{ display: 'none' }} onChange={(e) => onChangeFile(e)} />
      <NavLink onClick={onButtonClick}>
        <FontAwesomeIcon icon="plus-circle" size="2x" />
      </NavLink>
    </>
  )
}
class DefaultHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.user,
      session: props.token,
      modalData: false,
      currentPass: "",
      confirmPass: "",
      modalLang: false,
      newPass: "",
      newCompany: null,
      oldCompany: null,
      companyList: [],
      userPrivileges: this.props.user.privileges,
      isTour: false,
      forbiddenCompany: false,
      forbiddenUser: false,
      forbiddenInvoice: false,
      modalMobile: false
    };
  }
  changeLanguage = (id) => (e) => {
    e.preventDefault();
    this.handleSetLanguage(id);
    this.setState({
      modalLang: !this.state.modalLang,
    });
    window.location.reload();
  };
  changePass = () => {
    this.setState({
      modalData: !this.state.modalData,
    });
  };
  modalChangeLang = () => {
    this.setState({
      modalLang: !this.state.modalLang,
    });
  };
  changeAdmin = async () => {
    await this.props.setPanel("2");
    this.props.history.push("/beranda");
  };
  changeProfileCompany = async () => {
    if (this.props.user.privileges.includes("canManagementCompany")) {
      this.props.history.push("/company");
    }
    else {
      this.setState({ forbiddenCompany: true })
    }
  };
  historyInvoices = async () => {
    if (this.props.user.privileges.includes("canManagementTopUp")) {
      this.props.history.push("/invoices");
    }
    else {
      this.setState({ forbiddenInvoice: true })
    }

  }
  manageUser = async () => {
    if (this.props.user.privileges.includes("canManagementUser")) {
      this.props.history.push("/manage-user")
    }
    else {
      this.setState({ forbiddenUser: true })
    }
  }
  changeUser = async () => {
    await this.props.setPanel("3");
    this.props.history.push("/beranda");

    // window.location.reload();
    // window.location.replace("/home");
  };
  changeProfile = () => {
    const { history } = this.props;
    history.push("/profile");
    // window.location.replace("/profile/user");
  };
  handleChangeCurrent = (e) => {
    this.setState({
      currentPass: e.target.value,
    });
  };
  handleChangeConfirm = (e) => {
    this.setState({
      confirmPass: e.target.value,
    });
  };
  handleChangeNew = (e) => {
    this.setState({
      newPass: e.target.value,
    });
  };
  handleChangeLang = (e) => {
    this.setState({
      modalLang: e.target.value,
    });
  };
  cekSubmitData = (e) => {
    const { t } = this.props;
    if (this.state.newPass !== this.state.confirmPass) {
      toast.error(t("konfirmasipasssalah"), { autoClose: 3000 });
    } else {
      this.submitData();
    }
  };
  submitData = (e) => {
    const dataObject = {
      current: this.state.currentPass,
      new: this.state.newPass,
    };
    Axios.post(
      process.env.REACT_APP_DOMAIN + "/api/auth/changepassword",
      dataObject,
      { headers: { Authorization: `Bearer ${this.state.session}` } }
    )
      .then((res) => {
        this.setState({
          modalData: false,
          currentPass: "",
          confirmPass: "",
          newPass: "",
        });
        this.props.logout();
      })
      .catch((error) => {
        toast.error(JSON.stringify(error.response.data.message), {
          autoClose: 3000,
        });
      });
  };

  toggleChangeCompany = async () => {
    this.setState({
      modalChangeCompany: !this.state.modalChangeCompany,
      newCompany: this.state.oldCompany,
    });

    if (this.state.companyList.length === 0)
      Axios.get(process.env.REACT_APP_DOMAIN + "/api/auth/change-company", {
        headers: { Authorization: `Bearer ${this.state.session}` },
      })
        .then((res) => {
          let oldCompany = {};
          const companyList = [];
          res.data.data.data.map((data) => {
            let tmp = {};
            tmp.value = data.id;
            tmp.label = data.name;
            companyList.push(tmp);

            if (data.id === this.state.user.personnel.company.id)
              oldCompany = tmp;
            return data;
          });
          this.setState({ companyList, oldCompany, newCompany: oldCompany });
        })
        .catch((error) => console.log(error));
  };
  handleChangeCompany = (value) => {
    this.setState({
      newCompany: value,
    });
  };
  submitChangeCompany = () => {
    this.setState({ modalChangeCompany: false });

    Axios.post(
      process.env.REACT_APP_DOMAIN + "/api/auth/change-company",
      { companyId: this.state.newCompany.value },
      { headers: { Authorization: `Bearer ${this.state.session}` } }
    )
      .then((res) => {
        const newUser = { ...this.props.user };
        newUser.personnel.company.id = this.state.newCompany.value;
        newUser.personnel.company.name = this.state.newCompany.label;
        setUser(newUser);

        window.location.href = "/home";
      })
      .catch((error) => console.log(error));
  };
  onSelectFlag = (countryCode) => {
    this.handleSetLanguage(countryCode);
    moment.locale(countryCode.toLowerCase());
  };
  handleSetLanguage = (key) => {
    langUtils.setLanguage(key);
  };

  onAvatarError(e) {
    const img = e.target;
    img.onerror = null;
    img.src = "/assets/img/avatars/avatar-dummy.png";
    img.style.border = null;
  }
  changePage = (url) => {
    window.location.replace(url);
  };

  fileSelectedHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0]
    }, () => this.fileUploadHandler());
  };

  render() {
    // eslint-disable-next-line
    const { t, user, panelMenu: menu } = this.props;

    return (
      <div className="container-fluid">
        {/* <AppSidebarToggler className="d-lg-none" display="md" mobile /> */}
        <AppNavbarBrand
          style={{
            // position: "initial",
            top: "unset",
            // left: 0,
            // marginLeft: 10,
            cursor: "pointer"
          }}
          onClick={() => this.changePage("/beranda")}
          full={{ src: logo, width: 90, alt: "Idea Collaboration Logo" }}
          minimized={{ src: icon, width: 30, alt: "Idea Collaboration Icon" }}
        />
        <Nav navbar>
          <NotificationDropdown />
          <UncontrolledDropdown className="notification-dropdown-menu d-none d-md-flex" nav direction="down" onClick={this.checkProfileGuidance} disabled={this.state.isTour}>
            <DropdownToggle nav className="no-hover">
              <div className="round-100 ml-auto text-center border-0">
                <img src={this.state.user.detail.photo} alt="profile" width={35} height={35} style={{ objectFit: 'cover' }} onError={(e) => this.onAvatarError(e)} className="rounded-circle border" />
              </div>
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem onClick={this.changeProfile}>
                <i className="fa fa-user"></i>
                {t("Profil")}
              </DropdownItem>
              <DropdownItem onClick={this.changePass} className="tour-password" disabled={this.state.isTour}>
                <i className="fa fa-key"></i>
                {t("gantipassword")}
              </DropdownItem>
              <DropdownItem onClick={this.props.logout} className="tour-logout" disabled={this.state.isTour}>
                <i className="fa fa-lock"></i>
                {t("keluar")}
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>

        <Navbar fixed="bottom" color="white" className="shadow-lg d-md-none">
          <Nav justified className="w-100 p-1">
            <NavItem>
              <NavLink href="/beranda">
                <FontAwesomeIcon icon="home" size="2x" />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/search">
                <FontAwesomeIcon icon="search" size="2x" />
              </NavLink>
            </NavItem>
            <NavItem>
              <UploadProject />

              {/* <NavLink htmlFor="myInput">
                <FontAwesomeIcon icon="plus-circle" size="2x" />
              </NavLink>
              <input
                id="myInput"
                style={{ display: 'none' }}
                type={"file"}
                onChange={this.fileSelectedHandler}
              /> */}
            </NavItem>
            <NavItem>
              <NavLink href="/beranda">
                <FontAwesomeIcon icon="envelope" size="2x" />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={() => this.setState({modalMobile: !this.state.modalMobile})}>
                <div className="round-100 ml-auto text-center border-0">
                  <img src={this.state.user.detail.photo} alt="profile" width={30} height={30} style={{ objectFit: 'cover' }} onError={(e) => this.onAvatarError(e)} className="rounded-circle border" />
                </div>
              </NavLink>
            </NavItem>
          </Nav>
        </Navbar>

        <Modal className="bottom-small" isOpen={this.state.modalMobile} toggle={() => this.setState({modalMobile: false})}>
            <ModalBody className="d-flex flex-column justify-content-center">
              <Button onClick={this.changeProfile} className="border-0 bg-transparent py-2 my-2 text-netis-primary">
                <h5>Profil</h5>
              </Button>
              <Button onClick={this.changePass} className="border-0 bg-transparent py-2 my-2 text-netis-primary">
                <h5>Ganti Password</h5>
              </Button>
              <Button onClick={this.props.logout} className="border-0 bg-transparent py-2 my-2 text-danger">
                <h5>Logout</h5>
              </Button>
            </ModalBody>
        </Modal>

        {/*Change Pass*/}
        <Modal isOpen={this.state.modalData} toggle={this.modalData}>
          <ModalBody>
            <h5 className="content-sub-title mb-4">{t("gantipassword")}</h5>

            <Row>
              <div className="col-md-12">
                <FormGroup>
                  <Label htmlFor="current" className="input-label">
                    {t("passwordlama")}
                  </Label>
                  <Input
                    type="password"
                    name="current"
                    id="current"
                    onChange={this.handleChangeCurrent}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="new" className="input-label">
                    {t("passwordbaru")}
                  </Label>
                  <Input
                    type="password"
                    name="new"
                    id="new"
                    onChange={this.handleChangeNew}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="confirm" className="input-label">
                    {t("konfirmasipasswordbaru")}
                  </Label>
                  <Input
                    type="password"
                    name="confirm"
                    id="confirm"
                    onChange={this.handleChangeConfirm}
                  />
                </FormGroup>
              </div>
            </Row>
            <Row>
              <div className="col-8 d-flex justify-content-end"></div>
              <div className="col-4 d-flex justify-content-end">
                <Button
                  className="mr-2"
                  color="white"
                  onClick={this.changePass}
                >
                  {t("batal")}
                </Button>
                <Button
                  type="submit"
                  color="netis-color"
                  onClick={this.cekSubmitData}
                >
                  {t("simpan")}
                </Button>
              </div>
            </Row>
          </ModalBody>
        </Modal>
      </div >
    );
  }
}

DefaultHeader.propTypes = {
  t: PropTypes.func.isRequired,
};
const mapStateToProps = ({ menu: panelMenu, user, token }) => ({
  panelMenu,
  user,
  token,
});
export default connect(mapStateToProps, { logout, setPanel, setUser, getMe })(
  withRouter(translate(DefaultHeader))
);
