import React, { useState, useEffect } from "react";
import request from "../../../utils/request";
import { Button, Modal, ModalBody, Spinner, Card, CardBody, Row, Col, ModalHeader, Progress } from "reactstrap";
import { Link } from "react-router-dom";
import * as moment from 'moment';
import LoadingAnimation from "../../../components/LoadingAnimation";
import { toast } from 'react-toastify';
import { t } from 'react-switch-lang';
import { useUserPrivileges } from "../../../store";
import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import DiscResultAdmin from "../Assesment/disc/DiscResultAdmin";
import PapikostickResult from "../Assesment/papikostick/PapikostickResult";
import PersonnelFisiognomi from "../Personnel/PersonnelFisiognomi"
toast.configure();

function PersonnelAssessmentResult({ personnel }) {
    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState([]);
    const { can } = useUserPrivileges();
    const isAdminPanel = useSelector(state => state.isAdminPanel);

    useEffect(() => {
        const url = `v1/personnels/${personnel.id}/assessments`;
        request.get(url).then(res => {
            setResults(res.data.data);
        }).finally(() => {
            setLoading(false);
        });
    }, [personnel.id]);

    if (loading) {
        return <LoadingAnimation />
    }

    const handleDeleted = (deletedId) => {
        setResults(results.filter(r => r.id !== deletedId))
    }

    const mbti = results.find((ass) => ass.testName === 'mbti')
    const papikostick = results.find((ass) => ass.testName === 'papikostick')
    const disc = results.find((ass) => ass.testName === 'disc')
    const fisiognomi = results.find((ass) => ass.testName === 'fisiognomi')

    return (<div>
        <AssessmentMbti resultId={mbti?.id} isAdminPanel={isAdminPanel} can={can} onDeleted={handleDeleted} />
        <AssessmentPapikostick resultId={papikostick?.id} isAdminPanel={isAdminPanel} can={can} onDeleted={handleDeleted} />
        <AssesmentDisc resultId={disc?.id} isAdminPanel={isAdminPanel} can={can} onDeleted={handleDeleted} />
        <Fisiognomi resultId={fisiognomi?.id} isAdminPanel={isAdminPanel} can={can} onDeleted={handleDeleted} />
    </div>)
}

