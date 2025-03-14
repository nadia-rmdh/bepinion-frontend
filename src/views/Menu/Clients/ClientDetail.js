import React, { useCallback, useMemo } from 'react'
import { Col, Row, Card, CardBody, Spinner } from 'reactstrap'
import noImage from '../../../assets/illustrations/image-error.png'
import { useRouteMatch } from 'react-router-dom';
import useSWR from 'swr';
import { DefaultImageUser } from '../../../components/DefaultImageUser/DefaultImageUser';

function ClientDetail() {
    const matchRoute = useRouteMatch();
    const { data: getClient, error: errorClient } = useSWR(() => `v1/client/${matchRoute.params.ClientId}`);
    const loading = !getClient || errorClient;
    const client = useMemo(() => {
        return getClient?.data?.data ?? [];
    }, [getClient]);

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
                        <Biodata client={client} />
                    </Col>
                    {/* <Col xs="12" md="6">
                        <Statistics client={client} />
                        <Contact client={client} />
                    </Col>
                    <Col xs="12" md="6">
                        <ProjectExperience client={client} />
                        <ExploreOpportunities client={client} />
                    </Col> */}
                </Row>
            </Col>
        </Row>
    )
}

const Biodata = ({ client }) => {

    const onErrorImage = useCallback((e) => {
        e.target.src = noImage;
        e.target.onerror = null;
    }, [])

    return (
        <Card className="shadow-sm">
            <CardBody>
                <Row>
                    <Col xs="12" md="6" className="d-flex align-items-center">
                        {client.avatar
                            ? <img src={client.avatar.replace('http://127.0.0.1:5000', 'https://bepinion.com')} alt="profile" width={180} height={180} style={{ objectFit: 'cover' }} onError={(e) => onErrorImage(e)} className="rounded-circle shadow-sm mb-3" />
                            : <DefaultImageUser text={`${client.firstName} ${client.lastName}`} role='p' size={180} />
                        }
                        <div className="ml-3">
                            <div className="font-2xl font-weight-bold mb-2">{client.name}</div>
                            <div className="mb-2">
                                <div className="text-muted">Sectors</div>
                                <div>{client.sector}</div>
                            </div>
                        </div>
                    </Col>
                    <Col xs="12" md="6">
                        <Row>
                            <Col xs="12">
                                <div className="font-lg font-weight-bold mb-2">
                                    About me
                                </div>
                                <div>
                                    {client.about ?? 'Hello! Thank you for visiting my profile. I will update this section soon.'}
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
}

// eslint-disable-next-line
const Statistics = () => {
    return (
        <Card>
            <CardBody>
                <Row>
                    <Col xs="12">
                        <div className="font-lg font-weight-bold mb-2">
                            STATISTICS
                        </div>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
}

// eslint-disable-next-line
const Contact = () => {
    return (
        <Card className="shadow-sm">
            <CardBody>
                <Row>
                    <Col xs="12">
                        <div className="font-lg font-weight-bold mb-2">CONTACT DETAILS</div>
                    </Col>
                    <Col xs="12">
                        <Card>
                            <CardBody>
                                <div className="position-relative">
                                    <div className="font-weight-bold">First Name Last Name</div>
                                    <div>Role</div>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
}

// eslint-disable-next-line
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

// eslint-disable-next-line
const ExploreOpportunities = () => {
    return (
        <Card className="shadow-sm">
            <CardBody>
                <Row>
                    <Col xs="12">
                        <div className="font-lg font-weight-bold mb-2">EXPLORE OPPORTUNITIES</div>
                    </Col>
                    <Col xs="12">
                        <Card>
                            <CardBody>
                                <Row>
                                    <Col xs="12">
                                        <div className="font-weight-bold">Project Title</div>
                                    </Col>
                                    <Col xs="6">
                                        <div>Sector</div>
                                    </Col>
                                    <Col xs="6" className="text-right">
                                        <div>Tender Closing Date</div>
                                    </Col>
                                    <Col xs="12">
                                        <div>Skills</div>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
}

export default ClientDetail