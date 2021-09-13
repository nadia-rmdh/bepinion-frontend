import React, { useCallback, useMemo } from "react"
import DateRangePicker from "react-bootstrap-daterangepicker";
import { Card, CardBody, Row, Col, Input, Label, InputGroup, InputGroupAddon, InputGroupText, CustomInput } from "reactstrap";
import Select from 'react-select';
import TextareaAutosize from "react-textarea-autosize";
import { Stats } from "../Components/Navigation";
import { useFormik } from "formik";
import * as Yup from 'yup';
import useDataProvinces from "../../../../hooks/useDataProvinces";
import moment from "moment";
import useDataSectors from "../../../../hooks/useDataSectors";


export default (props) => {
    let getLocalStorage;
    if (props.registrationForm === 'professional') getLocalStorage = JSON.parse(localStorage.getItem('registrationProfessional'))
    if (props.registrationForm === 'business') getLocalStorage = JSON.parse(localStorage.getItem('registrationBusiness'))
    if (props.registrationForm === 'individual') getLocalStorage = JSON.parse(localStorage.getItem('registrationIndividual'))

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

    const { values, touched, errors, setValues, handleSubmit } = useFormik({
        initialValues: {
            firstName: getLocalStorage?.registrantForm?.firstName ?? '',
            lastName: getLocalStorage?.registrantForm?.lastName ?? '',
            gender: getLocalStorage?.registrantForm?.gender ?? '',
            dateOfBirth: getLocalStorage?.registrantForm?.dateOfBirth ? moment(getLocalStorage?.registrantForm?.dateOfBirth) : '',
            idType: { label: 'KTP', value: 'ktp' },
            idNumber: getLocalStorage?.registrantForm?.idNumber ?? '',
            npwpNumber: getLocalStorage?.registrantForm?.npwpNumber ?? '',
            address: getLocalStorage?.registrantForm?.address ?? '',
            province: getLocalStorage?.registrantForm?.province ?? '',
            phone: getLocalStorage?.registrantForm?.phone ?? '',
            email: getLocalStorage?.registrantForm?.email ?? '',
            sector: '',
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
            <Col xs="12"><RegistrantInformationForm registrantData={values} setRegistrantData={setValues} touched={touched} errors={errors} {...props} /></Col>
            <Col xs="12"><ContactInformationForm contactData={values} setContactData={setValues} touched={touched} errors={errors} /></Col>
            <Col xs="12"><Stats step={props.step} {...props} nextStep={handleSubmit} /></Col>
        </Row>
    );
}

export const RegistrantInformationForm = ({ registrantData, setRegistrantData, touched, errors, registrationForm }) => {
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
                    <Col xs="12" className="mb-3">
                        <div className="font-xl font-weight-bold">REGISTRANT INFORMATION</div>
                    </Col>
                    <Col xs="12">
                        <Row className="my-3">
                            <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                <Label for="firstName">First Name</Label>
                            </Col>
                            <Col xs="12" md="8" lg="9">
                                <Input type="text" name="firstName" id="firstName" value={registrantData.firstName} onChange={(e) => handleChangeFirstName(e)} placeholder="First Name Field..." />
                                {touched.firstName && errors.firstName && <small className="text-danger">{errors.firstName}</small>}
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                <Label for="lastName">Last Name</Label>
                            </Col>
                            <Col xs="12" md="8" lg="9">
                                <Input type="text" name="lastName" id="lastName" value={registrantData.lastName} onChange={(e) => handleChangeLastName(e)} placeholder="Last Name Field..." />
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
                                                <CustomInput type="radio" id="male" value="L" checked={registrantData.gender === "L" ? true : false} onChange={(e) => handleChangeGender(e)} />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Label for="male" className="d-flex bg-transparent p-1 m-0 align-items-center">
                                            Male
                                        </Label>
                                    </InputGroup>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText className="bg-transparent border-0 px-0">
                                                <CustomInput type="radio" id="female" value="P" checked={registrantData.gender === "P" ? true : false} onChange={(e) => handleChangeGender(e)} />
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
                                {touched.dateOfBirth && errors.dateOfBirth && <small className="text-danger">{errors.dateOfBirth}</small>}
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
                                />
                                {touched.idType && errors.idType && <small className="text-danger">{errors.idType}</small>}
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                <Label for="idNumber">ID Number</Label>
                            </Col>
                            <Col xs="12" md="8" lg="9">
                                <Input type="number" name="idNumber" id="idNumber" value={registrantData.idNumber} onChange={(e) => handleChangeIdNumber(e)} placeholder="ID Number Field..." />
                                {touched.idNumber && errors.idNumber && <small className="text-danger">{errors.idNumber}</small>}
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                <Label for="npwpNumber">NPWP Number</Label>
                            </Col>
                            <Col xs="12" md="8" lg="9">
                                <Input type="number" name="npwpNumber" id="npwpNumber" value={registrantData.npwpNumber} onChange={(e) => handleChangeNpwpNumber(e)} placeholder="NPWP Number Field..." />
                                {touched.npwpNumber && errors.npwpNumber && <small className="text-danger">{errors.npwpNumber}</small>}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </CardBody>
        </Card >
    );
}

export const ContactInformationForm = ({ contactData, setContactData, touched, errors }) => {
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
                    <Col xs="12" className="mb-3">
                        <div className="font-xl font-weight-bold">CONTACT INFORMATION</div>
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
                                    onChange={(e) => handleChangeProvince(e)}
                                />
                                {touched.province && errors.province && <small className="text-danger">{errors.province}</small>}
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                <Label for="phone">Phone</Label>
                            </Col>
                            <Col xs="12" md="8" lg="9">
                                <Input type="number" name="phone" id="phone" value={contactData.phone} onChange={(e) => handleChangePhone(e)} placeholder="Phone Field..." />
                                {touched.phone && errors.phone && <small className="text-danger">{errors.phone}</small>}
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                <Label for="email">Email</Label>
                            </Col>
                            <Col xs="12" md="8" lg="9">
                                <Input type="email" name="email" id="email" value={contactData.email} onChange={(e) => handleChangeEmail(e)} placeholder="Email Field..." />
                                {touched.email && errors.email && <small className="text-danger">{errors.email}</small>}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
}
