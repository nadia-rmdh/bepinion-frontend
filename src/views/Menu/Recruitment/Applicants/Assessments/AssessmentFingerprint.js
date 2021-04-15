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
    Collapse
} from "reactstrap";
import request from "../../../../../utils/request";
import { toast } from "react-toastify";
import { t, translate } from "react-switch-lang";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NoToken from "./NoToken";
import ModalPrivilegeForbidden from "../../../../../components/ModalPrivilegeForbidden";

function AssessmentFingerprint({ data, id, getAPI, dataToken, can }) {
    const [loadingBuy, setLoadingBuy] = useState(false)
    const [modalUnlock, setModalUnlock] = useState(false)
    const [collapse, setCollapse] = useState(0);
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

    const [modalNoToken, setModalNoToken] = useState(false);
    const toggleNoToken = () => setModalNoToken(!modalNoToken);

    const buyFinger = function () {
        setLoadingBuy(true)
        let formFinger = new FormData();
        formFinger.append('identity', id)
        formFinger.append('tokenType', data?.tokenType)
        request.post('v1/token/usage', formFinger)
            .then(() => {
                // mutate('v1/token');
                getAPI()
                    .then(() => toast.success(t('Token berhasil digunakan untuk melihat Sidik Jari')))
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
                                <strong>Sidik Jari</strong>
                            </h5>
                            <ListGroup className="my-2">
                                <ListGroupItem className="outline-netis-primary mb-1" style={{ borderRadius: 12 }}>
                                    <ListGroupItemHeading className="d-flex justify-content-between mb-0" id={data.results[0].title + 0}
                                        onClick={() => {
                                            toggleResult(0)
                                        }}
                                        style={{ cursor: "pointer" }}
                                    >
                                        {data.results[0].title}
                                        {collapse === 0 ?
                                            <i className="mt1 fa-sm fa fa-chevron-up" />
                                            :
                                            <i className="mt1 fa-sm fa fa-chevron-down" />
                                        }
                                    </ListGroupItemHeading>
                                </ListGroupItem>

                                <Collapse isOpen={collapse === 0} className="bg-white border mb-2" style={{ borderRadius: 12 }}>
                                    <ul className="my-3">
                                        {data.results[0].list && data.results[0].list.map((list, i) => (
                                            <li key={i}>{list}</li>
                                        ))}
                                    </ul>
                                </Collapse>

                                <div className="fingerprint">
                                    {!data.purchased ?
                                        <div className="lock-fingerprint text-center">
                                            <div className="lock-fingerprint-text">
                                                <i className="fa fa-lock lock-icon" aria-hidden="true" /><br />
                                                <span style={{ fontSize: "12pt" }}><b>Mau melihat hasil asesmen Sidik Jari ini?</b></span><br />
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
                                    {data.results.map((finger, i) => (
                                        i === 0 ? '' :
                                            <div key={i}>
                                                <ListGroupItem className="outline-netis-primary mb-1" style={{ borderRadius: 12 }}>
                                                    <ListGroupItemHeading className="d-flex justify-content-between mb-0" id={finger.title + i}
                                                        onClick={() => {
                                                            toggleResult(i)
                                                        }}
                                                        style={{ cursor: "pointer" }}
                                                    >
                                                        {finger.title}
                                                        {collapse === i ?
                                                            <i className="mt1 fa-sm fa fa-chevron-up" />
                                                            :
                                                            <i className="mt1 fa-sm fa fa-chevron-down" />
                                                        }
                                                    </ListGroupItemHeading>
                                                </ListGroupItem>

                                                <Collapse isOpen={collapse === i} className="bg-white border mb-2" style={{ borderRadius: 12 }}>
                                                    <ul className="my-3">
                                                        {finger.list && finger.list.map((list, i) => (
                                                            <li key={i}>{list}</li>
                                                        ))}
                                                    </ul>
                                                </Collapse>
                                            </div>
                                    ))}
                                </div>
                            </ListGroup>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
            <Modal isOpen={modalUnlock} style={{ marginTop: "40vh" }}>
                <ModalHeader toggle={toggleUnlock} className="border-bottom-0">
                    {t('Tukar Token untuk melihat detail Sidik Jari?')}
                </ModalHeader>
                <ModalBody className="text-center">
                    <FontAwesomeIcon icon="coins" className="mr-1" style={{ color: "#e0bc47" }} />
                    <span className="text-primary"> <b>{data.tokenPrice ?? 1}</b> </span> token akan berkurang untuk bisa mengakses fitur ini. <br />
                    Apakah anda ingin melanjutkannya?
                    <br />
                    <div className="text-center d-flex justify-content-between mx-auto mt-2" style={{ width: "50%" }}>
                        <Button className="button-token" onClick={toggleUnlock} style={{ width: "100px" }}>
                            Batal
                        </Button>
                        <Button color="netis-color" onClick={buyFinger} style={{ width: "100px", borderRadius: "10px" }} disabled={loadingBuy}>
                            {loadingBuy ? <><Spinner color="light" size="sm" />&nbsp;&nbsp;Loading... </> : "Ya"}
                        </Button>
                    </div>
                </ModalBody>
            </Modal>
        </>
    );
};

export default translate(AssessmentFingerprint);