import React, { useState, useRef, memo } from "react";
import { Row, Col, Input, Button, Popover, PopoverHeader, PopoverBody, Nav, NavItem, NavLink } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import request from "../../../../../../utils/request";
import blankImage from '../../../../../../assets/img/no-project.png';
import * as moment from 'moment';
import { toast } from "react-toastify";

const Attachments = ({ cardId, data, mutate }) => {

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
                {data?.map((att, i) => (
                    <Attachment data={att} key={i} mutate={() => mutate()} />
                ))}
            </Col>
            <Col xs={{ size: 10, offset: 1 }} className="px-0 mt-1">
                <PopOverAddAttach cardId={cardId} mutate={() => mutate()} />
            </Col>
        </Row>
    )
}

const Attachment = memo(({ data, mutate }) => {
    const [link, setLink] = useState(data.values)
    const [linkName, setLinkName] = useState(data.title)
    const [popOverEdit, setPopOverEdit] = useState(false)
    const [popOverDelete, setPopOverDelete] = useState(false)

    const handleUpdateAttachment = () => {
        request.put('v1/cards/attachment/' + data.id, { type: data.type, title: linkName, link })
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
        <div className="mb-3 d-flex align-items-center">
            <img src={data.values} alt="attachments" onError={(e) => onErrorAttachments(e)} className="attach-image" />
            <div className="ml-3">
                <a href={data.values} className="text-dark font-weight-bold" target="_blank" rel="noopener noreferrer">{data.title} <FontAwesomeIcon icon="external-link-alt" size="sm" className="ml-1" /> </a>
                <div className="text-muted d-flex">
                    Ditambahkan {moment(data.createdAt).format("DD MMMM YYYY")} pukul {moment(data.createdAt).format("HH:mm")} -
                    <div className="text-muted mx-2" style={{ textDecoration: 'underline', cursor: "pointer" }} id={`popover-lampiran-delete-${data.id}`}>Hapus</div> -
                    <Popover trigger="legacy" placement="bottom" target={`popover-lampiran-delete-${data.id}`} style={{ minWidth: '250px' }} isOpen={popOverDelete} toggle={() => setPopOverDelete(!popOverDelete)}>
                        <PopoverBody>
                            <p>Deleting an attachment is permanent. There is no undo.</p>
                            <Button color="danger" size="sm" block onClick={() => {
                                handleDeleteAttachment()
                                setPopOverDelete(!popOverDelete)
                            }}>
                                Hapus
                            </Button>
                        </PopoverBody>
                    </Popover>
                    <div className="text-muted ml-2" style={{ textDecoration: 'underline', cursor: "pointer" }} id={`popover-lampiran-edit-${data.id}`}>Ubah</div>
                    <Popover trigger="legacy" placement="bottom" target={`popover-lampiran-edit-${data.id}`} style={{ minWidth: '250px' }} isOpen={popOverEdit} toggle={() => setPopOverEdit(!popOverEdit)}>
                        <PopoverBody>
                            <div className={`font-weight-bold ${data.type !== 'link' && 'd-none'}`}>Link</div>
                            <Input type="text" className={`form-control attach-link ${data.type !== 'link' && 'd-none'}`} value={link} onChange={(e) => setLink(e.target.value)} placeholder="https://..."></Input>
                            <div className={`font-weight-bold mt-2`}>Link name</div>
                            <Input type="text" className={`form-control attach-link`} value={linkName} onChange={(e) => setLinkName(e.target.value)}></Input>
                            <Button color="netis-color" size="sm" className="mt-2 mb-3" onClick={() => {
                                handleUpdateAttachment()
                                setPopOverEdit(!popOverEdit)
                            }}>
                                Ubah
                            </Button>
                        </PopoverBody>
                    </Popover>
                </div>
            </div>
        </div>
    )
})

const PopOverAddAttach = memo(({ cardId, mutate }) => {
    const [link, setLink] = useState('')
    const [linkName, setLinkName] = useState('')
    const uploadAttach = useRef(null)
    const [popOverAttach, setPopOverAttach] = useState(false)

    const handleClickUpload = () => {
        uploadAttach.current.click();
    };

    const onChangeUpload = (e) => {
        if (e.target.files[0].size > 5242880) {
            toast.error('File melebihi ukuran maksimal (5mb)')
            return;
        }

        let formData = new FormData();
        formData.append('type', 'file');
        formData.append('attachments', e.target.files[0], e.target.files[0].name);

        request.post('v1/cards/' + cardId + '/attachments', formData)
            .then(() => mutate())
    }

    const onAttachLink = () => {
        request.post('v1/cards/' + cardId + '/attachments', { type: 'link', title: linkName, link })
            .then(() => mutate())
    }

    return (
        <>
            <Button color="secondary" size="sm" id="popover-lampiran" onClick={() => setPopOverAttach(!popOverAttach)}>
                Tambahkan lampiran
            </Button>
            <Popover trigger="legacy" placement="bottom" target="popover-lampiran" style={{ width: '250px' }} isOpen={popOverAttach} toggle={() => setPopOverAttach(!popOverAttach)}>
                <PopoverHeader>Attach from...</PopoverHeader>
                <PopoverBody>
                    <Nav vertical className="tour-tabApplicantDetail">
                        <NavItem>
                            <NavLink onClick={handleClickUpload}>Computer</NavLink>
                            <input type='file' id='file' ref={uploadAttach} style={{ display: 'none' }} onChange={(e) => onChangeUpload(e)}
                                accept=".jpg,.jpeg,.png,.gif,.svg,.pdf,.txt,.doc,.docx,.xlsx,.xls,.csv"
                            />
                        </NavItem>
                    </Nav>
                    <hr />
                    <div className="font-weight-bold">Attach a link</div>
                    <Input type="text" className="form-control attach-link" onChange={(e) => setLink(e.target.value)} placeholder="https://..."></Input>
                    <div className={`font-weight-bold mt-2 ${link ? 'd-block' : 'd-none'}`}>Link name</div>
                    <Input type="text" className={`form-control attach-link ${link ? 'd-block' : 'd-none'}`} onChange={(e) => setLinkName(e.target.value)}></Input>
                    <Button color="secondary" size="sm" className="mt-2 mb-3" disabled={!link && !linkName} onClick={() => {
                        onAttachLink()
                        setPopOverAttach(!popOverAttach)
                    }}>
                        Attach
                    </Button>
                </PopoverBody>
            </Popover>
        </>
    )
})

export default Attachments