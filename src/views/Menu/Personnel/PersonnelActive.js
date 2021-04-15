import React, { Component, Fragment } from "react";
import {
  Table,
  Col,
  Row,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input,
  Button,
  Modal,
  ModalBody,
  FormGroup,
  Label,
  Spinner,
} from "reactstrap";
import LoadingAnimation from '../../../components/LoadingAnimation';
import DataNotFound from '../../../components/DataNotFound';
import Axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import "rc-datepicker/lib/style.css";
import "react-toastify/dist/ReactToastify.css";
import { translate } from "react-switch-lang";
import { DatePickerInput } from "rc-datepicker";
toast.configure();
class PersonnelActive extends Component {
  constructor(props) {
    super(props);
    // const roles = [
    //   { id: 3, name: "User" },
    //   { id: 2, name: "Admin" },
    // ];
    this.state = {
      dropdownOpen: [false, false],
      modalAddData: false,
      loading: false,
      LoadingAnimation: false,
      notFound: false,
      personnels: [],
      genders: [],
      units: [],
      jobs: [],
      search: null,
      session: props.token,
      roles: [],
      dataObject: {
        fullName: "",
        nickName: "",
        phone: "",
        email: "",
        place: "",
        date: "",
        parent: "",
        roleId: "",
        jobId: "",
        unitId: "",
        active: 1,
        isUnitHead: false,
      },
      userPrivileges: props.user.privileges,
    };
    this.modalAddData = this.modalAddData.bind(this);
  }

  searchSpace = (event) => {
    let keyword = event.target.value;
    this.setState({
      search: keyword,
    });
  };

  componentDidMount() {
    this.setState({ LoadingAnimation: true });
    Axios.all([
      Axios.get(process.env.REACT_APP_DOMAIN + `/api/v1/personnels/all/aktif`, {
        headers: { Authorization: `Bearer ${this.state.session}` },
      }),
      Axios.get(
        process.env.REACT_APP_DOMAIN + `/api/v1/master/genders?all=true`,
        { headers: { Authorization: `Bearer ${this.state.session}` } }
      ),
      Axios.get(process.env.REACT_APP_DOMAIN + `/api/v1/master/units`, {
        headers: { Authorization: `Bearer ${this.state.session}` },
      }),
      Axios.get(process.env.REACT_APP_DOMAIN + `/api/v1/master/jobs`, {
        headers: { Authorization: `Bearer ${this.state.session}` },
      }),
      Axios.get(process.env.REACT_APP_DOMAIN + `/api/v1/master/roles`, {
        headers: { Authorization: `Bearer ${this.state.session}` },
      }),
    ])
      .then(
        Axios.spread((res1, res2, res3, res4, res5) => {
          const personnels = res1.data.data;
          const genders = res2.data.data;
          const units = res3.data.data;
          const jobs = res4.data.data;
          const roles = res5.data.data;
          this.setState({ personnels, genders, units, jobs, roles, LoadingAnimation: false, });
        })
      )
      .catch((error) => {
        console.log(error.response);
        this.setState({ LoadingAnimation: false, notFound: true });
      });
  }

  modalAddData = () => {
    if (!this.state.userPrivileges.includes("add-employee")) {
      toast.error("Maaf anda tidah boleh melakukan aksi ini.");
      return;
    }
    this.setState({
      modalAddData: !this.state.modalAddData,
    });
  };
  handleCheck = (event) => {
    let dataObject = {
      ...this.state.dataObject,
    };
    dataObject[event.target.name] = !this.state.dataObject.isUnitHead;
    this.setState(
      {
        dataObject: dataObject,
      },
      () => {
        console.log(dataObject);
      }
    );
  };
  handleChange = (event) => {
    let dataObject = {
      ...this.state.dataObject,
      fullName: `${event.target.name === "fullName"
        ? event.target.value
        : this.state.dataObject.fullName
        }`,
      nickName: `${event.target.name === "nickName"
        ? event.target.value
        : this.state.dataObject.nickName
        }`,
      phone: `${event.target.name === "phone"
        ? event.target.value
        : this.state.dataObject.phone
        }`,
      email: `${event.target.name === "email"
        ? event.target.value.trim()
        : this.state.dataObject.email
        }`,
      place: `${event.target.name === "place"
        ? event.target.value
        : this.state.dataObject.place
        }`,
      // date: `${event.target.name === "date"
      //   ? event.target.value
      //   : this.state.dataObject.date
      //   }`,
      parent: `${event.target.name === "parent"
        ? event.target.value
        : this.state.dataObject.parent
        }`,
      roleId: `${event.target.name === "roleId"
        ? event.target.value
        : this.state.dataObject.roleId ?? this.state.roles[0].id
        }`,
      jobId: `${event.target.name === "jobId"
        ? event.target.value
        : this.state.dataObject.jobId
        }`,
      unitId: `${event.target.name === "unitId"
        ? event.target.value
        : this.state.dataObject.unitId
        }`,
    };
    this.setState({
      dataObject: dataObject,
    });
  };

