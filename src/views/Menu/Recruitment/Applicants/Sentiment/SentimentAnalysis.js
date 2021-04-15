import React, { useState } from 'react';
import { Row, Col, Card, CardBody, Button, Modal, ModalBody, Spinner } from 'reactstrap';
import { toast } from "react-toastify";
import { t, translate } from "react-switch-lang";
import request from '../../../../../utils/request';
import { Doughnut } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';

function SentimentAnalysis({ data, match, getAPI, dataToken, guide }) {
    const { dataSentiment: sentiment } = data;
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const sosmed = sentiment && sentiment.data && Object.keys(sentiment?.data)

    const toggle = function () {
        setModal(!modal)
    }

    const contactus = () => {
        setLoading(true)
        request.post('v1/company/request/sentiment', {
            userId: data.id,
            userName: data.fullName
        })
            .then(() => {
                // setModal(true)
                getAPI()
            })
            .catch((err) => {
                toast.error(t('Gagal melakukan permohonan sentiment analysis, silahkan coba lagi nanti'))
                return;
            })
            .finally(() => {
                setLoading(false)
            })
    }
    return (
        <>
            <Card className="border-0">
                <CardBody className="pt-0">
                    {!sentiment ?
                        <Row className="no-sentiment d-flex justify-content-center">
                            <Col md="10" lg="7" className="no-sentiment-img">
                                <img src={require('../../../../../assets/img/sentiment/no-sentiment.png')} alt="no-sentiment" />
                            </Col>
                            <Col md="10" lg="7" className="no-sentiment-content text-center">
                                <h6>
                                    Fitur ini memberikan hasil pengolahan data sentimen dari sosial media pelamar 
                                    ke dalam dua spesifikasi sentimen (sentimen positif dan sentimen negatif). Semakin besar nilai prosentase sentimen positif yang dihasilkan maka pelamar cenderung memiliki kesan yang positif dalam lingkup sosial media yang digunakan.
                                    Ingin melihat hasil sentimen analisis? Silahkan hubungi kami.
                                </h6>
                                <Button onClick={() => contactus()} color="netis-color" className="my-3" disabled={loading}>{loading ? <><Spinner color="light" size="sm" />&nbsp;&nbsp;Loading... </> : "Hubungi Kami"}</Button>
                            </Col>
                        </Row>
                        : !sentiment.status || !sosmed ?
                            <Row className="mb-3 mt-5 wait-sentiment">
                                <Col className="text-center">
                                    <img src={require('../../../../../assets/img/sentiment/waiting-sentiment.png')} alt="wait" /><br />
                                    <h5>Mohon untuk menunggu, permintaan Anda sedang diproses.<br />Tim kami akan segera menghubungi Anda.</h5>
                                </Col>
                            </Row>
                            :
                            <Row className="my-3 d-flex justify-content-around">
                                {sosmed?.map((item, idx) => (
                                    <Col key={idx} md="5" className="my-2 py-3 px-3 mx-2">
                                        <Row style={{ backgroundColor: "#F9FAFC", height: "250px" }} className="d-flex align-items-center">
                                            <Col xs="3" className="text-center d-flex flex-column align-items-center sentiment-negative">
                                                <h2><b>{sentiment.data[item].negatif}&nbsp;%</b></h2>
                                                <small>Sentiment Negatif</small>
                                            </Col>
                                            <Col xs="6" className="text-center doughnut-sentiment">
                                                <div className="doughnut-title">
                                                    <strong>{item.toUpperCase()}</strong>
                                                </div>
                                                <Doughnut
                                                    height={230}
                                                    data={{
                                                        labels: ['Positif', 'Negatif'],
                                                        datasets: [{
                                                            label: "",
                                                            // fill: false,
                                                            // lineTension: 0.1,
                                                            backgroundColor: ['#16CB60', '#FFB400'],
                                                            borderColor: ['#16CB60', '#FFB400'],
                                                            data: [sentiment.data[item].positif + sentiment.data[item].netral, sentiment.data[item].negatif]
                                                        }]
                                                    }}
                                                    options={{
                                                        plugins: {
                                                            datalabels: {
                                                                display: false,
                                                            }
                                                        },
                                                        cutoutPercentage: 70,
                                                        legend: {
                                                            display: false
                                                        }
                                                    }}
                                                />
                                            </Col>
                                            <Col xs="3" className="text-center d-flex flex-column align-items-center sentiment-positive">
                                                <h2><b>{sentiment.data[item].positif + sentiment.data[item].netral}&nbsp;%</b></h2>
                                                <small>Sentiment Positif</small>
                                            </Col>
                                        </Row>
                                    </Col>
                                ))}
                            </Row>
                    }
                </CardBody>
            </Card>
            <Modal isOpen={modal} toggle={toggle} style={{ marginTop: "40vh" }}>
                <ModalBody className="text-center">
                    <p>Mohon untuk menunggu, permintaan anda sedang diproses. Tim kami akan segera menghubungi anda.</p>
                    <Button color="netis-color" onClick={toggle} style={{ width: "100px" }}>
                        OK
            </Button>
                </ModalBody>
            </Modal>
        </>
    )

}

export default translate(SentimentAnalysis);