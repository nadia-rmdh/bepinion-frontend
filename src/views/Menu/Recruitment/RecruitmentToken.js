import { useFormik } from 'formik';
import React, { Fragment, useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Col, Form, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner, Tooltip, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown } from 'reactstrap';
import request from '../../../utils/request';
import { t } from 'react-switch-lang';
import TokenIcon from "./TokenIcon";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TopUpToken from './Token/TopUpToken';
import { useBalance } from '../../../hooks/useBalance';
import moment from "moment";
import { useMediaQuery } from 'react-responsive'
import { useAuthUser, useUserPrivileges } from '../../../store';
import ModalPrivilegeForbidden from '../../../components/ModalPrivilegeForbidden';


function RecruitmentToken({ visible }) {
    const [modalToken, setModalToken] = useState(false)
    const [hasPurchased, setHasPurchased] = useState(false)
    const [hint, setHint] = useState(false)
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const isSmallSize = useMediaQuery({ query: '(max-width: 768px)' })
    const user = useAuthUser();
    const {can} = useUserPrivileges();
    const [forbidden, setForbidden] = useState(false)


    const toggleTooltip = () => setTooltipOpen(!tooltipOpen);
    const toggle = () => {
        if(can('canManagementTopUp')){
            setModalToken(!modalToken)
        }
        else{
            setForbidden(true)
        }
    }
    const toggleHasPurchased = () => {
        setHasPurchased(!hasPurchased)
    }

    const { loading, data } = useBalance();
    const myBalance = data?.balance ?? 0;

    const { values, isSubmitting, setValues, ...formik } = useFormik({
        initialValues: {
            nominal: 0
        },
        onSubmit: (values, { setSubmitting, setErrors }) => {
            setSubmitting(true)
            let formTopUp = new FormData();
            formTopUp.append("type", "topup");
            formTopUp.append("typeId", 0);
            formTopUp.append("balance", values.nominal);
            if (values.nominal === 500) {
                formTopUp.append("amount", 10000000);
            }
            else if (values.nominal === 1000) {
                formTopUp.append("amount", 16000000)
            }
            request.post(`v1/invoice`, formTopUp)
                .then(res => {
                    toast.success(t('Top Up Diproses'));
                    setModalToken(false)
                    setHasPurchased(true)
                    window.open(res.data.url)
                })
                .catch(err => {
                    if (err.response?.status === 422) {
                        setErrors(err.response.data.errors);
                        return;
                    }
                    Promise.reject(err);
                })
                .finally(() => setSubmitting(false));
        }
    })

    const changeNominal = function (e) {
        const value = parseInt(e.target.value);
        formik.setFieldValue('nominal', value)
        formik.setFieldTouched('nominal', true)
    }

    return (
        <>
            {forbidden && <ModalPrivilegeForbidden isOpen={true} isClose={() => setForbidden(false)} forbidden="canManagementTopUp" />}
            <div className="d-flex flex-row nav-token">
                {visible ?
                    <div className={`col-xs-12 col-md-4 ${!isSmallSize ? `tour-history` : ''}`}>
                        <TokenIcon />
                    </div>
                    : null
                }
                <div className={`col-xs-12 col-md-4 ${!isSmallSize ? `tour-topup` : ''}`}>
                    <TopUpToken token={data} />
                </div>
                <div className={`col-xs-12 col-md-4 ${!isSmallSize ? `tour-token` : ''}`}>
                    <div className="my-auto nav-item button-token" disabled={true}>
                        {loading ?
                            <Spinner size="sm" color="primary" className="my-auto" />
                            :
                            <><FontAwesomeIcon icon="coins" className="mr-1" /> <b>{myBalance}</b></>
                        }
                    </div>
                </div>
            </div>

            {/* Mobile */}
            {
                user.guidance.header ?
                    <UncontrolledDropdown nav direction="down" className="nav-token-mobile mr-1">
                        <DropdownToggle nav>
                            <div className="d-flex flex-row">
                                {/* <div className="col-11"> */}
                                <div className={`nav-item button-token ${isSmallSize ? `tour-token` : ''}`}>
                                    {loading ?
                                        <Spinner size="sm" color="primary" className="mx-auto" />
                                        :
                                        <div className="p-1"><FontAwesomeIcon icon="coins" className="mr-1" /> <b>{myBalance}</b></div>
                                    }
                                </div>
                                <div className="my-auto ml-2 font-weight-bold">
                                    <i className="fa fa-2x fa-angle-down" style={{ fontWeight: "bold" }} />
                                </div>
                                {/* </div> */}
                            </div>
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem onClick={toggle} className={isSmallSize ? 'tour-topup' : ''}>
                                <i className="fa fa-plus-square mr-1" /> Top Up
                            </DropdownItem>
                            <Link to="/tokenhistory" style={{ color: "#23282c" }}>
                                <DropdownItem className={isSmallSize ? 'tour-history' : ''}>
                                    <i className={`fa fa-history mr-1`} aria-hidden="true" /> {t('riwayat')}
                                </DropdownItem>
                            </Link>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                :
                    <UncontrolledDropdown isOpen={true} nav direction="down" className="nav-token-mobile mr-1">
                        <DropdownToggle nav>
                            <div className="d-flex flex-row">
                                {/* <div className="col-11"> */}
                                <div className={`nav-item button-token ${isSmallSize ? `tour-token` : ''}`}>
                                    {loading ?
                                        <Spinner size="sm" color="primary" className="mx-auto" />
                                        :
                                        <div className="p-1"><FontAwesomeIcon icon="coins" className="mr-1" /> <b>{myBalance}</b></div>
                                    }
                                </div>
                                <div className="my-auto ml-2 font-weight-bold">
                                    <i className="fa fa-2x fa-angle-down" style={{ fontWeight: "bold" }} />
                                </div>
                                {/* </div> */}
                            </div>
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem disabled={true} className={isSmallSize ? 'tour-topup' : ''}>
                                <i className="fa fa-plus-square mr-1" /> Top Up
                            </DropdownItem>
                            <DropdownItem disabled={true} className={isSmallSize ? 'tour-history' : ''}>
                                <i className={`fa fa-history mr-1`} aria-hidden="true" /> {t('riwayat')}
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
            }
            <Modal isOpen={modalToken} className="token-master">
                <ModalHeader className="border-bottom-0">
                    {t('Top Up Kuota Token')}
                </ModalHeader>
                <Form onSubmit={formik.handleSubmit}>
                    <ModalBody>
                        <div className="d-flex justify-content-between align-middle mb-3">
                            <div className="mt-2">
                                {t('Pilihlah salah satu paket kuota yang anda inginkan')}
                            </div>
                            <Button onClick={() => setHint(!hint)} className="text-nowrap" style={{ backgroundColor: "transparent", border: "transparent" }} id="TooltipExample">
                                <i className="fa fa-lg fa-question-circle text-primary" />
                            </Button>
                            <Tooltip placement="right" isOpen={tooltipOpen} target="TooltipExample" toggle={toggleTooltip}>
                                Kuota token yang Anda miliki dapat membuka akses terkunci pada fitur mengenai data-data
                                tiap pelamar lowongan yang telah anda publikasikan sebelumnya.
                            <br />
                            </Tooltip>
                        </div>
                        <Row className="mt-3">
                            <Col lg="6" md="6" sm="12">
                                <Label className="my-1">
                                    <Input type="radio" className="d-none"
                                        value={500}
                                        checked={values.nominal === 500}
                                        onChange={changeNominal}
                                    />
                                    <div className="card bg-light d-flex flex-column">
                                        <div className="card-header">
                                            <b>Business Package</b>
                                        </div>
                                        <div className="card-body">
                                            <FontAwesomeIcon icon="coins" className="mr-1" /> 500 token<br />
                                            <i className="fa fa-money mr-1" /> IDR 10.000.000
                                    </div>
                                    </div>
                                </Label>
                            </Col>
                            <Col lg="6" md="6" sm="12">
                                <Label className="my-1">
                                    <Input type="radio" className="d-none"
                                        value={1000}
                                        checked={values.nominal === 1000}
                                        onChange={changeNominal}
                                    />
                                    <div className="card bg-light d-flex flex-column">
                                        <div className="card-header">
                                            <b>Pro Package</b>
                                        </div>
                                        <div className="card-body">
                                            <FontAwesomeIcon icon="coins" className="mr-1" /> 1000 token<br />
                                            <i className="fa fa-money mr-1" /> IDR 16.000.000
                                    </div>
                                    </div>
                                </Label>
                            </Col>
                        </Row>
                        <div className="mt-3 text-left">
                            <i className="fa fa-exclamation-triangle mr-1 text-warning" />
                            <i>
                                Masa berlaku Token Anda sampai<br />
                                {moment(data.expired_at).locale("ID").format("DD MMMM YYYY LT")}
                            </i>
                        </div>
                    </ModalBody>
                    <ModalFooter className="border-top-0">
                        <Button onClick={() => {
                            formik.setFieldValue('nominal', null)
                            formik.setFieldTouched('nominal', false)
                            toggle()
                        }}
                            color="netis-danger"
                        >
                            <i className="fa fa-times mr-1" /> Batal
                        </Button>
                        <Button color="netis-color" className="mr-1" disabled={!values.nominal || isSubmitting}>
                            {isSubmitting ? (
                                <Fragment>
                                    <Spinner size="sm" /> Tunggu...
                                </Fragment>
                            ) : (
                                    <Fragment>
                                        <i className="fa fa-money mr-1" /> Beli
                                    </Fragment>
                                )}
                        </Button>
                    </ModalFooter>
                </Form>
            </Modal>
            <Modal isOpen={hasPurchased} className="token-master">
                <ModalHeader className="border-bottom-0">
                    Pembelian Token Berhasil
                </ModalHeader>
                <ModalBody>
                    <div className="d-flex justify-content-between align-middle mb-3">
                        <div className="mt-2">
                            {/* Pembelian token anda berhasil dan sedang diproses oleh admin. Harap tunggu, admin akan menghubungi anda. Terima Kasih. */}
                            {t('konfirmasitoken')}
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter className="border-top-0">
                    <Button onClick={toggleHasPurchased} color="netis-danger">
                        Tutup
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default RecruitmentToken