import React, { useEffect, useState, useMemo } from 'react'
import { Card, CardBody, CardHeader, Carousel, CarouselControl, CarouselIndicators, CarouselItem, Col, Row, Spinner, Button, Input, ListGroup, ListGroupItem } from 'reactstrap'
import * as moment from 'moment'
// import ReactMarkdown from "react-markdown";
import request from '../../../utils/request';
import { useAuthUser } from '../../../store';
import { Link, useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';

function ProjectDetail() {
    const matchRoute = useRouteMatch();
    const user = useAuthUser();
    const [loading, setLoading] = useState(true);
    const [like, setLike] = useState(false)
    const [unlike, setUnlike] = useState(false)
    const [hasAction, setHasAction] = useState(false)
    const [hasComment, setHasComment] = useState(false)
    const [up, setUp] = useState(0)
    const [down, setDown] = useState(0)
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    const [data, setData] = useState([]);
    const [value, setValue] = useState("")
    const [submitting, setSubmitting] = useState(false)
    const notNull = value.replace(/\s/g, "")
    const [dataUserListed, setDataUserListed] = useState([]);

    useEffect(() => {
        const detailProject = request.get('v1/projects/' + matchRoute.params.code)
        const detailProjectUsers = request.get('v1/projects/' + matchRoute.params.code + '/users')
        Promise.all([detailProject, detailProjectUsers]).then(([detailProject, detailProjectUsers]) => {
            if (detailProject.data) {
                setData(detailProject.data.data);
                setUp(detailProject.data.data?.votes?.filter(item => item.type === 'up').length)
                setDown(detailProject.data.data?.votes?.filter(item => item.type === 'down').length)
            }
            if (detailProjectUsers.data) {
                setDataUserListed(detailProjectUsers.data.data);
            }
        }).finally(() => setLoading(false))
    }, [matchRoute, hasComment]);

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
        // console.log(code)
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
        // console.log(code)
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

    // console.log(data)

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
        <Card className="border-0 shadow-sm" style={{ borderRadius: '5px' }}>
            <CardHeader className="bg-white border-bottom-0 px-0">
                <Row className="pt-3 px-4">
                    <Col xs="2" md="1" className="text-center p-md-0">
                        <img src={require('../../../assets/img/avatar-dummy.png')} alt="profile" className="profile-photo-project rounded-circle" />
                    </Col>
                    <Col xs="6" className="text-left p-md-1">
                        <b>{data.user.name}</b><br />
                        <div className="text-secondary" style={{ width: '100%', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{data.locationName}</div>
                    </Col>
                    <Col xs="4" md="5" className="text-right">
                        <span className="text-warning text-capitalize">{data.status}</span>
                    </Col>
                </Row>
            </CardHeader>

            <CardBody style={{ borderTop: '1px solid #c8ced3' }} className="text-left px-0 border-top-0">
                <div className="desc-card-project px-4">
                    <b style={{ fontSize: '15px' }}>{data.title}</b>
                    <p style={{ fontSize: '14px' }}>{data.description}</p>
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
                            <img src={item.storage} alt={'media ' + (idx + 1)} width="100%" />
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
                        {/* <div className="mx-2">
                            <i className="fa fa-lg fa-share-alt" />
                        </div> */}
                    </Col>
                    <Col xs="4" md="6">
                        <CarouselIndicators items={data.media} activeIndex={activeIndex} onClickHandler={goToIndex} />
                    </Col>
                    <Col xs="4" md="3">
                        <Link to={`/project/${data.code}/solving`}>
                            <Button color="primary" size="sm" className="float-right" disabled={dataUserListed.find(item => item.id === user.id) ? true : false}>Selesaikan Masalah</Button>
                        </Link>
                    </Col>
                    <Col xs="12" className="mt-5">
                        {data?.teams.find(item => item.status === 'approved') &&
                            <>
                                <strong className="mb-2">Daftar Tim yang telah disetujui</strong>
                                <ListGroup className="link-nounderline">
                                    {data.teams.map((item, idx) => (
                                        <Link
                                            key={idx}
                                            to={{
                                                pathname: `/project/${data.code}/sprint`,
                                                search: `?team=${item.leadId}`,
                                                state: { team: item.leadName }
                                            }}
                                        >
                                            <ListGroupItem className="bg-light my-1">
                                                {idx + 1}&nbsp;.&nbsp;
                                                Tim {item.leadName}
                                            </ListGroupItem>
                                        </Link>
                                    ))}
                                </ListGroup>
                            </>
                        }
                    </Col>
                    <Col xs={12}>
                        <hr className="mb-3" />
                        <strong>Komentar</strong>
                        {data?.comments?.length > 0 && data?.comments?.map((item, idx) => (
                            <Row key={idx} className={idx === 0 ? 'mt-3' : ''}>
                                <Col xs="2" md="1" className="d-flex justify-content-center align-items-center pr-0">
                                    <div className={`mx-auto round-100 bg-info border-0 text-center d-flex justify-content-center align-items-center`}>
                                        <strong>{item.userFullName?.split('')[0].toUpperCase()}</strong>
                                    </div>
                                </Col>
                                <Col xs="10" md="11" className="pl-0 m-auto">
                                    <Card style={{ borderRadius: "15px" }} className="bg-light m-0 my-2">
                                        <CardBody className="py-2">
                                            <Row>
                                                <Col xs="10">
                                                    <strong>{item.userFullName}</strong><br />
                                                    <span>{item.comment}</span><br />
                                                </Col>
                                                <Col xs="12" md="2" className="text-right">
                                                    <small className="text-secondary">{moment(item.createdAt).startOf('day').fromNow()}</small>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        ))
                        }
                        <Row className="mt-3">
                            <Col xs="2" md="1" className="d-flex justify-content-center align-items-center pr-0">
                                <div className={`mx-auto round-100 bg-info border-0 text-center d-flex justify-content-center align-items-center`}>
                                    <strong>{user?.detail?.fullName?.split('')[0].toUpperCase()}</strong>
                                </div>
                            </Col>
                            <Col xs="10" md="11" className="pl-0 m-auto">
                                <Input
                                    name="comment"
                                    id="comment"
                                    type="textarea"
                                    style={{ borderRadius: "15px" }}
                                    placeholder="Tuliskan deskripsi idemu..."
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
                    </Col>
                </Row>
            </CardBody>
        </Card >
    )
}

export default ProjectDetail