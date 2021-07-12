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
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        request.get(`v1/auth/verify/${token}`).then((response) => setSuccess(response.data.success)).catch((error) => toast.error('Load Data Error. Please Refresh !', { autoClose: 2000 }))
    }, [token]);

    return (
        <div className="app flex-row align-items-center background-login" style={{ height: 'auto', padding: 10 }}>
            <Container>
                <Row className="justify-content-center">
                    <Col sm={8} md={9}>
                        <div className="text-center">
                            <img src={require("../../../assets/assets_ari/logo.png")} width="300px" alt="logo-widya-skilloka" /> <br />
                            <img src={require("../../../assets/illustrations/happystate.gif")} width="300px" alt="logo-widya-skilloka" />
                        </div>
                        <div className="d-flex justify-content-center">
                            {success ?
                                <Alert color="success" fade className="text-center mt-3 w-50">
                                    <strong>Verifikasi Email Berhasil</strong>
                                </Alert>
                                :
                                <Alert color="danger" fade className="text-center mt-3 w-50">
                                    <strong>Email sudah diverifikasi, silahkan login</strong>
                                </Alert>
                            }
                        </div>
                        <div className="mt-5 text-center">
                            <Link to="/login"><i className="mr-2 fa fa-chevron-left"></i> {t('kehalaman')} Login</Link>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
})
