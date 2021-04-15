import React, { useState } from 'react';
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
} from "reactstrap";
import request from "../../../../../utils/request";
import { toast } from "react-toastify";
import { t, translate } from "react-switch-lang";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NoToken from "./NoToken";
import ModalPrivilegeForbidden from '../../../../../components/ModalPrivilegeForbidden';

function AssessmentMsdt({ data, id, getAPI, dataToken, can }) {
    const [modalUnlock, setModalUnlock] = useState(false);
    const [loadingBuy, setLoadingBuy] = useState(false);
    const [forbidden, setForbidden] = useState(false)

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

    const buyMsdt = function () {
        setLoadingBuy(true)
        let formMsdt = new FormData();
        formMsdt.append('identity', id)
        formMsdt.append('tokenType', data?.tokenType)
        request.post('v1/token/usage', formMsdt)
            .then(() => {
                // mutate('v1/token');
                getAPI()
                    .then(() => toast.success(t('Token berhasil digunakan untuk melihat deskripsi Tipe Kepemimpinan')))
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
                        <Col md="6" className="d-flex flex-column">
                            <h5 className="text-uppercase content-sub-title mb-2">
                                <strong>
                                    Tes Kepemimpinan (MSDT)
                                </strong>
                            </h5>
                            <h6>
                                Tipe Kepemimpinan dari pelamar ini adalah
                            </h6>
                            <h4>
                                <span className="text-capitalize">{data.description.title}</span>
                            </h4>
                            {data.purchased ?
                                <div className="mt-4">
                                    <p>{data.description.desc}</p>
                                    <div>
                                        <ul>
                                            {
                                                data.description.list.map((item) => (
                                                    <li>{item}</li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                </div>
                                :
                                <div className="d-flex mt-4">
                                    {!data?.purchased &&
                                        <div style={{ marginTop: "4px" }} className="mr-2 d-inline">
                                            <FontAwesomeIcon icon="coins" className="mr-1" style={{ color: "#e0bc47" }} /><b>{data.tokenPrice}</b>
                                        </div>
                                    }
                                    <Button
                                        className={`btn ${data?.purchased ? 'button-video' : 'btn-netis-color'}`}
                                        onClick={(!dataToken.balance || dataToken.isExpired) ? toggleNoToken : toggleUnlock}
                                        style={{ borderRadius: "8px" }}
                                    >
                                        {data.purchased ?
                                            t('Lihat Detail')
                                            :
                                            <><i className="fa fa-lock mr-1" /> Buka Detail</>
                                        }
                                    </Button>
                                </div>
                            }
                        </Col>
                        <Col md="6">
                            <div className="my-3 text-center msdt-img">
                                <img src={require(`./assets/msdt/${data.result}.svg`)} alt="MSDT" />
                            </div>
                        </Col>
                    </Row>
                </CardBody>
            </Card >
            <Modal isOpen={modalUnlock} style={{ marginTop: "40vh" }}>
                <ModalHeader toggle={toggleUnlock} className="border-bottom-0">
                    {t('Tukar Token untuk melihat Deskripsi Tipe Kepemimpinan?')}
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
                        <Button color="netis-color" onClick={buyMsdt} style={{ width: "100px", borderRadius: "10px" }} disabled={loadingBuy}>
                            {loadingBuy ? <><Spinner color="light" size="sm" />&nbsp;&nbsp;Loading... </> : "Ya"}
                        </Button>
                    </div>
                </ModalBody>
            </Modal>
        </>
    )
}

export default translate(AssessmentMsdt);