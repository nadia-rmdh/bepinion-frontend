import React, { forwardRef, useState } from 'react'
import { Button, Col, Row } from 'reactstrap'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { ModalRegister } from './Navbar';

function About(props, ref) {

  return (
    <div className="w-100 d-flex align-items-center" style={{ height: '80vh' }} ref={ref}>
      <Row className="w-100">
        <Col xs="12" className="d-flex align-items-center justify-content-center">
          <div ref={ref}>
            <Carousel autoPlay showThumbs={false} showStatus={false} showArrows={false} className="about-carousel">
              <About1 />
              <About2 />
            </Carousel>
          </div>
        </Col>
      </Row>
    </div>
  )
}

const About1 = () => {

  return (
    <Row>
      <Col xs="12" className="d-flex align-items-center justify-content-center p-5">
        <div>
          <div className="font-7xl font-weight-bold d-flex align-items-center justify-content-center bg-pinion-secondary rounded-pill text-light px-5">
            See more, early
          </div>
          <div className="mt-4 font-xl px-5">
            <div>Learn how Pinion assists Clients to foresee, anticipate, and strategise for the</div>
            <div>future through extensive network of subject matter experts <span className="font-weight-bold ml-1">at the right time.</span></div>
          </div>
        </div>
      </Col>
    </Row>
  )
}

const About2 = () => {
  const [modalRegister, setModalRegister] = useState(false)

  const toggleRegister = () => {
    setModalRegister(!modalRegister)
  }

  return (
    <Row>
      <Col xs="12" className="d-flex align-items-center justify-content-center p-5">
        <div>
          <div className="font-7xl font-weight-bold d-flex align-items-center justify-content-center bg-pinion-secondary rounded-pill text-light px-5">
            A Driving Gear
          </div>
          <div className="mt-4 font-xl px-5">
            <div>Pinion is a driving gear to power a system delivering a purpose. Your expertise can</div>
            <div>be the missing piece of a system to run more efficient and more effective.</div>
          </div>
          <div className="d-flex align-items-center justify-content-center mt-4 mb-5">
            <Button size="xl" className="btn btn-pinion-secondary rounded-pill text-light" onClick={() => toggleRegister()}>Be a Pinion</Button>
          </div>
        </div>
      </Col>
      <ModalRegister isOpen={modalRegister} toggle={(e) => toggleRegister(e)} />
    </Row>
  )
}

export default forwardRef(About)
