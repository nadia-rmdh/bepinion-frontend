import React from "react"
import DateRangePicker from "react-bootstrap-daterangepicker";
import { Card, CardBody, Row, Col, Input, Label, InputGroup, InputGroupAddon, InputGroupText, CustomInput } from "reactstrap";
import 'bootstrap-daterangepicker/daterangepicker.css';
import Select from 'react-select';
import TextareaAutosize from "react-textarea-autosize";


export default () => {
    return (
        <Row>
            <Col xs="12"><RegistrantInformationForm /></Col>
            <Col xs="12"><ContactInformationForm /></Col>
        </Row>
    );
}

export const RegistrantInformationForm = () => {
    const idType = [
        { label: 'KTP', value: 'ktp' },
        { label: 'SIM A', value: 'simA' },
        { label: 'SIM B', value: 'simB' },
        { label: 'SIM C', value: 'simC' },
        { label: 'Passport', value: 'passport' },
    ]
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
                                <Input type="text" name="firstName" id="firstName" placeholder="First Name Field..." />
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                <Label for="lastName">Last Name</Label>
                            </Col>
                            <Col xs="12" md="8" lg="9">
                                <Input type="text" name="lastName" id="lastName" placeholder="Last Name Field..." />
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                <Label for="gender">Gender</Label>
                            </Col>
                            <Col xs="12" md="8" lg="9" className="d-flex">
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText className="bg-transparent border-0 px-0">
                                            <CustomInput type="radio" id="male" value="male" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Label for="male" className="d-flex bg-transparent p-1 align-items-center">
                                        Male
                                    </Label>
                                </InputGroup>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText className="bg-transparent border-0 px-0">
                                            <CustomInput type="radio" id="female" value="female" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Label for="female" className="d-flex bg-transparent p-1 align-items-center">
                                        Female
                                    </Label>
                                </InputGroup>
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
                                        minYear: 2021,
                                        maxDate: new Date(),
                                        autoApply: true,
                                    }}
                                >
                                    <div id="reportrange" style={{ background: '#fff', cursor: 'pointer', padding: '5px 10px', border: '1px solid #ccc', width: '100%' }}>
                                        <i className="fa fa-calendar mr-2"></i><span></span> <i className="fa fa-caret-down"></i>
                                    </div>
                                </DateRangePicker>
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
                                    // onChange={(e) => handleChangeSkills(e)}
                                    components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                // value={filter.skills}
                                />
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                <Label for="idNumber">ID Number</Label>
                            </Col>
                            <Col xs="12" md="8" lg="9">
                                <Input type="number" name="idNumber" id="idNumber" placeholder="ID Number Field..." />
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                <Label for="npwpNumber">NPWP Number</Label>
                            </Col>
                            <Col xs="12" md="8" lg="9">
                                <Input type="number" name="npwpNumber" id="npwpNumber" placeholder="NPWP Number Field..." />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </CardBody>
        </Card >
    );
}

export const ContactInformationForm = () => {
    const province = [
        { label: 'Jawa Timur', value: 'Jawa Timur' },
        { label: 'Jawa Tengah', value: 'Jawa Tengah' },
        { label: 'Jawa Barat', value: 'Jawa Barat' },
    ]

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
                                />
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
                                    // onChange={(e) => handleChangeSkills(e)}
                                    components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                // value={filter.skills}
                                />
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                <Label for="phone">Phone</Label>
                            </Col>
                            <Col xs="12" md="8" lg="9">
                                <Input type="number" name="phone" id="phone" placeholder="Phone Field..." />
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col xs="12" md="4" lg="3" className="d-flex align-items-center">
                                <Label for="email">Email</Label>
                            </Col>
                            <Col xs="12" md="8" lg="9">
                                <Input type="email" name="email" id="email" placeholder="Email Field..." />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
}
