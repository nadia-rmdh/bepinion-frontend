import React, { Component, Fragment } from 'react';
import { Row, Button, Form, FormGroup, Input, Label, Spinner, Table, Badge, Modal, ModalBody } from 'reactstrap';
import axios from 'axios';
import Select from 'react-select';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import request from '../../../../utils/request';
import {
    translate,
} from 'react-switch-lang';
import { DatePickerInput } from 'rc-datepicker';
import 'rc-datepicker/lib/style.css'
toast.configure()
class CompanyAdditionalInfo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dropdownOpen: [false, false],
            session: props.token,
            loading: false,
            modalAddData: false,
            modalEditData: false,
            modalDeleteConfirmation: false,
            editDetail: false,
            editKbli: false,
            editIzinUsaha: false,
            editDireksi: false,
            editLogo: false,
            companies: [],
            companyTypes: [],
            kbli: [],
            currentKbli: [],
            currentIzinUsaha: [],
            currentDireksi: [],
            tempKbli: '',
            valueSelect: null,
            name: '',
            email: '',
            domain: '',
            taxNumber: '',
            phone: '',
            establish: '',
            founder: '',
            officeStatus: '',
            area: '',
            productionStatus: '',
            productionArea: '',
            socialMedia: '',
            correspondenceAddress: '',
            logoPath: '',
            type: {
                value: '', label: ''
            },
            parent: {
                value: '', label: ''
            },
            tempIzinUsaha: {},
            tempDireksi: {},
            foto: {},
            image: {
                preview: null, raw: null
            },
            logo: {},
            logoPreview: {
                preview: null, raw: null
            },
            tempName: '',
            tempEmail: '',
            tempDomain: '',
            tempTaxNumber: '',
            tempPhone: '',
            tempEstablish: '',
            tempFounder: '',
            tempOfficeStatus: '',
            tempArea: '',
            tempProductionStatus: '',
            tempProductionArea: '',
            tempSocialMedia: '',
            tempCorrespondenceAddress: '',
            tempType: {
                value: '', label: ''
            },
            tempParent: {
                value: '', label: ''
            },
            userPrivileges: this.props.user.privileges
        };
    }

    componentDidMount() {
        this.getDataCompany()
        this.getCompanyType()
        this.getDataKBLI()
        this.getDataIzinUsaha()
        this.getDataDireksi()
    }

    getDataCompany = () => {
        axios.get(process.env.REACT_APP_DOMAIN + `/api/v1/company`, { headers: { "Authorization": `Bearer ${this.state.session}` } })
            .then(res => {
                const companies = res.data.data[0];
                const kbli = [];
                const tempKbli = [];
                companies.kbli.map(data => {
                    tempKbli.push(data.id)
                    return kbli.push({ value: data.id, label: data.name, kode: data.kode })
                })
                this.setState({
                    name: companies.name,
                    email: companies.email,
                    domain: companies.domain,
                    taxNumber: companies.taxNumber,
                    phone: companies.phone,
                    establish: companies.establish,
                    founder: companies.founder,
                    officeStatus: companies.officeStatus,
                    area: companies.area,
                    productionStatus: companies.productionStatus,
                    productionArea: companies.productionArea,
                    socialMedia: companies.socialMedia,
                    correspondenceAddress: companies.correspondenceAddress,
                    currentKbli: kbli,
                    tempKbli: tempKbli.join(','),
                    logoPath: companies.logo,
                    parent: {
                        value: companies.parent.id, label: companies.parent.name
                    },
                    type: {
                        value: companies.type.id, label: companies.type.name
                    },
                    tempName: companies.name,
                    tempEmail: companies.email,
                    tempDomain: companies.domain,
                    tempTaxNumber: companies.taxNumber,
                    tempPhone: companies.phone,
                    tempEstablish: companies.establish,
                    tempFounder: companies.founder,
                    tempOfficeStatus: companies.officeStatus,
                    tempArea: companies.area,
                    tempProductionStatus: companies.productionStatus,
                    tempProductionArea: companies.productionArea,
                    tempSocialMedia: companies.socialMedia,
                    tempCorrespondenceAddress: companies.correspondenceAddress,
                    tempParent: {
                        value: companies.parent.id, label: companies.parent.name
                    },
                    tempType: {
                        value: companies.type.id, label: companies.type.name
                    },
                    address: companies.address,
                    postalCode: companies.postalCode,
                    country: {
                        value: companies.country.id, label: companies.country.name
                    },
                    province: {
                        value: companies.province.id, label: companies.province.name
                    },
                    city: {
                        value: companies.city.id, label: companies.city.name
                    },
                    district: {
                        value: companies.district.id, label: companies.district.name
                    },
                    village: {
                        value: companies.village.id, label: companies.village.name
                    },
                    tempAddress: companies.address,
                    tempPostalCode: companies.postalCode,
                    tempCountry: {
                        value: companies.country.id, label: companies.country.name
                    },
                    tempProvince: {
                        value: companies.province.id, label: companies.province.name
                    },
                    tempCity: {
                        value: companies.city.id, label: companies.city.name
                    },
                    tempDistrict: {
                        value: companies.district.id, label: companies.district.name
                    },
                    tempVillage: {
                        value: companies.village.id, label: companies.village.name
                    },
                });
                if (this.state.country.value === null || this.state.country.value === 0) {
                    this.setState({
                        country: {
                            value: null, label: null
                        }
                    })
                }
                if (this.state.tempCountry.value === null || this.state.tempCountry.value === 0) {
                    this.setState({
                        tempCountry: {
                            value: null, label: null
                        }
                    })
                }
                if (this.state.province.value === null || this.state.province.value === 0) {
                    this.setState({
                        province: {
                            value: null, label: null
                        }
                    })
                }
                if (this.state.tempProvince.value === null || this.state.tempProvince.value === 0) {
                    this.setState({
                        tempProvince: {
                            value: null, label: null
                        }
                    })
                }
                if (this.state.city.value === null || this.state.city.value === 0) {
                    this.setState({
                        city: {
                            value: null, label: null
                        }
                    })
                }
                if (this.state.tempCity.value === null || this.state.tempCity.value === 0) {
                    this.setState({
                        tempCity: {
                            value: null, label: null
                        }
                    })
                }
                if (this.state.district.value === null || this.state.district.value === 0) {
                    this.setState({
                        district: {
                            value: null, label: null
                        }
                    })
                }
                if (this.state.tempDistrict.value === null || this.state.tempDistrict.value === 0) {
                    this.setState({
                        tempDistrict: {
                            value: null, label: null
                        }
                    })
                }
                if (this.state.village.value === null || this.state.village.value === 0) {
                    this.setState({
                        village: {
                            value: null, label: null
                        }
                    })
                }
                if (this.state.tempVillage.value === null || this.state.tempVillage.value === 0) {
                    this.setState({
                        tempVillage: {
                            value: null, label: null
                        }
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    getCompanyType = () => {
        axios.get(process.env.REACT_APP_DOMAIN + `/api/v1/master/company-types`, { headers: { "Authorization": `Bearer ${this.state.session}` } })
            .then(res => {
                const companies = res.data.data;
                this.setState({
                    companyTypes: companies
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    getDataKBLI = async () => {
        try {
            const { data } = await request.get('v1/company/kbli');
            const dataApi = data.data;
            const kbli = [];
            let item = {};
            if (dataApi.length > 0) {
                dataApi.map(data => {
                    item = { ...item, value: data.id, label: data.name, kode: data.kode }
                    return kbli.push(item)
                })
            }
            this.setState({ kbli })
        } catch (err) {
            console.log(err)
        }
    }

    getDataIzinUsaha = async () => {
        try {
            const { data } = await request.get('v1/company/izin-usaha')
            this.setState({ currentIzinUsaha: data.data })
        } catch (err) {
            console.log(err)
        }
    }

    getDataDireksi = () => {
        request.get('v1/company/directors')
            .then(res => {
                this.setState({ currentDireksi: res.data.data })
            })
            .catch(err => {
                console.log(err)
            })
    }

    editDetail = () => {
        if (!this.state.userPrivileges.includes('edit-company-profile')) {
            toast.error('Maaf anda tidah boleh melakukan aksi ini.')
            return
        }
        this.setState({
            editDetail: true,
            editKbli: false,
            editIzinUsaha: false,
            editDireksi: false,
            editLogo: false
        })
    }

    editKbli = () => {
        if (!this.state.userPrivileges.includes('edit-company-profile')) {
            toast.error('Maaf anda tidah boleh melakukan aksi ini.')
            return
        }
        this.setState({
            editDetail: false,
            editKbli: true,
            editIzinUsaha: false,
            editDireksi: false,
            editLogo: false
        })
    }

    editIzinUsaha = () => {
        if (!this.state.userPrivileges.includes('edit-company-profile')) {
            toast.error('Maaf anda tidah boleh melakukan aksi ini.')
            return
        }
        this.setState({
            editDetail: false,
            editKbli: false,
            editIzinUsaha: true,
            editDireksi: false,
            editLogo: false
        })
    }

    editDireksi = () => {
        if (!this.state.userPrivileges.includes('edit-company-profile')) {
            toast.error('Maaf anda tidah boleh melakukan aksi ini.')
            return
        }
        this.setState({
            editDetail: false,
            editKbli: false,
            editIzinUsaha: false,
            editDireksi: true,
            editLogo: false
        })
    }

    editLogo = () => {
        if (!this.state.userPrivileges.includes('edit-company-profile')) {
            toast.error('Maaf anda tidah boleh melakukan aksi ini.')
            return
        }
        this.setState({
            editDetail: false,
            editKbli: false,
            editIzinUsaha: false,
            editDireksi: false,
            editLogo: true
        })
    }

    cancelEdit = () => {
        this.setState({
            valueSelect: null,
            editDetail: false,
            editKbli: false,
            editIzinUsaha: false,
            editDireksi: false,
            editLogo: false
        })
    }

    onChangeType(value) {
        this.setState({ type: value })
    }

    onChangeKbli = (value) => {
        this.setState({ valueSelect: value }, () => this.addKbli())
    }

    addKbli = () => {
        if (this.state.valueSelect === null) {
            toast.warning('Bidang Usaha Belum Dipilih', { autoClose: 3000 })
        } else {
            let tempKbliStr = JSON.parse("[" + this.state.tempKbli + "]")
            let tempKbli = this.state.currentKbli;
            tempKbliStr.push(this.state.valueSelect.value)
            tempKbli.push(this.state.valueSelect)
            this.setState({
                tempKbli: tempKbliStr.join(','),
                currentKbli: tempKbli
            })
        }
    }

    removeKbli = (idx) => {
        let tempKbliStr = JSON.parse("[" + this.state.tempKbli + "]")
        let tempKbli = this.state.currentKbli;
        tempKbliStr.splice(idx, 1)
        tempKbli.splice(idx, 1)
        this.setState({
            tempKbli: tempKbliStr.join(','),
            currentKbli: tempKbli
        })
    }

    onChange = (e) => {
        e.preventDefault();
        if (e.target.name === 'tahun-berdiri-perusahaan') this.setState({ establish: e.target.value.slice(0, 4) })
        if (e.target.name === 'pendiri-perusahaan') this.setState({ founder: e.target.value })
        if (e.target.name === 'status-kantor') this.setState({ officeStatus: e.target.value })
        if (e.target.name === 'luas-kantor') this.setState({ area: e.target.value })
        if (e.target.name === 'status-ruang-produksi') this.setState({ productionStatus: e.target.value })
        if (e.target.name === 'luas-ruang-produksi') this.setState({ productionArea: e.target.value })
        if (e.target.name === 'sosmed') this.setState({ socialMedia: e.target.value })
        if (e.target.name === 'alamat-korespondensi') this.setState({ correspondenceAddress: e.target.value })
        if (e.target.name === 'pos-code') this.setState({ postalCode: e.target.value })
        if (e.target.name === 'address') this.setState({ address: e.target.value })
        // izin usaha
        if (e.target.name === 'nama-izin-usaha') this.setState({ tempIzinUsaha: { ...this.state.tempIzinUsaha, nama: e.target.value } })
        if (e.target.name === 'deskripsi-izin-usaha') this.setState({ tempIzinUsaha: { ...this.state.tempIzinUsaha, deskripsi: e.target.value } })
        if (e.target.name === 'status-izin-usaha') this.setState({ tempIzinUsaha: { ...this.state.tempIzinUsaha, statusPerolehan: e.target.value } })
        if (e.target.name === 'tahun-izin-usaha') this.setState({ tempIzinUsaha: { ...this.state.tempIzinUsaha, tahunPerolehan: e.target.value.slice(0, 4) } })
        if (e.target.name === 'nomor-izin-usaha') this.setState({ tempIzinUsaha: { ...this.state.tempIzinUsaha, noIzin: e.target.value } })
        if (e.target.name === 'tanggal-izin-usaha') this.setState({ tempIzinUsaha: { ...this.state.tempIzinUsaha, tanggalBerlaku: this.formatDate(e.target.value) } })
        if (e.target.name === 'kadaluarsa-izin-usaha') this.setState({ tempIzinUsaha: { ...this.state.tempIzinUsaha, tanggalKadaluarsa: this.formatDate(e.target.value) } })
        // direksi
        if (e.target.name === 'nik-direksi') this.setState({ tempDireksi: { ...this.state.tempDireksi, nik: e.target.value.slice(0, 16) } })
        if (e.target.name === 'nama-direksi') this.setState({ tempDireksi: { ...this.state.tempDireksi, namaInventor: e.target.value } })
        if (e.target.name === 'jenis-kelamin-direksi') this.setState({ tempDireksi: { ...this.state.tempDireksi, jenisKelamin: e.target.value } })
        if (e.target.name === 'tanggal-lahir-direksi') this.setState({ tempDireksi: { ...this.state.tempDireksi, tanggalLahir: this.formatDate(e.target.value) } })
        if (e.target.name === 'jenjang-studi-direksi') this.setState({ tempDireksi: { ...this.state.tempDireksi, jenjangStudi: e.target.value } })
        if (e.target.name === 'jabatan-direksi') this.setState({ tempDireksi: { ...this.state.tempDireksi, jabatan: e.target.value } })
        if (e.target.name === 'institusi-direksi') this.setState({ tempDireksi: { ...this.state.tempDireksi, institusi: e.target.value } })
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

    onChangeFoto = (e) => {
        if (e.target.files.length) {
            var preview = { ...this.state.image };
            preview['preview'] = URL.createObjectURL(e.target.files[0]);
            this.setState({
                foto: e.target.files[0],
                image: preview
            });
        }
    }

    onChangeLogo = (e) => {
        if (e.target.files.length) {
            var preview = { ...this.state.image };
            preview['preview'] = URL.createObjectURL(e.target.files[0]);
            this.setState({
                logo: e.target.files[0],
                logoPreview: preview
            });
        }
    }

    editProfileCompany(e) {
        if (!this.state.userPrivileges.includes('edit-company-profile')) {
            toast.error('Maaf anda tidah boleh melakukan aksi ini.')
            return
        }
        this.setState({ loading: true })
        e.preventDefault();
        const dataObject = {
            // name: this.state.name,
            // parent: this.state.parent.value,
            // domain: this.state.domain,
            // email: this.state.email,
            // type: this.state.type.value,
            // taxNumber: this.state.taxNumber,
            phone: this.state.phone,
            establish: this.state.establish,
            founder: this.state.founder,
            officeStatus: this.state.officeStatus,
            area: this.state.area,
            productionStatus: this.state.productionStatus,
            productionArea: this.state.productionArea,
            socialMedia: this.state.socialMedia,
            correspondenceAddress: this.state.correspondenceAddress,
            kbli: this.state.tempKbli
        };
        axios.put(process.env.REACT_APP_DOMAIN + '/api/v1/company', dataObject, { headers: { "Authorization": `Bearer ${this.state.session}` } })
            .then((res) => {
                setTimeout(() => {
                    this.setState({
                        loading: false,
                        // tempName: this.state.name,
                        // tempEmail: this.state.email,
                        // tempDomain: this.state.domain,
                        // tempTaxNumber: this.state.taxNumber,
                        // tempPhone: this.state.phone,
                        tempEstablish: this.state.establish,
                        tempFounder: this.state.founder,
                        tempOfficeStatus: this.state.officeStatus,
                        tempArea: this.state.area,
                        tempProductionStatus: this.state.productionStatus,
                        tempProductionArea: this.state.productionArea,
                        tempSocialMedia: this.state.socialMedia,
                        tempCorrespondenceAddress: this.state.correspondenceAddress,
                        tempParent: {
                            value: this.state.parent.value, label: this.state.parent.label
                        },
                        tempType: {
                            value: this.state.type.value, label: this.state.type.label
                        },
                        editDetail: false,
                        editKbli: false
                    })
                    toast.success('Success', { autoClose: 3000 })
                }, 500)
            }).catch((error) => {
                setTimeout(() => {
                    this.setState({ loading: false })
                }, 500)
                if (error.response.status === 422) {
                    toast.error('Error', { autoClose: 3000 })
                }
            });
    }

    addIzinUsaha = () => {
        if (!this.state.userPrivileges.includes('edit-company-profile')) {
            toast.error('Maaf anda tidah boleh melakukan aksi ini.')
            return
        }
        this.setState({ loading: true })
        if (this.state.tempIzinUsaha.nama !== undefined) {
            request.post('v1/company/izin-usaha', this.state.tempIzinUsaha)
                .then(res => {
                    this.getDataIzinUsaha()
                    this.setState({
                        loading: false,
                        modalAddData: false
                    })
                    toast.success('Success')
                })
                .catch(err => {
                    this.setState({ loading: false })
                    toast.error(err.response.data.message)
                    console.log(err)
                })
        } else {
            this.setState({ loading: false })
            toast.warning('Nama Izin Usaha Belum Diisi')
        }
    }

    editDataIzinUsaha = (id, data) => {
        this.setState({
            [`izinUsahaOnEdit${id}`]: !this.state[`izinUsahaOnEdit${id}`],
            [`dataIzinUsaha${id}`]: data
        })
    }

    submitEditedIzinUsaha = (id, data) => {
        if (!this.state.userPrivileges.includes('edit-company-profile')) {
            toast.error('Maaf anda tidah boleh melakukan aksi ini.')
            return
        }
        this.setState({ loading: true })
        if (data.nama !== '') {
            request.put(`/v1/company/izin-usaha/${id}`, data)
                .then(res => {
                    this.getDataIzinUsaha()
                    this.setState({
                        loading: false,
                        [`izinUsahaOnEdit${id}`]: !this.state[`izinUsahaOnEdit${id}`],
                        modalEditData: !this.state.modalEditData,
                    })
                    toast.success('Success')
                })
                .catch(err => {
                    this.setState({ loading: false })
                    toast.error(err.response.data.message)
                    console.log(err)
                })
        } else {
            this.setState({ loading: false })
            toast.warning('Nama Izin Usaha Belum Diisi')
        }
    }

    modalAddData = (params) => {
        if (!this.state.userPrivileges.includes('edit-company-profile')) {
            toast.error('Maaf anda tidah boleh melakukan aksi ini.')
            return
        }
        this.setState({
            modalAddData: !this.state.modalAddData,
            addIzinUsaha: params === 'izin-usaha' ? true : false,
            addDireksi: params === 'direksi' ? true : false
        })
    }

    cancelModalAddData = () => {
        this.setState({
            modalAddData: !this.state.modalAddData,
            deleteIzinUsaha: false,
            deleteDireksi: false,
            tempIzinUsaha: {},
            tempDireksi: {}
        })
    }

    modalEditData = (data, params) => {
        if (!this.state.userPrivileges.includes('edit-company-profile')) {
            toast.error('Maaf anda tidah boleh melakukan aksi ini.')
            return
        }
        this.setState({
            modalEditData: !this.state.modalEditData,
            idEditData: data.id,
            tempIzinUsaha: params === 'izin-usaha' && data,
            tempDireksi: params === 'direksi' && data,
            editIzinUsaha: params === 'izin-usaha' ? true : false,
            editDireksi: params === 'direksi' ? true : false
        })
    }

    cancelModalEditData = () => {
        this.setState({
            modalEditData: !this.state.modalEditData,
            editIzinUsaha: false,
            editDireksi: false,
            tempIzinUsaha: {},
            tempDireksi: {}
        })
    }

    modalDeleteConfirmation = (id, params) => {
        if (!this.state.userPrivileges.includes('edit-company-profile')) {
            toast.error('Maaf anda tidah boleh melakukan aksi ini.')
            return
        }
        if (params === 'izin-usaha') this.setState({ deleteIzinUsaha: true })
        if (params === 'direksi') this.setState({ deleteDireksi: true })
        this.setState({
            modalDeleteConfirmation: true,
            modalEditData: !this.state.modalEditData,
            idDeleteData: id
        })
    }

    cancelModalDeleteConfirmation = () => {
        this.setState({
            modalDeleteConfirmation: false,
            deleteIzinUsaha: false,
            deleteDireksi: false
        })
    }

    removeIzinUsaha = async (id) => {
        if (!this.state.userPrivileges.includes('edit-company-profile')) {
            toast.error('Maaf anda tidah boleh melakukan aksi ini.')
            return
        }
        this.setState({ loadingButtonDelete: true })
        try {
            const res = await request.delete(`/v1/company/izin-usaha/${id}`)
            this.getDataIzinUsaha()
            this.cancelModalDeleteConfirmation()
            toast.success(res.data.message)
        } catch (err) {
            toast.error(err.response.data.message)
            console.log(err.response)
        } finally {
            this.setState({ loadingButtonDelete: false })
        }
    }

    addDireksi = () => {
        if (!this.state.userPrivileges.includes('edit-company-profile')) {
            toast.error('Maaf anda tidah boleh melakukan aksi ini.')
            return
        }
        this.setState({ loading: true })
        let formData = new FormData();
        this.state.foto.name && formData.append('foto', this.state.foto, this.state.foto.name)
        formData.append('nik', this.state.tempDireksi.nik)
        formData.append('namaInventor', this.state.tempDireksi.namaInventor)
        formData.append('jenisKelamin', this.state.tempDireksi.jenisKelamin)
        formData.append('tanggalLahir', this.state.tempDireksi.tanggalLahir)
        formData.append('jenjangStudi', this.state.tempDireksi.jenjangStudi)
        formData.append('jabatan', this.state.tempDireksi.jabatan)
        formData.append('institusi', this.state.tempDireksi.institusi)
        request.post('v1/company/directors', formData)
            .then(res => {
                this.getDataDireksi()
                this.setState({
                    loading: false,
                    tempDireksi: {},
                    modalAddData: false
                })
                toast.success('Success')
            })
            .catch(err => {
                this.setState({ loading: false })
                toast.error(err.response.data.message)
                console.log(err)
            })
    }

    editDataDireksi = (id, data) => {
        this.setState({
            [`direksiOnEdit${id}`]: !this.state[`direksiOnEdit${id}`],
            [`dataDireksi${id}`]: data,
            [`previewFotoDireksi${id}`]: {
                preview: null, raw: null
            }
        })
    }

    onChangeEditDireksi = (e, id) => {
        if (e.target.name === 'nik-direksi') this.setState({ [`dataDireksi${id}`]: { ...this.state[`dataDireksi${id}`], nik: e.target.value } })
        if (e.target.name === 'nama-direksi') this.setState({ [`dataDireksi${id}`]: { ...this.state[`dataDireksi${id}`], namaInventor: e.target.value } })
        if (e.target.name === 'jenis-kelamin-direksi') this.setState({ [`dataDireksi${id}`]: { ...this.state[`dataDireksi${id}`], jenisKelamin: e.target.value } })
        if (e.target.name === 'tanggal-lahir-direksi') this.setState({ [`dataDireksi${id}`]: { ...this.state[`dataDireksi${id}`], tanggalLahir: e.target.value } })
        if (e.target.name === 'jenjang-studi-direksi') this.setState({ [`dataDireksi${id}`]: { ...this.state[`dataDireksi${id}`], jenjangStudi: e.target.value } })
        if (e.target.name === 'jabatan-direksi') this.setState({ [`dataDireksi${id}`]: { ...this.state[`dataDireksi${id}`], jabatan: e.target.value } })
        if (e.target.name === 'institusi-direksi') this.setState({ [`dataDireksi${id}`]: { ...this.state[`dataDireksi${id}`], institusi: e.target.value } })
    }

    onChangeEditDireksiFoto = (e, id) => {
        if (e.target.files.length) {
            var preview = { ...this.state[`previewFotoDireksi${id}`] };
            preview['preview'] = URL.createObjectURL(e.target.files[0]);
            this.setState({
                [`fotoDireksi${id}`]: e.target.files[0],
                [`previewFotoDireksi${id}`]: preview
            });
        }
    }

    submitEditedDireksi = (id, data) => {
        if (!this.state.userPrivileges.includes('edit-company-profile')) {
            toast.error('Maaf anda tidah boleh melakukan aksi ini.')
            return
        }
        this.setState({ loading: true })
        let formData = new FormData();
        this.state.foto.name && formData.append('foto', this.state.foto, this.state.foto.name)
        formData.append('nik', this.state.tempDireksi.nik)
        formData.append('namaInventor', this.state.tempDireksi.namaInventor)
        formData.append('jenisKelamin', this.state.tempDireksi.jenisKelamin)
        formData.append('tanggalLahir', this.state.tempDireksi.tanggalLahir)
        formData.append('jenjangStudi', this.state.tempDireksi.jenjangStudi)
        formData.append('jabatan', this.state.tempDireksi.jabatan)
        formData.append('institusi', this.state.tempDireksi.institusi)
        request.post(`v1/company/directors/${id}`, formData)
            .then(res => {
                this.getDataDireksi()
                this.setState({
                    loading: false,
                    [`direksiOnEdit${id}`]: !this.state[`direksiOnEdit${id}`],
                    modalEditData: !this.state.modalEditData,
                })
                toast.success('Success')
            })
            .catch(err => {
                this.setState({ loading: false })
                toast.error(err.response.data.message)
                console.log(err)
            })
    }

    removeDireksi = async (id) => {
        if (!this.state.userPrivileges.includes('edit-company-profile')) {
            toast.error('Maaf anda tidah boleh melakukan aksi ini.')
            return
        }
        this.setState({ loadingButtonDelete: true })
        try {
            const res = await request.delete(`/v1/company/directors/${id}`)
            this.getDataDireksi()
            this.cancelModalDeleteConfirmation()
            toast.success(res.data.message)
        } catch (err) {
            toast.error(err.response.data.message)
            console.log(err.response)
        } finally {
            this.setState({ loadingButtonDelete: false })
        }
    }

    submitLogo = () => {
        if (!this.state.userPrivileges.includes('edit-company-profile')) {
            toast.error('Maaf anda tidah boleh melakukan aksi ini.')
            return
        }
        this.setState({ loading: true })
        let formData = new FormData();
        this.state.logo.name && formData.append('logo', this.state.logo, this.state.logo.name)
        request.post('v1/company', formData)
            .then(res => {
                this.getDataCompany()
                this.setState({ loading: false, editLogo: false })
                toast.success('Success')
            })
            .catch(err => {
                this.setState({ loading: false })
                toast.error(err.response.data.message)
                console.log(err)
            })
    }

    reactSelectStyle = {
        control: (styles, { data, isDisabled, isFocused, isSelected }) => {
            return {
                ...styles,
                backgroundColor: isDisabled ? '#fafbfd' : null,
                cursor: isDisabled ? 'no-drop' : 'default'
            };
        },
        container: styles => ({
            ...styles,
            zIndex: '1002'
        }),
        indicatorSeparator: styles => ({
            ...styles,
            display: "none"
        }),
        dropdownIndicator: (styles, { data, isDisabled, isFocused, isSelected }) => {
            return {
                ...styles,
                display: isDisabled ? 'none' : null
            };
        }
    }

    render() {
        // eslint-disable-next-line
        this.state.companies.map((data, idx) => {
            data['value'] = data['id'];
            data['label'] = data['name'];
        });
        // eslint-disable-next-line
        this.state.companyTypes.map((data, idx) => {
            data['value'] = data['id'];
            data['label'] = data['name'];
        });
        const { t } = this.props;
        return (
            <div className="animated fadeIn" >
                <div className="content-body">
                    <Row>
                        <div className="col-12 d-flex justify-content-between align-items-center mb-3">
                            <h5 className="content-sub-title mb-0">{t('informasitambahan')} {t('perusahaan')}</h5>
                            {this.state.editDetail === false ?
                                <Button color="netis-color" className={`${this.state.userPrivileges.includes('edit-company-profile') ? '' : ' d-none'}`} onClick={this.editDetail}>
                                    <i className={`fa fa-pencil mr-2`}></i>Edit
                                </Button> : null
                            }
                        </div>
                    </Row>
                    <Form onSubmit={(e) => this.editProfileCompany(e)}>
                        <Row>
                            <div className="col-md-6">
                                <FormGroup>
                                    <Label htmlFor="tahun-berdiri-perusahaan" className="input-label">{t('tahunberdiri')}</Label>
                                    <Input type="number" id="tahun-berdiri-perusahaan" name="tahun-berdiri-perusahaan"
                                        onWheel={(e) => { e.target.blur() }}
                                        value={this.state.establish || ''}
                                        disabled={!this.state.editDetail}
                                        onChange={(e) => this.onChange(e)} />
                                </FormGroup>
                            </div>
                            <div className="col-md-6">
                                <FormGroup>
                                    <Label htmlFor="pendiri-perusahaan" className="input-label">{t('pendiriperusahaan')}</Label>
                                    <Input type="text" id="pendiri-perusahaan" name="pendiri-perusahaan"
                                        value={this.state.founder || ''}
                                        disabled={!this.state.editDetail}
                                        onChange={(e) => this.onChange(e)} />
                                </FormGroup>
                            </div>
                        </Row>
                        <Row>
                            <div className="col-md-6">
                                <FormGroup>
                                    <Label htmlFor="status-kantor" className="input-label">{t('statuskepemilikankantor')}</Label>
                                    <Input type="text" id="status-kantor" name="status-kantor"
                                        value={this.state.officeStatus || ''}
                                        disabled={!this.state.editDetail}
                                        onChange={(e) => this.onChange(e)} />
                                </FormGroup>
                            </div>
                            <div className="col-md-6">
                                <FormGroup>
                                    <Label htmlFor="luas-kantor" className="input-label">{t('luaskantor')}(m<sup>2</sup>)</Label>
                                    <Input type="number" id="luas-kantor" name="luas-kantor"
                                        onWheel={(e) => { e.target.blur() }}
                                        value={this.state.area || ''}
                                        disabled={!this.state.editDetail}
                                        onChange={(e) => this.onChange(e)} />
                                </FormGroup>
                            </div>
                        </Row>
                        <Row>
                            <div className="col-md-6">
                                <FormGroup>
                                    <Label htmlFor="status-ruang-produksi" className="input-label">{t('statuskepemilikanproduksi')}</Label>
                                    <Input type="text" id="status-ruang-produksi" name="status-ruang-produksi"
                                        value={this.state.productionStatus || ''}
                                        disabled={!this.state.editDetail}
                                        onChange={(e) => this.onChange(e)} />
                                </FormGroup>
                            </div>
                            <div className="col-md-6">
                                <FormGroup>
                                    <Label htmlFor="luas-ruang-produksi" className="input-label">{t('luasproduksi')} (m<sup>2</sup>)</Label>
                                    <Input type="number" id="luas-ruang-produksi" name="luas-ruang-produksi"
                                        onWheel={(e) => { e.target.blur() }}
                                        value={this.state.productionArea || ''}
                                        disabled={!this.state.editDetail}
                                        onChange={(e) => this.onChange(e)} />
                                </FormGroup>
                            </div>
                        </Row>
                        <Row>
                            <div className="col-md-6">
                                <FormGroup>
                                    <Label htmlFor="sosmed" className="input-label">{t('mediasosial')}</Label>
                                    <Input type="text" id="sosmed" name="sosmed"
                                        value={this.state.socialMedia || ''}
                                        disabled={!this.state.editDetail}
                                        onChange={(e) => this.onChange(e)} />
                                </FormGroup>
                            </div>
                            <div className="col-md-6">
                                <FormGroup>
                                    <Label htmlFor="alamat-korespondensi" className="input-label">{t('alamatkorespondensi')}</Label>
                                    <Input type="text" id="alamat-korespondensi" name="alamat-korespondensi"
                                        value={this.state.correspondenceAddress || ''}
                                        disabled={!this.state.editDetail}
                                        onChange={(e) => this.onChange(e)} />
                                </FormGroup>
                            </div>
                        </Row>
                        <Row>
                            <div className="col-12 d-flex justify-content-end">
                                {this.state.editDetail === true ?
                                    <Fragment>
                                        <Button color="white" className="btn-white mr-3" onClick={this.cancelEdit}>{t('batal')}</Button>
                                        <Button color="netis-color" disabled={this.state.loading} style={{ width: '67px' }}>
                                            {this.state.loading ? <Spinner color="light" size="sm" /> : t('simpan')}
                                        </Button>
                                    </Fragment>
                                    : null
                                }
                            </div>
                        </Row>
                    </Form>
                </div>

                <div className="content-body">
                    <Row>
                        <div className="col-12 d-flex justify-content-between align-items-center mb-3">
                            <h5 className="content-sub-title mb-0">{t('daftarbidangusaha')}</h5>
                            {this.state.editKbli ||
                                <Button color="netis-color" className={`${this.state.userPrivileges.includes('edit-company-profile') ? '' : ' d-none'}`} onClick={this.editKbli}>
                                    <i className={`fa fa-pencil mr-2`}></i>Edit
                                </Button>
                            }
                        </div>
                    </Row>
                    <Form onSubmit={(e) => this.editProfileCompany(e)}>
                        <Row>
                            <div className="col-12">
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th className="w-10">No.</th>
                                            <th className="w-20">{t('kode')} KBLI</th>
                                            <th className="">{t('nama')} KBLI</th>
                                            {this.state.editKbli && <th className="w-10"></th>}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.currentKbli.length > 0 ?
                                            this.state.currentKbli.map((data, idx) => {
                                                return (
                                                    <tr key={idx}>
                                                        <td className="">{idx + 1}</td>
                                                        <td className="">{data.kode}</td>
                                                        <td className="">{data.label}</td>
                                                        {this.state.editKbli &&
                                                            <td className="text-center">
                                                                <Button outline color="danger" className="btn-thin" onClick={() => this.removeKbli(idx)}><h6 className="m-0"><i className="fa fa-trash"></i> {t('hapus')}</h6></Button>
                                                            </td>
                                                        }
                                                    </tr>
                                                )
                                            })
                                            :
                                            <tr key={"no_data"}>
                                                <td className="text-center no-data-message" colSpan="4">No Data :(</td>
                                            </tr>
                                        }
                                        {this.state.editKbli &&
                                            <tr className="">
                                                <td className=""></td>
                                                <td className=""></td>
                                                <td className="">
                                                    <Select
                                                        name="kbli"
                                                        placeholder={t('pilih') + ' ' + t('bidangusaha')}
                                                        options={this.state.kbli}
                                                        onChange={value => this.onChangeKbli(value)}
                                                        isDisabled={!this.state.editKbli}
                                                        styles={this.reactSelectStyle}
                                                        menuPortalTarget={document.querySelector('body')}
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    <Button color="netis-color " className={`btn-thin`} onClick={this.addKbli}><h6 className="m-0"><i className="fa fa-plus"></i> {t('tambah')} </h6></Button>
                                                </td>
                                            </tr>
                                        }
                                    </tbody>
                                </Table>
                            </div>
                        </Row>
                        <Row>
                            <div className="col-12 d-flex justify-content-end">
                                {this.state.editKbli === true ?
                                    <Fragment>
                                        <Button color="white" className="btn-white mr-3" onClick={this.cancelEdit}>{t('batal')}</Button>
                                        <Button color="netis-color" disabled={this.state.loading} style={{ width: '67px' }}>
                                            {this.state.loading ? <Spinner color="light" size="sm" /> : t('simpan')}
                                        </Button>
                                    </Fragment>
                                    : null
                                }
                            </div>
                        </Row>
                    </Form>
                </div>

                <div className="content-body mt-3">
                    <Row>
                        <div className="col-12 d-flex justify-content-between align-items-center mb-3">
                            <h5 className="content-sub-title mb-0">{t('daftarizinperusahaan')}</h5>
                            <Button color="netis-color" className={`${this.state.userPrivileges.includes('edit-company-profile') ? '' : ' d-none'}`} onClick={() => this.modalAddData("izin-usaha")}>
                                <i className={`fa fa-plus mr-2`}></i>{t('tambah')} Data
                            </Button>
                        </div>
                    </Row>
                    <Row>
                        <div className="col-12">
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th className="w">{t('namaizin')}</th>
                                        <th className="w-">{t('deskripsi')}</th>
                                        <th className="">{t('statusperolehan')}</th>
                                        <th className="">{t('tahunperolehan')}</th>
                                        <th className="">{t('nosuratizin')}</th>
                                        <th className="">{t('tglmulaiberlaku')}</th>
                                        <th className="">{t('tglselesaiberlaku')}</th>
                                        <th className="w-10"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.currentIzinUsaha.length > 0 ?
                                        this.state.currentIzinUsaha.map((data, idx) => {
                                            return (
                                                <tr key={idx}>
                                                    <td className="">{data.nama}</td>
                                                    <td className="">{data.deskripsi}</td>
                                                    <td className="">{data.statusPerolehan}</td>
                                                    <td className="">{data.tahunPerolehan}</td>
                                                    <td className="">{data.noIzin}</td>
                                                    <td className="">{data.tanggalBerlaku}</td>
                                                    <td className="">{data.tanggalKadaluarsa}</td>
                                                    <td className="text-center">
                                                        <Badge className={`btn-netis-color mr-1 badge-btn${this.state.userPrivileges.includes('edit-company-profile') ? '' : ' d-none'}`} onClick={() => this.modalEditData(data, "izin-usaha")}><h6 className="m-0"><i className="fa fa-pencil"></i> Edit</h6></Badge>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                        :
                                        <tr key={"no_data"}>
                                            <td className="text-center no-data-message" colSpan="8">No Data :(</td>
                                        </tr>
                                    }
                                </tbody>
                            </Table>
                        </div>
                    </Row>
                </div>

                <div className="content-body mt-3">
                    <Row>
                        <div className="col-12 d-flex justify-content-between align-items-center mb-3">
                            <h5 className="content-sub-title mb-0">{t('daftardireksiperusahaan')}</h5>
                            <Button color="netis-color" className={`${this.state.userPrivileges.includes('edit-company-profile') ? '' : ' d-none'}`} onClick={() => this.modalAddData("direksi")}>
                                <i className={`fa fa-plus mr-2`}></i>{t('tambah')} Data
                            </Button>
                        </div>
                    </Row>
                    <Row>
                        <div className="col-12">
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th className="w-">NIK ({t('nomor')} KTP)</th>
                                        <th className="w-">{t('nama')} Inventor</th>
                                        <th className="tex-center">{t('foto')}</th>
                                        <th className="">{t('jk')}</th>
                                        <th className="">{t('tanggallahir')}</th>
                                        <th className="">{t('jenjangpendidikanterakhir')}</th>
                                        <th className="">{t('jabatandalamtim')}</th>
                                        <th className="">{t('institusi')}</th>
                                        <th className="w-10"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.currentDireksi.length > 0 ?
                                        this.state.currentDireksi.map((data, idx) => {
                                            return (
                                                <tr key={idx}>
                                                    <td className="">{data.nik}</td>
                                                    <td className="">{data.namaInventor}</td>
                                                    <td className="text-center">
                                                        <img src={`${process.env.REACT_APP_DOMAIN}${data.foto}`} alt="foto-direksi" className="img-fluid" style={{ maxWidth: '150px', maxHeight: '200px' }} />
                                                    </td>
                                                    <td className="">{data.jenisKelamin}</td>
                                                    <td className="">{data.tanggalLahir}</td>
                                                    <td className="">{data.jenjangStudi}</td>
                                                    <td className="">{data.jabatan}</td>
                                                    <td className="">{data.institusi}</td>
                                                    <td className="text-center">
                                                        <Badge className={`btn-netis-color badge-btn${this.state.userPrivileges.includes('edit-company-profile') ? '' : ' d-none'}`} onClick={() => this.modalEditData(data, "direksi")}><h6 className="m-0"><i className="fa fa-pencil"></i> Edit</h6></Badge>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                        :
                                        <tr key={"no_data"}>
                                            <td className="text-center no-data-message" colSpan="9">No Data :(</td>
                                        </tr>
                                    }
                                </tbody>
                            </Table>
                        </div>
                    </Row>
                </div>

                <div className="content-body mb-5">
                    <Row>
                        <div className="col-12 d-flex justify-content-between align-items-center mb-3">
                            <h5 className="content-sub-title mb-0">Logo {t('perusahaan')}</h5>
                            {this.state.editLogo ||
                                <Button color="netis-color" className={`${this.state.userPrivileges.includes('edit-company-profile') ? '' : ' d-none'}`} onClick={this.editLogo}>
                                    <i className={`fa fa-pencil mr-2`}></i>Edit
                                </Button>
                            }
                        </div>
                    </Row>
                    <Row>
                        <div className="col-12">
                            {this.state.logoPreview.preview !== null ?
                                <img src={this.state.logoPreview.preview} alt="logo-company" className="img-fluid" style={{ width: '50%' }} /> :
                                <img src={`${process.env.REACT_APP_DOMAIN}${this.state.logoPath}`} alt="logo-company" className="img-fluid img-logo" />
                            }
                            {this.state.editLogo && <Input type="file" name="foto-direksi" placeholder="Photo" onChange={this.onChangeLogo} />}
                        </div>
                    </Row>
                    <Row>
                        <div className="col-12 d-flex justify-content-end">
                            {this.state.editLogo &&
                                <Fragment>
                                    <Button color="white" className="btn-white mr-3" onClick={this.cancelEdit}>{t('batal')}</Button>
                                    <Button color="netis-color" disabled={this.state.loading} style={{ width: '67px' }} onClick={this.submitLogo}>
                                        {this.state.loading ? <Spinner color="light" size="sm" /> : t('simpan')}
                                    </Button>
                                </Fragment>
                            }
                        </div>
                    </Row>
                </div>

                {/* Modal Box Add Data */}
                <Modal isOpen={this.state.modalAddData} toggle={this.cancelModalAddData} className={this.props.className}>
                    <ModalBody>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h5 className="content-sub-title mb-0">
                                {t('tambah')} Data
                                {this.state.addIzinUsaha && " Izin Usaha"}
                                {this.state.addDireksi && " Direksi"}
                            </h5>
                            <Button color="link" size="lg" className="text-danger" onClick={this.cancelModalAddData}><strong>&times;</strong></Button>
                        </div>
                        {this.state.addIzinUsaha &&
                            <Form>
                                <Row className="">
                                    <div className="col-12">
                                        <FormGroup>
                                            <Label htmlFor="nama-izin-usaha" className="input-label">{t('namaizin')}</Label>
                                            <Input type="text" id="nama-izin-usaha" name="nama-izin-usaha"
                                                onChange={(e) => this.onChange(e)} />
                                        </FormGroup>
                                    </div>
                                </Row>
                                <Row className="">
                                    <div className="col-12">
                                        <FormGroup>
                                            <Label htmlFor="deskripsi-izin-usaha" className="input-label">{t('deskripsi')}</Label>
                                            <Input type="textarea" id="deskripsi-izin-usaha" name="deskripsi-izin-usaha" rows="3"
                                                onChange={(e) => this.onChange(e)} />
                                        </FormGroup>
                                    </div>
                                </Row>
                                <Row className="">
                                    <div className="col-12">
                                        <FormGroup>
                                            <Label htmlFor="status-izin-usaha" className="input-label">{t('statusperolehan')}</Label>
                                            <Input type="text" id="status-izin-usaha" name="status-izin-usaha"
                                                onChange={(e) => this.onChange(e)} />
                                        </FormGroup>
                                    </div>
                                </Row>
                                <Row className="">
                                    <div className="col-md-6">
                                        <FormGroup>
                                            <Label htmlFor="tahun-izin-usaha" className="input-label">{t('tahunperolehan')}</Label>
                                            <Input type="number" id="tahun-izin-usaha" name="tahun-izin-usaha"
                                                onWheel={(e) => { e.target.blur() }}
                                                onChange={(e) => this.onChange(e)}
                                                value={this.state.tempIzinUsaha.tahunPerolehan} />
                                        </FormGroup>
                                    </div>
                                    <div className="col-md-6">
                                        <FormGroup>
                                            <Label htmlFor="nomor-izin-usaha" className="input-label">{t('nosuratizin')}</Label>
                                            <Input type="number" id="nomor-izin-usaha" name="nomor-izin-usaha"
                                                onWheel={(e) => { e.target.blur() }}
                                                onChange={(e) => this.onChange(e)} />
                                        </FormGroup>
                                    </div>
                                </Row>
                                <Row className="">
                                    <div className="col-md-6">
                                        <FormGroup>
                                            <Label htmlFor="tanggal-izin-usaha" className="input-label">{t('tglmulaiberlaku')}</Label>
                                            <DatePickerInput
                                                showOnInputClick={true}
                                                closeOnClickOutside={true}
                                                onChange={(e) => {
                                                    const data = {
                                                        target: {
                                                            value: e,
                                                            name: 'tanggal-izin-usaha'
                                                        },
                                                        preventDefault: () => { }
                                                    }
                                                    this.onChange(data)
                                                }}
                                                name="tanggal-izin-usaha"
                                                id="tanggal-izin-usaha"
                                                value={this.state.tempIzinUsaha?.tanggalBerlaku}
                                                className='my-custom-datepicker-component'
                                                displayFormat="DD MMMM YYYY"
                                                readOnly
                                                maxDate={this.state.tempIzinUsaha?.tanggalKadaluarsa ? this.state.tempIzinUsaha?.tanggalKadaluarsa : new Date()}
                                            />

                                        </FormGroup>
                                    </div>
                                    <div className="col-md-6">
                                        <FormGroup>
                                            <Label htmlFor="kadaluarsa-izin-usaha" className="input-label">{t('tglselesaiberlaku')}</Label>
                                            <DatePickerInput
                                                onChange={(e) => {
                                                    const data = {
                                                        target: {
                                                            value: e,
                                                            name: 'kadaluarsa-izin-usaha'
                                                        },
                                                        preventDefault: () => { }
                                                    }
                                                    this.onChange(data)
                                                }}
                                                className='my-custom-datepicker-component'
                                                showOnInputClick={true}
                                                closeOnClickOutside={true}
                                                displayFormat="DD MMMM YYYY"
                                                readOnly
                                                minDate={this.state.tempIzinUsaha.tanggalBerlaku}
                                            />
                                        </FormGroup>
                                    </div>
                                </Row>
                            </Form>
                        }
                        {this.state.addDireksi &&
                            <>
                                <Row className="">
                                    <div className="col-12">
                                        <FormGroup>
                                            <Label htmlFor="nik-direksi" className="input-label">NIK ({t('nomor')} KTP)</Label>
                                            <Input type="number" onWheel={(e) => { e.target.blur() }} id="nik-direksi" name="nik-direksi"
                                                onChange={(e) => this.onChange(e)} value={this.state.tempDireksi.nik} />
                                        </FormGroup>
                                    </div>
                                </Row>
                                <Row className="">
                                    <div className="col-12">
                                        <FormGroup>
                                            <Label htmlFor="nama-direksi" className="input-label">{t('nama')} Inventor</Label>
                                            <Input type="text" id="nama-direksi" name="nama-direksi"
                                                onChange={(e) => this.onChange(e)} />
                                        </FormGroup>
                                    </div>
                                </Row>
                                <Row className="">
                                    <div className="col-md-6">
                                        <FormGroup>
                                            <Label htmlFor="foto-direksi" className="input-label">{t('foto')}</Label>
                                            {this.state.image.preview && <div><img src={this.state.image.preview} alt="foto-direksi" className="img-fluid" style={{ maxWidth: '150px', maxHeight: '200px' }} /></div>}
                                            <Input type="file" di="foto-direksi" name="foto-direksi" onChange={this.onChangeFoto} />
                                        </FormGroup>
                                    </div>
                                    <div className="col-md-6">
                                        <FormGroup>
                                            <Label htmlFor="jenis-kelamin-direksi" className="input-label">{t('jk')}</Label>
                                            <Input type="text" id="jenis-kelamin-direksi" name="jenis-kelamin-direksi"
                                                onChange={(e) => this.onChange(e)} />
                                        </FormGroup>
                                    </div>
                                </Row>
                                <Row className="">
                                    <div className="col-md-6">
                                        <FormGroup>
                                            <Label htmlFor="tanggal-lahir-direksi" className="input-label">{t('tanggallahir')}</Label>
                                            <DatePickerInput
                                                onChange={(e) => {
                                                    const data = {
                                                        target: {
                                                            value: e,
                                                            name: 'tanggal-lahir-direksi'
                                                        },
                                                        preventDefault: () => { }
                                                    }
                                                    this.onChange(data)
                                                }}
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
                                            <Label htmlFor="jenjang-studi-direksi" className="input-label">{t('jenjangpendidikanterakhir')}</Label>
                                            <Input type="text" id="jenjang-studi-direksi" name="jenjang-studi-direksi"
                                                onChange={(e) => this.onChange(e)} />
                                        </FormGroup>
                                    </div>
                                </Row>
                                <Row className="">
                                    <div className="col-md-6">
                                        <FormGroup>
                                            <Label htmlFor="jabatan-direksi" className="input-label">{t('jabatandalamtim')}</Label>
                                            <Input type="text" id="jabatan-direksi" name="jabatan-direksi"
                                                onChange={(e) => this.onChange(e)} />
                                        </FormGroup>
                                    </div>
                                    <div className="col-md-6">
                                        <FormGroup>
                                            <Label htmlFor="institusi-direksi" className="input-label">{t('institusi')}</Label>
                                            <Input type="text" id="institusi-direksi" name="institusi-direksi"
                                                onChange={(e) => this.onChange(e)} />
                                        </FormGroup>
                                    </div>
                                </Row>
                            </>
                        }
                        <Row>
                            <div className="col-12 d-flex justify-content-end">
                                <Button className="mr-2" color="white" onClick={this.cancelModalAddData}>{t('batal')}</Button>
                                {this.state.addIzinUsaha &&
                                    <Button color="netis-color" style={{ width: '70px' }} disabled={this.state.loading} onClick={() => this.addIzinUsaha()}>
                                        {this.state.loading ? <Spinner color="light" size="sm" /> : t('simpan')}
                                    </Button>
                                }
                                {this.state.addDireksi &&
                                    <Button color="netis-color" style={{ width: '70px' }} disabled={this.state.loading} onClick={() => this.addDireksi()}>
                                        {this.state.loading ? <Spinner color="light" size="sm" /> : t('simpan')}
                                    </Button>
                                }
                            </div>
                        </Row>
                    </ModalBody>
                </Modal>

                {/* Modal Box Edit Data */}
                <Modal isOpen={this.state.modalEditData} toggle={this.cancelModalEditData} className={this.props.className}>
                    <ModalBody>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h5 className="content-sub-title mb-0">
                                Edit Data
                                {this.state.editIzinUsaha && " Izin Usaha"}
                                {this.state.editDireksi && " Direksi"}
                            </h5>
                            <Button color="link" size="lg" className="text-danger" onClick={this.cancelModalEditData}><strong>&times;</strong></Button>
                        </div>
                        {this.state.editIzinUsaha &&
                            <>
                                <Row className="">
                                    <div className="col-12">
                                        <FormGroup>
                                            <Label htmlFor="nama-izin-usaha" className="input-label">{t('namaizin')}</Label>
                                            <Input type="text" id="nama-izin-usaha" name="nama-izin-usaha"
                                                value={this.state.tempIzinUsaha.nama}
                                                onChange={(e) => this.onChange(e)} />
                                        </FormGroup>
                                    </div>
                                </Row>
                                <Row className="">
                                    <div className="col-12">
                                        <FormGroup>
                                            <Label htmlFor="deskripsi-izin-usaha" className="input-label">{t('deskripsi')}</Label>
                                            <Input type="textarea" id="deskripsi-izin-usaha" name="deskripsi-izin-usaha" rows="3"
                                                value={this.state.tempIzinUsaha.deskripsi}
                                                onChange={(e) => this.onChange(e)} />
                                        </FormGroup>
                                    </div>
                                </Row>
                                <Row className="">
                                    <div className="col-12">
                                        <FormGroup>
                                            <Label htmlFor="status-izin-usaha" className="input-label">{t('statusperolehan')}</Label>
                                            <Input type="text" id="status-izin-usaha" name="status-izin-usaha"
                                                value={this.state.tempIzinUsaha.statusPerolehan}
                                                onChange={(e) => this.onChange(e)} />
                                        </FormGroup>
                                    </div>
                                </Row>
                                <Row className="">
                                    <div className="col-md-6">
                                        <FormGroup>
                                            <Label htmlFor="tahun-izin-usaha" className="input-label">{t('tahunperolehan')}</Label>
                                            <Input type="number" onWheel={(e) => { e.target.blur() }} id="tahun-izin-usaha" name="tahun-izin-usaha"
                                                value={this.state.tempIzinUsaha.tahunPerolehan}
                                                onChange={(e) => this.onChange(e)} />
                                        </FormGroup>
                                    </div>
                                    <div className="col-md-6">
                                        <FormGroup>
                                            <Label htmlFor="nomor-izin-usaha" className="input-label">{t('nosuratizin')}</Label>
                                            <Input type="number" onWheel={(e) => { e.target.blur() }} id="nomor-izin-usaha" name="nomor-izin-usaha"
                                                value={this.state.tempIzinUsaha.noIzin}
                                                onChange={(e) => this.onChange(e)} />
                                        </FormGroup>
                                    </div>
                                </Row>
                                <Row className="mb-3">
                                    <div className="col-md-6">
                                        <FormGroup>
                                            <Label htmlFor="tanggal-izin-usaha" className="input-label">{t('tglmulaiberlaku')}</Label>
                                            <DatePickerInput
                                                onChange={(e) => {
                                                    const data = {
                                                        target: {
                                                            value: e,
                                                            name: 'tanggal-izin-usaha'
                                                        },
                                                        preventDefault: () => { }
                                                    }
                                                    this.onChange(data)
                                                }}
                                                value={this.state.tempIzinUsaha.tanggalBerlaku}
                                                className='my-custom-datepicker-component'
                                                showOnInputClick={true}
                                                closeOnClickOutside={true}
                                                displayFormat="DD MMMM YYYY"
                                                readOnly
                                                maxDate={this.state.tempIzinUsaha?.tanggalKadaluarsa ? this.state.tempIzinUsaha?.tanggalKadaluarsa : new Date()}
                                            />
                                        </FormGroup>
                                    </div>
                                    <div className="col-md-6">
                                        <FormGroup>
                                            <Label htmlFor="kadaluarsa-izin-usaha" className="input-label">{t('tglselesaiberlaku')}</Label>
                                            <DatePickerInput
                                                onChange={(e) => {
                                                    const data = {
                                                        target: {
                                                            value: e,
                                                            name: 'kadaluarsa-izin-usaha'
                                                        },
                                                        preventDefault: () => { }
                                                    }
                                                    this.onChange(data)
                                                }}
                                                value={this.state.tempIzinUsaha.tanggalKadaluarsa}
                                                className='my-custom-datepicker-component'
                                                showOnInputClick={true}
                                                closeOnClickOutside={true}
                                                displayFormat="DD MMMM YYYY"
                                                readOnly
                                                minDate={this.state.tempIzinUsaha.tanggalBerlaku}
                                            />
                                        </FormGroup>
                                    </div>
                                </Row>
                            </>
                        }
                        {this.state.editDireksi &&
                            <>
                                <Row className="">
                                    <div className="col-12">
                                        <FormGroup>
                                            <Label htmlFor="nik-direksi" className="input-label">NIK ({t('nomor')} KTP)</Label>
                                            <Input type="number" id="nik-direksi" name="nik-direksi"
                                                value={this.state.tempDireksi.nik}
                                                onWheel={(e) => { e.target.blur() }}
                                                onChange={(e) => this.onChange(e)} />
                                        </FormGroup>
                                    </div>
                                </Row>
                                <Row className="">
                                    <div className="col-12">
                                        <FormGroup>
                                            <Label htmlFor="nama-direksi" className="input-label">{t('nama')} Inventor</Label>
                                            <Input type="text" id="nama-direksi" name="nama-direksi"
                                                value={this.state.tempDireksi.namaInventor}
                                                onChange={(e) => this.onChange(e)} />
                                        </FormGroup>
                                    </div>
                                </Row>
                                <Row className="">
                                    <div className="col-md-6">
                                        <FormGroup>
                                            <Label htmlFor="foto-direksi" className="input-label">{t('foto')}</Label>
                                            {this.state.image.preview !== null ?
                                                <div>
                                                    <img src={this.state.image.preview} alt="foto-direksi" className="img-fluid" style={{ maxWidth: '150px', maxHeight: '200px' }} />
                                                </div>
                                                :
                                                <div>
                                                    <img src={`${process.env.REACT_APP_DOMAIN}${this.state.tempDireksi.foto}`} alt="foto-direksi" className="img-fluid" style={{ maxWidth: '150px', maxHeight: '200px' }} />
                                                </div>
                                            }
                                            <Input type="file" di="foto-direksi" name="foto-direksi" placeholder="Foto Direksi" onChange={this.onChangeFoto} />
                                        </FormGroup>
                                    </div>
                                    <div className="col-md-6">
                                        <FormGroup>
                                            <Label htmlFor="jenis-kelamin-direksi" className="input-label">{t('jk')}</Label>
                                            <Input type="text" id="jenis-kelamin-direksi" name="jenis-kelamin-direksi"
                                                value={this.state.tempDireksi.jenisKelamin}
                                                onChange={(e) => this.onChange(e)} />
                                        </FormGroup>
                                    </div>
                                </Row>
                                <Row className="">
                                    <div className="col-md-6">
                                        <FormGroup>
                                            <Label htmlFor="tanggal-lahir-direksi" className="input-label">{t('tanggallahir')}</Label>
                                            <DatePickerInput
                                                onChange={(e) => {
                                                    const data = {
                                                        target: {
                                                            value: e,
                                                            name: 'tanggal-lahir-direksi'
                                                        },
                                                        preventDefault: () => { }
                                                    }
                                                    this.onChange(data)
                                                }}
                                                value={this.state.tempDireksi.tanggalLahir}
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
                                            <Label htmlFor="jenjang-studi-direksi" className="input-label">{t('jenjangpendidikanterakhir')}</Label>
                                            <Input type="text" id="jenjang-studi-direksi" name="jenjang-studi-direksi"
                                                value={this.state.tempDireksi.jenjangStudi}
                                                onChange={(e) => this.onChange(e)} />
                                        </FormGroup>
                                    </div>
                                </Row>
                                <Row className="">
                                    <div className="col-md-6">
                                        <FormGroup>
                                            <Label htmlFor="jabatan-direksi" className="input-label">{t('jabatandalamtim')}</Label>
                                            <Input type="text" id="jabatan-direksi" name="jabatan-direksi"
                                                value={this.state.tempDireksi.jabatan}
                                                onChange={(e) => this.onChange(e)} />
                                        </FormGroup>
                                    </div>
                                    <div className="col-md-6">
                                        <FormGroup>
                                            <Label htmlFor="institusi-direksi" className="input-label">{t('institusi')}</Label>
                                            <Input type="text" id="institusi-direksi" name="institusi-direksi"
                                                value={this.state.tempDireksi.institusi}
                                                onChange={(e) => this.onChange(e)} />
                                        </FormGroup>
                                    </div>
                                </Row>
                            </>
                        }
                        <Row>
                            <div className="col-12 d-flex justify-content-between">
                                {this.state.editIzinUsaha && <Button className="" color="red-custom" onClick={() => this.modalDeleteConfirmation(this.state.idEditData, "izin-usaha")}>{t('hapus')}</Button>}
                                {this.state.editDireksi && <Button className="" color="red-custom" onClick={() => this.modalDeleteConfirmation(this.state.idEditData, "direksi")}>{t('hapus')}</Button>}
                                <div>
                                    <Button className="mr-2" color="white" onClick={this.cancelModalEditData}>{t('batal')}</Button>
                                    {this.state.editIzinUsaha &&
                                        <Button color="netis-color" style={{ width: '70px' }} disabled={this.state.loading} onClick={() => this.submitEditedIzinUsaha(this.state.idEditData, this.state.tempIzinUsaha)}>
                                            {this.state.loading ? <Spinner color="light" size="sm" /> : t('simpan')}
                                        </Button>
                                    }
                                    {this.state.editDireksi &&
                                        <Button color="netis-color" style={{ width: '70px' }} disabled={this.state.loading} onClick={() => this.submitEditedDireksi(this.state.idEditData, this.state.tempDireksi)}>
                                            {this.state.loading ? <Spinner color="light" size="sm" /> : t('simpan')}
                                        </Button>
                                    }
                                </div>
                            </div>
                        </Row>
                    </ModalBody>
                </Modal>

                {/* Modal Box Konfirmasi Delete Data */}
                <Modal isOpen={this.state.modalDeleteConfirmation} toggle={this.cancelModalDeleteConfirmation} className={this.props.className}>
                    <ModalBody>
                        <div className="d-flex justify-content-between align-items-center mb-5">
                            <h5 className="content-sub-title mb-0">
                                {t('hapus')} Data
                                {this.state.deleteIzinUsaha && " Izin Usaha"}
                                {this.state.deleteDireksi && " Direksi"}
                            </h5>
                            <Button color="link" size="lg" className="text-danger" onClick={this.cancelModalDeleteConfirmation}><strong>&times;</strong></Button>
                        </div>
                        <Row className="mb-5">
                            <div className="col-12 text-center">
                                <h6>{t('yakinmenghapus')}</h6>
                            </div>
                        </Row>
                        <Row>
                            <div className="col-12 d-flex justify-content-end">
                                <Button className="mr-2" color="white" onClick={this.cancelModalDeleteConfirmation}>{t('batal')}</Button>
                                {this.state.deleteIzinUsaha &&
                                    <Button color="danger" style={{ width: '70px' }} disabled={this.state.loadingButtonDelete} onClick={() => this.removeIzinUsaha(this.state.idDeleteData)}>
                                        {this.state.loadingButtonDelete ? <Spinner color="light" size="sm" /> : t('hapus')}
                                    </Button>
                                }
                                {this.state.deleteDireksi &&
                                    <Button color="danger" style={{ width: '70px' }} disabled={this.state.loadingButtonDelete} onClick={() => this.removeDireksi(this.state.idDeleteData)}>
                                        {this.state.loadingButtonDelete ? <Spinner color="light" size="sm" /> : t('hapus')}
                                    </Button>
                                }
                            </div>
                        </Row>
                    </ModalBody>
                </Modal>
            </div >
        );
    }
}

const mapStateToProps = ({ isAdminPanel, user, token }) => ({ isAdminPanel, user, token });
export default connect(mapStateToProps)(translate(CompanyAdditionalInfo));
