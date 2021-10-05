import React, { useMemo, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { Col, Row, Card, CardBody, InputGroup, InputGroupAddon, InputGroupText, CustomInput, Table, Badge, Progress, Input, Button, Spinner, Modal, ModalBody } from 'reactstrap'
import moment from 'moment'
import { Bar } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import { useAuthUser } from '../../../store';
import useSWR from 'swr';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import request from "../../../utils/request";

const localizer = momentLocalizer(moment);
function ClientDashboard() {
    const user = useAuthUser()
    const { data: getData, error, mutate } = useSWR(() => `v1/user/me/dashboard`);
    const loading = !getData || error
    const data = useMemo(() => {
        return getData?.data?.data ?? [];
    }, [getData]);

    const dummyProjects = [
        { projectName: 'Project 1', professionalName: 'Client A', status: 'Applied', progress: 0, closingDate: '2021-08-25' },
        { projectName: 'Project 2', professionalName: 'Client B', status: 'On-Going', progress: 30, closingDate: '2021-08-20' },
        { projectName: 'Project 3', professionalName: 'Client C', status: 'On-Going', progress: 90, closingDate: '2021-08-28' },
        { projectName: 'Project 4', professionalName: 'Client D', status: 'On-Going', progress: 60, closingDate: '2021-08-31' },
    ]

    const dummyActivities = [
        { projectName: 'Project 1', category: 'Deliverable', action: 'Action 1', dueDate: '2021-08-25' },
        { projectName: 'Project 2', category: 'Meeting', action: 'Action 2', dueDate: '2021-08-23' },
        { projectName: 'Project 3', category: 'Invoice', action: 'Action 3', dueDate: '2021-08-29' },
        { projectName: 'Project 4', category: 'Meeting', action: 'Action 4', dueDate: '2021-08-21' },
    ]

    const events = [
        {
            title: 'Meeting 1',
            start: '2021-08-08 08:00:00',
            end: '2021-08-08 12:00:00',
        },
        {
            title: 'Meeting 2',
            start: '2021-08-12 08:00:00',
            end: '2021-08-12 12:00:00',
        },
        {
            title: 'Meeting 3',
            start: '2021-08-16 08:00:00',
            end: '2021-08-16 12:00:00',
        },
        {
            title: 'Meeting 4',
            start: '2021-08-20 08:00:00',
            end: '2021-08-20 12:00:00',
        },
    ]

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
                <Card className="shadow-sm">
                    <CardBody>
                        <Row>
                            <Col xs="12" className="d-flex justify-content-between">
                                <h2 className="font-weight-bold mb-4">{user.name} <small className="text-muted">{user.registrantInformation?.firstName} {user.registrantInformation?.lastName}</small></h2>
                                <div>
                                    <Link to='/project/create'>
                                        <Button color="primary">
                                            Create Project
                                        </Button>
                                    </Link>
                                </div>
                            </Col>
                            <Col xs="12">
                                <ProjectStatus data={data?.projectList} mutate={mutate} />
                            </Col>
                            <Col xs="12">
                                <ProjectStatistics data={dummyProjects} />
                            </Col>
                            <Col xs="12" lg="5">
                                <MyCalendar events={events} />
                            </Col>
                            <Col xs="12" lg="7">
                                <Trends />
                            </Col>
                            <Col xs="12">
                                <Finance />
                            </Col>
                            <Col xs="12">
                                <Projects data={dummyProjects} activities={dummyActivities} />
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    )
}

