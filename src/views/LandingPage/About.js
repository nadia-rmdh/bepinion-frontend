import React, { forwardRef, useState } from 'react'
import { Button, Col, Row } from 'reactstrap'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { ModalRegister } from './Navbar';

function About(props, ref) {

  return (
    <div className="about d-flex align-items-center" style={{ height: '80vh' }} ref={ref}>
      <Row>
        <Col xs="12" className="d-flex align-items-center justify-content-center p-0">
          <div ref={ref}>
            <Carousel autoPlay showThumbs={false} interval={12000} infiniteLoop showStatus={false} showArrows={false} className="about-carousel">
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
    <div>
      <div className="about-text-1 font-weight-bold d-flex align-items-center justify-content-center bg-pinion-secondary rounded-pill text-light px-0 px-md-5">
        See more, early
      </div>
      <div className="mt-4 about-text-2 px-0 px-md-5">
        <div>The ability to foresee, anticipate, and strategise for the future is an integral requirement in doing business nowadays. Early involvement of subject matter experts will enable Clients to see more steps ahead and make strategic decisions when significant impacts can be attained with measurable and manageable efforts. Pinion will network business with experienced subject matter experts whose services can be procured at the right time and at the right cost.</div>
      </div>
    </div>
  )
}

const About2 = () => {
  const [modalRegister, setModalRegister] = useState(false)

  const toggleRegister = () => {
    setModalRegister(!modalRegister)
  }

  return (
    <div>
      <div className="about-text-1 font-weight-bold d-flex align-items-center justify-content-center bg-pinion-secondary rounded-pill text-light px-0 px-md-5">
        A Driving Gear
      </div>
      <div className="mt-4 about-text-2 px-5">
        <div>Our Consultants are the driving gears that power systems to deliver their purpose. Pinion will provide opportunities for Consultants creating impacts to their surroundings. You and your expertise will be center-staged.</div>
      </div>
      <div className="d-flex align-items-center justify-content-center mt-4 mb-5">
        <Button size="xl" className="btn btn-pinion-secondary rounded-pill text-light" onClick={() => toggleRegister()}>Be a Pinion</Button>
      </div>
      <ModalRegister isOpen={modalRegister} toggle={(e) => toggleRegister(e)} />
    </div>
  )
}

export default forwardRef(About)
