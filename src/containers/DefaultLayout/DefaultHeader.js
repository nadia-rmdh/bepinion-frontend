import React, { Component } from "react";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import { Row, Button, Modal, ModalBody, FormGroup, Label, Input, Nav, NavItem, Collapse, Navbar, NavbarToggler } from "reactstrap";
import { AppNavbarBrand } from "@coreui/react";
import { connect } from "react-redux";
import { getMe, logout, setUser } from "../../actions/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { translate } from "react-switch-lang";
import langUtils from "../../utils/language/index";
import * as moment from "moment";
import { DefaultImageUser } from "../../components/DefaultImageUser/DefaultImageUser";
import { Link } from "react-router-dom";
import Logo from '../../assets/brands/logo.png';
import request from "../../utils/request";

class DefaultHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.user,
      session: props.token,
      modalData: false,
      currentPass: "",
      confirmPass: "",
      newPass: "",
      modalMobile: false,
      isMobile: false,
      openDrawer: false,
    };
  }

  componentDidMount = async () => {
    request.get(`v1/user/me`)
      .then(response => {
        this.setState({
          user: response.data.data
        })
      })
  }

  toggleNavbar = () => {
    this.setState({
      openDrawer: !this.state.openDrawer,
    });
  }
  changePass = () => {
    this.setState({
      modalData: !this.state.modalData,
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
  cekSubmitData = (e) => {
    if (this.state.newPass !== this.state.confirmPass) {
      toast.error("Confirmation password do not match", { autoClose: 3000 });
    } else {
      this.submitData();
    }
  };
  submitData = (e) => {
    const dataObject = {
      oldPassword: this.state.currentPass,
      newPassword: this.state.newPass,
    };
    request.put('v1/auth/forgot-password', dataObject)
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
        className="navbar-expand-md fixed-top navbar-pinion"
        light
        style={{ height: '80px' }}
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
            full={{ src: Logo, width: 120, alt: "Pinion Logo" }}
            minimized={{ src: Logo, width: 30, alt: "Pinion Icon" }}
          >
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
                    <a className="custom-nav" href="https://api.whatsapp.com/send?phone=628111788710&text=Saya%20butuh%20bantuan!" target="_blank" rel="noopener noreferrer">
                      {t("Help")}
                    </a>
                  </NavItem>
                </Nav>
              </Collapse>
            </div>
            <div className="d-none d-lg-block round-100 ml-auto text-center border-0" onClick={() => this.setState({ modalMobile: !this.state.modalMobile, isMobile: false })} style={{ cursor: "pointer" }}>
              {this.state.user.avatar
                ? <img src={this.state.user.avatar.replace('http://127.0.0.1:5000', 'https://bepinion.com')} alt="profile" width={35} height={35} style={{ objectFit: 'cover' }} onError={(e) => this.onAvatarError(e)} className="rounded-circle border" />
                : <DefaultImageUser text={this.state.user.role !== 'professional' ? this.state.user.name : this.state.user.firstName + ' ' + this.state.user.lastName} role={this.state.user.role} />
              }
            </div>
            <div className="d-lg-none round-100 ml-auto text-center border-0" onClick={() => this.setState({ modalMobile: !this.state.modalMobile, isMobile: true })} style={{ cursor: "pointer" }}>
              {this.state.user.avatar
                ? <img src={this.state.user.avatar.replace('http://127.0.0.1:5000', 'https://bepinion.com')} alt="profile" width={35} height={35} style={{ objectFit: 'cover' }} onError={(e) => this.onAvatarError(e)} className="rounded-circle border" />
                : <DefaultImageUser text={this.state.user.role !== 'professional' ? this.state.user.name : this.state.user.firstName + ' ' + this.state.user.lastName} role={this.state.user.role} />
              }
            </div>
            <NavbarToggler onClick={this.toggleNavbar} className="ml-3" />
          </Nav>
          <Modal
            isOpen={this.state.openDrawer}
            toggle={this.toggleNavbar}
            className={"modal-drawer"}
          >
            <div className="drawer container">
              <div className="drawer-header pb-2">
                <NavbarToggler
                  onClick={this.toggleNavbar}
                  className="close-drawer ml-auto"
                />
              </div>
              <div className="text-center d-flex flex-column justify-content-center">
                <ul>
                  <NavItem
                    className={`mx-3 ${this.props.location.pathname === '/dashboard' ? 'active-navbar' : ''}`}
                  >
                    <Link className="custom-nav text-pinion-primary" to="/dashboard">
                      {t('Dashboard')}
                    </Link>
                  </NavItem>
                  {this.state.user.role === 'professional' ?
                    <NavItem
                      className={`mx-3 ${this.props.location.pathname === '/project' ? 'active-navbar' : ''}`}
                    >
                      <Link className="custom-nav text-pinion-primary" to="/project">
                        {t("Find Project")}
                      </Link>
                    </NavItem>
                    :
                    <NavItem
                      className={`mx-3 ${this.props.location.pathname === '/professional' ? 'active-navbar' : ''}`}
                    >
                      <Link className="custom-nav text-pinion-primary" to="/professional">
                        {t("Find Professional")}
                      </Link>
                    </NavItem>
                  }
                  <NavItem
                    className={`mx-3 ${this.props.location.pathname === '/help' ? 'active-navbar' : ''}`}
                  >
                    <a className="custom-nav text-pinion-primary" href="https://api.whatsapp.com/send?phone=628111788710&text=Saya%20butuh%20bantuan!" target="_blank" rel="noopener noreferrer">
                      {t("Help")}
                    </a>
                  </NavItem>
                </ul>
              </div>
            </div>
          </Modal>

          <Modal className={this.state.isMobile ? 'bottom-small' : 'right'} isOpen={this.state.modalMobile} toggle={() => this.setState({ modalMobile: false })}>
            <ModalBody className="d-flex flex-column justify-content-center align-items-center">
              {this.state.user.avatar
                ? <img src={this.state.user.avatar.replace('http://127.0.0.1:5000', 'https://bepinion.com')} alt="profile" width={150} height={150} style={{ objectFit: 'cover' }} onError={(e) => this.onAvatarError(e)} className="rounded-circle border mb-3" />
                : <DefaultImageUser text={this.state.user.role !== 'professional' ? this.state.user.name : this.state.user.firstName + ' ' + this.state.user.lastName} role={this.state.user.role} size={75} className="mb-3" />
              }
              <Button onClick={this.changeProfile} className="border-0 bg-transparent py-2 my-2 text-pinion-primary">
                <h5>Profile</h5>
              </Button>
              <Button onClick={this.changePass} className="border-0 bg-transparent py-2 my-2 text-pinion-primary">
                <h5>Change Password</h5>
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
                      Old Password
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
                      New Password
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
                      Confirmation New Password
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
                    color="pinion-color"
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
