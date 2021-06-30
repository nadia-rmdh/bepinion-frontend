import React from "react";
import { Row, Col } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import noPhoto from '../../../../../../assets/img/no-photo.png';
import * as moment from 'moment';

const Activity = ({ cardId, data, mutate, children }) => {

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
                {data?.map((act, i) => (
                    <div className="mb-3 d-flex align-items-center" key={i}>
                        <img src={act.user.photo} alt={act.user.fullName} onError={(e) => onErrorActivityImage(e)} className="rounded-circle" style={{ width: '40px', height: '40px', objectFit: 'cover' }} />
                        <div className="ml-3">
                            <div className="text-dark">{act.message}</div>
                            <div className="text-muted d-flex">
                                {moment(act.createdAt).format("DD MMMM YYYY")} {moment(act.createdAt).format("HH:mm")}
                            </div>
                        </div>
                    </div>
                ))}
            </Col>
        </Row>
    )
}

export default Activity