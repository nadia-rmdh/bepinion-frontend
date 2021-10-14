import React, { useCallback, useMemo, useState } from 'react'
import { Col, Row, Card, CardBody, Badge, Button, Modal, ModalBody, Spinner } from 'reactstrap'
import moment from 'moment'
import Select from 'react-select';
import noImage from '../../../assets/illustrations/image-error.png'
import { useRouteMatch } from 'react-router-dom';
import useSWR from 'swr';
import { toast } from 'react-toastify';
import request from "../../../utils/request";

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
    const { data: getProfessional, error: errorProfessional, } = useSWR(() => `v1/professional/${matchRoute.params.professionalId}`);
    const loading = !getProfessional || errorProfessional;
    const professional = useMemo(() => {
        return getProfessional?.data?.data ?? [];
    }, [getProfessional]);

    if (loading) {
        return (
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    background: "rgba(255,255,255, 0.5)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Spinner style={{ width: 48, height: 48 }} />
            </div>
        )
    }

    return (
        <Row className="mt-md-3 mt-lg-n2">
            <Col xs="12">
                <Row>
                    <Col xs="12">
                        <Biodata professional={professional} matchRoute={matchRoute} />
                    </Col>
                    {/* <Col xs="12" md="6">
                        <Skills professional={professional} />
                        <WorkExprerience professional={professional} />
                        <Education professional={professional} />
                    </Col>
                    <Col xs="12" md="6">
                        <ProjectExperience professional={professional} />
                    </Col> */}
                </Row>
            </Col>
        </Row>
    )
}

const Biodata = ({ professional, matchRoute }) => {
    const [modalInvite, setModalInvite] = useState(false);
    const [projectChoosen, setProjectChoosen] = useState(null);

    const { data: getProject, error: errorProject, } = useSWR(() => `v1/project/client`, { refreshInterval: 0 });
    const loading = !getProject || errorProject;
    const project = useMemo(() => {
        return getProject?.data?.data.map(p => ({ label: p.name, value: p.id })) ?? [];
    }, [getProject]);

    const onErrorImage = useCallback((e) => {
        e.target.src = noImage;
        e.target.onerror = null;
    }, [])

    const handleInvite = () => {
        request.post(`v1/professional/${matchRoute.params.professionalId}/invite`, {
            idProject: projectChoosen.value
        })
            .then(res => {
                toast.success('Invite Successfully')
            })
            .catch(err => {
                toast.error('Invite Failed');
            })
            .finally(() => setModalInvite(!modalInvite))
    }

    const handleChangeProject = (e) => {
        setProjectChoosen(e ?? '')
    }

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
                                <Button color="primary" className="float-right" onClick={() => setModalInvite(!modalInvite)}>
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
                <Modal isOpen={modalInvite} centered toggle={() => setModalInvite(!modalInvite)}>
                    <ModalBody className="p-5">
                        <Row>
                            <Col xs="12">
                                <div className="mb-2">
                                    Choose a project to inviting professional!
                                </div>
                            </Col>
                            <Col xs="12" className="mb-3">
                                <Select
                                    options={project}
                                    isDisabled={loading}
                                    placeholder="Choose a Project..."
                                    onChange={(e) => handleChangeProject(e)}
                                    components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                    value={projectChoosen} />
                            </Col>
                            <Col xs="12" className="d-flex justify-content-end">
                                <Button color="secondary" className="mr-2" onClick={() => setModalInvite(!modalInvite)}>Cancel</Button>
                                <Button color="primary" className="text-capitalize" onClick={handleInvite}>Invite</Button>
                            </Col>
                        </Row>
                    </ModalBody>
                </Modal>
            </CardBody>
        </Card>
    )
}

// eslint-disable-next-line
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

// eslint-disable-next-line
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

// eslint-disable-next-line
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

// eslint-disable-next-line
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