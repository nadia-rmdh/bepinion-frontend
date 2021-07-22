import React, { useEffect, useState } from 'react'
import {
    Card, CardBody, CardHeader,
    Carousel, CarouselControl, CarouselIndicators, CarouselItem,
    Col, Row
} from 'reactstrap'
import * as moment from 'moment'
import request from '../../../utils/request';
import { useAuthUser } from '../../../store';
import { Link } from 'react-router-dom';
import noProject from '../../../assets/img/no-project.png';
import profilePhotoNotFound from '../../../assets/img/no-photo.png';

function ProjectCard({ data }) {
    const user = useAuthUser();
    const [like, setLike] = useState(false)
    const [unlike, setUnlike] = useState(false)
    const [hasAction, setHasAction] = useState(false)
    const [up, setUp] = useState(data?.votes?.filter(item => item.type === 'up').length)
    const [down, setDown] = useState(data?.votes?.filter(item => item.type === 'down').length)
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
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

    useEffect(() => {
        const actionUp = data.votes.find(item => item.userId === user.id && item.type === 'up')
        const actionDown = data.votes.find(item => item.userId === user.id && item.type === 'down')
        if (actionUp || actionDown) {
            setHasAction(true)
        }
        if (actionUp) {
            setLike(true)
        }
        if (actionDown) {
            setUnlike(true)
        }
    }, [data, user])

    const onErrorProject = (e) => {
        e.target.src = noProject;
        e.target.onerror = null;
    }

    const onErrorImage = (e) => {
        e.target.src = profilePhotoNotFound;
        e.target.onerror = null;
    }

    return (
        <Card className="project-card" style={{ borderRadius: '5px' }}>
            <CardHeader className="bg-white border-bottom-0 px-0 pb-0" style={{position:'relative'}}>
                <Row className="pt-3 px-4">
                    <Col xs="3" md="2" className="text-left pl-3 mx-xl-n4">
                        <img src={data?.user?.photo} alt="profile" className="profile-photo-project rounded-circle" onError={(e) => onErrorImage(e)} style={{ objectFit: 'cover' }} />
                    </Col>
                    <Col xs="7" md="8" className="text-left p-md-1 pl-0">
                        <b>{data.user.name}</b><br />
                        <div className="text-dark-secondary" style={{ width: '100%', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{data.locationName}</div>
                        <div className="d-md-none">{badgeStatus(data.status)}</div>
                    </Col>
                    <div className="text-dark-secondary" style={{position:'absolute', top:'10px', right:'10px'}}>
                        <small>{moment(data.verifiedAt).startOf('day').fromNow()}</small>
                    </div>
                </Row>
            </CardHeader>
            <CardBody style={{ borderTop: '1px solid #c8ced3' }} className="text-left px-0 border-top-0">
                <div className="desc-card-project px-4">
                    <b className="description-title mr-3" style={{fontSize:'16px'}}>{data.title}</b>
                    <div className="d-none d-md-block">{badgeStatus(data.status)}</div>
                    <div className="description-project">{data.description}</div>
                    <Link to={`/project/${data.code}`} className="text-secondary d-none d-md-block">
                        <i>Baca lebih lanjut...</i>
                    </Link>
                </div>
                <Carousel
                    activeIndex={activeIndex}
                    next={next}
                    previous={previous}
                    interval={false}
                    className="carousel-post"
                >
                    {data.media.map((item, idx) => (
                        <CarouselItem
                            onExiting={() => setAnimating(true)}
                            onExited={() => setAnimating(false)}
                            key={idx}
                        >
                            <img src={item.storage} alt={'media ' + (idx + 1)} width="100%" onError={(e) => onErrorProject(e)} />
                        </CarouselItem>
                    ))}
                    {data.media.length > 0 &&
                        <>
                            {activeIndex !== 0 && <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />}
                            {activeIndex !== data.media.length - 1 && <CarouselControl direction="next" directionText="Next" onClickHandler={next} />}
                        </>
                    }
                </Carousel>
                <Row className="button-card-project px-4 pt-3">
                    {/* <Col xs="4" md="3" className="d-flex">
                        <div className="mr-2">
                            <i className={`fa fa-lg fa-arrow-up ${like ? `text-primary scale-click` : `text-secondary`}`} onClick={() => doLike(data.code)} />
                            <b className="ml-1">{up}</b>
                        </div>
                        <div className="mx-2">
                            <i className={`fa fa-lg fa-arrow-down ${unlike ? `text-primary scale-click` : `text-secondary`}`} onClick={() => doUnLike(data.code)} />
                            <b className="ml-1">{down}</b>
                        </div>
                        <div className="mx-2">
                            <i className="fa fa-lg fa-share-alt" />
                        </div>
                    </Col> */}
                    <Col xs="4" md="3">
                        <Row className="vote-row">
                            <Col className={`vote-up text-center py-1 ${like ? `bg-success` : `border-dark-secondary`}`}>
                                <i className={`fa fa-lg fa-arrow-up ${like ? `scale-click` : ``}`} onClick={() => doLike(data.code)} />
                                <b className="ml-1">{up}</b>
                            </Col>
                            <Col className={`vote-down text-center py-1 ${unlike ? `bg-success` : `border-dark-secondary`}`}>
                                <i className={`fa fa-lg fa-arrow-down ${unlike ? `scale-click` : ``}`} onClick={() => doUnLike(data.code)} />
                                <b className="ml-1">{down}</b>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs="4" md="6">
                        <CarouselIndicators items={data.media} activeIndex={activeIndex} onClickHandler={goToIndex} />
                    </Col>
                    <Col xs="4" md="3">
                        <Link to={`/project/${data.code}`} className="float-right btn btn-primary" style={{borderRadius:'10px'}}>
                            Lihat Detail
                        </Link>
                    </Col>
                    <Col xs="12" className="mt-2 pl-0 text-dark-secondary d-none d-md-block">
                        {data.teams.length} Solusi &nbsp;&nbsp;&bull;&nbsp;&nbsp; {data.teams.length} Tim
                    </Col>
                    {/* <Col xs="12" className="mt-1 link-nounderline">
                        <Link to={`/project/${data.code}`}>
                            <span className="text-secondary">
                                Lihat semua {data?.comments?.length ?? 0} komentar
                            </span>
                        </Link>
                        <div>
                            {data.comments.slice(0, 3).map((comment, idx) => (
                                <p className="mb-0 my-1" key={idx}>
                                    <b>{comment.userFullName}</b> <span>{comment.comment}</span>
                                </p>
                            ))}
                        </div>
                    </Col>
                    <Col xs="12">
                        <span className="text-secondary">
                            {moment(data.verifiedAt).startOf('day').fromNow()}
                        </span>
                    </Col> */}
                </Row>
            </CardBody>
        </Card>
    )
}

export const badgeStatus = (status) => {
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
        <span className={`text-${statusColor} text-capitalize ml-md-2`}>
            <i className="fa fa-circle mr-1" />
            ({statusText})
        </span>
    )
}

export default ProjectCard