const AssessmentMbti = ({ resultId, isAdminPanel, can, onDeleted }) => {
    const [modalAses, setModalAses] = useState(false);
    const toggleAses = () => setModalAses(!modalAses);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);
    let deleteButton = false;

    if (isAdminPanel) {
        deleteButton = can('delete-assessment-result')
    }

    useEffect(() => {
        if (resultId) {
            setLoading(true)
            request.get('v1/assessment/results/' + resultId)
                .then(res => {
                    setResult(res.data.data);
                })
                .finally(() => setLoading(false))
        }
    }, [resultId])

    if (loading) {
        return <LoadingAnimation />
    }

    function doDelete() {
        if (!can('delete-assessment-result')) {
            toast.error('Maaf anda tidah boleh melakukan aksi ini.')
            return
        }
        if (deleteLoading) return;
        setDeleteLoading(true);
        request.delete('v1/assessment/results/' + deletingId)
            .then(() => {
                setDeletingId(null);
                onDeleted(deletingId)
                toast.success('Berhasil dihapus.');
            })
            .catch(err => {
                toast.error('Terjadi kesalahan');
                throw err;
            })
            .finally(() => {
                setDeleteLoading(false);
            });
    }

    if (!result) {
        return <>
            <Card>
                <CardBody>
                    <Row className="md-company-header mb-3 mt-2">
                        <Col className="d-flex flex-column justify-content-center align-items-center">
                            <h5 className="content-sub-title mb-0">{t('Test MBTI')}</h5>
                            {isAdminPanel ?
                                <>
                                    <small>Karyawan belum melakukan assesmen ini</small>
                                </>
                                :
                                <>
                                    <small>Anda belum melakukan asesmen ini</small>
                                    <br />
                                    <Link to="/assessment/mbti-tes" className="btn btn-netis-primary btn-md">Lakukan Asesmen</Link>
                                </>
                            }
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </>
    }
    return (
        <>
            <Card>
                <CardBody>
                    <Row className="md-company-header mb-3 mt-2">
                        <Col sm="6" md="6" lg="6">
                            <h5 className="text-uppercase content-sub-title mb-0">
                                {result.testName} - {result.result.type}
                            </h5>
                        </Col>
                        <Col sm="6" md="6" lg="6" className="text-right">
                            <Button className="btn btn-netis-color" onClick={toggleAses}>
                                {t("lihatdetail")}
                            </Button>
                            {deleteButton &&
                                <Button color="netis-danger ml-2" onClick={() => setDeletingId(result.id)}>{t("hapus")}</Button>
                            }
                        </Col>

                        <div className="col-12 d-flex mb-3 text-muted">
                            <i>{moment(result.created_at).format("DD MMMM YYYY")}</i>
                        </div>
                    </Row>

                    <div className="p-3 rounded border">
                        <ProgressGroup
                            typeA={"Introvert"}
                            valueA={result.scores.introvert}
                            typeB={"Extrovert"}
                            valueB={result.scores.extrovert}
                        />
                        <ProgressGroup
                            typeA={"Sensing"}
                            valueA={result.scores.sensing}
                            typeB={"Intuition"}
                            valueB={result.scores.intuition}
                        />
                        <ProgressGroup
                            typeA={"Feeling"}
                            valueA={result.scores.feeling}
                            typeB={"Thinking"}
                            valueB={result.scores.thinking}
                        />
                        <ProgressGroup
                            typeA={"Judging"}
                            valueA={result.scores.judging}
                            typeB={"Perceiving"}
                            valueB={result.scores.perceiving}
                        />
                    </div>
                </CardBody>
            </Card>

            <Modal isOpen={modalAses} toggle={toggleAses} className="modal-lg">
                <ModalHeader toggle={toggleAses}>{t("detailasesmen")}</ModalHeader>
                <ModalBody>
                    <div className="mb-8">
                        <h3>{t("karakteristik")}</h3>
                        <ReactMarkdown source={result.result.characterisctics} />
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
                                    <ReactMarkdown source={result.result.dominan.name} />
                                </i>
                                <ReactMarkdown source={result.result.dominan.desc} />
                            </div>
                        </div>

                        <div className="col-sm-6">
                            <div className="border rounded p-3 h-100">
                                <h5>{t("fungsisekunder")}</h5>
                                <i>
                                    <ReactMarkdown source={result.result.sekunder.name} />
                                </i>
                                <ReactMarkdown source={result.result.sekunder.desc} />
                            </div>
                        </div>
                        <div className="col-sm-12 mt-3">
                            <h3>{t("partneralami")}</h3>
                            <span className="text-uppercase h5">
                                &nbsp;&nbsp;&nbsp;&nbsp;<i>{result.result.partner1}</i> &{" "}
                                <i>{result.result.partner2}</i>
                            </span>
                        </div>
                        <div className="col-sm-12 mt-3">
                            <h3>{t("saranpengembangan")}</h3>
                            <ReactMarkdown source={result.result.suggestion} />
                        </div>
                    </div>
                </ModalBody>
            </Modal>

            <Modal isOpen={!!deletingId} toggle={() => {
                if (!deleteLoading) {
                    setDeletingId(null)
                }
            }}>
                <ModalBody>
                    <h6>{t('yakinmenghapus')}</h6>
                    <div className="d-flex justify-content-end">
                        {!deleteLoading && <Button className="mr-2" color="light" onClick={() => setDeletingId(null)}>{t('batal')}</Button>}
                        <Button color="netis-primary" onClick={() => doDelete()} disabled={deleteLoading}>
                            {deleteLoading ? <React.Fragment><Spinner size="sm" color="light" /> menghapus...</React.Fragment> : t('hapus')}
                        </Button>
                    </div>
                </ModalBody>
            </Modal>
        </>
    );
};

