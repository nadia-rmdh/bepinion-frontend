import React, { useCallback, useMemo } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { Col, Row, Card, CardBody, InputGroup, InputGroupAddon, InputGroupText, CustomInput, Table, Badge, Progress, Input, Button } from 'reactstrap'
import moment from 'moment'
import { t } from 'react-switch-lang';
import { Bar } from 'react-chartjs-2';
import noImage from '../../../assets/illustrations/image-error.png'

function ProfessionalDetail() {
    return (
        <Row className="mt-md-3 mt-lg-n2">
            <Col xs="12">
                <Row>
                    <Col xs="12">
                        <Biodata />
                    </Col>
                    <Col xs="12" md="6">
                        <Skills />
                        <WorkExprerience />
                        <Education />
                    </Col>
                    <Col xs="12" md="6">
                        <ProjectExperience />
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

const Biodata = () => {

    const onErrorImage = useCallback((e) => {
        e.target.src = noImage;
        e.target.onerror = null;
    }, [])

    return (
        <Card className="shadow-sm">
            <CardBody>
                <Row>
                    <Col xs="12" md="6" className="d-flex align-items-center">
                        <img src={noImage} className="rounded-circle shadow-sm" alt="avatar" style={{ objectFit: 'cover', width: '200px', height: '200px' }} onError={(e) => onErrorImage(e)} />
                        <div className="ml-3">
                            <div className="font-2xl font-weight-bold mb-2">First Name Last Name</div>
                            <div className="mb-2">Level / Years of Experience</div>
                            <div className="mb-2">Sector</div>
                        </div>
                    </Col>
                    <Col xs="12" md="6">
                        <Row>
                            <Col xs="12">
                                <Button color="primary" className="float-right">
                                    Invite
                                </Button>
                            </Col>
                            <Col xs="12">
                                <div className="font-lg font-weight-bold mb-2">
                                    About me
                                </div>
                                <div>
                                    In looking at this amazing pasta dish, I can see the linear style pasta noodles that have come out of the box. I pour out the long penne noodles into the boiling water to cook for several minutes. Depending on the preference of the eater, one can cook the pasta al-dente or fully cooked to their individual perfection. I can see the pasta penne noodles pattern that is striated lines parallel to each other on each single noodle. While waiting for the pasta to cook, I prepare the ingredients to complement the penne pasta and I stir the reddish tomato paste for the final addition.
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
}

const Skills = () => {
    return (
        <Card>
            <CardBody>
                <Row>
                    <Col xs="12">
                        <div className="font-lg font-weight-bold mb-2">
                            SKILLS AND STATISTICS
                        </div>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
}

const WorkExprerience = () => {
    return (
        <Card className="shadow-sm">
            <CardBody>
                <Row>
                    <Col xs="12">
                        <div className="font-lg font-weight-bold mb-2">WORK EXPERIENCE</div>
                    </Col>
                    <Col xs="12">
                        <Card>
                            <CardBody>
                                <div className="position-relative">
                                    <div className="font-weight-bold">Job Title</div>
                                    <div>Employer Name</div>
                                    <div>Sector</div>
                                    <div>Skills</div>
                                    <div className="position-absolute" style={{ right: '0px', top: '0px' }}>MMM YY - MMM YY</div>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
}

const Education = () => {
    return (
        <Card className="shadow-sm">
            <CardBody>
                <Row>
                    <Col xs="12">
                        <div className="font-lg font-weight-bold mb-2">EDUCATION</div>
                    </Col>
                    <Col xs="12">
                        <Card>
                            <CardBody>
                                <div className="position-relative">
                                    <div className="font-weight-bold">Degree</div>
                                    <div>University</div>
                                    <div>Education Field</div>
                                    <div className="position-absolute" style={{ right: '0px', top: '0px' }}>MMM YY - MMM YY</div>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
}

const ProjectExperience = () => {
    return (
        <Card className="shadow-sm">
            <CardBody>
                <Row>
                    <Col xs="12">
                        <div className="font-lg font-weight-bold mb-2">PROJECT EXPERIENCE</div>
                    </Col>
                    <Col xs="12">
                        <Card>
                            <CardBody>
                                <div className="position-relative">
                                    <div className="font-weight-bold">Project Title</div>
                                    <div>Project Role</div>
                                    <div>Client Name</div>
                                    <div>Sector</div>
                                    <div>Skills</div>
                                    <div className="position-absolute" style={{ right: '0px', top: '0px' }}>
                                        <div>Month Year</div>
                                        <div>Contract Value Range</div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
}
export default ProfessionalDetail