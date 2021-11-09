import React, { forwardRef, useEffect, useState } from 'react';
import { Button, Col, Row } from 'reactstrap';
import { useLandingPageContext } from './context';
import { ModalRegister } from './Navbar';
import ReactTextTransition, { presets } from "react-text-transition";

function LandingPage(props, ref) {
  const { faqRef, scrollTo } = useLandingPageContext();
  const [modalRegister, setModalRegister] = useState(false)
  const [textIndex, setTextIndex] = useState(0)

  const toggleRegister = () => {
    setModalRegister(!modalRegister)
  }

  const texts = ['insights', 'opportunities'];

  useEffect(() => {
    setInterval(() => {
      setTextIndex(state => state + 1)
    }, 4000)
    // return () => {
    //   cleanup
    // }
  }, [])

  return (
    <div className="home d-flex align-items-center justify-content-center" style={{ height: '90vh' }} ref={ref}>
      <Row className="w-100">
        <Col xs="12" className="d-flex align-items-center justify-content-center">
          <div>
            <div className="home-text-1 font-weight-bold text-pinion-primary">
              <span className="home-text-1-1">Best</span>
              <ReactTextTransition
                text={texts[textIndex % texts.length]}
                springConfig={presets.gentle}
                className={`${(textIndex % texts.length) === 0 ? 'text-pinion-blue' : 'text-pinion-secondary'} mx-3 home-text-1-2`}
                inline
                noOverflow
              />
              <span className="home-text-1-3 mr-3">at</span>
              <span className="home-text-1-3">hand</span>
            </div>
            <div className="d-flex align-items-center justify-content-center mt-4">
              <Button size="xl" className="btn btn-pinion-primary btn-started mr-4 rounded-pill" onClick={() => toggleRegister()}>Get started</Button>
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