const AssessmentPapikostick = ({ resultId, isAdminPanel, can, onDeleted }) => {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    let deleteButton = false;

    if (isAdminPanel) {
        deleteButton = can('delete-assessment-result')
    }

    useEffect(() => {
        if (resultId) {
            setLoading(true)
            request.get('v1/assessment/results/' + resultId)
                .then(res => {
                    setResult(res.data.data);
                })
                .finally(() => setLoading(false))
        }
    }, [resultId])

    if (loading) {
        return <LoadingAnimation />
    }

    function doDelete() {
        if (!can('delete-assessment-result')) {
            toast.error('Maaf anda tidah boleh melakukan aksi ini.')
            return
        }
        if (deleteLoading) return;
        setDeleteLoading(true);
        request.delete('v1/assessment/results/' + deletingId)
            .then(() => {
                setDeletingId(null);
                onDeleted(deletingId)
                toast.success('Berhasil dihapus.');
            })
            .catch(err => {
                toast.error('Terjadi kesalahan');
                throw err;
            })
            .finally(() => {
                setDeleteLoading(false);
            });
    }

    if (!result) {
        return (
            <>
                <Card>
                    <CardBody>
                        <Row className="md-company-header mb-3 mt-2">
                            <Col className="d-flex flex-column justify-content-center align-items-center">
                                <h5 className="content-sub-title mb-0">{t('TesPapikostick')}</h5>
                                {isAdminPanel ?
                                    <>
                                        <small>Karyawan belum melakukan assesmen ini</small>
                                    </>
                                    :
                                    <>
                                        <small>Anda belum melakukan asesmen ini</small>
                                        <br />
                                        <Link to="/assessment/papikostick-tes" className="btn btn-netis-primary btn-md">Lakukan Asesmen</Link>
                                    </>
                                }
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </>
        )
    }

    return (
        <>
            <Card>
                <CardBody>
                    <Row className="md-company-header mb-3 mt-2">
                        <Col sm="6" md="6" lg="6">
                            <h5 className="text-uppercase content-sub-title mb-0">
                                Papikostick
                            </h5>
                        </Col>
                        <Col sm="6" md="6" lg="6" className="text-right">
                            {deleteButton &&
                                <Button color="netis-danger ml-2" onClick={() => setDeletingId(result.id)}>{t("hapus")}</Button>
                            }
                        </Col>

                        <div className="col-12 d-flex mb-3 text-muted">
                            <i>{moment(result.created_at).format("DD MMMM YYYY")}</i>
                        </div>
                    </Row>

                    <div className="p-3 rounded border">
                        <PapikostickResult result={result} isAdmin={true} collapse={true} />
                    </div>
                </CardBody>
            </Card>
            <Modal isOpen={!!deletingId} toggle={() => {
                if (!deleteLoading) {
                    setDeletingId(null)
                }
            }}>
                <ModalBody>
                    <h6>{t('yakinmenghapus')}</h6>
                    <div className="d-flex justify-content-end">
                        {!deleteLoading && <Button className="mr-2" color="light" onClick={() => setDeletingId(null)}>{t('batal')}</Button>}
                        <Button color="netis-primary" onClick={() => doDelete()} disabled={deleteLoading}>
                            {deleteLoading ? <React.Fragment><Spinner size="sm" color="light" /> menghapus...</React.Fragment> : t('hapus')}
                        </Button>
                    </div>
                </ModalBody>
            </Modal>
        </>
    );
};

const AssesmentDisc = ({ resultId, isAdminPanel, can, onDeleted }) => {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);
    let deleteButton = false;

    if (isAdminPanel) {
        deleteButton = can('delete-assessment-result')
    }

    useEffect(() => {
        if (resultId) {
            setLoading(true)
            request.get('v1/assessment/results/' + resultId)
                .then(res => {
                    setResult(res.data.data);
                })
                .finally(() => setLoading(false))
        }
    }, [resultId])

    if (loading) {
        return <LoadingAnimation />
    }

    function doDelete() {
        if (!can('delete-assessment-result')) {
            toast.error('Maaf anda tidah boleh melakukan aksi ini.')
            return
        }
        if (deleteLoading) return;
        setDeleteLoading(true);
        request.delete('v1/assessment/results/' + deletingId)
            .then(() => {
                setDeletingId(null);
                onDeleted(deletingId)
                toast.success('Berhasil dihapus.');
            })
            .catch(err => {
                toast.error('Terjadi kesalahan');
                throw err;
            })
            .finally(() => {
                setDeleteLoading(false);
            });
    }

    if (!result) {
        return <>
            <Card>
                <CardBody>
                    <Row className="md-company-header mb-3 mt-2">
                        <Col className="d-flex flex-column justify-content-center align-items-center">
                            <h5 className="content-sub-title mb-0">{t('AssesmentDisc')}</h5>
                            {isAdminPanel ?
                                <>
                                    <small>Karyawan belum melakukan assesmen ini</small>
                                </>
                                :
                                <>
                                    <small>Anda belum melakukan asesmen ini</small>
                                    <br />
                                    <Link to="/assessment/disc-tes" className="btn btn-netis-primary btn-md">Lakukan Asesmen</Link>
                                </>
                            }
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </>
    }
    return (
        <>
            <Card>
                <CardBody>
                    <Row className="md-company-header mb-3 mt-2">
                        <Col sm="6" md="6" lg="6">
                            <h5 className="text-uppercase content-sub-title mb-0">
                                {result.testName}
                            </h5>
                        </Col>
                        <Col sm="6" md="6" lg="6" className="text-right">
                            {deleteButton &&
                                <Button color="netis-danger ml-2" onClick={() => setDeletingId(result.id)}>{t("hapus")}</Button>
                            }
                        </Col>

                        <div className="col-12 d-flex mb-3 text-muted">
                            <i>{moment(result.created_at).format("DD MMMM YYYY")}</i>
                        </div>
                    </Row>

                    <div className="p-3 rounded border">
                        <DiscResultAdmin result={result} isAdmin={true} />
                    </div>
                </CardBody>
            </Card>
            <Modal isOpen={!!deletingId} toggle={() => {
                if (!deleteLoading) {
                    setDeletingId(null)
                }
            }}>
                <ModalBody>
                    <h6>{t('yakinmenghapus')}</h6>
                    <div className="d-flex justify-content-end">
                        {!deleteLoading && <Button className="mr-2" color="light" onClick={() => setDeletingId(null)}>{t('batal')}</Button>}
                        <Button color="netis-primary" onClick={() => doDelete()} disabled={deleteLoading}>
                            {deleteLoading ? <React.Fragment><Spinner size="sm" color="light" /> menghapus...</React.Fragment> : t('hapus')}
                        </Button>
                    </div>
                </ModalBody>
            </Modal>
        </>
    );
};

