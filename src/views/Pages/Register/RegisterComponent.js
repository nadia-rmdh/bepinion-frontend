import React, { useState, useRef, useMemo } from "react"
import { Form, Spinner, Alert, Input, Button, Row, Col, Modal, ModalHeader, ModalBody } from "reactstrap";
import { toast } from 'react-toastify';
import request from "../../../utils/request";
import { useFormik } from 'formik'
import { Link } from 'react-router-dom'
import * as Yup from 'yup';
// import Select from 'react-select';
import {
    translate,
} from 'react-switch-lang';
import ReCAPTCHA from 'react-google-recaptcha';
const CLIENT_ID = process.env.REACT_APP_GOOGLE_RECAPTCHA_SITE_KEY;

toast.configure()
function RegisterComponent(props) {
    const { t } = props;
    const recaptchaRef = useRef();

    // const [companyData, setCompanyData] = useState(null);
    const [success, setSuccess] = useState(false);
    const [captchaState, setCaptchaState] = useState(recaptchaRef);
    const [hasRegister, setHasRegister] = useState(false);

    const ValidationFormSchema = useMemo(() => {
        return Yup.object().shape({
            companyName: Yup.string().required().label('Nama Perusahaan'),
            // companyDomain: Yup.string().required().label('Website Perusahaan'),
            // companyPhone: Yup.string().required().label('Telepon Perusahaan'),
            userFirstName: Yup.string().required().label('Nama Depan'),
            userLastName: Yup.string().required().label('Nama Belakang'),
            userEmail: Yup.string().required().email('Email harus berupa email yang aktif').label('Email'),
            userPhone: Yup.string().required().label('Nomor Telepon')
        })
    }, [])

    const { values, touched, errors, isSubmitting, ...formik } = useFormik({
        initialValues: {
            companyName: '',
            // companyDomain: '',
            // companyPhone: '',
            // companyType: [],
            userFirstName: '',
            userLastName: '',
            userEmail: '',
            userPhone: '',
            captchaValue: '',
            note: ''
        },
        validationSchema: ValidationFormSchema,
        onSubmit: (values, { setSubmitting }) => {
            console.log('aaa')
            // console.log(recaptchaRef.current)
            setSubmitting(true)
            // if (!values.companyType?.value && !values.companyType?.label) {
            //   errors.companyType = "Bidang Perusahaan tidak boleh kosong"
            //   touched.companyType = true;
            //   toast.error("Data yang anda isikan belum lengkap")
            //   setSubmitting(false)
            //   return
            // }
            if (!values.captchaValue) {
                errors.captchaValue = "Isi Captcha terlebih dahulu"
                touched.captchaValue = true;
                toast.error("Isikan Captcha terlebih dahulu");
                setSubmitting(false)
                return
            }
            request.post(`v1/company/create/request`, {
                ...values,
                // companyType: values.companyType?.value,
                // companyTypeName: values.companyType?.label
            })
                .then(res => {
                    formik.handleReset();
                    setSuccess(true)
                    setCaptchaState(null);
                    toast.success('Sukses Melakukan Registrasi', { autoClose: 3000 })
                })
                .catch(err => {
                    if(err.response.status === 422){
                        setHasRegister(true)
                        return;
                    }
                    else{
                        toast.error('Gagal melakukan Registrasi', { autoClose: 3000 })
                        return;
                    }
                })
                .finally(() => {
                    setSubmitting(false)
                })
        }
    })

    // useEffect(() => {
    //   request.get(`v1/master/company-types`)
    //     .then((res) => {
    //       setCompanyData(res.data.data)
    //     })
    //     .catch((err) => {
    //       if (err.response) {
    //         toast.error('Load Data Error. Please Refresh !', { autoClose: 2000 });
    //       }
    //     })
    // }, []);

    // const companyOption = companyData?.map(option =>
    //   ({ value: option.id, label: option.name })
    // )

    // const changeCompanyType = function (value) {
    //   formik.setFieldValue('companyType', value)
    //   formik.setFieldTouched('companyType', true)
    // }

    const handleNumberOnly = (evt) => {
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            evt.preventDefault()
        }

        return true;
    }

    return (
        <>
        <Form onSubmit={formik.handleSubmit}>
            {props.logo ?
                <div className="logo text-center">
                    <img src={require("../../../assets/assets_ari/logo.png")} className="logo-widya-skilloka" alt="logo-widya-skilloka" />
                </div>
                : null
            }
            {success ?
                <Alert color="info" className="text-center mt-3">
                    <p>Silahkan tunggu Admin melakukan verifikasi pada data Anda</p>
                    <Button color="netis-color" onClick={() => setSuccess(false)}>
                        OK
                    </Button>
                </Alert>
                :
                <>
                    {/* <h5><b>Data {t('perusahaan')}</b></h5> */}
                    <Row>
                        {/* <Col sm="6" className="mb-3">
                            <Input
                              type="input"
                              value={values.companyDomain}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              name="companyDomain"
                              id="companyDomain"
                              maxLength="255"
                              placeholder={t('websiteperusahaan')}
                            />
                            {(errors.companyDomain && touched.companyDomain) && <small className="text-danger">{errors.companyDomain}</small>}
                          </Col> */}
                        {/* <Col sm="6" className="mb-3">
                                <Label htmlFor="companyPhone" className="input-label">{t('teleponperusahaan')} <span className="required">*</span></Label>
                                <div className="input-group">
                                  <div className="input-group-prepend">
                                    <span className="input-group-text">+</span>
                                  </div>
                                  <Input
                                    onKeyPress={handleNumberOnly}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    pattern="[0-9]*"
                                    inputMode="numeric"
                                    type="text"
                                    className="form-control"
                                    name="companyPhone"
                                    id="companyPhone"
                                    placeholder="62"
                                  />
                                </div>
                                {(errors.companyPhone && touched.companyPhone) && <small className="text-danger">{errors.companyPhone}</small>}
                              </Col>
                              <Col sm="6" className="mb-3">
                                <Label htmlFor="companyType" className="input-label">{t('bidangperusahaan')} <span className="required">*</span></Label>
                                <Select
                                  isSearchable={true}
                                  name="companyType"
                                  id="companyType"
                                  onChange={changeCompanyType}
                                  onBlur={formik.handleBlur}
                                  value={values.companyType}
                                  options={companyOption}
                                  className="needs-validation"
                                  required
                                />
                                {(errors.companyType && touched.companyType) && <small className="text-danger">{errors.companyType}</small>}
                              </Col> */}
                        {/* </Row> */}
                        {/* <hr /> */}
                        {/* <h5><b>{t('datadirianda')}</b></h5> */}
                        {/* <Row> */}
                        <Col sm="6" className="mb-3">
                            <Input
                                type="input"
                                value={values.userFirstName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                name="userFirstName"
                                id="userFirstName"
                                maxLength="255"
                                placeholder={t('namadepan') + '*'}
                            />
                            {(errors.userFirstName && touched.userFirstName) && <small className="text-danger">{errors.userFirstName}</small>}
                        </Col>
                        <Col sm="6" className="mb-3">
                            <Input
                                type="input"
                                value={values.userLastName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                name="userLastName"
                                id="userLastName"
                                maxLength="255"
                                placeholder={t('namabelakang') + '*'}
                            />
                            {(errors.userLastName && touched.userLastName) && <small className="text-danger">{errors.userLastName}</small>}
                        </Col>
                        <Col sm="12" className="mb-3">
                            <Input
                                type="input"
                                value={values.companyName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                name="companyName"
                                id="companyName"
                                maxLength="255"
                                placeholder={t('namaperusahaan') + '*'}
                            />
                            {(errors.companyName && touched.companyName) && <small className="text-danger">{errors.companyName}</small>}
                        </Col>
                        <Col sm="12" className="mb-3">
                            <Input
                                type="email"
                                value={values.userEmail}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                name="userEmail"
                                id="userEmail"
                                maxLength="255"
                                placeholder="Email*"
                            />
                            {(errors.userEmail && touched.userEmail) && <small className="text-danger">{errors.userEmail}</small>}
                        </Col>
                        <Col sm="12" className="mb-3">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">+</span>
                                </div>
                                <Input
                                    onKeyPress={handleNumberOnly}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    pattern="[0-9]*"
                                    inputMode="numeric"
                                    type="text"
                                    className="form-control"
                                    name="userPhone"
                                    id="userPhone"
                                    placeholder="No. HP*"
                                />
                            </div>
                            {(errors.userPhone && touched.userPhone) && <small className="text-danger">{errors.userPhone}</small>}
                        </Col>
                        <Col sm="12" className="mb-3">
                            <Input
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                type="textarea"
                                className="form-control"
                                style={{
                                    border: "1px solid #305574",
                                    borderRadius: 8,
                                    height: 130
                                }}
                                name="note"
                                id="note"
                                placeholder="Keterangan"
                            />
                        </Col>
                    </Row>
                    {/* {console.log(CLIENT_ID)} */}
                    <div className="d-flex mt-3">
                        <div className="mx-auto">{CLIENT_ID !== undefined &&
                            (<ReCAPTCHA ref={captchaState} className="text-center"
                                sitekey={CLIENT_ID}
                                onChange={(value) => {
                                    formik.setFieldValue('captchaValue', value);
                                    formik.setFieldTouched('captchaValue', true);
                                    formik.setFieldError('captchaValue', '');
                                }}
                                onExpired={() => {
                                    formik.setFieldValue('captchaValue', '')
                                    formik.setFieldError('captchaValue', 'Recaptcha is expired, please check again.')
                                }} />)
                        }
                            {(errors.captchaValue && touched.captchaValue) && <small className="text-danger">{errors.captchaValue}</small>}
                        </div>
                    </div>
                    <Button type="submit" className="login-submit mt-3" disabled={isSubmitting}>
                        {isSubmitting ? <span><Spinner size="sm" className="mr-2" /> Loading</span> : props.register}
                    </Button>
                </>
            }
            {props.login ?
                <div className="mt-5">
                    <Link to="/login"><i className="mr-2 fa fa-chevron-left"></i> {t('kehalaman')} Login</Link>
                </div>
                : null
            }
        </Form>
        <Modal isOpen={hasRegister} className="modal-md" centered>
            <ModalHeader toggle={() => setHasRegister(false)} className="border-bottom-0">
            </ModalHeader>
            <ModalBody className="pt-0 pb-5">
                <div className="row justify-content-center">
                    <div className="col-12">
                        <div className="text-center" style={{ borderRadius: "5px" }}>
                            <i className="fa fa-2x fa-exclamation-triangle mb-2" style={{ color: "#335877" }} />
                            <h5 className="my-3 font-weight-bold">
                                Email yang Anda gunakan sudah terdaftar pada Aikrut
                            </h5>
                        </div>
                    </div>
                    <Button onClick={() => setHasRegister(false)} color="netis-color">Oke</Button>
                </div>
            </ModalBody>
        </Modal>
        </>
    );
}

export default translate(RegisterComponent);
