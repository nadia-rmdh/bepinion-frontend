import React, { useCallback, useRef, useState } from "react"
import { Card, CardBody, Button, Row, Col, Input, Label } from "reactstrap";
import { toast } from 'react-toastify';
import request from "../../../utils/request";
import PageLayoutAuth from "../../LandingPage/PageLayoutAuth";
import { LandingPageProvider } from "../../LandingPage/context";
toast.configure()

function ForgotPassword() {
  const homeRef = useRef();
  const aboutRef = useRef();
  const faqRef = useRef();
  const contactRef = useRef();
  const [email, setEmail] = useState('');

  const handleSubmit = useCallback(() => {
    request.post('v1/auth/forgot-password', { email })
      .then(() => toast.success('Request forgot password successfully.'))
      .catch((error) => toast.error(error.response.data.message))
  }, [email])

  return (
    <LandingPageProvider value={{ homeRef, aboutRef, faqRef, contactRef }}>
      <PageLayoutAuth>
        <Row style={{ height: '90vh' }}>
          <Col xs={12} className="d-flex align-items-center justify-content-center">
            <Card className="w-50 rounded-5">
              <CardBody className="p-5">
                <Row>
                  <Col xs="12" className="mb-3">
                    <div className="font-xl font-weight-bold text-pinion-primary">Forgot Password</div>
                  </Col>
                  <Col xs="12" className="mb-3">
                    <Label>Email</Label>
                    <Input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} placeholder="Input your email account..." />
                  </Col>
                  <Col xs="12" className="d-flex justify-content-center">
                    <Button color="pinion-primary" onClick={handleSubmit}>Send</Button>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </PageLayoutAuth>
    </LandingPageProvider>
  )
}

export default ForgotPassword;
