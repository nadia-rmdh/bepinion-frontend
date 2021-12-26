import { useFormik } from 'formik'
import React, { useCallback, forwardRef } from 'react'
import { Row, Col, Input, Label, Button, Spinner } from "reactstrap";
import * as Yup from 'yup';
import TextareaAutosize from "react-textarea-autosize";
import request from '../../utils/request';
import { toast } from 'react-toastify';

function Contact(props, ref) {
  const ValidationFormSchema = () => {
    return Yup.object().shape({
      firstName: Yup.string().required().label('First Name'),
      lastName: Yup.string().required().label('Last Name'),
      email: Yup.string().required().email().label('Email'),
      message: Yup.string().required().label('Message'),
    })
  }

  const { values, touched, errors, setValues, handleSubmit, isSubmitting } = useFormik({
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
      request.post('v1/contact-us', values)
        .then((res) => {
          toast.success('Your message was sent successfully')
        })
        .catch((err) => toast.error('Failed to send message'))
        .finally(() => setSubmitting(false))
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
    <div className="contact position-relative d-flex align-items-center" ref={ref}>
      <div className="position-absolute contact-bg">
      </div>
      <div className="container">
        <Row className="p-0 p-md-5">
          <Col xs="12">
            <Row className="contact-content p-5">
              <Col xs="12">
                <div className="text-center contact-text-1">CONTACT US</div>
              </Col>
              <Col xs="12">
                <div className="text-center contact-text-2 mb-2">Leave us a message</div>
              </Col>
              <Col xs="12" md="6">
                <Row className="my-3">
                  <Col xs="12">
                    <Input className="border-left-0 border-right-0 border-top-0 contact-form" type="text" name="firstName" id="firstName" value={values.firstName} onChange={(e) => handleChangeFirstName(e)} placeholder="First Name" />
                    {touched.firstName && errors.firstName && <small className="text-danger">{errors.firstName}</small>}
                  </Col>
                </Row>
              </Col>
              <Col xs="12" md="6">
                <Row className="my-3">
                  <Col xs="12">
                    <Input className="border-left-0 border-right-0 border-top-0 contact-form" type="text" name="lastName" id="lastName" value={values.lastName} onChange={(e) => handleChangeLastName(e)} placeholder="Last Name" />
                    {touched.lastName && errors.lastName && <small className="text-danger">{errors.lastName}</small>}
                  </Col>
                </Row>
              </Col>
              <Col xs="12" md="6">
                <Row className="my-3">
                  <Col xs="12">
                    <Input className="border-left-0 border-right-0 border-top-0 contact-form" type="email" name="email" id="email" value={values.email} onChange={(e) => handleChangeEmail(e)} placeholder="Email" />
                    {touched.email && errors.email && <small className="text-danger">{errors.email}</small>}
                  </Col>
                </Row>
              </Col>
              <Col xs="12" md="6">
                <Row className="my-3">
                  <Col xs="12">
                    <Input className="border-left-0 border-right-0 border-top-0 contact-form" type="text" name="organization" id="organization" value={values.institution} onChange={(e) => handleChangeInstitution(e)} placeholder="Organization" />
                    {touched.institution && errors.institution && <small className="text-danger">{errors.institution}</small>}
                  </Col>
                </Row>
              </Col>
              <Col xs="12">
                <Row className="my-3">
                  <Col xs="12">
                    <TextareaAutosize
                      minRows={1}
                      name="message"
                      id="message"
                      className="form-control border-left-0 border-right-0 border-top-0 contact-form"
                      value={values.message}
                      onChange={(e) => handleChangeMessage(e)}
                      placeholder="Message"
                    />
                    {touched.message && errors.message && <small className="text-danger">{errors.message}</small>}
                  </Col>
                </Row>
                <div className="d-flex justify-content-center">
                  <Button color="pinion-blue" className="contact-button-send" onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting
                      ? <><Spinner color="light" size="sm" /> Loading... </>
                      : 'Send Email'}
                  </Button>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default forwardRef(Contact)
