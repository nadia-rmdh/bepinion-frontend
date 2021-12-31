import React, { forwardRef } from 'react'
import { Col, Row } from 'reactstrap'
import Image from '../../assets/illustrations/WhatWeDo.jpg';

function About(props, ref) {

  return (
    <div className="about d-flex align-items-center position-relative" ref={ref}>
      <div className="position-absolute about-bg">
      </div>
      <div className="about-container">
        <Row>
          <Col xs="12" lg="5"></Col>
          <Col xs="12" lg="7">
            <div className="font-2xl about-text font-weight-bold text-pinion-blue">
              WHAT WE DO
            </div>
          </Col>
          <Col xs="12" lg="5" className="d-flex align-items-center px-5">
            <img src={Image} alt="whatwedo" className="about-image" />
          </Col>
          <Col xs="12" lg="7">
            <div className="about-text-1">
              Foresights make your plans weatherproof
            </div>
            <div className="about-text-2 mb-4">
              Pinion helps you to see more, early on.
            </div>
            <div className="about-text-3">
              The ability to foresee, anticipate, and strategize for the future is an integral requirement in doing business nowadays. Early involvement of subject matter experts will enable Clients to see more steps ahead and make strategic decisions when significant impacts can be attained with measurable and manageable efforts. Pinion will network business with experienced subject matter experts whose services can be procured at the right time and at the right cost.
            </div>
            <hr className="my-3 my-lg-5" style={{ borderTop: '1px solid rgb(0 0 0 / 30%)' }} />
            <div className="about-text-1">
              Be impactful with your expertise
            </div>
            <div className="about-text-2 mb-4">
              Pinion breaks barriers and creates opportunities.
            </div>
            <div className="about-text-3">
              Our Consultants are the driving gears that power systems to deliver their purpose.
              With tech-enhanced network, Pinion will provide opportunities for Consultants to create impacts at scale. You and your expertise will be center-staged.
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default forwardRef(About)
