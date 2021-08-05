import React, { useState, useEffect } from "react";
import { Row, Col, Button, Popover, PopoverHeader, PopoverBody, Nav, NavItem, NavLink } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import noPhoto from '../../../../../../assets/img/no-photo.png';
import * as moment from 'moment';
import { memo } from "react";

const Assignments = memo(({ matchRoute, socket, cardId, members, write }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        socket.emit("joinAssignmentsCard", { cardId }, (res) => {
            if (!res.success) {
                console.log('Socket Error')
            } else {
                // setLoading(false)
            }
        });
        socket.on('getAssignmentsCard', (res) => {
            setData(res.data)
        })
        // eslint-disable-next-line
    }, [])

    const onChangeData = (data) => {
        // console.log(data)
        // setData(data)
    }

    return (
        <Row className="mb-4 assignment">
            <Col xs={{ size: 11, offset: 1 }} className="px-0">
                <div className="d-flex align-items-center">
                    <div className={`font-weight-bold mb-0 font-md text-muted`}>Anggota</div>
                </div>
            </Col>
            <Col xs={{ size: 11, offset: 1 }} className="mt-2 px-0">
                <div className="mb-3 d-flex align-items-center">
                    {data.length <= 0
                        ? <div className="text-muted">Tidak ada anggota yang diberi tugas.</div>
                        : data?.map((act, i) => (
                            <Assignment matchRoute={matchRoute} socket={socket} data={act} cardId={cardId} key={i} write={write} />
                        ))
                    }
                    {write &&
                        <PopOverAddAssignment matchRoute={matchRoute} socket={socket} data={data} cardId={cardId} members={members} onChangeData={onChangeData} />
                    }
                </div>
            </Col>
        </Row>
    )
})

const Assignment = memo(({ matchRoute, socket, data, cardId, write }) => {
    const [popOverDelete, setPopOverDelete] = useState(false)

    const handleDeleteAssignment = () => {
        socket.emit('deleteAssignment', { id: data.id, cardId, teamId: matchRoute.params.teamId }, () => { })
        // request.delete('v1/cards/assignment/' + data.id)
    }

    const onErrorAssignmentImage = (e) => {
        e.target.src = noPhoto;
        e.target.onerror = null;
    }

    return (
        <div className="mr-2">
            <img
                className="rounded-circle"
                style={{ width: '40px', height: '40px', objectFit: 'cover', cursor: "pointer" }}
                src={data?.user.photo ?? noPhoto} alt="User"
                id={`popover-assigment-${data.id}`}
                onError={(e) => onErrorAssignmentImage(e)}
            />
            <Popover trigger="legacy" placement="bottom" target={`popover-assigment-${data.id}`} style={{ minWidth: '250px' }} isOpen={popOverDelete} toggle={() => setPopOverDelete(!popOverDelete)}>
                <PopoverBody>
                    <div className="mb-3 d-flex align-items-center">
                        <img src={data?.user.photo ?? noPhoto} alt="User" onError={(e) => onErrorAssignmentImage(e)} className="rounded-circle" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                        <div className="ml-3">
                            <h5 className="text-dark font-weight-bold mb-0">{data?.user.fullName}</h5>
                            <div className="text-muted d-flex mt-1">
                                {moment(data.createdAt).format("DD MMMM YYYY")} {moment(data.createdAt).format("HH:mm")}
                            </div>
                        </div>
                    </div>
                    {write &&
                        <Button color="danger" size="sm" block onClick={() => {
                            handleDeleteAssignment()
                            setPopOverDelete(!popOverDelete)
                        }}>
                            Hapus
                        </Button>
                    }
                </PopoverBody>
            </Popover>
        </div>
    )
})

export const AssignmentPriview = memo(({ matchRoute, socket, data, cardId, write }) => {
    const onErrorAssignmentImage = (e) => {
        e.target.src = noPhoto;
        e.target.onerror = null;
    }

    return (
        <div className="mr-2">
            <img
                className="rounded-circle"
                style={{ width: '25px', height: '25px', objectFit: 'cover', cursor: "pointer" }}
                src={data?.photo ?? noPhoto} alt="User"
                onError={(e) => onErrorAssignmentImage(e)}
            />
        </div>
    )
})

const PopOverAddAssignment = memo(({ matchRoute, socket, data, cardId, members, onChangeData }) => {
    const [popOverAssignment, setPopOverAssignment] = useState(false)

    const handleAddAssignment = (member) => {
        onChangeData([...data, member])
        socket.emit('postAssignment', { userId: member.user.id, cardId, teamId: matchRoute.params.teamId, projectCode: matchRoute.params.code }, () => { })
    }

    const handleDeleteAssignment = (id, member) => {
        onChangeData(data?.filter((d) => d.id !== id))
        socket.emit('deleteAssignment', { id, cardId, teamId: matchRoute.params.teamId }, () => { })
    }

    const onErrorAssignmentImage = (e) => {
        e.target.src = noPhoto;
        e.target.onerror = null;
    }

    return (
        <div className="select-assignment-member">
            <Button color="secondary" className="rounded-circle" id="popover-assighment-add" style={{ width: '45px', height: '45px' }}><FontAwesomeIcon icon="plus" /></Button>
            <Popover trigger="legacy" placement="bottom" target="popover-assighment-add" style={{ width: '250px' }} isOpen={popOverAssignment} toggle={() => setPopOverAssignment(!popOverAssignment)}>
                <PopoverHeader className="text-center">Anggota</PopoverHeader>
                <PopoverBody className="px-0 py-1">
                    <Nav vertical>
                        {members?.map((member, i) => {
                            let idAssignment = null;
                            const assign = data?.some((b) => {
                                const check = member.user.id === b.user.id
                                if (check) idAssignment = b.id

                                return check
                            })

                            return (
                                <NavItem key={i}>
                                    <NavLink className="assignment-member" onClick={() => idAssignment ? handleDeleteAssignment(idAssignment, member) : handleAddAssignment(member)}>
                                        <div className="d-flex align-items-center">
                                            <img src={member?.user.photo ?? noPhoto} alt="User" onError={(e) => onErrorAssignmentImage(e)} className="rounded-circle" style={{ width: '35px', height: '35px', objectFit: 'cover' }} />
                                            <div className="ml-3" style={{ width: '150px' }}>
                                                <small className="text-dark mb-0">{member?.user.fullName}</small>
                                            </div>
                                            <div className="" style={{ width: '15px' }}>
                                                {assign && <small className="text-dark mb-0"><FontAwesomeIcon icon="check" /></small>}
                                            </div>
                                        </div>
                                    </NavLink>
                                </NavItem>
                            )
                        })}
                    </Nav>
                </PopoverBody>
            </Popover>
        </div>
    )
})

export default Assignments