import React, { useState } from "react";
import {
    Button,
    Card,
    Spinner,
    CardBody,
    Row,
    Col,
    Modal,
    ModalBody,
    ModalHeader,
    ListGroup,
    ListGroupItem,
    ListGroupItemHeading,
    ListGroupItemText,
    Collapse
} from "reactstrap";
import request from "../../../../../utils/request";
import { toast } from "react-toastify";
import { t, translate } from "react-switch-lang";
import moment from "moment";
import ReactMarkdown from "react-markdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NoToken from "./NoToken";
import ModalPrivilegeForbidden from "../../../../../components/ModalPrivilegeForbidden";

function AssessmentShio({ shio, date, id, getAPI, dataToken, can }) {
    const [modalNoToken, setModalNoToken] = useState(false);
    const toggleNoToken = () => setModalNoToken(!modalNoToken);
    const [showShioDescription, setShowShioDescription] = useState(false);
    const [loadingBuy, setLoadingBuy] = useState(false)
    const [modalUnlock, setModalUnlock] = useState(false)
    const [collapse, setCollapse] = useState(null);
    const [forbidden, setForbidden] = useState(false)
    const toggleResult = (value) => {
        setCollapse(collapse === Number(value) ? null : Number(value));
    };

    const toggleUnlock = function () {
        if(can('canManagementToken')){
            setModalUnlock(!modalUnlock)
        }
        else {
            setForbidden(true)
        }
    }

    const combinationShio = Object.keys(shio.combination);
    const combinationDesc = Object.values(shio.combination);

    const buyShio = function () {
        setLoadingBuy(true)
        let formShio = new FormData();
        formShio.append('identity', id)
        formShio.append('tokenType', shio?.tokenType)
        request.post('v1/token/usage', formShio)
            .then(() => {
                // mutate('v1/token');
                getAPI()
                    .then(() => toast.success(t('Token berhasil digunakan untuk melihat Shio')))
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
                                <strong>SHIO - {shio.earth} {shio.title}</strong>
                            </h5>
                            <div className="mb-2">
                                {t("Bulan dan Tahun Lahir")} : &nbsp;
                                {moment(date).format("MMMM YYYY")}
                            </div>
                            <ReactMarkdown source={shio.description} className="my-2" />
                            <div className="d-flex">
                                {!shio?.purchased &&
                                    <div style={{ marginTop: "4px" }} className="mr-2 d-inline">
                                        <FontAwesomeIcon icon="coins" className="mr-1" style={{ color: "#e0bc47" }} /><b>{shio.tokenPrice}</b>
                                    </div>
                                }
                                <Button
                                    className={`btn ${shio?.purchased ? 'button-video' : 'btn-netis-color'}`}
                                    onClick={(!dataToken.balance || dataToken.isExpired) ? toggleNoToken : shio.purchased ? () => setShowShioDescription(true) : toggleUnlock}
                                    style={{ borderRadius: "8px" }}
                                >
                                    {shio.purchased ?
                                        t('Lihat Detail')
                                        :
                                        <><i className="fa fa-lock mr-1" /> Buka Detail</>
                                    }
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
            <Modal isOpen={modalUnlock} style={{ marginTop: "40vh" }}>
                <ModalHeader toggle={toggleUnlock} className="border-bottom-0">
                    {t('Tukar Token untuk melihat detail Shio?')}
                </ModalHeader>
                <ModalBody className="text-center">
                    <FontAwesomeIcon icon="coins" className="mr-1" style={{ color: "#e0bc47" }} />
                    <span className="text-primary"> <b>{shio.tokenPrice ?? 1}</b> </span> token akan berkurang untuk bisa mengakses fitur ini. <br />
                    Apakah anda ingin melanjutkannya?
                    <br />
                    <div className="text-center d-flex justify-content-between mx-auto mt-2" style={{ width: "50%" }}>
                        <Button className="button-token" onClick={toggleUnlock} style={{ width: "100px" }}>
                            Batal
                        </Button>
                        <Button color="netis-color" onClick={buyShio} style={{ width: "100px", borderRadius: "10px" }} disabled={loadingBuy}>
                            {loadingBuy ? <><Spinner color="light" size="sm" />&nbsp;&nbsp;Loading... </> : "Ya"}
                        </Button>
                    </div>
                </ModalBody>
            </Modal>
            <Modal
                isOpen={showShioDescription}
                toggle={() => setShowShioDescription(false)}
                size="xl"
            >
                <ModalHeader toggle={() => setShowShioDescription(false)}>
                    {shio.earth} {shio.title}
                </ModalHeader>
                <ModalBody>
                    <div>
                        <h3>Kombinasi</h3>
                        <p>Pada bagian ini dijelaskan secara singkat kompabilitas yang dihasilkan oleh kombinasi pasangan shio, antara shio subjek dengan shio lain.</p>
                        <Row>
                            {combinationShio.map((shio, i) => (
                                <Col md="6" lg="4" key={i}>
                                    <ListGroup className="my-2">
                                        <ListGroupItem>
                                            <ListGroupItemHeading className="d-flex justify-content-between mb-0" id={shio}
                                                onClick={() => {
                                                    toggleResult(i)
                                                }}
                                                style={{ cursor: "pointer" }}
                                            >
                                                <strong>{shio}</strong>
                                                {collapse === i ?
                                                    <i className="mt1 fa-sm fa fa-chevron-up" />
                                                    :
                                                    <i className="mt1 fa-sm fa fa-chevron-down" />
                                                }
                                            </ListGroupItemHeading>
                                            <Collapse isOpen={collapse === i}>
                                                <ListGroupItemText className="mt-3">
                                                    <hr className="hr-main ml-0" />
                                                    <ReactMarkdown source={combinationDesc[i]} />
                                                </ListGroupItemText>
                                            </Collapse>
                                        </ListGroupItem>
                                    </ListGroup>
                                </Col>
                            ))}
                        </Row>
                        <hr />
                        <div className="row">
                            <div className="col-6">
                                <h5>{t("Sifat Positif")}</h5>
                                <ReactMarkdown source={shio.positive_traits} />
                            </div>
                            <div className="col-6">
                                <h5>{t("Sifat Negatif")}</h5>
                                <ReactMarkdown source={shio.negative_traits} />
                            </div>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </>
    );
};

export default translate(AssessmentShio);