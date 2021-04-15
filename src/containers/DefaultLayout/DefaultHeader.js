import React, {
  Component,
  // Fragment
} from "react";
// import { Redirect } from "react-router-dom";
// import { NavLink } from 'react-router-dom';
import { withRouter } from "react-router";
import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  // Col,
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
// import Select from "react-select";
import {
  AppNavbarBrand, AppSidebarToggler,
  // AppSidebarToggler
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
// import { PANEL_ADMIN, PANEL_USER } from "../../constants";
// import NotificationDropdown from "./NotificationDropdown";
import RecruitmentToken from "../../views/Menu/Recruitment/RecruitmentToken";
import request from "../../utils/request";
import Tour from "reactour";
import disableScroll from 'disable-scroll';
import ModalPrivilegeForbidden from "../../components/ModalPrivilegeForbidden";

// setLanguageCookie()
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
      forbiddenCompany:false,
      forbiddenUser:false,
      forbiddenInvoice: false
    };
  }
  changeLanguage = (id) => (e) => {
    e.preventDefault();
    console.log(id);
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
    this.props.history.push("/dashboard");
  };
  changeProfileCompany = async () => {
    if(this.props.user.privileges.includes("canManagementCompany")){
      this.props.history.push("/company");
    }
    else {
      this.setState({forbiddenCompany:true})
    }
  };
  historyInvoices = async () => {
    if(this.props.user.privileges.includes("canManagementTopUp")){
      this.props.history.push("/invoices");
    }
    else {
      this.setState({forbiddenInvoice:true})
    }
    
  }
  manageUser = async () => {
    if(this.props.user.privileges.includes("canManagementUser")){
      this.props.history.push("/manage-user")
    }
    else {
      this.setState({forbiddenUser:true})
    }
  }
  changeUser = async () => {
    await this.props.setPanel("3");
    this.props.history.push("/dashboard");

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
    img.src = "/assets/img/avatars/avatar.png";
    img.style.border = null;
  }
  changePage = (url) => {
    window.location.replace(url);
  };
  resetGuidance = () => {
    request.put('auth/guidance', {guidance: 'replay'})
      .then(() => {
        this.props.getMe();
      })
  }
  checkProfileGuidance = () => {
    if (this.props.user.guidance.layout && this.props.user.guidance.header) {
      if (!this.props.user.guidance.userProfile) {
          window.scroll({ top: 0, behavior: 'smooth' })
          this.setState({isTour:true})
      }
    }
  }
  disableGuideProfile = () => {
    this.setState({isTour:false})
    request.put('auth/guidance', { guidance: 'userProfile' })
        .then(() => {
          this.props.getMe();
        })
  }
  disableBody = () => disableScroll.on();
  enableBody = () => disableScroll.off();

  render() {
    // eslint-disable-next-line
    const { t, user, panelMenu: menu } = this.props;
    const disableGuideProfile = this.disableGuideProfile;
    const accentColor = "#1d5a8e";
    const steps = [
      {
        selector: ".tour-profile",
        content: ({ goTo, inDOM }) => (
            <div>
                <p>
                  Anda dapat melihat dan mengubah informasi perusahaan dengan memilih opsi ini.
                </p>
                <div className="col-12 text-center">
                    <Row>
                        <div className="col-12 text-right p-0">
                            <Button
                                className="mt-2"
                                type="submit"
                                color="netis-color"
                                onClick={() => {
                                    goTo(1)
                                }}
                            >
                                Selanjutnya <i className="fa fa-arrow-right ml-2"></i>
                            </Button>
                        </div>
                    </Row>
                </div>
            </div>
        ),
    },
    {
      selector: ".tour-invoice",
      content: ({ goTo, inDOM }) => (
          <div>
              <p>
                Informasi pembelian token dan invoice pembeliannya dapat dilihat pada opsi ini.
              </p>
              <div className="col-12 text-center">
              <Row>
                  <div className="col-6 text-center p-0">
                  <Button
                      className="mt-2"
                      type="submit"
                      color="netis-color"
                      onClick={() => goTo(0)}
                  >
                      <i className="fa fa-arrow-left mr-2"></i>Sebelumnya
                  </Button>
                  </div>
                  <div className="col-6 text-center p-0">
                  <Button
                      className="mt-2"
                      type="submit"
                      color="netis-color"
                      onClick={() => goTo(2)}
                  >
                      Selanjutnya <i className="fa fa-arrow-right ml-2"></i>
                  </Button>
                  </div>
              </Row>
              </div>
          </div>
      ),
  },
  {
    selector: ".tour-manageuser",
    content: ({ goTo, inDOM }) => (
        <div>
            <p>
              Anda dapat mengelola akses user dalam akun aikrut tersebut.
            </p>
            <div className="col-12 text-center">
            <Row>
                <div className="col-6 text-center p-0">
                <Button
                    className="mt-2"
                    type="submit"
                    color="netis-color"
                    onClick={() => goTo(1)}
                >
                    <i className="fa fa-arrow-left mr-2"></i>Sebelumnya
                </Button>
                </div>
                <div className="col-6 text-center p-0">
                <Button
                    className="mt-2"
                    type="submit"
                    color="netis-color"
                    onClick={() => goTo(3)}
                >
                    Selanjutnya <i className="fa fa-arrow-right ml-2"></i>
                </Button>
                </div>
            </Row>
            </div>
        </div>
    ),
},
  {
    selector: ".tour-password",
    content: ({ goTo, inDOM }) => (
        <div>
            <p>
              Anda bisa mengubah password akun Anda disini.
            </p>
            <div className="col-12 text-center">
            <Row>
                <div className="col-6 text-center p-0">
                <Button
                    className="mt-2"
                    type="submit"
                    color="netis-color"
                    onClick={() => goTo(2)}
                >
                    <i className="fa fa-arrow-left mr-2"></i>Sebelumnya
                </Button>
                </div>
                <div className="col-6 text-center p-0">
                <Button
                    className="mt-2"
                    type="submit"
                    color="netis-color"
                    onClick={() => goTo(4)}
                >
                    Selanjutnya <i className="fa fa-arrow-right ml-2"></i>
                </Button>
                </div>
            </Row>
            </div>
        </div>
    ),
  },
  {
    selector: ".tour-help",
    content: ({ goTo, inDOM }) => (
        <div>
            <p>
              Jika anda ingin melihat panduan penggunaan Aikrut kembali, atau terdapat beberapa 
              panduan yang anda lewatkan, anda dapat mengulangnya kembali melalui tombol ini.
            </p>
            <div className="col-12 text-center">
            <Row>
                <div className="col-6 text-center p-0">
                <Button
                    className="mt-2"
                    type="submit"
                    color="netis-color"
                    onClick={() => goTo(3)}
                >
                    <i className="fa fa-arrow-left mr-2"></i>Sebelumnya
                </Button>
                </div>
                <div className="col-6 text-center p-0">
                <Button
                    className="mt-2"
                    type="submit"
                    color="netis-color"
                    onClick={() => goTo(5)}
                >
                    Selanjutnya <i className="fa fa-arrow-right ml-2"></i>
                </Button>
                </div>
            </Row>
            </div>
        </div>
    ),
  },
  {
    selector: ".tour-logout",
    content: ({ goTo, inDOM }) => (
        <div>
            <p>
              Jika Anda ingin keluar dari sistem, silahkan pilih opsi ini.
            </p>
            <div className="col-12 text-center">
            <Row>
                <div className="col-6 text-center p-0">
                <Button
                    className="mt-2"
                    type="submit"
                    color="netis-color"
                    onClick={() => goTo(4)}
                >
                    <i className="fa fa-arrow-left mr-2"></i>Sebelumnya
                </Button>
                </div>
                <div className="col-6 text-center p-0">
                <Button
                    className="mt-2"
                    type="submit"
                    color="netis-success"
                    onClick={disableGuideProfile}
                >
                    Oke, Saya Paham
                </Button>
                </div>
            </Row>
            </div>
        </div>
    ),
  },
    ]
    return (
      <React.Fragment>
        {this.state.forbiddenCompany && <ModalPrivilegeForbidden isOpen={true} forbidden="canManagementCompany" isClose={() => this.setState({forbiddenCompany:false})} />}
        {this.state.forbiddenUser && <ModalPrivilegeForbidden isOpen={true} forbidden="canManagementUser" isClose={() => this.setState({forbiddenUser:false})} />}
        {this.state.forbiddenInvoice && <ModalPrivilegeForbidden isOpen={true} forbidden="canManagementTopUp" isClose={() => this.setState({forbiddenInvoice:false})} />}
        <Tour
          steps={steps}
          accentColor={accentColor}
          showButtons={false}
          rounded={5}
          isOpen={this.state.isTour}
          disableInteraction={true}
          closeWithMask={false}
          disableFocusLock={true}
          onAfterOpen={this.disableBody}
          onBeforeClose={this.enableBody}
          onRequestClose={this.disableGuideProfile}
        />
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          style={{
            position: "initial",
            top: "unset",
            left: "unset",
            marginLeft: 10,
            cursor: "pointer"
          }}
          onClick={() => this.changePage("/dashboard")}
          full={{ src: logo, width: 110, alt: "Hub Skillana Logo" }}
          minimized={{ src: icon, width: 30, alt: "Hub Skillana Icon" }}
        />
        <Nav navbar>
          <RecruitmentToken visible={true} />
          <UncontrolledDropdown nav direction="down" onClick={this.checkProfileGuidance}  disabled={this.state.isTour}>
            <DropdownToggle nav className="no-hover">
              {this.state.user.avatar === null ? (
                <div
                  className="round-100 ml-auto"
                  style={{
                    backgroundImage: `url(${"../../assets/img/avatars/avatar.png"})`,
                  }}
                ></div>
              ) : (
                  <div
                    className="round-100 ml-auto"
                    style={{
                      backgroundImage: `url(${process.env.REACT_APP_DOMAIN + "" + this.state.user.avatar
                        }), url(${"../../assets/img/avatars/avatar.png"})`,
                    }}
                  ></div>
                )}
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem onClick={this.changeProfileCompany} className="tour-profile" disabled={this.state.isTour}>
                <i className="fa fa-building"></i>Profil Perusahaan
              </DropdownItem>
              <DropdownItem onClick={this.historyInvoices} className="tour-invoice" disabled={this.state.isTour}>
                <i className="fa fa-list-alt" />Daftar Pesanan
              </DropdownItem>
              <DropdownItem onClick={this.manageUser} className="tour-manageuser" disabled={this.state.isTour}>
                <i className="fa fa-users" />Manajemen User
              </DropdownItem>
              <DropdownItem onClick={this.changePass} className="tour-password" disabled={this.state.isTour}>
                <i className="fa fa-key"></i>
                {t("gantipassword")}
              </DropdownItem>
              <DropdownItem onClick={this.resetGuidance} className="tour-help" disabled={this.state.isTour}>
                <i className="fa fa-question" />
                Bantuan
              </DropdownItem>
              <DropdownItem onClick={this.props.logout} className="tour-logout" disabled={this.state.isTour}>
                <i className="fa fa-lock"></i>
                {t("keluar")}
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>

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
      </React.Fragment>
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
