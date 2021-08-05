import React, { memo, useEffect, useState, Fragment } from "react";
import { Row, Col } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import noPhoto from '../../../../../../assets/img/no-photo.png';
import * as moment from 'moment';

const Activity = memo(({ cardId, socket, children }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        socket.emit("joinActivityCard", { cardId }, (res) => {
            if (!res.success) {
                console.log('Socket Error')
            } else {
                // setLoading(false)
            }
        });
        socket.on('getActivityCard', (res) => {
            setData(res.data)
        })
        // eslint-disable-next-line
    }, [])

    const onErrorActivityImage = (e) => {
        e.target.src = noPhoto;
        e.target.onerror = null;
    }

    return (
        <Row className="mb-4">
            <Col xs="1" className="px-0 d-flex align-items-center justify-content-center">
                <FontAwesomeIcon icon='snowboarding' className="font-weight-bold" style={{ color: '#42526e', fontSize: '14pt' }} />
            </Col>
            <Col xs="11" className="px-0">
                <div className="d-flex align-items-center">
                    <h5 className={`font-weight-bold mb-0`}>Aktivitas</h5>
                </div>
            </Col>
            <Col xs="12" className="mt-3">
                {children}
            </Col>
            <Col xs="12" className="mt-3">
                <Row>
                    {data?.map((act, i) => (
                        <Fragment key={i}>
                            <Col xs="1" className="mb-3 d-flex align-items-center justify-content-center px-0">
                                <img src={act.user.photo} alt={act.user.fullName} onError={(e) => onErrorActivityImage(e)} className="rounded-circle" style={{ width: '40px', height: '40px', objectFit: 'cover' }} />
                            </Col>
                            <Col xs="11" className="mb-3 d-flex align-items-center px-0">
                                <div className="text-dark">{act.message}</div>
                                <div className="text-muted d-flex">
                                    {moment(act.createdAt).format("DD MMMM YYYY")} {moment(act.createdAt).format("HH:mm")}
                                </div>
                            </Col>
                        </Fragment>
                    ))}
                </Row>
            </Col>
        </Row>
    )
})

export default Activity