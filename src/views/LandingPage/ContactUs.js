import { useFormik } from 'formik'
import React, { useCallback } from 'react'
import { Row, Col, Input, Label, Button } from "reactstrap";
import * as Yup from 'yup';
import TextareaAutosize from "react-textarea-autosize";

function Contact() {
  const ValidationFormSchema = () => {
    return Yup.object().shape({
      firstName: Yup.string().required().label('First Name'),
      lastName: Yup.string().required().label('Last Name'),
      email: Yup.string().required().email().label('Email'),
      institution: Yup.string().required().label('Institution'),
      message: Yup.string().required().label('Message'),
    })
  }

  const { values, touched, errors, setValues, handleSubmit } = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      institution: '',
      message: '',
    },
    validationSchema: ValidationFormSchema,
    onSubmit: (values, { setSubmitting, setErrors }) => {
      setSubmitting(true)
    }
  })

  const handleChangeFirstName = useCallback((e) => {
    const { value } = e.target;
    setValues(old => ({ ...old, firstName: value }))
  }, [setValues])

  const handleChangeLastName = useCallback((e) => {
    const { value } = e.target;
    setValues(old => ({ ...old, lastName: value }))
  }, [setValues])

  const handleChangeEmail = useCallback((e) => {
    const { value } = e.target;
    setValues(old => ({ ...old, email: value }))
  }, [setValues])

  const handleChangeInstitution = useCallback((e) => {
    const { value } = e.target;
    setValues(old => ({ ...old, institution: value }))
  }, [setValues])

  const handleChangeMessage = useCallback((e) => {
    const { value } = e.target;
    setValues(old => ({ ...old, message: value }))
  }, [setValues])

  return (
    <div className="position-relative h-100 mt-5">
      <div className="position-absolute landing-page-contact w-100 h-100"></div>
      <Row className="p-5">
        <Col xs="12">
          <div className="text-pinion-primary font-8xl font-weight-bold mb-2">Reach Out!</div>
        </Col>
        <Col xs="12">
          <Row>
            <Col xs="12" md="4">
              <Row className="my-3">
                <Col xs="12" className="d-flex align-items-center">
                  <Label for="firstName">First Name</Label>
                </Col>
                <Col xs="12">
                  <Input type="text" name="firstName" id="firstName" value={values.firstName} onChange={(e) => handleChangeFirstName(e)} placeholder="First Name Field..." />
                  {touched.firstName && errors.firstName && <small className="text-danger">{errors.firstName}</small>}
                </Col>
              </Row>
              <Row className="my-3">
                <Col xs="12" className="d-flex align-items-center">
                  <Label for="lastName">Last Name</Label>
                </Col>
                <Col xs="12">
                  <Input type="text" name="lastName" id="lastName" value={values.lastName} onChange={(e) => handleChangeLastName(e)} placeholder="Last Name Field..." />
                  {touched.lastName && errors.lastName && <small className="text-danger">{errors.lastName}</small>}
                </Col>
              </Row>
              <Row className="my-3">
                <Col xs="12" className="d-flex align-items-center">
                  <Label for="email">Email</Label>
                </Col>
                <Col xs="12">
                  <Input type="email" name="email" id="email" value={values.email} onChange={(e) => handleChangeEmail(e)} placeholder="Email Field..." />
                  {touched.email && errors.email && <small className="text-danger">{errors.email}</small>}
                </Col>
              </Row>
              <Row className="my-3">
                <Col xs="12" className="d-flex align-items-center">
                  <Label for="institution">Institution</Label>
                </Col>
                <Col xs="12">
                  <Input type="text" name="institution" id="institution" value={values.institution} onChange={(e) => handleChangeInstitution(e)} placeholder="Institution Field..." />
                  {touched.institution && errors.institution && <small className="text-danger">{errors.institution}</small>}
                </Col>
              </Row>
            </Col>
            <Col xs="8">
              <Row className="my-3">
                <Col xs="12" className="d-flex align-items-center">
                  <Label for="message">Message</Label>
                </Col>
                <Col xs="12">
                  <TextareaAutosize
                    minRows={10}
                    name="message"
                    id="message"
                    className="form-control"
                    placeholder="Message Field..."
                    value={values.message}
                    onChange={(e) => handleChangeMessage(e)}
                  />
                  {touched.message && errors.message && <small className="text-danger">{errors.message}</small>}
                </Col>
              </Row>
              <div className="d-flex justify-content-end">
                <Button color="pinion-primary">
                  Submit
                </Button>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default Contact
