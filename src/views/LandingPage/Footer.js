import React from 'react';
import { Row, Col } from 'reactstrap';
import LogoWhite from '../../assets/assets_ari/logo_white.png';
import { ReactComponent as MapMarkerOutline } from '../../assets/img/map-marker-outline.svg';
// import { ReactComponent as WhatsappOutline } from '../../assets/img/whatsapp-outline.svg';
import { ReactComponent as MailOutline } from '../../assets/img/mail-outline.svg';
import Slide from 'react-reveal/Slide';
// import { Link } from 'react-router-dom';

function Footer() {
    return (
        <Slide bottom>
            <div className="footer-landing">
                <div className="container-fluid">
                    <div className="d-flex d-md-block justify-content-center">
                        <img src={LogoWhite} alt="widya_skilloka" className="logo_white img-fluid mb-3" />
                    </div>
                    <Row className="mt-2">
                        <Col md="6" className="d-flex align-items-center">
                            <p className="aboutus">
                                aikrut by Widya adalah platform yang mempermudah dan
                                mengoptimalkan secara singkat proses rekrutmen perusahaan
                                Anda. Anda dapat mengakses CV online, hasil asesmen psikotes
                                dan hasil wawancara online kandidat pelamar yang sudah otomatis
                                terintegrasi dengan kecerdasan buatan.
                        </p>
                        </Col>
                        <Col md="1" className="footer-right information">
                            {/* <hr className="footer-divider d-block d-md-none" />
                        <ul className="mb-4 mb-md-1">
                            <li><strong>Informasi</strong></li>
                            <li>Kebijakan Privasi</li>
                            <li>Syarat dan Ketentuan</li>
                            <li>FAQ</li>
                        </ul> */}
                        </Col>
                        <Col md="5">
                            <div className="footer-left mt-4 mt-md-0 contactus">
                                <hr className="footer-divider d-block d-md-none" />
                                <strong>PT Widya Indonesia Sejahtera : </strong>
                                <div className="d-flex align-items-start">
                                    <div style={{ width: 12, color: '#fff' }} className="mr-3">
                                        <MapMarkerOutline />
                                    </div>
                                    <p className="mb-1">
                                        <a href="https://goo.gl/maps/8QbdjaJv1dYHsJDB6">
                                            Jl. Palagan Tentara Pelajar No.31A KM 7.5<br />
                                            Kec. Ngaglik, Kabupaten Sleman, DIY 55581
                                        </a>
                                    </p>
                                </div>
                                <div className="d-flex align-items-start">
                                    <i className="fa fa-phone text-white mr-3 mt-1" style={{width:12}} />
                                    <p className="mb-1" style={{ flex: '1' }}>
                                        (0274) 4542237
                                    </p>
                                    {/* <div style={{ width: 12, color: '#fff' }} className="mr-3">
                                        <WhatsappOutline />
                                    </div>
                                    <a href="https://wa.me/6281226798802" style={{ color: '#fff' }}>
                                        081226798802
                                    </a> */}
                                </div>
                                <div className="d-flex align-items-start">
                                    <div style={{ width: 12, color: '#fff' }} className="mr-3">
                                        <MailOutline />
                                    </div>
                                    <p className="mb-1" style={{ flex: '1' }}><a href="mailto:info@aikrut.id" style={{ color: '#dce6ef' }}>info@aikrut.id</a></p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <p className="copyright text-center mt-4">
                        © 2021 PT Widya Indonesia Sejahtera. All Rights Reserved
                    </p>
                </div>
            </div>
        </Slide>
    )
}

export default Footer;
