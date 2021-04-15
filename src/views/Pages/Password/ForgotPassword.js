import React, { useState, Fragment } from "react"
import { Container, Card, CardBody, CardGroup, Alert, Spinner, Button, Row, Col } from "reactstrap";
import { toast } from 'react-toastify';
import request from "../../../utils/request";
import { Formik, Field, Form } from 'formik'
import { Link } from 'react-router-dom'
import FormikInput from "../../../components/Form/FormikInput";
import {
  translate,
} from 'react-switch-lang';
toast.configure()

export default translate(function ForgotPassword(props) {
  const [success, setSuccess] = useState(false)
  const formValues = { email: '' }
  const formValidate = values => {
    const errors = {}
    if (!values.email) {
      errors.email = 'Cannot Empty'
    }

    return errors;
  }
  const formSubmit = (values, { setSubmitting, setErrors }) => {
    const { email } = values
    request.post(`auth/newpassword/request`, { email })
      .then(res => {
        toast.info('Berhasil melakukan permintaan ubah password')
        setSuccess(true)
      })
      .catch(err => {
        if (err.response?.status === 422) {
          setErrors(err.response.data.errors)
        }
      })
      .finally(() => {
        setSubmitting(false)
      })
  }
  const { t } = props;
  return (
    <div className="app flex-row align-items-center background-login">
      <Container>
        <Row className="justify-content-center">
          <Col sm={8} md={6}>
            <CardGroup>
              <Card className="card-login-form">
                <CardBody>
                  <Formik
                    initialValues={formValues}
                    validate={formValidate}
                    onSubmit={formSubmit}
                    render={({ isSubmitting }) => (
                      <Form>
                        <div className="logo text-center">
                          <img src={require("../../../assets/assets_ari/logo.png")} className="logo-widya-skilloka" alt="logo-widya-skilloka" />
                        </div>

                        {success ?
                          <Alert color="info" className="text-center mt-3">
                            <strong>Success</strong><br /><small>{t('cekemail')}</small><br /><br />
                          </Alert> :
                          <Fragment>
                            <Field type="email" label="Email" name="email" id="email" component={FormikInput} />
                            <Button type="submit" className="login-submit" disabled={isSubmitting}>
                              {isSubmitting ? <span><Spinner size="sm" className="mr-2" /> Loading..</span> : t('kirimpermintaanpass')}
                            </Button>
                          </Fragment>
                        }
                        <div class="mt-5">
                          <Link to="/login"><i className="mr-2 fa fa-chevron-left"></i> {t('kehalaman')} Login</Link>
                        </div>
                      </Form>
                    )}
                  />
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
})
