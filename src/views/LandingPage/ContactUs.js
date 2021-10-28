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
    <div className="position-relative mt-5" style={{ height: '80vh' }} ref={ref}>
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
                  <Label for="organization">Organization</Label>
                </Col>
                <Col xs="12">
                  <Input type="text" name="organization" id="organization" value={values.institution} onChange={(e) => handleChangeInstitution(e)} placeholder="Organization Field (Optional)..." />
                  {touched.institution && errors.institution && <small className="text-danger">{errors.institution}</small>}
                </Col>
              </Row>
            </Col>
            <Col xs="12" md="8">
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
                <Button color="pinion-primary" onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting
                    ? <><Spinner color="light" size="sm" /> Loading... </>
                    : 'Submit'}
                </Button>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default forwardRef(Contact)
