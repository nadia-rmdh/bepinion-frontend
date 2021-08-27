import React, { useMemo } from 'react'
import { Col, Row, Card, CardBody, Badge } from 'reactstrap'
import moment from 'moment'
import { useFilterProjectContext } from './ProjectContext';
import CompletionDateFilter from './Filters/CompletionDateFilter';
import ExperienceFilter from './Filters/ExperienceFilter';
import SectorsFilter from './Filters/SectorsFilter';
import SkillsFilter from './Filters/SkillsFilter';
import ClosingDateSort from './Sorts/ClosingDateSort';
import DurationSort from './Sorts/DurationSort';
import BudgetarySort from './Sorts/BudgetarySort';
import SkillMatchSort from './Sorts/SkillMatchSort';
import { convertToRupiah } from '../../../utils/formatter';
import { Link } from 'react-router-dom';
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

function Project() {
    const [filter,] = useFilterProjectContext()

    const { data: getProjects, error: errorProjects, mutate: mutateProjects } = useSWR(() => `v1/project`);
    const loading = !getProjects && !errorProjects;
    const projects = useMemo(() => {
        return getProjects?.data?.data ?? [];
    }, [getProjects]);

    console.log(projects)
    // const filteredData = useMemo(() => {
    //     let data = projects;
    //     if (filter) {
    //         data = data
    //             .filter((item) => {
    //                 if (!filter.skills.length > 0) return true;
    //                 let contain = false
    //                 for (var i = 0; i < filter.skills.length; i++) {
    //                     if (item.skills.includes(filter.skills[i].value) === true) {
    //                         contain = true;
    //                         break;
    //                     }
    //                 }
    //                 return contain;
    //             })
    //             .filter((item) => {
    //                 if (!filter.sectors.length > 0) return true;
    //                 let contain = false
    //                 for (var i = 0; i < filter.sectors.length; i++) {
    //                     if (item.sector.id.includes(filter.sectors[i].value) === true) {
    //                         contain = true;
    //                         break;
    //                     }
    //                 }
    //                 return contain;
    //             })
    //             .filter((item) => {
    //                 if (filter.date) {
    //                     const today = moment();
    //                     const nextWeek = moment().add(1, 'week');
    //                     const nextMonth = moment().add(1, 'month');

    //                     if (filter.date === 'thisWeek') {
    //                         return moment(item.completionDate).isBetween(today.startOf('week').format('YYYY-MM-DD'), today.endOf('week').format('YYYY-MM-DD'))
    //                     }

    //                     if (filter.date === 'nextWeek') {
    //                         return moment(item.completionDate).isBetween(nextWeek.startOf('week').format('YYYY-MM-DD'), nextWeek.endOf('week').format('YYYY-MM-DD'))
    //                     }

    //                     if (filter.date === 'thisMonth') {
    //                         return moment(item.completionDate).isBetween(today.startOf('month').format('YYYY-MM-DD'), today.endOf('month').format('YYYY-MM-DD'))
    //                     }

    //                     if (filter.date === 'nextMonth') {
    //                         return moment(item.completionDate).isBetween(nextMonth.startOf('month').format('YYYY-MM-DD'), nextMonth.endOf('month').format('YYYY-MM-DD'))
    //                     }
    //                 }
    //                 return true
    //             }
    //             )
    //     }
    //     return data;
    // }, [filter, projects]);

    return (
        <Row className="mt-md-3 mt-lg-n2">
            <Col xs="12" lg="3">
                <Card className="shadow-sm">
                    <CardBody>
                        <Row>
                            <Col xs="12" className="my-2">
                                <h5 className="font-weight-bold mb-4 text-center">FILTER</h5>
                            </Col>
                            <Col xs="12" className="my-2">
                                <SectorsFilter />
                            </Col>
                            <Col xs="12" className="my-2">
                                <CompletionDateFilter />
                            </Col>
                            <Col xs="12" className="my-2">
                                <ExperienceFilter />
                            </Col>
                            <Col xs="12" className="my-2">
                                <SkillsFilter />
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
            <Col xs="12" lg="9">
                <Row className="mb-4">
                    <Col xs="3">
                        <ClosingDateSort />
                    </Col>
                    <Col xs="3">
                        <DurationSort />
                    </Col>
                    <Col xs="3">
                        <BudgetarySort />
                    </Col>
                    <Col xs="3">
                        <SkillMatchSort />
                    </Col>
                </Row>

                <Row className="mb-2">
                    <Col xs="12">
                        {projects?.records?.map((p, i) => (
                            <Card key={i} className="shadow-sm">
                                <CardBody>
                                    <Row>
                                        <Col xs="9">
                                            <Row>
                                                <Col xs="12">
                                                    <Link to={`/project/${p.id}`} className="text-dark">
                                                        <h4>{p.name}</h4>
                                                    </Link>
                                                </Col>
                                                <Col xs="12" className="d-flex justify-content-between">
                                                    <Link to={`/client/${i + 1}`} className="text-dark">
                                                        <p>{p.projectOwnerName}</p>
                                                    </Link>
                                                    <p>{p.numberOfAplicants} Application</p>
                                                </Col>
                                                <Col xs="6">
                                                    <span className="text-muted">Completion Date</span>
                                                    <p> {moment(p.completeDate).format('DD MMMM YYYY')}</p>
                                                </Col>
                                                <Col xs="6">
                                                    <span className="text-muted">Duration</span>
                                                    <p>{p.duration} hours</p>
                                                </Col>
                                                <Col xs="6">
                                                    <span className="text-muted">Sector</span>
                                                    <p>{p.sector}</p>
                                                </Col>
                                                <Col xs="6">
                                                    <span className="text-muted">Budget</span>
                                                    <p>{convertToRupiah(p.budget)}</p>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col xs="3">
                                            {p.projectRequirementSkill.map((s, i) => (
                                                <Badge key={i} color={colorSkills[i]} className="w-100 text-uppercase font-sm my-1 text-light">{s.name}</Badge>
                                            ))}
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        ))}
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default Project