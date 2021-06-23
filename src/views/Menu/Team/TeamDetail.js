import React, { useMemo, useState, useCallback } from 'react'
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import Select from "react-select";
import { Spinner, Row, Col, Card, CardHeader, CardBody, Modal, ModalHeader, ModalBody, ModalFooter, Button, Badge } from 'reactstrap'
import useSWR from 'swr';
import profilePhotoNotFound from '../../../assets/img/no-photo.png';

function TeamDetail({ leadId }) {
    const history = useHistory();
    const matchRoute = useRouteMatch();
    const location = useLocation();
    const search = new URLSearchParams(location.search);
    const { data, error: dataError } = useSWR('v1/teams/' + matchRoute.params.teamId + '/members?status=' + (search.get('status') ?? 'approved'), { refreshInterval: 15000 });
    const loading = !data && !dataError;
    const getData = useMemo(() => data?.data?.data ?? [], [data]);

    const [modal, setModal] = useState(false)
    const [modalData, setModalData] = useState(null)

    const toggle = (e) => {
        setModal(false)
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
                                value={selectStatus.filter((s) => s.value === (search?.get('status') ?? 'approved'))}
                            />
                        </Col>
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
                                                {leadId === member.user.id &&
                                                    <div className="float-right">
                                                        <Badge size="sm" color="success">Leader</Badge>
                                                    </div>
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