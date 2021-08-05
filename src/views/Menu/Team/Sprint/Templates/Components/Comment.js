import React, { useState, useRef, memo } from "react";
import { Row, Col, Button } from "reactstrap";
import TextareaAutosize from 'react-textarea-autosize';
import noPhoto from '../../../../../../assets/img/no-photo.png';
import { useAuthUser } from "../../../../../../store";

export default memo(({ matchRoute, socket, cardId, children, write }) => {
    const user = useAuthUser();
    const [comment, setComment] = useState('')
    const commentRef = useRef(null)
    const [isComment, setIsComment] = useState(false)

    const postComment = () => {
        socket.emit('postComment', { message: comment, cardId, teamId: matchRoute.params.teamId }, () => {
            setComment('')
            setIsComment(false)
        })
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
                <Col xs={`${children ? '6' : '10'}`} className="pl-0 mt-1">
                    <div className="position-relative" style={{ minHeight: `${comment || isComment ? '100px' : '40px'}` }}>
                        <TextareaAutosize
                            ref={commentRef}
                            className={`form-control card-detail-comment ${comment && 'is-filled pb-5'}`}
                            // style={{ minHeight: '40px' }}
                            minRows={`${children ? '6' : '1'}`}
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
                <Col xs="5" className="pl-0">
                    {children}
                </Col>
            </Row>
        </>
    )
})