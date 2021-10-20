import React, { useCallback, useMemo, useRef, useState } from "react"
import { toast } from "react-toastify";
import { Card, CardBody, Row, Col, Button, Label, Spinner } from "reactstrap";
import noImage from '../../../../assets/illustrations/image-error.png'
import { useFormik } from "formik";
import * as Yup from 'yup';

export default (props) => {
    const npwpFile = useRef(null)
    const regIdFile = useRef(null)
    const photoFile = useRef(null)
    const data = props.data;

    const [isEdit,] = useState(false);
    const currentData = useMemo(() => ({
        npwp: { preview: data.npwpImageUrl ?? 'a' },
        regId: { preview: data.identityImageUrl ?? 'a' },
        photo: { preview: data.avatar ?? 'a' },
    }), [data])

    const ValidationFormSchema = () => {
        let file;
        if (props.registrationForm === 'professional') file = { npwp: Yup.string().required().label('Npwp File'), regId: Yup.string().required().label('Registrant ID File'), photo: Yup.string().required().label('Photo Profile File') }
        if (props.registrationForm === 'business') file = { npwp: Yup.string().required().label('Npwp File') }
        if (props.registrationForm === 'individual') file = { npwp: Yup.string().required().label('Npwp File'), regId: Yup.string().required().label('Registrant ID File') }

        return Yup.object().shape({
            ...file,
        })
    }

    const { values: verificationData, touched, errors, setValues: setVerificationData, handleSubmit, isSubmitting } = useFormik({
        initialValues: currentData,
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

    return (
        <Row>
            <Col xs="12">
                <Card className="shadow-sm verification-process-form">
                    <CardBody>
                        <Row className="px-5">
                            <Col xs="12" className="mb-3 d-flex justify-content-between">
                                <div className="font-xl font-weight-bold text-uppercase">Verification Process</div>
                                {/* <Button color={`${isEdit ? 'danger' : 'primary'}`} onClick={() => {
                                    setIsEdit(!isEdit)
                                    setVerificationData(currentData)
                                }} disabled={isEdit && isSubmitting}> <FontAwesomeIcon icon={`${isEdit ? 'times' : 'edit'}`} /> {isEdit ? 'Cancel' : 'Edit'}</Button> */}
                            </Col>
                            <Col xs="12">
                                <Row className="my-3">
                                    <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                        <Label>Registrant NPWP</Label>
                                    </Col>
                                    <Col xs="12" md="8" lg="9">
                                        <div style={{ width: '200px', height: '200px' }}>
                                            {verificationData?.npwp?.preview && <img src={verificationData?.npwp?.preview} alt="npwp" style={{ objectFit: 'cover', position: 'absolute', width: '200px', height: '200px' }} onError={(e) => onErrorImage(e)} />}
                                            <input type='file' ref={npwpFile} style={{ display: 'none' }} disabled={!isEdit || isSubmitting} onChange={(e) => onChangeNpwpFile(e)} accept="image/png, image/gif, image/jpeg" />
                                            {!(!isEdit || isSubmitting) &&
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
                                            }
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
                                                <input type='file' ref={regIdFile} style={{ display: 'none' }} disabled={!isEdit || isSubmitting} onChange={(e) => onChangeRegIdFile(e)} accept="image/png, image/gif, image/jpeg" />
                                                {!(!isEdit || isSubmitting) &&
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
                                                }
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
                                                <input type='file' ref={photoFile} style={{ display: 'none' }} disabled={!isEdit || isSubmitting} onChange={(e) => onChangePhotoFile(e)} accept="image/png, image/gif, image/jpeg" />
                                                {!(!isEdit || isSubmitting) &&
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
                                                }
                                            </div>
                                            {touched.photo && errors.photo && <small className="text-danger">{errors.photo}</small>}
                                        </Col>
                                    </Row>
                                </Col>
                            }
                            {isEdit &&
                                <Col xs="12" className="d-flex justify-content-end">
                                    <Button color="primary" className="float-right" onClick={handleSubmit} disabled={isSubmitting}>{isSubmitting ? <><Spinner color="light" size="sm" /> Loading...</> : "Save"}</Button>
                                </Col>
                            }
                        </Row>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
}
