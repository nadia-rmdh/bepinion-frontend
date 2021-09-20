import React, { useCallback, useMemo, useState } from "react"
import { Card, CardBody, Row, Col, Button, ModalBody, Modal, Badge, Input, InputGroup, InputGroupAddon, InputGroupText, CardFooter, CustomInput, Spinner, CardHeader, CardTitle, Table } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from 'yup';
import Datepicker from "react-datepicker";
import { Link, useRouteMatch } from "react-router-dom";
import useSWR from "swr";
import moment from "moment";
import dummyData from './dummyData'
import { convertToRupiah } from "../../../../utils/formatter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextareaAutosize from "react-textarea-autosize";
import { EditorState } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from 'draftjs-to-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Select from "react-select";
import { toast } from "react-toastify";
import request from "../../../../utils/request";
import htmlParser from "html-react-parser";

const categories = [
    { label: 'Discussion', value: 'discussion' },
    { label: 'Deliverable', value: 'deliverable' },
]

export default () => {
    const matchRoute = useRouteMatch();
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [reply, setReply] = useState({
        idActivity: '',
        comment: '',
    })
    const [modalApply, setModalApply] = useState(false);
    const { data: getData, error, mutate } = useSWR(() => `v1/project/${matchRoute.params.projectId}/activity`);
    const loading = !getData || error
    const data = useMemo(() => {
        return getData?.data?.data ?? [];
    }, [getData]);

    const ValidationFormSchema = () => {
        return Yup.object().shape({
            projectName: Yup.string().required().label('Business Name'),
            projectOwnerVisibility: Yup.string().required().label('Project Owner Visibility'),
            sector: Yup.string().required().label('Sector'),
            description: Yup.string().required().label('Description'),
            duration: Yup.number().min(1, 'Min value 1.').label('Duration'),
            budget: Yup.number().min(1, 'Min value 1.').label('budget'),
            budgetVisibility: Yup.string().required().label('Budget Visibility'),
            completionDate: Yup.string().required().label('Completion Date'),
            closingDate: Yup.string().required().label('Tender Closing Date'),
            skills: Yup.string().required().label('Skills Requirements'),
            yearExperience: Yup.number().min(1, 'Min value 1.').label('Year Experience'),
            degree: Yup.string().required().label('Degree'),
            education: Yup.string().required().label('Education Field'),
        })
    }

    const { values, touched, errors, setValues, handleSubmit, isSubmitting } = useFormik({
        initialValues: {
            category: 'discussion',
            content: {},
            text: '',
        },
        // validationSchema: ValidationFormSchema,
        onSubmit: (values, { setSubmitting, setErrors, setValues }) => {
            setSubmitting(true)

            let formData = new FormData()
            formData.append('category', values.category)
            formData.append('content', JSON.stringify(values.content))
            formData.append('text', values.text)

            request.post(`v1/project/${matchRoute.params.projectId}/activity`, formData)
                .then(res => {
                    toast.success('Create Discussion Successfully')
                    setValues({
                        category: 'discussion',
                        content: {},
                        text: '',
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
                                <div><span className="text-muted">Consultant</span> {data.professional.name}</div>
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
                                <div className="text-muted">Meeting Link <a href={dummyData.meeting.link} target="_blank" rel="noopener noreferrer" className="font-weight-bold ml-1">Click here</a> </div>
                                <div className="mt-2">
                                    <div className="text-muted mb-1">Meeting Date</div>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend" className="w-100">
                                            <Datepicker
                                                required
                                                name="startDate"
                                                selected={new Date(dummyData.meeting.date + ' ' + dummyData.meeting.startTime)}
                                                dateFormat="dd MMMM yyyy hh:mm"
                                                minDate={new Date()}
                                                placeholderText="Select a date"
                                                className="form-control"
                                                showTimeInput
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
                                <Button color="secondary" className="mr-2 text-light">Project Files</Button>
                                <div>
                                    <div className="mb-1 text-muted">Status of deliverable</div>
                                    <div className="mb-3 text-center">
                                        <Badge color="info" className="font-lg text-light">Draft</Badge>
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
                                <Button color={`${values.category === 'discussion' ? 'primary' : 'light'}`} className="text-dark mr-3" onClick={() => setValues((state) => ({ ...state, category: 'discussion' }))}>Discussion</Button>
                                <Button color={`${values.category === 'deliverable' ? 'primary' : 'light'}`} className="text-dark" onClick={() => setValues((state) => ({ ...state, category: 'deliverable' }))}>Deliverable</Button>
                            </Col>
                            <Col xs="12">
                                <Editor
                                    editorState={editorState}
                                    editorStyle={{ height: '300px' }}
                                    onEditorStateChange={(editorState) => setEditorState(editorState)}
                                    onContentStateChange={(editorState) => handleEditorChange(editorState)}
                                />
                            </Col>
                            <Col xs="12">
                            </Col>
                            <Col xs="12">
                                <Button color="info" className="text-light"> <FontAwesomeIcon icon="upload" /> Attachment</Button>
                                <Button color="primary" className="float-right" onClick={handleSubmit} disabled={isSubmitting}>{isSubmitting ? <><Spinner color="light" size="sm" /> Loading...</> : "Post"}</Button>
                                {/* <Button color="secondary" className="float-right mr-2 text-light">Reset</Button> */}
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
                        {data.activityDetails.map((activity, i) => (
                            <Card className="shadow-sm" key={i}>
                                <CardBody className="position-relative">
                                    <div className="position-absolute" style={{ right: 20 }}>
                                        <Badge className="font-lg text-uppercase text-light" color={`${activity.category === 'document' ? 'danger' : (activity.category === 'discussion' ? 'warning' : 'primary')}`}>{activity.category}</Badge>
                                    </div>
                                    <div className="font-lg font-weight-bold mb-1">{activity.createdBy.name}</div>
                                    <div className="text-muted mb-3">{moment(activity.createdAt).format('DD MMMM YYYY hh:mm')}</div>
                                    <div className="mb-3 activity-text">{htmlParser(activity.text)}</div>
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
                                            onChange={(e) => setReply({ idActivity: activity.id, comment: e.target.value })}
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    // setValue(e.target.value)
                                                    e.target.blur()
                                                    handlePostReply()
                                                }
                                            }}
                                        // value={value}
                                        />
                                    </div>
                                </CardBody>
                            </Card>
                        ))}
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}
