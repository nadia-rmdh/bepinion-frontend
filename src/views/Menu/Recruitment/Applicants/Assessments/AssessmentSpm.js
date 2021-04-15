import React, { useState } from 'react';
import { Row, Col, Card, CardBody, Button, Modal, ModalBody, ModalHeader, Spinner } from 'reactstrap';
import request from "../../../../../utils/request";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { t, translate } from "react-switch-lang";
import NoToken from "./NoToken";
import { category } from "./SpmCategory";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ModalPrivilegeForbidden from '../../../../../components/ModalPrivilegeForbidden';

function AssessmentSpm({ data, id, getAPI, dataToken, can }) {
    const hasPurchased = data?.purchased;
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

    const buySpm = function () {
        setLoadingBuy(true)
        let formSpm = new FormData();
        formSpm.append('identity', id)
        formSpm.append('tokenType', data?.tokenType)
        request.post('v1/token/usage', formSpm)
            .then(() => {
                getAPI()
                    .then(() => toast.success(t('Token berhasil digunakan untuk melihat nilai Tes IQ')))
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
                    <h5 className="text-uppercase content-sub-title mt-2 mb-4">
                        <strong>
                            SKOR KEMAMPUAN KOGNITIF
                        </strong>
                    </h5>
                {hasPurchased ?
                    <Row className="md-company-header mb-3 mt-2">
                        <Col md="8" lg="7" className="col-spm text-center py-4">
                            <h6 className="text-uppercase content-sub-title mb-3">
                                <strong>
                                    SKOR KEMAMPUAN KOGNITIF
                                </strong>
                            </h6>
                            <div style={{width:'25%'}} className="mx-auto mb-2">
                                <CircularProgressbar
                                    value={hasPurchased ? data.iq : 103}
                                    maxValue={138}
                                    strokeWidth={15}
                                    text={hasPurchased ? data.iq : 103}
                                    styles={{
                                        path: {
                                            stroke: '#16CB60'
                                        },
                                        text: {
                                            fontSize: '16pt',
                                            fontWeight: 'bold',
                                            fill: '#000000'
                                        }
                                    }}
                                />
                            </div>
                            <div className="text-center my-4 mx-auto" style={{width:'80%'}}>
                                Skor kemampuan kognitif yang dihasilkan pelamar adalah {hasPurchased ? data.iq : 103}
                                , diselesaikan dalam waktu {hasPurchased ? data.time : 20} menit
                                , Skor ini termasuk dalam kategori {hasPurchased ? data.type : "Average"}
                            </div>
                            {category.map((item, idx) => {
                                return(
                                <Row key={idx} className="row-spm-category mx-auto my-2">
                                    <Col xs="2" className={`text-left py-2 ${data.type === item.name ? `check-icon` : ``}`}>
                                        {data.type === item.name ?
                                        <img src={require('../../../../../assets/img/asesmen/spm-check.png')} alt="category" width={30} />
                                        :
                                        <i className="fa fa-lg fa-circle-thin" style={{color:"#818181"}} />
                                        }
                                    </Col>
                                    <Col xs="9" className={`d-flex justify-content-between py-2 ${data.type === item.name ? `spm-check` : `spm-category`}`}>
                                        <span>{item.name}</span>
                                        <span>{item.range}</span>
                                    </Col>
                                </Row>
                            )})}
                        </Col>
                    </Row>
                    :
                    <>
                        <h6>
                            Klik Buka Detail untuk melihat nilai Tes IQ
                        </h6>
                        <div className="d-flex mt-4">
                            <div style={{ marginTop: "4px" }} className="mr-2 d-inline">
                                <FontAwesomeIcon icon="coins" className="mr-1" style={{ color: "#e0bc47" }} />
                                <b>{data.tokenPrice}</b>
                            </div>
                            <Button
                                className={`btn ${hasPurchased ? 'button-video' : 'btn-netis-color'}`}
                                onClick={(!dataToken.balance || dataToken.isExpired) ? toggleNoToken : toggleUnlock}
                                style={{ borderRadius: "8px" }}
                            >
                                Buka Detail
                            </Button>
                        </div>
                    </>
                    }
                </CardBody>
            </Card>
            <Modal isOpen={modalUnlock} style={{ marginTop: "40vh" }}>
                <ModalHeader toggle={toggleUnlock} className="border-bottom-0">
                    {t('Tukar Token untuk melihat Nilai Tes IQ?')}
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
                        <Button color="netis-color" onClick={buySpm} style={{ width: "100px", borderRadius: "10px" }} disabled={loadingBuy}>
                            {loadingBuy ? <><Spinner color="light" size="sm" />&nbsp;&nbsp;Loading... </> : "Ya"}
                        </Button>
                    </div>
                </ModalBody>
            </Modal>
        </>
    )
}

export default translate(AssessmentSpm);