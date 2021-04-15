import React, { useEffect } from "react";
import { useState } from "react";
// import { Modal, ModalBody, Button, Row, Col } from "reactstrap";
import { useLocation } from "react-router-dom";
import { translate } from "react-switch-lang";
import "react-input-range/lib/css/index.css";
import request from "../../../utils/request";
import { useDispatch } from "react-redux";
import { apiSuccess } from "../../../actions/api";
import { useAuthUser, useToken } from "../../../store";
import { getMe } from "../../../actions/auth";
import Loading from "../../Menu/Recruitment/Components/Loading";
import { memo } from "react";

function ForceLogin(props) {
    const user = useAuthUser()
    const token = useToken()
    const dispatch = useDispatch();
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [confirmation, setConfirmation] = useState(false);
    const [change, setChange] = useState(false);
    const params = new URLSearchParams(location.search);

    useEffect(() => {
        if (!user && token) {
            dispatch(getMe());
        }
    }, [token, user, dispatch])

    useEffect(() => {
        if (!user && !token && location.pathname === '/login/force') {
            setChange(true)
            setConfirmation(false)
            request.get(`auth/login/encrypted?code=${params.get('code')}`)
                .then((response) => {
                    dispatch(apiSuccess({ response: response.data }))
                })
                .catch((err) => {
                    // toast.error("Akun tidak ditemukan");
                    window.location.replace('/login')
                })
                .finally(setInterval(() => {
                    setLoading(false)
                    window.location.replace('/')
                }, 5000))
        } else {
            if (!change && user && user.id !== parseInt(params.get('id'))) {
                setLoading(false)
                setConfirmation(true)
            }
            if (user && user.id === parseInt(params.get('id'))) {
                setInterval(() => {
                    setLoading(false)
                    window.location.replace('/')
                }, 5000)
            }
        }
    }, [user, token, location.pathname, params, dispatch, change])

    const handleConfirmation = (e) => {
        setLoading(true)
        setChange(true)
        if (e === true) {
            setConfirmation(false)
            request.get(`auth/login/encrypted?code=${params.get('code')}`)
                .then((response) => {
                    dispatch(apiSuccess({ response: response.data }))
                })
                .catch((err) => {
                    window.location.replace('/login')
                })
                .finally(setInterval(() => {
                    setLoading(false)
                    window.location.replace('/')
                }, 5000))
        } else {
            setInterval(() => {
                setLoading(false)
                window.location.replace('/')
            }, 5000)
        }
    }

    if (loading) {
        return (
            <Loading type="Rings" text="Menyambungkan..." />
        )
    }

    if (confirmation && user) {
        return (
            <ModalConfirmation newName={decodeURI(params.get('name'))} oldName={user?.fullName ?? 'lain'} changeConfirmation={handleConfirmation} />
        )
    }

    return (
        <Loading type="Rings" text="Menyambungkan..." />
    )
}

const ModalConfirmation = memo(({ oldName, newName, changeConfirmation }) => {
    // const [confirmation, setConfirmation] = useState(true);

    changeConfirmation(true)
    // const handleConfirmation = useCallback((e) => {
    //     setConfirmation(false)
    //     changeConfirmation(true)
    //     // if (e.target.id === 'change') {
    //     //     changeConfirmation(true)
    //     // } else {
    //     //     changeConfirmation(false)
    //     // }
    // }, [changeConfirmation])

    return (
        <Loading type="Rings" text="Mengganti akun..." />
        // <Modal
        //     isOpen={confirmation}
        //     centered
        // >
        //     <ModalBody>
        //         <div className="logo text-center">
        //             <img
        //                 src={require("../../../assets/assets_ari/logo.png")}
        //                 className="logo-widya-skilloka"
        //                 alt="logo-widya-skilloka"
        //             />
        //         </div>
        //         <div className="alert alert-warning">Anda masih login menggunakan akun <b>{oldName}</b>.</div>
        //         <h6 className="text-center my-4">Pilih akun untuk melanjutkan ke <b className="text-info">aikrut.id</b> </h6>
        //         <Row className="d-flex justify-content-center">
        //             <Col xs="6">
        //                 <Button className="h-100" block color="light" id="still" onClick={handleConfirmation}>{oldName}</Button>
        //             </Col>
        //             <Col xs="6">
        //                 <Button className="h-100" color="netis-primary" block onClick={handleConfirmation} id="change">{newName}</Button>
        //             </Col>
        //         </Row>
        //     </ModalBody>
        // </Modal>
    )
})

export default (translate(ForceLogin));
