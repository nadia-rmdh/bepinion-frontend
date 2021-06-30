import React, { useEffect, useState, useRef } from "react";
import { Row, Col, Button } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextareaAutosize from 'react-textarea-autosize';
import request from "../../../../../../utils/request";

export default ({ data, mutate, children }) => {
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const descRef = useRef(null)
    const [isEditDesc, setIsEditDesc] = useState(false)

    useEffect(() => {
        setTitle(data?.values.title)
        setDesc(data?.values.description)
    }, [data])

    const updateDetail = () => {
        request.put('v1/cards/' + data.id, { title, description: desc })
            .then(() => mutate())
        // .catch(() => alert('Error'))
    }

    return (
        <>
            <Row className="mb-4">
                <Col xs="1" className="px-0 d-flex align-items-center justify-content-center">
                    <FontAwesomeIcon icon='pager' className="font-weight-bold" style={{ color: '#42526e', fontSize: '14pt' }} />
                </Col>
                <Col xs="10" className="px-0">
                    <TextareaAutosize
                        className="form-control card-detail-title"
                        onChange={(e) => {
                            setTitle(e.target.value.replace(/[\r\n\v]+/g, ''))
                        }}
                        onBlur={(e) => {
                            setTitle(e.target.value.replace(/[\r\n\v]+/g, ''))
                            updateDetail()
                        }}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                setTitle(e.target.value.replace(/[\r\n\v]+/g, ''))
                                e.target.blur()
                            }
                        }}
                        value={title}
                        placeholder="Masukkan judul disini..."
                    />
                </Col>
            </Row>
            {children}
            <Row className="mb-4">
                <Col xs="1" className="px-0 d-flex align-items-center justify-content-center">
                    <FontAwesomeIcon icon='align-left' className="font-weight-bold" style={{ color: '#42526e', fontSize: '14pt' }} />
                </Col>
                <Col xs="11" className="px-0">
                    <div className="d-flex align-items-center">
                        <h5 htmlFor="description" className={`font-weight-bold mb-0`}>Deskripsi</h5>
                        {desc && !isEditDesc && <Button color="secondary" size="sm" className="ml-2" onClick={() => {
                            setIsEditDesc(true)
                            descRef.current.focus()
                        }}>
                            Ubah
                        </Button>}
                    </div>
                </Col>
                <Col xs={{ size: 10, offset: 1 }} className="px-0 mt-1">
                    <TextareaAutosize
                        ref={descRef}
                        className={`form-control card-detail-desc ${desc && 'is-filled'}`}
                        onChange={(e) => setDesc(e.target.value)}
                        onBlur={(e) => {
                            setDesc(e.target.value)
                            setIsEditDesc(false)
                            updateDetail()
                        }}
                        onFocus={(e) => setIsEditDesc(true)}
                        value={desc}
                        placeholder="Masukkan deskripsi disini..."
                    />
                    {isEditDesc &&
                        <div className="mt-2">
                            <Button color="primary" size="md" onClick={() => { descRef.current.focus() }}>
                                Simpan
                            </Button>
                        </div>
                    }
                </Col>
            </Row>
        </>
    )
}