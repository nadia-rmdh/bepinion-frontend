import React, { Component, Fragment } from 'react';
import { Row, Button, FormGroup, Input, Label, Spinner } from 'reactstrap';
import Axios from 'axios';
import Select from 'react-select';
// import GeneralInfoPersonnel from './component/organism/GeneralInfoPersonnel';
import { connect } from 'react-redux';
import { DatePickerInput } from 'rc-datepicker';
import { toast } from 'react-toastify';
import 'rc-datepicker/lib/style.css';
import 'react-toastify/dist/ReactToastify.css';
import {
    translate,
} from 'react-switch-lang';
toast.configure()
class PersonnelProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            roleIdLogin: props.user,
            dropdownOpen: [false, false],
            session: props.token,
            loadingButton: false,
            editGeneralInfo: false,
            editContact: false,
            editIdentity: false,
            editIdentityAddress: false,
            editCurrentAddress: false,
            units: [],
            jobs: [],
            personnels: [],
            genders: [],
            religions: [],
            maritalStatuses: [],
            countries: [],
            roles: [
                { 'id': 2, 'name': 'Admin' },
                { 'id': 3, 'name': 'User' }
            ],
            provincesCurrent: [],
            citiesCurrent: [],
            districtsCurrent: [],
            villagesCurrent: [],
            provincesIdentity: [],
            citiesIdentity: [],
            districtsIdentity: [],
            villagesIdentity: [],
            personnil: this.props.personnel,
            avatar: '',
            fullName: '',
            nickName: '',
            phone: '',
            email: '',
            emergencyContact: '',
            emergencyName: '',
            emergencyStatus: '',
            endDate: '',
            placeOfBirth: '',
            dateOfBirth: '',
            nationalId: '',
            npwp: '',
            passport: '',
            child: '',
            unit: '',
            job: '',
            gender: {
                value: '', label: ''
            },
            bloods: [
                { value: 'O', label: 'O' },
                { value: 'A', label: 'A' },
                { value: 'AB', label: 'AB' },
                { value: 'B', label: 'B' },
            ],
            citizenship: {
                value: '', label: ''
            },
            bloodType: {
                value: '', label: ''
            },
            religion: {
                value: '', label: ''
            },
            maritalStatus: {
                value: '', label: ''
            },
            passportIssuer: {
                value: '', label: ''
            },
            countryCurrent: {
                value: '', label: ''
            },
            provinceCurrent: {
                value: '', label: ''
            },
            cityCurrent: {
                value: '', label: ''
            },
            districtCurrent: {
                value: '', label: ''
            },
            villageCurrent: {
                value: '', label: ''
            },
            postalCodeCurrent: '',
            addressCurrent: '',
            countryIdentity: {
                value: '', label: ''
            },
            provinceIdentity: {
                value: '', label: ''
            },
            cityIdentity: {
                value: '', label: ''
            },
            districtIdentity: {
                value: '', label: ''
            },
            villageIdentity: {
                value: '', label: ''
            },
            image: {
                preview: '', raw: ''
            },
            postalCodeIdentity: '',
            addressIdentity: '',
            date: new Date()
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onChangeAvatar = this.onChangeAvatar.bind(this);
    }

    componentDidMount = () => {
        this.getData();
        Axios.all([
            // Axios.get(process.env.REACT_APP_DOMAIN + `/api/v1/master/units`, { headers: { "Authorization": `Bearer ${this.state.session}` } }),
            // Axios.get(process.env.REACT_APP_DOMAIN + `/api/v1/master/jobs`, { headers: { "Authorization": `Bearer ${this.state.session}` } }),
            Axios.get(process.env.REACT_APP_DOMAIN + `/api/v1/personnels/parent/` + this.state.personnil.id, { headers: { "Authorization": `Bearer ${this.state.session}` } }),
            Axios.get(process.env.REACT_APP_DOMAIN + `/api/v1/master/genders?all=true`, { headers: { "Authorization": `Bearer ${this.state.session}` } }),
            Axios.get(process.env.REACT_APP_DOMAIN + `/api/v1/master/religions?all=true`, { headers: { "Authorization": `Bearer ${this.state.session}` } }),
            Axios.get(process.env.REACT_APP_DOMAIN + `/api/v1/master/marital-status?all=true`, { headers: { "Authorization": `Bearer ${this.state.session}` } }),
            Axios.get(process.env.REACT_APP_DOMAIN + `/api/v1/location/countries`, { headers: { "Authorization": `Bearer ${this.state.session}` } }),
            Axios.get(process.env.REACT_APP_DOMAIN + `/api/v1/master/roles`, { headers: { "Authorization": `Bearer ${this.state.session}` } }),
        ])
            .then(Axios.spread((res3, res4, res5, res6, res7, res8) => {
                const personnels = res3.data.data;
                const genders = res4.data.data;
                const religions = res5.data.data;
                const maritalStatuses = res6.data.data;
                const countries = res7.data.data;
                // const roles = res8.data.data.filter(function (obj) {
                //     return obj.id !== 1;
                // });
                this.setState({
                    personnels,
                    genders,
                    religions,
                    maritalStatuses,
                    countries,
                });
                this.setPersonnel();
            }))
            .catch(error => console.log(error));

    }
    getData = () => {
        Axios.get(process.env.REACT_APP_DOMAIN + `/api/v1/personnels/profile`, { headers: { "Authorization": `Bearer ${this.state.session}` } })
            .then(res => {
                const personnel = res.data.data[0];
                this.setState({ personnel }, () => {
                    this.setPersonnel();

                });
                setTimeout(() => {
                    this.setState({
                        loading: false
                    })
                }, 500)
            })
            .catch(error => {
                console.log(error)
                setTimeout(() => {
                    this.setState({
                        loading: false
                    })
                }, 500)
            });
    }
    setPersonnel = () => {
        this.setState({
            fullName: this.state.personnel.fullName,
            nickName: this.state.personnel.nickName,
            avatar: this.state.personnel.avatar,
            phone: this.state.personnel.phone,
            email: this.state.personnel.email,
            emergencyContact: this.state.personnel.emergencyContact,
            emergencyName: this.state.personnel.emergencyName,
            emergencyStatus: this.state.personnel.emergencyStatus,
            endDate: this.state.personnel.endDate,
            placeOfBirth: this.state.personnel.placeOfBirth,
            dateOfBirth: this.state.personnel.dateOfBirth,
            nationalId: this.state.personnel.nationalId,
            npwp: this.state.personnel.npwp,
            passport: this.state.personnel.passport,
            child: this.state.personnel.child,
            image: {
                preview: null, raw: ''
            },
            unit: this.state.personnel.unit.name,
            job: this.state.personnel.job.name,
            gender: {
                value: this.state.personnel.gender.id, label: this.state.personnel.gender.name
            },
            citizenship: {
                value: this.state.personnel.citizenship.id, label: this.state.personnel.citizenship.name
            },
            bloodType: {
                value: this.state.personnel.bloodType, label: this.state.personnel.bloodType
            },
            religion: {
                value: this.state.personnel.religion.id, label: this.state.personnel.religion.name
            },
            maritalStatus: {
                value: this.state.personnel.maritalStatus.id, label: this.state.personnel.maritalStatus.name
            },
            passportIssuer: {
                value: this.state.personnel.passportIssuer.id, label: this.state.personnel.passportIssuer.name
            },
            countryCurrent: {
                value: this.state.personnel.currentAddress.country.id, label: this.state.personnel.currentAddress.country.name
            },
            provinceCurrent: {
                value: this.state.personnel.currentAddress.province.id, label: this.state.personnel.currentAddress.province.name
            },
            cityCurrent: {
                value: this.state.personnel.currentAddress.city.id, label: this.state.personnel.currentAddress.city.name
            },
            districtCurrent: {
                value: this.state.personnel.currentAddress.district.id, label: this.state.personnel.currentAddress.district.name
            },
            villageCurrent: {
                value: this.state.personnel.currentAddress.village.id, label: this.state.personnel.currentAddress.village.name
            },
            postalCodeCurrent: this.state.personnel.currentAddress.postalCode,
            addressCurrent: this.state.personnel.currentAddress.address,
            countryIdentity: {
                value: this.state.personnel.identityAddress.country.id, label: this.state.personnel.identityAddress.country.name
            },
            provinceIdentity: {
                value: this.state.personnel.identityAddress.province.id, label: this.state.personnel.identityAddress.province.name
            },
            cityIdentity: {
                value: this.state.personnel.identityAddress.city.id, label: this.state.personnel.identityAddress.city.name
            },
            districtIdentity: {
                value: this.state.personnel.identityAddress.district.id, label: this.state.personnel.identityAddress.district.name
            },
            villageIdentity: {
                value: this.state.personnel.identityAddress.village.id, label: this.state.personnel.identityAddress.village.name
            },
            postalCodeIdentity: this.state.personnel.identityAddress.postalCode,
            addressIdentity: this.state.personnel.identityAddress.address,
        });
        if (this.state.gender.value === null || this.state.gender.value === 0) {
            this.setState({
                gender: {
                    value: null, label: null
                }
            })
        }
        if (this.state.citizenship.value === null || this.state.citizenship.value === 0) {
            this.setState({
                citizenship: {
                    value: null, label: null
                }
            })
        }
        if (this.state.religion.value === null || this.state.religion.value === 0) {
            this.setState({
                religion: {
                    value: null, label: null
                }
            })
        }
        if (this.state.bloodType.value === null || this.state.bloodType.value === 0) {
            this.setState({
                bloodType: {
                    value: null, label: null
                }
            })
        }
        if (this.state.maritalStatus.value === null || this.state.maritalStatus.value === 0) {
            this.setState({
                maritalStatus: {
                    value: null, label: null
                }
            })
        }
        if (this.state.passportIssuer.value === null || this.state.passportIssuer.value === 0) {
            this.setState({
                passportIssuer: {
                    value: null, label: null
                }
            })
        }
        if (this.state.countryCurrent.value === null || this.state.countryCurrent.value === 0) {
            this.setState({
                countryCurrent: {
                    value: null, label: null
                }
            })
        }
        if (this.state.provinceCurrent.value === null || this.state.provinceCurrent.value === 0) {
            this.setState({
                provinceCurrent: {
                    value: null, label: null
                }
            })
        }
        if (this.state.cityCurrent.value === null || this.state.cityCurrent.value === 0) {
            this.setState({
                cityCurrent: {
                    value: null, label: null
                }
            })
        }
        if (this.state.districtCurrent.value === null || this.state.districtCurrent.value === 0) {
            this.setState({
                districtCurrent: {
                    value: null, label: null
                }
            })
        }
        if (this.state.villageCurrent.value === null || this.state.villageCurrent.value === 0) {
            this.setState({
                villageCurrent: {
                    value: null, label: null
                }
            })
        }
        if (this.state.countryIdentity.value === null || this.state.countryIdentity.value === 0) {
            this.setState({
                countryIdentity: {
                    value: null, label: null
                }
            })
        }
        if (this.state.provinceIdentity.value === null || this.state.provinceIdentity.value === 0) {
            this.setState({
                provinceIdentity: {
                    value: null, label: null
                }
            })
        }
        if (this.state.cityIdentity.value === null || this.state.cityIdentity.value === 0) {
            this.setState({
                cityIdentity: {
                    value: null, label: null
                }
            })
        }
        if (this.state.districtIdentity.value === null || this.state.districtIdentity.value === 0) {
            this.setState({
                districtIdentity: {
                    value: null, label: null
                }
            })
        }
        if (this.state.villageIdentity.value === null || this.state.villageIdentity.value === 0) {
            this.setState({
                villageIdentity: {
                    value: null, label: null
                }
            })
        }
        this.getPersonnelProvincesCurrent(this.state.countryCurrent.value);
        this.getPersonnelCityCurrent(this.state.provinceCurrent.value);
        this.getPersonnelDistrictCurrent(this.state.cityCurrent.value);
        this.getPersonnelVillageCurrent(this.state.districtCurrent.value);
        this.getPersonnelProvincesIdentity(this.state.countryIdentity.value);
        this.getPersonnelCityIdentity(this.state.provinceIdentity.value);
        this.getPersonnelDistrictIdentity(this.state.cityIdentity.value);
        this.getPersonnelVillageIdentity(this.state.districtIdentity.value);
    }
    getPersonnelProvincesCurrent = (id) => {
        Axios.get(process.env.REACT_APP_DOMAIN + `/api/v1/location/provinces?countryId=` + id, { headers: { "Authorization": `Bearer ${this.state.session}` } })
            .then(res => {
                const provincesCurrent = res.data.data;
                this.setState({ provincesCurrent });

            })
            .catch(function (error) {
                console.log(error);
            });
    }
    getPersonnelCityCurrent = (id) => {
        Axios.get(process.env.REACT_APP_DOMAIN + `/api/v1/location/cities?provinceId=` + id, { headers: { "Authorization": `Bearer ${this.state.session}` } })
            .then(res => {
                const citiesCurrent = res.data.data;
                this.setState({ citiesCurrent });

            })
            .catch(function (error) {
                console.log(error);
            });
    }
    getPersonnelDistrictCurrent = (id) => {
        Axios.get(process.env.REACT_APP_DOMAIN + `/api/v1/location/districts?cityId=` + id, { headers: { "Authorization": `Bearer ${this.state.session}` } })
            .then(res => {
                const districtsCurrent = res.data.data;
                this.setState({ districtsCurrent });

            })
            .catch(function (error) {
                console.log(error);
            });
    }
    getPersonnelVillageCurrent = (id) => {
        Axios.get(process.env.REACT_APP_DOMAIN + `/api/v1/location/villages?districtId=` + id, { headers: { "Authorization": `Bearer ${this.state.session}` } })
            .then(res => {
                const villagesCurrent = res.data.data;
                this.setState({ villagesCurrent });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    getPersonnelProvincesIdentity = (id) => {
        Axios.get(process.env.REACT_APP_DOMAIN + `/api/v1/location/provinces?countryId=` + id, { headers: { "Authorization": `Bearer ${this.state.session}` } })
            .then(res => {
                const provincesIdentity = res.data.data;
                this.setState({ provincesIdentity });

            })
            .catch(function (error) {
                console.log(error);
            });
    }
    getPersonnelCityIdentity = (id) => {
        console.log(id);
        Axios.get(process.env.REACT_APP_DOMAIN + `/api/v1/location/cities?provinceId=` + id, { headers: { "Authorization": `Bearer ${this.state.session}` } })
            .then(res => {
                const citiesIdentity = res.data.data;
                this.setState({ citiesIdentity });

            })
            .catch(function (error) {
                console.log(error);
            });
    }
    getPersonnelDistrictIdentity = (id) => {
        Axios.get(process.env.REACT_APP_DOMAIN + `/api/v1/location/districts?cityId=` + id, { headers: { "Authorization": `Bearer ${this.state.session}` } })
            .then(res => {
                const districtsIdentity = res.data.data;
                this.setState({ districtsIdentity });

            })
            .catch(function (error) {
                console.log(error);
            });
    }
    getPersonnelVillageIdentity = (id) => {
        Axios.get(process.env.REACT_APP_DOMAIN + `/api/v1/location/villages?districtId=` + id, { headers: { "Authorization": `Bearer ${this.state.session}` } })
            .then(res => {
                const villagesIdentity = res.data.data;
                this.setState({ villagesIdentity });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    handleInputChange(e) {
        e.preventDefault();
        const stateName = e.target.name;

        this.setState({
            [stateName]: e.target.value
        });
    }
    onChangeUnit(value) {
        this.setState({
            "unit": value
        });
    }
    onChangeAvatar(e) {
        e.preventDefault();
        if (e.target.files.length) {
            var preview = { ...this.state.image };
            preview['preview'] = URL.createObjectURL(e.target.files[0]);
            this.setState({
                avatar: e.target.files[0],
                image: preview
            });
        }
    }
    onChangeJob(value) {
        this.setState({
            "job": value
        });
    }
    onChangeParent(value) {
        this.setState({
            "parent": value
        });
    }
    onChangeMaritalStatus(value) {
        this.setState({
            "maritalStatus": value
        });
    }
    onChangeGender(value) {
        this.setState({
            "gender": value
        });
    }
    onChangeCitizenship(value) {
        this.setState({
            "citizenship": value
        });
    }
    onChangeStatus(value) {
        this.setState({
            "status": value
        });
    }
    onChangeBlood(value) {
        this.setState({
            "bloodType": value
        });
    }
    onChangeRole(value) {
        this.setState({
            "roleId": value
        });
    }
    onChangeReligion(value) {
        this.setState({
            "religion": value
        });
    }
    onChangePassportIssuer(value) {
        this.setState({
            "passportIssuer": value
        });
    }
    onChangeCountryCurrent(value) {
        this.setState({
            countryCurrent: value,
            provinceCurrent: {
                value: null, name: null
            },
            cityCurrent: {
                value: null, name: null
            },
            districtCurrent: {
                value: null, name: null
            },
            villageCurrent: {
                value: null, name: null
            }
        });
        this.getPersonnelProvincesCurrent(value.value);
    }
    onChangeProvinceCurrent(value) {
        this.setState({
            provinceCurrent: value,
            cityCurrent: {
                value: null, name: null
            },
            districtCurrent: {
                value: null, name: null
            },
            villageCurrent: {
                value: null, name: null
            }
        });

        this.getPersonnelCityCurrent(value.value);
    }
    onChangeCityCurrent(value) {
        this.setState({
            cityCurrent: value,
            districtCurrent: {
                value: null, name: null
            },
            villageCurrent: {
                value: null, name: null
            }
        });
        this.getPersonnelDistrictCurrent(value.value);
    }
    onChangeDistrictCurrent(value) {
        this.setState({
            districtCurrent: value,
            villageCurrent: {
                value: null, name: null
            }
        });
        this.getPersonnelVillageCurrent(value.value);
    }
    onChangeVillageCurrent(value) {
        this.setState({ villageCurrent: value })
    }
    onChangeCountryIdentity(value) {
        this.setState({
            countryIdentity: value,
            provinceIdentity: {
                value: null, name: null
            },
            cityIdentity: {
                value: null, name: null
            },
            districtIdentity: {
                value: null, name: null
            },
            villageIdentity: {
                value: null, name: null
            }
        });
        this.getPersonnelProvincesIdentity(value.value);
    }
    onChangeProvinceIdentity(value) {
        this.setState({
            provinceIdentity: value,
            cityIdentity: {
                value: null, name: null
            },
            districtIdentity: {
                value: null, name: null
            },
            villageIdentity: {
                value: null, name: null
            }
        });

        this.getPersonnelCityIdentity(value.value);
    }
    onChangeCityIdentity(value) {
        this.setState({
            cityIdentity: value,
            districtIdentity: {
                value: null, name: null
            },
            villageIdentity: {
                value: null, name: null
            }
        });
        this.getPersonnelDistrictIdentity(value.value);
    }
    onChangeDistrictIdentity(value) {
        this.setState({
            districtIdentity: value,
            villageIdentity: {
                value: null, name: null
            }
        });
        this.getPersonnelVillageIdentity(value.value);
    }
    onChangeVillageIdentity(value) {
        this.setState({ villageIdentity: value })
    }
    handleInputDateJoin = date => {
        let joinDate = this.formatDate(date)
        this.setState({
            joinDate: joinDate
        });
    }
    handleInputDateBirth = date => {
        let dateOfBirth = this.formatDate(date)
        this.setState({
            dateOfBirth: dateOfBirth
        });
    }
    formatDate = (date) => {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }
    editGeneralInfo = () => {
        this.setState({
            editGeneralInfo: true
        });
        this.cancelEditContact();
        this.cancelEditCurrentAddress();
        this.cancelEditIdentity();
        this.cancelEditIdentityAddress();
    }
    editContact = () => {
        this.setState({
            editContact: true
        });
        this.cancelEditGeneralInfo();
        this.cancelEditCurrentAddress();
        this.cancelEditIdentity();
        this.cancelEditIdentityAddress();
    }

    editIdentity = () => {
        this.setState({
            editIdentity: true
        });
        this.cancelEditContact();
        this.cancelEditCurrentAddress();
        this.cancelEditGeneralInfo();
        this.cancelEditIdentityAddress();
    }

    editIdentityAddress = () => {
        this.setState({
            editIdentityAddress: true
        });
        this.cancelEditContact();
        this.cancelEditCurrentAddress();
        this.cancelEditGeneralInfo();
        this.cancelEditIdentity();
    }

    editCurrentAddress = () => {
        this.setState({
            editCurrentAddress: true
        });
        this.cancelEditContact();
        this.cancelEditIdentityAddress();
        this.cancelEditIdentity();
        this.cancelEditGeneralInfo();
    }

    cancelEditGeneralInfo = () => {
        this.setState({
            editGeneralInfo: false
        });
        this.getData();
    }

    cancelEditContact = () => {
        this.setState({
            editContact: false
        });
        this.getData();
    }

    cancelEditIdentity = () => {
        this.setState({
            editIdentity: false
        });
        this.getData();
    }

    cancelEditIdentityAddress = () => {
        this.setState({
            editIdentityAddress: false
        });
        this.getData();
    }

    cancelEditCurrentAddress = () => {
        this.setState({
            editCurrentAddress: false
        });
        this.getData();
    }
    editProfilePersonnel(e) {
        this.setState({ loadingButton: true })
        e.preventDefault();
        if (this.state.image.preview !== null) {
            var formData = new FormData();
            formData.append('ava', this.state.avatar, this.state.avatar.name);
            Axios.post(process.env.REACT_APP_DOMAIN + '/api/v1/personnels/avatar/' + this.state.personnil.id, formData, { headers: { "Authorization": `Bearer ${this.state.session}` } })
                .then(res => {
                    this.setState({
                        editGeneralInfo: false,
                        editContact: false,
                        editIdentity: false,
                        editIdentityAddress: false,
                        editCurrentAddress: false,
                    });
                    this.getData();
                })
                .catch(err => console.log(err))
        }
        const dataObject = {
            fullName: this.state.fullName,
            nickName: this.state.nickName,
            email: this.state.email,
            phone: this.state.phone,
            emergencyContact: this.state.emergencyContact,
            emergencyName: this.state.emergencyName,
            emergencyStatus: this.state.emergencyStatus,

            placeOfBirth: this.state.placeOfBirth,
            dateOfBirth: this.state.dateOfBirth,
            gender: this.state.gender.value,
            citizenship: this.state.citizenship.value,
            bloodType: this.state.bloodType.value,
            religion: this.state.religion.value,
            maritalStatus: this.state.maritalStatus.value,
            child: this.state.child,
            nationalId: this.state.nationalId,
            npwp: this.state.npwp,
            passport: this.state.passport,
            passportIssuer: this.state.passportIssuer.value,

            currentCountry: this.state.countryCurrent.value,
            currentProvince: this.state.provinceCurrent.value,
            currentCity: this.state.cityCurrent.value,
            currentDistrict: this.state.districtCurrent.value,
            currentVillage: this.state.villageCurrent.value,
            currentPostal: this.state.postalCodeCurrent,
            currentAddress: this.state.addressCurrent,

            identityCountry: this.state.countryIdentity.value,
            identityProvince: this.state.provinceIdentity.value,
            identityCity: this.state.cityIdentity.value,
            identityDistrict: this.state.districtIdentity.value,
            identityVillage: this.state.villageIdentity.value,
            identityPostal: this.state.postalCodeIdentity,
            identityAddress: this.state.addressIdentity,
        };
        Axios.put(process.env.REACT_APP_DOMAIN + '/api/v1/personnels/profile', dataObject, { headers: { "Authorization": `Bearer ${this.state.session}` } })
            .then((res) => {
                setTimeout(() => {
                    this.setState({
                        editGeneralInfo: false,
                        editContact: false,
                        editIdentity: false,
                        editIdentityAddress: false,
                        editCurrentAddress: false,
                        loadingButton: false
                    })
                    toast.success('Success', { autoClose: 3000 })
                }, 500)
            }).catch((error) => {
                setTimeout(() => {
                    this.setState({
                        loadingButton: false
                    });
                    toast.error('Error', { autoClose: 3000 })
                }, 500)
                console.log(error);
            });
    }
    render() {
        // eslint-disable-next-line
        this.state.genders.map((data, idx) => {
            data['value'] = data['id'];
            data['label'] = data['name'];
        });// eslint-disable-next-line
        this.state.roles.map((data, idx) => {
            data['value'] = data['id'];
            data['label'] = data['name'];
        });// eslint-disable-next-line
        this.state.religions.map((data, idx) => {
            data['value'] = data['id'];
            data['label'] = data['name'];
        });// eslint-disable-next-line
        this.state.maritalStatuses.map((data, idx) => {
            data['value'] = data['id'];
            data['label'] = data['name'];
        });// eslint-disable-next-line
        this.state.personnels.map((data, idx) => {
            if (data['id'] === 0) {
                data['id'] = 0;
            }
            data['value'] = data['id'];
            data['label'] = data['fullName'];
        });// eslint-disable-next-line
        this.state.countries.map((data, idx) => {
            data['value'] = data['id'];
            data['label'] = data['name'];
        });// eslint-disable-next-line
        this.state.provincesCurrent.map((data, idx) => {
            data['value'] = data['id'];
            data['label'] = data['name'];
        });// eslint-disable-next-line
        this.state.citiesCurrent.map((data, idx) => {
            data['value'] = data['id'];
            data['label'] = data['name'];
        });// eslint-disable-next-line
        this.state.districtsCurrent.map((data, idx) => {
            data['value'] = data['id'];
            data['label'] = data['name'];
        });// eslint-disable-next-line
        this.state.villagesCurrent.map((data, idx) => {
            data['value'] = data['id'];
            data['label'] = data['name'];
        });// eslint-disable-next-line
        this.state.provincesIdentity.map((data, idx) => {
            data['value'] = data['id'];
            data['label'] = data['name'];
        });// eslint-disable-next-line
        this.state.citiesIdentity.map((data, idx) => {
            data['value'] = data['id'];
            data['label'] = data['name'];
        });// eslint-disable-next-line
        this.state.districtsIdentity.map((data, idx) => {
            data['value'] = data['id'];
            data['label'] = data['name'];
        });// eslint-disable-next-line
        this.state.villagesIdentity.map((data, idx) => {
            data['value'] = data['id'];
            data['label'] = data['name'];
        });
        const { t } = this.props;
        return (
            <div className="animated fadeIn">
                {/* <GeneralInfoPersonnel personnel={this.props.personnel} /> */}
                <div className="content-body">
                    <form onSubmit={(e) => this.editProfilePersonnel(e)}>
                        <Row>
                            <div className="col-12 d-flex justify-content-between align-items-center mb-3">
                                <h5 className="content-sub-title mb-0">{t('informasiumum')}</h5>
                                {(this.state.roleIdLogin.verif === 'unverified' && this.state.editGeneralInfo === false) &&
                                    <Button color="netis-color" className="btn-netis-color" onClick={this.editGeneralInfo}>
                                        <i className="fa fa-pencil" style={{ marginRight: 5 }}></i>Edit
                                    </Button>
                                }
                            </div>
                        </Row>
                        <Row>
                            <div className="col-md-4">
                                <div className="text-center">
                                    {this.state.image.preview ?
                                        <img src={this.state.image.preview} alt="dummy" width="200px" height="auto" />
                                        :
                                        (this.state.avatar === null ?
                                            <div className="frame-profile-picture-empty">{t('belumadafoto')}</div>
                                            :
                                            <div className="frame-profile-picture">
                                                <img src={process.env.REACT_APP_DOMAIN + "" + this.state.avatar} alt="avatar" className="img-fluid" />
                                            </div>
                                        )
                                    }
                                </div>
                                {this.state.editGeneralInfo === true ?
                                    <FormGroup>
                                        <p className="text-center"> Upload Avatar <span style={{ fontWeight: 'bold' }} >( Max. 5 MB )</span></p>
                                        <Input type="file" id="avatar" name="avatar" onChange={this.onChangeAvatar} />
                                    </FormGroup>
                                    : null
                                }
                            </div>
                            <div className="col-md-8">

                                <FormGroup>
                                    <Label htmlFor="fullName" className="input-label">{t('namalengkap')}</Label>
                                    <Input type="text" id="fullName" name="fullName" placeholder={t('namalengkap')}
                                        disabled={this.state.editGeneralInfo === false ? true : false}
                                        value={this.state.fullName} onChange={this.handleInputChange} />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="nickName" className="input-label">{t('namapanggilan')}</Label>
                                    <Input type="text" id="nickName" name="nickName" placeholder={t('namapanggilan')}
                                        disabled={this.state.editGeneralInfo === false ? true : false}
                                        value={this.state.nickName} onChange={this.handleInputChange} />
                                </FormGroup>
                                <Row>
                                    <div className="col-md-6">
                                        <FormGroup>
                                            <Label htmlFor="unit" className="input-label">Unit</Label>
                                            <Input type="text" disabled={true} value={this.state.unit} />
                                        </FormGroup>
                                    </div>
                                    <div className="col-md-6">
                                        <FormGroup>
                                            <Label htmlFor="job" className="input-label">{t('jabatan')}</Label>
                                            <Input type="text" disabled={true} value={this.state.job} />
                                        </FormGroup>
                                    </div>
                                </Row>
                            </div>
                        </Row>
                        <Row>
                            <div className="col-12 d-flex justify-content-end">
                                {
                                    this.state.roleIdLogin.verif === 'unverified' ?
                                        this.state.editGeneralInfo === true ?
                                            <Fragment>
                                                <Button color="white" className="btn-white mr-3" onClick={this.cancelEditGeneralInfo}>{t('batal')}</Button>
                                                <Button color="netis-color" style={{ width: '67px' }}>
                                                    {this.state.loadingButton ? <Spinner color="light" size="sm" /> : t('simpan')}
                                                </Button>
                                            </Fragment>
                                            : null
                                        : null
                                }
                            </div>
                        </Row>
                    </form>
                </div>
                <div className="content-body">
                    <form onSubmit={(e) => this.editProfilePersonnel(e)}>
                        <Row>
                            <div className="col-12 d-flex justify-content-between align-items-center mb-3">
                                <h5 className="content-sub-title mb-0">{t('kontak')}</h5>
                                {
                                    this.state.roleIdLogin.verif === 'unverified' ?
                                        this.state.editContact === false ?
                                            <Button color="netis-color" className="btn-netis-color" onClick={this.editContact}>
                                                <i className="fa fa-pencil" style={{ marginRight: 5 }}></i>Edit
                                </Button> : null
                                        : null
                                }
                            </div>
                        </Row>
                        <Row>
                            <div className="col-md-6">
                                <FormGroup>
                                    <Label htmlFor="email" className="input-label">Email</Label>
                                    <Input type="text" id="email" name="email" placeholder="Email"
                                        disabled={this.state.editContact === false ? true : false}
                                        value={this.state.email} onChange={this.handleInputChange} />
                                </FormGroup>
                            </div>
                            <div className="col-md-6">
                                <FormGroup>
                                    <Label htmlFor="phone" className="input-label">{t('telepon')}</Label>
                                    <Input type="text" id="phone" name="phone" placeholder={t('telepon')}
                                        disabled={this.state.editContact === false ? true : false}
                                        value={this.state.phone} onChange={this.handleInputChange} />
                                </FormGroup>
                            </div>
                        </Row>
                        <Row>
                            <div className="col-md-4">
                                <FormGroup>
                                    <Label htmlFor="emergencyContact" className="input-label">{t('kontakdarurat')}</Label>
                                    <Input type="text" id="emergencyContact" name="emergencyContact" placeholder={t('kontakdarurat')}
                                        disabled={this.state.editContact === false ? true : false}
                                        value={this.state.emergencyContact} onChange={this.handleInputChange} />
                                </FormGroup>
                            </div>
                            <div className="col-md-4">
                                <FormGroup>
                                    <Label htmlFor="emergencyName" className="input-label">{t('namakontakdarurat')}</Label>
                                    <Input type="text" id="emergencyName" name="emergencyName" placeholder={t('namakontakdarurat')}
                                        disabled={this.state.editContact === false ? true : false}
                                        value={this.state.emergencyName} onChange={this.handleInputChange} />
                                </FormGroup>
                            </div>
                            <div className="col-md-4">
                                <FormGroup>
                                    <Label htmlFor="emergencyStatus" className="input-label">{t('hubkontakdarurat')}</Label>
                                    <Input type="text" id="emergencyStatus" name="emergencyStatus" placeholder={t('hubkontakdarurat')}
                                        disabled={this.state.editContact === false ? true : false}
                                        value={this.state.emergencyStatus} onChange={this.handleInputChange} />
                                </FormGroup>
                            </div>
                        </Row>
                        <Row>
                            <div className="col-12 d-flex justify-content-end">
                                {
                                    this.state.roleIdLogin.verif === 'unverified' ?
                                        this.state.editContact === true ?
                                            <Fragment>
                                                <Button color="white" className="btn-white mr-3" onClick={this.cancelEditContact}>{t('batal')}</Button>
                                                <Button color="netis-color" style={{ width: '67px' }}>
                                                    {this.state.loadingButton ? <Spinner color="light" size="sm" /> : t('simpan')}
                                                </Button>
                                            </Fragment>
                                            : null
                                        : null
                                }
                            </div>
                        </Row>
                    </form>
                </div>
                <div className="content-body">
                    <form onSubmit={(e) => this.editProfilePersonnel(e)}>
                        <Row>
                            <div className="col-12 d-flex justify-content-between align-items-center mb-3">
                                <h5 className="content-sub-title mb-0">{t('identitas')}</h5>
                                {
                                    this.state.roleIdLogin.verif === 'unverified' ?
                                        this.state.editIdentity === false ?
                                            <Button color="netis-color" className="btn-netis-color" onClick={this.editIdentity}>
                                                <i className="fa fa-pencil" style={{ marginRight: 5 }}></i>Edit
                                </Button> : null
                                        : null
                                }
                            </div>
                        </Row>
                        <Row>
                            <div className="col-md-6">
                                <FormGroup>
                                    <Label htmlFor="dateOfBirth" className="input-label">{t('tanggallahir')}</Label>
                                    <DatePickerInput
                                        disabled={this.state.editIdentity === false ? true : false}
                                        onChange={this.handleInputDateBirth}
                                        value={this.state.dateOfBirth}
                                        className='my-custom-datepicker-component'
                                        showOnInputClick={true}
                                        closeOnClickOutside={true}
                                        displayFormat="DD MMMM YYYY"
                                        readOnly
                                        maxDate={new Date()}
                                    />
                                </FormGroup>
                            </div>
                            <div className="col-md-6">
                                <FormGroup>
                                    <Label htmlFor="placeOfBirth" className="input-label">{t('tempatlahir')}</Label>
                                    <Input type="text" id="placeOfBirth" name="placeOfBirth" placeholder={t('tempatlahir')}
                                        disabled={this.state.editIdentity === false ? true : false} value={this.state.placeOfBirth} onChange={this.handleInputChange} />
                                </FormGroup>
                            </div>
                        </Row>
                        <Row>
                            <div className="col-md-6">
                                <FormGroup>
                                    <Label htmlFor="gender" className="input-label">{t('jk')}</Label>
                                    <Select
                                        value={this.state.gender}
                                        onChange={value => this.onChangeGender(value)}
                                        options={this.state.genders}
                                        isDisabled={this.state.editIdentity === false ? true : false}
                                    />
                                </FormGroup>
                            </div>
                            <div className="col-md-6">
                                <FormGroup>
                                    <Label htmlFor="nationality" className="input-label">{t('kewarganegaraan')}</Label>
                                    <Select
                                        value={this.state.citizenship}
                                        onChange={value => this.onChangeCitizenship(value)}
                                        options={this.state.countries}
                                        isDisabled={this.state.editIdentity === false ? true : false}
                                    />
                                </FormGroup>
                            </div>
                        </Row>
                        <Row>
                            <div className="col-md-6">
                                <FormGroup>
                                    <Label htmlFor="bloodType" className="input-label">{t('golongandarah')}</Label>
                                    <Select
                                        value={this.state.bloodType}
                                        onChange={value => this.onChangeBlood(value)}
                                        options={this.state.bloods}
                                        isDisabled={this.state.editIdentity === false ? true : false}
                                    />
                                </FormGroup>
                            </div>
                            <div className="col-md-6">
                                <FormGroup>
                                    <Label htmlFor="religion" className="input-label">{t('agama')}</Label>
                                    <Select
                                        value={this.state.religion}
                                        onChange={value => this.onChangeReligion(value)}
                                        options={this.state.religions}
                                        isDisabled={this.state.editIdentity === false ? true : false}
                                    />
                                </FormGroup>
                            </div>
                        </Row>
                        <Row>
                            <div className="col-md-6">
                                <FormGroup>
                                    <Label htmlFor="maritalStatus" className="input-label">{t('statusperkawinan')}</Label>
                                    <Select
                                        value={this.state.maritalStatus}
                                        onChange={value => this.onChangeMaritalStatus(value)}
                                        options={this.state.maritalStatuses}
                                        isDisabled={this.state.editIdentity === false ? true : false}
                                    />
                                </FormGroup>
                            </div>
                            <div className="col-md-6">
                                <FormGroup>
                                    <Label htmlFor="child" className="input-label">{t('jumlahanak')}</Label>
                                    <Input type="text" id="child" name="child" placeholder={t('jumlahanak')}
                                        disabled={this.state.editIdentity === false ? true : false} value={this.state.child} onChange={this.handleInputChange} />
                                </FormGroup>
                            </div>
                        </Row>
                        <Row>
                            <div className="col-md-6">
                                <FormGroup>
                                    <Label htmlFor="nationalId" className="input-label">{t('nomor')} KTP</Label>
                                    <Input type="text" id="nationalId" name="nationalId" placeholder={t('nomor') + "KTP"}
                                        disabled={this.state.editIdentity === false ? true : false} value={this.state.nationalId} onChange={this.handleInputChange} />
                                </FormGroup>
                            </div>
                            <div className="col-md-6">
                                <FormGroup>
                                    <Label htmlFor="npwp" className="input-label">{t('nomor')} NPWP</Label>
                                    <Input type="text" id="npwp" name="npwp" placeholder={"Nomor NPWP"}
                                        disabled={this.state.editIdentity === false ? true : false} value={this.state.npwp} onChange={this.handleInputChange} />
                                </FormGroup>
                            </div>
                        </Row>
                        <Row>
                            <div className="col-md-6">
                                <FormGroup>
                                    <Label htmlFor="passport" className="input-label">{t('nomor')} Passport</Label>
                                    <Input type="text" id="passport" name="passport" placeholder={"Passport"}
                                        disabled={this.state.editIdentity === false ? true : false} value={this.state.passport} onChange={this.handleInputChange} />
                                </FormGroup>
                            </div>
                            <div className="col-md-6">
                                <FormGroup>
                                    <Label htmlFor="passportIssuer" className="input-label">{t('negara')} Passport</Label>
                                    <Select
                                        value={this.state.passportIssuer}
                                        onChange={value => this.onChangePassportIssuer(value)}
                                        options={this.state.countries}
                                        isDisabled={this.state.editIdentity === false ? true : false}
                                    />
                                </FormGroup>
                            </div>
                        </Row>
                        <Row>
                            <div className="col-12 d-flex justify-content-end">
                                {
                                    this.state.roleIdLogin.verif === 'unverified' ?
                                        this.state.editIdentity === true ?
                                            <Fragment>
                                                <Button color="white" className="btn-white mr-3" onClick={this.cancelEditIdentity}>{t('batal')}</Button>
                                                <Button color="netis-color" style={{ width: '67px' }}>
                                                    {this.state.loadingButton ? <Spinner color="light" size="sm" /> : t('simpan')}
                                                </Button>
                                            </Fragment>
                                            : null
                                        : null
                                }
                            </div>
                        </Row>
                    </form>
                </div>
                <div className="content-body">
                    <form onSubmit={(e) => this.editProfilePersonnel(e)}>
                        <Row>
                            <div className="col-12 d-flex justify-content-between align-items-center mb-3">
                                <h5 className="content-sub-title mb-0">{t('alamatasal')}</h5>
                                {
                                    this.state.editCurrentAddress === false ?
                                        <Button color="netis-color" className="btn-netis-color" onClick={this.editCurrentAddress}>
                                            <i className="fa fa-pencil" style={{ marginRight: 5 }}></i>Edit
                                </Button> : null
                                }
                            </div>
                        </Row>
                        <Row>
                            <div className="col-md-6">
                                <FormGroup>
                                    <Label htmlFor="country" className="input-label">{t('negara')}</Label>
                                    <Select
                                        value={this.state.countryCurrent}
                                        onChange={value => this.onChangeCountryCurrent(value)}
                                        options={this.state.countries}
                                        isDisabled={this.state.editCurrentAddress === false ? true : false}
                                    />
                                </FormGroup>
                            </div>
                            <div className="col-md-6">
                                <FormGroup>
                                    <Label htmlFor="province" className="input-label">{t('provinsi')}</Label>
                                    <Select
                                        value={this.state.provinceCurrent}
                                        onChange={value => this.onChangeProvinceCurrent(value)}
                                        options={this.state.provincesCurrent}
                                        isDisabled={this.state.editCurrentAddress === false ? true : false}
                                    />
                                </FormGroup>
                            </div>
                        </Row>
                        <Row>
                            <div className="col-md-6">
                                <FormGroup>
                                    <Label htmlFor="city" className="input-label">{t('kabupaten')}</Label>
                                    <Select
                                        value={this.state.cityCurrent}
                                        onChange={value => this.onChangeCityCurrent(value)}
                                        options={this.state.citiesCurrent}
                                        isDisabled={this.state.editCurrentAddress === false ? true : false}
                                    />
                                </FormGroup>
                            </div>
                            <div className="col-md-6">
                                <FormGroup>
                                    <Label htmlFor="district" className="input-label">{t('kecamatan')}</Label>
                                    <Select
                                        value={this.state.districtCurrent}
                                        onChange={value => this.onChangeDistrictCurrent(value)}
                                        options={this.state.districtsCurrent}
                                        isDisabled={this.state.editCurrentAddress === false ? true : false}
                                    />
                                </FormGroup>
                            </div>
                        </Row>
                        <Row>
                            <div className="col-md-6">
                                <FormGroup>
                                    <Label htmlFor="village" className="input-label">{t('kelurahan')}</Label>
                                    <Select
                                        value={this.state.villageCurrent}
                                        onChange={value => this.onChangeVillageCurrent(value)}
                                        options={this.state.villagesCurrent}
                                        isDisabled={this.state.editCurrentAddress === false ? true : false}
                                    />
                                </FormGroup>
                            </div>
                            <div className="col-md-6">
                                <FormGroup>
                                    <Label htmlFor="postalCodeCurrent" className="input-label">{t('kodepos')}</Label>
                                    <Input type="text" id="postalCodeCurrent" name="postalCodeCurrent" placeholder={t('kodepos')} disabled={this.state.editCurrentAddress === false ? true : false} value={this.state.postalCodeCurrent} onChange={this.handleInputChange} />
                                </FormGroup>
                            </div>
                        </Row>
                        <Row>
                            <div className="col-12">
                                <FormGroup>
                                    <Label htmlFor="addressCurrent" className="input-label">{t('alamat')}</Label>
                                    <Input type="textarea" name="addressCurrent" id="addressCurrent" rows="3" placeholder={t('alamat')} disabled={this.state.editCurrentAddress === false ? true : false} value={this.state.addressCurrent} onChange={this.handleInputChange} />
                                </FormGroup>
                            </div>
                        </Row>
                        <Row>
                            <div className="col-12 d-flex justify-content-end">
                                {
                                    this.state.editCurrentAddress === true ?
                                        this.state.loadingButton ? <Spinner color="dark" size="sm" /> :
                                            <Fragment>
                                                <Button color="white" className="btn-white mr-3" onClick={this.cancelEditCurrentAddress}>{t('batal')}</Button>
                                                <Button color="netis-color" style={{ width: '67px' }}>
                                                    {t('simpan')}
                                                </Button>
                                            </Fragment>
                                        : null
                                }
                            </div>
                        </Row>
                    </form>
                </div>
                {/* ===================================================== */}
                <div className="content-body">
                    <form onSubmit={(e) => this.editProfilePersonnel(e)}>
                        <Row>
                            <div className="col-12 d-flex justify-content-between align-items-center mb-3">
                                <h5 className="content-sub-title mb-0">{t('alamatdomisili')}</h5>
                                {
                                    this.state.editIdentityAddress === false ?
                                        <Button color="netis-color" className="btn-netis-color" onClick={this.editIdentityAddress}>
                                            <i className="fa fa-pencil" style={{ marginRight: 5 }}></i>Edit
                                </Button> : null
                                }
                            </div>
                        </Row>
                        <Row>
                            <div className="col-md-6">
                                <FormGroup>
                                    <Label htmlFor="country" className="input-label">{t('negara')}</Label>
                                    <Select
                                        value={this.state.countryIdentity}
                                        onChange={value => this.onChangeCountryIdentity(value)}
                                        options={this.state.countries}
                                        isDisabled={this.state.editIdentityAddress === false ? true : false}
                                    />
                                </FormGroup>
                            </div>
                            <div className="col-md-6">
                                <FormGroup>
                                    <Label htmlFor="province" className="input-label">{t('provinsi')}</Label>
                                    <Select
                                        value={this.state.provinceIdentity}
                                        onChange={value => this.onChangeProvinceIdentity(value)}
                                        options={this.state.provincesIdentity}
                                        isDisabled={this.state.editIdentityAddress === false ? true : false}
                                    />
                                </FormGroup>
                            </div>
                        </Row>
                        <Row>
                            <div className="col-md-6">
                                <FormGroup>
                                    <Label htmlFor="city" className="input-label">{t('kabupaten')}</Label>
                                    <Select
                                        value={this.state.cityIdentity}
                                        onChange={value => this.onChangeCityIdentity(value)}
                                        options={this.state.citiesIdentity}
                                        isDisabled={this.state.editIdentityAddress === false ? true : false}
                                    />
                                </FormGroup>
                            </div>
                            <div className="col-md-6">
                                <FormGroup>
                                    <Label htmlFor="district" className="input-label">{t('kecamatan')}</Label>
                                    <Select
                                        value={this.state.districtIdentity}
                                        onChange={value => this.onChangeDistrictIdentity(value)}
                                        options={this.state.districtsIdentity}
                                        isDisabled={this.state.editIdentityAddress === false ? true : false}
                                    />
                                </FormGroup>
                            </div>
                        </Row>
                        <Row>
                            <div className="col-md-6">
                                <FormGroup>
                                    <Label htmlFor="village" className="input-label">{t('kelurahan')}</Label>
                                    <Select
                                        value={this.state.villageIdentity}
                                        onChange={value => this.onChangeVillageIdentity(value)}
                                        options={this.state.villagesIdentity}
                                        isDisabled={this.state.editIdentityAddress === false ? true : false}
                                    />
                                </FormGroup>
                            </div>
                            <div className="col-md-6">
                                <FormGroup>
                                    <Label htmlFor="postalCodeIdentity" className="input-label">{t('kodepos')}</Label>
                                    <Input type="text" id="postalCodeIdentity" name="postalCodeIdentity" placeholder={t('kodepos')} disabled={this.state.editIdentityAddress === false ? true : false} value={this.state.postalCodeIdentity} onChange={this.handleInputChange} />
                                </FormGroup>
                            </div>
                        </Row>
                        <Row>
                            <div className="col-12">
                                <FormGroup>
                                    <Label htmlFor="addressIdentity" className="input-label">{t('alamat')}</Label>
                                    <Input type="textarea" name="addressIdentity" id="addressIdentity" rows="3" placeholder={t('alamat')} disabled={this.state.editIdentityAddress === false ? true : false} value={this.state.addressIdentity} onChange={this.handleInputChange} />
                                </FormGroup>
                            </div>
                        </Row>
                        <Row>
                            <div className="col-12 d-flex justify-content-end">
                                {
                                    this.state.editIdentityAddress === true ?
                                        this.state.loadingButton ? <Spinner color="dark" size="sm" /> :
                                            <Fragment>
                                                <Button color="white" className="btn-white mr-3" onClick={this.cancelEditIdentityAddress}>{t('batal')}</Button>
                                                <Button color="netis-color" style={{ width: '67px' }}>
                                                    {t('simpan')}
                                                </Button>
                                            </Fragment>
                                        : null
                                }
                            </div>
                        </Row>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.token,
        user: state.user,
    }
}
export default connect(mapStateToProps)(translate(PersonnelProfile));
