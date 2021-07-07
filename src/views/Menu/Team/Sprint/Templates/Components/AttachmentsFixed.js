import React, { useState, useRef, memo, useEffect, useCallback } from "react";
import { Row, Col, Button, Popover, PopoverHeader, PopoverBody, UncontrolledTooltip, Modal } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import request from "../../../../../../utils/request";
import blankImage from '../../../../../../assets/img/no-project.png';
import { toast } from "react-toastify";


const AttachmentsFixed = memo(({ matchRoute, socket, cardId, write }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        socket.emit("joinAttachmentsCard", { cardId }, (res) => {
            if (!res.success) {
                console.log('error')
            } else {
                // setLoading(false)
            }
        });
        socket.on('getAttachmentsCard', (res) => {
            setData(res.data)
        })
        // eslint-disable-next-line
    }, [])

    return (
        <Row className="attach mb-4">
            <Col xs="1" className="px-0 d-flex align-items-center justify-content-center">
                <FontAwesomeIcon icon='paperclip' className="font-weight-bold" style={{ color: '#42526e', fontSize: '14pt' }} />
            </Col>
            <Col xs="11" className="px-0">
                <div className="d-flex align-items-center">
                    <h5 className={`font-weight-bold mb-0`}>Lampiran</h5>
                </div>
            </Col>
            <Col xs={{ size: 10, offset: 1 }} className="px-0 mt-3">
                <Row>
                    {data?.map((att, i) => (
                        <Col xs={`${data.length === 9 || data.length === 15 ? '4' : '3'}`} key={i}>
                            <Attachment matchRoute={matchRoute} socket={socket} cardId={cardId} data={att} key={i} write={write} />
                        </Col>
                    ))}
                </Row>
            </Col>
        </Row>
    )
})

export const AttachmentsFixedPreview = memo(({ cardId, data }) => {
    const onErrorAttachments = (e) => {
        e.target.src = blankImage;
        e.target.onerror = null;
    }

    return (
        <Row className="attach mt-3">
            {data?.map((att, i) => (
                <Col xs={`${data.length === 9 || data.length === 15 ? '4' : (data.length === 1 ? '12' : '3')}`} key={i} className="px-0">
                    <div className="attach-image-fixed small d-flex justify-content-center align-items-center" style={{ height: `${data.length === 9 || data.length === 15 ? '45px' : (data.length === 1 ? '130px' : '45px')}` }}>
                        <img src={att?.values ?? ''} alt="attachments" onError={(e) => onErrorAttachments(e)} id={`popover-lampiran-delete-${att.id}`} />
                    </div>
                </Col>
            ))}
        </Row >
    )
})

const Attachment = memo(({ matchRoute, socket, cardId, data, write }) => {
    const [showImage, setShowImage] = useState(false)
    const [popOverDelete, setPopOverDelete] = useState(false)
    const uploadAttach = useRef(null)

    const onChangeUpload = useCallback((e) => {
        if (e.target.files[0].size > 5242880) {
            toast.error('File melebihi ukuran maksimal (5mb)')
            return;
        }

        let formData = new FormData();
        formData.append('title', data.title);
        formData.append('attachment', e.target.files[0], e.target.files[0].name);

        request.put('v1/cards/attachment/' + data.id, formData).then(() => {
            socket.emit('postAttachment', { cardId, teamId: matchRoute.params.teamId }, (e) => { console.log('berhasil') })
        })
    }, [cardId, data, matchRoute, socket])

    const handleShowImage = useCallback(() => {
        setShowImage(!showImage)
    }, [showImage])

    const onErrorAttachments = useCallback((e) => {
        e.target.src = blankImage;
        e.target.onerror = null;
    }, [])

    return (
        <div className="mb-3">
            <div className="attach-image-fixed mb-3 d-flex justify-content-center align-items-center">
                <img src={data?.values ?? ''} alt="attachments" onError={(e) => onErrorAttachments(e)} />
                <input type='file' id='file' ref={uploadAttach} style={{ display: 'none' }} onChange={(e) => onChangeUpload(e)} accept="image/*" />
                {!data.values && write ?
                    <div
                        className="btn border-0 img-attach-button d-flex align-items-center justify-content-center"
                        style={{ position: 'absolute', cursor: 'pointer' }}
                        onClick={() => uploadAttach.current.click()}
                    >
                        <div className="float-right">
                            <FontAwesomeIcon icon="camera" size="2x" className="icon-upload" />
                        </div>
                    </div>
                    :
                    <div
                        className="btn border-0 img-attach-button"
                        style={{ position: 'absolute', cursor: 'pointer' }}
                        onClick={handleShowImage}
                    >
                        <div className="float-right">
                            <FontAwesomeIcon icon="eye" type="far" className="icon-show" onClick={handleShowImage} id={`popover-lampiran-show-${data.id}`} />
                            <UncontrolledTooltip placement="bottom" target={`popover-lampiran-show-${data.id}`}>
                                Lihat Gambar
                            </UncontrolledTooltip>
                            {write &&
                                <>
                                    <FontAwesomeIcon icon="edit" type="far" className="icon-edit mx-2" onClick={() => uploadAttach.current.click()} id={`popover-lampiran-edit-${data.id}`} />
                                    <UncontrolledTooltip placement="bottom" target={`popover-lampiran-edit-${data.id}`}>
                                        Ubah Gambar
                                    </UncontrolledTooltip>
                                    <FontAwesomeIcon icon="trash" className="icon-delete" id={`popover-lampiran-delete-${data.id}`} />
                                    <UncontrolledTooltip placement="bottom" target={`popover-lampiran-delete-${data.id}`}>
                                        Hapus Gambar
                                    </UncontrolledTooltip>
                                </>
                            }
                        </div>
                    </div>
                }
            </div>
            {data && write && popOverDelete &&
                <PopOverDeleteImage data={data} isOpen={popOverDelete} toggle={() => setPopOverDelete(!popOverDelete)} matchRoute={matchRoute} socket={socket} cardId={cardId} />
            }
        </div>
    )
})

const ShowImage = memo(({ data, isShow, toggle }) => {
    const handleToggle = useCallback(() => {
        toggle(false)
    }, [toggle])

    return (
        <Modal isOpen={isShow} toggle={() => handleToggle()}>

        </Modal>
    )
})

const PopOverDeleteImage = memo(({ data, isOpen, toggle, cardId, socket, matchRoute }) => {
    const handleDeleteAttachment = useCallback(() => {
        request.delete('v1/cards/attachment/' + data.id).then(() => {
            socket.emit('postAttachment', { cardId, teamId: matchRoute.params.teamId }, (e) => { console.log('berhasil') })
        })
    }, [cardId, data, matchRoute, socket])

    return (
        <Popover trigger="legacy" placement="bottom" target={`popover-lampiran-delete-${data.id}`} style={{ minWidth: '250px' }} isOpen={isOpen} toggle={() => toggle()}>
            <PopoverHeader className="text-center">Hapus gambar ini ?</PopoverHeader>
            <PopoverBody>
                <Row>
                    <Col xs="12" className="px-3">
                        <Button color="danger" size="sm" block onClick={() => {
                            handleDeleteAttachment()
                            toggle()
                        }}>
                            Hapus
                        </Button>
                    </Col>
                    <Col xs="12">
                        <small>*Change and deleting an attachment is permanent. There is no undo.</small>
                    </Col>
                </Row>
            </PopoverBody>
        </Popover>
    )
})

export default AttachmentsFixed