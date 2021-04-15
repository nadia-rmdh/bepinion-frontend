import React, { Component, Fragment } from "react";
import { Row, Button, FormGroup, Input, Label, Spinner } from "reactstrap";
import axios from "axios";
import Select from "react-select";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { translate } from "react-switch-lang";
toast.configure();
class CompanyInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: [false, false],
      session: props.token,
      loading: false,
      editDetail: false,
      editAddress: false,
      companies: [],
      companyTypes: [],
      companyCountry: [],
      companyProvince: [],
      companyCity: [],
      companyDistrict: [],
      companyVillage: [],
      name: "",
      email: "",
      domain: "",
      taxNumber: "",
      phone: "",
      description: "",
      type: {
        value: "",
        label: "",
      },
      parent: {
        value: "",
        label: "",
      },
      tempName: "",
      tempEmail: "",
      tempDomain: "",
      tempTaxNumber: "",
      tempPhone: "",
      tempDescription: "",
      tempType: {
        value: "",
        label: "",
      },
      tempParent: {
        value: "",
        label: "",
      },
      address: "",
      postalCode: "",
      country: {
        value: "",
        label: "",
      },
      province: {
        value: "",
        label: "",
      },
      city: {
        value: "",
        label: "",
      },
      district: {
        value: "",
        label: "",
      },
      village: {
        value: "",
        label: "",
      },
      tempAddress: "",
      tempPostalCode: "",
      tempCountry: {
        value: "",
        label: "",
      },
      tempProvince: {
        value: "",
        label: "",
      },
      tempCity: {
        value: "",
        label: "",
      },
      tempDistrict: {
        value: "",
        label: "",
      },
      tempVillage: {
        value: "",
        label: "",
      },
      image: {
        preview: "",
        raw: "",
      },
      avatar: "",
      userPrivileges: this.props.user.privileges,
    };
    this.onChangeAvatar = this.onChangeAvatar.bind(this);
  }

  componentDidMount() {
    this.getDataCompany();
    this.getCompanyType();
    this.getCompanyCountry();
  }

  getDataCompany = () => {
    axios
      .get(process.env.REACT_APP_DOMAIN + `/api/v1/company`, {
        headers: { Authorization: `Bearer ${this.state.session}` },
      })
      .then((res) => {
        const companies = res.data.data[0];
        this.setState({
          name: companies.name,
          email: companies.email,
          domain: companies.domain,
          taxNumber: companies.taxNumber,
          phone: companies.phone,
          description: companies.description,
          avatar: companies.logo,
          parent: {
            value: companies.parent.id,
            label: companies.parent.name,
          },
          type: {
            value: companies.type.id,
            label: companies.type.name,
          },
          tempName: companies.name,
          tempEmail: companies.email,
          tempDomain: companies.domain,
          tempTaxNumber: companies.taxNumber,
          tempPhone: companies.phone,
          tempDescription: companies.description,
          tempParent: {
            value: companies.parent.id,
            label: companies.parent.name,
          },
          tempType: {
            value: companies.type.id,
            label: companies.type.name,
          },
          address: companies.address,
          postalCode: companies.postalCode,
          country: {
            value: companies.country.id,
            label: companies.country.name,
          },
          province: {
            value: companies.province.id,
            label: companies.province.name,
          },
          city: {
            value: companies.city.id,
            label: companies.city.name,
          },
          district: {
            value: companies.district.id,
            label: companies.district.name,
          },
          village: {
            value: companies.village.id,
            label: companies.village.name,
          },
          tempAddress: companies.address,
          tempPostalCode: companies.postalCode,
          tempCountry: {
            value: companies.country.id,
            label: companies.country.name,
          },
          tempProvince: {
            value: companies.province.id,
            label: companies.province.name,
          },
          tempCity: {
            value: companies.city.id,
            label: companies.city.name,
          },
          tempDistrict: {
            value: companies.district.id,
            label: companies.district.name,
          },
          tempVillage: {
            value: companies.village.id,
            label: companies.village.name,
          },
        });
        if (
          this.state.country.value === null ||
          this.state.country.value === 0
        ) {
          this.setState({
            country: {
              value: null,
              label: null,
            },
          });
        }
        if (
          this.state.tempCountry.value === null ||
          this.state.tempCountry.value === 0
        ) {
          this.setState({
            tempCountry: {
              value: null,
              label: null,
            },
          });
        }
        if (
          this.state.province.value === null ||
          this.state.province.value === 0
        ) {
          this.setState({
            province: {
              value: null,
              label: null,
            },
          });
        }
        if (
          this.state.tempProvince.value === null ||
          this.state.tempProvince.value === 0
        ) {
          this.setState({
            tempProvince: {
              value: null,
              label: null,
            },
          });
        }
        if (this.state.city.value === null || this.state.city.value === 0) {
          this.setState({
            city: {
              value: null,
              label: null,
            },
          });
        }
        if (
          this.state.tempCity.value === null ||
          this.state.tempCity.value === 0
        ) {
          this.setState({
            tempCity: {
              value: null,
              label: null,
            },
          });
        }
        if (
          this.state.district.value === null ||
          this.state.district.value === 0
        ) {
          this.setState({
            district: {
              value: null,
              label: null,
            },
          });
        }
        if (
          this.state.tempDistrict.value === null ||
          this.state.tempDistrict.value === 0
        ) {
          this.setState({
            tempDistrict: {
              value: null,
              label: null,
            },
          });
        }
        if (
          this.state.village.value === null ||
          this.state.village.value === 0
        ) {
          this.setState({
            village: {
              value: null,
              label: null,
            },
          });
        }
        if (
          this.state.tempVillage.value === null ||
          this.state.tempVillage.value === 0
        ) {
          this.setState({
            tempVillage: {
              value: null,
              label: null,
            },
          });
        }
        this.getCompanyProvince(this.state.country.value);
        this.getCompanyCity(this.state.province.value);
        this.getCompanyDistrict(this.state.city.value);
        this.getCompanyVillage(this.state.district.value);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  getCompanyType = () => {
    axios
      .get(process.env.REACT_APP_DOMAIN + `/api/v1/master/company-types`, {
        headers: { Authorization: `Bearer ${this.state.session}` },
      })
      .then((res) => {
        const companies = res.data.data;
        this.setState({
          companyTypes: companies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  onChangeAvatar(e) {
    e.preventDefault();
    if (e.target.files.length) {
      var preview = { ...this.state.image };
      preview["preview"] = URL.createObjectURL(e.target.files[0]);
      this.setState({
        avatar: e.target.files[0],
        image: preview,
      });
    }
  }
  getCompanyCountry = () => {
    axios
      .get(process.env.REACT_APP_DOMAIN + `/api/v1/location/countries`, {
        headers: { Authorization: `Bearer ${this.state.session}` },
      })
      .then((res) => {
        const companies = res.data.data;
        this.setState({
          companyCountry: companies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  getCompanyProvince = (id) => {
    axios
      .get(
        process.env.REACT_APP_DOMAIN +
          `/api/v1/location/provinces?countryId=` +
          id,
        { headers: { Authorization: `Bearer ${this.state.session}` } }
      )
      .then((res) => {
        const companies = res.data.data;
        this.setState({
          companyProvince: companies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  getCompanyCity = (id) => {
    axios
      .get(
        process.env.REACT_APP_DOMAIN +
          `/api/v1/location/cities?provinceId=` +
          id,
        { headers: { Authorization: `Bearer ${this.state.session}` } }
      )
      .then((res) => {
        const companies = res.data.data;
        this.setState({
          companyCity: companies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  getCompanyDistrict = (id) => {
    axios
      .get(
        process.env.REACT_APP_DOMAIN +
          `/api/v1/location/districts?cityId=` +
          id,
        { headers: { Authorization: `Bearer ${this.state.session}` } }
      )
      .then((res) => {
        const companies = res.data.data;
        this.setState({
          companyDistrict: companies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  getCompanyVillage = (id) => {
    axios
      .get(
        process.env.REACT_APP_DOMAIN +
          `/api/v1/location/villages?districtId=` +
          id,
        { headers: { Authorization: `Bearer ${this.state.session}` } }
      )
      .then((res) => {
        const companies = res.data.data;
        this.setState({
          companyVillage: companies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  editDetail = () => {
    if (!this.state.userPrivileges.includes("edit-company-profile")) {
      toast.error("Maaf anda tidah boleh melakukan aksi ini.");
      return;
    }
    this.setState({
      editDetail: true,
      editAddress: false,
    });
  };

  editAddress = () => {
    if (!this.state.userPrivileges.includes("edit-company-profile")) {
      toast.error("Maaf anda tidah boleh melakukan aksi ini.");
      return;
    }
    this.setState({
      editDetail: false,
      editAddress: true,
    });
  };

  onChangeType(value) {
    this.setState({ type: value });
  }

  onChange = (e) => {
    e.preventDefault();
    if (e.target.name === "nama-perusahaan")
      this.setState({ name: e.target.value });
    if (e.target.name === "email-perusahaan")
      this.setState({ email: e.target.value });
    if (e.target.name === "nomor-pajak")
      this.setState({ taxNumber: e.target.value });
    if (e.target.name === "phone-perusahaan")
      this.setState({ phone: e.target.value });
    if (e.target.name === "domain-perusahaan")
      this.setState({ domain: e.target.value });
    if (e.target.name === "pos-code")
      this.setState({ postalCode: e.target.value });
    if (e.target.name === "description")
      this.setState({ description: e.target.value });
    if (e.target.name === "address") this.setState({ address: e.target.value });
  };

  onChangeCountry(value) {
    this.setState({
      country: value,
      province: {
        value: null,
        name: null,
      },
      city: {
        value: null,
        name: null,
      },
      district: {
        value: null,
        name: null,
      },
      village: {
        value: null,
        name: null,
      },
    });
    this.getCompanyProvince(value.value);
  }
  onChangeProvince(value) {
    this.setState({
      province: value,
      city: {
        value: null,
        name: null,
      },
      district: {
        value: null,
        name: null,
      },
      village: {
        value: null,
        name: null,
      },
    });

    this.getCompanyCity(value.value);
  }

  onChangeCity(value) {
    this.setState({
      city: value,
      district: {
        value: null,
        name: null,
      },
      village: {
        value: null,
        name: null,
      },
    });
    this.getCompanyDistrict(value.value);
  }

  onChangeDistrict(value) {
    this.setState({
      district: value,
      village: {
        value: null,
        name: null,
      },
    });
    this.getCompanyVillage(value.value);
  }

  onChangeVillage(value) {
    this.setState({ village: value });
  }

  cancelEditDetail = () => {
    this.setState({
      name: this.state.tempName,
      email: this.state.tempEmail,
      domain: this.state.tempDomain,
      parent: this.state.tempParent,
      type: this.state.tempType,
      taxNumber: this.state.tempTaxNumber,
      phone: this.state.tempPhone,
      description: this.state.tempDescription,
      editDetail: false,
    });
  };

  cancelEditAddress = () => {
    this.setState({
      address: this.state.tempAddress,
      postalCode: this.state.tempPostalCode,
      country: this.state.tempCountry,
      province: this.state.tempProvince,
      city: this.state.tempCity,
      district: this.state.tempDistrict,
      village: this.state.tempVillage,
      editAddress: false,
    });
  };

  editProfileCompany(e) {
    if (!this.state.userPrivileges.includes("edit-company-profile")) {
      toast.error("Maaf anda tidah boleh melakukan aksi ini.");
      return;
    }
    this.setState({ loading: true });
    e.preventDefault();
    if (this.state.image.preview !== "") {
      var formData = new FormData();
      formData.append("logo", this.state.avatar, this.state.avatar.name);
      axios
        .post(process.env.REACT_APP_DOMAIN + "/api/v1/company", formData, {
          headers: { Authorization: `Bearer ${this.state.session}` },
        })
        .then((res) => {
          const dataObject = {
            name: this.state.name,
            parent: this.state.parent.value,
            domain: this.state.domain,
            email: this.state.email,
            type: this.state.type.value,
            taxNumber: this.state.taxNumber,
            phone: this.state.phone,
            description: this.state.description,
          };
          axios
            .put(process.env.REACT_APP_DOMAIN + "/api/v1/company", dataObject, {
              headers: { Authorization: `Bearer ${this.state.session}` },
            })
            .then((res) => {
              setTimeout(() => {
                this.setState({
                  loading: false,
                  tempName: this.state.name,
                  tempEmail: this.state.email,
                  tempDomain: this.state.domain,
                  tempTaxNumber: this.state.taxNumber,
                  tempPhone: this.state.phone,
                  tempDescription: this.state.description,
                  tempParent: {
                    value: this.state.parent.value,
                    label: this.state.parent.label,
                  },
                  tempType: {
                    value: this.state.type.value,
                    label: this.state.type.label,
                  },
                  editDetail: false,
                });
                toast.success("Success", { autoClose: 3000 });
              }, 500);
            })
            .catch((error) => {
              setTimeout(() => {
                this.setState({ loading: false });
              }, 500);
              if (error.response.status === 422) {
                toast.error("Error", { autoClose: 3000 });
                // alert('Perusahaan Induk Cannot be parent');
              }
            });
        })
        .catch((error) => {
          setTimeout(() => {
            this.setState({ loading: false });
          }, 500);
          toast.error(error.response.data.errors.message, { autoClose: 3000 });
        });
    } else {
      const dataObject = {
        name: this.state.name,
        parent: this.state.parent.value,
        domain: this.state.domain,
        email: this.state.email,
        type: this.state.type.value,
        taxNumber: this.state.taxNumber,
        phone: this.state.phone,
        description: this.state.description,
      };
      axios
        .put(process.env.REACT_APP_DOMAIN + "/api/v1/company", dataObject, {
          headers: { Authorization: `Bearer ${this.state.session}` },
        })
        .then((res) => {
          setTimeout(() => {
            this.setState({
              loading: false,
              tempName: this.state.name,
              tempEmail: this.state.email,
              tempDomain: this.state.domain,
              tempTaxNumber: this.state.taxNumber,
              tempPhone: this.state.phone,
              tempDescription: this.state.description,
              tempParent: {
                value: this.state.parent.value,
                label: this.state.parent.label,
              },
              tempType: {
                value: this.state.type.value,
                label: this.state.type.label,
              },
              editDetail: false,
            });
            toast.success("Success", { autoClose: 3000 });
          }, 500);
        })
        .catch((error) => {
          setTimeout(() => {
            this.setState({ loading: false });
          }, 500);
          if (error.response.status === 422) {
            toast.error("Error", { autoClose: 3000 });
            // alert('Perusahaan Induk Cannot be parent');
          }
        });
    }
  }

  editAddressCompany(e) {
    if (!this.state.userPrivileges.includes("edit-company-profile")) {
      toast.error("Maaf anda tidah boleh melakukan aksi ini.");
      return;
    }
    this.setState({ loading: true });
    e.preventDefault();

    const dataObject = {
      address: this.state.address,
      postalCode: this.state.postalCode,
      country: this.state.country.value,
      province: this.state.province.value,
      city: this.state.city.value,
      district: this.state.district.value,
      village: this.state.village.value,
    };
    axios
      .put(process.env.REACT_APP_DOMAIN + "/api/v1/company", dataObject, {
        headers: { Authorization: `Bearer ${this.state.session}` },
      })
      .then((res) => {
        setTimeout(() => {
          this.setState({
            loading: false,
            tempAddress: this.state.AdtempAddress,
            tempPostalCode: this.state.postempPostalCode,
            tempCountry: {
              value: this.state.country.value,
              label: this.state.country.label,
            },
            tempProvince: {
              value: this.state.province.value,
              label: this.state.province.label,
            },
            tempCity: {
              value: this.state.city.value,
              label: this.state.city.label,
            },
            tempDistrict: {
              value: this.state.district.value,
              label: this.state.district.label,
            },
            tempVillage: {
              value: this.state.village.value,
              label: this.state.village.label,
            },
            editAddress: false,
          });
          toast.success("Success", { autoClose: 3000 });
        }, 500);
      })
      .catch((error) => {
        setTimeout(() => {
          this.setState({ loading: false });
        }, 500);
        toast.error(error.response.data.errors.message, { autoClose: 3000 });
      });
  }

  reactSelectStyle = {
    control: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isDisabled ? "#fafbfd" : null,
        cursor: isDisabled ? "no-drop" : "default",
      };
    },
    indicatorSeparator: (styles) => ({
      ...styles,
      display: "none",
    }),
    dropdownIndicator: (
      styles,
      { data, isDisabled, isFocused, isSelected }
    ) => {
      return {
        ...styles,
        display: isDisabled ? "none" : null,
      };
    },
  };

  render() {
    const { t } = this.props;
    // eslint-disable-next-line
    this.state.companies.map((data, idx) => {
      data["value"] = data["id"];
      data["label"] = data["name"];
    });
    // eslint-disable-next-line
    this.state.companyTypes.map((data, idx) => {
      data["value"] = data["id"];
      data["label"] = data["name"];
    });
    // eslint-disable-next-line
    this.state.companyCountry.map((data, idx) => {
      data["value"] = data["id"];
      data["label"] = data["name"];
    });
    // eslint-disable-next-line
    this.state.companyProvince.map((data, idx) => {
      data["value"] = data["id"];
      data["label"] = data["name"];
    });
    // eslint-disable-next-line
    this.state.companyCity.map((data, idx) => {
      data["value"] = data["id"];
      data["label"] = data["name"];
    });
    // eslint-disable-next-line
    this.state.companyDistrict.map((data, idx) => {
      data["value"] = data["id"];
      data["label"] = data["name"];
    });
    // eslint-disable-next-line
    this.state.companyVillage.map((data, idx) => {
      data["value"] = data["id"];
      data["label"] = data["name"];
    });
    return (
      <div className="animated fadeIn p-4">
        <div className="content-body">
          <Row>
            {/* <h1
              className="title-information-company mb-5"
              style={{ fontSize: "2em", borderBottom: "1px solid #555" }}
            >
              PROFIL PERUSAHAAN
            </h1>
            <br />
            <br /> */}
            <div className="col-12 d-flex justify-content-between align-items-center mb-3">
              <h5 className="content-sub-title mb-0">
                {" "}
                {t("profildasarperusahaan")}
              </h5>
              {this.state.editDetail === false ? (
                <Button
                  color="netis-color"
                  className="btn-netis-color"
                  onClick={this.editDetail}
                >
                  <i
                    className={`fa fa-pencil mr-2${
                      this.state.userPrivileges.includes("edit-company-profile")
                        ? ""
                        : "d-none"
                    }`}
                  ></i>
                  Edit
                </Button>
              ) : null}
            </div>
          </Row>
          <form onSubmit={(e) => this.editProfileCompany(e)}>
            <Row>
              <div className="col-md-6">
                <div className="text-center">
                  {this.state.avatar === null ? (
                    this.state.image.preview ? (
                      <img
                        src={this.state.image.preview}
                        alt="dummy"
                        width="200px"
                        height="auto"
                      />
                    ) : (
                      <div className="frame-profile-picture-empty">
                        {t("belumadafoto")}
                      </div>
                    )
                  ) : this.state.image.preview ? (
                    <img
                      src={this.state.image.preview}
                      alt="dummy"
                      width="200px"
                      height="auto"
                    />
                  ) : (
                    <div className="frame-profile-picture">
                      <img
                        src={
                          process.env.REACT_APP_DOMAIN + "" + this.state.avatar
                        }
                        alt="avatar"
                        className="img-fluid"
                      />
                    </div>
                  )}
                </div>
                {this.state.editDetail === true ? (
                  <FormGroup>
                    <p className="text-center">
                      {" "}
                      Upload Avatar{" "}
                      <span style={{ fontWeight: "bold" }}>( Max. 5 MB )</span>
                    </p>
                    <Input
                      type="file"
                      id="avatar"
                      name="avatar"
                      onChange={this.onChangeAvatar}
                    />
                  </FormGroup>
                ) : null}
              </div>
              <div className="col-md-6">
                <div className="row">
                  <div className="col-sm-12">
                    <FormGroup>
                      <Label htmlFor="nama-perusahaan" className="input-label">
                        {t("namaperusahaan")}
                      </Label>
                      <Input
                        type="text"
                        id="nama-perusahaan"
                        name="nama-perusahaan"
                        placeholder={t("namaperusahaan")}
                        required
                        value={this.state.name || ""}
                        disabled={true}
                        onChange={(e) => this.onChange(e)}
                      />
                    </FormGroup>
                  </div>
                  <div className="col-sm-12">
                    <FormGroup>
                      <Label htmlFor="badan-usaha" className="input-label">
                        {t("bidangperusahaan")}
                      </Label>
                      <Select
                        value={this.state.type}
                        onChange={(value) => this.onChangeType(value)}
                        options={this.state.companyTypes}
                        isDisabled={!this.state.editDetail}
                        styles={this.reactSelectStyle}
                      />
                    </FormGroup>
                  </div>
                </div>
              </div>
            </Row>
            <Row>
              <div className="col-md-6">
                <FormGroup>
                  <Label htmlFor="email-perusahaan" className="input-label">
                    {t("emailperusahaan")}
                  </Label>
                  <Input
                    type="text"
                    id="email-perusahaan"
                    name="email-perusahaan"
                    placeholder={t("emailperusahaan")}
                    required
                    value={this.state.email || ""}
                    disabled={true}
                    onChange={(e) => this.onChange(e)}
                  />
                </FormGroup>
              </div>
              <div className="col-md-6">
                <FormGroup>
                  <Label htmlFor="domain-perusahaan" className="input-label">
                    {t("websiteperusahaan")}
                  </Label>

                  <Input
                    type="text"
                    id="domain-perusahaan"
                    name="domain-perusahaan"
                    placeholder={t("websiteperusahaan")}
                    required
                    value={this.state.domain || ""}
                    disabled={!this.state.editDetail}
                    onChange={(e) => this.onChange(e)}
                  />
                </FormGroup>
              </div>
            </Row>
            <Row>
              <div className="col-md-6">
                <FormGroup>
                  <Label htmlFor="phone-perusahaan" className="input-label">
                    {t("teleponperusahaan")}
                  </Label>
                  <Input
                    type="text"
                    id="phone-perusahaan"
                    name="phone-perusahaan"
                    placeholder={t("teleponperusahaan")}
                    required
                    value={this.state.phone || ""}
                    disabled={!this.state.editDetail}
                    onChange={(e) => this.onChange(e)}
                  />
                </FormGroup>
              </div>
              <div className="col-md-6">
                <FormGroup>
                  <Label htmlFor="nomor-pajak" className="input-label">
                    {t("nomorpajak")}
                  </Label>
                  <Input
                    type="text"
                    id="nomor-pajak"
                    name="nomor-pajak"
                    placeholder={t("nomorpajak")}
                    value={this.state.taxNumber || ""}
                    disabled={!this.state.editDetail}
                    onChange={(e) => this.onChange(e)}
                  />
                </FormGroup>
              </div>
              <div className="col-12">
                <FormGroup>
                  <Label htmlFor="description" className="input-label">
                    {t("Deskripsi Perusahaan")}
                  </Label>
                  <Input
                    type="textarea"
                    name="description"
                    id="description"
                    rows="7"
                    disabled={!this.state.editDetail}
                    value={this.state.description || ""}
                    placeholder="Deskripsi Perusahaan"
                    onChange={(e) => this.onChange(e)}
                  />
                </FormGroup>
              </div>
            </Row>
            <Row>
              <div className="col-12 d-flex justify-content-end">
                {this.state.editDetail === true ? (
                  <Fragment>
                    <Button
                      color="white"
                      className="btn-white mr-3"
                      onClick={this.cancelEditDetail}
                    >
                      {t("batal")}
                    </Button>
                    <Button color="netis-color" style={{ width: "67px" }}>
                      {this.state.loading ? (
                        <Spinner color="light" size="sm" />
                      ) : (
                        t("simpan")
                      )}
                    </Button>
                  </Fragment>
                ) : null}
              </div>
            </Row>
          </form>
        </div>
        <div className="content-body">
          <Row>
            <div className="col-12 d-flex justify-content-between align-items-center mb-3">
              <h5 className="content-sub-title mb-0">
                {t("alamatperusahaan")}
              </h5>
              {this.state.editAddress === false ? (
                <Button
                  color="netis-color"
                  className="btn-netis-color"
                  onClick={this.editAddress}
                >
                  <i
                    className={`fa fa-pencil mr-2${
                      this.state.userPrivileges.includes("edit-company-profile")
                        ? ""
                        : "d-none"
                    }`}
                  ></i>
                  Edit
                </Button>
              ) : null}
            </div>
          </Row>

          <form onSubmit={(e) => this.editAddressCompany(e)}>
            <Row>
              <div className="col-md-6">
                <FormGroup>
                  <Label htmlFor="country" className="input-label">
                    {t("negara")}
                  </Label>
                  <Select
                    value={this.state.country}
                    onChange={(value) => this.onChangeCountry(value)}
                    options={this.state.companyCountry}
                    isDisabled={this.state.editAddress === false ? true : false}
                    styles={this.reactSelectStyle}
                  />
                </FormGroup>
              </div>
              <div className="col-md-6">
                <FormGroup>
                  <Label htmlFor="province" className="input-label">
                    {t("provinsi")}
                  </Label>
                  <Select
                    value={this.state.province}
                    onChange={(value) => this.onChangeProvince(value)}
                    options={this.state.companyProvince}
                    isDisabled={this.state.editAddress === false ? true : false}
                    styles={this.reactSelectStyle}
                  />
                </FormGroup>
              </div>
            </Row>
            <Row>
              <div className="col-md-6">
                <FormGroup>
                  <Label htmlFor="city" className="input-label">
                    {t("kabupaten")}
                  </Label>
                  <Select
                    value={this.state.city}
                    onChange={(value) => this.onChangeCity(value)}
                    options={this.state.companyCity}
                    isDisabled={this.state.editAddress === false ? true : false}
                    styles={this.reactSelectStyle}
                  />
                </FormGroup>
              </div>
              <div className="col-md-6">
                <FormGroup>
                  <Label htmlFor="district" className="input-label">
                    {t("kecamatan")}
                  </Label>
                  <Select
                    value={this.state.district}
                    onChange={(value) => this.onChangeDistrict(value)}
                    options={this.state.companyDistrict}
                    isDisabled={this.state.editAddress === false ? true : false}
                    styles={this.reactSelectStyle}
                  />
                </FormGroup>
              </div>
            </Row>
            <Row>
              <div className="col-md-6">
                <FormGroup>
                  <Label htmlFor="village" className="input-label">
                    {t("kelurahan")}
                  </Label>
                  <Select
                    value={this.state.village}
                    onChange={(value) => this.onChangeVillage(value)}
                    options={this.state.companyVillage}
                    isDisabled={this.state.editAddress === false ? true : false}
                    styles={this.reactSelectStyle}
                  />
                </FormGroup>
              </div>
              <div className="col-md-6">
                <FormGroup>
                  <Label htmlFor="pos-code" className="input-label">
                    {t("kodepos")}
                  </Label>
                  <Input
                    type="text"
                    id="pos-code"
                    name="pos-code"
                    value={this.state.postalCode || ""}
                    disabled={this.state.editAddress === false ? true : false}
                    placeholder="Kode Pos"
                    required
                    onChange={(e) => this.onChange(e)}
                  />
                </FormGroup>
              </div>
            </Row>
            <Row>
              <div className="col-12">
                <FormGroup>
                  <Label htmlFor="address" className="input-label">
                    {t("alamatperusahaan")}
                  </Label>
                  <Input
                    type="textarea"
                    name="address"
                    id="address"
                    rows="4"
                    disabled={this.state.editAddress === false ? true : false}
                    value={this.state.address}
                    placeholder="Alamat Perusahaan"
                    onChange={(e) => this.onChange(e)}
                  />
                </FormGroup>
              </div>
            </Row>
            <Row>
              <div className="col-12 d-flex justify-content-end">
                {this.state.editAddress === true ? (
                  <Fragment>
                    <Button
                      color="white"
                      className="btn-white mr-3"
                      onClick={this.cancelEditAddress}
                    >
                      {t("batal")}
                    </Button>
                    <Button color="netis-color" style={{ width: "67px" }}>
                      {this.state.loading ? (
                        <Spinner color="light" size="sm" />
                      ) : (
                        t("simpan")
                      )}
                    </Button>
                  </Fragment>
                ) : null}
              </div>
            </Row>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ isAdminPanel, user, token }) => ({
  isAdminPanel,
  user,
  token,
});
export default connect(mapStateToProps)(translate(CompanyInfo));
