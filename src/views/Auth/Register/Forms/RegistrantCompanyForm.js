import React, { useCallback } from "react"
import { Card, CardBody, Row, Col, Input, Label } from "reactstrap";
import Select from 'react-select';
import { Stats } from "../Components/Navigation";
import { useFormik } from "formik";
import * as Yup from 'yup';


export default (props) => {
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

    const { values, touched, errors, setValues, handleSubmit } = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            idType: { label: 'KTP', value: 'ktp' },
            idNumber: '',
            jobTitle: '',
        },
        validationSchema: ValidationFormSchema,
        onSubmit: (values, { setSubmitting, setErrors }) => {
            setSubmitting(true)
            props.onSubmitForm(values)
            props.nextStep();
        }
    })

    return (
        <Row>
            <Col xs="12"><RegistrantInformationForm registrantData={values} setRegistrantData={setValues} touched={touched} errors={errors} /></Col>
            <Col xs="12"><Stats step={props.step} {...props} nextStep={handleSubmit} /></Col>
        </Row>
    );
}

export const RegistrantInformationForm = ({ registrantData, setRegistrantData, touched, errors }) => {
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
        if (value.length > 16) {
            return;
        }
        setRegistrantData(old => ({ ...old, idNumber: value }))
    }, [setRegistrantData])

    const handleChangeJobTitle = useCallback((e) => {
        const { value } = e.target;
        setRegistrantData(old => ({ ...old, jobTitle: value }))
    }, [setRegistrantData])

    return (
        <Card className="shadow-sm">
            <CardBody>
                <Row className="px-md-5">
                    <Col xs="12" className="mb-3">
                        <div className="font-xl font-weight-bold">REGISTRANT INFORMATION</div>
                    </Col>
                    <Col xs="12">
                        <Row className="my-3">
                            <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                <Label for="firstName">First Name</Label>
                            </Col>
                            <Col xs="12" md="8" lg="9">
                                <Input type="text" name="firstName" id="firstName" value={registrantData.firstName} onChange={(e) => handleChangeFirstName(e)} />
                                {touched.firstName && errors.firstName && <small className="text-danger">{errors.firstName}</small>}
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                <Label for="lastName">Last Name</Label>
                            </Col>
                            <Col xs="12" md="8" lg="9">
                                <Input type="text" name="lastName" id="lastName" value={registrantData.lastName} onChange={(e) => handleChangeLastName(e)} />
                                {touched.lastName && errors.lastName && <small className="text-danger">{errors.lastName}</small>}
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                <Label for="email">Email</Label>
                            </Col>
                            <Col xs="12" md="8" lg="9">
                                <Input type="email" name="email" id="email" value={registrantData.email} onChange={(e) => handleChangeEmail(e)} />
                                {touched.email && errors.email && <small className="text-danger">{errors.email}</small>}
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                <Label for="phone">Mobile Phone</Label>
                            </Col>
                            <Col xs="12" md="8" lg="9">
                                <Input type="number" name="phone" id="phone" value={registrantData.phone} onChange={(e) => handleChangePhone(e)}
                                    onWheel={(e) => { e.target.blur() }}
                                />
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
                                    value={registrantData.idType}
                                    onChange={(e) => handleChangeIdType(e)}
                                    components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                />
                                {touched.idType && errors.idType && <small className="text-danger">{errors.idType}</small>}
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                <Label for="idNumber">ID Number</Label>
                            </Col>
                            <Col xs="12" md="8" lg="9">
                                <Input type="number" value={registrantData.idNumber} onChange={(e) => handleChangeIdNumber(e)}
                                    onWheel={(e) => { e.target.blur() }}
                                />
                                {touched.idNumber && errors.idNumber && <small className="text-danger">{errors.idNumber}</small>}
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                <Label for="job">Job Title</Label>
                            </Col>
                            <Col xs="12" md="8" lg="9">
                                <Input type="text" value={registrantData.jobTitle} onChange={(e) => handleChangeJobTitle(e)} />
                                {touched.jobTitle && errors.jobTitle && <small className="text-danger">{errors.jobTitle}</small>}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </CardBody>
        </Card >
    );
}
