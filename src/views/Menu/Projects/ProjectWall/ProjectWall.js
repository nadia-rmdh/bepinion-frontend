import React, { Fragment, useCallback, useMemo, useRef, useState } from "react"
import { Card, CardBody, Row, Col, Button, ModalBody, Modal, Badge, Input, InputGroup, InputGroupAddon, InputGroupText, Spinner, Table, Label, UncontrolledPopover, PopoverBody, Progress } from "reactstrap";
import { useFormik } from "formik";
import Datepicker from "react-datepicker";
import { useRouteMatch } from "react-router-dom";
import useSWR from "swr";
import moment from "moment";
import dummyData from './dummyData'
import { convertToRupiah } from "../../../../utils/formatter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextareaAutosize from "react-textarea-autosize";
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from 'draftjs-to-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Select from "react-select";
import CreatableSelect from 'react-select/creatable'
import { toast } from "react-toastify";
import request from "../../../../utils/request";
import htmlParser from "html-react-parser";
import { validateEmail } from './shared';
import ReactInputMask from "react-input-mask";
import { useAuthUser } from "../../../../store";

const statusDeliverable = {
    draft: 'Draft',
    pending: 'For Review',
    rejected: 'To Revise',
    approved: 'Approved',
}

export default () => {
    const authUser = useAuthUser();
    const matchRoute = useRouteMatch();
    const deliverableRef = useRef();
    const uploadFile = useRef(null)
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [reply, setReply] = useState({
        idActivity: '',
        comment: '',
    })
    const [modalVerify, setModalVerify] = useState({ id: 0, status: '', statusMessage: '', open: false });
    const { data: getData, error, mutate } = useSWR(() => `v1/project/${matchRoute.params.projectId}/activity`);
    const loading = !getData || error
    const data = useMemo(() => {
        return getData?.data?.data ?? [];
    }, [getData]);

    const attendancesOptions = useMemo(() => {
        const attendances = data?.professional?.map(pro => ({ name: pro.name, id: pro.id, role: 'professional' })) ?? [];
        return attendances.concat([{ name: data?.client?.name, id: data?.client?.id, role: 'client' }]);
    }, [data])

    const deliverableData = useMemo(() => {
        return data?.activityDetails?.filter(act => act.category === 'deliverable').sort((a, b) => a.id - b.id) ?? null
    }, [data])

    const { values, setValues, handleSubmit, isSubmitting } = useFormik({
        initialValues: {
            category: 'discussion',
            content: {},
            text: '',
            isDraft: 'false',
            files: [],
        },
        // validationSchema: ValidationFormSchema,
        onSubmit: (values, { setSubmitting, setErrors, setValues }) => {
            setSubmitting(true)
            let formData = new FormData()
            formData.append('category', values.category)
            formData.append('content', JSON.stringify(values.content))
            formData.append('text', values.text)
            formData.append('isDraft', values.isDraft)
            if (values.files.length > 0) {
                values.files.filter(f => !f.id).map((file, i) => {
                    return formData.append('file' + (i + 1), file.file, file.file.name)
                })
            }

            request.post(`v1/project/${matchRoute.params.projectId}/activity`, formData)
                .then(res => {
                    toast.success('Create Discussion Successfully')
                    setValues({
                        category: 'discussion',
                        content: {},
                        text: '',
                        isDraft: 'false',
                        files: [],
                    })
                    setEditorState(EditorState.createEmpty())
                    mutate()
                })
                .catch(err => {
                    toast.error('Create Discussion Failed.');
                })
                .finally(() => {
                    setSubmitting(false)
                })
        }
    })

    const handleClickCategory = useCallback((category) => {
        if (category === 'discussion') {
            setValues((state) => ({ ...state, category }))
        } else {
            if (deliverableData?.pop().status === 'draft') {
                setValues({ category, content: { attendees: attendancesOptions, additionalAttendees: deliverableData.pop().content.additionalAttendees, meeting: deliverableData.pop().content.meeting }, text: deliverableData.pop().text, isDraft: 'true', files: deliverableData.pop().files })
                setEditorState(EditorState.createWithContent(
                    ContentState.createFromBlockArray(
                        convertFromHTML(deliverableData.pop().text)
                    )
                ))
            } else {
                setValues((state) => ({ ...state, category, content: { attendees: attendancesOptions, additionalAttendees: [], meeting: { date: moment().format('DD MMMM YYYY'), startTime: moment().format('HH:mm'), endTime: '' } } }))
            }
        }
    }, [setValues, attendancesOptions, deliverableData])

    const handleChangeAttendance = useCallback((e) => {
        setValues(old => ({ ...old, content: { ...old.content, additionalAttendees: e ?? [] } }))
    }, [setValues])

    const handleChangeMeetingEndTime = useCallback((e) => {
        const { value } = e.target;
        setValues(old => ({ ...old, content: { ...old.content, meeting: { ...old.content.meeting, endTime: value } } }))
    }, [setValues])

    const handleEditorChange = (editorState) => {
        setValues(state => ({ ...state, text: draftToHtml(editorState) }))
    }

    const handlePostReply = () => {
        request.post(`v1/project/${matchRoute.params.projectId}/activity-reply`, reply)
            .then(res => {
                toast.success('Reply Successfully')
                setReply({
                    idActivity: '',
                    comment: '',
                })
                mutate()
            })
            .catch(err => {
                toast.error('Reply Failed');
            })
    }

    const handleClickSubmit = useCallback(async (e) => {
        await setValues(old => ({ ...old, isDraft: e }))
        handleSubmit()
    }, [setValues, handleSubmit])

    const handleVerifyDeliverable = useCallback((id, status, statusMessage) => {
        request.put(`v1/project/${matchRoute.params.projectId}/activity-status`, {
            idActivity: id,
            status,
            statusMessage
        })
            .then(res => {
                toast.success('Verify Deliverable Successfully')
                mutate()
            })
            .catch(err => {
                toast.error('Verify Deliverable Failed.');
            })
            .finally(() => {
                setModalVerify({ id: 0, status: '', statusMessage: '', open: false })
            })
    }, [matchRoute.params.projectId, mutate])

    const handleUploadFile = useCallback((e) => {
        e.preventDefault();
        const { files } = e.target
        if (files[0].size > 5242880) {
            toast.error('Maximum file size is 5mb')
            return;
        }
        setValues(old => ({ ...old, files: [...old.files, { preview: URL.createObjectURL(files[0]), file: files[0] }] }))
    }, [setValues])

    const handleDeleteFile = useCallback((preview) => {
        setValues(old => ({ ...old, files: old.files.filter(file => file.preview !== preview) }))
    }, [setValues])

    const handleChangeMeetingDate = useCallback((e) => {
        request.put(`v1/project/${matchRoute.params.projectId}/activity-meeting`, {
            meetingDetails: {
                link: data.meetingDetails.link,
                date: moment(e)
            }
        })
            .then(res => {
                // toast.success('Create Discussion Successfully')
                mutate()
            })
        // .catch(err => {
        //     toast.error('Create Discussion Failed.');
        // })
    }, [data, matchRoute.params.projectId, mutate])

    if (loading) {
        return (
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    // background: "rgba(255,255,255, 0.5)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Spinner style={{ width: 48, height: 48 }} />
            </div>
        )
    }

    return (
        <Row>
            <Col xs="12">
                <div className="font-xl font-weight-bold mb-4">{data.projectName}</div>
            </Col>
            <Col xs="12" md="4">
                <Card className="shadow-sm">
                    <CardBody>
                        <Row>
                            <Col xs="12">
                                <div><span className="text-muted">Client</span> {data.client.name}</div>
                                <div><span className="text-muted">Consultant</span> {data?.professional[0]?.name}</div>
                                <div><span className="text-muted">Contract value</span> {convertToRupiah(dummyData.contractValue)}</div>
                                <div><span className="text-muted">Starting Date</span> {moment(data.stratingDate).format('DD MMMM YYYY')}</div>
                                <div><span className="text-muted">Closing Date</span> {moment(data.closingDate).format('DD MMMM YYYY')}</div>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
                <Card className="shadow-sm">
                    <CardBody>
                        <Row>
                            <Col xs="12">
                                <div className="font-lg font-weight-bold mb-3">Meeting</div>
                                <div className="text-muted">Meeting Link <a href={data.meetingDetails.link} target="_blank" rel="noopener noreferrer" className="font-weight-bold ml-1">Click here</a> </div>
                                <div className="mt-2">
                                    <div className="text-muted mb-1">Meeting Date</div>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend" className="w-100">
                                            <Datepicker
                                                required
                                                name="startDate"
                                                selected={new Date(data?.meetingDetails?.date ?? moment())}
                                                dateFormat="dd MMMM yyyy hh:mm"
                                                minDate={new Date()}
                                                placeholderText="Select a date"
                                                className="form-control"
                                                showTimeInput
                                                autoComplete="off"
                                                onSelect={handleChangeMeetingDate}
                                                onChangeRaw={(e) => e.preventDefault()}
                                            />
                                            <InputGroupText>
                                                <FontAwesomeIcon icon="calendar-alt" />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </div>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
            <Col xs="12" md="8">
                <Card className="shadow-sm">
                    <CardBody>
                        <Row>
                            <Col xs="12">
                                <div className="font-lg font-weight-bold mb-3">Key Milestone</div>
                            </Col>
                            <Col xs="12">
                                <Table bordered className="text-center">
                                    <thead>
                                        <tr>
                                            <th>Activities</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dummyData.keyMilestones.map((v, i) =>
                                            <tr key={i}>
                                                <td>{v.activities}</td>
                                                <td>{moment(v.date).add(i, 'days').format('DD MMMM YYYY')}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </Col>
                            <Col xs="12" className="d-flex justify-content-between align-items-center">
                                <Button color="secondary" className="mr-2 text-light" id="popover-file-list">Project Files</Button>
                                <FileList data={data?.fileDetails} />
                                <div>
                                    <div className="mb-1 text-muted">Status of deliverable</div>
                                    <div className="mb-3 text-center">
                                        <Badge
                                            color={deliverableData?.filter(act => act.status !== 'draft').pop().status === 'approved'
                                                ? 'success'
                                                : (deliverableData?.filter(act => act.status !== 'draft').pop().status === 'rejected' ? 'danger'
                                                    : (deliverableData?.filter(act => act.status !== 'draft').pop().status === 'pending' ? 'warning'
                                                        : 'secondary'))}
                                            className="font-lg text-light text-uppercase"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => deliverableRef.current.scrollIntoView({ behavior: "smooth" })}
                                        >
                                            {statusDeliverable[deliverableData?.filter(act => act.status !== 'draft').pop().status] ?? 'Draft'}
                                        </Badge>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
            <Col xs="12">
                <Card className="shadow-sm">
                    <CardBody>
                        <Row>
                            <Col xs="12" className="mb-3">
                                <Button color={`${values?.category === 'discussion' ? 'primary' : 'light'}`} className="text-dark mr-3" onClick={() => handleClickCategory('discussion')}>Discussion</Button>
                                {authUser.role === 'professional' && ['draft', 'rejected'].includes(deliverableData?.status ?? 'draft') && <Button color={`${values?.category === 'deliverable' ? 'primary' : 'light'}`} className="text-dark" onClick={() => handleClickCategory('deliverable')}>Deliverable</Button>}
                            </Col>
                            {values.category === 'deliverable' &&
                                <Col xs="12">
                                    <Row className="my-3">
                                        <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                            <Label>Meeting Date</Label>
                                        </Col>
                                        <Col xs="12" md="8" lg="9" className="d-flex align-items-center justify-content-between">
                                            {values?.content?.meeting?.date}
                                        </Col>
                                    </Row>
                                    <Row className="my-3">
                                        <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                            <Label>Meeting Time</Label>
                                        </Col>
                                        <Col xs="12" md="8" lg="9" className="d-flex align-items-center justify-content-between">
                                            <InputGroup>
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText className="bg-transparent border-0 pl-0">
                                                        {values?.content?.meeting?.startTime} -
                                                    </InputGroupText>
                                                    <ReactInputMask type="text" mask="99:99" value={values?.content?.meeting?.endTime} onChange={handleChangeMeetingEndTime} placeholder="Example 08:00">
                                                        {(inputProps) => <Input {...inputProps} />}
                                                    </ReactInputMask>
                                                </InputGroupAddon>
                                            </InputGroup>
                                        </Col>
                                    </Row>
                                    <Row className="my-3">
                                        <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                            <Label>Attendees</Label>
                                        </Col>
                                        <Col xs="12" md="8" lg="9" className="d-flex">
                                            {values?.content?.attendees?.map((att, i) => (
                                                <div key={i}> {att.name}{values?.content?.attendees.length === i + 1 ? '' : ", "}</div>
                                            ))}
                                        </Col>
                                    </Row>
                                    <Row className="my-3">
                                        <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                            <Label>Additional attendees</Label>
                                        </Col>
                                        <Col xs="12" md="8" lg="9">
                                            <CreatableSelect
                                                isClearable
                                                isMulti
                                                placeholder="Input attendees email..."
                                                value={values?.content?.additionalAttendees}
                                                isValidNewOption={(inputValue) => validateEmail(inputValue)}
                                                onChange={handleChangeAttendance}
                                                formatGroupLabel={(data) => <div style={{ display: 'flex', alignItems: 'center' }}><span style={{ fontWeight: 'bold', fontSize: '10px', letterSpacing: '1px' }} className="text-muted">{data.label}</span></div>}
                                                noOptionsMessage={(inputValue) => <span>Input attendees email</span>}
                                                components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                            }
                            <Col xs="12">
                                <Editor
                                    editorState={editorState}
                                    editorStyle={{ height: '300px' }}
                                    onEditorStateChange={(editorState) => setEditorState(editorState)}
                                    onContentStateChange={(editorState) => handleEditorChange(editorState)}
                                />
                            </Col>
                            <Col xs="12" className="my-3">
                                {values?.files?.map((file, i) => (
                                    <Fragment key={i}>
                                        <div className="rounded border border-dark d-inline p-1">
                                            <FontAwesomeIcon icon="times" color="#f86c6b" className="mr-1" onClick={() => handleDeleteFile(file.preview)} style={{ cursor: "pointer" }} /> {file?.file?.name ?? file.fileName}
                                        </div>
                                        <div className="mb-3"></div>
                                    </Fragment>
                                ))}
                            </Col>
                            <Col xs="12">
                                <input type='file' ref={uploadFile} style={{ display: 'none' }} onChange={(e) => handleUploadFile(e)} />
                                {/* accept="image/*,video/mp4,video/x-m4v,video/*,application/*" */}
                                <Button color="info" className="text-light" onClick={() => uploadFile.current.click()}> <FontAwesomeIcon icon="upload" /> Attachment</Button>
                                <Button color="primary" className="float-right" onClick={() => handleClickSubmit('false')} disabled={isSubmitting}>{isSubmitting ? <><Spinner color="light" size="sm" /> Loading...</> : "Post"}</Button>
                                {values.category === 'deliverable' &&
                                    <Button color="secondary" className="float-right mr-2 text-light" onClick={() => handleClickSubmit('true')} disabled={isSubmitting}>{isSubmitting ? <><Spinner color="light" size="sm" /> Loading...</> : "Draft"}</Button>
                                }
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
            <Col xs="12">
                <Row>
                    <Col xs="12" md="3">
                        <div className="mb-1 text-muted">Category</div>
                        <div className="mb-3">
                            <Select
                                closeMenuOnSelect={false}
                                isClearable
                                placeholder="Choose a category..."
                                components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                            />
                        </div>
                    </Col>
                    <Col xs="12" md="3">
                        <div className="mb-1 text-muted">Date Sort</div>
                        <div className="mb-3">
                            <Select
                                closeMenuOnSelect={false}
                                isClearable
                                placeholder="Choose a date sort..."
                                components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                            />
                        </div>
                    </Col>
                    <Col xs="12" md="3" className="justify-content-end">
                        <div className="mb-1 text-muted">&nbsp;</div>
                        <div className="mb-3">
                            <Input type="text" placeholder="Search..." />
                        </div>
                    </Col>
                    <Col xs="12">
                        {data.activityDetails.length <= 0 &&
                            <Card className="shadow-sm">
                                <CardBody className="position-relative">
                                    <div style={{ width: '100%', height: '500px' }} className="d-flex align-items-center justify-content-center text-muted"> No Activities </div>
                                </CardBody>
                            </Card>
                        }
                        {data.activityDetails.filter(act => act.status !== 'draft').sort((a, b) => a.id - b.id).map((activity, i) => (
                            <Card className="shadow-sm" key={i}>
                                <CardBody className="position-relative">
                                    <div className="position-absolute" style={{ right: 20 }}>
                                        <Badge className="font-lg text-uppercase text-light" color={`${activity.category === 'document' ? 'danger' : (activity.category === 'discussion' ? 'warning' : 'primary')}`}>{activity.category}</Badge>
                                    </div>
                                    <div className="font-lg font-weight-bold mb-1">{activity.createdBy.name}</div>
                                    <div className="text-muted mb-3">{moment.utc(activity.createdAt).local().format('DD MMMM YYYY hh:mm')}</div>
                                    {activity.category === 'deliverable' &&
                                        <div>
                                            <Row className="my-1">
                                                <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                                    <Label>Meeting Date</Label>
                                                </Col>
                                                <Col xs="12" md="8" lg="9" className="d-flex align-items-center justify-content-between">
                                                    {activity?.content?.meeting?.date}
                                                </Col>
                                            </Row>
                                            <Row className="my-1">
                                                <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                                    <Label>Meeting Time</Label>
                                                </Col>
                                                <Col xs="12" md="8" lg="9" className="d-flex align-items-center justify-content-between">
                                                    {activity?.content?.meeting?.startTime} - {activity?.content?.meeting?.endTime}
                                                </Col>
                                            </Row>
                                            <Row className="my-1">
                                                <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                                    <Label>Attendees</Label>
                                                </Col>
                                                <Col xs="12" md="8" lg="9" className="d-flex">
                                                    {activity?.content?.attendees?.map((att, i) => (
                                                        <div key={i}> {att.name}<span className="text-capitalize">({att.role})</span>{activity?.content?.attendees.length === i + 1 ? '' : ','}</div>
                                                    ))}
                                                </Col>
                                            </Row>
                                            <Row className="my-1">
                                                <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                                    <Label>Additional attendees</Label>
                                                </Col>
                                                <Col xs="12" md="8" lg="9">
                                                    {activity?.content?.additionalAttendees.map(attendees => (attendees.label))}
                                                </Col>
                                            </Row>
                                        </div>
                                    }
                                    <div className="mb-3 activity-text">{htmlParser(activity.text)}</div>
                                    <div className="mb-4">
                                        {activity?.files?.map((file, i) => (
                                            <Fragment key={i}>
                                                <div className="rounded border d-inline p-1">
                                                    <a href={file.fileUrl} target="_blank" rel="noopener noreferrer" className="text-dark" style={{ textDecoration: "none" }}>{file.fileName}</a>
                                                </div>
                                                <div className="mb-3"></div>
                                            </Fragment>
                                        ))}
                                    </div>
                                    {activity.status === 'rejected' &&
                                        <Card className="border-danger">
                                            <CardBody>
                                                <div className="font-weight-bold">Feedback</div>
                                                <div>{activity.statusMessage ? activity.statusMessage : '-'}</div>
                                            </CardBody>
                                        </Card>
                                    }
                                    {activity.status === 'pending' && authUser.role !== 'professional' &&
                                        <div className="mb-3 d-flex justify-content-end">
                                            <Button color="warning" onClick={() => setModalVerify({ id: activity.id, status: 'rejected', statusMessage: '', open: true })}>To Revise</Button>
                                            <Button color="success" className="mx-2" onClick={() => setModalVerify({ id: activity.id, status: 'approved', statusMessage: '', open: true })}>Approve</Button>
                                            <Button color="secondary">Download</Button>
                                        </div>
                                    }
                                    {activity.content?.replies?.length > 0 &&
                                        <div className="pl-5">
                                            {activity.content?.replies?.map((reply, ir) => (
                                                <Card className="my-1" key={ir}>
                                                    <CardBody className="p-3">
                                                        <div className="font-lg font-weight-bold mb-1">{reply.createdBy.name}</div>
                                                        <div className="text-muted mb-3">{moment(reply.createdAt).format('DD MMMM YYYY hh:mm')}</div>
                                                        <div>{reply.comment}</div>
                                                    </CardBody>
                                                </Card>
                                            ))}
                                        </div>
                                    }
                                    <div className={`${activity.content?.replies?.length > 0 && 'pl-5'}`}>
                                        <TextareaAutosize
                                            rows="3"
                                            name="comment" id="comment"
                                            style={{ borderRadius: "10px" }}
                                            className="form-control"
                                            placeholder="Type your reply..."
                                            value={activity.id === reply.idActivity ? reply.comment : ''}
                                            onChange={(e) => setReply({ idActivity: activity.id, comment: e.target.value })}
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.target.blur()
                                                    handlePostReply()
                                                }
                                            }}
                                        />
                                    </div>
                                </CardBody>
                            </Card>
                        ))}
                        <div ref={deliverableRef}></div>
                        <Modal isOpen={modalVerify.open} centered toggle={() => setModalVerify({ id: 0, status: '', statusMessage: '', open: false })}>
                            <ModalBody className="p-5">
                                <Row>
                                    <Col xs="12">
                                        <div className="mb-2">
                                            {modalVerify.status === 'approved'
                                                ? "By clicking the 'Approve' button, you confirm that the submission has met your standards and agree to let the system proceed with the payment."
                                                : "Are you sure you want to 'Revise' this deliverable"
                                            }
                                        </div>
                                    </Col>
                                    {modalVerify.status === 'rejected' &&
                                        <Col xs="12">
                                            <TextareaAutosize
                                                minRows={3}
                                                style={{ borderRadius: "10px" }}
                                                className="form-control"
                                                placeholder="Type your message..."
                                                onChange={(e) => setModalVerify(state => ({ ...state, statusMessage: e.target.value }))}
                                            />
                                        </Col>
                                    }
                                    <Col xs="12" className="d-flex justify-content-end mt-5">
                                        <Button color="secondary" className="mr-2" onClick={() => setModalVerify({ id: 0, status: '', statusMessage: '', open: false })}>Cancel</Button>
                                        <Button color="primary" className="text-capitalize" disabled={isSubmitting} onClick={() => handleVerifyDeliverable(modalVerify.id, modalVerify.status, modalVerify.statusMessage)}>{modalVerify.status}</Button>
                                    </Col>
                                </Row>
                            </ModalBody>
                        </Modal>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

const FileList = ({ data }) => {
    const maxFiles = Array(9).fill();

    return (
        <UncontrolledPopover trigger="legacy" placement="bottom" target="popover-file-list" popperClassName="popover-file-list">
            <PopoverBody>
                <Row className="p-2">
                    <Col xs="8">
                        <div className="font-weight-bold">Project Files</div>
                    </Col>
                    <Col xs="4">
                        <Progress striped value={(data?.fileList?.length ?? 0) / 9 * 100}>
                            <div className="text-dark text-center">Storage Capacity {data?.fileList?.length}/9</div>
                        </Progress>
                    </Col>
                    <Col xs="12" className="my-3">
                        <Row>
                            {maxFiles.map((file, i) => (
                                <Col xs="4" key={i}>
                                    <a href={data?.fileList[i]?.fileUrl ?? ''} target="_blank" rel="noopener noreferrer" className="text-dark">
                                        {i + 1}. {data?.fileList[i]?.fileName}
                                    </a>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                    <Col xs="12">
                        <div className="text-muted">Your project storage is limited at maximum 9 files or XX MB</div>
                    </Col>
                </Row>
            </PopoverBody>
        </UncontrolledPopover>
    )
}
