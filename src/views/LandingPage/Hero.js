import React, { forwardRef } from 'react';
import Fade from 'react-reveal/Fade';
import RegisterComponent from '../Pages/Register/RegisterComponent';

function Hero(props, ref) {
    return (
        <section className="hero hero-image mb-3" ref={ref} id="home">
            <div>
                <div className="hero-content mx-auto mx-sm-0 mb-2">
                    <div style={{ marginBottom: "6rem" }}>
                        <Fade>
                            <h1>
                                Proses Rekrutmen dengan<br />
                                Teknologi Kecerdasan Buatan (AI)<br />
                            </h1>
                        </Fade>
                    </div>
                </div>
                <div className="hero-content-form card-group">
                    <div className="card-login-form d-flex justify-content-center" style={{ backgroundColor: 'transparent' }}>
                        <RegisterComponent register="Coba Gratis" />
                    </div>
                </div>
                {/* <div className="text-center mb-3 d-none d-md-block" style={{ marginTop: "450px" }}>
                    <img src={require(`../../assets/img/landing-page/mouse.png`)} alt="scroll" width="20px" /><br />
                    <small>Scroll Down</small>
                </div> */}
            </div>
        </section>
    )
}

export default forwardRef(Hero);
