import React, { useCallback, useMemo, useState } from 'react'
import { Col, Row, Card, CardBody, Badge, Button, Modal, ModalBody, Spinner } from 'reactstrap'
import moment from 'moment'
import Select from 'react-select';
import noImage from '../../../assets/illustrations/image-error.png'
import { useRouteMatch } from 'react-router-dom';
import useSWR from 'swr';
import { toast } from 'react-toastify';
import request from "../../../utils/request";
import { DefaultImageUser } from '../../../components/DefaultImageUser/DefaultImageUser';
import ColorSkill from '../../../components/ColorSkill';

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

const Biodata = ({ professional, matchRoute }) => {
    const [modalInvite, setModalInvite] = useState(false);
    const [projectChoosen, setProjectChoosen] = useState(null);

    const { data: getProject, error: errorProject, } = useSWR(() => `v1/project/client`, { refreshInterval: 0 });
    const loading = !getProject || errorProject;
    const project = useMemo(() => {
        return getProject?.data?.data.filter(p => p.status === 'open').map(p => ({ label: p.name, value: p.id })) ?? [];
    }, [getProject]);

    const onErrorImage = useCallback((e) => {
        e.target.src = noImage;
        e.target.onerror = null;
    }, [])

    const handleInvite = () => {
        request.post(`v1/professional/${professional.id}/invite`, {
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
                        {professional.avatar
                            ? <img src={professional.avatar.replace('http://127.0.0.1:5000', 'https://bepinion.com')} alt="profile" width={180} height={180} style={{ objectFit: 'cover' }} onError={(e) => onErrorImage(e)} className="rounded-circle shadow-sm mb-3" />
                            : <DefaultImageUser text={`${professional.firstName} ${professional.lastName}`} role='p' size={180} />
                        }
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
                                    {professional.about ?? 'Hello! Thank you for visiting my profile. I will update this section soon.'}
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
                    <Col xs="12" md="6" className="d-flex justify-content-center align-items-center p-3">
                        <Card style={{ width: '200px', height: '200px' }}>
                            <CardBody className="d-flex justify-content-center align-items-center">
                                <div className="text-muted text-center">
                                    This feature to be released soon
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xs="12" md="6">
                        <div className="mb-2">
                            <div className="text-muted">Skills</div>
                            <div>
                                {professional?.skills?.map((skill, i) => (
                                    <Badge key={i} style={{ backgroundColor: ColorSkill[skill.category], whiteSpace: 'normal' }} className="text-uppercase m-1 font-sm text-light">{skill.name}</Badge>
                                ))}
                            </div>
                        </div>
                        <div className="mb-2">
                            <div className="text-muted">Sectors</div>
                            <div>
                                {professional?.sectors?.map((sector, i) => (
                                    <Badge key={i} color={colorSkills[i]} className="text-uppercase m-1 font-sm text-light" style={{ whiteSpace: 'normal' }}>{sector.name}</Badge>
                                ))}
                            </div>
                        </div>
                    </Col>
                    <Col xs="12" md="6" className="text-center mt-3">
                        <div className="d-flex justify-content-center" style={{ fontSize: '50pt' }}><Badge color="secondary" className="d-flex justify-content-center" style={{ width: 80, height: 80 }}>{professional?.projectDetails?.closedProject}</Badge></div>
                        <p style={{ whiteSpace: 'nowrap' }}>Project Completed</p>
                    </Col>
                    <Col xs="12" md="6" className="text-center mt-3">
                        <div className="d-flex justify-content-center" style={{ fontSize: '50pt' }}><Badge color="secondary" className="d-flex justify-content-center" style={{ width: 80, height: 80 }}>{professional?.projectDetails?.activeProject}</Badge></div>
                        <p style={{ whiteSpace: 'nowrap' }}>Active Projects</p>
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
                                        <div className="mb-2">
                                            <div className="text-muted">Job</div>
                                            <div className="font-weight-bold">{work.jobTitle}</div>
                                        </div>
                                        <div className="mb-2">
                                            <div className="text-muted">Company Name</div>
                                            <div>{work.companyName}</div>
                                        </div>
                                        <div className="mb-2">
                                            <div className="text-muted">Sectors</div>
                                            <div>{work.sector}</div>
                                        </div>
                                        <div className="mb-2">
                                            <div className="text-muted">Skills</div>
                                            <div>
                                                {work?.skills?.map((skill, i) => (
                                                    <Badge key={i} style={{ backgroundColor: ColorSkill[skill.category] }} className="text-uppercase mx-1 font-sm text-light">{skill.name}</Badge>
                                                ))}
                                            </div>
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
                                        <div>{education.educationField}</div>
                                        <div>{education.school}</div>
                                        <div className="position-absolute" style={{ right: '0px', top: '0px' }}>{education.graduationYear}</div>
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
                                        <div className="mb-2">
                                            <div className="text-muted">Project Name</div>
                                            <div>{project.projectName}</div>
                                        </div>
                                        <div className="mb-2">
                                            <div className="text-muted">Project Role</div>
                                            <div>{project.projectRole}</div>
                                        </div>
                                        <div className="mb-2">
                                            <div className="text-muted">Client Name</div>
                                            <div>{project.clientName}</div>
                                        </div>
                                        <div className="mb-2">
                                            <div className="text-muted">Project Sector</div>
                                            <div>{project.sector}</div>
                                        </div>
                                        <div className="mb-2">
                                            <div className="text-muted">Skills</div>
                                            <div>
                                                {project?.skills?.map((skill, i) => (
                                                    <Badge key={i} style={{ backgroundColor: ColorSkill[skill.category] }} className="text-uppercase mx-1 font-sm text-light">{skill.name}</Badge>
                                                ))}
                                            </div>
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