import React, { useEffect, useState, useMemo } from 'react'
import { Card, CardBody, CardHeader, Carousel, CarouselControl, CarouselIndicators, CarouselItem, Col, Row, Spinner, Button, Input, Form } from 'reactstrap'
import * as moment from 'moment'
import ReactMarkdown from "react-markdown";
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
    const [up, setUp] = useState(0)
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    const [data, setData] = useState([]);
    const [value, setValue] = useState("")
    const [submitting, setSubmitting] = useState(false)
    const notNull = value.replace(/\s/g, "")

    useEffect(() => {
        request.get('v1/projects/' + matchRoute.params.code).then(res => {
            setData(res.data.data);
            setUp(res.data.data?.votes?.filter(item => item.type === 'up').length)
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
        // console.log(code)
        if (!like) {
            setLike(true)
            setUnlike(false)
            request.post(`v1/projects/${code}/vote`, { type: 'up' })
                .then(() => setUp(up + 1))
                .catch(() => setLike(false))
                .finally(() => setHasAction(true))
        }
    }

    const doUnLike = (code) => {
        // console.log(code)
        if (!unlike) {
            setLike(false)
            setUnlike(true)
            request.post(`v1/projects/${code}/vote`, { type: 'down' })
                .then(() => setUp(up - 1))
                .catch(() => setUnlike(false))
                .finally(() => setHasAction(true))
        }
    }

    const doComment = () => {
        setSubmitting(true)
        request.post(`v1/projects/${matchRoute.params.code}/comment`, {comment: value})
            .then(() => {
                window.location.reload()
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
            <div className="text-center" style={{ position: 'relative', width: '100%', height: '100%', zIndex: '99', backgroundColor: 'rgba(255,255,255, 0.7)', justifyContent: 'center', alignItems: 'center' }}>
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
        <Card className="card-project-detail">
            <CardHeader className="bg-white">
                <Row>
                    <Col xs="2" className="text-center">
                        <img src={require('../../../assets/img/avatar.png')} alt="profile" className="profile-photo-project rounded-circle" />
                    </Col>
                    <Col xs="6" className="text-left">
                        <b>{data.title}</b><br />
                        <span className="text-secondary">{data.locationName}</span>
                    </Col>
                    <Col xs="4" className="text-right">
                        <span className="text-secondary">{moment(data.verifiedAt).startOf('day').fromNow()}</span>
                    </Col>
                </Row>
            </CardHeader>

            {/* <img src={data.media[0].storage} className="mx-auto" width="100%" alt={data.title} /> */}
            <CardBody style={{ borderTop: '1px solid #c8ced3' }} className="text-left">
                <div className="desc-card-project mt-2">
                    <h5><b>{data.title}</b></h5>
                    <ReactMarkdown source={data.description} />
                </div>
                <div>
                    <Carousel
                        activeIndex={activeIndex}
                        next={next}
                        previous={previous}
                        // ride={false}
                        interval={false}
                        className="carousel-detail"
                    >
                        {data.media.map((item, idx) => (
                            <CarouselItem
                                onExiting={() => setAnimating(true)}
                                onExited={() => setAnimating(false)}
                                key={idx}
                                className="py-auto"
                            >
                                <img src={item.storage} alt={'media ' + (idx + 1)} width="100%" />
                            </CarouselItem>
                        ))}
                        <CarouselIndicators items={data.media} activeIndex={activeIndex} onClickHandler={goToIndex} />
                        {data.media.length > 0 &&
                            <>
                                {activeIndex !== 0 && <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />}
                                {activeIndex !== data.media.length - 1 && <CarouselControl direction="next" directionText="Next" onClickHandler={next} />}
                            </>
                        }
                    </Carousel>
                </div>
                <div className="button-card-project mt-3 mb-5">
                    <i className={`fa fa-lg fa-arrow-up mx-1 ${like ? `text-primary scale-click` : ``}`} onClick={() => doLike(data.code)} />
                    <span className="mx-1">{up}</span>
                    <i className={`fa fa-lg fa-arrow-down mx-3 ${unlike ? `text-primary scale-click` : ``}`} onClick={() => doUnLike(data.code)} />
                    <i className="fa fa-lg fa-share-alt mx-3" />
                    <Link to={`/project/${data.code}/solving`}>
                        <Button color="primary" size="sm" className="float-right">Selesaikan Masalah</Button>
                    </Link>
                    {data?.comment?.length > 1 && <div></div>}
                    <Row className="mt-4">
                        <Col xs="2" className="text-center">
                            <div className={`ml-auto pt-1 round-100 bg-info border-0 text-center align-items-center`}>
                                <strong>{user?.detail?.fullName?.split('')[0].toUpperCase()}</strong>
                            </div>
                        </Col>
                        <Col xs="10" className="text-right">
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
                            <Button
                                style={{borderRadius:'10px'}}
                                disabled={!notNull}
                                className="mt-2 btn btn-sm btn-netis-primary px-3 ml-auto"
                                onClick={doComment}
                            >{submitting ? <Spinner size="sm" className="my-auto" /> : "Submit"}</Button>
                        </Col>
                    </Row>
                </div>
            </CardBody>
        </Card>
    )
}

export default ProjectDetail