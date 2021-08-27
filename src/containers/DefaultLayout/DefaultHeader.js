import React, { Component } from "react";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import { Row, Button, Modal, ModalBody, FormGroup, Label, Input, Nav, NavItem, Collapse, Navbar } from "reactstrap";
import { AppNavbarBrand } from "@coreui/react";
import { connect } from "react-redux";
import { getMe, logout, setUser } from "../../actions/auth";
import Axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { translate } from "react-switch-lang";
import langUtils from "../../utils/language/index";
import * as moment from "moment";
import { DefaultImageUser } from "../../components/DefaultImageUser/DefaultImageUser";
import { Link } from "react-router-dom";

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
      isTour: false,
      forbiddenCompany: false,
      forbiddenUser: false,
      forbiddenInvoice: false,
      modalMobile: false,
      isMobile: false
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

  onSelectFlag = (countryCode) => {
    this.handleSetLanguage(countryCode);
    moment.locale('en');
  };
  handleSetLanguage = (key) => {
    langUtils.setLanguage(key);
  };

  onAvatarError(e) {
    const img = e.target;
    img.onerror = null;
    // img.src = "/assets/img/avatars/avatar-dummy.png";
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
    const { t } = this.props;

    return (

      <Navbar
        color="white"
        className="navbar-expand-md fixed-top navbar-landigpage"
        light
      >
        <div className="container">
          <AppNavbarBrand
            style={{
              // position: "initial",
              top: "unset",
              // left: 0,
              // marginLeft: 10,
              cursor: "pointer"
            }}
            onClick={() => this.changePage("/dashboard")}
          // full={{ src: logo, width: 90, alt: "Idea Collaboration Logo" }}
          // minimized={{ src: icon, width: 30, alt: "Idea Collaboration Icon" }}
          >
            P-Platform
          </AppNavbarBrand>
          <Nav navbar>
            <div className="d-flex">
              <Collapse isOpen={!true} navbar className="mr-5">
                <Nav navbar>
                  <NavItem
                    className={`mx-3 ${this.props.location.pathname === '/dashboard' ? 'active-navbar' : ''}`}
                  >
                    <Link className="custom-nav" to="/dashboard">
                      {t('Dashboard')}
                    </Link>
                  </NavItem>
                  {this.state.user.role === 'professional' ?
                    <NavItem
                      className={`mx-3 ${this.props.location.pathname === '/project' ? 'active-navbar' : ''}`}
                    >
                      <Link className="custom-nav" to="/project">
                        {t("Find Project")}
                      </Link>
                    </NavItem>
                    :
                    <NavItem
                      className={`mx-3 ${this.props.location.pathname === '/professional' ? 'active-navbar' : ''}`}
                    >
                      <Link className="custom-nav" to="/professional">
                        {t("Find Professional")}
                      </Link>
                    </NavItem>
                  }
                  <NavItem
                    className={`mx-3 ${this.props.location.pathname === '/help' ? 'active-navbar' : ''}`}
                  >
                    <Link className="custom-nav" to="/help">
                      {t("Help")}
                    </Link>
                  </NavItem>
                </Nav>
              </Collapse>
            </div>
            <div className="d-none d-lg-block round-100 ml-auto text-center border-0" onClick={() => this.setState({ modalMobile: !this.state.modalMobile, isMobile: false })} style={{ cursor: "pointer" }}>
              {/* <img src={this.state.user.detail.photo} alt="profile" width={35} height={35} style={{ objectFit: 'cover' }} onError={(e) => this.onAvatarError(e)} className="rounded-circle border" /> */}
              <DefaultImageUser text={this.state.user.firstName} />
            </div>
            <div className="d-lg-none round-100 ml-auto text-center border-0" onClick={() => this.setState({ modalMobile: !this.state.modalMobile, isMobile: true })} style={{ cursor: "pointer" }}>
              {/* <img src={this.state.user.detail.photo} alt="profile" width={35} height={35} style={{ objectFit: 'cover' }} onError={(e) => this.onAvatarError(e)} className="rounded-circle border" /> */}
              <DefaultImageUser text={this.state.user.firstName} />
            </div>
          </Nav>

          <Modal className={this.state.isMobile ? 'bottom-small' : 'right'} isOpen={this.state.modalMobile} toggle={() => this.setState({ modalMobile: false })}>
            <ModalBody className="d-flex flex-column justify-content-center">
              <DefaultImageUser text={this.state.user.firstName} size={75} className="mb-3" />
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
      </Navbar>
    );
  }
}

DefaultHeader.propTypes = {
  t: PropTypes.func.isRequired,
};
const mapStateToProps = ({ user, token }) => ({
  user,
  token,
});
export default connect(mapStateToProps, { logout, setUser, getMe })(
  withRouter(translate(DefaultHeader))
);
