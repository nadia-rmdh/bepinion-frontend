import React, { Component } from "react";
import {
  Button,
  Col,
  // Container,
  Input,
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
    console.log(props)
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
    if (!regexMatch) {
      toast.error('Masukkan email dengan benar')
      return;
    }
    await this.props.login({ email, password });
    this.setState({
      update: "1",
      loading: true,
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
      <div className="d-flex justify-content-center align-items-center login-form">
        <Row>
          <Col md="12">
            <form onSubmit={this.handleLogin} className="my-auto input-form">
              <div className="login-form-card">
                <div className="form-group mt-2 mb-3 position-relative d-flex align-items-center">
                  <Input style={{ borderRadius: "8px" }} type="email" id="email" name="email" placeholder="Email" autoFocus inputMode="email" autoComplete="username" onChange={this.handleChange} />
                  <i className="fa fa-envelope icon-inside-left text-netis-primary" />
                </div>
                <div className="form-group mb-3 position-relative d-flex align-items-center">
                  <Input style={{ borderRadius: "8px" }} type={this.state.showPassword ? 'text' : 'password'} id="password" name="password" placeholder="Password" autoComplete="current-password" onChange={this.handleChange} />
                  <i className="fa fa-lock icon-inside-left text-netis-primary" />
                  <i className={`fa fa-eye-slash icon-see-password ${!this.state.showPassword && `text-secondary`}`}
                    onClick={() => this.setState({ showPassword: !this.state.showPassword })}
                  />
                </div>
                {/* <div className="text-left">
                  <Link to="/forgot" style={{ color: '#dc3f46' }}>{t('Lupa Kata Sandi')} ? </Link>
                </div> */}
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
                    "Masuk"
                  )}
                </Button>
              </div>
            </form>
            <h6 className="mt-2" style={{ color: '#616161' }}>
              Belum memiliki akun? Silahkan <Link to="/register" style={{ color: "#18568B" }}><i>{t("Daftar")}</i></Link>
            </h6>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  error: state.error,
  isLoading: state.isLoading,
});

export default connect(mapStateToProps, { login })(translate(Login));
