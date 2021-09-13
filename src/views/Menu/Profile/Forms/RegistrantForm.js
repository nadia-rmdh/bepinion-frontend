import React, { useCallback, useMemo, useState } from "react"
import DateRangePicker from "react-bootstrap-daterangepicker";
import { Card, CardBody, Row, Col, Input, Label, InputGroup, InputGroupAddon, InputGroupText, CustomInput, Button, Spinner } from "reactstrap";
import Select from 'react-select';
import TextareaAutosize from "react-textarea-autosize";
import { useFormik } from "formik";
import * as Yup from 'yup';
import useDataProvinces from "../../../../hooks/useDataProvinces";
import moment from "moment";
import useDataSectors from "../../../../hooks/useDataSectors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default (props) => {
    const data = props.data;
    const currentData = useMemo(() => ({
        firstName: data.firstName ?? '',
        lastName: data.lastName ?? '',
        gender: data.gender ?? '',
        dateOfBirth: data.dob ? moment(data.dob) : '',
        idType: { label: 'KTP', value: 'ktp' },
        idNumber: data.identityNumber ?? '',
        npwpNumber: data.npwp ?? '',
        address: data.address ?? '',
        province: { label: data.province.name, value: data.province.id } ?? '',
        phone: data.phoneNumber ?? '',
        email: data.email ?? '',
        sector: data?.sector?.id ?? '',
    }), [data])

    const ValidationFormSchema = () => {
        let optional;
        if (props.registrationForm === 'individual') optional = { sector: Yup.string().required().label('Sector') }
        return Yup.object().shape({
            ...optional,
            firstName: Yup.string().required().label('First Name'),
            lastName: Yup.string().required().label('Last Name'),
            gender: Yup.string().required().oneOf(['L', 'P']).label('Gender'),
            dateOfBirth: Yup.string().required().label('Date of Birth'),
            idType: Yup.string().required().label('ID Type'),
            idNumber: Yup.string().required().label('ID Number'),
            npwpNumber: Yup.string().required().label('NPWP Number'),
            address: Yup.string().required().label('Address'),
            province: Yup.string().required().label('Province'),
            phone: Yup.string().required().label('Phone'),
            email: Yup.string().required().email().label('Email'),
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
            <Col xs="12"><RegistrantInformationForm registrantData={values} currentData={currentData} setRegistrantData={setValues} onSubmit={handleSubmit} isSubmitting={isSubmitting} touched={touched} errors={errors} {...props} /></Col>
            <Col xs="12"><ContactInformationForm contactData={values} currentData={currentData} setContactData={setValues} onSubmit={handleSubmit} isSubmitting={isSubmitting} touched={touched} errors={errors} /></Col>
        </Row>
    );
}

export const RegistrantInformationForm = ({ registrantData, currentData, setRegistrantData, onSubmit, isSubmitting, touched, errors, registrationForm }) => {
    const [isEdit, setIsEdit] = useState(false);

    const idType = [
        { label: 'KTP', value: 'ktp' },
    ]

    const { data: getSector } = useDataSectors();
    const sectors = useMemo(() => getSector.map(p => ({ label: p.name, value: p.id })), [getSector])

    const handleChangeFirstName = useCallback((e) => {
        const { value } = e.target;
        setRegistrantData(old => ({ ...old, firstName: value }))
    }, [setRegistrantData])

    const handleChangeLastName = useCallback((e) => {
        const { value } = e.target;
        setRegistrantData(old => ({ ...old, lastName: value }))
    }, [setRegistrantData])

    const handleChangeSector = useCallback((e) => {
        setRegistrantData(old => ({ ...old, sector: e }))
    }, [setRegistrantData])

    const handleChangeGender = useCallback((e) => {
        const { value, checked } = e.target;
        setRegistrantData(old => ({ ...old, gender: checked ? value : '' }))
    }, [setRegistrantData])

    const handleChangeDateOfBirth = useCallback((value) => {
        setRegistrantData(old => ({ ...old, dateOfBirth: value }))
    }, [setRegistrantData])

    const handleChangeIdType = useCallback((e) => {
        setRegistrantData(old => ({ ...old, idType: e }))
    }, [setRegistrantData])

    const handleChangeIdNumber = useCallback((e) => {
        const { value } = e.target;
        setRegistrantData(old => ({ ...old, idNumber: value }))
    }, [setRegistrantData])

    const handleChangeNpwpNumber = useCallback((e) => {
        const { value } = e.target;
        setRegistrantData(old => ({ ...old, npwpNumber: value }))
    }, [setRegistrantData])

    return (
        <Card className="shadow-sm">
            <CardBody>
                <Row className="px-5">
                    <Col xs="12" className="mb-3 d-flex justify-content-between">
                        <div className="font-xl font-weight-bold">REGISTRANT INFORMATION</div>
                        <Button color={`${isEdit ? 'danger' : 'primary'}`} onClick={() => {
                            setIsEdit(!isEdit)
                            setRegistrantData(currentData)
                        }} disabled={isEdit && isSubmitting}> <FontAwesomeIcon icon={`${isEdit ? 'times' : 'edit'}`} /> {isEdit ? 'Cancel' : 'Edit'}</Button>
                    </Col>
                    <Col xs="12">
                        <Row className="my-3">
                            <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                <Label for="firstName">First Name</Label>
                            </Col>
                            <Col xs="12" md="8" lg="9">
                                <Input type="text" name="firstName" id="firstName" value={registrantData.firstName} disabled={!isEdit} onChange={(e) => handleChangeFirstName(e)} placeholder="First Name Field..." />
                                {touched.firstName && errors.firstName && <small className="text-danger">{errors.firstName}</small>}
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                <Label for="lastName">Last Name</Label>
                            </Col>
                            <Col xs="12" md="8" lg="9">
                                <Input type="text" name="lastName" id="lastName" value={registrantData.lastName} disabled={!isEdit} onChange={(e) => handleChangeLastName(e)} placeholder="Last Name Field..." />
                                {touched.lastName && errors.lastName && <small className="text-danger">{errors.lastName}</small>}
                            </Col>
                        </Row>
                        {registrationForm === 'individual' &&
                            <Row className="my-3">
                                <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                    <Label for="sector">Sector</Label>
                                </Col>
                                <Col xs="12" md="8" lg="9">
                                    <Select
                                        options={sectors}
                                        placeholder="Choose a socter..."
                                        value={registrantData.sector}
                                        isDisabled={!isEdit}
                                        onChange={(e) => handleChangeSector(e)}
                                        components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                    />
                                    {touched.sector && errors.sector && <small className="text-danger">{errors.sector}</small>}
                                </Col>
                            </Row>
                        }
                        <Row className="my-3">
                            <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                <Label for="gender">Gender</Label>
                            </Col>
                            <Col xs="12" md="8" lg="9">
                                <div className="d-flex">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText className="bg-transparent border-0 px-0">
                                                <CustomInput type="radio" id="male" value="L" checked={registrantData.gender === "L" ? true : false} disabled={!isEdit} onChange={(e) => handleChangeGender(e)} />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Label for="male" className="d-flex bg-transparent p-1 m-0 align-items-center">
                                            Male
                                        </Label>
                                    </InputGroup>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText className="bg-transparent border-0 px-0">
                                                <CustomInput type="radio" id="female" value="P" checked={registrantData.gender === "P" ? true : false} disabled={!isEdit} onChange={(e) => handleChangeGender(e)} />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Label for="female" className="d-flex bg-transparent p-1 m-0 align-items-center">
                                            Female
                                        </Label>
                                    </InputGroup>
                                </div>
                                {touched.gender && errors.gender && <small className="text-danger">{errors.gender}</small>}
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                <Label for="dateOfBirth">Date of Birth</Label>
                            </Col>
                            <Col xs="12" md="8" lg="9">
                                {!isEdit ?
                                    registrantData.dateOfBirth ? registrantData.dateOfBirth.format('DD/MM/YYYY') : 'DD/MMMM/YYYY'
                                    :
                                    <DateRangePicker
                                        initialSettings={{
                                            singleDatePicker: true,
                                            showDropdowns: true,
                                            startDate: new Date(),
                                            maxDate: new Date(),
                                            autoApply: true,
                                        }}
                                        onApply={(e, p) => handleChangeDateOfBirth(p.startDate)}
                                    >
                                        <div id="reportrange" style={{ background: '#fff', cursor: 'pointer', padding: '5px 10px', border: '1px solid #ccc', width: '100%' }}>
                                            <i className="fa fa-calendar mr-2"></i><span>{registrantData.dateOfBirth ? registrantData.dateOfBirth.format('DD/MM/YYYY') : 'DD/MMMM/YYYY'}</span> <i className="fa fa-caret-down float-right"></i>
                                        </div>
                                    </DateRangePicker>
                                }
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
                                    isDisabled={!isEdit}
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
                                <Input type="number" name="idNumber" id="idNumber" value={registrantData.idNumber} disabled={!isEdit} onChange={(e) => handleChangeIdNumber(e)} placeholder="ID Number Field..."
                                    onWheel={(e) => { e.target.blur() }} onInput={(e) => { e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 16) }}
                                />
                                {touched.idNumber && errors.idNumber && <small className="text-danger">{errors.idNumber}</small>}
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                <Label for="npwpNumber">NPWP Number</Label>
                            </Col>
                            <Col xs="12" md="8" lg="9">
                                <Input type="number" name="npwpNumber" id="npwpNumber" value={registrantData.npwpNumber} disabled={!isEdit} onChange={(e) => handleChangeNpwpNumber(e)} placeholder="NPWP Number Field..."
                                    onWheel={(e) => { e.target.blur() }}
                                />
                                {touched.npwpNumber && errors.npwpNumber && <small className="text-danger">{errors.npwpNumber}</small>}
                            </Col>
                        </Row>
                    </Col>
                    {isEdit &&
                        <Col xs="12" className="d-flex justify-content-end">
                            <Button color="primary" className="float-right" onClick={onSubmit} disabled={isSubmitting}>{isSubmitting ? <><Spinner color="light" size="sm" /> Loading...</> : "Save"}</Button>
                        </Col>
                    }
                </Row>
            </CardBody>
        </Card >
    );
}

