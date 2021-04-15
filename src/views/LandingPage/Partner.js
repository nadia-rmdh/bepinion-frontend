import React from 'react';
import Carousel from 'react-multi-carousel';
// import { Row, Col } from 'reactstrap';
import "react-multi-carousel/lib/styles.css";

function Partner() {
    return (
        <section id="partner" className="landing-partner text-center">
            <h3 className="text-center sub-title">Partner Kami</h3>
            <hr className="hr-work" />
            <div className="background-partner"></div>
            <Carousel
                additionalTransfrom={0}
                arrows={false}
                autoPlay
                autoPlaySpeed={3000}
                centerMode
                className="partner-row"
                containerClass=""
                dotListClass=""
                draggable
                focusOnSelect={false}
                infinite
                itemClass="partner-icon"
                keyBoardControl
                minimumTouchDrag={80}
                renderButtonGroupOutside={false}
                renderDotsOutside={false}
                responsive={{
                    desktop: {
                        breakpoint: {
                            max: 3000,
                            min: 1024
                        },
                        items: 3,
                        partialVisibilityGutter: 40
                    },
                    mobile: {
                        breakpoint: {
                            max: 464,
                            min: 0
                        },
                        items: 1,
                        partialVisibilityGutter: 30
                    },
                    tablet: {
                        breakpoint: {
                            max: 1024,
                            min: 464
                        },
                        items: 2,
                        partialVisibilityGutter: 30
                    }
                }}
                showDots={false}
                sliderClass=""
                slidesToSlide={1}
                swipeable
            >
                <div className="d-flex justify-content-center align-items-center">
                    <img src={require('../../assets/img/landing-page/partner-logo/arutala.png')} width="170" alt="Arutala" className="arutala" />
                </div>
                <div className="d-flex justify-content-center align-items-center">
                    <img src={require('../../assets/img/landing-page/partner-logo/griyaton.png')} width="320" alt="griyaton" className="griyaton" />
                </div>
                <div className="d-flex justify-content-center align-items-center">
                    <img src={require('../../assets/img/landing-page/partner-logo/msmb.png')} width="250" alt="MSMB" className="msmb" />
                </div>
                <div className="d-flex justify-content-center align-items-center">
                    <img src={require('../../assets/img/landing-page/partner-logo/idealab.png')} width="170" alt="UMG Idealab" className="idealab" />
                </div>
                <div className="d-flex justify-content-center align-items-center">
                    <img src={require('../../assets/img/landing-page/partner-logo/autoconz.png')} width="230" alt="Autoconz" className="autoconz" />
                </div>
                <div className="d-flex justify-content-center align-items-center">
                    <img src={require('../../assets/img/landing-page/partner-logo/frogs.png')} width="350" alt="Frogs" className="frogs" />
                </div>
            </Carousel>
        </section>
    )
}

export default Partner;