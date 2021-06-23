import React, { useState, useEffect, useMemo, Fragment, useRef, useCallback } from "react";
import {
  Button,
  Card,
  CardHeader,
  Spinner,
  CardBody,
  Row,
  Col,
  Progress,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter
} from "reactstrap";
import { TabContent, TabPane, Nav, NavItem, NavLink, Table, Tooltip } from "reactstrap";
import DataNotFound from "../../../../components/DataNotFound";
import request from "../../../../utils/request";
import StatusBadge from "./StatusBadge";
import { toast } from "react-toastify";
import { t, translate } from "react-switch-lang";
import StarRatingComponent from "react-star-rating-component";
import moment from "moment";
import ReactMarkdown from "react-markdown";
import { requestDownload } from "../../../../utils/request";
import { useAuthUser, useUserPrivileges } from "../../../../store";
import "./videoasesmen.css";
import Star from "../../../../components/Star.js";
import { Radar } from "react-chartjs-2";
import DiscResultAdmin from "../../Assesment/disc/DiscResultAdmin";
// import { groupingLabel, colorsByIndex } from "./labels";
import 'chartjs-plugin-datalabels';
import { mutate } from 'swr';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import profilePhotoNotFound from '../../../../assets/img/no-photo.png'
import SkeletonApplicantDetail from "../Skeleton/SkeletonApplicantDetail";
import ListGroup from "reactstrap/lib/ListGroup";
import ListGroupItem from "reactstrap/lib/ListGroupItem";
import NoToken from "./Assessments/NoToken";
import { Link, useLocation } from "react-router-dom";
import { useBalance } from "../../../../hooks/useBalance";
import SentimentAnalysis from './Sentiment/SentimentAnalysis'
import AssessmentShio from "./Assessments/AssessmentShio";
import AssessmentFingerprint from "./Assessments/AssessmentFingerprint";
import AssessmentMsdt from "./Assessments/AssessmentMsdt";
import AssessmentSpm from "./Assessments/AssessmentSpm";
import { useDispatch } from "react-redux";
import disableScroll from 'disable-scroll';
import Tour from 'reactour';
import { getMe } from "../../../../actions/auth";
import { useMediaQuery } from 'react-responsive'
import ModalPrivilegeForbidden from "../../../../components/ModalPrivilegeForbidden";

const confirm = {
  accepted: t('Sesuai'),
  rejected: t('Tidak Sesuai')
}

const tabs = {
  'profile': 'Profile',
  'resume': 'Resume',
  'assessment': 'Asesmen',
  'sentiment': 'Sentimen Analisis'
}

const tabsArray = Object.keys(tabs);

function ApplicantDetail({ match, history }) {
  const location = useLocation();
  const selectedTab = location.hash ? location.hash.substring(1) : tabsArray[0];
  const isSmallSize = useMediaQuery({ query: '(max-width: 768px)' })
  const [applicant, setApplicant] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const { can } = useUserPrivileges();
  const [isLoading, setIsLoading] = useState(false)
  const [stat, setStat] = useState(null);
  const { data: dataToken } = useBalance();
  const user = useAuthUser();
  const [isTour, setIsTour] = useState(false);
  const [isTourAssessment, setIsTourAsessment] = useState(false);
  const disableBody = () => disableScroll.on();
  const enableBody = () => disableScroll.off();
  const accentColor = "#1d5a8e";
  const dispatch = useDispatch();
  const [forbidden, setForbidden] = useState(false)

  useEffect(() => {
    if (user.guidance.layout && user.guidance.header) {
      if (!user.guidance.applicantDetail) {
        isSmallSize ? window.scroll({ top: 300, behavior: 'smooth' }) : window.scroll({ top: 0, behavior: 'smooth' })
        setIsTour(true);
      }
    }
  }, [user, isSmallSize])

  useEffect(() => {
    if (user.guidance.layout && user.guidance.header && user.guidance.applicantDetail) {
      if (location.hash.substring(1) === 'assessment' && !user.guidance.applicantAssessment) {
        setIsTourAsessment(true)
      }
    }
  }, [user, location.hash])

  const disableGuideApplicantDetail = () => {
    setIsTour(false);
    request.put('auth/guidance', { guidance: 'applicantDetail' })
      .then(() => {
        dispatch(getMe());
      })
  }

  const disableGuideApplicantAssessment = () => {
    setIsTourAsessment(false);
    request.put('auth/guidance', { guidance: 'applicantAssessment' })
      .then(() => {
        dispatch(getMe());
      })
  }

  const steps = [
    {
      selector: ".tour-tabApplicantDetail",
      content: ({ goTo, inDOM }) => (
        <div>
          <p>
            Anda dapat melihat profil lengkap pelamar,
            resume pelamar dan juga hasil asesmen yang dimiliki pelamar.
              </p>
          <Row>
            <div className="col-12 text-center">
              <Button
                className="mt-2"
                type="submit"
                color="netis-success"
                onClick={disableGuideApplicantDetail}
              >
                Oke, Saya Paham
                  </Button>
            </div>
          </Row>
        </div>
      ),
    }
  ]

  const getAPI = useCallback(() => {
    return request
      .get(`v1/recruitment/applicants/${match.params.applicantId}`)
      .then((res) => {
        setApplicant(res.data.data);
      })
      .catch((err) => {
        if (err.response?.status === 404) {
          setNotFound(true);
        }
      })
      .finally(() => setLoading(false));
  }, [match])

  const changeStatus = (status) => {
    if(can('canManagementJob')){
      setStat(status);
    }
    else{
      setForbidden(true)
    }
  }

  const toggleStat = () => {
    if (!!stat) {
      setStat(null);
    }
  }

  const UbahStatus = (stat) => {
    setIsLoading(true)
    request
      .put(`v1/recruitment/applicants/${match.params.applicantId}`, {
        status: stat,
      })
      .then((res) => {
        toast.success(t("statuspelamarberhasildiubah"));
        history.goBack();
      })
      .catch((err) => {
        toast.error(t("statuspelamargagaldiubah"));
        throw err;
      })
      .finally(() => {
        setIsLoading(false)
        setStat(null)
      })
  };

  useEffect(() => {
    getAPI()
  }, [getAPI])

  if (loading) {
    return <SkeletonApplicantDetail />;
  } else if (notFound) {
    return <DataNotFound />;
  }

  const onErrorImage = (e) => {
    e.target.src = profilePhotoNotFound;
    e.target.onerror = null;
  }

  return (
    <>
      <Tour
        steps={steps}
        accentColor={accentColor}
        showButtons={false}
        disableDotsNavigation={true}
        rounded={5}
        showNavigation={false}
        isOpen={isTour}
        closeWithMask={false}
        disableInteraction={true}
        disableFocusLock={true}
        onAfterOpen={disableBody}
        onBeforeClose={enableBody}
        onRequestClose={disableGuideApplicantDetail}
      />
      {forbidden && <ModalPrivilegeForbidden isOpen={true} forbidden="canManagementJob" isClose={() => setForbidden(false)} />}
      <Modal isOpen={!!isTourAssessment} style={{ marginTop: '40vh' }} backdropClassName="back-home">
        <ModalHeader className="border-bottom-0" toggle={disableGuideApplicantAssessment}>
          Panduan Asesmen Pelamar
        </ModalHeader>
        <ModalBody>
          <p>
            Anda dapat melihat hasil asesmen secara detail pelamar seperti
            &nbsp;
              <b>
              VIDEO ASESMEN, GESTURE, BAZI, PALMISTRY, FISIOGNOMI,
              </b>&nbsp;
            dengan memilih tombol "Buka Detail" dan token yang Anda miliki
            akan berkurang sesuai dengan harga token yang tertera disetiap kolom asesmen.
          </p>
          <Row>
            <div className="col-12 text-center">
              <Button
                className="mt-2"
                type="submit"
                color="netis-success"
                onClick={disableGuideApplicantAssessment}
              >
                Oke, Saya Paham
                  </Button>
            </div>
          </Row>
        </ModalBody>
      </Modal>
      <div className="p-1 p-md-4">
        <Modal isOpen={!!stat} backdropClassName="back-home" toggle={toggleStat}>
          <ModalHeader toggle={toggleStat}>
            Konfirmasi Perubahan Status Pelamar
          </ModalHeader>
          <ModalBody>
            <h5>{t("Apakah anda yakin ingin mengubah status pelamar ini menjadi")}&nbsp;
            <span className={stat === 'accepted' ? 'text-success' : 'text-danger'}>{confirm[stat]}</span> ?
          </h5>
          </ModalBody>
          <ModalFooter className="border-top-0">
            <div className="d-flex justify-content-end">
              {!isLoading && (
                <Button
                  className="mr-2"
                  color="light"
                  onClick={() => { setStat(null) }}
                >
                  {t("batal")}
                </Button>
              )}
              <Button
                color={stat === 'accepted' ? 'netis-success' : 'netis-danger'}
                onClick={() => UbahStatus(stat)}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Spinner size="sm" color="light" /> loading...
                          </>
                ) : (
                  t("Ubah Status")
                )}
              </Button>
            </div>
          </ModalFooter>
        </Modal>
        <div className="d-flex bd-highlight mt-n4 mr-n4 card ribbons border-0" data-label={`Melamar pada ${moment(applicant.createdAt).format('DD MMMM YYYY')}`}>
          <div className="card-container">
            <div className="mr-auto mt-4 bd-highlight">
              {!applicant.job_vacancy.isInternal ? <StatusBadge status={applicant.status} /> : null}
            </div>
          </div>
        </div>
        <Row className="mt-n4 mb-1">
          <Col>
            <div className="detail-applicant-photo d-flex justify-content-center p-3">
              <img src={applicant.detail.avatar} alt="photos profile" className="rounded-circle" onError={(e) => onErrorImage(e)} />
            </div>
          </Col>
          <Col xs="12" sm="12" md="6" lg="6" xl="6" className="p-4">
            <Row className="mt-5 text-sm-center text-md-left text-lg-left text-xl-left">
              <Col xs="12" className="text-netis-primary">
                <h4 className="font-weight-bold">{applicant.detail.fullName}</h4>
              </Col>
              <Col xs="12" className="text-netis-primary">
                <h5>{applicant.job_vacancy.name}</h5>
              </Col>
              <Col xs="12" className="text-muted">
                <h6>{applicant.job_vacancy.type}</h6>
              </Col>
              <Col xs="12">
                {(function () {
                  if (applicant.status === "pending" && !applicant.job_vacancy.isInternal) {
                    return (
                      <Row className="bd-highlight my-3">
                        <Col xs="6" sm="6" md="12" lg="6" xl="4" className="px-3 py-1 bd-highlight">
                          <Button
                            color="netis-success"
                            className={`w-100`}
                            onClick={() => {
                              changeStatus("accepted");
                            }}
                          >
                            <i className="fa fa-check mr-1"></i> {t("sesuai")}
                          </Button>
                        </Col>
                        <Col xs="6" sm="6" md="12" lg="6" xl="4" className="px-3 py-1 bd-highlight">
                          <Button
                            color="netis-danger"
                            className={`w-100`}
                            onClick={() => {
                              changeStatus("rejected");
                            }}
                          >
                            <i className="fa fa-times mr-1"></i> {t("tidaksesuai")}
                          </Button>
                        </Col>
                      </Row>
                    );
                  }
                })()}
              </Col>
            </Row>
          </Col>
        </Row>
        <Nav>
          {tabsArray.map(tab => (
            <NavItem key={tab}>
              <NavLink tag={Link} className="pt-2/5" active={selectedTab === tab} replace to={{ hash: "#" + tab }}>
                {tabs[tab]}
              </NavLink>
            </NavItem>
          ))}
        </Nav>

        <TabContent activeTab={selectedTab}>
          <TabPane tabId="profile">
            <Row>
              <Col sm="12">
                <ApplicantProfile data={applicant} dataToken={dataToken} />
              </Col>
            </Row>
          </TabPane>

          <TabPane tabId="resume">
            <Row>
              <Col sm="12">
                <ApplicantResume data={applicant} dataToken={dataToken} />
              </Col>
            </Row>
          </TabPane>

          <TabPane tabId="assessment">
            <Row>
              <Col sm="12">
                <ApplicantAssesment can={can} data={applicant} match={match} getAPI={getAPI} dataToken={dataToken} guide={user.guidance} />
              </Col>
            </Row>
          </TabPane>

          <TabPane tabId="sentiment">
            <Row>
              <Col sm="12">
                <SentimentAnalysis data={applicant.detail} match={match} getAPI={getAPI} dataToken={dataToken} guide={user.guidance} />
              </Col>
            </Row>
          </TabPane>
        </TabContent>

      </div >
    </>
  );
}

