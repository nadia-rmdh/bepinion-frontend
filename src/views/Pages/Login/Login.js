import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap";
import { connect } from "react-redux";
import { login } from "../../../actions/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { translate } from "react-switch-lang";
import langUtils from "../../../utils/language/index";

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
    // eslint-disable-next-line
    const regexMatch = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    if(!regexMatch) {
      toast.error('Masukkan email dengan benar')
      return;
    }
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
    return (
      <div className="app flex-row background-login">
        <div className="login-container">
          <Row className="justify-content-center">
            <Col md="12">
              <CardGroup className="shadow border-0 card-login-group mb-0">
                <Card className="card-login-info d-sm-down-none">
                <CardBody className="text-center d-flex flex-column">
                    <div className="login-info mb-5">
                      <img src={require("../../../assets/assets_ari/login-logo.png")} className="login-img" alt="login-img" />
                    </div>
                    <div className="mt-5">
                      <small className="text-white mb-4">Powered by </small><br />
                      <div className="text-center mt-4">
                        {/* <img src={require("../../../assets/logo/logo_pp_white.png")} className="mr-2" alt="logo pp" height={36} /> */}
                        <img src={require("../../../assets/logo/logo_skilloka_white.png")} className="ml-2" alt="logo skilloka" height={36} />
                      </div>
                    </div>
                  </CardBody>
                </Card>
                <Card className="card-login-form mb-0">
                  <CardBody className="flex-column">
                    <form onSubmit={this.handleLogin} className="my-auto input-form">
                      <div className="logo text-center d-none d-md-block">
                        <img
                          src={require("../../../assets/assets_ari/logo.png")}
                          className="logo-appolo"
                          alt="logo-appolo"
                        />
                      </div>
                      <div className="login-form-card">
                      <div className="mb-4 pt-4 text-center d-none d-md-block">
                        <h5>
                          Selamat Datang
                        </h5>
                        <h6>
                          Silahkan masuk dengan akun yang terdaftar
                        </h6>
                      </div>
                      <div className="form-group mt-2 mb-3 relative-input">
                        <Label htmlFor="email" className="d-md-none input-label text-netis-primary">
                          Email
                        </Label>
                        <Input style={{ borderRadius: "8px" }} type="email" id="email" name="email" placeholder="Email" autoFocus inputMode="email" autoComplete="username" onChange={this.handleChange} />
                        <i className="fa fa-envelope icon-inside-left text-netis-primary" />
                      </div>
                      <div className="form-group mb-3 relative-input">
                        <Label htmlFor="password" className="d-md-none input-label text-netis-primary">
                          Sandi
                        </Label>
                          <Input style={{ borderRadius: "8px" }} type={this.state.showPassword ? 'text' : 'password'} id="password" name="password" placeholder="Password" autoComplete="current-password" onChange={this.handleChange} />
                          <i className="fa fa-lock icon-inside-left-password text-netis-primary" />
                          <i className={`fa fa-eye-slash icon-see-password ${!this.state.showPassword && `text-secondary`}`}
                            onClick={() => this.setState({showPassword: !this.state.showPassword})}
                          />
                      </div>
                      <div className="text-right">
                        <Link to="/forgot" style={{ color: '#dc3f46' }}>{t('Lupa Kata Sandi')} ? </Link>
                      </div>
                      <Button
                        className="login-submit"
                        disabled={this.props.isLoading || !this.state.email || !this.state.password}
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
                      </div>
                    </form>
                    <h6 className="mt-2" style={{color:'#616161'}}>
                      Belum memiliki akun? Silahkan&nbsp;
                      <Link to="/register" style={{ color: "#18568B" }}><i>{t("Daftar")}</i></Link>
                    </h6>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
            <Col md="3"></Col>
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  error: state.error,
  isLoading: state.isLoading,
});

export default connect(mapStateToProps, { login })(translate(Login));
