import React, { useState, useRef } from 'react';
import { Formik, Form, Field } from 'formik';
import { Spinner } from 'reactstrap';
import InputField from '../components/InputField';
import ReCAPTCHA from "react-google-recaptcha"
import { ReactComponent as SendOutlineIcon } from '../../../assets/img/send-outline.svg';
import request from '../../../utils/request';

function ContactFormCard(props) {

    const [submitted, setSubmitted] = useState(false);
    const recaptchaRef = useRef();

    function submitForm(values) {
        return request.post('v1/contact-form', values).then(res => {
            setSubmitted(true);
        }).catch(err => {
            if (err.response?.status !== 422) {
                return;
            }

            return Promise.reject(err.response.data.errors);
        });
    }

    return (
    <div className="card card-body shadow rounded-12 border-0">
        {submitted ? <React.Fragment>
            <div className="alert alert-success">
                <strong>Terima kasih</strong> Pesan anda sangat berarti bagi kami.<br />
                Kami akan memberikan respon melalui email dalam waktu kurang dari 2 hari kerja.
            </div>
            <div className="text-center">
                <button className="btn btn-netis-primary" onClick={() => setSubmitted(false)}>Kirim Pesan Lagi <i className="fa ml-2 fa-chevron-right"></i></button>
            </div>
        </React.Fragment> :
        <Formik
            initialValues={{ name: '', email: '', subject: '', message: '', captchaValue: '' }}
            validate={(values) => {
                const errors = {};
                for (let field of Object.keys(values)) {
                    if (field === 'captchaValue' && !values[field]) {
                        errors[field] = 'Maaf, kita ingin memastikan bahwa anda bukan robot.';
                        continue;
                    }
                    if (values[field].trim() === '') {
                        errors[field] = 'Isian tidak boleh kosong.';
                        continue;
                    }
                    if (field === 'email' && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                        errors[field] = 'Isian harus diisi dengan email yang valid.'
                    }
                }

                return errors;
            }}
            onSubmit={(values, { setSubmitting, setErrors }) => {
                setSubmitting(true);
                submitForm(values).catch(errors => {
                    setErrors(errors);
                    recaptchaRef.reset();
                }).finally(() => setSubmitting(false));
            }}
            render={({ values, setFieldValue, setFieldError, errors, touched, setFieldTouched, isSubmitting }) => (
                <Form>
                    <Field  name="name" type="text" label="Nama Anda" placeholder="Nama Anda" required={true} autoFocus={true} disabled={isSubmitting} component={InputField} />
                    <Field  name="email" type="email" label="Alamat Email" placeholder="Alamat Email" required={true} disabled={isSubmitting} component={InputField} />
                    <Field  name="subject" type="text" label="Subjek" placeholder="Subjek" required={true} disabled={isSubmitting} component={InputField} />
                    <Field  name="message" type="textarea" rows="4" label="Pesan Anda" placeholder="Pesan anda kepada kami" required={true} disabled={isSubmitting} component={InputField} />
                    <div className="d-flex flex-column justify-content-center">
                        <div className="mx-auto">{process.env.REACT_APP_GOOGLE_RECAPTCHA_SITE_KEY !== undefined &&
                            (<ReCAPTCHA ref={recaptchaRef} className="text-center"
                                sitekey={process.env.REACT_APP_GOOGLE_RECAPTCHA_SITE_KEY}
                                onChange={(value) => {
                                    setFieldValue('captchaValue', value);
                                    setFieldTouched('captchaValue', true);
                                    setFieldError('captchaValue', '');
                                    console.log(value, values, errors)
                                }}
                                onExpired={() => {
                                    setFieldValue('captchaValue', '')
                                    setFieldError('captchaValue', 'Recaptcha is expired, please check again.')
                                }}/>)
                        }
                        {(errors.captchaValue && touched.captchaValue) && <small className="text-danger">{errors.captchaValue}</small>}
                        </div>
                        <div className="text-center mt-3">
                        <button className="btn px-5 btn-lg btn-netis-primary d-inline-flex" type="submit">
                            {isSubmitting ?
                                <span><Spinner size="sm" className="mr-2" /> Sedang diteruskan...</span> :
                                <React.Fragment>Kirim <span className="ml-2" style={{ height: 16, width: 16 }}><SendOutlineIcon/></span></React.Fragment>
                            }
                        </button>
                        </div>
                    </div>
                </Form>
            )}
        />}
    </div>
    );
}

export default ContactFormCard;