const ApplicantProfile = ({ data: applicant, dataToken }) => {
  const { detail } = applicant;
  // const censoredEmail = detail?.email.split("").filter(a => a !== " ") ?? [];

  return (
    <Card className="border-0">
      <CardBody>
        <Row className="px-0 px-md-5">
          {/* Baris 1 */}
          <Col xs="12" sm="12" md="5" className="border-bottom mt-4 px-0">
            <b>{t("namalengkap")}</b>
            <p className="mt-2 mb-1">{detail.fullName}</p>
          </Col>
          <Col xs="1" sm="1" md="1"></Col>
          <Col xs="12" sm="12" md="5" className="border-bottom mt-4 px-0">
            <b>{t("jk")}</b>
            <p className="mt-2 mb-1">{detail.gender?.name ? t(detail.gender.name) : ""}</p>
          </Col>
          {/* Baris 2 */}
          <Col xs="12" sm="12" md="5" className="border-bottom mt-4 px-0">
            <b>{t("namapanggilan")}</b>
            <p className="mt-2 mb-1">{detail.nickName}</p>
          </Col>
          <Col xs="1" sm="1" md="1"></Col>
          <Col xs="12" sm="12" md="5" className="border-bottom mt-4 px-0">
            <b>{t("statuspernikahan")}</b>
            <p className="mt-2 mb-1">{detail.maritalStatus?.name ?? "-"}</p>
          </Col>
          {/* Baris 3 */}
          <Col xs="12" sm="12" md="5" className="border-bottom mt-4 px-0">
            <b>Email</b>
            <p className="mt-2 mb-1">{detail.email}</p>
            {/* <p className="mt-2 mb-1">{dataToken.balance ? detail.email : censoredEmail[0] + "******." + censoredEmail[censoredEmail.length-3] + censoredEmail[censoredEmail.length-2] + censoredEmail[censoredEmail.length-1]}</p> */}
          </Col>
          <Col xs="1" sm="1" md="1"></Col>
          <Col xs="12" sm="12" md="5" className="border-bottom mt-4 px-0">
            <b>{t("notelpon")}</b>
            <p className="mt-2 mb-1">{detail.phone}</p>
          </Col>
          {/* Baris 4 */}
          <Col xs="12" sm="12" md="5" className="border-bottom mt-4 px-0">
            <b>{t("alamat")}</b>
            <p className="mt-2 mb-1">
              {(dataToken.balance || !dataToken.isExpired) ? [
                detail.currentAddress.city?.name,
                detail.currentAddress.province?.name,
                detail.currentAddress.country?.name,
              ]
                .filter(Boolean)
                .join(", ") : "**********"}
            </p>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

const ApplicantResume = ({ data: applicant, dataToken }) => {
  const {
    detail: { dataEducation, dataWorkingHistory, dataSkill },
  } = applicant;

  const [
    // eslint-disable-next-line
    downloadingProfile,
    setdownloadingProfile,
  ] = useState(false);
  const [downloadProfileLoading, setdownloadProfileLoading] = useState(false);

  function downloadProfile() {
    if (!setdownloadingProfile) {
      return;
    }
    setdownloadProfileLoading(true);
    requestDownload(
      `v1/recruitment/applicants/download-profile?email=${applicant.userEmail}`
    ).finally(() => {
      setdownloadProfileLoading(false);
    });
  }
  return (
    <Card>
      <CardHeader>
        <div className="bd-highlight pull-right">
          {(dataToken.balance || !dataToken.isExpired) ? <Button
            onClick={downloadProfile}
            color="netis-color"
            disabled={downloadProfileLoading}
          >
            {downloadProfileLoading ? (
              <Fragment>
                <Spinner size="sm" /> Downloading...
              </Fragment>
            ) : (
              <Fragment>
                <i className="fa fa-download mr-2"></i> Download PDF
              </Fragment>
            )}
          </Button> : null}
        </div>
      </CardHeader>
      <CardBody>
        <Row className="md-company-header mb-3 mt-2">
          <Col className="d-flex justify-content-between align-items-center">
            <h5 className="content-sub-title mb-0">{t("pendidikanformal")}</h5>
          </Col>
        </Row>
        <Row>
          <Col xs="12" lg="12">
            <Table responsive>
              <thead>
                <tr>
                  <th className="text-center w-10">No.</th>
                  <th className="text-center">{t("jenjangpendidikan")}</th>
                  <th className="text-center">{t("institusi")}</th>
                  <th className="text-center">{t("jurusan")}</th>
                  <th className="text-center">{t("tahunmulai")}</th>
                  <th className="text-center">{t("tahunselesai")}</th>
                </tr>
              </thead>
              <tbody>
                {dataEducation &&
                  dataEducation.map((edu, idx) => (
                    <tr key={edu.id}>
                      <td className="text-center">{idx + 1}</td>
                      <td className="text-center">{edu.level}</td>
                      <td className="text-center">{edu.institution}</td>
                      <td className="text-center">{edu.major}</td>
                      <td className="text-center">{edu.yearStart}</td>
                      <td className="text-center">{edu.yearEnd}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Col>
        </Row>

        <Row className="md-company-header mb-3 mt-5">
          <Col className="d-flex justify-content-between align-items-center">
            <h5 className="content-sub-title mb-0">{t("pengalamankerja")}</h5>
          </Col>
        </Row>
        <Row>
          <Col xs="12" lg="12">
            <Table responsive>
              <thead>
                <tr>
                  <th className="text-center w-10">No.</th>
                  <th className="text-center">{t("institusi")}</th>
                  <th className="text-center">{t("posisi")}</th>
                  <th className="text-center">{t("tahunmulai")}</th>
                  <th className="text-center">{t("tahunselesai")}</th>
                </tr>
              </thead>
              <tbody>
                {dataWorkingHistory &&
                  dataWorkingHistory.map((work, idx) => (
                    <tr key={work.id}>
                      <td className="text-center">{idx + 1}</td>
                      <td className="text-center">{work.institution}</td>
                      <td className="text-center">{work.description}</td>
                      <td className="text-center">{work.yearStart}</td>
                      <td className="text-center">{work.yearEnd}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Col>
        </Row>

        <Row className="md-company-header mb-3 mt-5">
          <Col className="d-flex justify-content-between align-items-center">
            <h5 className="content-sub-title mb-0">{t("keahlian")}</h5>
          </Col>
        </Row>
        <Row>
          <Col xs="12" lg="12">
            <Table responsive>
              <thead>
                <tr>
                  <th className="text-center w-10">No.</th>
                  <th className="text-center">{t("keahlian")}</th>
                  <th className="text-center">Level</th>
                </tr>
              </thead>
              <tbody>
                {dataSkill &&
                  dataSkill.map((skill, idx) => (
                    <tr key={skill.id}>
                      <td className="text-center">{idx + 1}</td>
                      <td className="text-center">{skill.name}</td>
                      <td className="text-center">
                        <StarRatingComponent
                          name="testLevel"
                          starCount={5}
                          value={skill.level}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

const ApplicantAssesment = ({ data: applicant, match, getAPI, dataToken, guide, can }) => {
  const {
    detail: { id, dataAssessment, dateOfBirth: date },
  } = applicant;

  const {
    mbti: assessmentMbti = [],
    papikostik: assessmentPapikostick = [],
    disc = [],
    video = [],
    gesture = [],
    fisiognomi = [],
    palmistry = [],
    shio = [],
    zodiac = [],
    bazi: assessmentBazi,
    fingerprint = null,
    msdt = null,
    spm = null,
  } = dataAssessment;

  const [modalNoToken, setModalNoToken] = useState(true);
  const toggleNoToken = () => setModalNoToken(!modalNoToken);

  return (
    <div>
      {guide.layout && guide.header && guide.applicantDetail && guide.applicantAssessment && (!dataToken.balance || dataToken.isExpired) ? <NoToken nullData="all" isOpen={modalNoToken} toggle={toggleNoToken} /> : null}

      { assessmentMbti &&
        Boolean(assessmentMbti.length) &&
        assessmentMbti.map((ases, index) => (
          <AssessmentMbti ases={ases} key={index} dataToken={dataToken} />
        ))}
      {assessmentPapikostick && assessmentPapikostick[0] && (
        <AssessmentPapikostick papi={assessmentPapikostick[0]} dataToken={dataToken} />
      )}
      {disc && disc[0] && (
        <AssessmentDISC can={can} data={disc[0]} id={id} getAPI={getAPI} dataToken={dataToken} />
      )}
      {msdt && <AssessmentMsdt can={can} data={msdt} id={id} getAPI={getAPI} dataToken={dataToken} />}
      {spm && <AssessmentSpm can={can} data={spm} id={id} getAPI={getAPI} dataToken={dataToken} />}
      {video && video[0] && <AssessmentVideo can={can} vid={video[0]} id={id} getAPI={getAPI} dataToken={dataToken} />}
      {gesture && gesture[0] && gesture[0]['data'] && gesture[0]['data'][0] && gesture[0]['data'][0]['resultData'] && <AssessmentGesture can={can} vid={gesture[0]} id={id} getAPI={getAPI} dataToken={dataToken} />}
      {fisiognomi && fisiognomi[0] && <AssessmentFisiognomi can={can} data={fisiognomi[0]} id={id} getAPI={getAPI} dataToken={dataToken} />}

      {palmistry && palmistry[0] && <AssessmentPalmistry can={can} data={palmistry[0]} id={id} getAPI={getAPI} dataToken={dataToken} />}

      {fingerprint && <AssessmentFingerprint can={can} data={fingerprint} id={id} getAPI={getAPI} dataToken={dataToken} />}

      {assessmentBazi && <AssessmentBazi can={can} bazi={assessmentBazi} date={date} id={id} getAPI={getAPI} dataToken={dataToken} />}

      {shio && <AssessmentShio can={can} shio={shio} id={id} date={date} getAPI={getAPI} dataToken={dataToken} />}

      {zodiac && <AssessmentZodiac can={can} zodiac={zodiac} id={id} date={date} getAPI={getAPI} dataToken={dataToken} />}
    </div>
  );
};

function shuffleArray(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const AssessmentFisiognomi = ({ data: fisiognomi, id, getAPI, dataToken, can }) => {
  const data = fisiognomi?.answers?.data;
  const [modalFisiog, setModalFisiog] = useState(false);
  const [modalUnlock, setModalUnlock] = useState(false);
  const [modalNoToken, setModalNoToken] = useState(false);
  const [loadingBuy, setLoadingBuy] = useState(false);
  const [forbidden, setForbidden] = useState(false)
  const toggleFisiog = () => setModalFisiog(!modalFisiog);
  const toggleNoToken = () => setModalNoToken(!modalNoToken);
  const toggleUnlock = () => {
    if(can('canManagementToken')){
      setModalUnlock(!modalUnlock)
    }
    else {
      setForbidden(true)
    }
  };

  const karakterList = useMemo(() => {
    const arrKarakter = Object.values(data.result);
    return shuffleArray(arrKarakter);
  }, [data.result]);

  const buyFisiognomi = function () {
    setLoadingBuy(true)
    let formFisiog = new FormData();
    formFisiog.append('identity', id)
    formFisiog.append('tokenType', fisiognomi?.tokenType)
    request.post('v1/token/usage', formFisiog)
      .then((response) => {
        if (response?.status === 200) {
          mutate('v1/token')
          getAPI()
            // toast.success('Token berhasil digunakan untuk mengakses Fisiognomi')
            .then(() => toast.success('Token berhasil digunakan untuk mengakses Fisiognomi'))
        }
      })
      .catch((err) => {
        if (err?.response?.status === 403) {
          toast.error("Token yang anda miliki sudah habis, silahkan mengisi ulang Token Anda")
          return;
        }
        else {
          toast.error('Gagal Menggunakan Token atau Membuka Fitur, silahkan coba lagi')
          return;
        }
      })
      .finally(() => {
        setLoadingBuy(false)
        setModalUnlock(false)
      })
  }

  return (
    <Card>
      <CardBody>
        <Row className="md-company-header mb-3 mt-2">
          <Col>
            <h5 className="text-uppercase content-sub-title mb-0">
              <strong>{t("hasilfisiognomi")}</strong>
            </h5>
          </Col>
        </Row>
        <Row>
          <Col md="6" lg="6" className="mb-2">
            <img
              src={data?.processed ?? data?.raw}
              width="100%"
              alt="fisiognomi"
            />
          </Col>
          <Col md="6" lg="6">
            {Object.values(data.result).length > 0 ? (
              <>
                <div className="mb-3">
                  {t("Bentuk Wajah")} : <br />
                  <br />
                  {Object.keys(data?.result ?? {}).map((ciriWajah, idx) => (
                    <ul key={idx}>
                      <li>{ciriWajah}</li>
                    </ul>
                  ))}
                </div>
                <div className="d-flex flex-row-reverse">
                  <Button
                    className={`btn ${fisiognomi?.purchased ? 'button-video' : 'btn-netis-color'}`}
                    onClick={(!dataToken.balance || dataToken.isExpired) ? toggleNoToken : fisiognomi?.purchased ? toggleFisiog : toggleUnlock}
                    style={{ borderRadius: "8px" }}
                  >
                    {fisiognomi?.purchased ?
                      t("Lihat Detail")
                      :
                      <>
                        <i className="fa fa-lock" />&nbsp;&nbsp;{t("Buka Detail")}
                      </>
                    }
                  </Button>
                  {!fisiognomi?.purchased &&
                    <div style={{ marginTop: "4px" }} className="mr-2">
                      <FontAwesomeIcon icon="coins" className="mr-1" style={{ color: "#e0bc47" }} /><b>{fisiognomi.tokenPrice}</b>
                    </div>
                  }
                </div>
              </>
            ) : (
              <div className="alert alert-dark">
                {t("Belum ada hasil fisiognomi yang tersedia")}
              </div>
            )}
          </Col>
        </Row>
      </CardBody>
      {forbidden && <ModalPrivilegeForbidden isOpen={true} forbidden="canManagementToken" isClose={() => setForbidden(false)} />}

      <NoToken nullData="assessment" isOpen={modalNoToken} toggle={toggleNoToken} />
      <Modal isOpen={modalUnlock} style={{ marginTop: "40vh" }}>
        <ModalHeader toggle={toggleUnlock} className="border-bottom-0">
          {t('Tukar Token untuk melihat hasil Fisiognomi?')}
        </ModalHeader>
        <ModalBody className="text-center">
          <FontAwesomeIcon icon="coins" className="mr-1" style={{ color: "#e0bc47" }} />
          <span className="text-primary"><b>{fisiognomi.tokenPrice}</b></span>&nbsp;
              token akan berkurang untuk bisa mengakses fitur ini. <br />
              Apakah anda ingin melanjutkannya?
              <br />
          <div className="text-center d-flex justify-content-between mx-auto mt-2" style={{ width: "50%" }}>
            <Button className="button-token" onClick={toggleUnlock} style={{ width: "100px" }}>
              Batal
                </Button>
            <Button color="netis-color" onClick={buyFisiognomi} style={{ width: "100px", borderRadius: "10px" }} disabled={loadingBuy}>
              {loadingBuy ? <><Spinner color="light" size="sm" />&nbsp;&nbsp;Loading... </> : "Ya"}
            </Button>
          </div>
        </ModalBody>
      </Modal>

      <Modal isOpen={modalFisiog} toggle={toggleFisiog} className="modal-lg">
        <ModalHeader toggle={toggleFisiog}>{t("detailfisiognomi")}</ModalHeader>
        <ModalBody>
          {t("Bentuk Wajah")} : <br />
          <br />
          {Object.keys(data?.result ?? {}).map((ciriWajah, idx) => (
            <ul key={idx}>
              <li>{ciriWajah}</li>
            </ul>
          ))}
          {t("Karakteristik")} : <br />
          <br />
          {karakterList.map((ciriDetail, idx) => (
            <ul key={idx}>
              <li>{ciriDetail}</li>
            </ul>
          ))}
        </ModalBody>
      </Modal>
    </Card>
  );
};

const AssessmentMbti = ({ ases, dataToken }) => {
  const [modalAses, setModalAses] = useState(false);
  const [modalNoToken, setModalNoToken] = useState(false);
  const toggleAses = () => setModalAses(!modalAses);
  const toggleNoToken = () => setModalNoToken(!modalNoToken);


  return (
    <>
      <NoToken nullData="assessment" isOpen={modalNoToken} toggle={toggleNoToken} />
      <Card>
        <CardBody>
          <Row className="md-company-header mb-3 mt-2">
            <Col className="d-flex justify-content-between align-items-center">
              <h5 className="text-uppercase content-sub-title mb-0">
                <strong> Tes Minat & Bakat (MBTI) - {ases.result}</strong>
              </h5>
              <Button
                className="button-video"
                onClick={() => (!dataToken.balance || dataToken.isExpired) ? toggleNoToken() : toggleAses()} style={{ borderRadius: "8px" }}>
                {t("Lihat Detail")}
              </Button>
            </Col>

            <div className="col-12 d-flex mb-3 text-muted">
              <i>{moment(ases.created_at).format("DD MMMM YYYY")}</i>
            </div>
          </Row>

          <div className="p-3 rounded border">
            <ProgressGroup
              typeA={"Introvert"}
              valueA={ases.scores.introvert}
              typeB={"Extrovert"}
              valueB={ases.scores.extrovert}
            />
            <ProgressGroup
              typeA={"Sensing"}
              valueA={ases.scores.sensing}
              typeB={"Intuition"}
              valueB={ases.scores.intuition}
            />
            <ProgressGroup
              typeA={"Feeling"}
              valueA={ases.scores.feeling}
              typeB={"Thinking"}
              valueB={ases.scores.thinking}
            />
            <ProgressGroup
              typeA={"Judging"}
              valueA={ases.scores.judging}
              typeB={"Perceiving"}
              valueB={ases.scores.perceiving}
            />
          </div>
        </CardBody>
      </Card>

      <Modal isOpen={modalAses} toggle={toggleAses} className="modal-lg">
        <ModalHeader toggle={toggleAses}>{t("detailasesmen")}</ModalHeader>
        <ModalBody>
          {!ases.result_detail ? 'Harap isi token anda terlebih dahulu' :
            <>
              <div className="mb-8">
                <h3>{t("karakteristik")}</h3>
                <ReactMarkdown source={ases.result_detail.characterisctics} />
              </div>

              <div className="mb-3 mt-2">
                <h3>{t("fungsikognitif")}</h3>
                <h4 className="h5">
                  <i>{t("kemampuanberpikir")}</i>
                </h4>
              </div>

              <div className="row">
                <div className="col-sm-6">
                  <div className="border rounded p-3 h-100">
                    <h5>{t("fungsidominan")}</h5>
                    <i>
                      <ReactMarkdown source={ases.result_detail.dominan.name} />
                    </i>
                    <ReactMarkdown source={ases.result_detail.dominan.desc} />
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="border rounded p-3 h-100">
                    <h5>{t("fungsisekunder")}</h5>
                    <i>
                      <ReactMarkdown source={ases.result_detail.sekunder.name} />
                    </i>
                    <ReactMarkdown source={ases.result_detail.sekunder.desc} />
                  </div>
                </div>
                <div className="col-sm-12 mt-3">
                  <h3>{t("partneralami")}</h3>
                  <span className="text-uppercase h5">
                    &nbsp;&nbsp;&nbsp;&nbsp;<i>{ases.result_detail.partner1}</i> &{" "}
                    <i>{ases.result_detail.partner2}</i>
                  </span>
                </div>
                <div className="col-sm-12 mt-3">
                  <h3>{t("saranpengembangan")}</h3>
                  <ReactMarkdown source={ases.result_detail.suggestion} />
                </div>
              </div>
            </>
          }
        </ModalBody>
      </Modal>
    </>
  );
};

const AssessmentPapikostick = ({ papi, dataToken }) => {
  const [modalPapi, setModalPapi] = useState(false);
  const [modalNoToken, setModalNoToken] = useState(false);
  const toggleNoToken = () => setModalNoToken(!modalNoToken);

  const togglePapi = () => setModalPapi(!modalPapi);

  const chartRef = useRef(null);
  const [backgroundSize, setBackgroundSize] = useState(null);

  const updateBackgroundSize = React.useCallback(() => {
    if (chartRef.current) {
      const chartHeight = chartRef?.current?.chartInstance?.height;
      if (chartHeight) {
        setBackgroundSize(chartHeight + chartHeight * (0.25));
      } else {
        setBackgroundSize(null);
      }
    }
  }, [chartRef]);

  useEffect(() => {
    updateBackgroundSize();
    window.addEventListener("resize", updateBackgroundSize);
    return () => {
      window.removeEventListener("resize", updateBackgroundSize);
    };
  }, [updateBackgroundSize]);

  const groupingLabel = {
    F: { category: "Followership", color: "#e53935" },
    W: { category: "Followership", color: "#e53935" },
    N: { category: "Work Direction", color: "#8e24aa" },
    G: { category: "Work Direction", color: "#8e24aa" },
    A: { category: "Work Direction", color: "#8e24aa" },
    L: { category: "Leadership", color: "#3949ab" },
    P: { category: "Leadership", color: "#3949ab" },
    I: { category: "Leadership", color: "#3949ab" },
    T: { category: "Activity", color: "#039be5" },
    V: { category: "Activity", color: "#039be5" },
    X: { category: "Social Nature", color: "#00897b" },
    S: { category: "Social Nature", color: "#00897b" },
    B: { category: "Social Nature", color: "#00897b" },
    O: { category: "Social Nature", color: "#00897b" },
    C: { category: "Work Style", color: "#7cb342" },
    D: { category: "Work Style", color: "#7cb342" },
    R: { category: "Work Style", color: "#7cb342" },
    Z: { category: "Temperament", color: "#fb8c00" },
    E: { category: "Temperament", color: "#fb8c00" },
    K: { category: "Temperament", color: "#fb8c00" },
  };
  const colorsByIndex = Object.keys(groupingLabel).map(
    (label) => groupingLabel[label].color
  );
  const data = {
    labels: "FWNGALPITVXSBORDCZEK".split(""),
    datasets: [
      {
        label: "RESULT",
        borderWidth: 1,
        pointRadius: 2,
        backgroundColor: "rgba(0,0,0,0.3)",
        borderColor: (option) => {
          return colorsByIndex[option.dataIndex];
        },
        pointBackgroundColor: (option) => colorsByIndex[option.dataIndex],
        pointBorderColor: (option) => colorsByIndex[option.dataIndex],
        data: "FWNGALPITVXSBORDCZEK".split("").map((huruf) => {
          if (huruf === "Z") {
            return 9 - papi.scores[huruf];
          } else if (huruf === "K") {
            return 9 - papi.scores[huruf];
          } else return papi.scores[huruf];
        }),
      },
    ],
  };

  const options = {
    plugins: {
      datalabels: {
        display: true,
        backgroundColor: (option) => colorsByIndex[option.dataIndex],
        color: "#fff",
        font: {
          weight: "bold",
          size: 11
        },
        borderColor: "#fff",
        borderWidth: 2,
        padding: {
          top: 6,
          bottom: 5,
          left: 8,
          right: 8
        },
        borderRadius: 999
      }
    },
    tooltips: {
      callbacks: {
        title: (tooltipItem, data) => {
          return (
            groupingLabel[data.labels[tooltipItem[0].index]].category +
            " (" +
            data.labels[tooltipItem[0].index] +
            ")"
          );
        },
        label: (tooltipItem, data) => {
          if (data.labels[tooltipItem.index] === "Z") {
            return 9 - tooltipItem.value;
          } else if (data.labels[tooltipItem.index] === "K") {
            return 9 - tooltipItem.value;
          } else return tooltipItem.value;
          // return parseInt(tooltipItem.value)
        },
      },
    },
    legend: {
      display: false,
    },
    title: {
      display: false,
      // text: 'Hasil PAPIKostick'
    },
    scale: {
      gridLines: {
        display: false,
        circular: true,
      },
      angleLines: {
        // display: false,
      },
      ticks: {
        display: false,
        max: 9,
        min: 0,
        stepSize: 1,
        beginAtZero: true,
        showLabelBackdrop: true,
      },
      pointLabels: {
        display: false,
        fontStyle: "bold",
        fontSize: 12,
        fontColor: Object.keys(groupingLabel).map(
          (label) => groupingLabel[label].color
        ),
      },
    },
  };

  const template = {
    Followership: ["F", "W"],
    "Work Direction": ["N", "G", "A"],
    Leadership: ["L", "P", "I"],
    Activity: ["T", "V"],
    "Social Nature": ["X", "S", "B", "O"],
    "Work Style": ["C", "D", "R"],
    Temperament: ["Z", "E", "K"],
  };
  const groupingDesc = {
    F: t("Keb Membantu Atasan"),
    W: t("Keb Mengikuti Aturan dan Pengawasan"),
    N: t("Keb dalam Menyelesaikan Tugas (Kemandirian)"),
    G: t("Peran Pekerja Keras"),
    A: t("Keb dalam Berprestasi"),
    L: t("Peran Kepemimpinan"),
    P: t("Keb Mengatur Orang Lain"),
    I: t("Peran Dalam Membuat Keputusan"),
    T: t("Peran Dalam Kesibukan Kerja"),
    V: t("Peran Dalam Semangat Kerja"),
    X: t("Keb untuk Diperhatikan"),
    S: t("Peran Dalam Hubungan Sosial"),
    B: t("Keb Diterima dalam Kelompok"),
    O: t("Keb Kedekatan dan Kasih Sayang"),
    C: t("Peran Dalam Mengatur"),
    D: t("Peran Bekerja dengan Hal-hal Rinci"),
    R: t("Peran Penalaran Teoritis"),
    Z: t("Keb untuk Berubah"),
    E: t("Peran Dalam Pengendalian Emosi"),
    K: t("Keb untuk Agresif"),
  };

  const group =
    papi.result &&
    Object.keys(papi.result).map((category) => {
      const item =
        papi.result &&
        template[category].map((code, idx) => ({
          code: code,
          scores: papi.scores[code],
          description: papi.result[category][idx],
        }));

      return {
        kategory: category,
        items: item,
      };
    });

  function titleColor(resultTitle) {
    switch (resultTitle) {
      case "Followership":
        return "#e53935";
      case "Work Direction":
        return "#8e24aa";
      case "Leadership":
        return "#3949ab";
      case "Activity":
        return "#039be5";
      case "Social Nature":
        return "#00897b";
      case "Work Style":
        return "#7cb342";
      case "Temperament":
        return "#fb8c00";
      default:
        return "#FFFFFF";
    }
  }

  return (
    <>
      <NoToken nullData="assessment" isOpen={modalNoToken} toggle={toggleNoToken} />
      <Card>
        <CardBody>
          <Row className="md-company-header mb-3 mt-2">
            <Col className="d-flex justify-content-between align-items-center">
              <h5 className="content-sub-title mb-0"><strong>Tes Gaya Kerja (PAPI Kostick)</strong></h5>
              <Button className="button-video" onClick={(!dataToken.balance || dataToken.isExpired) ? toggleNoToken : togglePapi} style={{ borderRadius: "8px" }}>
                {t("Lihat Detail")}
              </Button>
            </Col>
          </Row>

          <div
            className={`mx-auto grafik-papikostick-admin`}
            style={{
              backgroundSize: backgroundSize ?? "auto 95%",
            }}
          >
            <Radar
              data={data}
              options={options}
              width={100}
              height={70}
              ref={chartRef}
            />
          </div>
        </CardBody>
      </Card>

      <Modal isOpen={modalPapi} toggle={togglePapi} className="modal-xl">
        <ModalHeader style={{ backgroundColor: "#f9fafc" }} toggle={togglePapi}>Hasil PAPI Kostick</ModalHeader>
        <ModalBody style={{ backgroundColor: "#f9fafc" }}>
          {group &&
            group.map((objKategori) => {
              return (
                <div className="mt-2 mb-1">
                  <h3 className="mt-2" style={{ color: titleColor(objKategori.kategory) }}>{objKategori.kategory}</h3>
                  <Row>
                    <Col xs="12" md="4" className="text-center papi-desc">Aspek</Col>
                    <Col xs="12" md="2" className="text-center papi-desc">Nilai</Col>
                    <Col xs="12" md="6" className="text-center papi-desc">Deskripsi</Col>
                  </Row>
                  {objKategori &&
                    objKategori.items.map((objItem, idx) => (
                      <>
                        <ListGroup className="mb-1" key={idx}>
                          <ListGroupItem className="papi-list" style={{ borderLeftColor: titleColor(objKategori.kategory) }}>
                            <Row>
                              <Col xs="12" md="4" className="py-2">
                                <div className="papi-desc-small">Aspek :<br /></div>
                                <div className="ml-1">
                                  {objItem.code} : {groupingDesc[objItem.code]}
                                </div>
                              </Col>
                              <Col xs="12" md="2" className="py-2 papi-border text-sm-center">
                                <div className="papi-desc-small">Nilai :<br /></div>
                                <Star value={(objItem.scores + 1) / 2} />({objItem.scores})
                              </Col>
                              <Col xs="12" md="6" className="py-2 papi-result-desc border-0">
                                <div className="papi-desc-small">Deskripsi :<br /></div>
                                {objItem.description}
                              </Col>
                            </Row>
                          </ListGroupItem>
                        </ListGroup>
                      </>
                    ))
                  }<br /><br />
                </div>
              )
            })
          }
        </ModalBody>
      </Modal>
    </>
  );
};

const AssessmentVideo = ({ vid, id, getAPI, dataToken, can }) => {
  const [firstData, ...restData] = vid?.answers?.data;
  const vidRef = useRef(null);
  const vidRef2 = useRef(null);
  const [showButton, setShowButton] = useState(true);
  const [showButton2, setShowButton2] = useState(true);
  const [modalNoToken, setModalNoToken] = useState(false);
  const toggleNoToken = () => setModalNoToken(!modalNoToken);
  const firstVideo = React.useMemo(() =>
    vid.answers.data[0] ? { resultUrl: vid.answers.data[0]?.raw } : null,
    [vid]
  );
  const firstWidya = React.useMemo(() => vid.answers.data[0].video, [vid]);
  const firstTitle = React.useMemo(() => vid.answers.data[0].title, [vid]);
  const [activeVideo, setActiveVideo] = useState(firstVideo);
  const [activeWidya, setActiveWidya] = useState(firstWidya);
  const [activeTitle, setActiveTitle] = useState(firstTitle);
  const [modalUnlock, setModalUnlock] = useState(false);
  const [loadingBuy, setLoadingBuy] = useState(false);
  const [hint, setHint] = useState(false)
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [modalEyecues, setModalEyecues] = useState(false);
  const [forbidden, setForbidden] = useState(false)

  const toogle = () => {
    setModalEyecues(!modalEyecues);
  }

  const toggleTooltip = () => setTooltipOpen(!tooltipOpen);

  const toggleUnlock = () => {
    if(can('canManagementToken')){
      setModalUnlock(!modalUnlock)
    }
    else {
      setForbidden(true)
    }
  }

  const buyVideo = function () {
    setLoadingBuy(true)
    let formFisiog = new FormData();
    formFisiog.append('identity', id)
    formFisiog.append('tokenType', vid?.tokenType)
    request.post('v1/token/usage', formFisiog)
      .then((response) => {
        if (response?.status === 200) {
          mutate('v1/token')
          getAPI()
            .then(() => toast.success('Token berhasil ditukarkan dengan akses video asesmen'))
        }
      })
      .catch((err) => {
        if (err?.response?.status === 403) {
          toast.error("Token yang anda miliki sudah habis, silahkan mengisi ulang Token Anda")
          return;
        }
        else {
          toast.error('Gagal Menggunakan Token atau Membuka Fitur, silahkan coba lagi')
          return;
        }
      })
      .finally(() => {
        setLoadingBuy(false)
        setModalUnlock(false)
      })
  }

  // useEffect(() => {
  //   activeWidya && vidRef2.current.pause();
  //   activeVideo && vidRef.current.pause();
  // }, [activeVideo, activeWidya])

  function changeVideo(video) {
    setActiveWidya(video.video);
    setActiveTitle(video.title);
    setShowButton(true)
    setShowButton2(true)
    setActiveVideo({ resultUrl: video.raw });
  }

  function changeAnotation(video) {
    setActiveWidya(video.video);
    setActiveTitle(video.title);
    setShowButton(true)
    setShowButton2(true)
    setActiveVideo(video.processed);
  }

  let highestEmotion = null;
  const resultEmotion = Object.keys(
    activeVideo?.resultData?.emotion ?? {}
  ).map((label) => ({ label, value: activeVideo.resultData.emotion[label] }));
  for (const emotion of resultEmotion) {
    if (highestEmotion == null) {
      highestEmotion = emotion;
    } else if (parseFloat(emotion.value) > parseFloat(highestEmotion.value)) {
      highestEmotion = emotion;
    }
  }

  let highestEyecues = null;
  const resultEyecues = activeVideo?.resultData?.eyecues?.map((item) => ({ label: item.class, value: item.score, desc: item.description })) ?? [];

  if (resultEyecues) {
    for (const eyecues of resultEyecues) {
      if (highestEyecues == null) {
        highestEyecues = eyecues;
      } else if (eyecues.value > highestEyecues.value) {
        highestEyecues = eyecues;
      }
    }
  }

  const playVid = () => {
    vidRef2.current.pause();
    vidRef.current.play();
    setShowButton(false);
  };

  const playVid2 = () => {
    vidRef.current.pause();
    vidRef2.current.play();
    setShowButton2(false);
  };

  const pauseVid2 = () => {
    vidRef2.current.pause();
    setShowButton2(true);
  };

  return (
    <>
      {forbidden && <ModalPrivilegeForbidden isOpen={true} forbidden="canManagementToken" isClose={() => setForbidden(false)} />}
      <NoToken nullData="assessment" isOpen={modalNoToken} toggle={toggleNoToken} />
      <Modal isOpen={modalUnlock} style={{ marginTop: "40vh" }}>
        <ModalHeader toggle={toggleUnlock} className="border-bottom-0">
          {t('Tukar Token untuk melihat video selanjutnya?')}
        </ModalHeader>
        <ModalBody className="text-center">
          <FontAwesomeIcon icon="coins" className="mr-1" style={{ color: "#e0bc47" }} />
          <span className="text-primary"><b>{vid.tokenPrice ?? 1}</b></span>&nbsp;
              token akan berkurang untuk bisa mengakses fitur ini. <br />
              Apakah anda ingin melanjutkannya?
              <br />
          <div className="text-center d-flex justify-content-between mx-auto mt-2" style={{ width: "50%" }}>
            <Button className="button-token" onClick={toggleUnlock} style={{ width: "100px" }}>
              Batal
                </Button>
            <Button color="netis-color" onClick={buyVideo} style={{ width: "100px", borderRadius: "10px" }} disabled={loadingBuy}>
              {loadingBuy ? <><Spinner color="light" size="sm" />&nbsp;&nbsp;Loading... </> : "Ya"}
            </Button>
          </div>
        </ModalBody>
      </Modal>

      <Card>
        <CardBody>
          <Row className="md-company-header flex-column mb-3 mt-2">
            <Col className="d-flex justify-content-between align-items-center">
              <div>
                <h5 className="text-uppercase content-sub-title mb-0">
                  <strong>{vid.testName} ASESMEN</strong>
                </h5>
                <i>{moment(vid.created_at).format("DD MMMM YYYY")}</i>
              </div>
            </Col>
            {/* <img src={require("../../../../assets/img/16personalities/entj.png")} alt="transparent" /> */}
          </Row>

          <div className="vid-flex">
            <div className="mb-5 mr-3">
              {activeVideo && (
                <>
                  <div className="vidwrapper">
                    <video
                      ref={vidRef}
                      className="vid"
                      src={activeVideo.resultUrl}
                      id="dataVid"
                      controls
                      onPlaying={() => setShowButton(false)}
                      onPause={() => setShowButton(true)}
                    />
                    {showButton ? (
                      <>
                        <p className="title text-capitalize">
                          &nbsp;&nbsp;&nbsp;{activeTitle}&nbsp;&nbsp;&nbsp;
                        </p>
                        <Button className="play" onClick={playVid}>
                          <i className="fa fa-2x fa-align-center fa-play"></i>
                        </Button>
                        <div className="vidwrapperWidya">
                          <video
                            ref={vidRef2}
                            className="smallVid"
                            src={activeWidya}
                            onPlaying={() => setShowButton2(false)}
                            onPause={() => setShowButton2(true)}
                          />
                          {showButton2 ? (
                            <>
                              {t("Pertanyaan")} :&nbsp;
                              <Button
                                className="play2"
                                onClick={playVid2}
                              >
                                <i className="fa fa-sm fa-align-center fa-play"></i>
                              </Button>
                            </>
                          ) : (
                            <Button
                              className="pause"
                              onClick={pauseVid2}
                            >
                              <i className="fa fa-sm fa-align-center fa-pause"></i>
                            </Button>
                          )}
                        </div>
                      </>
                    ) : null}
                  </div>

                  {(highestEmotion || highestEyecues) && (
                    <>
                      {highestEmotion && (
                        <ListGroup>
                          <ListGroupItem className="anotation-list py-2">
                            <Row style={{ marginLeft: "-6px" }} className="pr-lg-2">
                              <Col xs="8" md="9" className="anotation-name py-2">
                                {highestEmotion.label}
                              </Col>
                              <Col xs="4" md="3" className="anotation-value text-center py-2">
                                {highestEmotion.value}
                              </Col>
                            </Row>
                          </ListGroupItem>
                        </ListGroup>
                      )}
                      {highestEyecues && (
                        <ListGroup>
                          <ListGroupItem className="anotation-list my-2">
                            <Row style={{ marginLeft: "-6px" }} className="pr-lg-2">
                              <Col xs="8" md="9" className="anotation-name py-2">
                                {highestEyecues.label}
                              </Col>
                              <Col xs="4" md="3" className="anotation-value text-center py-2">
                                {highestEyecues.value}
                              </Col>
                            </Row>
                          </ListGroupItem>
                        </ListGroup>
                      )}
                      {highestEyecues && (
                        <div className="text-center mt-3">
                          <Button className="button-video" onClick={toogle}>
                            Lihat Detail
                        </Button>
                        </div>
                      )}
                      <Modal isOpen={modalEyecues} toggle={toogle}>
                        <ModalHeader toggle={toogle} className="border-bottom-0">
                          Deskripsi Eyecues
                        </ModalHeader>
                        <ModalBody>
                          <div>
                            <h4 className="text-capitalize">{highestEyecues.label.split("-").join(" ")}</h4>
                            <span>{highestEyecues.desc}</span>
                          </div>
                        </ModalBody>
                      </Modal>
                    </>
                  )
                    // : (!vid.purchased ?
                    //   <div className="alert alert-dark">
                    //     {t("Sistem sedang menganalisa video ini")}
                    //   </div>
                    //   :
                    //   null
                    //   )
                  }
                </>
              )}
            </div>
            <div className="col-table-video">
              {/* <div className="video-label">
                Daftar Video
              </div> */}
              {/* <div style={{position:"relative", backgroundColor:"#DCDCDC"}}> */}
              {vid.purchased ? null
                :
                <div className="lock-token text-center">
                  <i className="fa fa-lock lock-icon" aria-hidden="true" /><br />
                  <div>
                    <span style={{ fontSize: "16pt" }}><b>Mau membuka video selanjutnya?</b></span><br />
                    <span>Caranya klik "Buka Detail" di bawah ini</span><br />
                    {vid.tokenPriceSecond !== 0 ?
                      <div style={{ position: "relative" }}>
                        <div style={{ position: "absolute", top: "50%", width: 45, height: 2, background: "#ff0200", left: "calc(50% - 22px)", transform: "rotate(-15deg)" }}></div>
                        <FontAwesomeIcon icon="coins" className="mr-1" style={{ color: "#676767" }} />
                        <b>{vid.tokenPriceSecond}</b><br />
                      </div>
                      :
                      ''
                    }
                    <FontAwesomeIcon icon="coins" className="mr-1" style={{ color: "#e0bc47" }} />
                    <b>{vid.tokenPrice}</b><br />
                    <Button
                      className="btn btn-netis-color mb-2 mr-2"
                      onClick={(!dataToken.balance || dataToken.isExpired) ? toggleNoToken : toggleUnlock} style={{ borderRadius: "8px" }}>
                      <i className="fa fa-lock mr-1" />
                      {t('Buka Detail')}
                    </Button>
                  </div>
                </div>
              }
              <Table responsive hover className="border border-secondary border-bottom">
                <thead>
                  <tr>
                    <th className="w-10"></th>
                    <th className="text-center w-50">Nama Video</th>
                    <th className="text-center">
                      Jenis Video
                      <Button onClick={() => setHint(!hint)} className="text-nowrap" style={{ backgroundColor: "transparent", border: "transparent" }} id="TooltipExample">
                        <i className="fa fa-lg fa-question-circle text-primary" />
                      </Button>
                      <Tooltip placement="bottom" isOpen={tooltipOpen} target="TooltipExample" toggle={toggleTooltip}>
                        Jika tombol "Dengan Anotasi" tidak muncul, kemungkinan video wawancara tersebut tidak terekam dengan baik atau
                        Pelamar tidak melakukan wawancara dengan benar.
                      </Tooltip>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={`${activeTitle === firstData.title ?
                    `video-border` : ``
                    }`}
                  >
                    <td>
                      {firstData?.processed !== null ?
                        <i className="fa fa-check-circle-o text-success ml-1" />
                        :
                        <i className="fa fa-spinner text-info ml-1" />
                      }
                    </td>
                    <td>1. {firstData.title}</td>
                    <td className="text-nowrap">
                      <Button className={`text-center text-nowrap button-video mr-2 ${activeVideo.resultUrl === firstData.raw ? `button-video-active` : ``}`}
                        onClick={() => changeVideo(firstData)}
                      >
                        {t('Tanpa Anotasi')}
                      </Button>
                      {firstData.processed !== null ?
                        <Button className={`text-center text-nowrap button-asesmen ml-2 ${activeVideo.resultUrl === firstData.processed.resultUrl ? `button-asesmen-active` : ``}`}
                          onClick={() => changeAnotation(firstData)}
                        // style={{width:125, height: 38}}
                        >
                          {t('Dengan Anotasi')}
                        </Button>
                        :
                        <small className="text-danger">Sedang dianalisa</small>
                      }
                    </td>
                  </tr>
                  {restData &&
                    restData.map((video, idx) => (
                      <tr key={idx + 1} className={`${activeTitle === video.title ?
                        `video-border` : ``
                        }`}
                      >
                        <td>
                          {vid.purchased ?
                            video.processed !== null ?
                              <>
                                <i className="fa fa-check-circle-o text-success ml-1" id="process" />
                              </>
                              :
                              <i className="fa fa-spinner text-info ml-1" />
                            :
                            <i className="fa fa-video-camera ml-1" />
                          }
                        </td>
                        <td>
                          {idx + 2}. {video.title}
                        </td>
                        <td className="text-nowrap">
                          <Button className={`text-center text-nowrap button-video mr-2 ${activeVideo.resultUrl === video.raw ? `button-video-active` : ``}`}
                            onClick={() => changeVideo(video)}
                            disabled={!vid.purchased}
                          >
                            {t("Tanpa Anotasi")}
                          </Button>
                          {video.processed !== null ?
                            <Button className={`text-center text-nowrap button-asesmen ml-2 ${activeVideo.resultUrl === video.processed.resultUrl ? `button-asesmen-active` : ``}`}
                              onClick={() => changeAnotation(video)}
                              disabled={!vid.purchased}
                            >
                              {t('Dengan Anotasi')}
                            </Button>
                            : <small className="text-danger">Sedang dianalisa</small>
                          }
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
            </div>
          </div>

        </CardBody>
      </Card>
    </>
  );
};

const AssessmentGesture = ({ vid, id, getAPI, dataToken, can }) => {
  const [firstData, ...restData] = vid?.data;
  const [modalNoToken, setModalNoToken] = useState(false);
  const toggleNoToken = () => setModalNoToken(!modalNoToken);
  const vidRef = useRef(null);
  const firstVideo = React.useMemo(() =>
    vid.data[0] ? { resultUrl: vid.data[0]?.videoUrl } : null,
    [vid]
  );
  const firstTitle = React.useMemo(() => vid.data[0]?.title, [vid]);
  const [activeVideo, setActiveVideo] = useState(firstVideo);
  const [anotationData, setAnotationData] = useState(null);
  const [activeTitle, setActiveTitle] = useState(firstTitle);
  const [modalUnlock, setModalUnlock] = useState(false);
  const [loadingBuy, setLoadingBuy] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [modalGesture, setModalGesture] = useState(false);
  const [hint, setHint] = useState(false)
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [forbidden, setForbidden] = useState(false)

  const toggleTooltip = () => setTooltipOpen(!tooltipOpen);

  const toggleGesture = () => {
    setModalGesture(!modalGesture);
  }

  const toggleUnlock = () => {
    if(can('canManagementToken')){
      setModalUnlock(!modalUnlock)
    }
    else {
      setForbidden(true)
    }
  }

  const playVid = () => {
    vidRef.current.play();
    setShowButton(false);
  };

  const buyVideo = function () {
    setLoadingBuy(true)
    let formFisiog = new FormData();
    formFisiog.append('identity', id)
    formFisiog.append('tokenType', vid?.tokenType)
    request.post('v1/token/usage', formFisiog)
      .then((response) => {
        if (response?.status === 200) {
          mutate('v1/token')
          getAPI()
            .then(() => toast.success('Token berhasil ditukarkan dengan akses gesture video asesmen'))
        }
      })
      .catch((err) => {
        if (err?.response?.status === 403) {
          toast.error("Token yang anda miliki sudah habis, silahkan mengisi ulang Token Anda")
          return;
        }
        else {
          toast.error('Gagal Menggunakan Token atau Membuka Fitur, silahkan coba lagi')
          return;
        }
      })
      .finally(() => {
        setLoadingBuy(false)
        setModalUnlock(false)
      })
  }

  function changeVideo(video) {
    setActiveTitle(video.title);
    setActiveVideo({ resultUrl: video.videoUrl });
    setAnotationData(null);
    setShowButton(true);
  }

  function changeAnotation(video) {
    setActiveTitle(video.title);
    setActiveVideo({ resultUrl: video.resultUrl });
    setAnotationData(video.resultData);
    setShowButton(true);
  }

  return (
    <>
      {forbidden && <ModalPrivilegeForbidden isOpen={true} forbidden="canManagementToken" isClose={() => setForbidden(false)} />}
      <NoToken nullData="assessment" isOpen={modalNoToken} toggle={toggleNoToken} />
      <Modal isOpen={modalUnlock} style={{ marginTop: "40vh" }}>
        <ModalHeader toggle={toggleUnlock} className="border-bottom-0">
          {t('Tukar Token untuk melihat video selanjutnya?')}
        </ModalHeader>
        <ModalBody className="text-center">
          <FontAwesomeIcon icon="coins" className="mr-1" style={{ color: "#e0bc47" }} />
          <span className="text-primary"><b>{vid.tokenPrice ?? 1}</b></span>&nbsp;
              token akan berkurang untuk bisa mengakses fitur ini. <br />
              Apakah anda ingin melanjutkannya?
              <br />
          <div className="text-center d-flex justify-content-between mx-auto mt-2" style={{ width: "50%" }}>
            <Button className="button-token" onClick={toggleUnlock} style={{ width: "100px" }}>
              Batal
                </Button>
            <Button color="netis-color" onClick={buyVideo} style={{ width: "100px", borderRadius: "10px" }} disabled={loadingBuy}>
              {loadingBuy ? <><Spinner color="light" size="sm" />&nbsp;&nbsp;Loading... </> : "Ya"}
            </Button>
          </div>
        </ModalBody>
      </Modal>

      <Modal isOpen={modalGesture} toggle={toggleGesture}>
        <ModalHeader toggle={toggleGesture} className="border-bottom-0">
          Deskripsi Gesture Wajah
        </ModalHeader>
        <ModalBody>
          {anotationData && anotationData.map((data, idx) => (
            <div key={idx}>
              <h4 className="text-capitalize">{data.gesture.split("-").join(" ")}</h4>
              <span>{data.description}</span>
              {anotationData.length !== (idx + 1) && <hr />}
            </div>
          ))}
          {/* {anotationData.map((text, idx) => ( */}
        </ModalBody>
      </Modal>

      <Card>
        <CardBody>
          <Row className="md-company-header flex-column mb-3 mt-2">
            <Col className="d-flex justify-content-between align-items-center">
              <div>
                <h5 className="text-uppercase content-sub-title mb-0">
                  <strong>{vid.testName} ASESMEN</strong>
                </h5>
                <i>{moment(vid.created_at).format("DD MMMM YYYY")}</i>
              </div>
            </Col>
            {/* <img src={require("../../../../assets/img/16personalities/entj.png")} alt="transparent" /> */}
          </Row>

          <div className="vid-flex">
            <div className="mb-5 mr-3">
              {activeVideo && (
                <>
                  <div className="vidwrapper">
                    <video
                      ref={vidRef}
                      className="vid"
                      src={activeVideo.resultUrl}
                      width="90%"
                      height="auto"
                      id="dataVid"
                      controls
                      onPlaying={() => setShowButton(false)}
                      onPause={() => setShowButton(true)}
                    />
                    {showButton ? (
                      <>
                        <p className="title text-capitalize">
                          &nbsp;&nbsp;&nbsp;{activeTitle}&nbsp;&nbsp;&nbsp;
                        </p>
                        <Button className="play" onClick={playVid}>
                          <i className="fa fa-2x fa-align-center fa-play"></i>
                        </Button>
                      </>
                    ) : null}
                  </div>
                  {anotationData?.length && (
                    <>
                      {anotationData.map((text, idx) => (
                        <ListGroup key={idx}>
                          <ListGroupItem className="anotation-list my-2">
                            <Row style={{ marginLeft: "-6px" }} className="pr-lg-2">
                              <Col xs="7" md="9" className="anotation-name text-capitalize py-2">
                                {text.gesture.split("-").join(" ")}
                              </Col>
                              <Col xs="5" md="3" className="anotation-value text-center py-2">
                                {text.score}
                              </Col>
                            </Row>
                          </ListGroupItem>
                        </ListGroup>
                      ))}
                      <div className="text-center mt-3">
                        <Button className="button-video" onClick={toggleGesture}>
                          Lihat Detail
                        </Button>
                      </div>
                    </>
                  )
                    // : (!vid.purchased ?
                    //   <div className="alert alert-dark">
                    //     {t("Sistem sedang menganalisa video ini")}
                    //   </div>
                    //   :
                    //   null
                    //   )
                  }
                </>
              )}
            </div>
            <div className="col-table-video">
              {/* <div className="video-label">
                Daftar Video
              </div> */}
              {/* <div style={{position:"relative", backgroundColor:"#DCDCDC"}}> */}
              {vid.purchased ? null
                :
                <div className="lock-token text-center">
                  <i className="fa fa-lock lock-icon" aria-hidden="true" /><br />
                  <div>
                    <span style={{ fontSize: "16pt" }}><b>Mau membuka video selanjutnya?</b></span><br />
                    <span>Caranya klik "Buka Detail" di bawah ini</span><br />
                    {vid.tokenPriceSecond !== 0 ?
                      <div style={{ position: "relative" }}>
                        <div style={{ position: "absolute", top: "50%", width: 45, height: 2, background: "#ff0200", left: "calc(50% - 22px)", transform: "rotate(-15deg)" }}></div>
                        <FontAwesomeIcon icon="coins" className="mr-1" style={{ color: "#676767" }} />
                        <b>{vid.tokenPriceSecond}</b><br />
                      </div>
                      :
                      ''
                    }
                    <FontAwesomeIcon icon="coins" className="mr-1" style={{ color: "#e0bc47" }} />
                    <b>{vid.tokenPrice}</b><br />
                    <Button
                      className="btn btn-netis-color mb-2 mr-2"
                      onClick={(!dataToken.balance || dataToken.isExpired) ? toggleNoToken : toggleUnlock} style={{ borderRadius: "8px" }}>
                      <i className="fa fa-lock mr-1" />
                      {t('Buka Detail')}
                    </Button>
                  </div>
                </div>
              }
              <Table responsive hover className="border border-secondary border-bottom">
                <thead>
                  <tr>
                    <th className="w-10"></th>
                    <th className="text-center w-50">Nama Video</th>
                    <th className="text-center">
                      Jenis Video
                      <Button onClick={() => setHint(!hint)} className="text-nowrap" style={{ backgroundColor: "transparent", border: "transparent" }} id="TooltipExample">
                        <i className="fa fa-lg fa-question-circle text-primary" />
                      </Button>
                      <Tooltip placement="bottom" isOpen={tooltipOpen} target="TooltipExample" toggle={toggleTooltip}>
                        Jika tombol Video tidak muncul, kemungkinan video wawancara tersebut tidak terekam dengan baik atau
                        Pelamar tidak melakukan wawancara dengan benar.
                      </Tooltip>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={`${activeTitle === firstData?.title ?
                    `video-border` : ``
                    }`}
                  >
                    <td>
                      {firstData?.processed !== null ?
                        <i className="fa fa-check-circle-o text-success ml-1" />
                        :
                        <i className="fa fa-spinner text-info ml-1" />
                      }
                    </td>

                    <td>1. {firstData?.title}</td>
                    <td className="text-nowrap">
                      {firstData?.resultUrl === null ?
                        <p>User belum ada gesture untuk ditampilkan</p> :
                        <>
                          <Button className={`text-center text-nowrap button-video mr-2 ${activeVideo.resultUrl === firstData.videoUrl ? 'button-video-active' : ''}`}
                            onClick={() => changeVideo(firstData)}
                          >
                            Tanpa Anotasi
                          </Button>
                          <Button className={`text-center text-nowrap button-asesmen ml-2 ${activeVideo.resultUrl === firstData.resultUrl ? 'button-asesmen-active' : ''}`}
                            onClick={() => changeAnotation(firstData)}
                          >
                            {t('Dengan Anotasi')}
                          </Button>
                        </>
                      }
                    </td>
                  </tr>
                  {restData &&
                    restData.map((video, idx) => (
                      <tr key={idx + 1} className={`${activeTitle === video?.title ?
                        `video-border` : ``
                        }`}
                      >
                        <td>
                          {vid.purchased ?
                            video.resultUrl !== null ?
                              <>
                                <i className="fa fa-check-circle-o text-success ml-1" id="process" />
                              </>
                              :
                              <i className="fa fa-spinner text-info ml-1" />
                            :
                            <i className="fa fa-video-camera ml-1" />
                          }
                        </td>
                        <td>
                          {idx + 2}. {video?.title}
                        </td>
                        <td className="text-nowrap">
                          {video?.resultUrl === null ?
                            <p>Sistem sedang menganalisa video ini</p> :
                            <>
                              <Button className={`text-center text-nowrap button-video mr-2 ${activeVideo.resultUrl === video.videoUrl ? 'button-video-active' : ''}`}
                                onClick={() => changeVideo(video)}
                              >
                                Tanpa Anotasi
                              </Button>
                              <Button className={`text-center text-nowrap button-asesmen ml-2 ${activeVideo.resultUrl === video.resultUrl ? 'button-asesmen-active' : ''}`}
                                onClick={() => changeAnotation(video)}
                              >
                                {t('Dengan Anotasi')}
                              </Button>
                            </>
                          }
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
            </div>
          </div>

        </CardBody>
      </Card>
    </>
  );
};

const AssessmentDISC = ({ data, id, getAPI, dataToken, can }) => {
  const [modalAses, setModalAses] = useState(false);
  const [loadingBuy, setLoadingBuy] = useState(false)
  const [modalUnlock, setModalUnlock] = useState(false)
  const [modalNoToken, setModalNoToken] = useState(false);
  const [forbidden, setForbidden] = useState(false)
  const toggleNoToken = () => setModalNoToken(!modalNoToken);

  const toggleAses = () => setModalAses(!modalAses);
  const toggleUnlock = function () {
    if(can('canManagementToken')){
      setModalUnlock(!modalUnlock)
    }
    else {
      setForbidden(true)
    }
  }

  const buyDisc = function () {
    setLoadingBuy(true)
    let formDisc = new FormData();
    formDisc.append('identity', id)
    formDisc.append('tokenType', data?.tokenType)
    request.post('v1/token/usage', formDisc)
      .then(() => {
        mutate('v1/token');
        getAPI()
          .then(() => toast.success(t('Token berhasil digunakan untuk melihat hasil Tes Kepribadian')))
      })
      .catch((err) => {
        if (err?.response?.status === 403) {
          toast.error("Token yang anda miliki sudah habis, silahkan mengisi ulang Token Anda")
          return;
        }
        else {
          toast.error('Gagal Menggunakan Token atau Membuka Fitur, silahkan coba lagi')
          return;
        }
      })
      .finally(() => {
        setLoadingBuy(false)
        setModalUnlock(false)
      })
  }

  return (
    <>
      {forbidden && <ModalPrivilegeForbidden isOpen={true} forbidden="canManagementToken" isClose={() => setForbidden(false)} />}
      <NoToken nullData="assessment" isOpen={modalNoToken} toggle={toggleNoToken} />
      <Card>
        <CardBody>
          <Row className="md-company-header mt-2">
            <Col className="d-flex justify-content-between align-items-center">
              <h5 className="text-uppercase content-sub-title mb-0">
                <strong>Tes Kepribadian (DISC)</strong>
              </h5>
              {data.purchased ?
                <Button
                  className={data?.purchased ? "button-video" : "btn btn-netis-color"} onClick={data.purchased ? toggleAses : toggleUnlock} style={{ borderRadius: "8px" }}>
                  {data.purchased ? t("Lihat Detail") : <><i className="fa fa-lock mr-2" />{t("Buka Detail")}</>}
                </Button>
                : null
              }
            </Col>
            <Col sm="12" md="12" lg="12">
              <hr />
              <div className="mt-3">
                {!data.purchased ?
                  <div className="lock-disc text-center">
                    <i className="fa fa-lock lock-icon" aria-hidden="true" /><br />
                    <div>
                      <span style={{ fontSize: "12pt" }}><b>Mau melihat Grafik selanjutnya?</b></span><br />
                      <span>Caranya klik "Buka Detail" di bawah ini</span><br />
                      <FontAwesomeIcon icon="coins" className="mr-1" style={{ color: "#e0bc47" }} />
                      <b>{data?.tokenPrice ?? 1}</b><br />
                      <Button
                        className={`btn ${data?.purchased ? 'button-video' : 'btn-netis-color'} mb-2 mr-2`}
                        onClick={(!dataToken.balance || dataToken.isExpired) ? toggleNoToken : toggleUnlock} style={{ borderRadius: "8px" }}>
                        <i className="fa fa-lock mr-1" />
                        {t('Buka Detail')}
                      </Button>
                    </div>
                  </div>
                  : null
                }
                <DiscResultAdmin result={data} hideDescription={true} />
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Modal isOpen={modalAses} toggle={toggleAses} className="modal-lg">
        <ModalHeader toggle={toggleAses}>{t("detailasesmen")}</ModalHeader>
        <ModalBody>
          <DiscResultAdmin result={data} />
        </ModalBody>
      </Modal>

      <Modal isOpen={modalUnlock} style={{ marginTop: "40vh" }}>
        <ModalHeader toggle={toggleUnlock} className="border-bottom-0">
          {t('Tukar Token untuk melihat hasil Tes Kepribadian?')}
        </ModalHeader>
        <ModalBody className="text-center">
          <FontAwesomeIcon icon="coins" className="mr-1" style={{ color: "#e0bc47" }} />
          <span className="text-primary"><b>{data?.tokenPrice ?? 1}</b></span>
              &nbsp;token akan berkurang untuk bisa mengakses fitur ini. <br />
              Apakah anda ingin melanjutkannya?
              <br />
          <div className="text-center d-flex justify-content-between mx-auto mt-2" style={{ width: "50%" }}>
            <Button className="button-token" onClick={toggleUnlock} style={{ width: "100px" }}>
              Batal
                </Button>
            <Button color="netis-color" onClick={buyDisc} style={{ width: "100px", borderRadius: "10px" }} disabled={loadingBuy}>
              {loadingBuy ? <><Spinner color="light" size="sm" />&nbsp;&nbsp;Loading... </> : "Ya"}
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

const AssessmentBazi = ({ bazi, date, id, getAPI, dataToken, can }) => {
  const [showBaziDescription, setShowBaziDescription] = useState(false);
  const [loadingBuy, setLoadingBuy] = useState(false)
  const [modalUnlock, setModalUnlock] = useState(false)
  const [modalNoToken, setModalNoToken] = useState(false);
  const [forbidden, setForbidden] = useState(false)
  const toggleNoToken = () => setModalNoToken(!modalNoToken);
  const toggleUnlock = function () {
    if(can('canManagementToken')){
      setModalUnlock(!modalUnlock)
    }
    else {
      setForbidden(true)
    }
  }

  const buyBazi = function () {
    setLoadingBuy(true)
    let formBazi = new FormData();
    formBazi.append('identity', id)
    formBazi.append('tokenType', bazi?.tokenType)
    request.post('v1/token/usage', formBazi)
      .then(() => {
        mutate('v1/token');
        getAPI()
          .then(() => toast.success(t('Token berhasil digunakan untuk mengakses Bazi')))
      })
      .catch((err) => {
        if (err?.response?.status === 403) {
          toast.error("Token yang anda miliki sudah habis, silahkan mengisi ulang Token Anda")
          return;
        }
        else {
          toast.error('Gagal Menggunakan Token atau Membuka Fitur, silahkan coba lagi')
          return;
        }
      })
      .finally(() => {
        setLoadingBuy(false)
        setModalUnlock(false)
      })
  }

  return (
    <>
    {forbidden && <ModalPrivilegeForbidden isOpen={true} forbidden="canManagementToken" isClose={() => setForbidden(false)} />}
      <NoToken nullData="assessment" isOpen={modalNoToken} toggle={toggleNoToken} />
      <Card>
        <CardBody>
          <Row className="md-company-header mb-3 mt-2">
            <Col className="d-flex flex-column">
              <h5 className="text-uppercase content-sub-title mb-2">
                <strong>BAZI{bazi.purchased && " - " + bazi.title}</strong>
              </h5>
              <div className="mb-2">
                {t("harilahir")} : &nbsp;
                {moment(date).locale("ID").format("dddd")}
                {/* &nbsp;<i>({moment(date).format("DD MMMM YYYY")})</i> */}
              </div>
              <ReactMarkdown source={bazi.description} className="my-2" />
              <div className="d-flex">
                {!bazi?.purchased &&
                  <div style={{ marginTop: "4px" }} className="mr-2">
                    <FontAwesomeIcon icon="coins" className="mr-1" style={{ color: "#e0bc47" }} />
                    <b>{bazi?.tokenPrice}</b>
                  </div>
                }
                <Button
                  className={`btn ${bazi?.purchased ? 'button-video' : 'btn-netis-color'}`}
                  onClick={(!dataToken.balance || dataToken.isExpired) ? toggleNoToken : bazi.purchased ? () => setShowBaziDescription(true) : toggleUnlock}
                  style={{ borderRadius: "8px" }}
                >
                  {bazi.purchased ? t("Lihat Detail") :
                    <>
                      <i className="fa fa-lock" />&nbsp;&nbsp;{t("Buka Detail")}
                    </>
                  }
                </Button>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Modal isOpen={modalUnlock} style={{ marginTop: "40vh" }}>
        <ModalHeader toggle={toggleUnlock} className="border-bottom-0">
          {t('Tukar Token untuk melihat hasil Bazi?')}
        </ModalHeader>
        <ModalBody className="text-center">
          <FontAwesomeIcon icon="coins" className="mr-1" style={{ color: "#e0bc47" }} />
          <span className="text-primary"><b>{bazi?.tokenPrice ?? 1}</b></span>
              &nbsp;token akan berkurang untuk bisa mengakses fitur ini. <br />
              Apakah anda ingin melanjutkannya?
              <br />
          <div className="text-center d-flex justify-content-between mx-auto mt-2" style={{ width: "50%" }}>
            <Button className="button-token" onClick={toggleUnlock} style={{ width: "100px" }}>
              Batal
                </Button>
            <Button color="netis-color" onClick={buyBazi} style={{ width: "100px", borderRadius: "10px" }} disabled={loadingBuy}>
              {loadingBuy ? <><Spinner color="light" size="sm" />&nbsp;&nbsp;Loading... </> : "Ya"}
            </Button>
          </div>
        </ModalBody>
      </Modal>
      <Modal
        isOpen={showBaziDescription}
        toggle={() => setShowBaziDescription(false)}
        size="xl"
      >
        <ModalHeader toggle={() => setShowBaziDescription(false)}>
          {bazi.title}
        </ModalHeader>
        <ModalBody>
          <div>
            {/* <h3>Deskripsi</h3>
            <ReactMarkdown source={bazi.description} />
            <hr /> */}
            <h3>Karakter Ketika Bekerja</h3>
            <ReactMarkdown source={bazi.working_character} />
            <hr />
            <h3>Saran Pekerjaan</h3>
            <ReactMarkdown source={bazi.job_sugestion} />
            <hr />
            <div className="row">
              <div className="col-6">
                <h5>{t("Sifat Positif")}</h5>
                <ReactMarkdown source={bazi.positive_traits} />
              </div>
              <div className="col-6">
                <h5>{t("Sifat Negatif")}</h5>
                <ReactMarkdown source={bazi.negative_traits} />
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

const AssessmentZodiac = ({ zodiac, date, id, getAPI, dataToken, can }) => {
  const [showZodiacDescription, setShowZodiacDescription] = useState(false);
  const [loadingBuy, setLoadingBuy] = useState(false)
  const [modalUnlock, setModalUnlock] = useState(false)
  const [key, setKey] = useState(null);
  const [modalNoToken, setModalNoToken] = useState(false);
  const [forbidden, setForbidden] = useState(false)
  const toggleNoToken = () => setModalNoToken(!modalNoToken);
  const toggleUnlock = function () {
    if(can('canManagementToken')){
      setModalUnlock(!modalUnlock)
    }
    else {
      setForbidden(true)
    }
  }

  useEffect(() => {
    if (zodiac.purchased) {
      const zodiacKey = zodiac?.key.split(", ");
      if (zodiacKey.length >= 8) {
        const chunkLength = Math.max(zodiacKey.length / 2, 1);
        let chunks = [];
        for (var i = 0; i < 2; i++) {
          if (chunkLength * (i + 1) <= zodiacKey.length)
            chunks.push(zodiacKey.slice(chunkLength * i, chunkLength * (i + 1)));
        }
        setKey(chunks);
      }
      else if (zodiacKey.length < 8) {
        setKey(zodiacKey);
      }
    }
    // eslint-disable-next-line
  }, [zodiac])

  const buyZodiac = function () {
    setLoadingBuy(true)
    let formZodiac = new FormData();
    formZodiac.append('identity', id)
    formZodiac.append('tokenType', zodiac?.tokenType)
    request.post('v1/token/usage', formZodiac)
      .then(() => {
        mutate('v1/token');
        getAPI()
          .then(() => toast.success(t('Token berhasil digunakan untuk melihat Zodiac')))
      })
      .catch((err) => {
        if (err?.response?.status === 403) {
          toast.error("Token yang anda miliki sudah habis, silahkan mengisi ulang Token Anda")
          return;
        }
        else {
          toast.error('Gagal Menggunakan Token atau Membuka Fitur, silahkan coba lagi')
          return;
        }
      })
      .finally(() => {
        setLoadingBuy(false)
        setModalUnlock(false)
      })
  }

  return (
    <>
    {forbidden && <ModalPrivilegeForbidden isOpen={true} forbidden="canManagementToken" isClose={() => setForbidden(false)} />}
      <NoToken nullData="assessment" isOpen={modalNoToken} toggle={toggleNoToken} />
      <Card>
        <CardBody>
          <Row className="md-company-header mb-3 mt-2">
            <Col className="d-flex flex-column">
              <h5 className="text-uppercase content-sub-title mb-2">
                <strong>ZODIAC - {zodiac.title}</strong>
              </h5>
              <div className="mb-2">
                {t("tanggallahir")} : &nbsp;
                {moment(date).format("DD MMMM YYYY")}
              </div>
              <ReactMarkdown source={zodiac.description} className="my-2" />
              <div className="d-flex">
                {!zodiac?.purchased &&
                  <div style={{ marginTop: "4px" }} className="mr-2">
                    <FontAwesomeIcon icon="coins" className="mr-1" style={{ color: "#e0bc47" }} /><b>{zodiac.tokenPrice}</b>
                  </div>
                }
                <Button
                  className={`btn ${zodiac?.purchased ? 'button-video' : 'btn-netis-color'}`}
                  onClick={(!dataToken.balance || dataToken.isExpired) ? toggleNoToken : zodiac.purchased ? () => setShowZodiacDescription(true) : toggleUnlock}
                  style={{ borderRadius: "8px" }}
                >
                  {zodiac.purchased ?
                    t('Lihat Detail')
                    :
                    <>
                      {/* <FontAwesomeIcon icon="coins" className="mr-1" style={{ color: "#e4d51d" }} /> */}
                      <i className="fa fa-lock mr-1" />
                      Buka Detail
                    </>
                  }
                </Button>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Modal isOpen={modalUnlock} style={{ marginTop: "40vh" }}>
        <ModalHeader toggle={toggleUnlock} className="border-bottom-0">
          {t('Tukar Token untuk melihat detail Zodiac?')}
        </ModalHeader>
        <ModalBody className="text-center">
          <FontAwesomeIcon icon="coins" className="mr-1" style={{ color: "#e0bc47" }} />
          <span className="text-primary">
            <b>{zodiac.tokenPrice ?? 1}</b>
          </span>&nbsp;
              token akan berkurang untuk bisa mengakses fitur ini. <br />
              Apakah anda ingin melanjutkannya?
              <br />
          <div className="text-center d-flex justify-content-between mx-auto mt-2" style={{ width: "50%" }}>
            <Button className="button-token" onClick={toggleUnlock} style={{ width: "100px" }}>
              Batal
                </Button>
            <Button color="netis-color" onClick={buyZodiac} style={{ width: "100px", borderRadius: "10px" }} disabled={loadingBuy}>
              {loadingBuy ? <><Spinner color="light" size="sm" />&nbsp;&nbsp;Loading... </> : "Ya"}
            </Button>
          </div>
        </ModalBody>
      </Modal>
      <Modal
        isOpen={showZodiacDescription}
        toggle={() => setShowZodiacDescription(false)}
        size="xl"
      >
        <ModalHeader toggle={() => setShowZodiacDescription(false)}>
          {zodiac.title}
        </ModalHeader>
        <ModalBody>
          <div>
            <h3>Ciri Khas</h3>
            {key && zodiac?.key.split(", ").length >= 8 ?
              <Row>
                <Col>
                  <ul>
                    {key && key[0]?.map((keyFirst, idx) => {
                      return (
                        <li key={idx} className="text-capitalize">{keyFirst}</li>
                      )
                    })}
                  </ul>
                </Col>
                <Col>
                  <ul>
                    {key && key[1]?.map((keySecond, idx) => {
                      return (
                        <li key={idx} className="text-capitalize">{keySecond}</li>
                      )
                    })}
                  </ul>
                </Col>
              </Row>
              :
              <ul>
                {key && key?.map((item, idx) => {
                  return (
                    <li key={idx} className="text-capitalize">{item}</li>
                  )
                })}
              </ul>
            }
            <hr />
            <h3 className="text-capitalize">Sugesti Diri</h3>
            <ReactMarkdown source={zodiac?.sugestion} />
            <hr />
            <h3>Partner</h3>
            <ul>
              {zodiac.purchased && zodiac?.partner.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <hr />
            <div className="row">
              <div className="col-6">
                <h5>{t("Sifat Positif")}</h5>
                <ReactMarkdown source={zodiac.positive_traits} />
              </div>
              <div className="col-6">
                <h5>{t("Sifat Negatif")}</h5>
                <ReactMarkdown source={zodiac.negative_traits} />
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

const AssessmentPalmistry = ({ data: palmistry, id, getAPI, dataToken, can }) => {
  const data = palmistry?.answers?.data;
  const [modalPalmistry, setModalPalmistry] = useState(false);
  const [modalUnlock, setModalUnlock] = useState(false);
  const [loadingBuy, setLoadingBuy] = useState(false);
  const [modalNoToken, setModalNoToken] = useState(false);
  const [forbidden, setForbidden] = useState(false)
  const toggleNoToken = () => setModalNoToken(!modalNoToken);
  const togglePalmistry = () => setModalPalmistry(!modalPalmistry);
  const toggleUnlock = () => {
    if(can('caManagementToken')){
      setModalUnlock(!modalUnlock)
    }
    else {
      setForbidden(true)
    }
  };

  const karakterList = useMemo(() => {
    const arrKarakter = Object.values(data.result);
    return shuffleArray(arrKarakter);
  }, [data.result]);

  const buyPalmistry = function () {
    setLoadingBuy(true)
    let formPalmistry = new FormData();
    formPalmistry.append('identity', id)
    formPalmistry.append('tokenType', palmistry?.tokenType)
    request.post('v1/token/usage', formPalmistry)
      .then((response) => {
        if (response?.status === 200) {
          mutate('v1/token');
          getAPI()
            // toast.success('Token berhasil digunakan untuk mengakses Fisiognomi')
            .then(() => toast.success('Token berhasil digunakan untuk melihat hasil Palmistry'))
        }
      })
      .catch((err) => {
        if (err?.response?.status === 403) {
          toast.error("Token yang anda miliki sudah habis, silahkan mengisi ulang Token Anda")
          return;
        }
        else {
          toast.error('Gagal Menggunakan Token atau Membuka Fitur, silahkan coba lagi')
          return;
        }
      })
      .finally(() => {
        setLoadingBuy(false)
        setModalUnlock(false)
      })
  }

  return (
    <>
      {forbidden && <ModalPrivilegeForbidden isOpen={true} forbidden="canManagementToken" isClose={() => setForbidden(false)} />}
      <NoToken nullData="assessment" isOpen={modalNoToken} toggle={toggleNoToken} />
      <Card>
        <CardBody>
          <Row className="md-company-header mb-3 mt-2">
            <Col>
              <h5 className="text-uppercase content-sub-title mb-0">
                <strong>{t("Hasil Palmistry")}</strong>
              </h5>
            </Col>
          </Row>
          <Row>
            <Col md="6" lg="6" className="mb-2">
              <img
                src={data?.processed ?? data?.raw}
                width="100%"
                alt="palmistry"
              />
            </Col>
            <Col md="6" lg="6">
              {Object.values(data.result).length > 0 ? (
                <>
                  <div className="mb-3">
                    {t("Tipe Data Palmistry")} : <br />
                    <br />
                    {Object.keys(data?.result ?? {}).map((data, idx) => (
                      <ul key={idx}>
                        <li>{data}</li>
                      </ul>
                    ))}
                  </div>
                  <div className="d-flex flex-row-reverse">
                    <Button
                      className={`btn ${palmistry?.purchased ? 'button-video' : 'btn-netis-color'}`}
                      onClick={(!dataToken.balance || dataToken.isExpired) ? toggleNoToken : palmistry?.purchased ? togglePalmistry : toggleUnlock}
                      style={{ borderRadius: "8px" }}
                    >
                      {palmistry?.purchased ?
                        t("Lihat Detail")
                        :
                        <><i className="fa fa-lock mr-1" /> {t("Buka Detail")}</>
                      }
                    </Button>
                    {!palmistry?.purchased &&
                      <div style={{ marginTop: "4px" }} className="mr-2">
                        <FontAwesomeIcon icon="coins" className="mr-1" style={{ color: "#e0bc47" }} /><b>{palmistry.tokenPrice}</b>
                      </div>
                    }
                  </div>
                </>
              ) : (
                <div className="alert alert-dark">
                  {t("Belum ada hasil Palmistry yang tersedia")}
                </div>
              )}
            </Col>
          </Row>
        </CardBody>

        <Modal isOpen={modalUnlock} style={{ marginTop: "40vh" }}>
          <ModalHeader toggle={toggleUnlock} className="border-bottom-0">
            {t('Tukar Token untuk melihat hasil Palmistry?')}
          </ModalHeader>
          <ModalBody className="text-center">
            <FontAwesomeIcon icon="coins" className="mr-1" style={{ color: "#e0bc47" }} />
            <span className="text-primary"><b>{palmistry.tokenPrice ?? 1}</b></span>&nbsp;
              token akan berkurang untuk bisa mengakses fitur ini. <br />
              Apakah anda ingin melanjutkannya?
              <br />
            <div className="text-center d-flex justify-content-between mx-auto mt-2" style={{ width: "50%" }}>
              <Button className="button-token" onClick={toggleUnlock} style={{ width: "100px" }}>
                Batal
                </Button>
              <Button color="netis-color" onClick={buyPalmistry} style={{ width: "100px", borderRadius: "10px" }} disabled={loadingBuy}>
                {loadingBuy ? <><Spinner color="light" size="sm" />&nbsp;&nbsp;Loading... </> : "Ya"}
              </Button>
            </div>
          </ModalBody>
        </Modal>

        <Modal isOpen={modalPalmistry} toggle={togglePalmistry} className="modal-lg">
          <ModalHeader toggle={togglePalmistry}>{t("Detail Palmistry")}</ModalHeader>
          <ModalBody>
            {t("Bentuk Wajah")} : <br />
            <br />
            {Object.keys(data?.result ?? {}).map((data, idx) => (
              <ul key={idx}>
                <li>{data}</li>
              </ul>
            ))}
            {t("Karakteristik")} : <br />
            <br />
            {karakterList.map((ciriDetail, idx) => (
              <ul key={idx}>
                <li>{ciriDetail}</li>
              </ul>
            ))}
          </ModalBody>
        </Modal>
      </Card>
    </>
  );
};

function ProgressGroup({ typeA, typeB, valueA, valueB }) {
  return (
    <Row className="progress-group">
      <Col xs="6" sm="6">
        <span
          className={
            "progress-group-text" +
            (valueA >= valueB ? " font-weight-bold" : "")
          }
        >
          {typeA}
        </span>
      </Col>
      <Col xs="6" sm="6" className="text-right">
        <span
          className={
            "progress-group-text" +
            (valueA <= valueB ? " font-weight-bold" : "")
          }
        >
          {typeB}
        </span>
      </Col>
      <Col col="12" className="progress-group-bars">
        <Progress multi>
          <Progress bar color="netis-color" value={valueA}>
            {valueA} %
          </Progress>
          <Progress bar color="success" value={valueB}>
            {valueB} %
          </Progress>
        </Progress>
      </Col>
    </Row>
  );
}

export default translate(ApplicantDetail);