export const ContactInformationForm = ({ contactData, currentData, setContactData, onSubmit, isSubmitting, touched, errors }) => {
    const [isEdit, setIsEdit] = useState(false);
    const { data: getProvince } = useDataProvinces();
    const province = useMemo(() => getProvince.map(p => ({ label: p.name, value: p.id })), [getProvince])
    const handleChangeProvince = useCallback((e) => {
        setContactData(old => ({ ...old, province: e }))
    }, [setContactData])

    const handleChangeAddress = useCallback((e) => {
        const { value } = e.target;
        setContactData(old => ({ ...old, address: value }))
    }, [setContactData])

    const handleChangePhone = useCallback((e) => {
        const { value } = e.target;
        setContactData(old => ({ ...old, phone: value }))
    }, [setContactData])

    const handleChangeEmail = useCallback((e) => {
        const { value } = e.target;
        setContactData(old => ({ ...old, email: value }))
    }, [setContactData])

    return (
        <Card className="shadow-sm">
            <CardBody>
                <Row className="px-5">
                    <Col xs="12" className="mb-3 d-flex justify-content-between">
                        <div className="font-xl font-weight-bold">CONTACT INFORMATION</div>
                        <Button color={`${isEdit ? 'danger' : 'primary'}`} onClick={() => {
                            setIsEdit(!isEdit)
                            setContactData(currentData)
                        }} disabled={isEdit && isSubmitting}> <FontAwesomeIcon icon={`${isEdit ? 'times' : 'edit'}`} /> {isEdit ? 'Cancel' : 'Edit'}</Button>
                    </Col>
                    <Col xs="12">
                        <Row className="my-3">
                            <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                <Label for="address">Address</Label>
                            </Col>
                            <Col xs="12" md="8" lg="9">
                                <TextareaAutosize
                                    minRows={3}
                                    name="address"
                                    id="address"
                                    className="form-control"
                                    placeholder="Address Field..."
                                    value={contactData.address}
                                    disabled={!isEdit}
                                    onChange={(e) => handleChangeAddress(e)}
                                />
                                {touched.address && errors.address && <small className="text-danger">{errors.address}</small>}
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                <Label for="province">Province</Label>
                            </Col>
                            <Col xs="12" md="8" lg="9">
                                <Select
                                    options={province}
                                    placeholder="Choose province..."
                                    components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                    value={contactData.province}
                                    isDisabled={!isEdit}
                                    onChange={(e) => handleChangeProvince(e)}
                                />
                                {touched.province && errors.province && <small className="text-danger">{errors.province}</small>}
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                <Label for="phone">Mobile Phone</Label>
                            </Col>
                            <Col xs="12" md="8" lg="9">
                                <Input type="number" name="phone" id="phone" value={contactData.phone} disabled={!isEdit} onChange={(e) => handleChangePhone(e)} placeholder="Mobile Phone Field..."
                                    onWheel={(e) => { e.target.blur() }}
                                />
                                {touched.phone && errors.phone && <small className="text-danger">{errors.phone}</small>}
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                <Label for="email">Email</Label>
                            </Col>
                            <Col xs="12" md="8" lg="9">
                                <Input type="email" name="email" id="email" value={contactData.email} disabled={!isEdit} onChange={(e) => handleChangeEmail(e)} placeholder="Email Field..." />
                                {touched.email && errors.email && <small className="text-danger">{errors.email}</small>}
                            </Col>
                        </Row>
                    </Col>
                    {isEdit &&
                        <Col xs="12" className="d-flex justify-content-end">
                            <Button color="primary" className="float-right" onClick={onSubmit} disabled={isSubmitting}>{isSubmitting ? <><Spinner color="light" size="sm" /> Loading...</> : "Save"}</Button>
                        </Col>
                    }
                </Row>
            </CardBody>
        </Card>
    );
}
