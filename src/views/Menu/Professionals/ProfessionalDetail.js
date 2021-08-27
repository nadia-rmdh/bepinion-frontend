import React, { useCallback, useMemo } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { Col, Row, Card, CardBody, InputGroup, InputGroupAddon, InputGroupText, CustomInput, Table, Badge, Progress, Input, Button } from 'reactstrap'
import moment from 'moment'
import { t } from 'react-switch-lang';
import { Bar } from 'react-chartjs-2';
import noImage from '../../../assets/illustrations/image-error.png'
import { useRouteMatch } from 'react-router-dom';
import useSWR from 'swr';

const colorSkills = [
    'success',
    'danger',
    'warning',
    'secondary',
    'info',
    'primary',
    'light',
    'dark'
]

function ProfessionalDetail() {
    const matchRoute = useRouteMatch();
    const { data: getProfessional, error: errorProfessional, mutate: mutateProfessional } = useSWR(() => `v1/professional/${matchRoute.params.professionalId}`);
    const loading = !getProfessional && !errorProfessional;
    const professional = useMemo(() => {
        return getProfessional?.data?.data ?? [];
    }, [getProfessional]);

    return (
        <Row className="mt-md-3 mt-lg-n2">
            <Col xs="12">
                <Row>
                    <Col xs="12">
                        <Biodata professional={professional} />
                    </Col>
                    <Col xs="12" md="6">
                        <Skills professional={professional} />
                        <WorkExprerience professional={professional} />
                        <Education professional={professional} />
                    </Col>
                    <Col xs="12" md="6">
                        <ProjectExperience professional={professional} />
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

const Biodata = ({ professional }) => {
    console.log(professional)
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
                            <div className="font-2xl font-weight-bold mb-2">{professional.firstName} {professional.lastName}</div>
                            <div className="mb-2">{professional.yearOfExperience} year of experience</div>
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
                                <div className="text-muted">
                                    {professional.about ?? 'Nothing about me'}
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
}

const Skills = ({ professional }) => {
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

const WorkExprerience = ({ professional }) => {
    return (
        <Card className="shadow-sm">
            <CardBody>
                <Row>
                    <Col xs="12">
                        <div className="font-lg font-weight-bold mb-2">WORK EXPERIENCE</div>
                    </Col>
                    {professional?.workExperience?.map((work, i) => (
                        <Col xs="12" key={i}>
                            <Card>
                                <CardBody>
                                    <div className="position-relative">
                                        <div className="font-weight-bold">{work.jobTitle}</div>
                                        <div>{work.companyName}</div>
                                        <div>{work.sector}</div>
                                        <div>Skills</div>
                                        <div>
                                            {work?.skills?.map((skill, i) => (
                                                <Badge key={i} color={colorSkills[i]} className="text-uppercase mx-1 font-sm text-light">{skill.name}</Badge>
                                            ))}
                                        </div>
                                        <div className="position-absolute" style={{ right: '0px', top: '0px' }}>{moment(work.startDate).format('MMMM YYYY')} - {moment(work.endDate).format('MMMM YYYY')}</div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </CardBody>
        </Card>
    )
}

const Education = ({ professional }) => {
    return (
        <Card className="shadow-sm">
            <CardBody>
                <Row>
                    <Col xs="12">
                        <div className="font-lg font-weight-bold mb-2">EDUCATION</div>
                    </Col>

                    {professional?.educations?.map((education, i) => (
                        <Col xs="12" key={i}>
                            <Card>
                                <CardBody>
                                    <div className="position-relative">
                                        <div className="font-weight-bold">{education.educationDegree}</div>
                                        <div>{education.school}</div>
                                        <div>{education.educationField}</div>
                                        {/* <div className="position-absolute" style={{ right: '0px', top: '0px' }}>{moment(work.startDate).format('MMMM YYYY')} - {moment(work.endDate).format('MMMM YYYY')}</div> */}
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </CardBody>
        </Card>
    )
}

const ProjectExperience = ({ professional }) => {
    return (
        <Card className="shadow-sm">
            <CardBody>
                <Row>
                    <Col xs="12">
                        <div className="font-lg font-weight-bold mb-2">PROJECT EXPERIENCE</div>
                    </Col>
                    {professional?.projectExperience?.map((project, i) => (
                        <Col xs="12" key={i}>
                            <Card>
                                <CardBody>
                                    <div className="position-relative">
                                        <div className="font-weight-bold">{project.projectName}</div>
                                        <div>{project.projectRole}</div>
                                        <div>Client Name</div>
                                        <div>{project.sector}</div>
                                        <div>Skills</div>
                                        <div>
                                            {project?.skills?.map((skill, i) => (
                                                <Badge key={i} color={colorSkills[i]} className="text-uppercase mx-1 font-sm text-light">{skill.name}</Badge>
                                            ))}
                                        </div>
                                        <div className="position-absolute" style={{ right: '0px', top: '0px' }}>
                                            <div>{moment(project.startDate).format('MMMM YYYY')} - {moment(project.endDate).format('MMMM YYYY')}</div>
                                            <div>Contract Value Range</div>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </CardBody>
        </Card>
    )
}
export default ProfessionalDetail