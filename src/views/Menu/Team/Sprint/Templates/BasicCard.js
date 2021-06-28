import React, { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { Row, Col, Label, Input, Button, } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const BasicCardDetail = ({ data }) => {
    const [title, setTitle] = useState(data.content.title)
    const [desc, setDesc] = useState(data.content.desc)
    const descRef = useRef(null)
    const [isEditDesc, setIsEditDesc] = useState(false)

    const updateDetail = () => {

    }

    console.log(isEditDesc)
    return (
        <div className="card-detail">
            <Row className="mb-3">
                <Col xs="1" className="px-0 d-flex align-items-center justify-content-center">
                    <FontAwesomeIcon icon='pager' className="font-weight-bold" style={{ color: '#42526e', fontSize: '14pt' }} />
                </Col>
                <Col xs="10" className="px-0">
                    <Input
                        type="textarea"
                        rows={1}
                        className="form-control card-detail-title"
                        name="title"
                        id="title"
                        onChange={(e) => setTitle(e.target.value.replace(/[\r\n\v]+/g, ''))}
                        onBlur={(e) => setTitle(e.target.value.replace(/[\r\n\v]+/g, ''))}
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
            <Row className="mb-3">
                <Col xs="1" className="px-0 d-flex align-items-center justify-content-center">
                    <FontAwesomeIcon icon='align-left' className="font-weight-bold" style={{ color: '#42526e', fontSize: '14pt' }} />
                </Col>
                <Col xs="11" className="px-0">
                    <div className="d-flex align-items-center">
                        <h5 htmlFor="description" className={`font-weight-bold mb-0`}>Deskripsi</h5>
                        {desc && !isEditDesc && <Button color="secondary" size="sm" className="ml-2" onClick={() => {
                            descRef.current.focus()
                        }}>
                            Ubah
                        </Button>}
                    </div>
                </Col>

                <Col xs={{ size: 10, offset: 1 }} className="px-0 mt-3">
                    <Input
                        type="textarea"
                        className={`form-control card-detail-desc ${desc && 'is-filled'}`}
                        innerRef={descRef}
                        onChange={(e) => setDesc(e.target.value)}
                        onBlur={(e) => {
                            setDesc(e.target.value)
                            setIsEditDesc(false)
                        }}
                        onFocus={(e) => setIsEditDesc(true)}
                        value={desc}
                        placeholder="Masukkan deskripsi disini..."
                    />
                    {isEditDesc &&
                        <div className="mt-2">
                            <Button color="primary" size="md" onClick={() => descRef.current.focus()}>
                                Simpan
                            </Button>

                            {/* <Button size="md" className="bg-transparent" onClick={() => descRef.current.focus()}>
                                <i className="fa fa-times font-lg" />
                            </Button> */}
                        </div>
                    }
                </Col>
            </Row>
            <Row>
                <Col xs="1" className="px-0 d-flex align-items-center justify-content-center">
                    <FontAwesomeIcon icon='paperclip' className="font-weight-bold" style={{ color: '#42526e', fontSize: '14pt' }} />
                </Col>
                <Col xs="11" className="px-0">
                    <div className="d-flex align-items-center">
                        <h5 className={`font-weight-bold mb-0`}>Lampiran</h5>
                    </div>
                </Col>
                <Col xs={{ size: 10, offset: 1 }} className="px-0 mt-3">
                    <Button color="secondary" size="sm" >
                        Tambahkan lampiran
                    </Button>
                </Col>
            </Row>
        </div>
    )
}