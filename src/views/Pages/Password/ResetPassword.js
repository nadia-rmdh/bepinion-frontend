import React, { useState, Fragment } from "react"
import { Container, Card, CardBody, CardGroup, Button, Row, Col, Spinner, Alert } from "reactstrap";
import { toast } from 'react-toastify';
import request from "../../../utils/request";
import { Field, Form, Formik } from 'formik'
import { Link } from "react-router-dom";
import FormikInput from '../../../components/Form/FormikInput'
import {
  translate,
} from 'react-switch-lang';
toast.configure()

export default translate(function ResetPassword(props) {
  const { t } = props;
  const token = props.match.params.token
  const [success, setSuccess] = useState(false)
  const formValues = { password: '', passwordConfirmation: '' }
  const formValidate = values => {
    const errors = {}
    if (!values.password.trim()) {
      errors.password = t('isiantdkbolehkosong')
    } else if (values.password.length < 6) {
      errors.password = t('isiantdkkurang6')
    }

    if (values.passwordConfirmation !== values.password) {
      errors.passwordConfirmation = t('isianhrssama')
    }

    return errors;
  }
  const formSubmit = (values, { setSubmitting, setErrors }) => {
    const { password, passwordConfirmation } = values;
    request.put(`v1/auth/password/reset`, { token, password, password_confirmation: passwordConfirmation })
      .then(res => {
        // TODO: Request Api Reset Password
        toast.info(res.data.message)
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
                    render={({ submitForm, isSubmitting, values }) => (
                      <Form>
                        <div className="logo text-center">
                          <img src={require("../../../assets/assets_ari/logo.png")} className="logo-widya-skilloka mb-3" width={100} alt="logo-widya-skilloka" />
                        </div>
                        {success ?
                          <Alert color="info" className="text-center mt-3">
                            <strong>Success</strong><br /><br />
                            <Link to="/login"><Button color="netis-color">{t('kehalaman')} Login <i className="ml-2 fa fa-chevron-right"></i></Button></Link>
                          </Alert> :
                          <Fragment>
                            <Field type="password" label="Buat Password Baru" name="password" id="password" component={FormikInput}></Field>
                            <Field type="password" label="Ulangi Password" name="passwordConfirmation" id="passwordConfirmation" component={FormikInput}></Field>
                            <Button type="submit" className="login-submit" disable={isSubmitting}>
                              {isSubmitting ? <span><Spinner size="sm" className="mr-2" /> {t('buatpassbaru')}  </span> : t('buatpassbaru')}
                            </Button>
                          </Fragment>}
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
});
