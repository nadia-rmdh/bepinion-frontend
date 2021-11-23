import React, { Fragment, useCallback, useMemo, useRef, useState } from "react"
import { Card, CardBody, Row, Col, Button, ModalBody, Modal, Badge, Input, InputGroup, InputGroupAddon, InputGroupText, Spinner, Table, Label, UncontrolledPopover, PopoverBody, Progress } from "reactstrap";
import { useFormik } from "formik";
import Datepicker from "react-datepicker";
import { Link, useRouteMatch } from "react-router-dom";
import useSWR from "swr";
import moment from "moment";
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
import request, { requestDownload } from "../../../../utils/request";
import htmlParser from "html-react-parser";
import { validateEmail } from './shared';
import ReactInputMask from "react-input-mask";
import { useAuthUser } from "../../../../store";
import { useFilterProjectContext } from "../ProjectContext";
import statusDeliverable from '../../../../components/DeliverableStatus'

export default () => {
    const authUser = useAuthUser();
    const matchRoute = useRouteMatch();
    const deliverableRef = useRef();
    const meetingDateRef = useRef();
    const uploadFile = useRef(null)
    const [filter, setFilter] = useFilterProjectContext()
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [reply, setReply] = useState({
        idActivity: '',
        comment: '',
    })
    const [modalVerify, setModalVerify] = useState({ id: 0, status: '', statusMessage: '', open: false });
    const [modalMeetingDate, setModalMeetingDate] = useState({ idProject: 0, idActivity: 0, status: '', date: '', link: '', open: false });
    const [modalMeetingRequest, setModalMeetingRequest] = useState({ idProject: 0, date: '', open: false });
    const { data: getData, error, mutate } = useSWR(() => `v1/project/${matchRoute.params.projectId}/activity?&sort=${filter.sortActivity.value}${filter.category ? `&category=${filter.category.value}` : ''}${filter.searchActivity ? `&search=${filter.searchActivity}` : ''}`);
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
            idActivity: 0,
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
            if (values.idActivity) {
                formData.append('idActivity', values.idActivity)
            }
            formData.append('category', values.category)
            formData.append('content', JSON.stringify(values.content))
            formData.append('text', values.text)
            formData.append('isDraft', values.isDraft)
            if (values.files.length > 0) {
                values.files.filter(f => !f.id).map((file, i) => {
                    return formData.append('file' + (i + 1), file.file, file.file.name)
                })
            }

            if (values.idActivity) {
                request.put(`v1/project/${matchRoute.params.projectId}/activity`, formData)
                    .then(res => {
                        toast.success('Create activity successfully')
                        setValues({
                            idActivity: 0,
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
                        toast.error('Create activity failed.');
                    })
                    .finally(() => {
                        setSubmitting(false)
                    })
            } else {
                request.post(`v1/project/${matchRoute.params.projectId}/activity`, formData)
                    .then(res => {
                        toast.success('Create activity successfully')
                        setValues({
                            idActivity: 0,
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
                        toast.error('Create activity failed, maybe your file capacity is full.');
                    })
                    .finally(() => {
                        setSubmitting(false)
                    })
            }
        }
    })

    const handleClickCategory = useCallback((category) => {
        if (category === 'discussion') {
            setValues((state) => ({ ...state, category }))
        } else {
            if (deliverableData.length > 0) {
                setValues({ idActivity: deliverableData[deliverableData.length - 1].status === 'draft' ? deliverableData[deliverableData.length - 1].id : 0, category, content: { attendees: attendancesOptions, additionalAttendees: deliverableData[deliverableData.length - 1].content?.additionalAttendees, meeting: deliverableData[deliverableData.length - 1].content?.meeting }, text: deliverableData[deliverableData.length - 1].text, isDraft: 'true', files: deliverableData[deliverableData.length - 1].files })
                setEditorState(EditorState.createWithContent(
                    ContentState.createFromBlockArray(
                        convertFromHTML(deliverableData[deliverableData.length - 1].text)
                    )
                ))
            } else {
                setValues((state) => ({ ...state, idActivity: 0, category, content: { attendees: attendancesOptions, additionalAttendees: [], meeting: { date: moment(data?.meetingDetails?.date).format('DD MMMM YYYY'), startTime: moment(data?.meetingDetails?.date).format('HH:mm'), endTime: '' } } }))
            }
        }
    }, [setValues, attendancesOptions, deliverableData, data])

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
        if (values.files >= 3) {
            toast.error('Maximum upload files exceeded.')
            return;
        }
        setValues(old => ({ ...old, files: [...old.files, { preview: URL.createObjectURL(files[0]), file: files[0] }] }))
    }, [setValues, values])

    const handleDeleteFile = useCallback((preview) => {
        setValues(old => ({ ...old, files: old.files.filter(file => file.preview !== preview) }))
    }, [setValues])

    const handleChangeFilterCategory = useCallback((e) => {
        setFilter(state => ({ ...state, category: e ?? '' }));
    }, [setFilter])

    const sorts = [
        { label: 'Newest to Oldest', value: 'createdAt_DESC' },
        { label: 'Oldest to Newest', value: 'createdAt_ASC' },
    ]

    const handleChangeFilterSort = useCallback((e) => {
        setFilter(state => ({ ...state, sortActivity: e ?? '' }));
    }, [setFilter])

    const handleChangeFilterSearch = useCallback((e) => {
        const { value } = e.target;
        setFilter(state => ({ ...state, searchActivity: value }));
    }, [setFilter])

    const [loadingDownload, setLoadingDownload] = useState(false)
    const handleDownloadDeliverable = useCallback((name, id) => {
        setLoadingDownload(true)
        requestDownload(`v1/project/activity/${id}/pdf`, name + '.pdf')
            .then(() => setLoadingDownload(false))
    }, [])

    const [modalAlertMeetingDate, setModalAlertMeetingDate] = useState(false);
    const handleRequestMeetingDate = useCallback(() => {
        if (data.activeRequestMeetingId) {
            setModalAlertMeetingDate(true)
        } else {
            setModalMeetingRequest({ idProject: matchRoute.params.projectId, date: data?.meetingDetails?.date, open: true })
        }
    }, [data, matchRoute, setModalAlertMeetingDate])

    console.log(deliverableData)
    return (
        <Row>
            <Col xs="12">
                <Link to={`/project/${matchRoute.params.projectId}`} className="font-xl font-weight-bold mb-4 text-dark">{data.projectName}</Link>
            </Col>
            <Col xs="12" md="4">
                <Card className="shadow-sm">
                    <CardBody>
                        <Row>
                            <Col xs="12">
                                <div><span className="text-muted">Client</span> {data?.client?.name}</div>
                                <div><span className="text-muted">Consultant</span> {data?.professional?.length ? data?.professional[0]?.name : ''}</div>
                                <div><span className="text-muted">Contract value</span> IDR {convertToRupiah(data?.contractValue ?? 0)}</div>
                                <div><span className="text-muted">Starting Date</span> {moment(data?.stratingDate).format('DD MMMM YYYY')}</div>
                                <div><span className="text-muted">Closing Date</span> {moment(data?.closingDate).format('DD MMMM YYYY')}</div>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
                <Card className="shadow-sm">
                    <CardBody>
                        <Row>
                            <Col xs="12">
                                <div className="font-lg font-weight-bold mb-3">Meeting</div>
                                <div className="text-muted">Meeting Link <a href={data?.meetingDetails?.link ?? ''} target="_blank" rel="noopener noreferrer" className="font-weight-bold ml-1">Click here</a> </div>
                                <div className="mt-2">
                                    <div className="text-muted mb-1">Meeting Date</div>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend" className="w-100">
                                            <Datepicker
                                                required
                                                name="startDate"
                                                selected={new Date(data?.meetingDetails?.date ?? moment())}
                                                dateFormat="dd MMMM yyyy HH:mm"
                                                minDate={new Date()}
                                                className="form-control bg-white"
                                                showTimeInput
                                                disabled
                                                autoComplete="off"
                                                onChangeRaw={(e) => e.preventDefault()}
                                            />
                                            <InputGroupText>
                                                <FontAwesomeIcon icon="calendar-alt" />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </div>
                            </Col>
                            <Col xs="12" className="d-flex justify-content-center mt-3">
                                <Button color="pinion-primary" onClick={handleRequestMeetingDate}>
                                    Request Meeting Date
                                </Button>
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
                                        {data?.milestoneDetails?.map((v, i) =>
                                            <tr key={i}>
                                                <td>{v.activities}</td>
                                                <td>{moment(v.date).add(i, 'days').format('DD MMMM YYYY')}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </Col>
                            <Col xs="12" className="d-flex justify-content-between align-items-center">
                                <Button color="pinion-primary" className="mr-2 text-light" id="popover-file-list">Project Files</Button>
                                <FileList data={data?.fileDetails} />
                                <div>
                                    <div className="mb-1 text-muted">Status of deliverable</div>
                                    <div className="mb-3 text-center">
                                        <Badge
                                            color={deliverableData?.filter(act => act.status !== 'draft').pop()?.status === 'approved'
                                                ? 'success'
                                                : (deliverableData?.filter(act => act.status !== 'draft').pop()?.status === 'rejected' ? 'danger'
                                                    : (deliverableData?.filter(act => act.status !== 'draft').pop()?.status === 'pending' ? 'warning'
                                                        : 'secondary'))}
                                            className="font-lg text-light text-uppercase"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => deliverableRef.current.scrollIntoView({ block: "center", behavior: "smooth" })}
                                        >
                                            {statusDeliverable[deliverableData?.filter(act => act.status !== 'draft').pop()?.status] ?? 'Draft'}
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
                                <Button color={`${values?.category === 'discussion' ? 'pinion-primary' : 'pinion-secondary'}`} className="text-light mr-3" onClick={() => handleClickCategory('discussion')}>Discussion</Button>
                                {authUser.role === 'professional' && ['draft', 'rejected'].includes(deliverableData?.length > 0 ? deliverableData[deliverableData?.length - 1].status : 'draft') && <Button color={`${values?.category === 'deliverable' ? 'pinion-primary' : 'pinion-secondary'}`} className="text-light" onClick={() => handleClickCategory('deliverable')}>Deliverable</Button>}
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
                                            {file?.file?.name && <FontAwesomeIcon icon="times" color="#f86c6b" className="mr-1" onClick={() => handleDeleteFile(file.preview)} style={{ cursor: "pointer" }} />} {file?.file?.name ?? file.fileName}
                                        </div>
                                        <div className="mb-3"></div>
                                    </Fragment>
                                ))}
                            </Col>
                            <Col xs="12">
                                <input type='file' ref={uploadFile} style={{ display: 'none' }} onChange={(e) => handleUploadFile(e)} />
                                {/* accept="image/*,video/mp4,video/x-m4v,video/*,application/*" */}
                                <Button color="pinion-secondary" disabled={values.files >= 3} className="text-light" onClick={() => uploadFile.current.click()}> <FontAwesomeIcon icon="upload" /> Attachment</Button>
                                <Button color="pinion-primary" className="float-right" onClick={() => handleClickSubmit('false')} disabled={isSubmitting}>{isSubmitting ? <><Spinner color="light" size="sm" /> Loading...</> : "Post"}</Button>
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
                                options={[{ value: 'deliverable', label: 'Deliverable' }, { value: 'discussion', label: 'Discussion' }, { value: 'meeting_date', label: 'Meeting Date' }]}
                                value={filter.category}
                                isClearable
                                onChange={(e) => handleChangeFilterCategory(e)}
                                components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                            />
                        </div>
                    </Col>
                    <Col xs="12" md="3">
                        <div className="mb-1 text-muted">Date Sort</div>
                        <div className="mb-3">
                            <Select
                                options={sorts}
                                value={filter.sortActivity}
                                onChange={(e) => handleChangeFilterSort(e)}
                                components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                            />
                        </div>
                    </Col>
                    <Col xs="12" md="3" className="justify-content-end">
                        <div className="mb-1 text-muted">&nbsp;</div>
                        <div className="mb-3">
                            <Input type="text" placeholder="Search..." value={filter.searchActivity} onChange={handleChangeFilterSearch} />
                        </div>
                    </Col>
                    <Col xs="12">
                        {
                            loading
                                ?
                                <Card className="shadow-sm">
                                    <CardBody className="position-relative">
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
                                    </CardBody>
                                </Card>
                                :
                                <div>
                                    {data.activityDetails.length <= 0 &&
                                        <Card className="shadow-sm">
                                            <CardBody className="position-relative">
                                                <div style={{ width: '100%', height: '500px' }} className="d-flex align-items-center justify-content-center text-muted"> No Activities </div>
                                            </CardBody>
                                        </Card>
                                    }
                                    {data.activityDetails.filter(act => act.status !== 'draft').map((activity, i) => (
                                        <Card className="shadow-sm" key={i}>
                                            {filter.sortActivity.value === 'createdAt_DESC' && (deliverableData.length > 0 && deliverableData[deliverableData?.length - 1].id === activity.id) && <div ref={deliverableRef}></div>}
                                            {activity.category === 'meeting_date' && activity.id === data.activeRequestMeetingId && <div ref={meetingDateRef}></div>}
                                            <CardBody className="position-relative">
                                                <div className="position-absolute" style={{ right: 20 }}>
                                                    <Badge className="font-lg text-uppercase text-light" color={`${activity.category === 'meeting_date' ? 'info' : (activity.category === 'discussion' ? 'warning' : 'pinion-primary')}`}>{activity.category.replace('_', ' ')}</Badge>
                                                </div>
                                                <div className="position-absolute" style={{ top: 55, right: 20 }}>
                                                    {activity.category === 'deliverable' &&
                                                        <Badge
                                                            color={activity.status === 'approved'
                                                                ? 'success'
                                                                : (activity.status === 'rejected' ? 'danger'
                                                                    : (activity.status === 'pending' ? 'warning'
                                                                        : 'secondary'))}
                                                            className="font-sm text-light text-uppercase"
                                                        >
                                                            {statusDeliverable[activity.status] ?? 'Draft'}
                                                        </Badge>
                                                    }
                                                </div>
                                                <div className="font-lg font-weight-bold mb-1">{activity?.createdBy?.name}</div>
                                                <div className="text-muted mb-3">{moment.utc(activity.createdAt).local().format('DD MMMM YYYY HH:mm')}</div>
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
                                                                {activity?.content?.meeting?.startTime} - {activity?.content?.meeting?.endTime !== '' ? activity?.content?.meeting?.endTime : 'Finish'}
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
                                                                {activity?.content?.additionalAttendees?.map(attendees => (attendees.label))}
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                }
                                                <div className="mb-3 activity-text">{activity.category === 'meeting_date' ? 'Requested meeting date change to ' + moment.utc(activity.content.date).local().format('DD MMMM YYYY HH:mm') : htmlParser(activity.text)}</div>
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
                                                {/* {activity.status === 'rejected' &&
                                        <Card className="border-danger">
                                            <CardBody>
                                                <div className="font-weight-bold">Feedback</div>
                                                <div>{activity.statusMessage ? activity.statusMessage : '-'}</div>
                                            </CardBody>
                                        </Card>
                                    } */}
                                                {activity.category === 'deliverable' &&
                                                    <div className="mb-3 d-flex justify-content-end">
                                                        {activity.status === 'pending' && authUser.role !== 'professional' &&
                                                            <>
                                                                <Button color="warning" onClick={() => setModalVerify({ id: activity.id, status: 'rejected', statusMessage: '', open: true })}>To Revise</Button>
                                                                <Button color="success" className="mx-2" onClick={() => setModalVerify({ id: activity.id, status: 'approved', statusMessage: '', open: true })}>Approve</Button>
                                                            </>
                                                        }
                                                        {activity.status === 'approved' && <Button color="secondary" disabled={loadingDownload} onClick={() => handleDownloadDeliverable('deliverable', activity.id)}>{loadingDownload ? <><Spinner color="light" size="sm" /> Loading...</> : "Download"}</Button>}
                                                    </div>
                                                }
                                                {activity.category === 'meeting_date' && activity.status === 'pending' && authUser.id !== activity.createdBy.id &&
                                                    <div className="mb-3 d-flex justify-content-end">
                                                        <Button color="success" className="mx-2" onClick={() => setModalMeetingDate({ idProject: matchRoute.params.projectId, idActivity: activity.id, status: 'approved', date: activity.content.date, link: data?.meetingDetails?.link ?? '', open: true })}>Approve</Button>
                                                        <Button color="danger" onClick={() => setModalMeetingDate({ idProject: matchRoute.params.projectId, idActivity: activity.id, status: 'rejected', date: activity.content.date, link: data?.meetingDetails?.link ?? '', open: true })}>Reject</Button>
                                                    </div>
                                                }
                                                {activity.content?.replies?.length > 0 &&
                                                    <div className="pl-5">
                                                        {activity.content?.replies?.map((reply, ir) => (
                                                            <Card className="my-1" key={ir}>
                                                                <CardBody className="p-3">
                                                                    <div className="font-lg font-weight-bold mb-1">{reply.createdBy.name}</div>
                                                                    <div className="text-muted mb-3">{moment.utc(reply.createdAt).local().format('DD MMMM YYYY HH:mm')}</div>
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
                                </div>
                        }
                        {filter.sortActivity.value === 'createdAt_ASC' && <div ref={deliverableRef}></div>}
                        <Modal isOpen={modalVerify.open} centered toggle={() => setModalVerify({ id: 0, status: '', statusMessage: '', open: false })}>
                            <ModalBody className="p-5">
                                <Row>
                                    <Col xs="12">
                                        <div className="mb-2">
                                            {modalVerify.status === 'approved'
                                                ? "You are about to submit your deliverable for approval process."
                                                : "Are you sure you want to 'Revise' this deliverable"
                                            }
                                        </div>
                                    </Col>
                                    {/* {modalVerify.status === 'rejected' &&
                                        <Col xs="12">
                                            <TextareaAutosize
                                                minRows={3}
                                                style={{ borderRadius: "10px" }}
                                                className="form-control"
                                                placeholder="Type your message..."
                                                onChange={(e) => setModalVerify(state => ({ ...state, statusMessage: e.target.value }))}
                                            />
                                        </Col>
                                    } */}
                                    <Col xs="12" className="d-flex justify-content-end mt-5">
                                        <Button color="secondary" className="mr-2" onClick={() => setModalVerify({ id: 0, status: '', statusMessage: '', open: false })}>Cancel</Button>
                                        <Button color="primary" className="text-capitalize" disabled={isSubmitting} onClick={() => handleVerifyDeliverable(modalVerify.id, modalVerify.status, modalVerify.statusMessage)}>{modalVerify.status}</Button>
                                    </Col>
                                </Row>
                            </ModalBody>
                        </Modal>
                        <ModalChangeMeetingDate modalMeetingDate={modalMeetingDate} onChangeModalMeetingDate={setModalMeetingDate} mutate={mutate} />
                        <ModalRequestMeetingDate modalMeetingRequest={modalMeetingRequest} onChangeModalMeetingRequest={setModalMeetingRequest} mutate={mutate} />
                        <ModalAlertMeetingDate modalAlertMeetingDate={modalAlertMeetingDate} onChangeModalAlertMeetingDate={setModalAlertMeetingDate} meetingDateRef={meetingDateRef} />
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
                        <Progress className="mb-2" value={(data?.fileList?.length ?? 0) / 9 * 100}>
                            <div className="text-dark text-center">File {data?.fileList?.length}/9</div>
                        </Progress>
                        <Progress color="pinion-secondary" value={(data?.totalSize ?? 0) / 100000000 * 100}>
                            <div className="text-dark text-center">Capacity {data?.totalSize / 1000000}MB/100MB</div>
                        </Progress>
                    </Col>
                    <Col xs="12" className="my-3">
                        <Row>
                            {maxFiles.map((file, i) => (
                                <Col xs="12" key={i}>
                                    <a href={data?.fileList[i]?.fileUrl ?? ''} target="_blank" rel="noopener noreferrer" className="text-dark">
                                        {i + 1}. {data?.fileList[i]?.fileName}
                                    </a>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                    <Col xs="12">
                        <div className="text-muted">Your project storage is limited at maximum 9 files or 100 MB</div>
                    </Col>
                </Row>
            </PopoverBody>
        </UncontrolledPopover>
    )
}

const ModalRequestMeetingDate = ({ modalMeetingRequest, onChangeModalMeetingRequest, mutate }) => {
    const [meetingDate, setMeetingDate] = useState(null);

    const handleChangeMeetingDate = (e) => {
        setMeetingDate(e)
    }

    const handleSend = useCallback((e) => {
        request.post(`v1/project/${modalMeetingRequest.idProject}/activity`, {
            category: "meeting_date",
            content: {
                date: moment(meetingDate)
            },
            text: "",
            isDraft: "false",
        })
            .then(res => {
                toast.success('Change Meeting Date Successfully.')
                onChangeModalMeetingRequest({ idProject: 0, date: new Date(), open: false })
                mutate()
            })
            .catch(err => {
                toast.error('Change Meeting Date Failed.');
            })
    }, [modalMeetingRequest, mutate, meetingDate, onChangeModalMeetingRequest])

    return (
        <Modal isOpen={modalMeetingRequest.open} centered toggle={() => onChangeModalMeetingRequest({ idProject: 0, date: new Date(), open: false })}>
            <ModalBody className="p-5">
                <Row>
                    <Col xs="12">
                        <div className="mb-2">
                            Choose the meeting date you want.
                        </div>
                    </Col>
                    <Col xs="12">
                        <div className="mb-2">
                            <InputGroup>
                                <InputGroupAddon addonType="prepend" className="w-100">
                                    <Datepicker
                                        required
                                        name="startDate"
                                        selected={new Date(meetingDate ?? (modalMeetingRequest?.date ?? moment()))}
                                        dateFormat="dd MMMM yyyy HH:mm"
                                        minDate={new Date()}
                                        className="form-control bg-white"
                                        showTimeInput
                                        autoComplete="off"
                                        onChange={handleChangeMeetingDate}
                                        // onChange={(e) => console.log(e)}
                                        onChangeRaw={(e) => e.preventDefault()}
                                    />
                                    <InputGroupText>
                                        <FontAwesomeIcon icon="calendar-alt" />
                                    </InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>
                        </div>
                    </Col>
                    <Col xs="12" className="d-flex justify-content-end mt-5">
                        <Button color="secondary" className="mr-2" onClick={() => onChangeModalMeetingRequest({ idProject: 0, date: new Date(), open: false })}>Cancel</Button>
                        <Button color="primary" className="text-capitalize" onClick={() => handleSend()}>Request</Button>
                    </Col>
                </Row>
            </ModalBody>
        </Modal>
    )
}

const ModalChangeMeetingDate = ({ modalMeetingDate, onChangeModalMeetingDate, mutate }) => {
    const [meetingDate, setMeetingDate] = useState(null);

    const handleChangeMeetingDate = (e) => {
        setMeetingDate(e)
    }

    const handleSend = useCallback((e) => {
        request.put(`v1/project/${modalMeetingDate.idProject}/activity-meeting`, {
            meetingDetails: {
                link: modalMeetingDate.link,
                date: moment(meetingDate ?? modalMeetingDate.date)
            },
            status: modalMeetingDate.status,
            idActivity: modalMeetingDate.idActivity,
        })
            .then(res => {
                toast.success('Change Meeting Date Successfully.')
                onChangeModalMeetingDate({ idProject: 0, idActivity: 0, status: '', date: '', link: '', open: false })
                mutate()
            })
            .catch(err => {
                toast.error('Change Meeting Date Failed.');
            })
    }, [modalMeetingDate, mutate, meetingDate, onChangeModalMeetingDate])

    return (
        <Modal isOpen={modalMeetingDate.open} centered toggle={() => onChangeModalMeetingDate({ idProject: 0, idActivity: 0, status: '', date: '', link: '', open: false })}>
            <ModalBody className="p-5">
                <Row>
                    <Col xs="12">
                        <div className="mb-2">
                            {modalMeetingDate.status === 'approved'
                                ? "Choose a meeting date that suits your discussion."
                                : "Are you sure you want to 'Reject' this request?"
                            }
                        </div>
                    </Col>
                    <Col xs="12">
                        <div className="mb-2">
                            {modalMeetingDate.status === 'approved'
                                ? <InputGroup>
                                    <InputGroupAddon addonType="prepend" className="w-100">
                                        <Datepicker
                                            required
                                            name="startDate"
                                            selected={new Date(meetingDate ?? modalMeetingDate?.date)}
                                            dateFormat="dd MMMM yyyy HH:mm"
                                            minDate={new Date()}
                                            className="form-control bg-white"
                                            showTimeInput
                                            autoComplete="off"
                                            onChange={handleChangeMeetingDate}
                                            onChangeRaw={(e) => e.preventDefault()}
                                        />
                                        <InputGroupText>
                                            <FontAwesomeIcon icon="calendar-alt" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                </InputGroup>
                                : null
                            }
                        </div>
                    </Col>
                    <Col xs="12" className="d-flex justify-content-end mt-5">
                        <Button color="secondary" className="mr-2" onClick={() => onChangeModalMeetingDate({ idProject: 0, idActivity: 0, status: '', date: '', link: '', open: false })}>Cancel</Button>
                        <Button color="primary" className="text-capitalize" onClick={() => handleSend()}>{modalMeetingDate.status}</Button>
                    </Col>
                </Row>
            </ModalBody>
        </Modal>
    )
}

const ModalAlertMeetingDate = ({ modalAlertMeetingDate, onChangeModalAlertMeetingDate, meetingDateRef }) => {
    return (
        <Modal size="sm" centered isOpen={modalAlertMeetingDate} returnFocusAfterClose={false}
            toggle={() => {
                onChangeModalAlertMeetingDate(false)
                meetingDateRef.current.scrollIntoView({ block: "center", behavior: "smooth" })
            }}
        >
            <ModalBody className="p-4">
                <Row>
                    <Col xs="12">
                        <div className="mb-3 text-center">
                            There are still unconfirmed meeting date requests !
                        </div>
                    </Col>
                    <Col xs="12" className="d-flex justify-content-center">
                        <Button color="secondary" onClick={() => {
                            onChangeModalAlertMeetingDate(false)
                            meetingDateRef.current.scrollIntoView({ block: "center", behavior: "smooth" })
                        }}
                        >
                            Close
                        </Button>
                    </Col>
                </Row>
            </ModalBody>
        </Modal>
    )
}
