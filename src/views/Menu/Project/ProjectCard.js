import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap'
import * as moment from 'moment'
import ReactMarkdown from "react-markdown";

function ProjectCard({data}){
    const [action, setAction] = useState(false)
    const [like, setLike] = useState(false)
    const [likeCount, setLikeCount] = useState(data.likes)
    const doLike = () => {
        if(!action){
            setAction(true)
        }
        setLike(!like)
    }

    useEffect(() => {
        if(action){
            if(like){
                setLikeCount(likeCount + 1)
            }
            else {
                setLikeCount(likeCount - 1)
            }
        }
        //eslint-disable-next-line
    }, [action, like])

    return (
        <Card>
            <CardHeader className="bg-white">
                <Row>
                    <Col xs="2" className="text-center">
                        <img src={require('../../../assets/img/avatar.png')} alt="profile" className="profile-photo-project rounded-circle" />
                    </Col>
                    <Col xs="6" className="text-left">
                        <b>{data.name}</b><br />
                        <span className="text-secondary">{data.location}</span>
                    </Col>
                    <Col xs="4" className="text-right">
                        <span className="text-secondary">{moment(data.createdAt).startOf('day').fromNow()}</span>
                    </Col>
                </Row>
            </CardHeader>
            <img src={data.img} className="mx-auto" width="100%" alt={data.title} />
            <CardBody style={{borderTop: '1px solid #c8ced3'}} className="text-left">
                <div className="button-card-project mb-2">
                    <i className={`fa fa-lg fa-arrow-up mx-1 ${like ? `text-primary scale-click` : ``}`} onClick={doLike} />
                    <span className="mx-1">{likeCount}</span>
                    <i className="fa fa-lg fa-arrow-down mx-3" onClick={() => setLike(false)} />
                    <i className="fa fa-lg fa-share-alt mx-3" />
                    <span className="text-info ml-3">Lihat Proyek</span>
                </div>
                <div className="desc-card-project mt-2">
                    <h5><b>{data.title}</b></h5>
                    <ReactMarkdown source={data.desc} />
                </div>
                <span className="text-secondary">
                    Lihat {data.solution} Solusi dari {data.contributors} Tim
                </span>
            </CardBody>
        </Card>
    )
}

export default ProjectCard