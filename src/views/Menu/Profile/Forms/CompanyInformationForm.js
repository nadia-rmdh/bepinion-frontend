import React, { useCallback, useMemo, useState } from "react"
import { Card, CardBody, Row, Col, Input, Label, InputGroup, InputGroupAddon, InputGroupText, CustomInput, Button, Spinner } from "reactstrap";
import Select from 'react-select';
import TextareaAutosize from "react-textarea-autosize";
import { useFormik } from "formik";
import * as Yup from 'yup';
import useDataSectors from "../../../../hooks/useDataSectors";
import useDataProvinces from "../../../../hooks/useDataProvinces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default (props) => {
    const data = props.data;

    console.log(data)
    const currentData = useMemo(() => ({
        businessName: data.name ?? '',
        sector: { label: data.sector.name, value: data.sector.id } ?? '',
        companySize: data.size ?? '',
        aboutUs: data.about ?? '',
        npwpNumber: data.npwp ?? '',
        address: data.address ?? '',
        province: { label: data.province.name, value: data.province.id } ?? '',
        phone: data.phoneNumber ?? '',
    }), [data])

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
            <Col xs="12"><CompanyInformationForm currentData={currentData} companyInformationData={values} setCompanyInformationData={setValues} handleSubmit={handleSubmit} isSubmitting={isSubmitting} touched={touched} errors={errors} /></Col>
            <Col xs="12"><ContactInformationForm currentData={currentData} contactData={values} setContactData={setValues} handleSubmit={handleSubmit} isSubmitting={isSubmitting} touched={touched} errors={errors} /></Col>
        </Row>
    );
}

const CompanyInformationForm = ({ currentData, companyInformationData, setCompanyInformationData, handleSubmit, isSubmitting, touched, errors }) => {
    const [isEdit, setIsEdit] = useState(false);
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
                    <Col xs="12" className="mb-3 d-flex justify-content-between">
                        <div className="font-xl font-weight-bold">COMPANY INFORMATION</div>
                        <Button color={`${isEdit ? 'danger' : 'primary'}`} onClick={() => {
                            setIsEdit(!isEdit)
                            setCompanyInformationData(currentData)
                        }} disabled={isEdit && isSubmitting}> <FontAwesomeIcon icon={`${isEdit ? 'times' : 'edit'}`} /> {isEdit ? 'Cancel' : 'Edit'}</Button>
                    </Col>
                    <Col xs="12">
                        <Row className="my-3">
                            <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                <Label for="businessName">Business Entity</Label>
                            </Col>
                            <Col xs="12" md="8" lg="9">
                                <Input type="text" name="businessName" id="businessName" disabled={!isEdit || isSubmitting} value={companyInformationData.businessName} onChange={(e) => handleChangeBusinessName(e)} placeholder="Business Entity Field..." />
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
                                    isDisabled={!isEdit || isSubmitting}
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
                                                <CustomInput type="radio" id="size1" value="<10" disabled={!isEdit || isSubmitting} checked={companyInformationData.companySize === "<10" ? true : false} onChange={(e) => handleChangecompanySize(e)} />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Label for="size1" className="d-flex bg-transparent p-1 m-0 align-items-center">
                                            {"<10"}
                                        </Label>
                                    </InputGroup>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText className="bg-transparent border-0 px-0">
                                                <CustomInput type="radio" id="size2" value="11-50" disabled={!isEdit || isSubmitting} checked={companyInformationData.companySize === "11-50" ? true : false} onChange={(e) => handleChangecompanySize(e)} />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Label for="size2" className="d-flex bg-transparent p-1 m-0 align-items-center">
                                            11-50
                                        </Label>
                                    </InputGroup>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText className="bg-transparent border-0 px-0">
                                                <CustomInput type="radio" id="size3" value="50-100" disabled={!isEdit || isSubmitting} checked={companyInformationData.companySize === "50-100" ? true : false} onChange={(e) => handleChangecompanySize(e)} />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Label for="size3" className="d-flex bg-transparent p-1 m-0 align-items-center">
                                            50-100
                                        </Label>
                                    </InputGroup>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText className="bg-transparent border-0 px-0">
                                                <CustomInput type="radio" id="size4" value="100-500" disabled={!isEdit || isSubmitting} checked={companyInformationData.companySize === "100-500" ? true : false} onChange={(e) => handleChangecompanySize(e)} />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Label for="size4" className="d-flex bg-transparent p-1 m-0 align-items-center">
                                            100-500
                                        </Label>
                                    </InputGroup>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText className="bg-transparent border-0 px-0">
                                                <CustomInput type="radio" id="size1" value=">500" disabled={!isEdit || isSubmitting} checked={companyInformationData.companySize === ">500" ? true : false} onChange={(e) => handleChangecompanySize(e)} />
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
                                    disabled={!isEdit || isSubmitting}
                                />
                                {touched.aboutUs && errors.aboutUs && <small className="text-danger">{errors.aboutUs}</small>}
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                <Label for="npwpNumber">NPWP Number</Label>
                            </Col>
                            <Col xs="12" md="8" lg="9">
                                <Input type="text" name="npwpNumber" id="npwpNumber" disabled={!isEdit || isSubmitting} value={companyInformationData.npwpNumber} onChange={(e) => handleChangeNpwpNumber(e)} placeholder="NPWP Number Field..." />
                                {touched.npwpNumber && errors.npwpNumber && <small className="text-danger">{errors.npwpNumber}</small>}
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
        </Card>
    );
}

const ContactInformationForm = ({ currentData, contactData, setContactData, handleSubmit, isSubmitting, touched, errors }) => {
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
                                    onChange={(e) => handleChangeAddress(e)}
                                    disabled={!isEdit || isSubmitting}
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
                                    isDisabled={!isEdit || isSubmitting}
                                />
                                {touched.province && errors.province && <small className="text-danger">{errors.province}</small>}
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                <Label for="phone">Mobile Phone</Label>
                            </Col>
                            <Col xs="12" md="8" lg="9">
                                <Input type="number" name="phone" id="phone" disabled={!isEdit || isSubmitting} value={contactData.phone} onChange={(e) => handleChangePhone(e)} placeholder="Mobile Phone Field..."
                                    onWheel={(e) => { e.target.blur() }} onInput={(e) => { e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 16) }}
                                />
                                {touched.phone && errors.phone && <small className="text-danger">{errors.phone}</small>}
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
        </Card>
    );
}
