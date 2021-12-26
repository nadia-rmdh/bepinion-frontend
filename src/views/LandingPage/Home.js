import React, { forwardRef, useEffect, useState } from 'react';
import { Button, Col, Row } from 'reactstrap';
import { useLandingPageContext } from './context';
import { ModalRegister } from './Navbar';

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
    <div className="home d-flex align-items-center justify-content-center position-relative" style={{ height: '100vh' }} ref={ref}>
      <div className="position-absolute home-bg">
      </div>
      <div className="position-absolute home-bg-shadow">
      </div>
      <div className="container">
        <Row>
          <Col xs="12" className="d-flex align-items-center text-center justify-content-center">
            <div>
              <div className="home-text-1 font-weight-bold text-white">
                Leave it to the experts!
              </div>
              <div className="home-text-2 text-white">
                An expert network you can rely on.
              </div>
              <div className="d-flex align-items-center justify-content-center mt-4">
                <Button size="xl" className="btn btn-pinion-blue btn-started mr-4 rounded-pill px-md-5 py-md-3 font-weight-bold mt-5" onClick={() => toggleRegister()}>Get started</Button>
              </div>
            </div>
          </Col>
          <ModalRegister isOpen={modalRegister} toggle={(e) => toggleRegister(e)} />
        </Row>
      </div>
    </div>
  )
}

export default forwardRef(LandingPage)
