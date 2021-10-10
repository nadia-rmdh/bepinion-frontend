import React, { forwardRef, useState } from 'react';
import { Button, Col, Row } from 'reactstrap';
import { withLandingPageContext } from './context';
import { ModalRegister } from './Navbar';

function LandingPage(props, ref) {
  const { faqRef, scrollTo } = props.landingPageRefs;
  const [modalRegister, setModalRegister] = useState(false)

  const toggleRegister = () => {
    setModalRegister(!modalRegister)
  }

  return (
    <Row style={{ height: '100vh' }}>
      <Col xs="12" className="d-flex align-items-center justify-content-center">
        <div ref={ref}>
          <div className="font-10xl font-weight-bold d-flex align-items-center justify-content-center text-pinion-primary">
            Best <span className="text-pinion-secondary m-2">opportunities</span> at hand
          </div>
          <div className="d-flex align-items-center justify-content-center mt-4">
            <Button size="xl" className="btn btn-pinion-primary mr-4 rounded-pill" onClick={() => toggleRegister()}>Get started</Button>
            <div className="text-pinion-primary font-xl" style={{ textDecoration: 'underline', cursor: "pointer" }} onClick={() => scrollTo(faqRef.current)}>
              See how it works
            </div>
          </div>
        </div>
      </Col>
      <ModalRegister isOpen={modalRegister} toggle={(e) => toggleRegister(e)} />
    </Row>
  )
}

export default withLandingPageContext(forwardRef(LandingPage))
