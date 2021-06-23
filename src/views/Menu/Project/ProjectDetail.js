import React, { useEffect, useState, useMemo } from 'react'
import {
    Card, CardBody, CardHeader, CardFooter,
    Carousel, CarouselControl, CarouselIndicators, CarouselItem,
    Col, Row,
    Modal, ModalHeader, ModalBody, ModalFooter,
    Spinner, Button, Input, Badge, Tooltip
} from 'reactstrap'
import * as moment from 'moment'
import request from '../../../utils/request';
import { useAuthUser } from '../../../store';
import { Link, useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';
import noProject from '../../../assets/img/no-project.png';
import profilePhotoNotFound from '../../../assets/img/no-photo.png';
import useSWR from 'swr';

function ProjectDetail() {
    const matchRoute = useRouteMatch();
    const user = useAuthUser();
    const [loading, setLoading] = useState(true);
    const [like, setLike] = useState(false)
    const [unlike, setUnlike] = useState(false)
    const [hasAction, setHasAction] = useState(false)
    const [up, setUp] = useState(0)
    const [down, setDown] = useState(0)
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    const [data, setData] = useState([]);
    const { data: dataUserListedSWR, error: dataUserListedError, mutate: dataUserListedMutate } = useSWR('v1/projects/' + matchRoute.params.code + '/users', { refreshInterval: 15000 });
    const { data: dataTeamsSWR, error: dataTeamsError, mutate: dataTeamsMutate } = useSWR('v1/projects/' + matchRoute.params.code + '/teams', { refreshInterval: 15000 });

    const dataUserListed = useMemo(() => dataUserListedSWR?.data?.data ?? [], [dataUserListedSWR]);
    const dataTeams = useMemo(() => dataTeamsSWR?.data?.data ?? [], [dataTeamsSWR]);

    const mutateAll = () => {
        dataUserListedMutate()
        dataTeamsMutate()
    }
    useEffect(() => {
        const detailProject = request.get('v1/projects/' + matchRoute.params.code)
        Promise.all([detailProject]).then(([detailProject]) => {
            if (detailProject.data) {
                setData(detailProject.data.data);
                setUp(detailProject.data.data?.votes?.filter(item => item.type === 'up').length)
                setDown(detailProject.data.data?.votes?.filter(item => item.type === 'down').length)
            }
        }).finally(() => setLoading(false))
    }, [matchRoute]);

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    }
    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === data?.media?.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }
    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? data?.media?.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }

    const doLike = (code) => {
        if (like) {
            setLike(false)
            request.post(`v1/projects/${code}/vote`, { type: 'up' })
                .then(() => setUp(up - 1))
                .catch(() => setLike(true))
                .finally(() => setHasAction(false))
        }
        if (!like) {
            setLike(true)
            setUnlike(false)
            request.post(`v1/projects/${code}/vote`, { type: 'up' })
                .then(() => {
                    if (hasAction) {
                        setUp(up + 1)
                        setDown(down - 1)
                    }
                    setUp(up + 1)
                })
                .catch(() => setLike(false))
                .finally(() => setHasAction(true))
        }
    }

    const doUnLike = (code) => {
        if (unlike) {
            setUnlike(false)
            request.post(`v1/projects/${code}/vote`, { type: 'down' })
                .then(() => setDown(down - 1))
                .catch(() => setUnlike(true))
                .finally(() => setHasAction(false))
        }
        if (!unlike) {
            setLike(false)
            setUnlike(true)
            request.post(`v1/projects/${code}/vote`, { type: 'down' })
                .then(() => {
                    if (hasAction) {
                        setUp(up - 1)
                        setDown(down + 1)
                    }
                    setDown(down + 1)
                })
                .catch(() => setUnlike(false))
                .finally(() => setHasAction(true))
        }
    }

    const actionUp = useMemo(() => data?.votes?.find(item => item.userId === user.id && item.type === 'up'), [data, user])
    const actionDown = useMemo(() => data?.votes?.find(item => item.userId === user.id && item.type === 'down'), [data, user])

    useEffect(() => {
        if (actionUp || actionDown) {
            setHasAction(true)
        }
        if (actionUp) {
            setLike(true)
        }
        if (actionDown) {
            setUnlike(true)
        }
    }, [actionUp, actionDown])

    const onErrorProject = (e) => {
        e.target.src = noProject;
        e.target.onerror = null;
    }

    const onErrorImage = (e) => {
        e.target.src = profilePhotoNotFound;
        e.target.onerror = null;
    }

    if (loading) {
        return (
            <div className="text-center" style={{ position: 'absolute', width: '100%', height: '100%', zIndex: '99', backgroundColor: 'rgba(255,255,255, 0.7)', justifyContent: 'center', alignItems: 'center' }}>
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        background: "rgba(255,255,255, 0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Spinner style={{ width: 48, height: 48 }} />
                </div>
            </div>
        )
    }

    return (
        <Row className="p-0 mb-5 mb-lg-0">
            <Col xs="12" md="7">
                <Card className="border-0 shadow-sm" style={{ borderRadius: '5px' }}>
                    <CardHeader className="bg-white border-bottom-0 px-0">
                        <Row className="pt-3 px-4">
                            <Col xs="2" xl="1" className="text-center p-md-0">
                                <img src={data?.user?.photo} alt="profile" className="profile-photo-project rounded-circle" onError={(e) => onErrorImage(e)} style={{ objectFit: 'cover' }} />
                            </Col>
                            <Col xs="6" xl="7" className="text-left p-md-1">
                                <b>{data.user.name}</b><br />
                                <div className="text-secondary" style={{ width: '100%', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{data.locationName}</div>
                            </Col>
                            <Col xs="4" className="text-right">
                                {badgeStatus(data.status)}
                            </Col>
                        </Row>
                    </CardHeader>

                    <CardBody style={{ borderTop: '1px solid #c8ced3', maxHeight: '110vh' }} className="text-left px-0 pt-1 border-top-0">
                        <div className="desc-card-project px-3">
                            <b style={{ fontSize: '16px' }}>{data.title}</b>
                            <p style={{ fontSize: '13px' }}>{data.description}</p>
                        </div>
                        <Carousel
                            activeIndex={activeIndex}
                            next={next}
                            previous={previous}
                            // ride={false}
                            interval={false}
                            className="carousel-post"
                        >
                            {data.media?.map((item, idx) => (
                                <CarouselItem
                                    onExiting={() => setAnimating(true)}
                                    onExited={() => setAnimating(false)}
                                    key={idx}
                                    className="py-auto"
                                >
                                    <img src={item.storage} alt={'media ' + (idx + 1)} width="100%" onError={(e) => onErrorProject(e)} />
                                </CarouselItem>
                            ))}
                            {data.media?.length > 0 &&
                                <>
                                    {activeIndex !== 0 && <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />}
                                    {activeIndex !== data.media?.length - 1 && <CarouselControl direction="next" directionText="Next" onClickHandler={next} />}
                                </>
                            }
                        </Carousel>
                        <Row className="button-card-project px-4 pt-3 mb-5 mb-md-0">
                            <Col xs="4" md="3" className="d-flex">
                                <div className="mr-2">
                                    <i className={`fa fa-lg fa-arrow-up ${like ? `text-primary scale-click` : `text-secondary`}`} onClick={() => doLike(data.code)} />
                                    <b className="ml-1">{up}</b>
                                </div>
                                <div className="mx-2">
                                    <i className={`fa fa-lg fa-arrow-down ${unlike ? `text-primary scale-click` : `text-secondary`}`} onClick={() => doUnLike(data.code)} />
                                    <b className="ml-1">{down}</b>
                                </div>
                            </Col>
                            <Col xs="4" md="6">
                                <CarouselIndicators items={data.media} activeIndex={activeIndex} onClickHandler={goToIndex} />
                            </Col>
                            <Col xs="4" md="3">
                                <Link to={`/project/${data.code}/solving`}>
                                    <Button color="primary" size="sm" className="float-right" disabled={dataUserListed.find(item => item.id === user.id) ? true : false}>Selesaikan Masalah</Button>
                                </Link>
                            </Col>
                        </Row>
                    </CardBody>
                </Card >
            </Col>
            <Col xs="12" md="5">
                <Row>
                    <Col xs="12">
                        <TeamRegistered data={dataTeams} userListed={dataUserListed} mutate={mutateAll} />
                    </Col>
                    <Col xs={12}>
                        <CommentProject data={data} />
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

const TeamRegistered = ({ data, userListed, mutate }) => {
    const user = useAuthUser();

    const [modal, setModal] = useState(false)
    const [modalData, setModalData] = useState(null)

    const toggle = (e) => {
        setModal(false)
    }

    console.log(userListed)
    return (
        <Card className="border-0 shadow-sm" style={{ borderRadius: '5px' }}>
            <CardHeader className="bg-white border-bottom-0">
                <h5 className="mb-2 font-weight-bolder">Daftar Tim yang telah disetujui</h5>
            </CardHeader>
            <CardBody style={{ borderTop: '1px solid #c8ced3', maxHeight: '45vh', overflowY: 'scroll' }} className="text-left border-top-0 py-1">
                {data.find(item => item.status === 'approved') &&
                    <>
                        {data.map((item, idx) => (
                            <Card className="border-0 shadow-sm" style={{ borderRadius: '5px' }} key={idx}>
                                <CardBody>
                                    <Row>
                                        <Col xs="12" className="d-flex justify-content-between">
                                            <b>Tim {item.lead.leadName}</b>
                                            {(item.members.find(m => m.id === user.id) || item.lead.leadId === user.id) ?
                                                <Link
                                                    key={idx}
                                                    to={{
                                                        pathname: `/project/${item.project.code}/team/${item.id}`,
                                                        // search: `?team=${item.lead.leadId}`,
                                                        state: { team: item.lead.leadName }
                                                    }}
                                                >
                                                    <Button size="sm" color="netis-color">
                                                        Lihat team saya
                                                    </Button>
                                                </Link>
                                                :
                                                userListed.find(item => item.id === user.id) ?
                                                    null
                                                    :
                                                    <Button size="sm" color="netis-success" onClick={() => {
                                                        setModalData(item)
                                                        setModal(true)
                                                    }}>
                                                        Gabung team
                                                    </Button>
                                            }
                                        </Col>
                                        <Col xs="12">
                                            <div className="d-flex flex-column flex-lg-fill float-left mb-7">
                                                <span className="text-muted">Members</span>
                                                <div className="symbol-group symbol-hover">
                                                    {item.members.map((member, k) => (
                                                        <MemberItem member={member} key={k} />
                                                    ))}
                                                    <div className="symbol symbol-30 symbol-circle symbol-light">
                                                        <span className="symbol-label font-weight-bold">5+</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        ))}
                    </>
                }
                <ModalJoinTeam data={modalData} isOpen={modal} toggle={(e) => toggle(e)} mutate={() => mutate()} />
            </CardBody>
            <CardFooter className="border-top-0 bg-white"></CardFooter>
        </Card >
    )
}

const MemberItem = (member) => {
    const [tooltipOpen, setTooltipOpen] = useState(false);

    const toggleTooltip = () => setTooltipOpen(!tooltipOpen);
    const onErrorPhotoMember = (e) => {
        e.target.src = profilePhotoNotFound;
        e.target.onerror = null;
    }

    return (
        <>
            <div className="symbol symbol-30 symbol-circle" id={`tooltip-member-${member.member.id}`}>
                <img alt="Pic" src="assets/media/users/300_25.jpg" onError={(e) => onErrorPhotoMember(e)} />
            </div>
            <Tooltip placement="bottom" isOpen={tooltipOpen} target={`tooltip-member-${member.member.id}`} toggle={toggleTooltip}>
                {member.member.fullName}
            </Tooltip>
        </>
    );
};

const CommentProject = (data) => {
    const matchRoute = useRouteMatch();
    const user = useAuthUser();
    const [hasComment, setHasComment] = useState(false)
    const [value, setValue] = useState("")
    const [submitting, setSubmitting] = useState(false)
    const notNull = value.replace(/\s/g, "")

    const doComment = () => {
        setSubmitting(true)
        request.post(`v1/projects/${matchRoute.params.code}/comment`, { comment: value })
            .then(() => {
                setHasComment(!hasComment)
                setValue("")
            })
            .catch(() => {
                toast.error('Gagal menambahkan komentar')
                return;
            })
            .finally(() => setSubmitting(false))
    }

    return (
        <Card className="border-0 shadow-sm" style={{ borderRadius: '5px' }}>
            <CardHeader className="bg-white border-bottom-0">
                <h5 className="mb-2 font-weight-bolder">Komentar</h5>
            </CardHeader>
            <CardBody style={{ borderTop: '1px solid #c8ced3', maxHeight: '40vh', overflowY: 'scroll' }} className="text-left border-top-0 py-0">
                {data.data?.comments?.length > 0 && data.data?.comments?.map((item, idx) => (
                    <Row key={idx} className="pl-0">
                        <Col xs="2" className="d-flex justify-content-center align-items-center px-0">
                            <div className={`mx-auto round-100 bg-info border-0 text-center d-flex justify-content-center align-items-center`}>
                                <strong>{item.userFullName?.split('')[0].toUpperCase()}</strong>
                            </div>
                        </Col>
                        <Col xs="10" className="pl-0 m-auto">
                            <Card style={{ borderRadius: "15px" }} className="bg-light m-0 my-2">
                                <CardBody className="py-2">
                                    <Row>
                                        <Col xs="10">
                                            <strong>{item.userFullName}</strong><br />
                                            <span>{item.comment}</span><br />
                                        </Col>
                                        <Col xs="12" className="text-right">
                                            <small className="text-secondary">{moment(item.createdAt).startOf('day').fromNow()}</small>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                ))}
            </CardBody>
            <CardFooter className="border-top-0 bg-white pt-1">
                <Row className="mt-3">
                    <Col xs="2" className="d-flex justify-content-center align-items-center px-0">
                        <div className={`mx-auto round-100 bg-info border-0 text-center d-flex justify-content-center align-items-center`}>
                            <strong>{user?.detail?.fullName?.split('')[0].toUpperCase()}</strong>
                        </div>
                    </Col>
                    <Col xs="10" className="pl-0 m-auto">
                        <Input
                            name="comment"
                            id="comment"
                            type="textarea"
                            style={{ borderRadius: "15px" }}
                            placeholder="Tuliskan komentarmu..."
                            rows={3}
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />
                    </Col>
                    <Col xs="12" className="pl-0 m-auto">
                        <Button
                            style={{ borderRadius: '10px' }}
                            disabled={!notNull}
                            className="mt-2 btn btn-sm btn-netis-primary px-3 ml-auto float-right"
                            onClick={doComment}
                        >
                            {submitting ? <Spinner size="sm" className="my-auto" /> : "Submit"}
                        </Button>
                    </Col>
                </Row>
            </CardFooter>
        </Card>
    )
}

const badgeStatus = (status) => {
    let statusText = ''
    let statusColor = ''

    switch (status) {
        case 'registration':
            statusText = 'Pembentukan Tim'
            statusColor = 'warning'
            break;
        case 'ideation':
            statusText = 'Ideasi Tim'
            statusColor = 'info'
            break;
        case 'finish':
            statusText = 'Final Ide Tim'
            statusColor = 'success'
            break;
        default:
            break;
    }

    return (
        <Badge color={statusColor} pill className="text-capitalize text-light">
            {statusText}
        </Badge>
    )
}

const ModalJoinTeam = ({ data, isOpen, toggle, mutate }) => {
    const [ide, setIde] = useState('')
    const [loading, setLoading] = useState(false)
    const handleToggle = () => {
        toggle(false)
    }

    const handleSubmit = () => {
        setLoading(true)
        request.post(`v1/projects/${data.project.code}/solve`, { type: 'exist', teamId: data.id, message: ide })
            .then(() => {
                toast.success('Berhasil Bergabung dalam team')
                mutate()
                toggle(false)
            })
            .catch(() => toast.error('Gagal Bergabung, Silahkan coba lagi'))
            .finally(() => setLoading(false))
    }

    return (
        <Modal isOpen={isOpen} toggle={() => handleToggle()}>
            <ModalHeader toggle={() => handleToggle()}>Gabung team {data?.lead?.leadName}</ModalHeader>
            <ModalBody>
                <Row>
                    <Col xs="12" className="px-0">
                        <Input
                            name="comment"
                            id="comment"
                            type="textarea"
                            style={{ borderRadius: "5px" }}
                            placeholder="Tuliskan deskripsi idemu..."
                            rows={5}
                            value={ide}
                            onChange={(e) => setIde(e.target.value)}
                        />
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button className="mr-2" color="netis-secondary" onClick={() => handleToggle()}>
                    Batal
                </Button>
                <Button className="mr-2" color="netis-primary" disabled={!ide || loading} onClick={() => handleSubmit()}>
                    {loading ?
                        <><Spinner color="light" size="sm" /> Loading...</> :
                        "Kirim"
                    }
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default ProjectDetail