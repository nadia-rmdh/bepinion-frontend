import React, { useCallback, useEffect, useRef, useState } from "react"
import { Card, CardBody, Button, Row, Col, Input, Label, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import { toast } from 'react-toastify';
import request from "../../../utils/request";
import PageLayoutAuth from "../../LandingPage/PageLayoutAuth";
import { LandingPageProvider } from "../../LandingPage/context";
import { useHistory, useRouteMatch } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
toast.configure()

function ResetPassword() {
  const history = useHistory();
  const matchRoute = useRouteMatch();
  const homeRef = useRef();
  const aboutRef = useRef();
  const faqRef = useRef();
  const contactRef = useRef();
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [showPassword, setShowPassword] = useState({
    password: false,
    passwordConfirmation: false,
  })

  useEffect(() => {
    request.get('v1/auth/forgot-password/' + matchRoute.params.token)
      .then((res) => {
        if (!res.data.data.isValid) {
          history.replace('/');
        }
      })
      .catch(() => history.replace('/'))
  }, [matchRoute, history])

  const onChangePassword = useCallback((e) => {
    const { value } = e.target
    setPassword(value)
  }, [setPassword])

  const onChangePasswordConfirmation = useCallback((e) => {
    const { value } = e.target
    setPasswordConfirmation(value)
  }, [setPasswordConfirmation])

  const handleSubmit = useCallback(() => {
    request.put('v1/auth/forgot-password/' + matchRoute.params.token, { newPassword: password })
      .then(() => {
        toast.success('Password successfully changed.')
        history.replace('/')
      })
      .catch((error) => toast.error(error.response.data.message))
  }, [password, matchRoute, history])

  return (
    <LandingPageProvider value={{ homeRef, aboutRef, faqRef, contactRef }}>
      <PageLayoutAuth>
        <Row style={{ height: '90vh' }}>
          <Col xs={12} className="d-flex align-items-center justify-content-center">
            <Card className="w-50 rounded-5">
              <CardBody className="p-5">
                <Row>
                  <Col xs="12" className="mb-3">
                    <div className="font-xl font-weight-bold text-pinion-primary">Change Your Password</div>
                  </Col>
                  <Col xs="12">
                    <Row className="my-3">
                      <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                        <Label>Password</Label>
                      </Col>
                      <Col xs="12" md="8" lg="9">
                        <InputGroup>
                          <Input type={showPassword.password ? 'text' : 'password'} name="password" id="password" value={password} onChange={(e) => onChangePassword(e)} placeholder="******" />
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText className="bg-transparent">
                              <FontAwesomeIcon icon={showPassword.password ? 'eye-slash' : 'eye'} onClick={() => setShowPassword(old => ({ ...old, password: !old.password }))} />
                            </InputGroupText>
                          </InputGroupAddon>
                        </InputGroup>
                      </Col>
                    </Row>
                  </Col>
                  <Col xs="12">
                    <Row className="my-3">
                      <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                        <Label>Password Confirmation</Label>
                      </Col>
                      <Col xs="12" md="8" lg="9">
                        <InputGroup>
                          <Input type={showPassword.passwordConfirmation ? 'text' : 'password'} name="passwordConfirmation" id="passwordConfirmation" value={passwordConfirmation} onChange={(e) => onChangePasswordConfirmation(e)} placeholder="******" />
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText className="bg-transparent">
                              <FontAwesomeIcon icon={showPassword.passwordConfirmation ? 'eye-slash' : 'eye'} onClick={() => setShowPassword(old => ({ ...old, passwordConfirmation: !old.passwordConfirmation }))} />
                            </InputGroupText>
                          </InputGroupAddon>
                        </InputGroup>
                        {password !== passwordConfirmation && <small className="text-danger">Passwords do not match</small>}
                      </Col>
                    </Row>
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

export default ResetPassword;