  // handleChangeFilter = (name, date) => {
  //   let newDate = { ...this.state.dataObject }
  //   newDate[name] = date
  //   this.setState({ 
  //     dataObject:{
  //       date: newDate
  //     }
  //   })
  // }

  addDataToAPI = () => {
    if (!this.state.userPrivileges.includes("add-employee")) {
      toast.error("Maaf anda tidah boleh melakukan aksi ini.");
      return;
    }
    this.setState({
      loading: true,
    });
    let dataObject = { ...this.state.dataObject };
    if (dataObject["isUnitHead"] === true) {
      dataObject["isUnitHead"] = "true";
    } else {
      dataObject["isUnitHead"] = "false";
    }
    console.log(dataObject)
    Axios.post(
      process.env.REACT_APP_DOMAIN + "/api/v1/personnels",
      dataObject,
      { headers: { Authorization: `Bearer ${this.state.session}` } }
    )
      .then((res) => {
        let newPost = res.data.data;
        let newData = [...this.state.personnels, newPost];
        setTimeout(() => {
          this.setState({
            personnels: newData,
            modalAddData: !this.state.modalAddData,
            loading: false,
          });
          toast.success("Success", { autoClose: 3000 });
        }, 500);
      })
      .catch((error) => {
        setTimeout(() => {
          this.setState({
            loading: false,
          });
          if (error.response.status === 422) {
            const errorMessage = error.response.data.errors;
            // eslint-disable-next-line
            Object.keys(errorMessage).map((key, index) => {
              if (key === "fullName")
                toast.error("The name field is required.", { autoClose: 3000 });
              else if (key === "nickName")
                toast.error("The nick name field is required.", {
                  autoClose: 3000,
                });
              else if (key === "phone")
                toast.error("The phone field is required", { autoClose: 3000 });
              else if (key === "roleId")
                toast.error("Role User field is required", { autoClose: 3000 });
              else if (key === "jobId")
                toast.error("Position User field is required", {
                  autoClose: 3000,
                });
              else if (key === "unitId")
                toast.error("Unit User field is required", { autoClose: 3000 });
              else if (key === "email") {
                if (errorMessage.email === "The email field is required.")
                  toast.error("The email field is required.", {
                    autoClose: 3000,
                  });
                if (
                  errorMessage.email ===
                  "The email field must contain a unique value."
                )
                  toast.error("The email field must contain a unique value", {
                    autoClose: 3000,
                  });
                if (
                  errorMessage.email ===
                  "The email field must contain a valid email address."
                )
                  toast.error(
                    "The email field must contain a valid email address",
                    { autoClose: 3000 }
                  );
              }
            });
          }
        }, 500);
      });
  };