const Fisiognomi = ({ resultId, isAdminPanel, can, onDeleted }) => {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);
    let deleteButton = false;

    if (isAdminPanel) {
        deleteButton = can('delete-assessment-result')
    }

    useEffect(() => {
        if (resultId) {
            setLoading(true)
            request.get('v1/assessment/results/' + resultId)
                .then(res => {
                    setResult(res.data.data);
                })
                .finally(() => setLoading(false))
        }
    }, [resultId])

    if (loading) {
        return <LoadingAnimation />
    }

    function doDelete() {
        if (!can('delete-assessment-result')) {
            toast.error('Maaf anda tidah boleh melakukan aksi ini.')
            return
        }
        if (deleteLoading) return;
        setDeleteLoading(true);
        request.delete('v1/assessment/results/' + deletingId)
            .then(() => {
                setDeletingId(null);
                onDeleted(deletingId)
                toast.success('Berhasil dihapus.');
            })
            .catch(err => {
                toast.error('Terjadi kesalahan');
                throw err;
            })
            .finally(() => {
                setDeleteLoading(false);
            });
    }

    if (!result) {
        return <>
            <Card>
                <CardBody>
                    <Row className="md-company-header mb-3 mt-2">
                        <Col className="d-flex flex-column justify-content-center align-items-center">
                            <h5 className="content-sub-title mb-0">Fisiognomi</h5>
                            {isAdminPanel ?
                                <>
                                    <small>Karyawan belum memiliki hasil Fisiognomi</small>
                                </>
                                :
                                <>
                                    <small>Anda belum memiliki hasil Fisiognomi</small>
                                    <br />
                                    {/* <Link to="/assessment/disc-tes" className="btn btn-netis-primary btn-md">Lakukan Asesmen</Link> */}
                                </>
                            }
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </>
    }
    return (
        <>
            <Card>
                <CardBody>
                    <Row className="md-company-header mb-3 mt-2">
                        <Col sm="6" md="6" lg="6">
                            <h5 className="text-uppercase content-sub-title mb-0">
                                {result.testName}
                            </h5>
                        </Col>
                        <Col sm="6" md="6" lg="6" className="text-right">
                            {deleteButton &&
                                <Button color="netis-danger ml-2" onClick={() => setDeletingId(result.id)}>{t("hapus")}</Button>
                            }
                        </Col>

                        <div className="col-12 d-flex mb-3 text-muted">
                            <i>{moment(result.created_at).format("DD MMMM YYYY")}</i>
                        </div>
                        <div className="p-3">
                            <PersonnelFisiognomi result={result} isAdmin={true} className="p-2" />
                        </div>
                    </Row>

                </CardBody>
            </Card>
            <Modal isOpen={!!deletingId} toggle={() => {
                if (!deleteLoading) {
                    setDeletingId(null)
                }
            }}>
                <ModalBody>
                    <h6>{t('yakinmenghapus')}</h6>
                    <div className="d-flex justify-content-end">
                        {!deleteLoading && <Button className="mr-2" color="light" onClick={() => setDeletingId(null)}>{t('batal')}</Button>}
                        <Button color="netis-primary" onClick={() => doDelete()} disabled={deleteLoading}>
                            {deleteLoading ? <React.Fragment><Spinner size="sm" color="light" /> menghapus...</React.Fragment> : t('hapus')}
                        </Button>
                    </div>
                </ModalBody>
            </Modal>
        </>
    );
};

function ProgressGroup({ typeA, typeB, valueA, valueB }) {
    return (
        <div className="progress-group">
            <div className="progress-group-prepend">
                <span
                    className={
                        "progress-group-text" +
                        (valueA >= valueB ? " font-weight-bold" : "")
                    }
                >
                    {typeA}
                </span>
            </div>

            <div className="progress-group-bars">
                <Progress multi>
                    <Progress bar color="netis-color" value={valueA}>
                        {valueA} %
            </Progress>
                    <Progress bar color="success" value={valueB}>
                        {valueB} %
            </Progress>
                </Progress>
            </div>

            <div className="progress-group-prepend ml-3 text-right">
                <span
                    className={
                        "progress-group-text" +
                        (valueA <= valueB ? " font-weight-bold" : "")
                    }
                >
                    {typeB}
                </span>
            </div>
        </div>
    );
}

export default PersonnelAssessmentResult;
