import React, { useCallback, useMemo } from "react"
import { Card, CardBody, Row, Col, Input, Label, InputGroup, InputGroupAddon, InputGroupText, CustomInput } from "reactstrap";
import Select from 'react-select';
import TextareaAutosize from "react-textarea-autosize";
import { Stats } from "../Components/Navigation";
import { useFormik } from "formik";
import * as Yup from 'yup';
import useDataSectors from "../../../../hooks/useDataSectors";
import useDataProvinces from "../../../../hooks/useDataProvinces";


export default (props) => {
    const ValidationFormSchema = () => {
        return Yup.object().shape({
            businessName: Yup.string().required().label('Business Name'),
            sector: Yup.string().required().label('Sector'),
            companySize: Yup.string().required().oneOf(['<10', '11-50', '50-100', '100-500', '>500']).label('Company Size'),
            aboutUs: Yup.string().required().label('About Us'),
            npwpNumber: Yup.string().required().label('NPWP Number'),
            address: Yup.string().required().label('Address'),
            province: Yup.string().required().label('Province'),
            phone: Yup.string().required().label('Phone'),
        })
    }

    const { values, touched, errors, setValues, handleSubmit } = useFormik({
        initialValues: {
            businessName: '',
            sector: '',
            companySize: '',
            aboutUs: '',
            npwpNumber: '',
            address: '',
            province: '',
            phone: '',
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
            <Col xs="12"><CompanyInformationForm companyInformationData={values} setCompanyInformationData={setValues} touched={touched} errors={errors} /></Col>
            <Col xs="12"><ContactInformationForm contactData={values} setContactData={setValues} touched={touched} errors={errors} /></Col>
            <Col xs="12"><Stats step={props.step} {...props} nextStep={handleSubmit} /></Col>
        </Row>
    );
}

const CompanyInformationForm = ({ companyInformationData, setCompanyInformationData, touched, errors }) => {
    const { data: getSector } = useDataSectors();
    const sectors = useMemo(() => getSector.map(p => ({ label: p.name, value: p.id })), [getSector])

    const handleChangeBusinessName = useCallback((e) => {
        const { value } = e.target;
        setCompanyInformationData(old => ({ ...old, businessName: value }))
    }, [setCompanyInformationData])

    const handleChangecompanySize = useCallback((e) => {
        const { value, checked } = e.target;
        setCompanyInformationData(old => ({ ...old, companySize: checked ? value : '' }))
    }, [setCompanyInformationData])

    const handleChangeSector = useCallback((e) => {
        setCompanyInformationData(old => ({ ...old, sector: e }))
    }, [setCompanyInformationData])

    const handleChangeNpwpNumber = useCallback((e) => {
        const { value } = e.target;
        setCompanyInformationData(old => ({ ...old, npwpNumber: value }))
    }, [setCompanyInformationData])

    const handleChangeAboutUs = useCallback((e) => {
        const { value } = e.target;
        setCompanyInformationData(old => ({ ...old, aboutUs: value }))
    }, [setCompanyInformationData])

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
                                <Label for="businessName">Business Entity</Label>
                            </Col>
                            <Col xs="12" md="8" lg="9">
                                <Input type="text" name="businessName" id="businessName" value={companyInformationData.businessName} onChange={(e) => handleChangeBusinessName(e)} placeholder="Business Entity Field..." />
                                {touched.businessName && errors.businessName && <small className="text-danger">{errors.businessName}</small>}
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                <Label for="sector">Sector</Label>
                            </Col>
                            <Col xs="12" md="8" lg="9">
                                <Select
                                    options={sectors}
                                    placeholder="Choose a socter..."
                                    value={companyInformationData.sector}
                                    onChange={(e) => handleChangeSector(e)}
                                    components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                />
                                {touched.sector && errors.sector && <small className="text-danger">{errors.sector}</small>}
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                <Label for="companySize">Company Size</Label>
                            </Col>
                            <Col xs="12" md="8" lg="9">
                                <div className="d-flex">
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText className="bg-transparent border-0 px-0">
                                                <CustomInput type="radio" id="size1" value="<10" checked={companyInformationData.companySize === "<10" ? true : false} onChange={(e) => handleChangecompanySize(e)} />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Label for="size1" className="d-flex bg-transparent p-1 m-0 align-items-center">
                                            {"<10"}
                                        </Label>
                                    </InputGroup>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText className="bg-transparent border-0 px-0">
                                                <CustomInput type="radio" id="size2" value="11-50" checked={companyInformationData.companySize === "11-50" ? true : false} onChange={(e) => handleChangecompanySize(e)} />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Label for="size2" className="d-flex bg-transparent p-1 m-0 align-items-center">
                                            11-50
                                        </Label>
                                    </InputGroup>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText className="bg-transparent border-0 px-0">
                                                <CustomInput type="radio" id="size3" value="50-100" checked={companyInformationData.companySize === "50-100" ? true : false} onChange={(e) => handleChangecompanySize(e)} />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Label for="size3" className="d-flex bg-transparent p-1 m-0 align-items-center">
                                            50-100
                                        </Label>
                                    </InputGroup>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText className="bg-transparent border-0 px-0">
                                                <CustomInput type="radio" id="size4" value="100-500" checked={companyInformationData.companySize === "100-500" ? true : false} onChange={(e) => handleChangecompanySize(e)} />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Label for="size4" className="d-flex bg-transparent p-1 m-0 align-items-center">
                                            100-500
                                        </Label>
                                    </InputGroup>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText className="bg-transparent border-0 px-0">
                                                <CustomInput type="radio" id="size1" value=">500" checked={companyInformationData.companySize === ">500" ? true : false} onChange={(e) => handleChangecompanySize(e)} />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Label for="size1" className="d-flex bg-transparent p-1 m-0 align-items-center">
                                            {">500"}
                                        </Label>
                                    </InputGroup>
                                </div>
                                {touched.companySize && errors.companySize && <small className="text-danger">{errors.companySize}</small>}
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                <Label for="aboutUs">About Us</Label>
                            </Col>
                            <Col xs="12" md="8" lg="9">
                                <TextareaAutosize
                                    minRows={3}
                                    name="aboutUs"
                                    id="aboutUs"
                                    className="form-control"
                                    placeholder="About Us Field..."
                                    value={companyInformationData.aboutUs}
                                    onChange={(e) => handleChangeAboutUs(e)}
                                />
                                {touched.aboutUs && errors.aboutUs && <small className="text-danger">{errors.aboutUs}</small>}
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                <Label for="npwpNumber">NPWP Number</Label>
                            </Col>
                            <Col xs="12" md="8" lg="9">
                                <Input type="number" name="npwpNumber" id="npwpNumber" value={companyInformationData.npwpNumber} onChange={(e) => handleChangeNpwpNumber(e)} placeholder="NPWP Number Field..." />
                                {touched.npwpNumber && errors.npwpNumber && <small className="text-danger">{errors.npwpNumber}</small>}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
}

const ContactInformationForm = ({ contactData, setContactData, touched, errors }) => {
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
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
}
