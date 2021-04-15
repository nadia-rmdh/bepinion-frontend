import React, { Component } from 'react';
import {
    Table,
    Col,
    Row,
    InputGroup,
    InputGroupText,
    InputGroupAddon,
    Input,
    Button,
    Spinner
} from 'reactstrap';
import Axios from 'axios';
import { Link } from 'react-router-dom';
// import ReactDatePicker from 'react-datepicker';
import { connect } from 'react-redux';
// import { DatePickerInput } from 'rc-datepicker';
import 'rc-datepicker/lib/style.css';
import moment from '../../../utils/moment'
import { requestDownload } from '../../../utils/request';
import {
    translate,
} from 'react-switch-lang';
import LoadingAnimation from '../../../components/LoadingAnimation';
import DataNotFound from '../../../components/DataNotFound';

class PersonnelNonActive extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dropdownOpen: [false, false],
            modalAddData: false,
            personnels: [],
            genders: [],
            search: null,
            session: props.token,
            dataObject: {
                fullName: "",
                nickName: "",
                phone: "",
                email: "",
                gender: 1,
                placeOfBirth: "",
                dateOfBirth: this.formatDate(new Date()),
                parent: "",
                roleId: 1,
                joinDate: this.formatDate(new Date()),
                active: 1,
            },
            profileDownloading: {},
            date: new Date(),
            LoadingAnimation: false,
            notFound: false
        };

        this.modalAddData = this.modalAddData.bind(this);
    }

    downloadProfile = (id) => {
        if (this.state.profileDownloading[id]) {
            return;
        }
        const { profileDownloading } = this.state
        profileDownloading[id] = true;
        this.setState({ profileDownloading });
        requestDownload(`v1/personnels/${id}/download-profile`)
            .finally(() => {
                delete profileDownloading[id];
                this.setState({ profileDownloading })
            })
    }

    searchSpace = (event) => {
        let keyword = event.target.value;
        this.setState({
            search: keyword
        })
    }

    componentDidMount() {
        this.setState({ LoadingAnimation: true });
        Axios.all([
            Axios.get(process.env.REACT_APP_DOMAIN + `/api/v1/personnels/all/nonaktif`, { headers: { "Authorization": `Bearer ${this.state.session}` } }),
            Axios.get(process.env.REACT_APP_DOMAIN + `/api/v1/master/genders?all=true`, { headers: { "Authorization": `Bearer ${this.state.session}` } })
        ])
            .then(Axios.spread((res1, res2) => {
                const personnels = res1.data.data;
                const genders = res2.data.data;
                this.setState({ personnels, genders, LoadingAnimation: false, })
            }))
            .catch(error => {
                console.log(error.response);
                this.setState({ LoadingAnimation: false, notFound: true });
            });
    }

    modalAddData = () => {
        this.setState({
            modalAddData: !this.state.modalAddData,
        });
    }

    handleChange = (event) => {
        let dataObject = {
            ...this.state.dataObject,
            fullName: `${event.target.name === 'fullName' ? event.target.value : this.state.dataObject.fullName}`,
            nickName: `${event.target.name === 'nickName' ? event.target.value : this.state.dataObject.nickName}`,
            phone: `${event.target.name === 'phone' ? event.target.value : this.state.dataObject.phone}`,
            email: `${event.target.name === 'email' ? event.target.value : this.state.dataObject.email}`,
            gender: `${event.target.name === 'gender' ? event.target.value : this.state.dataObject.gender}`,
            placeOfBirth: `${event.target.name === 'placeOfBirth' ? event.target.value : this.state.dataObject.placeOfBirth}`,
            parent: `${event.target.name === 'parent' ? event.target.value : this.state.dataObject.parent}`
        }
        this.setState({
            dataObject: dataObject
        })
    }

    handleChangeDate = date => {
        this.setState({ date })
        let birthDate = { ...this.state.dataObject, dateOfBirth: this.formatDate(date) }
        this.setState({
            dataObject: birthDate
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

    addDataToAPI = () => {
        console.log(this.state.dataObject)
        Axios.post(process.env.REACT_APP_DOMAIN + '/api/v1/personnels', this.state.dataObject, { headers: { "Authorization": `Bearer ${this.state.session}` } })
            .then((res) => {
                let newPost = res.data.data;
                let newData = [...this.state.personnels, newPost];
                this.setState({
                    personnels: newData,
                    modalAddData: !this.state.modalAddData,
                });

            }).catch((error) => {
                console.log(error.response)
            });
    }

    render() {
        const { t } = this.props;
        moment.locale(t('id'));
        let statuslabel;
        // eslint-disable-next-line
        const personnelList = this.state.personnels.filter((data) => {
            if (this.state.search === null)
                return data;
            else if ((data.fullName || '').toLowerCase().includes(this.state.search.toLowerCase())) {
                return data;
            }
        }).map((data, idx) => {
            if (data.status === 'permanen') {
                statuslabel = t('pekerjatetap')
            } else if (data.status === 'kontrak') {
                statuslabel = t('pekerjakontrak')
            } else if (data.status === 'magang') {
                statuslabel = t('magang')
            } else if (data.status === 'pekerja lepas') {
                statuslabel = t('pekerjalepas')
            }
            return (
                <tr key={idx}>
                    <td className="text-center">{idx + 1}</td>
                    <td>
                        <Link to={"/personnels/" + data.id} className="personnel-name">
                            {data.fullName}
                        </Link>
                    </td>
                    <td>{data.phone}</td>
                    <td>{data.email}</td>
                    <td>{data.unit.name}</td>
                    <td>{statuslabel}</td>
                    <td>{moment(data.endDate).format('DD MMM YYYY')}</td>
                    <td>
                        <Button color="link" className="text-nowrap" onClick={() => this.downloadProfile(data.id)}>
                            {this.state.profileDownloading[data.id] ? <Spinner size="sm" /> : <span><i className="fa fa-download"></i> PDF</span>}
                        </Button>
                    </td>
                </tr>
            );
        });
        return (
            <div className="animated fadeIn">
                <Row className="justify-content-between align-items-center md-company-header mb-3">
                    <Col col="4" sm="4" md="4" xl >
                    </Col>
                    <Col col="8" sm="8" md="8" className="d-flex justify-content-end">
                        <InputGroup className="mr-3">
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText className="input-group-transparent">
                                    <i className="fa fa-search"></i>
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input type="text" placeholder="Search" className="input-search" onChange={(e) => this.searchSpace(e)} />
                        </InputGroup>
                        {/* <Button color="netis-color" onClick={this.modalAddData}>
                            <i className="fa fa-plus mr-2"></i>Tambah Data
                        </Button> */}
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" lg="12">
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th className="text-center w-5">No.</th>
                                    <th className="w-30">{t('karyawan')}</th>
                                    <th className="w-15">{t('telepon')}</th>
                                    <th className="w-15">Email</th>
                                    <th className="w-20">Unit</th>
                                    <th className="w-20">{t('kontrakstatus')}</th>
                                    <th className="w-20">{t('tanggal')} Nonaktif</th>
                                    <th></th>
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
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        token: state.token
    }
}
export default connect(mapStateToProps)(translate(PersonnelNonActive));
