import React, { useCallback } from "react"
import { Card, CardBody, Row, Col, Button, Input, Label } from "reactstrap";
import Select from 'react-select';
import SelectYear from "../../../components/SelectYear";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Stats } from "../Components/Navigation";
import { useFormik } from "formik";
import * as Yup from 'yup';

export default (props) => {
    const degree = [
        { label: 'Degree 1', value: 'degree 1' },
        { label: 'Degree 2', value: 'degree 2' },
        { label: 'Degree 3', value: 'degree 3' },
        { label: 'Degree 4', value: 'degree 4' },
    ]

    const school = [
        { label: 'School 1', value: 'School 1' },
        { label: 'School 2', value: 'School 2' },
        { label: 'School 3', value: 'School 3' },
        { label: 'School 4', value: 'School 4' },
    ]

    const ValidationFormSchema = () => {
        return Yup.array().of(
            Yup.object().shape({
                degree: Yup.string().required().label('Degree'),
                school: Yup.string().required().label('School'),
                education: Yup.string().required().label('Education'),
                graduationYear: Yup.string().required().label('Graduation Year'),
            })
        )
    }

    const { values: educationData, touched, errors, setValues: setEducationData, handleSubmit } = useFormik({
        initialValues: [
            {
                id: 1,
                degree: '',
                school: '',
                education: '',
                graduationYear: '',
            }
        ],
        validationSchema: ValidationFormSchema,
        onSubmit: (values, { setSubmitting, setErrors }) => {
            setSubmitting(true)
            props.onSubmitForm(values)
            props.nextStep();
        }
    })

    const handleChangeDegree = useCallback((e, i) => {
        setEducationData(old => [...old].map(edu => {
            if (edu.id === i) return { ...edu, degree: { label: e.label, value: e.value } }
            return { ...edu };
        }))
    }, [setEducationData])

    const handleChangeSchool = useCallback((e, i) => {
        setEducationData(old => [...old].map(edu => {
            if (edu.id === i) return { ...edu, school: { label: e.label, value: e.value } }
            return { ...edu };
        }))
    }, [setEducationData])

    const handleChangeEducation = useCallback((e, i) => {
        const { value } = e.target;
        setEducationData(old => [...old].map(edu => {
            if (edu.id === i) return { ...edu, education: value }
            return { ...edu };
        }))
    }, [setEducationData])

    const handleChangeGraduationYear = useCallback((e, i) => {
        setEducationData(old => [...old].map(edu => {
            if (edu.id === i) return { ...edu, graduationYear: { label: e.label, value: e.value } }
            return { ...edu };
        }))
    }, [setEducationData])

    const handleAddEducationData = useCallback(() => {
        setEducationData(old => ([...old, { id: old[old.length - 1].id + 1, degree: '', school: '', education: '', graduationYear: '' }]))
    }, [setEducationData])

    const handleDeleteEducationData = useCallback((i) => {
        setEducationData(old => ([...old].filter(edu => edu.id !== i)))
    }, [setEducationData])

    return (
        <Row>
            <Col xs="12">
                <Card className="shadow-sm">
                    <CardBody>
                        <Row className="px-5">
                            <Col xs="12" className="mb-3">
                                <div className="font-xl font-weight-bold text-uppercase">Education</div>
                            </Col>
                            {educationData.map((edu, i) => (
                                <Col xs="12" key={i}>
                                    <Card className="shadow-sm">
                                        <CardBody>
                                            {i > 0 &&
                                                <Row className="my-3">
                                                    <Col xs="12">
                                                        <Button color="danger" className="float-right mt-n3 mb-3" onClick={() => handleDeleteEducationData(edu.id)}><FontAwesomeIcon icon="trash-alt" /></Button>
                                                    </Col>
                                                </Row>
                                            }
                                            <Row className="my-3">
                                                <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                                    <Label for="degree">Degree</Label>
                                                </Col>
                                                <Col xs="12" md="8" lg="9">
                                                    <Select
                                                        options={degree}
                                                        placeholder="Choose degree..."
                                                        onChange={(e) => handleChangeDegree(e, edu.id)}
                                                        components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                                        value={edu.degree}
                                                    />
                                                    {touched[i]?.degree && errors[i]?.degree && <small className="text-danger">{errors[i]?.degree}</small>}
                                                </Col>
                                            </Row>
                                            <Row className="my-3">
                                                <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                                    <Label for="school">School</Label>
                                                </Col>
                                                <Col xs="12" md="8" lg="9">
                                                    <Select
                                                        options={school}
                                                        placeholder="Choose school..."
                                                        onChange={(e) => handleChangeSchool(e, edu.id)}
                                                        components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                                        value={edu.school}
                                                    />
                                                    {touched[i]?.school && errors[i]?.school && <small className="text-danger">{errors[i]?.school}</small>}
                                                </Col>
                                            </Row>
                                            <Row className="my-3">
                                                <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                                    <Label for="education">Education</Label>
                                                </Col>
                                                <Col xs="12" md="8" lg="9">
                                                    <Input type="text" name="education" id="education" value={edu.education} onChange={(e) => handleChangeEducation(e, edu.id)} placeholder="Education Field..." />
                                                    {touched[i]?.education && errors[i]?.education && <small className="text-danger">{errors[i]?.education}</small>}
                                                </Col>
                                            </Row>
                                            <Row className="my-3">
                                                <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                                    <Label for="graduationYear">Graduation year</Label>
                                                </Col>
                                                <Col xs="12" md="8" lg="9">
                                                    <SelectYear name="graduationYear" id="graduationYear" value={edu.graduationYear} onChanged={(e) => handleChangeGraduationYear(e, edu.id)} />
                                                    {touched[i]?.graduationYear && errors[i]?.graduationYear && <small className="text-danger">{errors[i]?.graduationYear}</small>}
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                            ))}
                            <Col xs="12">
                                <Button color="success" className="float-right" onClick={handleAddEducationData}>Add Education</Button>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
            <Col xs="12"><Stats step={props.step} {...props} nextStep={handleSubmit} /></Col>
        </Row>
    );
}
