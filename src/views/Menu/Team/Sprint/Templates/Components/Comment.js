import React, { useEffect, useState, useRef } from "react";
import { Row, Col, Button } from "reactstrap";
import TextareaAutosize from 'react-textarea-autosize';
import request from "../../../../../../utils/request";
import noPhoto from '../../../../../../assets/img/no-photo.png';
import { useAuthUser } from "../../../../../../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default ({ data, mutate }) => {
    const user = useAuthUser();
    const [comment, setComment] = useState('')
    const commentRef = useRef(null)
    const [isComment, setIsComment] = useState(false)

    const postComment = () => {
        request.post('v1/cards/' + data.id + '/comment', { message: comment })
            .then(() => {
                setComment('')
                setIsComment(false)
                mutate()
            })
        // .catch(() => alert('Error'))
    }

    const onErrorActivityImage = (e) => {
        e.target.src = noPhoto;
        e.target.onerror = null;
    }

    return (
        <>
            <Row className="mb-1">
                <Col xs="1" className="px-0 d-flex justify-content-center">
                    <img src={user.detail.photo} alt="Me" onError={(e) => onErrorActivityImage(e)} className="rounded-circle" style={{ width: '40px', height: '40px', objectFit: 'cover' }} />
                </Col>
                <Col xs="11" className="pl-0 mt-1" style={{ paddingRight: '5rem' }}>
                    <div className="position-relative" style={{ minHeight: `${comment || isComment ? '100px' : '40px'}` }}>
                        <TextareaAutosize
                            ref={commentRef}
                            className={`form-control card-detail-comment ${comment && 'is-filled pb-5'}`}
                            onChange={(e) => setComment(e.target.value)}
                            onBlur={(e) => {
                                setComment(e.target.value)
                                if (!e.target.value) {
                                    setIsComment(false)
                                }
                            }}
                            onFocus={(e) => setIsComment(true)}
                            value={comment}
                            placeholder="Tulis komentar..."
                        />
                        {isComment &&
                            <div className="position-absolute p-2" style={{ bottom: 0 }}>
                                <Button color="primary" size="md" disabled={!comment} onClick={() => {
                                    postComment()
                                    commentRef.current.blur()
                                }}>
                                    Kirim
                                </Button>
                            </div>
                        }
                    </div>
                </Col>
            </Row>
        </>
    )
}