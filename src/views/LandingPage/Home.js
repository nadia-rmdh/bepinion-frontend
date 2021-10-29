import React, { forwardRef, useState } from 'react';
import { Button, Col, Row } from 'reactstrap';
import { useLandingPageContext } from './context';
import { ModalRegister } from './Navbar';

function LandingPage(props, ref) {
  const { faqRef, scrollTo } = useLandingPageContext();
  const [modalRegister, setModalRegister] = useState(false)

  const toggleRegister = () => {
    setModalRegister(!modalRegister)
  }

  return (
    <div className="home d-flex align-items-center" style={{ height: '90vh' }} ref={ref}>
      <Row>
        <Col xs="12" className="d-flex align-items-center justify-content-center">
          <div>
            <div className="home-text-1 font-weight-bold text-pinion-primary">
              <span className="home-text-1-1">Best</span>
              <span className="text-pinion-secondary mx-3 home-text-1-2">opportunities</span>
              <span className="home-text-1-3 mr-3">at</span>
              <span className="home-text-1-3">hand</span>
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
    </div>
  )
}

export default forwardRef(LandingPage)