  render() {
    let verif = "";
    const { t } = this.props;
    let statuslabel;
    // eslint-disable-next-line
    const personnelList = this.state.personnels
      .filter((data) => {
        if (this.state.search === null) return data;
        else if (
          (data.fullName || "")
            .toLowerCase()
            .includes(this.state.search.toLowerCase())
        ) {
          return data;
        }

        return false;
      })
      .map((data, idx) => {
        if (data.verif === "verified") {
          verif = t("diverifikasi");
        } else {
          verif = t("belumdiverifikasi");
        }
        if (data.status === "permanen") {
          statuslabel = t("pekerjatetap");
        } else if (data.status === "kontrak") {
          statuslabel = t("pekerjakontrak");
        } else if (data.status === "magang") {
          statuslabel = t("magang");
        } else if (data.status === "pekerja lepas") {
          statuslabel = t("pekerjalepas");
        }
        return (
          <tr key={idx}>
            <td className="text-center">{idx + 1}</td>
            <td>
              <Link
                to={"/personnels/" + data.id}
                className={`personnel-name${this.state.userPrivileges.includes("read-employee")
                  ? ""
                  : " d-none"
                  }`}
              >
                {data.fullName}
              </Link>
            </td>
            <td>{data.phone}</td>
            <td>{data.email}</td>
            <td>{data.unit.name}</td>
            <td>{statuslabel}</td>
            <td>{verif}</td>
          </tr>
        );
      });

    return (
      <div className="animated fadeIn">
        <Row className="justify-content-between align-items-center md-company-header mb-3">
          <Col col="4" sm="4" md="4" xl></Col>
          <Col col="8" sm="8" md="8" className="d-flex justify-content-end">
            <InputGroup className="mr-3">
              <InputGroupAddon addonType="prepend">
                <InputGroupText className="input-group-transparent">
                  <i className="fa fa-search"></i>
                </InputGroupText>
              </InputGroupAddon>
              <Input
                type="text"
                placeholder="Search"
                className="input-search"
                onChange={(e) => this.searchSpace(e)}
              />
            </InputGroup>
            <Button
              className={`${this.state.userPrivileges.includes("add-employee")
                ? ""
                : " d-none"
                }`}
              color="netis-color"
              onClick={this.modalAddData}
            >
              <i className="fa fa-plus mr-2"></i>
              {t("tambah")} Data
            </Button>
          </Col>
        </Row>
        <Row>
          <Col xs="12" lg="12">
            <Table responsive>
              <thead>
                <tr>
                  <th className="text-center w-5">No.</th>
                  <th className="w-30">{t("karyawan")}</th>
                  <th className="w-15">{t("telepon")}</th>
                  <th className="w-15">Email</th>
                  <th className="w-20">Unit</th>
                  <th className="w-20">{t("kontrakstatus")}</th>
                  <th className="w-20">Status</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.LoadingAnimation ?
                  <LoadingAnimation />
                  : this.state.notFound ?
                  <DataNotFound />
                  : personnelList
                }
              </tbody>

            </Table>
          </Col>
        </Row>

        {/* Modal Box Add Data */}
        <Modal
          isOpen={this.state.modalAddData}
          toggle={this.modalAddData}
          className={"modal-lg " + this.props.className}
        >
          <ModalBody>
            <h5 className="content-sub-title mb-4">
              {t("tambah")} Data {t("karyawan")}
            </h5>
            <Row>
              <div className="col-md-6">
                <FormGroup>
                  <Label htmlFor="fullName" className="input-label">
                    <b>{t("namalengkap")}</b>
                  </Label>
                  <Input
                    type="text"
                    name="fullName"
                    id="fullName"
                    placeholder={t("namalengkap")}
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </div>
              <div className="col-md-6">
                <FormGroup>
                  <Label htmlFor="nickName" className="input-label">
                    <b>{t("namapanggilan")}</b>
                  </Label>
                  <Input
                    type="text"
                    name="nickName"
                    id="nickName"
                    placeholder={t("namapanggilan")}
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </div>
            </Row>
            <Row>
              <div className="col-md-6">
                <FormGroup>
                  <Label htmlFor="phone" className="input-label">
                    <b>{t("telepon")}</b>
                  </Label>
                  <Input
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder={t("telepon")}
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </div>
              <div className="col-md-6">
                <FormGroup>
                  <Label htmlFor="email" className="input-label">
                    <b>Email</b>
                  </Label>
                  <Input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Email"
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </div>
            </Row>
            <Row>
              <div className="col-md-6">
                <FormGroup>
                  <Label htmlFor="place" className="input-label">
                    <b>{t("Tempat Lahir")}</b>
                  </Label>
                  <Input
                    type="text"
                    name="place"
                    id="place"
                    placeholder={t("Tempat Lahir")}
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </div>
              <div className="col-md-6">
                <FormGroup>
                  <Label htmlFor="email" className="input-label">
                    <b>{t("Tanggal Lahir")}</b>
                  </Label>
                  <DatePickerInput
                    name="date"
                    id="date"
                    showOnInputClick={true}
                    closeOnClickOutside={true}
                    onChange={(value) => this.setState({dataObject : {...this.state.dataObject, date:value}})}
                    // onClear={onDatepickerClear}
                    // value={values.dateOfBirth}
                    className='my-custom-datepicker-component'
                    displayFormat="DD MMMM YYYY"
                    readOnly
                    maxDate={new Date()}
                  />
                </FormGroup>
              </div>
            </Row>

            <Row>
              <div className="col-md-6">
                <FormGroup>
                  <Label htmlFor="roleId" className="input-label">
                    <b>{t("Jenis User")}</b>
                  </Label>
                  <Input
                    type="select"
                    name="roleId"
                    id="roleId"
                    onChange={this.handleChange}
                  >
                    <option value={null}>User</option>
                    {this.state.roles.map((data, idx) => {
                      return (
                        <option key={idx} value={data.id}>
                          {data.name}
                        </option>
                      );
                    })}
                  </Input>
                </FormGroup>
              </div>
              <div className="col-md-6">
                <FormGroup>
                  <Label htmlFor="parent" className="input-label">
                    <b>{t("atasan")}</b>
                  </Label>
                  <Input
                    type="select"
                    name="parent"
                    id="parent"
                    onChange={this.handleChange}
                  >
                    <option value={null}>-- {t("tidakadaatasan")} --</option>
                    {this.state.personnels.map((data, idx) => {
                      return (
                        <option key={idx} value={data.id}>
                          {data.fullName}
                        </option>
                      );
                    })}
                  </Input>
                </FormGroup>
              </div>
            </Row>
            <Row>
              <div className="col-md-6">
                <FormGroup>
                  <Label htmlFor="jobId" className="input-label">
                    <b>{t("jabatan")}</b>
                  </Label>
                  <Input
                    type="select"
                    name="jobId"
                    id="jobId"
                    onChange={this.handleChange}
                  >
                    <option value={null}>
                      {t("pilih")} {t("jabatan")}
                    </option>
                    {this.state.jobs.map((data, idx) => {
                      return (
                        <option key={idx} value={data.id}>
                          {data.name}
                        </option>
                      );
                    })}
                  </Input>
                </FormGroup>
              </div>
              <div className="col-md-6">
                <FormGroup style={{ marginBottom: 5 }}>
                  <Label htmlFor="unitId" className="input-label">
                    <b>Unit</b>
                  </Label>
                  <Input
                    type="select"
                    name="unitId"
                    id="unitId"
                    onChange={this.handleChange}
                  >
                    <option value={null}>{t("pilih")} Unit</option>
                    {this.state.units.map((data, idx) => {
                      return (
                        <option key={idx} value={data.id}>
                          {data.name}
                        </option>
                      );
                    })}
                  </Input>
                </FormGroup>
                {/* <FormGroup check inline >
                                    <Input className="form-check-input" type="checkbox" id="isUnitHead" name="isUnitHead" onChange={this.handleCheck} />
                                    <Label className="form-check-label" check htmlFor="isUnitHead" style={{ fontSize: 12 }}> Karyawan tersebut Kepala Unit</Label>
                                </FormGroup> */}
              </div>
            </Row>

            <Row>
              <div className="col-12 d-flex justify-content-end">
                {this.state.loading ? (
                  <Spinner color="dark" size="sm" />
                ) : (
                    <Fragment>
                      <Button
                        className="mr-2"
                        color="white"
                        onClick={this.modalAddData}
                      >
                        {t("batal")}
                      </Button>
                      <Button
                        type="submit"
                        color="netis-color"
                        style={{ width: "67px" }}
                        onClick={this.addDataToAPI}
                      >
                        {t("simpan")}
                      </Button>
                    </Fragment>
                  )}
              </div>
            </Row>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.token,
    user: state.user,
  };
};
export default connect(mapStateToProps)(translate(PersonnelActive));
