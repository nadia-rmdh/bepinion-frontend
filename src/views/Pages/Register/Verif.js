import React, { useState, useEffect, Fragment } from "react"
import { Container, Card, CardBody, CardGroup, Spinner, Button, Alert, Row, Col, Label, Input, Form } from "reactstrap";
import { toast } from 'react-toastify';
import request from "../../../utils/request";
import { Link } from 'react-router-dom'
import {
    translate,
} from 'react-switch-lang';
toast.configure()
export default translate(function Verif(props) {
    const { t } = props;
    const token = props.match.params.token
    const [state, setState] = useState({
        company: []
    });
    const [success, setSuccess] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await request.get(`v1/company/create/verif?token=${token}`)
                let companies = data.data.data
                if (companies === null) {
                    window.location.replace("/login");
                } else {
                    setState({ company: companies })
                    setIsValid(true)
                }
            } catch (err) {
                if (err.response) {
                    toast.error('Load Data Error. Please Refresh !', { autoClose: 2000 });
                }
            }
        }
        fetchData();
    }, [token]);


    function formSubmit() {
        if (state.companyType === null) {
            toast.error(t('isiantdkbolehkosong'))
        } else {
            setIsSubmitting(true)
            request.post(`v1/company/create/verif`, { token })
                .then(res => {
                    setSuccess(true)
                    toast.success('Success Verif', { autoClose: 3000 })
                })
                .catch(err => {
                    if (err.response?.status === 422) {
                        toast.error('Error')
                    }
                })
                .finally(() => {
                    setIsSubmitting(false)
                })
        }
    }

    return (
        <div className="app flex-row align-items-center background-login" style={{ height: 'auto', padding: 10 }}>
            <Container>
                <Row className="justify-content-center">
                    <Col sm={8} md={9}>
                        <CardGroup style={{ height: 'auto' }}>
                            <Card className="card-login-form" >
                                <CardBody style={{ padding: 0 }}>
                                    <Form>
                                        <div className="logo text-center">
                                            <img src={require("../../../assets/assets_ari/logo.png")} className="logo-widya-skilloka" alt="logo-widya-skilloka" />
                                        </div>
                                        {success ?
                                            <Alert color="info" className="text-center mt-3">
                                                <strong>Success {t('verifikasi')}</strong><br />
                                            </Alert> :
                                            <Fragment>
                                                <Row>
                                                    <Col sm="12">
                                                        <Label className="input-label">{t('namaperusahaan')}</Label>
                                                        <Input type="text" value={state.company.companyName} disabled />
                                                    </Col>
                                                    <Col sm="6" className="mt-3">
                                                        <Label className="input-label">{t('namalengkap')}</Label>
                                                        <Input type="text" value={state.company.userFirstName + ' ' + state.company.userLastName} disabled />
                                                        <br />
                                                        <Label className="input-label">Email</Label>
                                                        <Input type="text" value={state.company.userEmail} disabled />
                                                    </Col>
                                                    <Col sm="6" className="mt-3">
                                                        <Label className="input-label">{t('namapanggilan')}</Label>
                                                        <Input type="text" value={state.company.userFirstName} disabled />
                                                        <br />
                                                        <Label className="input-label">{t('telepon')}</Label>
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text">+</span>
                                                            </div>
                                                            <input type="text" className="form-control" value={state.company.userPhone} disabled />
                                                        </div>
                                                    </Col>
                                                    <Col sm="12" className="mt-4">
                                                        <Label className="input-label">{t('Keterangan')}</Label>
                                                        <Input
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
                                                            value={state.company.note}
                                                            disabled
                                                        />
                                                    </Col>
                                                </Row>
                                                {isValid !== false ?
                                                    <Button onClick={() => formSubmit()} className="login-submit" disabled={isSubmitting}>
                                                        {isSubmitting ? <span><Spinner size="sm" className="mr-2" /> Loading</span> : 'Verif Data'}
                                                    </Button>
                                                    : null}
                                            </Fragment>}
                                        <div className="mt-5">
                                            <Link to="/login"><i className="mr-2 fa fa-chevron-left"></i> {t('kehalaman')} Login</Link>
                                        </div>
                                    </Form>
                                </CardBody>
                            </Card>
                        </CardGroup>
                    </Col>
                </Row>
            </Container>
        </div>
    );
})
