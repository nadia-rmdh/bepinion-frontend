import { useFormik } from 'formik';
import React, { Fragment, useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Col, Form, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner, Tooltip } from 'reactstrap';
import request from '../../../../utils/request';
import { t } from 'react-switch-lang';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from "moment";
import { useBalance } from '../../../../hooks/useBalance';
import { useEffect } from 'react';
import { convertNumber } from "../../../../utils/formatter";
import { useUserPrivileges } from '../../../../store';
import ModalPrivilegeForbidden from '../../../../components/ModalPrivilegeForbidden';
// import DiscontCrossOut from '../Components/DiscontCrossOut';

function TopUpToken({ className = '' }) {
    // const me = useAuthUser()
    // const [myBalance, setMyBalance] = useState(0)
    const { data } = useBalance();
    const [modalToken, setModalToken] = useState(false)
    const [hasPurchased, setHasPurchased] = useState(false)
    const [priceList, setPriceList] = useState(null)
    // const [loading, setLoading] = useState(false)
    const [hint, setHint] = useState(false)
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const [url, setUrl] = useState(null);
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

    useEffect(() => {
        request.get('v1/master/token_prices')
            .then(res => {
                setPriceList(res.data.data);
            })
    }, [])

    const { values, isSubmitting, setValues, ...formik } = useFormik({
        initialValues: {
            modelId: 0
        },
        onSubmit: (values, { setSubmitting, setErrors }) => {
            setSubmitting(true)
            let formTopUp = new FormData();
            formTopUp.append("model", "topup");
            formTopUp.append("modelId", values.modelId);
            // formTopUp.append("balance", values.nominal);
            // if (values.nominal === 500) {
            //     formTopUp.append("amount", 10000000);
            // }
            // else if (values.nominal === 1000) {
            //     formTopUp.append("amount", 16000000)
            // }
            request.post(`v1/invoice`, formTopUp)
                // formTopUp.append("nominal", values.nominal);
                // request.post(`v1/token`, formTopUp)
                .then(res => {
                    toast.success(t('Top Up Diproses'));
                    setModalToken(false)
                    setHasPurchased(true)
                    setUrl(res.data.url)
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

    const changePrice = function (e) {
        const value = parseInt(e.target.value);
        formik.setFieldValue('modelId', value)
        formik.setFieldTouched('modelId', true)
    }

    return (
        <>
            {forbidden && <ModalPrivilegeForbidden isOpen={true} isClose={() => setForbidden(false)} forbidden="canManagementTopUp" />}
            <div className={`my-auto nav-item ${className}`} onClick={toggle} style={{ color: "#305574", cursor: "pointer" }}>
                <i className="fa fa-plus-square mr-1" /> <b>Top Up</b>
            </div>

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
                            {priceList?.map((price, idx) => (
                                    <Col key={idx} lg="6" md="6" sm="12">
                                        <Label className="my-1">
                                            <Input type="radio" className="d-none"
                                                value={price.id}
                                                checked={values.modelId === price.id}
                                                onChange={changePrice}
                                            />
                                            <div className="card bg-light d-flex flex-column">
                                                <div className="card-header">
                                                    <b>{price.name}</b>
                                                </div>
                                                <div className="card-body">
                                                    <FontAwesomeIcon icon="coins" className="mr-1" /> {price.balance} token<br />
                                                    <i className="fa fa-money mr-1" /> IDR {convertNumber(price.price, '0,0')}
                                                </div>
                                            </div>
                                        </Label>
                                    </Col>
                                ))}
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
                            formik.setFieldValue('modelId', null)
                            formik.setFieldTouched('modelId', false)
                            toggle()
                        }}
                            color="netis-danger"
                        >
                            <i className="fa fa-times mr-1" /> Batal
                        </Button>
                        <Button color="netis-color" className="mr-1" disabled={!values.modelId || isSubmitting}>
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
                    {/* Pembelian Token Berhasil */}
                    Pembelian Token Diproses
                </ModalHeader>
                <ModalBody>
                    <div className="d-flex justify-content-between align-middle mb-3">
                        <div className="mt-2">
                            Terima kasih telah melakukan pembelian token. Kami akan memproses pembayaran Anda melalui Xendit.
                            {/* {t('konfirmasitoken')} */}
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter className="border-top-0">
                    <a href={url} target="_blank" rel="noopener noreferrer">
                        <Button onClick={toggleHasPurchased} color="netis-danger">
                            OK
                        </Button>
                    </a>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default TopUpToken