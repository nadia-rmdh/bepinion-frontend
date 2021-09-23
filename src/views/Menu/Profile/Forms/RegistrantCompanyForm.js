import React, { useCallback, useMemo, useState } from "react"
import { Card, CardBody, Row, Col, Input, Label, Button, Spinner } from "reactstrap";
import Select from 'react-select';
import { useFormik } from "formik";
import * as Yup from 'yup';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default (props) => {
    const data = props.data;

    const currentData = useMemo(() => ({
        firstName: data.registrantInformation.firstName ?? '',
        lastName: data.registrantInformation.lastName ?? '',
        email: data.registrantInformation.email ?? '',
        phone: data.registrantInformation.phoneNumber ?? '',
        idType: { label: 'KTP', value: 'ktp' },
        idNumber: data.registrantInformation.identityNumber ?? '',
        jobTitle: data.registrantInformation.jobTitle ?? '',
    }), [data])

    const ValidationFormSchema = () => {
        return Yup.object().shape({
            firstName: Yup.string().required().label('First Name'),
            lastName: Yup.string().required().label('Last Name'),
            email: Yup.string().required().email().label('Email'),
            phone: Yup.string().required().label('Phone'),
            idType: Yup.string().required().label('ID Type'),
            idNumber: Yup.string().required().label('ID Number'),
            jobTitle: Yup.string().required().label('Job Title'),
        })
    }

    const { values, touched, errors, setValues, handleSubmit, isSubmitting } = useFormik({
        initialValues: currentData,
        validationSchema: ValidationFormSchema,
        onSubmit: (values, { setSubmitting, setErrors }) => {
            setSubmitting(true)
            props.onSubmitForm(values)
            props.nextStep();
        }
    })

    return (
        <Row>
            <Col xs="12"><RegistrantInformationForm currentData={currentData} registrantData={values} setRegistrantData={setValues} handleSubmit={handleSubmit} isSubmitting={isSubmitting} touched={touched} errors={errors} /></Col>
        </Row>
    );
}

