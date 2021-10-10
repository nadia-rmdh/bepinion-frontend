import React, { useCallback, useMemo, useState } from "react"
import { Card, CardBody, Row, Col, Button, Input, Label, Spinner } from "reactstrap";
import Select from 'react-select';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import * as Yup from 'yup';
import useDataEducationDegrees from "../../../../hooks/useDataEducationDegrees";
import useDataEducationFields from "../../../../hooks/useDataEducationFields";
import useDataSchools from "../../../../hooks/useDataSchools";

export default (props) => {
    const data = props.data.educations;
    const [isEdit,] = useState(false);

    const currentData = useMemo(() => data?.map((v, i) => (
        {
            id: v.id,
            degree: { label: v.educationDegree.name, value: v.educationDegree.id } ?? '',
            school: { label: v.school.name, value: v.school.id } ?? '',
            education: { label: v.educationField.name, value: v.educationField.id } ?? '',
            graduationYear: 0,
        }
    )), [data])

    const { data: getDegree } = useDataEducationDegrees();
    const degree = useMemo(() => getDegree.map(p => ({ label: p.name, value: p.id })), [getDegree])

    const { data: getSchool } = useDataSchools();
    const school = useMemo(() => getSchool.map(p => ({ label: p.name, value: p.id })), [getSchool])

    const { data: getEduField } = useDataEducationFields();
    const eduField = useMemo(() => getEduField.map(p => ({ label: p.name, value: p.id })), [getEduField])

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

    const { values: educationData, touched, errors, setValues: setEducationData, handleSubmit, isSubmitting } = useFormik({
        initialValues: currentData,
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
        setEducationData(old => [...old].map(edu => {
            if (edu.id === i) return { ...edu, education: e }
            return { ...edu };
        }))
    }, [setEducationData])

    const handleChangeGraduationYear = useCallback((e, i) => {
        const { value } = e.target;
        setEducationData(old => [...old].map(edu => {
            if (edu.id === i) return { ...edu, graduationYear: value }
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
                            <Col xs="12" className="mb-3 d-flex justify-content-between">
                                <div className="font-xl font-weight-bold text-uppercase">Education</div>
                                {/* <Button color={`${isEdit ? 'danger' : 'primary'}`} onClick={() => {
                                    setIsEdit(!isEdit)
                                    setEducationData(currentData)
                                }} disabled={isEdit && isSubmitting}> <FontAwesomeIcon icon={`${isEdit ? 'times' : 'edit'}`} /> {isEdit ? 'Cancel' : 'Edit'}</Button> */}
                            </Col>
                            {educationData.map((edu, i) => (
                                <Col xs="12" key={i}>
                                    <Card className="shadow-sm">
                                        <CardBody>
                                            {i > 0 &&
                                                <Row className="my-3">
                                                    <Col xs="12">
                                                        <Button color="danger" className="float-right mt-n3 mb-3" onClick={() => handleDeleteEducationData(edu.id)} disabled={!isEdit || isSubmitting}><FontAwesomeIcon icon="trash-alt" /></Button>
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
                                                        isDisabled={!isEdit || isSubmitting}
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
                                                        isDisabled={!isEdit || isSubmitting}
                                                    />
                                                    {touched[i]?.school && errors[i]?.school && <small className="text-danger">{errors[i]?.school}</small>}
                                                </Col>
                                            </Row>
                                            <Row className="my-3">
                                                <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                                    <Label for="education">Education</Label>
                                                </Col>
                                                <Col xs="12" md="8" lg="9">
                                                    <Select
                                                        options={eduField}
                                                        placeholder="Choose Education Field..."
                                                        onChange={(e) => handleChangeEducation(e, edu.id)}
                                                        components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                                        value={edu.education}
                                                        isDisabled={!isEdit || isSubmitting}
                                                    />
                                                    {touched[i]?.education && errors[i]?.education && <small className="text-danger">{errors[i]?.education}</small>}
                                                </Col>
                                            </Row>
                                            <Row className="my-3">
                                                <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                                    <Label for="graduationYear">Graduation year</Label>
                                                </Col>
                                                <Col xs="12" md="8" lg="9">
                                                    <Input type="number" disabled={!isEdit || isSubmitting} name="graduationYear" id="graduationYear" value={edu.graduationYear} onChange={(e) => handleChangeGraduationYear(e, edu.id)} placeholder="YYYY"
                                                        onWheel={(e) => { e.target.blur() }} onInput={(e) => { e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 4) }}
                                                    />
                                                    {touched[i]?.graduationYear && errors[i]?.graduationYear && <small className="text-danger">{errors[i]?.graduationYear}</small>}
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                            ))}
                            {isEdit &&
                                <>
                                    <Col xs="12" className="d-flex justify-content-center">
                                        <Button color="success" onClick={handleAddEducationData} disabled={isSubmitting}>Add Education</Button>
                                    </Col>
                                    <Col xs="12" className="d-flex justify-content-end">
                                        <Button color="primary" className="float-right" onClick={handleSubmit} disabled={isSubmitting}>{isSubmitting ? <><Spinner color="light" size="sm" /> Loading...</> : "Save"}</Button>
                                    </Col>
                                </>
                            }
                        </Row>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
}
