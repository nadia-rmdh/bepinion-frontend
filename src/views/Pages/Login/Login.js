import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Input,
  Row,
  Spinner,
  InputGroup,
  InputGroupAddon,
  // UncontrolledDropdown,
  // DropdownToggle,
  // DropdownMenu,
  // DropdownItem,
} from "reactstrap";
// import ilustration from "../../../assets/assets_ari/5.svg";
import { connect } from "react-redux";
import { login } from "../../../actions/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { translate } from "react-switch-lang";
import langUtils from "../../../utils/language/index";

//import css module
// import "react-flags-select/css/react-flags-select.css";

toast.configure();
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: null,
      update: "0",
      loading: false,
      showPassword: false,
    };
  }

  closeLocalError = () => {
    this.setState({ error: null });
  };
  handleChange = (e) => {
    this.setState({
      update: "0",
      email: `${e.target.name === "email" ? e.target.value.trim() : this.state.email
        }`,
      password: `${e.target.name === "password" ? e.target.value : this.state.password
        }`,
    });
  };
  async loginProcess() {
    var email = this.state.email;
    var password = this.state.password;
    await this.props.login({ email, password });
    this.setState({
      update: "1",
      loading: true,
      password: '',
    });
  }
  handleLogin = (e) => {
    e.preventDefault();
    this.setState({
      loading: true,
    });
    this.loginProcess();
    this.setState({
      loading: false,
    });
  };
  onSelectFlag = (countryCode) => {
    this.handleSetLanguage(countryCode);
  };
  handleSetLanguage = (key) => {
    langUtils.setLanguage(key);
  };
  render() {
    const { t } = this.props;
    // const chooseLanguages = {
    //   ID: "Bahasa Indonesia",
    //   EN: "English (US)",
    // };
    return (
      <div className="app flex-row align-items-center background-login">
        <Container>
          <Row className="justify-content-center">
            <Col md="12">
              <CardGroup className="shadow border-0 card-login-group">
                <Card className="card-login-form">
                  <CardBody className="flex-column">
                    <form onSubmit={this.handleLogin} className="my-auto">
                      <div className="logo text-center">
                        <img
                          src={require("../../../assets/assets_ari/logo.png")}
                          className="logo-widya-skilloka"
                          alt="logo-widya-skilloka"
                        />
                      </div>
                      <div className="mb-4 pt-4 text-center">
                        <h6>
                          Belum punya akun?&nbsp;
                          <Link to="/register" style={{ color: "#18568B" }}><i>{t("Daftar Sekarang")}</i></Link>
                        </h6>
                      </div>
                      <div className="form-group mt-3 mb-3">
                        <label htmlFor="email" className="input-label">Email / {t('telepon')}</label>
                        <Input style={{ borderRadius: "8px" }} type="text" id="email" name="email" placeholder={"Email / " + t('telepon')} autoFocus inputMode="email" autoComplete="username" onChange={this.handleChange} />
                      </div>
                      <div className="form-group mb-3">
                        <label htmlFor="email" className="input-label">Password</label>
                        <InputGroup style={{ borderRadius: "8px" }}>
                          <Input type={this.state.showPassword ? 'text' : 'password'} id="password" name="password" placeholder="Password" autoComplete="current-password" onChange={this.handleChange} />
                          <InputGroupAddon addonType="append">
                            <Button type="button"
                              tabIndex="-1"
                              onMouseUp={() => this.setState({ showPassword: false })}
                              onMouseOut={() => this.state.showPassword && this.setState({ showPassword: false })}
                              onTouchStart={() => this.setState({ showPassword: true })}
                              onTouchCancel={() => this.state.showPassword && this.setState({ showPassword: false })}
                              onTouchEnd={() => this.state.showPassword && this.setState({ showPassword: false })}
                              onMouseDown={() => this.setState({ showPassword: true })}
                              className="button-addon input-group-text input-group-transparent" style={{ boxShadow: 'none' }}>
                              {this.state.showPassword ? <i className="fa fa-eye-slash"></i> : <i className="fa fa-eye"></i>}
                            </Button>
                          </InputGroupAddon>
                        </InputGroup>
                      </div>
                      <div className="text-right">
                        <Link to="/forgot" style={{ color: '#dc3f46' }}>{t('lupapassword')} ? </Link>
                      </div>
                      <Button
                        className="login-submit"
                        disabled={this.props.isLoading}
                        style={{ borderRadius: "8px" }}
                      >
                        {this.props.isLoading ? (
                          <>
                            <Spinner color="light" size="sm" /> Loading
                          </>
                        ) : (
                            "Login"
                          )}
                      </Button>
                    </form>
                  </CardBody>
                </Card>
                <Card className="card-login-info d-md-down-none">
                  <CardBody className="text-center">
                    <div className="login-info">
                      <img src={require("../../../assets/assets_ari/login-background.png")} className="login-img" alt="login-img" />
                      <h2>Selamat datang di aikrut.id</h2>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
            <Col md="3"></Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  error: state.error,
  isLoading: state.isLoading,
});

export default connect(mapStateToProps, { login })(translate(Login));
