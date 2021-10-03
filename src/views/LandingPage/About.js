import React from 'react'
import { Button, Col, Row } from 'reactstrap'
import PageLayout from './PageLayout'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

function About() {

  return (
    <PageLayout>
      <Row className="h-100">
        <Col xs="12" className="d-flex align-items-center justify-content-center">
          <div>
            <Carousel autoPlay showStatus={false} showArrows={false} className="about-carousel">
              <About1 />
              <About2 />
            </Carousel>
          </div>
        </Col>
      </Row>
    </PageLayout>
  )
}

const About1 = () => {

  return (
    <Row>
      <Col xs="12" className="d-flex align-items-center justify-content-center p-5">
        <div>
          <div className="font-10xl font-weight-bold d-flex align-items-center justify-content-center bg-pinion-secondary rounded-pill text-light px-5">
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

  return (
    <Row>
      <Col xs="12" className="d-flex align-items-center justify-content-center p-5">
        <div>
          <div className="font-10xl font-weight-bold d-flex align-items-center justify-content-center bg-pinion-secondary rounded-pill text-light px-5">
            A Driving Gear
          </div>
          <div className="mt-4 font-xl px-5">
            <div>Pinion is a driving gear to power a system delivering a purpose. Your expertise can</div>
            <div>be the missing piece of a system to run more efficient and more effective.</div>
          </div>
          <div className="d-flex align-items-center justify-content-center mt-4">
            <Button size="xl" className="btn btn-pinion-secondary mr-4 rounded-pill text-light">Be a Pinion</Button>
          </div>
        </div>
      </Col>
    </Row>
  )
}

export default About
