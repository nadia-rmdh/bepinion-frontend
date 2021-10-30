import React, { useCallback, useRef, useState, useEffect } from "react"
import { toast } from "react-toastify";
import { Card, CardBody, Row, Col, Button, Label, Input, InputGroup, InputGroupAddon, InputGroupText, CustomInput } from "reactstrap";
import noImage from '../../../../assets/illustrations/image-error.png'
import { Stats } from "../Components/Navigation";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import request from "../../../../utils/request";

export default (props) => {
    const npwpFile = useRef(null)
    const regIdFile = useRef(null)
    const photoFile = useRef(null)
    const [showPassword, setShowPassword] = useState({
        password: false,
        passwordConfirmation: false,
    })
    const [userAggrement, setUserAggrement] = useState(null)

    useEffect(() => {
        request.get('v1/user-agreement?isUsed=1')
            .then((res) => {
                setUserAggrement(res.data.data)
            })
    }, [])

    const ValidationFormSchema = () => {
        let file;
        if (props.registrationForm === 'professional') file = { regId: Yup.string().required().label('Registrant ID File') }
        if (props.registrationForm === 'business') file = { npwp: Yup.string().required().label('Npwp File') }
        if (props.registrationForm === 'individual') file = { npwp: Yup.string().required().label('Npwp File'), regId: Yup.string().required().label('Registrant ID File') }

        return Yup.object().shape({
            ...file,
            password: Yup.string().required().label('Password'),
            passwordConfirmation: Yup.string().required('Password Confirmation is a required field').oneOf([Yup.ref('password'), null], 'Passwords must match'),
            confirmed: Yup.boolean().oneOf([true], "You must accept the terms and conditions"),
            privacy: Yup.boolean().oneOf([true], "You must accept the Pinion's User Agreement and Privacy Policy"),
        })
    }

    const { values: verificationData, touched, errors, setValues: setVerificationData, handleSubmit } = useFormik({
        initialValues: {
            npwp: '',
            regId: '',
            photo: '',
            password: '',
            passwordConfirmation: '',
            confirmed: false,
            privacy: false,
        },
        validationSchema: ValidationFormSchema,
        onSubmit: (values, { setSubmitting, setErrors }) => {
            setSubmitting(true)
            props.onSubmitForm(values)
            props.onFinishRegistration()
        }
    })

    const onErrorImage = useCallback((e) => {
        e.target.src = noImage;
        e.target.onerror = null;
    }, [])

    const onChangeNpwpFile = useCallback((e) => {
        e.preventDefault();
        const { files } = e.target
        if (files[0].size > 5242880) {
            toast.error('Maximum file size is 5mb')
            return;
        }
        setVerificationData(old => ({ ...old, npwp: { preview: URL.createObjectURL(files[0]), file: files[0] } }))
    }, [setVerificationData])

    const onChangeRegIdFile = useCallback((e) => {
        e.preventDefault();
        const { files } = e.target
        if (files[0].size > 5242880) {
            toast.error('Maximum file size is 5mb')
            return;
        }
        setVerificationData(old => ({ ...old, regId: { preview: URL.createObjectURL(files[0]), file: files[0] } }))
    }, [setVerificationData])

    const onChangePhotoFile = useCallback((e) => {
        e.preventDefault();
        const { files } = e.target
        if (files[0].size > 5242880) {
            toast.error('Maximum file size is 5mb')
            return;
        }
        setVerificationData(old => ({ ...old, photo: { preview: URL.createObjectURL(files[0]), file: files[0] } }))
    }, [setVerificationData])

    const onChangePassword = useCallback((e) => {
        const { value } = e.target
        setVerificationData(old => ({ ...old, password: value }))
    }, [setVerificationData])

    const onChangePasswordConfirmation = useCallback((e) => {
        const { value } = e.target
        setVerificationData(old => ({ ...old, passwordConfirmation: value }))
    }, [setVerificationData])

    const onChangeConfirmation = useCallback((e) => {
        const { checked } = e.target
        setVerificationData(old => ({ ...old, confirmed: checked }))
    }, [setVerificationData])

    const onChangePrivacy = useCallback((e) => {
        const { checked } = e.target
        setVerificationData(old => ({ ...old, privacy: checked }))
    }, [setVerificationData])

    return (
        <Row>
            <Col xs="12">
                <Card className="shadow-sm verification-process-form">
                    <CardBody>
                        <Row className="px-md-5">
                            <Col xs="12" className="mb-3">
                                <div className="font-xl font-weight-bold text-uppercase">Verification Process</div>
                            </Col>
                            <Col xs="12">
                                <Row className="my-3">
                                    <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                        <Label>Registrant NPWP</Label>
                                    </Col>
                                    <Col xs="12" md="8" lg="9">
                                        <div style={{ width: '200px', height: '200px' }}>
                                            {verificationData?.npwp?.preview && <img src={verificationData?.npwp?.preview} alt="npwp" style={{ objectFit: 'cover', position: 'absolute', width: '200px', height: '200px' }} onError={(e) => onErrorImage(e)} />}
                                            <input type='file' ref={npwpFile} style={{ display: 'none' }} onChange={(e) => onChangeNpwpFile(e)} accept="image/png, image/gif, image/jpeg" />
                                            <Button
                                                className={`btn border-0 upload-file-button ${verificationData?.npwp?.preview && 'filled'}`}
                                                onClick={() => npwpFile.current.click()}
                                            >
                                                <i className="fa fa-2x fa-camera" />
                                                <br />
                                                <div className="text-center d-none d-md-block">
                                                    Upload
                                                    <br />
                                                    <small>Max. 5 MB</small>
                                                </div>
                                            </Button>
                                        </div>
                                        {touched.npwp && errors.npwp && <small className="text-danger">{errors.npwp}</small>}
                                    </Col>
                                </Row>
                            </Col>
                            {(props.registrationForm === 'professional' || props.registrationForm === 'individual') &&
                                <Col xs="12">
                                    <Row className="my-3">
                                        <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                            <Label>Registrant ID</Label>
                                        </Col>
                                        <Col xs="12" md="8" lg="9">
                                            <div style={{ width: '200px', height: '200px' }}>
                                                {verificationData?.regId?.preview && <img src={verificationData?.regId?.preview} alt="regId" style={{ objectFit: 'cover', position: 'absolute', width: '200px', height: '200px' }} onError={(e) => onErrorImage(e)} />}
                                                <input type='file' ref={regIdFile} style={{ display: 'none' }} onChange={(e) => onChangeRegIdFile(e)} accept="image/png, image/gif, image/jpeg" />
                                                <Button
                                                    className={`btn border-0 upload-file-button ${verificationData?.regId?.preview && 'filled'}`}
                                                    onClick={() => regIdFile.current.click()}
                                                >
                                                    <i className="fa fa-2x fa-camera" />
                                                    <br />
                                                    <div className="text-center d-none d-md-block">
                                                        Upload
                                                        <br />
                                                        <small>Max. 5 MB</small>
                                                    </div>
                                                </Button>
                                            </div>
                                            {touched.regId && errors.regId && <small className="text-danger">{errors.regId}</small>}
                                        </Col>
                                    </Row>
                                </Col>
                            }
                            {props.registrationForm === 'professional' &&
                                <Col xs="12">
                                    <Row className="my-3">
                                        <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                            <Label>Photo Profile</Label>
                                        </Col>
                                        <Col xs="12" md="8" lg="9">
                                            <div style={{ width: '200px', height: '200px' }}>
                                                {verificationData?.photo?.preview && <img src={verificationData?.photo?.preview} alt="profile" style={{ objectFit: 'cover', position: 'absolute', width: '200px', height: '200px' }} onError={(e) => onErrorImage(e)} />}
                                                <input type='file' ref={photoFile} style={{ display: 'none' }} onChange={(e) => onChangePhotoFile(e)} accept="image/png, image/gif, image/jpeg" />
                                                <Button
                                                    className={`btn border-0 upload-file-button ${verificationData?.photo?.preview && 'filled'}`}
                                                    onClick={() => photoFile.current.click()}
                                                >
                                                    <i className="fa fa-2x fa-camera" />
                                                    <br />
                                                    <div className="text-center d-none d-md-block">
                                                        Upload
                                                        <br />
                                                        <small>Max. 5 MB</small>
                                                    </div>
                                                </Button>
                                            </div>
                                            {touched.photo && errors.photo && <small className="text-danger">{errors.photo}</small>}
                                        </Col>
                                    </Row>
                                </Col>
                            }
                        </Row>
                    </CardBody>
                </Card>
            </Col>
            <Col xs="12">
                <Card className="shadow-sm verification-process-form">
                    <CardBody>
                        <Row className="px-md-5">
                            <Col xs="12" className="mb-3">
                                <div className="font-xl font-weight-bold text-uppercase">Password</div>
                            </Col>
                            <Col xs="12">
                                <Row className="my-3">
                                    <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                        <Label>Password</Label>
                                    </Col>
                                    <Col xs="12" md="8" lg="9">
                                        <InputGroup>
                                            <Input type={showPassword.password ? 'text' : 'password'} name="password" id="password" value={verificationData.password} onChange={(e) => onChangePassword(e)} placeholder="******" />
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText className="bg-transparent">
                                                    <FontAwesomeIcon icon={showPassword.password ? 'eye-slash' : 'eye'} onClick={() => setShowPassword(old => ({ ...old, password: !old.password }))} />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                        </InputGroup>
                                        {touched.password && errors.password && <small className="text-danger">{errors.password}</small>}
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
                                            <Input type={showPassword.passwordConfirmation ? 'text' : 'password'} name="passwordConfirmation" id="passwordConfirmation" value={verificationData.passwordConfirmation} onChange={(e) => onChangePasswordConfirmation(e)} placeholder="******" />
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText className="bg-transparent">
                                                    <FontAwesomeIcon icon={showPassword.passwordConfirmation ? 'eye-slash' : 'eye'} onClick={() => setShowPassword(old => ({ ...old, passwordConfirmation: !old.passwordConfirmation }))} />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                        </InputGroup>
                                        {touched.passwordConfirmation && errors.passwordConfirmation && <small className="text-danger">{errors.passwordConfirmation}</small>}
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
            <Col xs="12">
                <Card className="shadow-sm verification-process-form">
                    <CardBody>
                        <Row className="px-md-5">
                            <Col xs="12" className="mb-3">
                                <div className="font-xl font-weight-bold text-uppercase">APPLICATION</div>
                            </Col>
                            <Col xs="12">
                                <Row className="my-3">
                                    <Col xs="12">
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText className="bg-transparent border-0 px-0">
                                                    <CustomInput type="checkbox" id="confirmed" checked={verificationData.confirmed} onChange={(e) => onChangeConfirmation(e)} />
                                                </InputGroupText>
                                                <Label for="confirmed" className={`d-flex bg-transparent p-0 m-0 align-items-center ${touched.confirmed && errors.confirmed && 'text-danger'}`} style={{ whiteSpace: 'normal' }}>
                                                    I have reviewed and confirmed that this data is correct
                                                </Label>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs="12">
                                <Row className="my-3">
                                    <Col xs="12">
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText className="bg-transparent border-0 px-0">
                                                    <CustomInput type="checkbox" id="privacy" checked={verificationData.privacy} onChange={(e) => onChangePrivacy(e)} />
                                                </InputGroupText>
                                                <a href={userAggrement?.records[0].link ?? ''} target="_blank" rel="noopener noreferrer" for="privacy" className={`d-flex bg-transparent p-0 m-0 align-items-center text-dark ${touched.privacy && errors.privacy && 'text-danger'}`} style={{ whiteSpace: 'normal', textDecoration: 'underline' }}>
                                                    I confirm that I have read, consent and agree to Pinion's User Agreement and Privacy Policy
                                                </a>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
            <Col xs="12"><Stats step={props.step} {...props} nextStep={handleSubmit} /></Col>
        </Row >
    );
}
