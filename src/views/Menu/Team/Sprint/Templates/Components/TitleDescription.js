import React, { useEffect, useState, useRef, memo } from "react";
import { Row, Col, Button } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextareaAutosize from 'react-textarea-autosize';
import DueDate from "./DueDate";

export default memo(({ matchRoute, socket, cardId, children, write, container }) => {
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const descRef = useRef(null)
    const [isEditDesc, setIsEditDesc] = useState(false)
    const [data, setData] = useState(null);

    useEffect(() => {
        socket.emit("joinDetailCard", { cardId }, (res) => {
            if (!res.success) {
                console.log('Socket Error')
            } else {
                // setLoading(false)
            }
        });
        socket.on('getDetailCard', (res) => {
            setData(res.data)
        })
    }, [socket, cardId])

    useEffect(() => {
        setTitle(data?.values.title)
        setDesc(data?.values.description)
    }, [data])

    const updateDetail = () => {
        socket.emit('putDetail', { id: data.id, data: { title, description: desc }, teamId: matchRoute.params.teamId }, () => { })
    }

    return (
        <>
            <Row className="mb-4">
                <Col xs="1" className="px-0 d-flex align-items-center justify-content-center">
                    <FontAwesomeIcon icon='pager' className="font-weight-bold" style={{ color: '#42526e', fontSize: '14pt' }} />
                </Col>
                <Col xs="8" className="px-0 d-flex align-items-center">
                    {!write ?
                        <TextareaAutosize
                            className="form-control card-detail-title"
                            style={{ cursor: 'default' }}
                            disabled={!write}
                            value={title}
                            placeholder="Masukkan judul disini..."
                        />
                        :
                        <TextareaAutosize
                            className="form-control card-detail-title"
                            disabled={!write}
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
                    }
                </Col>
            </Row>

            <Row className="mb-4">
                <Col xs="6">
                    {children}
                </Col>
                <Col xs="6">
                    {container === 'prototyping' && data && <DueDate matchRoute={matchRoute} socket={socket} data={data?.dueDate} cardId={cardId} write={write} />}
                </Col>
            </Row>
            <Row className="mb-4">
                <Col xs="1" className="px-0 d-flex align-items-center justify-content-center">
                    <FontAwesomeIcon icon='align-left' className="font-weight-bold" style={{ color: '#42526e', fontSize: '14pt' }} />
                </Col>
                <Col xs="11" className="px-0 d-flex align-items-center">
                    <h5 htmlFor="description" className={`font-weight-bold mb-0`}>Deskripsi</h5>
                    {desc && write && !isEditDesc && <Button color="secondary" size="sm" className="ml-2" onClick={() => {
                        setIsEditDesc(true)
                        descRef.current.focus()
                    }}>
                        Ubah
                    </Button>}
                </Col>
                <Col xs={{ size: 10, offset: 1 }} className="px-0 mt-1">
                    {!write ?
                        <TextareaAutosize
                            className="form-control card-detail-desc is-filled"
                            style={{ cursor: 'default' }}
                            disabled={!write}
                            value={desc}
                            placeholder="Masukkan deskripsi disini..."
                        />
                        :
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
                            disabled={!write}
                            placeholder="Masukkan deskripsi disini..."
                        />
                    }
                    {isEditDesc && write &&
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
})