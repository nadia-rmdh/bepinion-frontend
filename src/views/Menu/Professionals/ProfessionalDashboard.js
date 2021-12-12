import React, { useCallback, useMemo, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { Col, Row, Card, CardBody, InputGroup, InputGroupAddon, InputGroupText, CustomInput, Table, Badge, Progress, Input, Spinner, Modal, ModalBody, UncontrolledTooltip } from 'reactstrap'
import moment from 'moment'
import { Bar } from 'react-chartjs-2';
import { useAuthUser } from '../../../store';
import useSWR from 'swr';
import { Link } from 'react-router-dom';
import { convertNumberCurrencies } from '../../../utils/formatter';
import DeliverableStatus from '../../../components/DeliverableStatus'
import StatusProject from '../../../components/StatusProject';

const localizer = momentLocalizer(moment);
function ProfessionalDashboard(props) {
    const user = useAuthUser()
    const { data: getData, error, } = useSWR(() => `v1/user/me/dashboard`);
    const loading = !getData || error
    const data = useMemo(() => {
        return getData?.data?.data ?? [];
    }, [getData]);


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
                            <Col xs="12">
                                <h2 className="font-weight-bold mb-4">{user.firstName} {user.lastName}</h2>
                            </Col>
                            <Col xs="12">
                                <ProjectStatus data={data} />
                            </Col>
                            <Col xs="12">
                                <ProjectStatistics data={data?.projectStatistics} />
                            </Col>
                            <Col xs="12" lg="5">
                                <MyCalendar events={data?.calenderDetails} />
                            </Col>
                            <Col xs="12" lg="7">
                                <Trends data={data?.trendDetails} />
                            </Col>
                            <Col xs="12">
                                <Finance data={data?.financeStatistics} />
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    )
}

const ProjectStatus = ({ data }) => {
    const [filter, setFilter] = useState([]);
    const handleChangeFilter = useCallback((e) => {
        const { value, checked } = e.target;
        if (checked) {
            setFilter(state => ([...state, value]))
        } else {
            setFilter(state => state.filter(d => d !== value))
        }
    }, [setFilter]);

    const filteredData = useMemo(() => {
        const filtered = filter.length > 0 ? data?.projectList?.filter(d => filter.includes(d.approvalStatus)) : data?.projectList;

        return filtered ?? [];
    }, [data, filter])
    return (
        <Card className="shadow-sm">
            <CardBody>
                <Row>
                    <Col xs="12" className="my-1 text-center">
                        <h4>Project Status</h4>
                    </Col>
                    <Col xs="6" md="4" lg="2">
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText className="bg-transparent border-0 px-0">
                                    <CustomInput type="checkbox" id="applied" value="applied" checked={filter.includes('applied')} onChange={handleChangeFilter} />
                                </InputGroupText>
                            </InputGroupAddon>
                            <div className="d-flex bg-transparent p-1 align-items-center">
                                Applied
                            </div>
                        </InputGroup>
                    </Col>
                    <Col xs="6" md="4" lg="2">
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText className="bg-transparent border-0 px-0">
                                    <CustomInput type="checkbox" id="under_review" value="under_review" checked={filter.includes('under_review')} onChange={handleChangeFilter} />
                                </InputGroupText>
                            </InputGroupAddon>
                            <div className="d-flex bg-transparent p-1 align-items-center">
                                Under Review
                            </div>
                        </InputGroup>
                    </Col>
                    <Col xs="6" md="4" lg="2">
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText className="bg-transparent border-0 px-0">
                                    <CustomInput type="checkbox" id="tnc_review" value="tnc_review" checked={filter.includes('tnc_review')} onChange={handleChangeFilter} />
                                </InputGroupText>
                            </InputGroupAddon>
                            <div className="d-flex bg-transparent p-1 align-items-center">
                                T&C Review
                            </div>
                        </InputGroup>
                    </Col>
                    <Col xs="6" md="4" lg="2">
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText className="bg-transparent border-0 px-0">
                                    <CustomInput type="checkbox" id="on_going" value="on_going" checked={filter.includes('on_going')} onChange={handleChangeFilter} />
                                </InputGroupText>
                            </InputGroupAddon>
                            <div className="d-flex bg-transparent p-1 align-items-center">
                                Ongoing
                            </div>
                        </InputGroup>
                    </Col>
                    <Col xs="6" md="4" lg="2">
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText className="bg-transparent border-0 px-0">
                                    <CustomInput type="checkbox" id="deliverable_approved" value="deliverable_approved" checked={filter.includes('deliverable_approved')} onChange={handleChangeFilter} />
                                </InputGroupText>
                            </InputGroupAddon>
                            <div className="d-flex bg-transparent p-1 align-items-center">
                                Approved
                            </div>
                        </InputGroup>
                    </Col>
                    <Col xs="6" md="4" lg="2">
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText className="bg-transparent border-0 px-0">
                                    <CustomInput type="checkbox" id="close" value="close" checked={filter.includes('close')} onChange={handleChangeFilter} />
                                </InputGroupText>
                            </InputGroupAddon>
                            <div className="d-flex bg-transparent p-1 align-items-center">
                                Closed
                            </div>
                        </InputGroup>
                    </Col>
                    <Col xs="12" className="my-1">
                        <Table hover responsive className="text-center">
                            <thead>
                                <tr>
                                    <th className="text-left">Project Name</th>
                                    <th>Client Name</th>
                                    <th>Completion Date</th>
                                    <th>Deliverable Status</th>
                                    <th>Project Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.length > 0
                                    ? filteredData.map((p, i) =>
                                        <tr key={i}>
                                            <td className="text-left">
                                                <Link to={`${['on_going', 'deliverable_approved'].includes(p.projectStatus)
                                                    ? `/project/${p.idProject}/wall`
                                                    : (['close'].includes(p.projectStatus)
                                                        ? (p.isAlreadyRated ? `/project/${p.idProject}/wall` : `/rate/${p.idProject}`)
                                                        : `/project/${p.idProject}`)}`}
                                                    className={`${p.isAlreadyRated ? 'text-dark' : (p.projectStatus === 'close' ? 'text-pinion-secondary' : 'text-dark')}`}
                                                >
                                                    {p.projectName}
                                                </Link>
                                            </td>
                                            <td>{p.clientName}</td>
                                            <td>{moment(p?.completeDate ?? '').format('DD-MM-YYYY')}</td>
                                            {/* <td>{['on_going', 'close', 'tnc_review', 'deliverable_approved'].includes(p.projectStatus) ? moment(p?.completeDate ?? '').format('DD-MM-YYYY') : '-'}</td> */}
                                            <td className="text-uppercase">{DeliverableStatus[p?.activityStatus] ?? '-'}</td>
                                            <td className="text-uppercase">{StatusProject[p?.projectStatus]}</td>
                                        </tr>
                                    )
                                    : <tr>
                                        <td colSpan="5" className="text-center text-muted">No Data</td>
                                    </tr>
                                }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </CardBody>
        </Card >
    )
}

