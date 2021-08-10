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

    const dummyProjects = [
        { projectName: 'Project 1', clientName: 'Client A', completionDate: '2021-08-10', sector: { id: 'sector_1', name: 'Sector 1' }, duration: 3, budget: 15000000, skillMatched: 5, skills: ['php', 'phyton', 'javascript', 'flutter', 'golang', 'reactnative'] },
        { projectName: 'Project 2', clientName: 'Client B', completionDate: '2021-08-15', sector: { id: 'sector_3', name: 'Sector 3' }, duration: 6, budget: 34000000, skillMatched: 2, skills: ['php', 'phyton', 'javascript', 'reactjs', 'nodejs', 'reactnative'] },
        { projectName: 'Project 3', clientName: 'Client C', completionDate: '2021-08-21', sector: { id: 'sector_2', name: 'Sector 2' }, duration: 9, budget: 56000000, skillMatched: 1, skills: ['php', 'phyton', 'javascript', 'flutter', 'golang', 'laravel'] },
        { projectName: 'Project 5', clientName: 'Client D', completionDate: '2021-09-05', sector: { id: 'sector_2', name: 'Sector 2' }, duration: 11, budget: 23000000, skillMatched: 4, skills: ['nodejs', 'reactnative'] },
        { projectName: 'Project 6', clientName: 'Client D', completionDate: '2021-09-05', sector: { id: 'sector_2', name: 'Sector 2' }, duration: 11, budget: 23000000, skillMatched: 4, skills: ['nodejs', 'reactnative'] },
        { projectName: 'Project 7', clientName: 'Client D', completionDate: '2021-09-05', sector: { id: 'sector_2', name: 'Sector 2' }, duration: 11, budget: 23000000, skillMatched: 4, skills: ['nodejs', 'reactnative'] },
        { projectName: 'Project 8', clientName: 'Client D', completionDate: '2021-09-05', sector: { id: 'sector_2', name: 'Sector 2' }, duration: 11, budget: 23000000, skillMatched: 4, skills: ['nodejs', 'reactnative'] },
        { projectName: 'Project 9', clientName: 'Client D', completionDate: '2021-09-05', sector: { id: 'sector_2', name: 'Sector 2' }, duration: 11, budget: 23000000, skillMatched: 4, skills: ['nodejs', 'reactnative'] },
        { projectName: 'Project 10', clientName: 'Client D', completionDate: '2021-09-05', sector: { id: 'sector_2', name: 'Sector 2' }, duration: 11, budget: 23000000, skillMatched: 4, skills: ['nodejs', 'reactnative'] },
        { projectName: 'Project 11', clientName: 'Client D', completionDate: '2021-09-05', sector: { id: 'sector_2', name: 'Sector 2' }, duration: 11, budget: 23000000, skillMatched: 4, skills: ['nodejs', 'reactnative'] },
    ]

    const filteredData = useMemo(() => {
        let data = dummyProjects;
        if (filter) {
            data = data
                .filter((item) => {
                    if (!filter.skills.length > 0) return true;
                    let contain = false
                    for (var i = 0; i < filter.skills.length; i++) {
                        if (item.skills.includes(filter.skills[i].value) === true) {
                            contain = true;
                            break;
                        }
                    }
                    return contain;
                })
                .filter((item) => {
                    if (!filter.sectors.length > 0) return true;
                    let contain = false
                    for (var i = 0; i < filter.sectors.length; i++) {
                        if (item.sector.id.includes(filter.sectors[i].value) === true) {
                            contain = true;
                            break;
                        }
                    }
                    return contain;
                })
                .filter((item) => {
                    if (filter.date) {
                        const today = moment();
                        const nextWeek = moment().add(1, 'week');
                        const nextMonth = moment().add(1, 'month');

                        if (filter.date === 'thisWeek') {
                            return moment(item.completionDate).isBetween(today.startOf('week').format('YYYY-MM-DD'), today.endOf('week').format('YYYY-MM-DD'))
                        }

                        if (filter.date === 'nextWeek') {
                            return moment(item.completionDate).isBetween(nextWeek.startOf('week').format('YYYY-MM-DD'), nextWeek.endOf('week').format('YYYY-MM-DD'))
                        }

                        if (filter.date === 'thisMonth') {
                            return moment(item.completionDate).isBetween(today.startOf('month').format('YYYY-MM-DD'), today.endOf('month').format('YYYY-MM-DD'))
                        }

                        if (filter.date === 'nextMonth') {
                            return moment(item.completionDate).isBetween(nextMonth.startOf('month').format('YYYY-MM-DD'), nextMonth.endOf('month').format('YYYY-MM-DD'))
                        }
                    }
                    return true
                }
                )
        }
        return data;
    }, [filter, dummyProjects]);

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
                        {filteredData.map((p, i) => (
                            <Card key={i} className="shadow-sm">
                                <CardBody>
                                    <Row>
                                        <Col xs="9">
                                            <Row>
                                                <Col xs="12">
                                                    <h4>{p.projectName}</h4>
                                                </Col>
                                                <Col xs="12" className="d-flex justify-content-between">
                                                    <p>{p.clientName}</p>
                                                    <p>{i + 1} Application</p>
                                                </Col>
                                                <Col xs="6">
                                                    <p>Completion Date : {p.completionDate}</p>
                                                </Col>
                                                <Col xs="6">
                                                    <p>Duration : {p.duration} hours</p>
                                                </Col>
                                                <Col xs="6">
                                                    <p>Sector : {p.sector.name}</p>
                                                </Col>
                                                <Col xs="6">
                                                    <p>Budget : {convertToRupiah(p.budget)}</p>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col xs="3">
                                            {p.skills.map((s, i) => (
                                                <Badge key={i} color={colorSkills[i]} className="w-100 text-uppercase font-sm my-1 text-light">{s}</Badge>
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