import React, { useEffect, useState, useMemo } from 'react'
import { Card, CardBody, CardHeader, Carousel, CarouselControl, CarouselIndicators, CarouselItem, Col, Row, Spinner, Button } from 'reactstrap'
import * as moment from 'moment'
import ReactMarkdown from "react-markdown";
import request from '../../../../utils/request';
import { useAuthUser } from '../../../../store';
import { Link, useRouteMatch } from 'react-router-dom';

function SolvingMessage() {
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

    console.log(data)

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
        <Card>
            <CardHeader className="bg-white">
                <Row>
                    <Col xs="2" className="text-center">
                        <img src={require('../../../../assets/img/avatar.png')} alt="profile" className="profile-photo-project rounded-circle" />
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
                        className="carousel-post"
                    >
                        {data.media.map((item, idx) => (
                            <CarouselItem
                                onExiting={() => setAnimating(true)}
                                onExited={() => setAnimating(false)}
                                key={idx}
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
                <div className="button-card-project mb-5">
                    <Link to={`/project/${data.code}`}>
                        <Button color="primary" size="sm" className="float-right">Selesaikan Masalah</Button>
                    </Link>
                </div>
            </CardBody>
        </Card>
    )
}

export default SolvingMessage