import React, { useMemo, useState } from 'react'
import { useRouteMatch } from 'react-router-dom';
import { Spinner, Row, Col, Card, CardHeader, CardBody, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import useSWR from 'swr';
import profilePhotoNotFound from '../../../assets/img/no-photo.png';

function TeamDetail() {
    const matchRoute = useRouteMatch();
    const { data, error: dataError, mutate } = useSWR('v1/teams/' + matchRoute.params.teamId + '/members', { refreshInterval: 15000 });
    const loading = !data && !dataError;
    const getData = useMemo(() => data?.data?.data ?? [], [data]);

    const [modal, setModal] = useState(false)
    const [modalData, setModalData] = useState(null)

    const toggle = (e) => {
        console.log(e)
        setModal(false)
    }

    const onErrorImage = (e) => {
        e.target.src = profilePhotoNotFound;
        e.target.onerror = null;
    }

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
                        {getData.map((member, idx) => (
                            <Col xs="12" md="6" lg="6" xl="4" key={idx}>
                                <Card className="border-0 card-member" onClick={() => {
                                    setModalData(member)
                                    setModal(true)
                                }}>
                                    <CardBody>
                                        <Row>
                                            <Col xs="3">
                                                <div className="rounded-circle lead-photo mb-3 d-flex justify-content-center align-items-center">
                                                    {member?.user?.photo ?
                                                        <img src={member?.user?.photo} alt="profile" className="rounded-circle" onError={(e) => onErrorImage(e)} />
                                                        :
                                                        <img src={require('../../../assets/img/no-photo.png')} alt="profile" />
                                                    }
                                                </div>
                                            </Col>
                                            <Col xs="9">
                                                <div className="py-1 px-5">
                                                    <b>{member.user.fullName}</b>
                                                    <p className="text-muted sprint-solving">{member.solving.message}</p>
                                                </div>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                }
                <ModalDetail data={modalData} isOpen={modal} toggle={(e) => toggle(e)} />
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

export default TeamDetail;