import React, { useEffect, useState, useRef } from "react";
import { Row, Col, Button } from "reactstrap";
import TextareaAutosize from 'react-textarea-autosize';
import request from "../../../../../../utils/request";
import noPhoto from '../../../../../../assets/img/no-photo.png';
import { useAuthUser } from "../../../../../../store";
import ReactStars from "react-rating-stars-component";

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
            <Row className="ml-4">
                <Col xs="12" className="px-0 d-flex align-items-center">
                    <ReactStars
                        count={5}
                        onChange={() => 'a'}
                        size={24}
                        isHalf={true}
                        emptyIcon={<i className="fa fa-star"></i>}
                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                        fullIcon={<i className="fa fa-star"></i>}
                        activeColor="#ffd700"
                    />
                </Col>
            </Row>
        </>
    )
}