const ProjectStatus = ({ data, mutate }) => {
    const [modalReopen, setModalReopen] = useState(null);

    const handleReopen = () => {
        request.put(`v1/project/${modalReopen}/reopen`, {
            isReopen: true
        })
            .then(res => {
                toast.success('Reopen Successfully')
                mutate()
            })
            .catch(err => {
                toast.error('Reopen Failed');
            })
            .finally(() => setModalReopen(!modalReopen))
    }

    return (
        <Card className="shadow-sm">
            <CardBody>
                <Row>
                    <Col xs="12" className="my-1 text-center">
                        <h4>Project Status</h4>
                    </Col>
                    <Col xs="12" className="d-flex my-1">
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText className="bg-transparent border-0 px-0">
                                    <CustomInput type="checkbox" id="dueDateCheckbox" />
                                </InputGroupText>
                            </InputGroupAddon>
                            <div className="d-flex bg-transparent p-1 align-items-center">
                                Open
                            </div>
                        </InputGroup>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText className="bg-transparent border-0 px-0">
                                    <CustomInput type="checkbox" id="dueDateCheckbox" />
                                </InputGroupText>
                            </InputGroupAddon>
                            <div className="d-flex bg-transparent p-1 align-items-center">
                                Under Review
                            </div>
                        </InputGroup>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText className="bg-transparent border-0 px-0">
                                    <CustomInput type="checkbox" id="dueDateCheckbox" />
                                </InputGroupText>
                            </InputGroupAddon>
                            <div className="d-flex bg-transparent p-1 align-items-center">
                                Expired
                            </div>
                        </InputGroup>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText className="bg-transparent border-0 px-0">
                                    <CustomInput type="checkbox" id="dueDateCheckbox" />
                                </InputGroupText>
                            </InputGroupAddon>
                            <div className="d-flex bg-transparent p-1 align-items-center">
                                On going
                            </div>
                        </InputGroup>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText className="bg-transparent border-0 px-0">
                                    <CustomInput type="checkbox" id="dueDateCheckbox" />
                                </InputGroupText>
                            </InputGroupAddon>
                            <div className="d-flex bg-transparent p-1 align-items-center">
                                Complete
                            </div>
                        </InputGroup>
                    </Col>
                    <Col xs="12" className="my-1">
                        <Table hover className="text-center">
                            <thead>
                                <tr>
                                    <th>Project Name</th>
                                    <th>Professional Name</th>
                                    <th>Closing Date</th>
                                    <th>Completion Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.map((p, i) =>
                                    <tr key={i}>
                                        <td>
                                            <Link to={`${p.projectStatus === 'on_going' ? `/project/${p.idProject}/wall` : `/project/${p.idProject}/professionals`}`}>
                                                {p.projectName}
                                            </Link>
                                        </td>
                                        <td>
                                            {p.professionalList.length > 0 ?
                                                <Link to={`/professional/${p.professionalList[0].idProfessionalUserMeta}`}>
                                                    {p.professionalList[0].firstName} {p.professionalList[0].lastName}
                                                </Link>
                                                : '-'
                                            }
                                        </td>
                                        <td>{moment(p?.completeDate ?? '').format('DD-MM-YYYY')}</td>
                                        <td>{moment(p.completeDate).format('DD-MM-YYYY')}</td>
                                        <td className="text-uppercase">
                                            {p.projectStatus.replace('_', ' ')}
                                            {
                                                p.projectStatus === 'expired'
                                                    ? <Button color="pinion-primary" size="sm" block className="text-white mt-2" onClick={() => setModalReopen(p.idProject)}>Reopen</Button>
                                                    : null
                                            }
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Modal isOpen={modalReopen} centered toggle={() => setModalReopen(!modalReopen)}>
                    <ModalBody className="p-5">
                        <Row>
                            <Col xs="12">
                                <div className="mb-2">
                                    Are you sure you want to reopen this project?
                                </div>
                            </Col>
                            <Col xs="12" className="d-flex justify-content-end">
                                <Button color="secondary" className="mr-2" onClick={() => setModalReopen(!modalReopen)}>Cancel</Button>
                                <Button color="primary" className="text-capitalize" onClick={handleReopen}>Reopen</Button>
                            </Col>
                        </Row>
                    </ModalBody>
                </Modal>
            </CardBody>
        </Card>
    )
}

const ProjectStatistics = ({ data }) => {
    const applied = useMemo(() => data?.filter(d => d.status === 'Applied').length ?? 0, [data])
    const ongoing = useMemo(() => data?.filter(d => d.status === 'On-Going').length ?? 0, [data])
    const completed = useMemo(() => data?.filter(d => d.status === 'Completed').length ?? 0, [data])

    return (
        <Card className="shadow-sm mt-3">
            <CardBody>
                <Row>
                    <Col xs="12" className="my-1 text-center">
                        <h4>Project Statistics</h4>
                    </Col>
                    <Col xs="12" className="d-flex my-1 justify-content-center">
                        <Row>
                            <Col xs="12" md="4">
                                <p style={{ whiteSpace: 'nowrap' }}>Number of applied projects</p>
                                <div className="d-flex justify-content-center" style={{ fontSize: '50pt' }}><Badge color="secondary" className="d-flex justify-content-center" style={{ width: 80, height: 80 }}>{applied}</Badge></div>
                            </Col>
                            <Col xs="12" md="4">
                                <p style={{ whiteSpace: 'nowrap' }}>Number of active projects</p>
                                <div className="d-flex justify-content-center" style={{ fontSize: '50pt' }}><Badge color="secondary" className="d-flex justify-content-center" style={{ width: 80, height: 80 }}>{ongoing}</Badge></div>
                            </Col>
                            <Col xs="12" md="4">
                                <p style={{ whiteSpace: 'nowrap' }}>Number of completed projects</p>
                                <div className="d-flex justify-content-center" style={{ fontSize: '50pt' }}><Badge color="secondary" className="d-flex justify-content-center" style={{ width: 80, height: 80 }}>{completed}</Badge></div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
}

const MyCalendar = ({ events }) => {
    return (
        <Card className="shadow-sm mt-3 text-center">
            <CardBody style={{ height: '60vh' }}>
                <Row>
                    <Col xs="12">
                        <h4 className="mb-4">My Calendar</h4>
                        <Calendar
                            popup={true}
                            localizer={localizer}
                            defaultDate={new Date()}
                            messages={{
                                previous: <i className="fa fa-angle-left"></i>,
                                next: <i className="fa fa-angle-right"></i>,
                            }}
                            defaultView="month"
                            views={["month", 'agenda']}
                            events={events}
                            style={{ height: "50vh" }}
                        // onSelectEvent={event => this.modalDetailEvent(event)}
                        // onRangeChange={this.onRangeChange}
                        // eventPropGetter={(this.eventStyleGetter)}
                        />
                    </Col>
                    {/* <Col xs="12" className="my-2">
                        <h4 className="mt-3">My Activites</h4>
                        <Calendar
                            popup={true}
                            localizer={localizer}
                            defaultDate={new Date()}
                            messages={{
                                today: t("hariini"),
                                previous: <i className="fa fa-angle-left"></i>,
                                next: <i className="fa fa-angle-right"></i>,
                                month: t("bulanan"),
                                week: t("mingguan"),
                                day: t("harian"),
                            }}
                            defaultView="agenda"
                            views={['agenda']}
                            events={events}
                            style={{ minHeight: "50vh" }}
                        // onSelectEvent={event => this.modalDetailEvent(event)}
                        // onRangeChange={this.onRangeChange}
                        // eventPropGetter={(this.eventStyleGetter)}
                        />
                    </Col> */}
                </Row>
            </CardBody>
        </Card>
    )
}

const Trends = () => {
    const dataSkills = {
        labels: ['Skill 1', 'Skill 2', 'Skill 3', 'Skill 4', 'Skill 5', 'Skill 6'],
        datasets: [
            {
                label: 'Skills',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(153, 102, 255, 0.7)',
                    'rgba(255, 159, 64, 0.7)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const dataSectors = {
        labels: ['Sector 1', 'Sector 2', 'Sector 3', 'Sector 4', 'Sector 5', 'Sector 6'],
        datasets: [
            {
                label: 'Sectors',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(153, 102, 255, 0.7)',
                    'rgba(255, 159, 64, 0.7)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <Card className="shadow-sm mt-3 text-center">
            <CardBody style={{ height: '60vh' }}>
                <Row>
                    <Col xs="12">
                        <h4 className="mb-4">Trends</h4>
                    </Col>
                    <Col xs="12">
                        <Row>
                            <Col xs="4" className="px-0 h-100px">
                                <h6>My load this week</h6>
                                <div className="mt-4 px-4">
                                    <Progress color='#555' value={60}>
                                        <b style={{ color: "#555" }}>{60}%</b>
                                    </Progress>
                                </div>
                            </Col>
                            <Col xs="4" className="px-0">
                                <h6>Average Time per Project</h6>
                                <div style={{ fontSize: '30pt' }}>2 hrs</div>
                                <small className="text-muted">Total 10 hours</small>
                            </Col>
                            <Col xs="4" className="px-0">
                                <h6>Bid Success Rate</h6>
                                <div style={{ fontSize: '30pt' }}>20%</div>
                                <small className="text-muted">5/25 projects</small>
                            </Col>
                            <Col xs="6" className="mt-5">
                                <div>Skills</div>
                                <div>
                                    <Bar data={dataSkills} options={{
                                        maintainAspectRatio: false,
                                        legend: false,
                                        tooltips: {
                                            mode: "label",
                                        },
                                        responsive: true,
                                        responsiveAnimationDuration: 2000,
                                        hover: {
                                            intersect: true,
                                            mode: "point",
                                        },
                                        onHover: (event, chartElement) => {
                                            event.target.style.cursor = chartElement[0]
                                                ? "pointer"
                                                : "default";
                                        },
                                    }} height={250} />
                                </div>
                            </Col>
                            <Col xs="6" className="mt-5">
                                <div>Sectors</div>
                                <div>
                                    <Bar data={dataSectors} options={{
                                        maintainAspectRatio: false,
                                        legend: false,
                                        tooltips: {
                                            mode: "label",
                                        },
                                        responsive: true,
                                        responsiveAnimationDuration: 2000,
                                        hover: {
                                            intersect: true,
                                            mode: "point",
                                        },
                                        onHover: (event, chartElement) => {
                                            event.target.style.cursor = chartElement[0]
                                                ? "pointer"
                                                : "default";
                                        },
                                    }} height={250} />
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
}

const Finance = () => {
    return (
        <Card className="shadow-sm mt-3 text-center">
            <CardBody>
                <Row>
                    <Col xs="12">
                        <h3 className="mb-4">Finance</h3>
                    </Col>
                    <Col xs="12" lg="4">
                        <small>Total AR</small>
                        <div style={{ fontSize: '30pt', fontWeight: 'bold' }}>1.000.000</div>
                    </Col>
                    <Col xs="12" lg="4">
                        <small>Total AR this month</small>
                        <div style={{ fontSize: '30pt', fontWeight: 'bold' }}>500.000</div>
                    </Col>
                    <Col xs="12" lg="4">
                        <small>Outstanding AR this month</small>
                        <div style={{ fontSize: '30pt', fontWeight: 'bold' }}>250.000</div>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
}

const Projects = ({ data, activities }) => {

    const dataStats = {
        labels: ['Project 1', 'Project 2', 'Project 3', 'Project 4', 'Project 5', 'Project 6'],
        datasets: [
            {
                label: 'Projects',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(153, 102, 255, 0.7)',
                    'rgba(255, 159, 64, 0.7)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    return (
        <Card className="shadow-sm mt-3">
            <CardBody>
                <Row>
                    <Col xs="12">
                        <h3 className="mb-4">Projects</h3>
                    </Col>
                    <Col xs="12" lg="4">
                        <Row className="my-2">
                            <Col xs="5">
                                <div>Overall</div>
                            </Col>
                            <Col xs="7">
                                <Progress color='#555' value={60}>
                                    <b style={{ color: "#555" }}>{60}%</b>
                                </Progress>
                            </Col>
                        </Row>
                        {data.map((d, i) => (
                            <Row key={i} className="my-2">
                                <Col xs="5">
                                    <div>{d.projectName}</div>
                                </Col>
                                <Col xs="7">
                                    <Progress color='#555' value={d.progress}>
                                        <b style={{ color: "#555" }}>{d.progress}%</b>
                                    </Progress>
                                </Col>
                            </Row>
                        ))}
                    </Col>
                    <Col xs="12" lg="8">
                        <div>
                            <Bar data={dataStats} options={{
                                maintainAspectRatio: false,
                                legend: false,
                                tooltips: {
                                    mode: "label",
                                },
                                responsive: true,
                                responsiveAnimationDuration: 2000,
                                hover: {
                                    intersect: true,
                                    mode: "point",
                                },
                                onHover: (event, chartElement) => {
                                    event.target.style.cursor = chartElement[0]
                                        ? "pointer"
                                        : "default";
                                },
                            }} height={250} />
                        </div>
                    </Col>
                    <Col xs="12" className="mt-3">
                        <Row>
                            <Col xs="12" lg="4">
                                <Row>
                                    <Col xs="6" className="d-flex align-items-center">
                                        <div>Show for upcoming</div>
                                    </Col>
                                    <Col xs="6">
                                        <InputGroup>
                                            <Input min={0} max={100} type="number" step="1" />
                                            <InputGroupAddon addonType="append">days</InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                </Row>
                                <Row className="mt-3">
                                    <Col xs="6">
                                        <div>Category Filter</div>
                                    </Col>
                                    <Col xs="6">
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText className="bg-transparent border-0 px-0">
                                                    <CustomInput type="checkbox" id="dueDateCheckbox" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <div className="d-flex bg-transparent p-1 align-items-center">
                                                Deliverable
                                            </div>
                                        </InputGroup>
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText className="bg-transparent border-0 px-0">
                                                    <CustomInput type="checkbox" id="dueDateCheckbox" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <div className="d-flex bg-transparent p-1 align-items-center">
                                                A/R & A/P
                                            </div>
                                        </InputGroup>
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText className="bg-transparent border-0 px-0">
                                                    <CustomInput type="checkbox" id="dueDateCheckbox" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <div className="d-flex bg-transparent p-1 align-items-center">
                                                Meeting
                                            </div>
                                        </InputGroup>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs="12" lg="8">
                                <Table hover>
                                    <thead>
                                        <tr>
                                            <th>Project</th>
                                            <th>Category</th>
                                            <th>Action</th>
                                            <th>Due Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {activities.map((p, i) =>
                                            <tr key={i}>
                                                <td>{p.projectName}</td>
                                                <td>{p.category}</td>
                                                <td>{p.action}</td>
                                                <td>{p.dueDate}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
}

export default ClientDashboard