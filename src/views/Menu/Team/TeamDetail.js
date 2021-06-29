import React, { useState, useCallback } from 'react'
import { useHistory } from 'react-router-dom';
import Select from "react-select";
import { toast } from 'react-toastify';
import { Spinner, Row, Col, Card, CardHeader, CardBody, Modal, ModalHeader, ModalBody, ModalFooter, Button, Badge } from 'reactstrap'
import profilePhotoNotFound from '../../../assets/img/no-photo.png';
import request from '../../../utils/request';

function TeamDetail({ leadId, data, loading, mutate, status }) {
    const history = useHistory();

    const [modal, setModal] = useState(false)
    const [modalData, setModalData] = useState(null)
    const [modalVerify, setModalVerify] = useState(false)
    const [modalVerifyData, setModalVerifyData] = useState(null)

    const toggle = (e) => {
        setModal(false)
    }

    const toggleVerify = (e) => {
        setModalVerify(false)
    }

    const onErrorImage = (e) => {
        e.target.src = profilePhotoNotFound;
        e.target.onerror = null;
    }

    const selectStatus = [
        { value: 'pending', label: 'Pending' },
        { value: 'approved', label: 'Approved' }
    ]

    const changeStatus = useCallback((e) => {
        history.push('?status=' + e.value + '#myteam')
    }, [history])

    return (
        <Card className="design-sprint shadow-sm border-0">
            <CardHeader className="design-sprint-header">
                <div className="ml-2"><b className="font-lg">Detail Team</b></div>
            </CardHeader>
            <CardBody style={{ minHeight: '70vh' }}>
                {loading ?
                    <div
                        style={{
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0,
                            background: "rgba(255,255,255, 0.5)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "75vh",
                        }}
                    >
                        <Spinner style={{ width: 48, height: 48 }} />
                    </div>
                    :
                    <Row>
                        <Col sm={{ size: '3', offset: 9 }}>
                            <Select
                                className="mb-3"
                                name="jobtype"
                                id="jobtype"
                                options={selectStatus}
                                onChange={changeStatus}
                                value={selectStatus.filter((s) => s.value === (status ?? 'approved'))}
                            />
                        </Col>
                        {data.map((member, idx) => (
                            <Col xs="12" md="6" lg="6" xl="4" key={idx}>
                                <Card className="border-0 card-member">
                                    <CardBody>
                                        <Row>
                                            <Col xs="3" onClick={() => {
                                                setModalData(member)
                                                setModal(true)
                                            }} >
                                                <div className="rounded-circle lead-photo mb-3 d-flex justify-content-center align-items-center">
                                                    {member?.user?.photo ?
                                                        <img src={member?.user?.photo} alt="profile" className="rounded-circle" onError={(e) => onErrorImage(e)} />
                                                        :
                                                        <img src={require('../../../assets/img/no-photo.png')} alt="profile" />
                                                    }
                                                </div>
                                            </Col>
                                            <Col xs="9">
                                                <div className="py-1 px-5" onClick={() => {
                                                    setModalData(member)
                                                    setModal(true)
                                                }} >
                                                    <b>{member.user.fullName}</b>
                                                    <p className="text-muted sprint-solving">{member.solving.message}</p>
                                                </div>
                                                {leadId === member.user.id &&
                                                    <div className="float-right" onClick={() => {
                                                        setModalData(member)
                                                        setModal(true)
                                                    }} >
                                                        <Badge size="sm" color="success">Leader</Badge>
                                                    </div>
                                                }
                                                {status === 'pending' &&
                                                    <Row className="bd-highlight float-right" style={{ zIndex: 99 }}>
                                                        <Col xs="6" className="py-0 px-1 bd-highlight">
                                                            <Button
                                                                color="netis-success"
                                                                size="md"
                                                                className="float-right w-100"
                                                                onClick={() => {
                                                                    setModalVerify(true);
                                                                    setModalVerifyData({ status: "approved", id: member.id });
                                                                }}
                                                            >
                                                                <i className="fa fa-check"></i>
                                                            </Button>
                                                        </Col>
                                                        <Col xs="6" className="py-0 px-1 bd-highlight">
                                                            <Button
                                                                color="netis-danger"
                                                                size="md"
                                                                onClick={() => {
                                                                    setModalVerify(true);
                                                                    setModalVerifyData({ status: "rejected", id: member.id });
                                                                }}
                                                            >
                                                                <i className="fa fa-times"></i>
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                }
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                }
                <ModalDetail data={modalData} isOpen={modal} toggle={(e) => toggle(e)} />
                <ModalVerify data={modalVerifyData} isOpen={modalVerify} toggle={(e) => toggleVerify(e)} mutate={() => mutate()} />
            </CardBody>
        </Card>
    )
}

const ModalDetail = ({ data, isOpen, toggle }) => {
    const handleToggle = () => {
        toggle(false)
    }

    return (
        <Modal isOpen={isOpen} toggle={() => handleToggle()}>
            <ModalHeader toggle={() => handleToggle()}>Pemecahan masalah dari {data?.user?.fullName}</ModalHeader>
            <ModalBody>
                <Row>
                    <Col xs="12">
                        <div>
                            {data?.solving?.message}
                        </div>
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button className="mr-2" color="netis-secondary" onClick={() => handleToggle()}>
                    Tutup
                </Button>
            </ModalFooter>
        </Modal>
    )
}

const ModalVerify = ({ data, isOpen, toggle, mutate }) => {
    const handleToggle = () => {
        toggle(false)
    }

    const updateStatus = (status, id) => {
        request.put(`v1/teams/member/${id}`, { status })
            .then(() => {
                toast.success('Verifikasi anggota berhasil')
                mutate()
                toggle(false)
            })
            .catch(() => {
                toast.error('Verifikasi anggota gagal, Silahkan coba lagi')
                return;
            })
        // .finally(() => setSubmitting(false))
    }

    return (
        <Modal isOpen={isOpen} toggle={() => handleToggle()}>
            <ModalBody>
                <Row>
                    <Col xs="12">
                        <p>Apa anda yakin ?</p>
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button className="mr-2" color="netis-secondary" onClick={() => handleToggle()}>
                    Batal
                </Button>
                <Button color="netis-primary" onClick={() => updateStatus(data.status, data.id)}>
                    Ya
                </Button>
            </ModalFooter>
        </Modal>
    )
}
export default TeamDetail;