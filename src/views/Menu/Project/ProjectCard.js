import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, Carousel, CarouselControl, CarouselIndicators, CarouselItem, Col, Row } from 'reactstrap'
import * as moment from 'moment'
import ReactMarkdown from "react-markdown";
import request from '../../../utils/request';
import { useAuthUser } from '../../../store';

function ProjectCard({ data }) {
    const user = useAuthUser();
    const [like, setLike] = useState(false)
    const [unlike, setUnlike] = useState(false)
    const [hasAction, setHasAction] = useState(false)
    const [up, setUp] = useState(data?.votes?.filter(item => item.type === 'up').length)
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
        // console.log(code)
        if(!like){
            setLike(true)
            setUnlike(false)
            request.post(`v1/projects/${code}/vote`, {type:'up'})
                .then(() => setUp(up+1))
                .catch(() => setLike(false))
                .finally(() => setHasAction(true))
        }
    }

    const doUnLike = (code) => {
        // console.log(code)
        if(!unlike){
            setLike(false)
            setUnlike(true)
            request.post(`v1/projects/${code}/vote`, {type:'down'})
                .then(() => setUp(up-1))
                .catch(() => setUnlike(false))
                .finally(() => setHasAction(true))
        }
    }

    useEffect(() => {
        const actionUp = data.votes.find(item => item.userId === user.id && item.type === 'up')
        const actionDown = data.votes.find(item => item.userId === user.id && item.type === 'down')
        if(actionUp || actionDown){
            setHasAction(true)
        }
        if(actionUp){
            setLike(true)
        }
        if(actionDown){
            setUnlike(true)
        }
    }, [data, user])

    return (
        <Card>
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
                        <img src={item.storage} alt={'media ' + (idx+1)} width="100%" />
                    </CarouselItem>
                ))}
                <CarouselIndicators items={data.media} activeIndex={activeIndex} onClickHandler={goToIndex} />
                {data.media.length > 0 &&
                    <>
                        {activeIndex !== 0 && <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />}
                        {activeIndex !== data.media.length-1 && <CarouselControl direction="next" directionText="Next" onClickHandler={next} />}
                    </>
                }
            </Carousel>

            {/* <img src={data.media[0].storage} className="mx-auto" width="100%" alt={data.title} /> */}
            <CardBody style={{ borderTop: '1px solid #c8ced3' }} className="text-left">
                <div className="button-card-project mb-2">
                    <i className={`fa fa-lg fa-arrow-up mx-1 ${like ? `text-primary scale-click` : ``}`} onClick={() => doLike(data.code)} />
                    <span className="mx-1">{up}</span>
                    <i className={`fa fa-lg fa-arrow-down mx-3 ${unlike ? `text-primary scale-click` : ``}`} onClick={() => doUnLike(data.code)} />
                    <i className="fa fa-lg fa-share-alt mx-3" />
                    <span className="text-info ml-3">Lihat Proyek</span>
                </div>
                <div className="desc-card-project mt-2">
                    <h5><b>{data.title}</b></h5>
                    <ReactMarkdown source={data.description} />
                </div>
                <span className="text-secondary">
                    Lihat {data?.comments?.length ?? 0} Solusi dari {data?.teams?.length ?? 0} Tim
                </span>
            </CardBody>
        </Card>
    )
}

export default ProjectCard