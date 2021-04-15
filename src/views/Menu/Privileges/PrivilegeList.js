import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Card, CardBody, CardHeader, Col, Modal, ModalBody, Row, Spinner } from 'reactstrap';
import LoadingAnimation from '../../../components/LoadingAnimation';
import ModalError from '../../../components/ModalError';
import { useAuthUser } from '../../../store';
import request from '../../../utils/request';
import disableScroll from 'disable-scroll';
import { useDispatch } from 'react-redux';
import { getMe } from '../../../actions/auth';
import Tour from 'reactour';

function PrivilegeList(){

    const [userData, setUserData] = useState([])
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [nonActiveId, setNonActiveId] = useState(null)
    const [deletingId, setDeletingId] = useState(null)
    const [actionName, setActionName] = useState(null)
    const [actionLoading, setActionLoading] = useState(false)
    const [active, setActive] = useState(false)
    const [isTour, setIsTour] = useState(false)
    const user = useAuthUser();
    const disableBody = () => disableScroll.on();
    const enableBody = () => disableScroll.off();
    const accentColor = "#1d5a8e";
    const dispatch = useDispatch();

    useEffect(() => {
        if(user.guidance.layout && user.guidance.header){
            window.scroll({top: 0, behavior: 'smooth' })
            if(!user.guidance.privilegesList){
                setIsTour(true);
            }
        }
    }, [user])

    const disableGuidePrivilegesList = () => {
        setIsTour(false);
        request.put('auth/guidance', {guidance: 'privilegesList'})
            .then(() => {
                dispatch(getMe());
            })
    }

    const getAPI = useCallback(() => {
        setLoading(true)
        return request
            .get('v1/personnels')
            .then((res) => {
                setUserData(res.data.data)
            })
            .catch(() => {
                setError(true)
            })
            .finally(() => setLoading(false))
    }, [])

    useEffect(() => {
        getAPI()
    }, [getAPI])

    const handleNonActive = () => {
        let status;
        if(active){
            status = "active";
        }
        else {
            status = "nonactive";
        }
        setActionLoading(true)
        request.put(`v1/personnels/${nonActiveId}/${status}`)
            .then(() => {
                toast.success('Berhasil mengubah status User')
                setActionName(null)
                setNonActiveId(null)
                setActive(false)
                getAPI()
            })
            .catch(() => {
                toast.error('Terjadi Kesalahan, silahkan coba lagi')
                return
            })
            .finally(() => setActionLoading(false))
    }

    const handleDelete = () => {
        setActionLoading(true)
        request.delete(`v1/personnels/${deletingId}`)
            .then(() => {
                toast.success('Berhasil menghapus User')
                setActionName(null)
                setDeletingId(null)
                getAPI()
            })
            .catch(() => {
                toast.error('Terjadi Kesalahan, silahkan coba lagi')
                return
            })
            .finally(() => setActionLoading(false))
    }

    const steps = [
        {
            selector: ".tour-cardPrivileges",
            content: ({ goTo, inDOM }) => (
                <div>
                    <h5
                        className="title-upgrade text-center"
                        style={{ color: "#93aad6" }}
                    >
                        Selamat datang di Halaman Manajemen User!
                    </h5>
                    <p>
                        Card ini berisi nama dan status user yang dapat menggunakan aikrut. 
                        Anda bisa mengubah data, menghapus data user dan menonaktifkan user.
                    </p>
                    <div className="col-12 text-center">
                        <Row>
                        <div className="col-12 text-right p-0">
                            <Button
                            className="mt-2"
                            type="submit"
                            color="netis-color"
                            onClick={() => goTo(1)}
                            >
                            Selanjutnya <i className="fa fa-arrow-right ml-2"></i>
                            </Button>
                        </div>
                        </Row>
                    </div>
                </div>
            )
        },
        {
            selector: ".tour-addPrivileges",
            content: ({ goTo, inDOM }) => (
                <div>
                    <p>
                        Pilih tombol ini untuk menambahkan user yang dapat mengakses aikrut.
                    </p>
                    <div className="col-12 text-center">
                    <Row>
                        <div className="col-6 text-center p-0">
                        <Button
                            className="mt-2"
                            type="submit"
                            color="netis-color"
                            onClick={() => goTo(0)}
                        >
                            <i className="fa fa-arrow-left mr-2"></i>Sebelumnya
                        </Button>
                        </div>
                        <div className="col-6 text-center p-0">
                        <Button
                            className="mt-2"
                            type="submit"
                            color="netis-success"
                            onClick={() => {
                                disableGuidePrivilegesList();
                            }}
                        >
                            Oke, Saya Paham
                        </Button>
                        </div>
                    </Row>
                    </div>
                </div>
            ),
        },
    ]

    if(error){
        return <ModalError isOpen={true} />
    }
    if(loading){
        return <LoadingAnimation />
    }

    return(
        <>
        <Tour
            steps={steps}
            accentColor={accentColor}
            showButtons={false}
            rounded={5}
            isOpen={isTour}
            closeWithMask={false}
            disableFocusLock={true}
            disableInteraction={true}
            onAfterOpen={disableBody}
            onBeforeClose={enableBody}
            onRequestClose={() => {
                disableGuidePrivilegesList();
            }}
        />
        <Card className="privilege-card">
            <CardHeader className="d-flex align-items-center bg-netis-primary privilege-card-header">
                <h5 className="mb-0" style={{color:"#fff"}}>Manajemen User</h5>
            </CardHeader>
            <CardBody className="px-5">
                <div className="d-flex flex-row-reverse bd-highlight mb-4">
                    <Link to={"/manage-user/create"} className="button-reset btn btn-sm btn-outline-netis-primary tour-addPrivileges px-3">
                        <i className="fa fa-plus mr-1" />
                        Tambah User
                    </Link>
                </div>
                <Row className="mt-4">
                    {userData.length > 0 && userData.map((data, idx) => (
                        <Col key={idx} sm="6" md="4">
                            <Card className={`shadow-sm user-card scale-div-small ${idx === 0 ? `tour-cardPrivileges` : ``} ${!data.active ? `nonactive-card` : ``}`}>
                                <CardBody>
                                    <Row>
                                        <Col xs="12" className="user-card-name">
                                            <Link to={`/manage-user/${data.id}/edit`} className="link-privilege">
                                                <strong style={{color:"#305574"}} className="text-capitalize">{data.fullName}</strong>
                                            </Link>
                                        </Col>
                                        <Col xs="12" className="mb-3">
                                            {data?.position ?? <small><i>(*Belum ada posisi)</i></small>}
                                        </Col>
                                        <Col xs="5" md="6" className="text-left pl-2">
                                            <Button
                                                onClick={() => {
                                                    setActionName(data.fullName)
                                                    setNonActiveId(data.id)
                                                    setActive(!data.active)
                                                }}
                                                className={`btn bg-transparent btn-sm user-card-button ${data.active ? `` : `text-danger`}`}
                                            >
                                                {data.active ? 'Nonaktifkan' : 'Aktifkan'}
                                            </Button>
                                        </Col>
                                        <Col xs="5" md="6" className="text-left p-0">
                                            <Button
                                                onClick={() => {
                                                    setActionName(data.fullName)
                                                    setDeletingId(data.id)
                                                }}
                                                className="btn bg-transparent btn-sm user-card-button"
                                            >
                                                Hapus User
                                            </Button>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </CardBody>
        </Card>
        <Modal isOpen={!!deletingId} toggle={() => {
                if (!actionLoading) {
                    setDeletingId(null)
                }
            }}>
            <ModalBody>
                <h5>
                    Apakah anda yakin untuk menghapus data User <span className="text-primary">{actionName}</span> ?
                </h5>
                <div className="d-flex justify-content-end">
                    {!actionLoading && <Button className="mr-2" color="light" onClick={() => setDeletingId(null)}>Batal</Button>}
                    <Button onClick={handleDelete} color="netis-primary" disabled={actionLoading}>
                        {actionLoading ? <React.Fragment><Spinner size="sm" color="light" /> Loading...</React.Fragment> : "Hapus"}
                    </Button>
                </div>
            </ModalBody>
        </Modal>

        <Modal isOpen={!!nonActiveId} toggle={() => {
                if (!actionLoading) {
                    setNonActiveId(null)
                }
            }}>
            <ModalBody>
                <h5>
                    Apakah anda yakin untuk {active ? 'mengaktifkan' : 'menonaktifkan'} User <span className="text-primary">{actionName}</span> ?
                </h5>
                <div className="d-flex justify-content-end">
                    {!actionLoading && <Button className="mr-2" color="light" onClick={() => setNonActiveId(null)}>Batal</Button>}
                    <Button onClick={handleNonActive} color="netis-primary" disabled={actionLoading}>
                        {actionLoading ? <React.Fragment><Spinner size="sm" color="light" /> Loading...</React.Fragment> : active ? 'Aktifkan' : 'Nonaktifkan'}
                    </Button>
                </div>
            </ModalBody>
        </Modal>
        </>
    )
}

export default PrivilegeList;