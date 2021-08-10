import React, { useCallback, useRef, useState } from "react"
import { toast } from "react-toastify";
import { Card, CardBody, Row, Col, Button, Label, Input, InputGroup, InputGroupAddon, InputGroupText, CustomInput } from "reactstrap";
import noImage from '../../../../assets/illustrations/image-error.png'
export default () => {
    const npwpFile = useRef(null)
    const regIdFile = useRef(null)
    const photoFile = useRef(null)
    const [verificationData, setVerificationData] = useState(
        {
            npwp: null,
            regId: null,
            photo: null,
        }
    )
    const [passwordData, setPasswordData] = useState(
        {
            password: '',
            passwordConfirmation: '',
        }
    )
    const [applicationData, setApplicationData] = useState(
        {
            confirmed: false,
            privacy: false,
        }
    )

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
        setPasswordData(old => ({ ...old, password: value }))
    }, [setPasswordData])

    const onChangePasswordConfirmation = useCallback((e) => {
        const { value } = e.target
        setPasswordData(old => ({ ...old, passwordConfirmation: value }))
    }, [setPasswordData])

    const onChangeConfirmation = useCallback((e) => {
        const { checked } = e.target
        setApplicationData(old => ({ ...old, confirmed: checked }))
    }, [setApplicationData])

    const onChangePrivacy = useCallback((e) => {
        const { checked } = e.target
        setApplicationData(old => ({ ...old, privacy: checked }))
    }, [setApplicationData])

    return (
        <Row>
            <Col xs="12">
                <Card className="shadow-sm verification-process-form">
                    <CardBody>
                        <Row className="px-5">
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
                                    </Col>
                                </Row>
                            </Col>
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
                                    </Col>
                                </Row>
                            </Col>
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
                        <Row className="px-5">
                            <Col xs="12" className="mb-3">
                                <div className="font-xl font-weight-bold text-uppercase">Password</div>
                            </Col>
                            <Col xs="12">
                                <Row className="my-3">
                                    <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                        <Label>Password</Label>
                                    </Col>
                                    <Col xs="12" md="8" lg="9">
                                        <Input type="password" name="password" id="password" value={passwordData.password} onChange={(e) => onChangePassword(e)} placeholder="******" />
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs="12">
                                <Row className="my-3">
                                    <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                        <Label>Password Confirmation</Label>
                                    </Col>
                                    <Col xs="12" md="8" lg="9">
                                        <Input type="password" name="passwordConfirmation" id="passwordConfirmation" value={passwordData.passwordConfirmation} onChange={(e) => onChangePasswordConfirmation(e)} placeholder="******" />
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
                        <Row className="px-5">
                            <Col xs="12" className="mb-3">
                                <div className="font-xl font-weight-bold text-uppercase">APPLICATION</div>
                            </Col>
                            <Col xs="12">
                                <Row className="my-3">
                                    <Col xs="12" className="d-flex align-items-center">
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText className="bg-transparent border-0 px-0">
                                                    <CustomInput type="checkbox" id="confirmed" checked={applicationData.confirmed} onChange={(e) => onChangeConfirmation(e)} />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Label for="confirmed" className="d-flex bg-transparent p-0 m-0 align-items-center">
                                                I have reviewed and confirmed that this data is correct
                                            </Label>
                                        </InputGroup>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs="12">
                                <Row className="my-3">
                                    <Col xs="12" className="d-flex align-items-center">
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText className="bg-transparent border-0 px-0">
                                                    <CustomInput type="checkbox" id="privacy" checked={applicationData.privacy} onChange={(e) => onChangePrivacy(e)} />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Label for="privacy" className="d-flex bg-transparent p-0 m-0 align-items-center">
                                                I confirm that I have read, consent and agree to Pinion's User Agreement and Privacy Policy
                                            </Label>
                                        </InputGroup>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
        </Row >
    );
}
