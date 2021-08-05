import React, { useEffect, useState } from 'react'
import {
    Card, CardBody, CardHeader,
    Carousel, CarouselControl, CarouselIndicators, CarouselItem,
    Col, Row, Badge, Button
} from 'reactstrap'
import * as moment from 'moment'
import request from '../../../utils/request';
import { useAuthUser } from '../../../store';
import { Link } from 'react-router-dom';
import noProject from '../../../assets/img/no-project.png';
import profilePhotoNotFound from '../../../assets/img/no-photo.png';
import { useMediaQuery } from 'react-responsive';
import { DefaultProfile } from '../../../components/Initial/DefaultProfile';

function ProjectCard({ data }) {
    const isSmallSize = useMediaQuery({ query: '(max-width: 768px)' });
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
            <CardHeader className="bg-white border-bottom-0 px-4 px-md-0 pb-0" style={{ position: 'relative' }}>
                <Row className="pt-3 px-0">
                    <Col xs="2" md="2" className="text-left pr-md-0 d-flex justify-content-center align-items-center">
                        {data?.user?.photo ?
                            <img src={data?.user?.photo} alt="profile" className="profile-photo-project rounded-circle" onError={(e) => onErrorImage(e)} style={{ objectFit: 'cover' }} />
                            :
                            <DefaultProfile init={data?.user?.name} size="50px" />
                        }
                    </Col>
                    <Col xs="7" md="7" className="text-left p-md-1 pl-0 pt-1 align-items-center">
                        <div>
                            <b>{data.user.name}</b><br />
                            <div className="text-dark-secondary" style={{ width: '100%', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{data.locationName}</div>
                        </div>
                    </Col>
                    <div className="text-dark-secondary" style={{ position: 'absolute', top: '30px', right: '20px' }}>
                        {badgeStatus(data.status)}
                    </div>
                </Row>
            </CardHeader>
            <CardBody style={{ borderTop: '1px solid #c8ced3' }} className="text-left px-0 border-top-0">
                <div className="desc-card-project px-4">
                    <b className="description-title mr-3" style={{ fontSize: '16px' }}>{data.title}</b>
                    {/* {badgeStatus(data.status)} */}
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
                <Row className="button-card-project pt-3">
                    <Col xs="5" lg="4">
                        <Row className="vote-row">
                            <Col xs="4" lg="5" className={`vote-up text-center d-flex align-items-center justify-content-center ${like ? `bg-success` : `border-dark-secondary`}`} onClick={() => doLike(data.code)}>
                                <i className={`fa ${!isSmallSize && `fa-lg`} fa-arrow-up ${like ? `scale-click` : ``}`} />
                                <b className="ml-1">{up}</b>
                            </Col>
                            <Col xs="4" lg="5" className={`vote-down text-center d-flex align-items-center justify-content-center ${unlike ? `bg-secondary` : `border-dark-secondary`}`} onClick={() => doUnLike(data.code)}>
                                <i className={`fa ${!isSmallSize && `fa-lg`} fa-arrow-down ${unlike ? `scale-click` : ``}`} />
                                <b className="ml-1">{down}</b>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs="2" lg="4" className="text-center">
                        <CarouselIndicators items={data.media} activeIndex={activeIndex} onClickHandler={goToIndex} />
                    </Col>
                    <Col xs="5" lg="4" className="px-0">
                        <Row>
                            <Col xs="5" className="text-right px-0">
                                <Button style={{ borderRadius: '10px', backgroundColor: '#FAFAFA', borderColor: '#FAFAFA', color: '#807F7F' }}>
                                    <i className="fa fa-share-alt" style={{ fontSize: '18pt' }} />
                                </Button>
                            </Col>
                            <Col xs="7" className={`text-right pl-0 ${isSmallSize ? 'text-nowrap' : ''}`}>
                                <Link to={`/project/${data.code}`} className="btn btn-primary" style={{ borderRadius: '10px', backgroundColor: 'rgba(91, 191, 250, 1)', borderColor: 'rgba(91, 191, 250, 1)' }}>
                                    Lihat Detail
                                </Link>
                            </Col>
                        </Row>
                    </Col>
                    {/* <Col xs="12" className="mt-2 pl-0 text-dark-secondary d-none d-md-block">
                        {data.teams.length} Solusi &nbsp;&nbsp;&bull;&nbsp;&nbsp; {data.teams.length} Tim
                    </Col> */}
                    <Col xs="12" className="mt-3 link-nounderline p-0">
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
                    <Col xs="12" className="p-0">
                        <span className="text-secondary">
                            {moment(data.verifiedAt).startOf('day').fromNow()}
                        </span>
                    </Col>
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
        <Badge color={statusColor} style={{ borderRadius: '0.45rem', padding: '0.55em 0.6em', color: '#FFFFFF' }}>
            {statusText}
        </Badge>
        // <span className={`text-${statusColor} text-capitalize ml-md-2`}>
        //     <i className="fa fa-circle mr-1" />
        //     ({statusText})
        // </span>
    )
}

export default ProjectCard