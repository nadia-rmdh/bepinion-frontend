import React, { useMemo } from 'react'
import { Col, Row, Card, CardBody, Spinner, Label, InputGroup, InputGroupAddon, InputGroupText, CustomInput, Button } from 'reactstrap'
import { useRouteMatch } from "react-router-dom";
import useSWR from 'swr';
import ReactStars from "react-rating-stars-component";
import { useFormik } from "formik";
import * as Yup from 'yup';
import TextareaAutosize from 'react-textarea-autosize';
import { toast } from 'react-toastify';
import request from "../../../utils/request";

function Rating() {
    const matchRoute = useRouteMatch();
    const { data: getData, error } = useSWR(() => `v1/project/${matchRoute.params.projectId}/check-rating`);
    const loading = !getData || error
    const data = useMemo(() => {
        return getData?.data?.data ?? [];
    }, [getData]);

    console.log(data)
    const ValidationFormSchema = () => {
        return Yup.object().shape({
            helpful: Yup.number().min(1, 'Please rate this.'),
            recommend: Yup.number().min(1, 'Please rate this.'),
        })
    }

    const { values, touched, errors, setValues, handleSubmit, isSubmitting } = useFormik({
        initialValues: {
            useForAnotherProject: "yes",
            helpful: 0,
            recommend: 0,
            additionalComment: ""
        },
        validationSchema: ValidationFormSchema,
        onSubmit: (values, { setSubmitting, setErrors }) => {
            setSubmitting(true)
            request.post(`v1/rating`, {
                idProject: matchRoute.params.projectId,
                useForAnotherProject: values.useForAnotherProject === 'Yes' ? true : false,
                helpful: values.helpful,
                recommend: values.recommend,
                additionalComment: values.additionalComment,
            })
                .then(res => {
                    toast.success('Send Feedback Successfully')
                })
                .catch(err => {
                    toast.error('Send Feedback Failed.');
                })
                .finally(() => {
                    setSubmitting(false)
                })
        }
    })

    const handleChangeHelpfull = (rate) => {
        setValues(state => ({ ...state, helpful: rate }))
    }

    const handleChangeRecommend = (rate) => {
        setValues(state => ({ ...state, recommend: rate }))
    }

    const handleChangeAnotherProject = (e) => {
        const { value } = e.target;
        setValues(state => ({ ...state, useForAnotherProject: value }))
    }

    const handleChangeComment = (e) => {
        const { value } = e.target;
        setValues(state => ({ ...state, additionalComment: value }))
    }

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
        <Card>
            <CardBody>
                <Row className="my-3 px-5">
                    <Col xs="12" className="d-flex justify-content-center align-items-center mb-4 border-bottom border-warning">
                        <div className="font-2xl font-weight-bold mb-3">Feedback</div>
                    </Col>
                    <Col xs="12">
                        <Row className="mb-3">
                            <Col xs="12" className="d-flex align-items-center">
                                <Label for="helpful">1. What do you think about our mission?</Label>
                            </Col>
                            <Col xs="12" className="pl-4">
                                <ReactStars
                                    count={5}
                                    onChange={(e) => handleChangeHelpfull(e)}
                                    size={30}
                                    value={values.helpful}
                                    isHalf={true}
                                    emptyIcon={<i className="fa fa-star"></i>}
                                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                                    fullIcon={<i className="fa fa-star"></i>}
                                    activeColor="#ffd700"
                                />
                                {touched.helpful && errors.helpful && <small className="text-danger">{errors.helpful}</small>}
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col xs="12" className="d-flex align-items-center">
                                <Label for="recommend">2. How likely you will recommend Pinion to your peers?</Label>
                            </Col>
                            <Col xs="12" className="pl-4">
                                <ReactStars
                                    count={5}
                                    onChange={(e) => handleChangeRecommend(e)}
                                    size={30}
                                    value={values.recommend}
                                    isHalf={true}
                                    emptyIcon={<i className="fa fa-star"></i>}
                                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                                    fullIcon={<i className="fa fa-star"></i>}
                                    activeColor="#ffd700"
                                />
                                {touched.recommend && errors.recommend && <small className="text-danger">{errors.recommend}</small>}
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col xs="12" className="d-flex align-items-center">
                                <Label for="useForAnotherProject">3. Would you use Pinion for another project?</Label>
                            </Col>
                            <Col xs="12" className="pl-4 d-flex">
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText className="bg-transparent border-0 px-0">
                                            <CustomInput type="radio" id="size1" value="yes" checked={values.useForAnotherProject === 'yes' ? true : false} onChange={handleChangeAnotherProject} />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Label for="size1" className="d-flex bg-transparent p-1 m-0 align-items-center">
                                        Yes
                                    </Label>
                                </InputGroup>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText className="bg-transparent border-0 px-0">
                                            <CustomInput type="radio" id="size2" value="no" checked={values.useForAnotherProject === 'no' ? true : false} onChange={handleChangeAnotherProject} />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Label for="size2" className="d-flex bg-transparent p-1 m-0 align-items-center">
                                        No
                                    </Label>
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col xs="12" className="d-flex align-items-center">
                                <Label for="additionalComment">Anything else you would like to tell us?</Label>
                            </Col>
                            <Col xs="12" className="pl-4 d-flex">
                                <TextareaAutosize
                                    minRows={5}
                                    name="aboutUs"
                                    id="aboutUs"
                                    className="form-control"
                                    placeholder="Improvements, ideas, compliments, or anything to help us grow together"
                                    value={values.additionalComment}
                                    onChange={handleChangeComment}
                                />
                            </Col>
                        </Row>
                    </Col>
                    <Col xs="12" className="mt-4 d-flex justify-content-center">
                        <Button color="primary" size="lg" onClick={handleSubmit} disabled={isSubmitting}>{isSubmitting ? <><Spinner color="light" size="sm" /> Loading...</> : "Submit"}</Button>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
}

export default Rating