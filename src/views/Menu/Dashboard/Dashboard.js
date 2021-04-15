import React, { Component, Fragment } from 'react';
import { Card, CardBody, CardTitle, Col, Progress, Row, CardHeader, Button, Spinner } from 'reactstrap';
import { connect } from 'react-redux';
import { DatePickerInput } from 'rc-datepicker';
import WidgetPersonnel from './Component/WidgetPersonnel';
import { formatDate } from '../../../utils/formatter';
import request from '../../../utils/request';
import StatusBadge from './Component/StatusBadge'
import moment from '../../../utils/moment'
import {
  translate,
} from 'react-switch-lang';
import Loader from 'react-loader-spinner';
class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingNotification: true,
      dropdownOpen: false,
      session: props.token,
      // date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      initDate: new Date(),
      date: new Date(),
      dateEnd: new Date(),
      start: formatDate(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)),
      end: formatDate(new Date()),
      loading: true,
      dashboardData: {},
      gender: {
        "Laki-laki": 0,
        "Perempuan": 0,
      },
      notifData: {},
      status: {
        permanen: null,
        kontrak: null,
        "pekerja lepas": null,
        magang: null
      },
      education: {
        sd: null,
        smp: null,
        sma: null,
        s1: null,
        s2: null,
        s3: null
      },
      totalGender: 0,
      totalStatus: 0,
      totalEducation: 0,
    };
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  componentDidMount = () => {
    this.setState({
      date: new Date(this.state.date.getFullYear(), this.state.date.getMonth(), 1),
      dateEnd: new Date(),
      start: formatDate(new Date(this.state.date.getFullYear(), this.state.date.getMonth(), 1)),
      end: formatDate(new Date())
    }, () => {
      this.getDashboardDataFromAPI(this.state.start, this.state.end);
      this.getNotifFromAPI();
    })
  }

  getDashboardDataFromAPI = (start, end) => {
    this.setState({ loading: true })
    request.get(`v1/dashboard?start=${start}&end=${end}`)
      .then(res => {
        const {
          genderPersonnel: gender,
          statusPersonnel: status,
          educationPersonnel: education
        } = res.data.data
        this.setState({
          dashboardData: res.data.data,
          gender: gender || {
            "Laki-laki": 0,
            "Perempuan": 0,
          },
          totalGender: Object.values(gender).reduce((x,y) => x + y, 0),
          status: status || {
            permanen: 0,
            kontrak: 0,
            "pekerja lepas": 0,
            magang: 0
          },
          totalStatus: Object.values(status).reduce((x,y) => x + y, 0),
          education: education || {
            sd: 0,
            smp: 0,
            sma: 0,
            s1: 0,
            s2: 0,
            s3: 0
          },
          totalEducation: Object.values(education).reduce((x,y) => x + y, 0),
        })
      }).finally(() => {
        this.setState({ loading: false })
      })
  }

  getNotifFromAPI = async () => {
    this.setState({ loadingNotification: true })
    try {
      const notif = await request.get(`v1/admin-notifications`);
      const notifData = notif.data.data;
      this.setState({ notifData })
    } catch (err) {
      console.log(err)
      throw err;
    } finally {
        this.setState({ loadingNotification: false })
    }
  }

  handleChangeDateStart = date => {
    if (! (date instanceof Date)) {
      const { date: dateState, start } = this.state;
      this.setState({ date: dateState, start });
      return;
    }

    if (date.getTime() < this.state.dateEnd.getTime()) {
      this.setState({
        date,
        start: formatDate(date)
      });
    }
    else {
      this.setState({
        date: new Date(this.state.dateEnd.getTime() - 1 * 24 * 60 * 60 * 1000),
        start: formatDate(new Date(this.state.dateEnd.getTime() - 1 * 24 * 60 * 60 * 1000))
      })
    }
  }

  handleChangeDateEnd = date => {
    if (! (date instanceof Date)) {
      const { end, dateEnd } = this.state;
      this.setState({ end, dateEnd });
      return;
    }

    if (date.getTime() > this.state.date.getTime()) {
      if (date.getTime() < this.state.dateEnd.getTime()) {
        this.setState({
          dateEnd: date,
          end: formatDate(date)
        });
      } else {
        this.setState({
          dateEnd: new Date(),
          end: formatDate(new Date())
        });
      }
    }
    else {
      this.setState({
        dateEnd: new Date(this.state.date.getTime() + 1 * 24 * 60 * 60 * 1000),
        end: formatDate(new Date(this.state.date.getTime() + 1 * 24 * 60 * 60 * 1000))
      })
    }
  }

  filterData = () => {
    this.setState({ loading: true })
    this.getDashboardDataFromAPI(this.state.start, this.state.end)
  }
  changeWindow = (link) => (e) => {
    e.preventDefault()
    window.location.replace(link);
  }

  calculatePercen = (percentFor, percentOf) => {
    if (Number(percentOf || 0) === 0) {
      return 0;
    }
    return (Math.floor((Number(percentFor || 0) / Number(percentOf || 0)) * 10000) / 100).toFixed(1);
  }

  render() {
    const { t } = this.props;
    moment.locale(t('id'))
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="mb-0">
                  <h5>
                    Filter {t('tanggal')}
                  </h5>
                </CardTitle>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="12" md="6" xl="6">
                    <Row>
                      <Col sm="5">
                        <div className="callout callout-info">
                          <small className="text-muted">{t('dari')}</small>
                          <br />
                          <DatePickerInput
                            name="startDate"
                            id="startDate"
                            onChange={this.handleChangeDateStart}
                            value={this.state.date}
                            className='my-custom-datepicker-component'
                            showOnInputClick={true}
                            closeOnClickOutside={true}
                            displayFormat="DD MMMM YYYY"
                            readOnly
                          />
                        </div>
                      </Col>
                      <Col sm="5">
                        <div className="callout callout-danger">
                          <small className="text-muted">{t('hingga')}</small>
                          <br />
                          <DatePickerInput
                            name="endDate"
                            id="endDate"
                            onChange={this.handleChangeDateEnd}
                            value={this.state.dateEnd}
                            className='my-custom-datepicker-component'
                            showOnInputClick={true}
                            closeOnClickOutside={true}
                            displayFormat="DD MMMM YYYY"
                            readOnly
                          />
                        </div>
                      </Col>
                      <Col sm="2">
                        <div className="pt-sm-3">
                          <Button type="submit" className="mt-sm-4" color="netis-color" style={{ width: '60px' }} onClick={this.filterData}>
                            {this.state.loading ? <Spinner color="light" size="sm" /> : 'Filter'}
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col xs="12" sm="12" md="4" lg="4">
              <WidgetPersonnel
                loading={this.state.loading}
                value={this.state.dashboardData.allPersonnel || 0}
                title={t("jumlahkaryawan")}
                icon={"fa fa-users"}
                bg={"bg-linkedin"}
              />
          </Col>

          <Col xs="12" sm="12" md="4" lg="4">
              <WidgetPersonnel loading={this.state.loading} value={this.state.dashboardData.newPersonnel || 0} title={t("karyawanbaru")} icon={"fa fa-user-plus"} bg={"bg-twitter"} >
              </WidgetPersonnel>
          </Col>

          <Col xs="12" sm="12" md="4" lg="4">
              <WidgetPersonnel loading={this.state.loading} value={this.state.dashboardData.resignPersonnel || 0} title={t("karyawanresign")} icon={"fa fa-user-times"} bg={"bg-google-plus"} >
              </WidgetPersonnel>
          </Col>
        </Row>

        <Row>
          <Col sm="7">
            <Card className="dashboard-card">
              <CardHeader className="mb-2">
                <CardTitle className="mb-0">
                  <h5>{t('demografi')} {t('karyawan')}</h5>
                </CardTitle>
              </CardHeader>
              <CardBody>
                <CardTitle className="mb-3"><b>{t('jk')}</b></CardTitle>
                {
                  this.state.loading ?
                    <Loader type="Audio" color="#CCCCCC" height={80} width={80} className="d-inline-block" style={{ transform: 'rotate(90deg)' }} />
                  :
                    <>
                      <div className="progress-group">
                      <div className="progress-group-header align-items-center">
                        <i className="icon-user progress-group-icon"></i>
                        <span className="title">{t('laki')}</span>
                        <span className="ml-auto font-weight-bold">
                          {this.state.gender["Laki-laki"] || 0}
                          <span className="text-muted small">{` (${this.calculatePercen(this.state.gender["Laki-laki"], this.state.totalGender) || 0}%)`}</span>
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <Progress className="progress-xs" color="warning" value={this.calculatePercen(this.state.gender["Laki-laki"], this.state.totalGender) || 0} />
                      </div>
                    </div>
                      <div className="progress-group">
                      <div className="progress-group-header align-items-center">
                        <i className="icon-user-female progress-group-icon"></i>
                        <span className="title">{t('perempuan')}</span>
                        <span className="ml-auto font-weight-bold">
                          {this.state.gender["Perempuan"] || 0}
                          <span className="text-muted small">{` (${this.calculatePercen(this.state.gender["Perempuan"], this.state.totalGender) || 0}%)`}</span>
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <Progress className="progress-xs" color="warning" value={this.calculatePercen(this.state.gender["Perempuan"], this.state.totalGender) || 0} />
                      </div>
                    </div>
                      {
                        !!this.state.gender["unknown"] && (<div className="progress-group">
                        <div className="progress-group-header align-items-center">
                          <i className="icon-question progress-group-icon text-danger"></i>
                          <span className="title text-danger">{t('Belum diisi')}</span>
                          <span className="ml-auto font-weight-bold text-danger">
                            {this.state.gender["unknown"] || 0}
                            <span className="text-danger small">{` (${this.calculatePercen(this.state.gender["unknown"], this.state.totalGender) || 0}%)`}</span>
                          </span>
                        </div>
                        <div className="progress-group-bars">
                          <Progress className="progress-xs" color="danger" value={this.calculatePercen(this.state.gender["unknown"], this.state.totalGender) || 0} />
                        </div>
                      </div>)
                      }
                    </>
                }

                <CardTitle className="mb-3 mt-5"><b>{t('kontrakstatus')}</b></CardTitle>
                {
                  this.state.loading ?
                    <Loader type="Audio" color="#CCCCCC" height={80} width={80} className="d-inline-block" style={{ transform: 'rotate(90deg)' }} />
                  :
                    <>
                      <div className="progress-group">
                        <div className="progress-group-header align-items-center">
                          <i className="icon-briefcase progress-group-icon"></i>
                          <span className="title">{t('pekerjatetap')}</span>
                          <span className="ml-auto font-weight-bold">
                            {this.state.status.permanen || 0}
                            <span className="text-muted small">{` (${this.calculatePercen(this.state.status.permanen, this.state.totalStatus) || 0}%)`}</span>
                          </span>
                        </div>
                        <div className="progress-group-bars">
                          <Progress className="progress-xs" color="info" value={this.calculatePercen(this.state.status.permanen, this.state.totalStatus) || 0} />
                        </div>
                      </div>
                      <div className="progress-group">
                        <div className="progress-group-header align-items-center">
                          <i className="icon-briefcase progress-group-icon"></i>
                          <span className="title">{t('pekerjakontrak')}</span>
                          <span className="ml-auto font-weight-bold">
                            {this.state.status.kontrak || 0}
                            <span className="text-muted small">{` (${this.calculatePercen(this.state.status.kontrak, this.state.totalStatus) || 0}%)`}</span>
                          </span>
                        </div>
                        <div className="progress-group-bars">
                          <Progress className="progress-xs" color="info" value={this.calculatePercen(this.state.status.kontrak, this.state.totalStatus) || 0} />
                        </div>
                      </div>
                      <div className="progress-group">
                        <div className="progress-group-header align-items-center">
                          <i className="icon-briefcase progress-group-icon"></i>
                          <span className="title">{t('magang')}</span>
                          <span className="ml-auto font-weight-bold">
                            {this.state.status.magang || 0}
                            <span className="text-muted small">{` (${this.calculatePercen(this.state.status.magang, this.state.totalStatus) || 0}%)`}</span>
                          </span>
                        </div>
                        <div className="progress-group-bars">
                          <Progress className="progress-xs" color="info" value={this.calculatePercen(this.state.status.magang, this.state.totalStatus) || 0} />
                        </div>
                      </div>
                      <div className="progress-group">
                        <div className="progress-group-header align-items-center">
                          <i className="icon-briefcase progress-group-icon"></i>
                          <span className="title">{t('pekerjalepas')}</span>
                          <span className="ml-auto font-weight-bold">
                            {this.state.status['pekerja lepas'] || 0}
                            <span className="text-muted small">{` (${this.calculatePercen(this.state.status['pekerja lepas'], this.state.totalStatus) || 0}%)`}</span>
                          </span>
                        </div>
                        <div className="progress-group-bars">
                          <Progress className="progress-xs" color="info" value={this.calculatePercen(this.state.status['pekerja lepas'], this.state.totalStatus) || 0} />
                        </div>
                      </div>
                      {
                        !!this.state.status['unknown'] && (<div className="progress-group">
                        <div className="progress-group-header align-items-center">
                          <i className="icon-question progress-group-icon text-danger"></i>
                          <span className="title text-danger">{t('Belum diisi')}</span>
                          <span className="ml-auto font-weight-bold text-danger">
                            {this.state.status["unknown"] || 0}
                            <span className="text-danger small">{` (${this.calculatePercen(this.state.status["unknown"], this.state.totalStatus) || 0}%)`}</span>
                          </span>
                        </div>
                        <div className="progress-group-bars">
                          <Progress className="progress-xs" color="danger" value={this.calculatePercen(this.state.status["unknown"], this.state.totalStatus) || 0} />
                        </div>
                      </div>)
                      }
                    </>
                }
                <CardTitle className="mb-3 mt-5"><b>{t('jenjangpendidikan')}</b></CardTitle>
                {
                  this.state.loading ?
                    <Loader type="Audio" color="#CCCCCC" height={80} width={80} className="d-inline-block" style={{ transform: 'rotate(90deg)' }} />
                  :
                    <>
                      {Object.keys(this.state.education).filter(educationLevel => educationLevel !== 'unknown').map(educationLevel => (
                        <div className="progress-group" key={educationLevel}>
                          <div className="progress-group-header align-items-center">
                            <i className="icon-graduation progress-group-icon"></i>
                            <span className="title">{t(educationLevel)}</span>
                            <span className="ml-auto font-weight-bold">
                              {this.state.education[educationLevel] || 0}
                              <span className="text-muted small">{` (${this.calculatePercen(this.state.education[educationLevel], this.state.totalEducation) || 0}%)`}</span>
                            </span>
                          </div>
                          <div className="progress-group-bars">
                            <Progress className="progress-xs" color="success" value={this.calculatePercen(this.state.education[educationLevel], this.state.totalEducation) || 0} />
                          </div>
                        </div>
                      ))}
                      {
                        !!this.state.education['unknown'] && (
                          <div className="progress-group">
                            <div className="progress-group-header align-items-center">
                              <i className="icon-question progress-group-icon text-danger"></i>
                              <span className="title text-danger">{t('Belum diisi')}</span>
                              <span className="ml-auto font-weight-bold text-danger">
                                {this.state.education['unknown'] || 0}
                                <span className="small">{` (${this.calculatePercen(this.state.education['unknown'], this.state.totalEducation) || 0}%)`}</span>
                              </span>
                            </div>
                            <div className="progress-group-bars">
                              <Progress className="progress-xs" color="danger" value={this.calculatePercen(this.state.education['unknown'], this.state.totalEducation) || 0} />
                            </div>
                          </div>
                        )
                      }
                    </>
                }
              </CardBody>
            </Card>
          </Col>
          <Col sm="5">
            <Card className="dashboard-card dashboard-notif-wrapper">
              <CardHeader className="mb-0">
                <CardTitle className="mb-0">
                  <h5>{t('notifikasiterbaru')}</h5>
                </CardTitle>
              </CardHeader>
              <CardBody className="dashboard-notif">
                <Row className="mb-4">
                  <Col xs="12">
                    <Row>
                      {!this.state.notifData.length ? null
                        :
                        this.state.notifData.map((data, idx) => (
                          data.type === 'cuti' ?
                            (
                              <Fragment key={idx}>
                                <Col sm="12 mb-3">
                                  <div className="notif-card" style={{ borderLeft: '8px solid yellowgreen' }} onClick={this.changeWindow('/cuti/manage')}>
                                    <Row>
                                      <Col sm="12">
                                        <h6 className="title mb-1" style={{ textTransform: 'capitalize' }}><b>{t('cuti')}</b></h6>
                                        <h6 className="mb-0" style={{ color: 'rgb(106, 111, 115)', fontSize: 12 }}>{moment(data.date).format('DD MMM YYYY')}</h6>
                                      </Col>
                                      <Col sm="12">
                                        < StatusBadge status={data.status} />
                                      </Col>
                                    </Row>
                                    <hr />
                                    <Row>
                                      <Col sm="12">
                                        <h6 className=" mb-1" style={{ color: '#293131' }}>{data.name}</h6>
                                      </Col>
                                      <Col sm="12">
                                        <h6 style={{ color: 'rgb(106, 111, 115)', fontSize: 12 }}>{data.job} </h6>
                                      </Col>
                                    </Row>
                                  </div>
                                </Col>
                              </Fragment>
                            ) :
                            data.type === 'reimburse' ?
                              (
                                <Fragment key={idx}>
                                  <Col sm="12 mb-3">
                                    <div className="notif-card" style={{ borderLeft: '8px solid  #328dcd' }} onClick={this.changeWindow('/reimburse/manage')}>
                                      <Row>
                                        <Col sm="12">
                                          <h6 className="title mb-1" style={{ textTransform: 'capitalize' }}><b>Reimburse</b></h6>
                                          <h6 style={{ color: 'rgb(106, 111, 115)', fontSize: 12 }}>{moment(data.date).format('DD MMM YYYY')}</h6>
                                        </Col>
                                        <Col sm="12">
                                          < StatusBadge status={data.status} />
                                        </Col>
                                      </Row>
                                      <hr />
                                      <Row>
                                        <Col sm="12">
                                          <h6 className=" mb-1" style={{ color: '#293131' }}>{data.name}</h6>
                                        </Col>
                                        <Col sm="12">
                                          <h6 style={{ color: 'rgb(106, 111, 115)', fontSize: 12 }}>{data.job} </h6>
                                        </Col>
                                      </Row>
                                    </div>
                                  </Col>
                                </Fragment>
                              ) : data.type === 'personnel_expire' ?
                                (
                                  <Fragment key={idx}>
                                    <Col sm="12 mb-3">
                                      <div className="notif-card" style={{ borderLeft: '8px solid  rgb(206, 51, 51)' }} onClick={this.changeWindow('/personnels/' + data.personnelId)}>
                                        <Row>
                                          <Col sm="12">
                                            <h6 className="title mb-1" style={{ textTransform: 'capitalize' }}><b>{t('kontrakakanhabis')}</b></h6>
                                            <h6 style={{ color: 'rgb(106, 111, 115)', fontSize: 12 }}>{moment(data.date).format('DD MMM YYYY')}</h6>
                                          </Col>
                                        </Row>
                                        <hr />
                                        <Row>
                                          <Col sm="12">
                                            <h6 className=" mb-1" style={{ color: '#293131' }}>{data.name}</h6>
                                          </Col>
                                          <Col sm="12">
                                            <h6 style={{ color: 'rgb(106, 111, 115)', fontSize: 12 }}>{data.job} </h6>
                                          </Col>
                                        </Row>
                                      </div>
                                    </Col>
                                  </Fragment>
                                ) : null
                        ))
                      }
                    </Row>
                  </Col>
                </Row>
              </CardBody>
            </Card>
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
export default connect(mapStateToProps)(translate(Dashboard));
