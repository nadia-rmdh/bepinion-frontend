import React, { useState, useEffect, memo } from 'react';
import { toast } from 'react-toastify';
import { Button, Input } from 'reactstrap';
import { Row, Col, Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from 'reactstrap';
import Logo from '../../assets/img/logo-white.png';
import FacebookIcon from '../../assets/img/social-media/facebook.png';
import InstagramIcon from '../../assets/img/social-media/instagram.png';
import LinkedinIcon from '../../assets/img/social-media/linkedin.png';
import request from '../../utils/request';
import Loading from '../Menu/Recruitment/Components/Loading';

function ComingSoon(props) {
    const [timeLeft, setTimeLeft] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);
    const [loadingEmail, setLoadingEmail] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft);
        }, 1000);
        return () => clearTimeout(timer);
    });

    const calculateTimeLeft = () => {
        setLoading(false)
        let difference = 1613113200000 - (new Date());

        if (difference > 0) {
            setTimeLeft({
                hari: Math.floor(difference / (1000 * 60 * 60 * 24)),
                jam: Math.floor((difference / (1000 * 60 * 60))),
                menit: Math.floor((difference / 1000 / 60) % 60),
                detik: Math.floor((difference / 1000) % 60)
            })
        }
    }

    const handleSendEmail = () => {
        const companyEmail = document.getElementById("email").value;
        setLoadingEmail(true)
        if (companyEmail) {
            request.post('v1/company/demo/request', { companyEmail })
                .then((response) => {
                    setLoadingEmail(false)
                    setModal(true)
                    document.getElementById("email").value = ''
                })
                .catch((err) => {
                    toast.error('Gagal Mengirim Email')
                })
        } else {
            setLoadingEmail(false)
            toast.error('Email belum terisi')
        }
    }

    return (
        <>
            { loading ? <Loading type="Rings" text="Menyambungkan..." /> : !timeLeft ? props.children :
                timeLeft ?
                    <section className="comingsoon animated fadeIn">
                        <Row className="mx-1">
                            <Col xs="12">
                                <div className="comingsoon-logo">
                                    <img src={Logo} alt="logo-aikrut" />
                                </div>
                            </Col>
                            <Col xs="12" className="comingsoon-content">
                                <Row>
                                    <Col md="6">
                                        <div className="title">
                                            COMING SOON
                                        </div>
                                        <div className="countdown">
                                            <TimerDisplay interval={timeLeft} />
                                        </div>
                                        <div className="get-demo">Mau info lebih lanjut?</div>
                                        <div className="send-email d-flex justify-content-center">
                                            <div className="input-email-demo mt-3">
                                                <i className="fa fa-envelope" />
                                                <Input
                                                    className="shadow-lg form-control-lg"
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    maxLength="100"
                                                    placeholder="Tulis email anda di sini..."
                                                />
                                                <Button className="btn px-3 px-lg-4" onClick={() => handleSendEmail()} disabled={loadingEmail}>{loadingEmail ? <Spinner size="sm" /> : "Kirim"}</Button>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div className="social-media">
                                            <a href="https://www.facebook.com/aikrut.id/" target="_blank" rel="noopener noreferrer"><img src={FacebookIcon} alt="FacebookIcon" /></a>
                                            <a href="https://www.instagram.com/aikrut.id/" target="_blank" rel="noopener noreferrer"><img src={InstagramIcon} alt="InstagramIcon" /></a>
                                            <a href="https://www.linkedin.com/in/aikrut-id/" target="_blank" rel="noopener noreferrer"><img src={LinkedinIcon} alt="LinkedinIcon" /></a>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        <Modal isOpen={modal} toggle={() => setModal(false)} className="token-master">
                            <ModalHeader className="border-bottom-0">
                                Info lebih lanjut
                            </ModalHeader>
                            <ModalBody>
                                <div className="d-flex justify-content-between align-middle mb-3">
                                    <div className="mt-2">
                                        Terimakasih, atas ketertarikan anda pada aiKrut. Tim kami akan menghubungi anda untuk memberikan info lebih detail mengenai produk ini.
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter className="border-top-0">
                                <Button onClick={() => setModal(false)} color="netis-danger">
                                    Tutup
                                </Button>
                            </ModalFooter>
                        </Modal>
                    </section >
                    :
                    <Loading type="Rings" text="Menyambungkan..." />
            }
        </>
    )
}

const TimerDisplay = memo(({ interval }) => {
    let hours = interval.jam < 10
        ?
        ("0" + interval.jam.toString()).split("")
        :
        interval.jam.toString().split("");
    let minutes = interval.menit < 10
        ?
        ("0" + interval.menit.toString()).split("")
        :
        interval.menit.toString().split("");
    let seconds = interval.detik < 10
        ?
        ("0" + interval.detik.toString()).split("")
        :
        interval.detik.toString().split("");

    return (
        <div>
            {!interval ?
                null
                :
                <>
                    <div className="number">
                        <div className="value">
                            <div className="square">
                                {hours[0]}
                            </div>
                            <div className="square">
                                {hours[1]}
                            </div>
                        </div>
                        <div className="text">Hours</div>
                    </div>
                    <div className="number">
                        <div className="value">
                            <div className="square">
                                {minutes[0]}
                            </div>
                            <div className="square">
                                {minutes[1]}
                            </div>
                        </div>
                        <div className="text">Minutes</div>
                    </div>
                    <div className="number">
                        <div className="value">
                            <div className="square">
                                {seconds[0]}
                            </div>
                            <div className="square">
                                {seconds[1]}
                            </div>
                        </div>
                        <div className="text">Seconds</div>
                    </div>
                </>
            }
        </div >
    )
})
export default ComingSoon;
