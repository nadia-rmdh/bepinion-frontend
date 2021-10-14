import React, { useCallback, useMemo } from 'react'
import { Col, Row, Card, CardBody, Badge, Spinner, Progress } from 'reactstrap'
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
import usePagination from "../../../hooks/usePagination";
import colorSkills from '../../DataDummy/SkillsColorsDummy'

function Project() {
    const [filter, setFilter] = useFilterProjectContext()
    const { data: getProjects, error: errorProjects, } = useSWR(() => `v1/project?${filter.limit ? `limit=${filter.limit}` : ''}${filter.date ? `&completeDate=${filter.date}` : ''}${filter.exp ? `&yearOfExperience=${filter.exp}` : ''}${filter.skills.length > 0 ? `&skillIds=${filter.skills.map(f => f.value).toString()}` : ''}${filter.sectors.length > 0 ? `&sectorIds=${filter.sectors.map(f => f.value).toString()}` : ''}${`&page=${filter.page + 1}`}`, { refreshInterval: 1800000 });

    const loading = !getProjects || errorProjects;
    const projects = useMemo(() => {
        return getProjects?.data?.data ?? [];
    }, [getProjects]);

    const handleChangeCurrentPage = useCallback(
        (page) => {
            setFilter((state) => ({ ...state, page: page }));
        },
        [setFilter]
    );

    const { PaginationComponent } = usePagination(
        projects?.pageSummary?.total,
        filter.page,
        projects?.pageSummary?.totalPages,
        handleChangeCurrentPage
    );

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
                        {loading ?
                            <div
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    right: 0,
                                    bottom: 0,
                                    left: 0,
                                    // background: "rgba(255,255,255, 0.5)",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Spinner style={{ width: 48, height: 48 }} />
                            </div>
                            :
                            projects?.records?.map((p, i) => (
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
                                                        <Link to={`/client/${p.projectOwnerId + 1}`} className="text-dark">
                                                            <p>{p.projectOwnerName}</p>
                                                        </Link>
                                                        {/* <p>{p.numberOfAplicants} Application</p> */}
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
                                                        <p>
                                                            {p.sectors.map((s, i) => `${s.sector.name}${p.sectors.length === i + 1 ? '' : ','} `)}
                                                        </p>
                                                    </Col>
                                                    <Col xs="6">
                                                        <span className="text-muted">Estimated Contract Value</span>
                                                        <p>{convertToRupiah(p.estimatedContractValue)}</p>
                                                    </Col>
                                                    <Col xs="12">
                                                        <Progress striped className="position-relative" value={(p.skillMatched / p.projectRequirementSkill) * 100} style={{ height: '2rem' }}>
                                                            <div className="position-absolute w-100 font-sm font-weight-bold text-dark text-center"> {p.skillMatched} skills matched</div>
                                                        </Progress>
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
                    <Col xs="12">
                        <PaginationComponent />
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default Project