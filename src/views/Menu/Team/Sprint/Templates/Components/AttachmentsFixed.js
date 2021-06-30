import React, { useState, useRef, memo } from "react";
import { Row, Col, Button, Popover, PopoverHeader, PopoverBody } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import request from "../../../../../../utils/request";
import blankImage from '../../../../../../assets/img/no-project.png';
import { toast } from "react-toastify";

const AttachmentsFixed = memo(({ cardId, data, mutate }) => {

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
                            <Attachment cardId={cardId} data={att} key={i} mutate={() => mutate()} />
                        </Col>
                    ))}
                </Row>
            </Col>
        </Row>
    )
})

export const AttachmentsFixedPreview = memo(({ cardId, data, mutate }) => {
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

const Attachment = memo(({ cardId, data, mutate }) => {
    const [popOverDelete, setPopOverDelete] = useState(false)
    const uploadAttach = useRef(null)

    const onChangeUpload = (e) => {
        if (e.target.files[0].size > 5242880) {
            toast.error('File melebihi ukuran maksimal (5mb)')
            return;
        }

        let formData = new FormData();
        formData.append('title', data.title);
        formData.append('attachment', e.target.files[0], e.target.files[0].name);

        request.put('v1/cards/attachment/' + data.id, formData)
            .then(() => mutate())
    }

    const handleDeleteAttachment = () => {
        request.delete('v1/cards/attachment/' + data.id)
            .then(() => mutate())
    }

    const onErrorAttachments = (e) => {
        e.target.src = blankImage;
        e.target.onerror = null;
    }

    return (
        <div className="mb-3">
            <div className="attach-image-fixed mb-3 d-flex justify-content-center align-items-center">
                <img src={data?.values ?? ''} alt="attachments" onError={(e) => onErrorAttachments(e)} id={`popover-lampiran-delete-${data.id}`} />
                <input type='file' id='file' ref={uploadAttach} style={{ display: 'none' }} onChange={(e) => onChangeUpload(e)} accept="image/*" />
                {!data.values &&
                    <div
                        className="btn border-0 img-attach-button d-flex justify-content-center align-items-center"
                        style={{ position: 'absolute' }}
                        onClick={() => uploadAttach.current.click()}
                    >
                        <i className="fa fa-2x fa-camera d-block" />
                    </div>
                }
            </div>
            {data &&
                <Popover trigger="legacy" placement="bottom" target={`popover-lampiran-delete-${data.id}`} style={{ minWidth: '250px' }} isOpen={popOverDelete} toggle={() => setPopOverDelete(!popOverDelete)}>
                    <PopoverHeader className="text-center">Action</PopoverHeader>
                    <PopoverBody>
                        <Row>
                            <Col xs="6" className="px-1 pl-3">
                                <Button color="primary" size="sm" block onClick={() => {
                                    uploadAttach.current.click()
                                    setPopOverDelete(!popOverDelete)
                                }}>
                                    Ubah
                                </Button>
                            </Col>
                            <Col xs="6" className="px-1 pr-3">
                                <Button color="danger" size="sm" block onClick={() => {
                                    handleDeleteAttachment()
                                    setPopOverDelete(!popOverDelete)
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
            }
        </div>
    )
})

export default AttachmentsFixed