import React from 'react';
import { Link } from 'react-router-dom';
import { translate } from "react-switch-lang";
import { Button, Col, Row } from 'reactstrap';

function LandingPage() {
  return (
    <Row className="h-100">
      <Col xs="12" className="d-flex align-items-center justify-content-center">
        <div>
          <div className="font-10xl font-weight-bold d-flex align-items-center justify-content-center text-pinion-primary">
            Best <span className="text-pinion-secondary m-2">opportunities</span> at hand
          </div>
          <div className="d-flex align-items-center justify-content-center mt-4">
            <Button size="xl" className="btn btn-pinion-primary mr-4 rounded-pill">Get started</Button>
            <Link className="text-pinion-primary font-xl" style={{ textDecoration: 'underline' }}>
              See how it works
            </Link>
          </div>
        </div>
      </Col>
    </Row>
  )
}

export default translate(LandingPage)
