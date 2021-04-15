import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, CardBody, CardFooter, Button } from 'reactstrap';
import Zoom from 'react-reveal/Zoom';

function Pricing(props, ref) {
    return (
        <section id="pricing" className="pricing text-center" ref={ref}>
            <h3 className="text-center sub-title">Harga</h3>
            <hr className="hr-work mb-3" />
            <Row className="price-row">
                <Col sm="6" md="4">
                    <PriceCard
                        title="Free Package"
                        note="*)"
                        price="0"
                        token="50"
                        checklist="Akses bebas 30 hari untuk AI Recruitment, Asesmen, dan fitur lainnya."
                        // button="Coba Sekarang"
                        hint="*) Hanya untuk penggunaan awal"
                    />
                </Col>
                <Col sm="6" md="4">
                    <PriceCard
                        title="Business Package"
                        price="10,000,000"
                        token="500"
                        checklist="Akses bebas 6 bulan untuk AI Recruitment dan Asesmen, Tes Psikologi dan fitur lainnya."
                    // button="Beli Sekarang"
                    />
                </Col>
                <Col sm="6" md="4">
                    <PriceCard
                        title="Pro Package"
                        price="16,000,000"
                        token="1000"
                        checklist="Akses bebas 1 tahun untuk AI Recruitment dan Asesmen, tes psikologi, Palmistry, Astrologi China dan fitur lainnya."
                    // button="Beli Sekarang"
                    />
                </Col>
            </Row>
        </section>
    )
}

function PriceCard(props) {
    return (
        <Zoom>
            <Card className="card-price">
                <CardBody className="p-4 p-xl-5">
                    <div className="text-center mb-2">
                        <h4>{props.title}&nbsp;<sub><small>{props.note ?? null}</small></sub></h4>
                        {/* <h3><sup>Rp</sup>&nbsp;{props.price}</h3> */}
                    </div>
                    <div className="text-center my-4" style={{ color: "#18568B" }}>
                        <h5>({props.token} Token)</h5>
                    </div>
                    <div className="card-price-body text-left mt-2">
                        <Row>
                            <Col xs="1" className="mb-2">
                                <i className="fa fa-check" style={{ color: "#18568B" }} />
                            </Col>
                            <Col xs="10" className="mb-2">
                                Mempublikasikan lowongan pekerjaan tak terbatas.
                    </Col>
                        </Row>
                        <Row>
                            <Col xs="1" className="mb-2">
                                <i className="fa fa-check" style={{ color: "#18568B" }} />
                            </Col>
                            <Col xs="10" className="mb-2">
                                {props.checklist}
                            </Col>
                        </Row>
                    </div>
                    {props.hint && <small className="pricing-footer">{props.hint}</small>}
                </CardBody>
                <CardFooter className="bg-white border-top-0 pt-3 card-pricing-footer" style={{ paddingBottom: "3rem" }}>
                    <Link to="/register">
                        <Button className="btn btn-netis-primary px-2" style={{ borderRadius: "15px", width: "168px", heigth: "46px" }}>
                            {/* Pilih Sekarang */}
                        Hubungi Kami
                    </Button>
                    </Link>
                </CardFooter>
                {/* <div className="text-center mt-3 mb-0">
            </div> */}
            </Card>
        </Zoom>
    )
}

export default forwardRef(Pricing);