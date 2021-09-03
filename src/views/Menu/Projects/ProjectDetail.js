import React, { useMemo, useState } from "react"
import { Card, CardBody, Row, Col, Button, ModalBody, Modal, Badge, Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from 'yup';
import skills from '../../DataDummy/SkillsDummy'
import skillsColours from '../../DataDummy/SkillsColorsDummy'
import { useRouteMatch } from "react-router-dom";
import useSWR from "swr";
import moment from "moment";
import request from "../../../utils/request";
import { toast } from "react-toastify";


export default ({ data }) => {
    const [modalApply, setModalApply] = useState(false);
    const matchRoute = useRouteMatch();
    const { data: getProjects, error: errorProjects, mutate: mutateProjects } = useSWR(() => `v1/project/${matchRoute.params.projectId}`);
    const loading = !getProjects || errorProjects;
    const project = useMemo(() => {
        return getProjects?.data?.data ?? [];
    }, [getProjects]);

    const ValidationFormSchema = () => {
        return Yup.object().shape({
            cost: Yup.number().min(1, 'Min value 1.').label('Duration'),
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
                })
                .catch(err => {
                    toast.error('Apply project failed.');
                })
                .finally(() => {
                    setModalApply(!modalApply)
                    setSubmitting(false)
                })
        }
    })

    if (loading) {
        return (
            <div>loading</div>
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
                        <div>
                            <div className="float-right">
                                {project.isApplied ?
                                    <div className="font-lg font-weight-bold text-primary">Applied</div>
                                    :
                                    <Button color="primary" onClick={() => setModalApply(!modalApply)}>
                                        Apply
                                    </Button>
                                }
                            </div>
                            <br />
                            <div className="mt-5 font-sm font-weight-bold text-danger">Closing in {moment(project.closingDate).fromNow(true)}</div>
                        </div>
                    </Col>
                    <Col xs="4">
                        <div className="font-lg font-weight-bold">
                            Description
                        </div>
                        <div>
                            {project.description}
                        </div>
                    </Col>
                    <Col xs="8">
                        <div className="font-lg font-weight-bold">
                            Requirements
                        </div>
                        <Row>
                            <Col xs="6">
                                <div className="mb-2">
                                    <div className="text-muted">Completion Date</div>
                                    <div>{moment(project.completeDate).format('DD MMMM YYYY')}</div>
                                </div>
                                <div className="mb-2">
                                    <div className="text-muted">Sector</div>
                                    <div>{project.sector}</div>
                                </div>
                                <div className="mb-2">
                                    <div className="text-muted">Duration</div>
                                    <div>{project.duration} Hours</div>
                                </div>
                                <div className="mb-2">
                                    <div className="text-muted">Budget</div>
                                    <div>IDR {project.budget}</div>
                                </div>
                            </Col>
                            <Col xs="6">
                                <div className="mb-2">
                                    <div className="text-muted">Skills</div>
                                    {project.projectRequirementSkill.map((s, i) => (
                                        <Badge key={i} color={skillsColours[i]} className="w-100 text-uppercase font-sm my-1 text-light">{s.name}</Badge>
                                    ))}
                                </div>
                                <div className="mb-2">
                                    <div className="text-muted">Minimum years of experience</div>
                                    <div>5 years</div>
                                </div>
                                <div className="mb-2">
                                    <div>Bachelor Degree in Mechanical Engineering</div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Modal isOpen={modalApply} centered toggle={() => setModalApply(!modalApply)}>
                    <ModalBody className="p-5">
                        <Row>
                            <Col xs="12" className="mb-5">
                                <div className="mb-2">
                                    <div className="text-muted">Sector</div>
                                    <div>{project.sector}</div>
                                </div>
                                <div className="mb-2">
                                    <div className="text-muted">Duration</div>
                                    <div>{project.duration} Hours</div>
                                </div>
                                <div className="mb-2">
                                    <div className="text-muted">Completion Date</div>
                                    <div>{moment(project.completeDate).format('DD MMMM YYYY')}</div>
                                </div>
                                <div className="mb-2">
                                    <div className="text-muted">Submited Cost</div>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                IDR
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="number" name="cost" id="cost" value={values.cost} placeholder="1000000" onChange={(e) => setValues(state => ({ ...state, cost: e.target.value }))} />
                                    </InputGroup>
                                    {touched.cost && errors.cost && <small className="text-danger">{errors.cost}</small>}
                                </div>
                            </Col>
                            <Col xs="12" className="d-flex justify-content-end">
                                <Button color="secondary" className="mr-2" onClick={() => setModalApply(!modalApply)}>Cancel</Button>
                                <Button color="primary" onClick={handleSubmit}>Apply</Button>
                            </Col>
                        </Row>
                    </ModalBody>
                </Modal>
            </CardBody>
        </Card>
    );
}
