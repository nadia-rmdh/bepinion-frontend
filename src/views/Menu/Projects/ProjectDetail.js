import React, { useState } from "react"
import { Card, CardBody, Row, Col, Button, ModalBody, Modal, Badge, Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from 'yup';
import skills from '../../DataDummy/SkillsDummy'
import skillsColours from '../../DataDummy/SkillsColorsDummy'


export default ({ data }) => {
    const [modalApply, setModalApply] = useState(false);

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
        }
    })

    return (
        <Card>
            <CardBody>
                <Row>
                    <Col xs="12" className="d-flex justify-content-between">
                        <div>
                            <div className="font-lg font-weight-bold">Project Name</div>
                            <div className="text-muted">Owner Name</div>
                            <div><span className="text-muted">Posted</span> DD MMMM YYYY</div>
                            <div><span className="text-muted">Closing On</span> DD MMMM YYYY</div>
                        </div>
                        <Button color="primary" onClick={() => setModalApply(!modalApply)}>
                            Apply
                        </Button>
                    </Col>
                    <Col xs="4">
                        <div className="font-lg font-weight-bold">
                            Description
                        </div>
                        <div>
                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                        </div>
                    </Col>
                    <Col xs="4">
                        <div className="font-lg font-weight-bold">
                            Requirements
                        </div>
                        <Row>
                            <Col xs="6">
                                <div className="mb-2">
                                    <div className="text-muted">Completion Date</div>
                                    <div>DD MMMM YYYY</div>
                                </div>
                                <div className="mb-2">
                                    <div className="text-muted">Sector</div>
                                    <div>Sector A</div>
                                </div>
                                <div className="mb-2">
                                    <div className="text-muted">Duration</div>
                                    <div>12 Hours</div>
                                </div>
                                <div className="mb-2">
                                    <div className="text-muted">Budget</div>
                                    <div>IDR 500.000</div>
                                </div>
                            </Col>
                            <Col xs="6">
                                <div className="mb-2">
                                    <div className="text-muted">Skills</div>
                                    {skills.map((s, i) => (
                                        <Badge key={i} color={skillsColours[i]} className="w-100 text-uppercase font-sm my-1 text-light">{s.label}</Badge>
                                    ))}
                                </div>
                                <div className="mb-2">
                                    <div className="text-muted">Minimum years of experience</div>
                                    <div>5 years</div>
                                </div>
                                <div className="mb-2">
                                    <div>Bachelor Degree in Mechanical Engineerin</div>
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
                                    <div>Sector A</div>
                                </div>
                                <div className="mb-2">
                                    <div className="text-muted">Duration</div>
                                    <div>12 Hours</div>
                                </div>
                                <div className="mb-2">
                                    <div className="text-muted">Completion Date</div>
                                    <div>DD MMMM YYYY</div>
                                </div>
                                <div className="mb-2">
                                    <div className="text-muted">Submited Cost</div>
                                    <div>
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText className="bg-transparent border-0 px-0">
                                                    IDR
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="number" name="cost" id="cost" value={values.cost} placeholder="1000000" onChange={(e) => setValues(state => ({ ...state, cost: e.target.value }))} />
                                        </InputGroup>
                                        {touched.cost && errors.cost && <small className="text-danger">{errors.cost}</small>}
                                    </div>
                                </div>
                            </Col>
                            <Col xs="12" className="d-flex justify-content-end">
                                <Button color="secondary" className="mr-2" toggle={() => setModalApply(!modalApply)}>Cancel</Button>
                                <Button color="primary" onClick={handleSubmit}>Next</Button>
                            </Col>
                        </Row>
                    </ModalBody>
                </Modal>
            </CardBody>
        </Card>
    );
}