export const RegistrantInformationForm = ({ currentData, registrantData, setRegistrantData, handleSubmit, isSubmitting, touched, errors }) => {
    const [isEdit, setIsEdit] = useState(false);
    const idType = [
        { label: 'KTP', value: 'ktp' },
    ]

    const handleChangeFirstName = useCallback((e) => {
        const { value } = e.target;
        setRegistrantData(old => ({ ...old, firstName: value }))
    }, [setRegistrantData])

    const handleChangeLastName = useCallback((e) => {
        const { value } = e.target;
        setRegistrantData(old => ({ ...old, lastName: value }))
    }, [setRegistrantData])

    const handleChangePhone = useCallback((e) => {
        const { value } = e.target;
        setRegistrantData(old => ({ ...old, phone: value }))
    }, [setRegistrantData])

    const handleChangeEmail = useCallback((e) => {
        const { value } = e.target;
        setRegistrantData(old => ({ ...old, email: value }))
    }, [setRegistrantData])

    const handleChangeIdType = useCallback((e) => {
        setRegistrantData(old => ({ ...old, idType: e }))
    }, [setRegistrantData])

    const handleChangeIdNumber = useCallback((e) => {
        const { value } = e.target;
        setRegistrantData(old => ({ ...old, idNumber: value }))
    }, [setRegistrantData])

    const handleChangeJobTitle = useCallback((e) => {
        const { value } = e.target;
        setRegistrantData(old => ({ ...old, jobTitle: value }))
    }, [setRegistrantData])

    return (
        <Card className="shadow-sm">
            <CardBody>
                <Row className="px-5">
                    <Col xs="12" className="mb-3 d-flex justify-content-between">
                        <div className="font-xl font-weight-bold">REGISTRANT INFORMATION</div>
                        {/* <Button color={`${isEdit ? 'danger' : 'primary'}`} onClick={() => {
                            setIsEdit(!isEdit)
                            setRegistrantData(currentData)
                        }} disabled={isEdit && isSubmitting}> <FontAwesomeIcon icon={`${isEdit ? 'times' : 'edit'}`} /> {isEdit ? 'Cancel' : 'Edit'}</Button> */}
                    </Col>
                    <Col xs="12">
                        <Row className="my-3">
                            <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                <Label for="firstName">First Name</Label>
                            </Col>
                            <Col xs="12" md="8" lg="9">
                                <Input type="text" name="firstName" id="firstName" disabled={!isEdit || isSubmitting} value={registrantData.firstName} onChange={(e) => handleChangeFirstName(e)} placeholder="First Name Field..." />
                                {touched.firstName && errors.firstName && <small className="text-danger">{errors.firstName}</small>}
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                <Label for="lastName">Last Name</Label>
                            </Col>
                            <Col xs="12" md="8" lg="9">
                                <Input type="text" name="lastName" id="lastName" disabled={!isEdit || isSubmitting} value={registrantData.lastName} onChange={(e) => handleChangeLastName(e)} placeholder="Last Name Field..." />
                                {touched.lastName && errors.lastName && <small className="text-danger">{errors.lastName}</small>}
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                <Label for="email">Email</Label>
                            </Col>
                            <Col xs="12" md="8" lg="9">
                                <Input type="email" name="email" id="email" disabled={!isEdit || isSubmitting} value={registrantData.email} onChange={(e) => handleChangeEmail(e)} placeholder="Email Field..." />
                                {touched.email && errors.email && <small className="text-danger">{errors.email}</small>}
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                <Label for="phone">Mobile Phone</Label>
                            </Col>
                            <Col xs="12" md="8" lg="9">
                                <Input type="number" name="phone" id="phone" disabled={!isEdit || isSubmitting} value={registrantData.phone} onChange={(e) => handleChangePhone(e)} placeholder="Mobile Phone Field..."
                                    onWheel={(e) => { e.target.blur() }} onInput={(e) => { e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 16) }} />
                                {touched.phone && errors.phone && <small className="text-danger">{errors.phone}</small>}
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                <Label for="idType">ID Type</Label>
                            </Col>
                            <Col xs="12" md="8" lg="9">
                                <Select
                                    options={idType}
                                    placeholder="Choose id type..."
                                    value={registrantData.idType}
                                    onChange={(e) => handleChangeIdType(e)}
                                    components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                    isDisabled={!isEdit || isSubmitting}
                                />
                                {touched.idType && errors.idType && <small className="text-danger">{errors.idType}</small>}
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                <Label for="idNumber">ID Number</Label>
                            </Col>
                            <Col xs="12" md="8" lg="9">
                                <Input type="number" name="idNumber" id="idNumber"
                                    disabled={!isEdit || isSubmitting} value={registrantData.idNumber} onChange={(e) => handleChangeIdNumber(e)} placeholder="ID Number Field..."
                                    onWheel={(e) => { e.target.blur() }} onInput={(e) => { e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 16) }}
                                />
                                {touched.idNumber && errors.idNumber && <small className="text-danger">{errors.idNumber}</small>}
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                <Label for="jobTitle">Job Title</Label>
                            </Col>
                            <Col xs="12" md="8" lg="9">
                                <Input type="text" name="jobTitle" id="jobTitle" disabled={!isEdit || isSubmitting} value={registrantData.jobTitle} onChange={(e) => handleChangeJobTitle(e)} placeholder="Job Title Field..." />
                                {touched.jobTitle && errors.jobTitle && <small className="text-danger">{errors.jobTitle}</small>}
                            </Col>
                        </Row>
                    </Col>
                    {isEdit &&
                        <Col xs="12" className="d-flex justify-content-end">
                            <Button color="primary" className="float-right" onClick={handleSubmit} disabled={isSubmitting}>{isSubmitting ? <><Spinner color="light" size="sm" /> Loading...</> : "Save"}</Button>
                        </Col>
                    }
                </Row>
            </CardBody>
        </Card >
    );
}
