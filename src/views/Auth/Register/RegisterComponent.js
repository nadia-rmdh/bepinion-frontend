import React, { useState, useRef, useMemo } from "react"
import { Form, Spinner, Alert, Input, Button, Row, Col, Modal, ModalHeader, ModalBody, Label } from "reactstrap";
import { toast } from 'react-toastify';
import request from "../../../utils/request";
import { useFormik } from 'formik'
import { Link } from 'react-router-dom'
import * as Yup from 'yup';
// import Select from 'react-select';
import {
    translate,
} from 'react-switch-lang';

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
            fullName: Yup.string().required().label('Nama Lengkap'),
            email: Yup.string().email('Email harus berupa email yang aktif').required().label('Email'),
            phoneNumber: Yup.string().required().label('No HP'),
            password: Yup.string().required().label('Password'),
            confirmPassword: Yup.string().required()
                .test('MustBeSame', "Isikan Password dengan sesuai", function (value) {
                    return value === this.parent.password;
                })
                .label('Konfirmasi Password')
        })
    }, [])

    const { values, touched, errors, isSubmitting, ...formik } = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
            phoneNumber: '',
            captchaValue: ''
        },
        validationSchema: ValidationFormSchema,
        onSubmit: (values, { setSubmitting }) => {
            setSubmitting(true)
            if (!values.captchaValue) {
                errors.captchaValue = "Isi Captcha terlebih dahulu"
                touched.captchaValue = true;
                toast.error("Isikan Captcha terlebih dahulu");
                setSubmitting(false)
                return
            }
            request.post(`v1/auth/register`, {
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
                    if (err.response.status === 422) {
                        setHasRegister(true)
                        return;
                    }
                    else {
                        toast.error('Gagal melakukan Registrasi', { autoClose: 3000 })
                        return;
                    }
                })
                .finally(() => {
                    setSubmitting(false)
                })
        }
    })


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
                <h5><b>Daftar Akun Baru</b></h5>
                <h6>Daftar akun baru untuk kolaborasi yang lebih luas</h6><br />
                <Row className="mt-2 input-form">
                    <Col sm="6" className="mb-3">
                        <Label htmlFor="fullName" className="input-label">Nama Lengkap</Label>
                        <Input
                            className="form-control"
                            type="input"
                            value={values.fullName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name="fullName"
                            id="fullName"
                            maxLength="255"
                            placeholder="Nama Lengkap"
                        />
                        {(errors.fullName && touched.fullName) && <small className="text-danger">{errors.fullName}</small>}
                    </Col>
                    <Col sm="6" className="mb-3">
                        <Label htmlFor="email" className="input-label">Email</Label>
                        <Input
                            className="form-control"
                            type="input"
                            value={values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name="email"
                            id="email"
                            maxLength="255"
                            placeholder="Email"
                        />
                        {(errors.email && touched.email) && <small className="text-danger">{errors.email}</small>}
                    </Col>
                    <Col sm="6" className="mb-3">
                        <Label htmlFor="password" className="input-label">Password</Label>
                        <Input
                            className="form-control"
                            type="password"
                            autoComplete="new-password"
                            value={values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name="password"
                            id="password"
                            maxLength="255"
                            placeholder="Password"
                        />
                        {(errors.password && touched.password) && <small className="text-danger">{errors.password}</small>}
                    </Col>
                    <Col sm="6" className="mb-3">
                        <Label htmlFor="confirmPassword" className="input-label">Ulangi Password</Label>
                        <Input
                            className="form-control"
                            type="password"
                            autoComplete="new-password"
                            value={values.confirmPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name="confirmPassword"
                            id="confirmPassword"
                            maxLength="255"
                            placeholder="Ulangi Password"
                        />
                        {(errors.confirmPassword && touched.confirmPassword) && <small className="text-danger">{errors.confirmPassword}</small>}
                    </Col>
                    <Col sm="6" className="mb-3">
                        <Label htmlFor="phoneNumber" className="input-label">No. HP</Label>
                        <Input
                            onKeyPress={handleNumberOnly}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            pattern="[0-9]*"
                            inputMode="numeric"
                            type="text"
                            className="form-control"
                            name="phoneNumber"
                            id="phoneNumber"
                            placeholder="No. HP*"
                        />
                        {(errors.phoneNumber && touched.phoneNumber) && <small className="text-danger">{errors.phoneNumber}</small>}
                    </Col>
                    <Col sm="6" className="d-none d-md-block mb-3" />
                    <Col sm="6" className="d-none d-md-block my-3" />
                    <Col md="6" className="mb-3">
                        <Button type="submit" className="login-submit mt-3" disabled={isSubmitting} style={{ borderRadius: '8px' }}>
                            {isSubmitting ? <span><Spinner size="sm" className="mr-2" /> Loading</span> : props.register}
                        </Button>
                    </Col>
                </Row>
            </Form>
            <Modal isOpen={hasRegister} className="modal-md" centered>
                <ModalHeader toggle={() => setHasRegister(false)} className="border-bottom-0">
                </ModalHeader>
                <ModalBody className="pt-0 pb-5">
                    <div className="row justify-content-center">
                        <div className="col-12">
                            <div className="text-center" style={{ borderRadius: "5px" }}>
                                <i className="fa fa-2x fa-exclamation-triangle mb-2" style={{ color: "#372974" }} />
                                <h5 className="my-3 font-weight-bold">
                                    Email yang Anda gunakan sudah terdaftar
                                </h5>
                            </div>
                        </div>
                        <Button style={{ borderRadius: '8px' }} className="px-4 mt-3" onClick={() => setHasRegister(false)} color="netis-color">Oke</Button>
                    </div>
                </ModalBody>
            </Modal>
        </>
    );
}

export default translate(RegisterComponent);