const ProjectStatistics = ({ data }) => {
    return (
        <Card className="shadow-sm mt-3">
            <CardBody>
                <Row>
                    <Col xs="12" className="my-1 text-center">
                        <h4>Project Statistics</h4>
                    </Col>
                    <Col xs="12" className="d-flex my-1 justify-content-center text-center">
                        <Row>
                            <Col xs="12" md="4">
                                <p style={{ whiteSpace: 'nowrap' }}>Number of projects in tender</p>
                                <div className="d-flex justify-content-center" style={{ fontSize: '50pt' }}><Badge color="secondary" className="d-flex justify-content-center" style={{ width: 80, height: 80 }}>{data.applied}</Badge></div>
                            </Col>
                            <Col xs="12" md="4">
                                <p style={{ whiteSpace: 'nowrap' }}>Number of active projects</p>
                                <div className="d-flex justify-content-center" style={{ fontSize: '50pt' }}><Badge color="secondary" className="d-flex justify-content-center" style={{ width: 80, height: 80 }}>{data.onGoing}</Badge></div>
                            </Col>
                            <Col xs="12" md="4">
                                <p style={{ whiteSpace: 'nowrap' }}>Number of completed projects</p>
                                <div className="d-flex justify-content-center" style={{ fontSize: '50pt' }}><Badge color="secondary" className="d-flex justify-content-center" style={{ width: 80, height: 80 }}>{data.close}</Badge></div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
}

const MyCalendar = ({ events }) => {
    const [modalDetail, setModalDetail] = useState(null);

    const handleDetailEvent = (event) => {
        setModalDetail(event)
    }

    const tooltipsEvent = (e) => {
        return (
            <div>
                <div id={`${e.title.replace(' ', '')}-${e.event.project.id}`} className="title-calendar">{e.title}</div>
                <UncontrolledTooltip
                    placement="bottom"
                    target={`${e.title.replace(' ', '')}-${e.event.project.id}`}
                >
                    {e.title}
                </UncontrolledTooltip>
            </div>
        )
    }

    const agendaEvent = (e) => {
        return (
            <div>
                <small className="text-muted">{e.event.project.name}</small>
                <div className="text-dark">{e.title}</div>
            </div>
        )
    }

    return (
        <Card className="shadow-sm mt-3 text-center">
            <CardBody style={{ height: '60vh' }}>
                <Row>
                    <Col xs="12">
                        <h4 className="mb-4">My Calendar</h4>
                        {events
                            ? <Calendar
                                popup={true}
                                localizer={localizer}
                                defaultDate={new Date()}
                                messages={{
                                    previous: <i className="fa fa-angle-left"></i>,
                                    next: <i className="fa fa-angle-right"></i>,
                                }}
                                components={{
                                    event: tooltipsEvent,
                                    agenda: {
                                        event: agendaEvent,
                                    },
                                }}
                                defaultView="month"
                                views={["month", 'agenda']}
                                events={events}
                                style={{ height: "50vh" }}
                                onSelectEvent={event => handleDetailEvent(event)}
                            />
                            : <div
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
                        }
                    </Col>
                </Row>
                <Modal centered size="sm" isOpen={!!modalDetail} toggle={() => handleDetailEvent(null)}>
                    <ModalBody className="p-4 text-center">
                        <Row>
                            <Col xs="12" className="d-flex justify-content-end">
                                <button type="button" className="close" aria-label="Close" onClick={() => handleDetailEvent(null)}><span aria-hidden="true">×</span></button>
                            </Col>
                            <Col xs="12" className="mb-2">
                                <div className="text-muted">Activity</div>
                                <div className="font-weight-bold">{modalDetail?.title}</div>
                            </Col>
                            <Col xs="12" className="mb-2">
                                <div className="text-muted">Date</div>
                                <div className="font-weight-bold">{moment(modalDetail?.start).format('DD MMMM YYYY')}</div>
                            </Col>
                            <Col xs="12">
                                <div className="text-muted">Project</div>
                                <Link to={`/project/${modalDetail?.project?.id}/wall`} className="font-weight-bold">{modalDetail?.project?.name}</Link>
                            </Col>
                        </Row>
                    </ModalBody>
                </Modal>
            </CardBody>
        </Card>
    )
}

const Trends = ({ data }) => {
    const color = [
        'rgba(255, 99, 132, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(153, 102, 255, 0.7)',
        'rgba(255, 159, 64, 0.7)',
    ];

    const dataSkills = {
        labels: data.skillList.map(skill => skill.name),
        datasets: [
            {
                label: 'Skills',
                data: data.skillList.map(skill => skill.value),
                backgroundColor: data.skillList.map((skill, i) => color[i % data.skillList.length]),
                borderWidth: 1,
            },
        ],
    };

    const dataSectors = {
        labels: data.sectorList.map(sector => sector.name),
        datasets: [
            {
                label: 'Sectors',
                data: data.sectorList.map(sector => sector.value),
                backgroundColor: data.sectorList.map((sector, i) => color[i % data.sectorList.length]),
                borderWidth: 1,
            },
        ],
    };

    return (
        <Card className="shadow-sm mt-3 text-center">
            <CardBody style={{ minHeight: '60vh' }}>
                <Row>
                    <Col xs="12">
                        <h4 className="mb-4">Trends</h4>
                    </Col>
                    <Col xs="12">
                        <Row>
                            <Col xs="12" md="6" className="px-0 mb-3 mb-md-0">
                                <h6>Average Time per Project</h6>
                                <div style={{ fontSize: '30pt' }}>{data.totalDurationCloseProject ? (data.totalDurationCloseProject / data.totalClosedProject).toFixed(0) : 0} hrs</div>
                                <small className="text-muted">Total {data.totalDurationCloseProject} hours</small>
                            </Col>
                            <Col xs="12" md="6" className="px-0">
                                <h6>Bid Success Rate</h6>
                                <div style={{ fontSize: '30pt' }}>{data.bidSuccessRate?.toFixed(0)}%</div>
                                <small className="text-muted">{data.totalSuccessBid}/{data.totalBidProject} projects</small>
                            </Col>
                            <Col xs="12" md="12" className="mt-2">
                                <div>Skills</div>
                                <div>
                                    <Bar data={dataSkills} options={{
                                        maintainAspectRatio: false,
                                        legend: false,
                                        tooltips: {
                                            mode: "label",
                                        },
                                        scales: {
                                            xAxes: [{ display: false }],
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
                                    }} height={200} width={700} />
                                </div>
                            </Col>
                            <Col xs="12" md="12" className="mt-2">
                                <div>Sectors</div>
                                <div>
                                    <Bar data={dataSectors} options={{
                                        maintainAspectRatio: false,
                                        legend: false,
                                        tooltips: {
                                            mode: "label",
                                        },
                                        scales: {
                                            xAxes: [{ display: false }],
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
                                    }} height={200} />
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
}

const Finance = ({ data }) => {
    return (
        <Card className="shadow-sm mt-3 text-center">
            <CardBody>
                <Row>
                    <Col xs="12">
                        <h3 className="mb-4">Finance</h3>
                    </Col>
                    <Col xs="12" lg="4">
                        <small>Total project value</small>
                        <div style={{ fontSize: '30pt', fontWeight: 'bold' }}>{convertNumberCurrencies(data?.totalAR ?? 0)}</div>
                    </Col>
                    <Col xs="12" lg="4">
                        <small>Average value per project</small>
                        <div style={{ fontSize: '30pt', fontWeight: 'bold' }}>{convertNumberCurrencies(data?.averageAR ?? 0)}</div>
                    </Col>
                    <Col xs="12" lg="4">
                        <small>Estimated project value on tender</small>
                        <div style={{ fontSize: '30pt', fontWeight: 'bold' }}>{convertNumberCurrencies(data?.estimateAR ?? 0)}</div>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
}

// eslint-disable-next-line
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

export default ProfessionalDashboard