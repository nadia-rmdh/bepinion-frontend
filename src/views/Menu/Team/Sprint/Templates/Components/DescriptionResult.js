import React, { useEffect, useState, useRef, memo, useCallback } from "react";
import { Row, Col, Button } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextareaAutosize from 'react-textarea-autosize';

export default memo(({ matchRoute, socket, cardId, children, write, container }) => {
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState({
        desc: '',
        benefits: '',
        cost: '',
        resource: '',
        conclusion: '',
    })
    const [isEditDesc, setIsEditDesc] = useState({
        desc: false,
        benefits: false,
        cost: false,
        resource: false,
        conclusion: false,
    })
    const [data, setData] = useState(null);
    const descRef = useRef(null)
    const benefitRef = useRef(null)
    const costRef = useRef(null)
    const resourceRef = useRef(null)
    const conclusionRef = useRef(null)

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
        setDesc(state => ({ ...state, desc: data?.values?.description ?? '', benefits: data?.values?.benefits ?? '', cost: data?.values?.cost ?? '', resource: data?.values?.resource ?? '', conclusion: data?.values?.conclusion ?? '' }))
    }, [data])

    const handleChangeDescription = useCallback((e) => {
        const value = e.target.value
        setDesc(state => ({ ...state, desc: value }))
    }, [])

    const handleChangeBenefits = useCallback((e) => {
        const value = e.target.value
        setDesc(state => ({ ...state, benefits: value }))
    }, [])

    const handleChangeCost = useCallback((e) => {
        const value = e.target.value
        setDesc(state => ({ ...state, cost: value }))
    }, [])

    const handleChangeResource = useCallback((e) => {
        const value = e.target.value
        setDesc(state => ({ ...state, resource: value }))
    }, [])

    const handleChangeConclusion = useCallback((e) => {
        const value = e.target.value
        setDesc(state => ({ ...state, conclusion: value }))
    }, [])

    const updateDetail = () => {
        socket.emit('putDetail', { id: data.id, data: { title, description: desc.desc, benefits: desc.benefits, cost: desc.cost, resource: desc.resource, conclusion: desc.conclusion }, teamId: matchRoute.params.teamId }, () => { })
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
                    <Row className="mb-4">
                        <Col xs="2" className="px-0 d-flex align-items-center justify-content-center">
                            <FontAwesomeIcon icon='align-left' className="font-weight-bold" style={{ color: '#42526e', fontSize: '14pt' }} />
                        </Col>
                        <Col xs="10" className="px-0 d-flex align-items-center">
                            <h5 htmlFor="description" className={`font-weight-bold mb-0`}>Deskripsi</h5>
                            {write && !isEditDesc.desc && <Button color="secondary" size="sm" className="ml-2" onClick={() => {
                                setIsEditDesc(state => ({ ...state, desc: true }))
                                descRef.current.focus()
                            }}>
                                Ubah
                            </Button>}
                        </Col>
                        <Col xs={{ size: 10, offset: 2 }} className="px-0 pr-3 mt-1">
                            {!write ?
                                <TextareaAutosize
                                    className="form-control card-detail-desc is-filled"
                                    style={{ cursor: 'default' }}
                                    disabled={!write}
                                    value={desc.desc}
                                    placeholder="Masukkan deskripsi disini..."
                                />
                                :
                                <TextareaAutosize
                                    ref={descRef}
                                    className={`form-control card-detail-desc ${desc.desc && 'is-filled'}`}
                                    onChange={handleChangeDescription}
                                    onBlur={(e) => {
                                        setIsEditDesc(state => ({ ...state, desc: false }))
                                        updateDetail()
                                    }}
                                    onFocus={(e) => setIsEditDesc(state => ({ ...state, desc: true }))}
                                    value={desc.desc}
                                    disabled={!write}
                                    placeholder="Masukkan deskripsi disini..."
                                />
                            }
                            {isEditDesc.desc && write &&
                                <div className="mt-2">
                                    <Button color="primary" size="md" onClick={() => { descRef.current.focus() }}>
                                        Simpan
                                    </Button>
                                </div>
                            }
                        </Col>
                    </Row>
                    {children}
                </Col>
                <Col xs="6">
                    <Row>
                        <Col xs="2" className="px-0 d-flex align-items-center justify-content-center">
                            <FontAwesomeIcon icon='business-time' className="font-weight-bold" style={{ color: '#42526e', fontSize: '14pt' }} />
                        </Col>
                        <Col xs="10" className="px-0 d-flex align-items-center">
                            <h5 htmlFor="benefit" className={`font-weight-bold mb-0`}>Benefit</h5>
                            {write && !isEditDesc.benefits && <Button color="secondary" size="sm" className="ml-2" onClick={() => {
                                setIsEditDesc(state => ({ ...state, benefits: true }))
                                benefitRef.current.focus()
                            }}>
                                Ubah
                            </Button>}
                        </Col>
                        <Col xs={{ size: 10, offset: 2 }} className="px-0 pr-3 mt-3">
                            {!write ?
                                <TextareaAutosize
                                    className="form-control card-detail-desc is-filled"
                                    style={{ cursor: 'default' }}
                                    disabled={!write}
                                    value={desc.benefits}
                                    placeholder="Masukkan benefit disini..."
                                />
                                :
                                <TextareaAutosize
                                    ref={benefitRef}
                                    className={`form-control card-detail-desc ${desc.benefits && 'is-filled'}`}
                                    onChange={handleChangeBenefits}
                                    onBlur={(e) => {
                                        setIsEditDesc(state => ({ ...state, benefits: false }))
                                        updateDetail()
                                    }}
                                    onFocus={(e) => setIsEditDesc(state => ({ ...state, benefits: true }))}
                                    value={desc.benefits}
                                    disabled={!write}
                                    placeholder="Masukkan benefit disini..."
                                />
                            }
                            {isEditDesc.benefits && write &&
                                <div className="mt-2">
                                    <Button color="primary" size="md" onClick={() => { benefitRef.current.focus() }}>
                                        Simpan
                                    </Button>
                                </div>
                            }
                        </Col>
                    </Row>
                    <Row className="mt-5">
                        <Col xs="2" className="px-0 d-flex align-items-center justify-content-center">
                            <FontAwesomeIcon icon='money-bill' className="font-weight-bold" style={{ color: '#42526e', fontSize: '14pt' }} />
                        </Col>
                        <Col xs="10" className="px-0 d-flex align-items-center">
                            <h5 htmlFor="benefit" className={`font-weight-bold mb-0`}>Biaya</h5>
                            {write && !isEditDesc.cost && <Button color="secondary" size="sm" className="ml-2" onClick={() => {
                                setIsEditDesc(state => ({ ...state, cost: true }))
                                costRef.current.focus()
                            }}>
                                Ubah
                            </Button>}
                        </Col>
                        <Col xs={{ size: 10, offset: 2 }} className="px-0 pr-3 mt-3">
                            {!write ?
                                <TextareaAutosize
                                    className="form-control card-detail-desc is-filled"
                                    style={{ cursor: 'default' }}
                                    disabled={!write}
                                    value={desc.cost}
                                    placeholder="Masukkan biaya disini..."
                                />
                                :
                                <TextareaAutosize
                                    ref={costRef}
                                    className={`form-control card-detail-desc ${desc.cost && 'is-filled'}`}
                                    onChange={handleChangeCost}
                                    onBlur={(e) => {
                                        setIsEditDesc(state => ({ ...state, cost: false }))
                                        updateDetail()
                                    }}
                                    onFocus={(e) => setIsEditDesc(state => ({ ...state, cost: true }))}
                                    value={desc.cost}
                                    disabled={!write}
                                    placeholder="Masukkan biaya disini..."
                                />
                            }
                            {isEditDesc.cost && write &&
                                <div className="mt-2">
                                    <Button color="primary" size="md" onClick={() => { costRef.current.focus() }}>
                                        Simpan
                                    </Button>
                                </div>
                            }
                        </Col>
                    </Row>
                    <Row className="mt-5">
                        <Col xs="2" className="px-0 d-flex align-items-center justify-content-center">
                            <FontAwesomeIcon icon='people-carry' className="font-weight-bold" style={{ color: '#42526e', fontSize: '14pt' }} />
                        </Col>
                        <Col xs="10" className="px-0 d-flex align-items-center">
                            <h5 htmlFor="benefit" className={`font-weight-bold mb-0`}>Sumber Daya</h5>
                            {write && !isEditDesc.resource && <Button color="secondary" size="sm" className="ml-2" onClick={() => {
                                setIsEditDesc(state => ({ ...state, resource: true }))
                                resourceRef.current.focus()
                            }}>
                                Ubah
                            </Button>}
                        </Col>
                        <Col xs={{ size: 10, offset: 2 }} className="px-0 pr-3 mt-3">
                            {!write ?
                                <TextareaAutosize
                                    className="form-control card-detail-desc is-filled"
                                    style={{ cursor: 'default' }}
                                    disabled={!write}
                                    value={desc.resource}
                                    placeholder="Masukkan biaya disini..."
                                />
                                :
                                <TextareaAutosize
                                    ref={resourceRef}
                                    className={`form-control card-detail-desc ${desc.resource && 'is-filled'}`}
                                    onChange={handleChangeResource}
                                    onBlur={(e) => {
                                        setIsEditDesc(state => ({ ...state, resource: false }))
                                        updateDetail()
                                    }}
                                    onFocus={(e) => setIsEditDesc(state => ({ ...state, resource: true }))}
                                    value={desc.resource}
                                    disabled={!write}
                                    placeholder="Masukkan biaya disini..."
                                />
                            }
                            {isEditDesc.resource && write &&
                                <div className="mt-2">
                                    <Button color="primary" size="md" onClick={() => { resourceRef.current.focus() }}>
                                        Simpan
                                    </Button>
                                </div>
                            }
                        </Col>
                    </Row>
                    <Row className="mt-5">
                        <Col xs="2" className="px-0 d-flex align-items-center justify-content-center">
                            <FontAwesomeIcon icon='book-open' className="font-weight-bold" style={{ color: '#42526e', fontSize: '14pt' }} />
                        </Col>
                        <Col xs="10" className="px-0 d-flex align-items-center">
                            <h5 htmlFor="benefit" className={`font-weight-bold mb-0`}>Kesimpulan</h5>
                            {write && !isEditDesc.conclusion && <Button color="secondary" size="sm" className="ml-2" onClick={() => {
                                setIsEditDesc(state => ({ ...state, conclusion: true }))
                                conclusionRef.current.focus()
                            }}>
                                Ubah
                            </Button>}
                        </Col>
                        <Col xs={{ size: 10, offset: 2 }} className="px-0 pr-3 mt-3">
                            {!write ?
                                <TextareaAutosize
                                    className="form-control card-detail-desc is-filled"
                                    style={{ cursor: 'default' }}
                                    disabled={!write}
                                    value={desc.conclusion}
                                    placeholder="Masukkan biaya disini..."
                                />
                                :
                                <TextareaAutosize
                                    ref={conclusionRef}
                                    className={`form-control card-detail-desc ${desc.conclusion && 'is-filled'}`}
                                    onChange={handleChangeConclusion}
                                    onBlur={(e) => {
                                        setIsEditDesc(state => ({ ...state, conclusion: false }))
                                        updateDetail()
                                    }}
                                    onFocus={(e) => setIsEditDesc(state => ({ ...state, conclusion: true }))}
                                    value={desc.conclusion}
                                    disabled={!write}
                                    placeholder="Masukkan biaya disini..."
                                />
                            }
                            {isEditDesc.conclusion && write &&
                                <div className="mt-2">
                                    <Button color="primary" size="md" onClick={() => { conclusionRef.current.focus() }}>
                                        Simpan
                                    </Button>
                                </div>
                            }
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
})