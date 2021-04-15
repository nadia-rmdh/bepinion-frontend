import React from 'react';
import { Row, Col } from 'reactstrap';
import Zoom from 'react-reveal/Zoom';
import Slide from 'react-reveal/Slide';

function Advantage() {
    return (
        <section id="advantage" className="advantages-landing">
            <div className="container-fluid pt-2 pb-5">
                <h3 className="text-center sub-title">Kelebihan Kami</h3>
                <hr className="hr-work" />
                <Row className="row-advantage">
                    <Col xs="12" md="7" className="col-advantage-item">
                        <div className="row">
                            <div className="col-6 mb-2 advantage-item">
                                <AdvantageItem
                                    image={require('../../assets/img/landing-page/advantage/advantage-ai.png')}
                                    text="Teknologi Kecerdasan Buatan" />
                            </div>
                            <div className="col-6 mb-2 advantage-item">
                                <AdvantageItem
                                    image={require('../../assets/img/landing-page/advantage/advantage-fast.png')}
                                    text="Proses Cepat" />
                            </div>
                            <div className="col-6 mb-2 advantage-item">
                                <AdvantageItem
                                    image={require('../../assets/img/landing-page/advantage/advantage-easy.png')}
                                    text="Mudah Digunakan" />
                            </div>
                            <div className="col-6 mb-2 advantage-item">
                                <AdvantageItem
                                    image={require('../../assets/img/landing-page/advantage/advantage-realtime.png')}
                                    text="Akses Kapanpun dan Dimanapun" />
                            </div>
                        </div>
                    </Col>
                    <Col xs="12" md="5" className="advantage-desc text-right">
                        <Slide right>
                            <hr className="hr-advantage mr-0" />
                            <h1>
                                Solusi Terbaik<br />
                                Untuk Rekrutmen<br />
                                Perusahaan Anda
                            </h1>
                        </Slide>
                    </Col>
                </Row>
            </div>
        </section>
    )
}

function AdvantageItem(props) {
    return (
        <Zoom>
            <div className="d-flex flex-column advantage-item">
                <img src={props.image} alt="illustration" />
                <hr className="hr-advantage-icon" />
                <h6 className="advantage-icon-desc">{props.text}</h6>
            </div>
        </Zoom>
    );
}

export default Advantage;
