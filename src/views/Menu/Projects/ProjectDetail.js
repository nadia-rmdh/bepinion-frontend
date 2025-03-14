import React, { useMemo, useState } from "react"
import { Card, CardBody, Row, Col, Button, ModalBody, Modal, Badge, InputGroup, InputGroupAddon, InputGroupText, Spinner } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useRouteMatch } from "react-router-dom";
import useSWR from "swr";
import moment from "moment";
import request from "../../../utils/request";
import { toast } from "react-toastify";
import CurrencyInput from "react-currency-input-field";
import { useAuthUser } from "../../../store";
import { convertToRupiah } from "../../../utils/formatter";
import { useHistory } from "react-router";
import ColorSkill from "../../../components/ColorSkill";


export default ({ data }) => {
    const history = useHistory();
    const authUser = useAuthUser();
    const [modalApply, setModalApply] = useState(false);
    const matchRoute = useRouteMatch();
    const { data: getProjects, error: errorProjects, mutate } = useSWR(() => `v1/project/${matchRoute.params.projectId}`);
    const loading = !getProjects || errorProjects;
    const project = useMemo(() => {
        return getProjects?.data?.data ?? [];
    }, [getProjects]);

    if (loading) {
        if (project.status && project.status !== 'open') history.push('/')
        return (
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    background: "rgba(255,255,255, 0.5)",
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
        <Card>
            <CardBody>
                <Row>
                    <Col xs="12" className="d-flex justify-content-between mb-3">
                        <div>
                            <div className="font-lg font-weight-bold">{project.name}</div>
                            <div className="text-muted">{project.projectOwnerName}</div>
                            <div><span className="text-muted">Posted</span> {moment(project.createdAt).format('DD MMMM YYYY')}</div>
                            <div><span className="text-muted">Closing On</span> {moment(project.closingDate).format('DD MMMM YYYY')}</div>
                        </div>
                        {authUser.role === 'professional' &&
                            <div>
                                <div className="float-right">
                                    {project.isApplied ?
                                        <Button color="primary" disabled>
                                            Applied
                                        </Button>
                                        :
                                        <Button color="primary" disabled={project.status !== 'open'} onClick={() => setModalApply(!modalApply)}>
                                            Apply
                                        </Button>
                                    }
                                </div>
                                <br />
                                {project.status === 'open' && moment(project.closingDate).fromNow(true) > 0
                                    ? <div className="mt-5 font-sm font-weight-bold text-danger">Closing in {moment(project.closingDate).fromNow(true)}</div>
                                    : <div className="mt-5 font-sm font-weight-bold text-danger">Closed</div>
                                }
                            </div>
                        }
                    </Col>
                    <Col xs="12">
                        <Row>
                            <Col xs="12" lg="9">
                                <div className="font-lg font-weight-bold mb-2">
                                    Project Details
                                </div>
                                <Row>
                                    <Col xs="12" md="6">
                                        <div className="mb-2">
                                            <div className="text-muted">
                                                Description
                                            </div>
                                            <div style={{ whiteSpace: 'pre-line' }}>
                                                {project.description ?? ''}
                                            </div>
                                        </div>
                                        <div className="mb-2">
                                            <div className="text-muted">
                                                Supporting Materials
                                            </div>
                                            <div style={{ whiteSpace: 'pre-line' }}>
                                                {project.prerequisite ?? '-'}
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xs="12" md="6">
                                        <div className="mb-2">
                                            <div className="text-muted">Meeting Date</div>
                                            <div>{moment(project.meetingDetails.date).format('DD MMMM YYYY')}</div>
                                        </div>
                                        <div className="mb-2">
                                            <div className="text-muted">Sector</div>
                                            <div>{project.sectors.map((s, i) => `${s.sector.name}${project.sectors.length === i + 1 ? '' : ','} `)}</div>
                                        </div>
                                        <div className="mb-2">
                                            <div className="text-muted">Meeting Duration</div>
                                            <div>{project.duration} Hours</div>
                                        </div>
                                        <div className="mb-2">
                                            <div className="text-muted">Minimum Contract Value</div>
                                            <div>{!Number.isInteger(project?.minimumContractValue) ? project?.minimumContractValue : `IDR ${convertToRupiah(project?.minimumContractValue ?? 0)}`}</div>
                                        </div>
                                        <div className="mb-2">
                                            <div className="text-muted">Estimated Contract Value</div>
                                            <div>{!Number.isInteger(project?.estimatedContractValue) ? project?.estimatedContractValue : `IDR ${convertToRupiah(project?.estimatedContractValue ?? 0)}`}</div>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs="12" lg="3">
                                <div className="font-lg font-weight-bold mb-2">
                                    Requirements
                                </div>
                                <div className="mb-2">
                                    <div className="text-muted">Skills</div>
                                    {project.projectRequirementSkill.map((s, i) => (
                                        <Badge key={i} style={{ backgroundColor: ColorSkill[s.skill.category] }} className="w-100 text-uppercase font-sm my-1 text-light">{s.skill.name}</Badge>
                                    ))}
                                </div>
                                <div className="mb-2">
                                    <div className="text-muted">Minimum years of experience</div>
                                    <div>{project?.minYearExp} years</div>
                                </div>
                                <div className="mb-2">
                                    <div>{project?.requirementEducationDegree?.educationDegree?.name} in {project?.requirementEducationField?.educationField?.name}</div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <ModalApplication modalApply={modalApply} setModalApply={setModalApply} project={project} mutate={mutate} matchRoute={matchRoute} authUser={authUser} />
            </CardBody>
        </Card>
    );
}

const ModalApplication = ({ modalApply, setModalApply, project, mutate, matchRoute, authUser }) => {
    const [modalConfirmation, setModalConfirmation] = useState(false);

    const ValidationFormSchema = () => {
        return Yup.object().shape({
            cost: Yup.number().min(authUser?.smcv, 'Min value ' + authUser?.smcv).label('Duration'),
        })
    }

    const { values, touched, errors, setValues, handleSubmit } = useFormik({
        initialValues: {
            cost: 0,
        },
        validationSchema: ValidationFormSchema,
        onSubmit: (values, { setSubmitting, setErrors }) => {
            setSubmitting(true)

            request.post(`v1/project/${matchRoute.params.projectId}/apply`, {
                submittedCost: parseInt(values.cost),
            })
                .then(res => {
                    toast.success('Project successfully applied.');
                    mutate()
                    setModalConfirmation(!modalConfirmation)
                    setModalApply(!modalApply)
                })
                .catch(err => {
                    toast.error('Apply project failed.');
                    setModalConfirmation(!modalConfirmation)
                })
                .finally(() => {
                    setSubmitting(false)
                })
        }
    })

    return (
        <>
            <Modal isOpen={modalApply} centered toggle={() => setModalApply(!modalApply)}>
                <ModalBody className="p-5">
                    <Row>
                        <Col xs="12" className="mb-5">
                            <div className="mb-2">
                                <div className="text-muted">Project name</div>
                                <div>{project.name}</div>
                            </div>
                            <div className="mb-2">
                                <div className="text-muted">Duration</div>
                                <div>{project.duration} Hours</div>
                            </div>
                            <div className="mb-2">
                                <div className="text-muted">Completion date</div>
                                <div>{moment(project.completeDate).format('DD MMMM YYYY')}</div>
                            </div>
                            <div className="mb-2">
                                <div className="text-muted">Proposed service fee</div>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            IDR
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <CurrencyInput
                                        placeholder="Min. value 500.000"
                                        decimalsLimit={2}
                                        maxLength="9"
                                        groupSeparator="."
                                        decimalSeparator=","
                                        value={values.cost}
                                        onValueChange={(value) => {
                                            if (value > 100000000)
                                                setValues(state => ({ ...state, cost: 100000000 }))
                                            else
                                                setValues(state => ({ ...state, cost: value }))
                                        }}
                                        className={`form-control ${touched.cost && errors.cost && 'border border-danger'}`}
                                    />
                                </InputGroup>
                                <small className="text-muted">
                                    *Minimum proposed service fee should be Rp {convertToRupiah(authUser?.smcv ?? 0)}
                                </small>
                            </div>
                        </Col>
                        <Col xs="12" className="mb-3">
                            <small className="text-muted">
                                *Platform fee and WHT would be deducted from project value
                            </small>
                        </Col>
                        <Col xs="12" className="d-flex justify-content-end">
                            <Button color="secondary" className="mr-2" onClick={() => setModalApply(!modalApply)}>Cancel</Button>
                            <Button color="primary" disabled={values.cost < authUser?.smcv} onClick={() => setModalConfirmation(!modalConfirmation)}>Apply</Button>
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>

            <Modal isOpen={modalConfirmation} centered toggle={() => setModalConfirmation(!modalConfirmation)}>
                <ModalBody className="p-5">
                    <Row>
                        <Col xs="12" className="mb-4">
                            <div className="font-weight-bold">
                                By clicking submit, you confirm that all the information provided is true and correct.
                            </div>
                        </Col>
                        <Col xs="12" className="d-flex justify-content-end">
                            <Button color="secondary" className="mr-2" onClick={() => setModalConfirmation(!modalConfirmation)}>No</Button>
                            <Button color="primary" onClick={handleSubmit}>Yes</Button>
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>
        </>
    )
}
