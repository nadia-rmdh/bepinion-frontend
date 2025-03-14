import React, { useCallback, useMemo } from 'react'
import { Col, Row, Card, CardBody, Badge, Spinner } from 'reactstrap'
import { useFilterProfessionalContext } from './ProfessionalContext';
import SectorsFilter from './Filters/SectorsFilter';
import ExperienceFilter from './Filters/ExperienceFilter';
import SkillsFilter from './Filters/SkillsFilter';
import { DefaultImageUser } from '../../../components/DefaultImageUser/DefaultImageUser';
import YearExperienceSort from './Sorts/YearExperienceSort';
import useSWR from 'swr';
import { Link } from 'react-router-dom';
import usePagination from '../../../hooks/usePagination';
import ProjectsFilter from './Filters/ProjectsFilter';
import ColorSkill from '../../../components/ColorSkill';

function Professional() {
    const [filter, setFilter] = useFilterProfessionalContext()

    const { data: getProfessionals, error: errorProfessionals, } = useSWR(() => "v1/professional?" +
        (filter.limit ? `limit=${filter.limit}` : '') +
        (filter.project ? `&projectId=${filter.project.value}` : '') +
        (filter.exp ? `&yearOfExperience=${filter.exp}` : '') +
        (filter.skills.length > 0 ? `&skillIds=${filter.skills.map(f => f.value).toString()}` : '') +
        (filter.sectors.length > 0 ? `&sectorIds=${filter.sectors.map(f => f.value).toString()}` : '') +
        `&sort=${filter.sortExp.value}` +
        `&page=${filter.page + 1}`
        , { refreshInterval: 1800000 });
    const loading = !getProfessionals || errorProfessionals;
    const professionals = useMemo(() => {
        return getProfessionals?.data?.data ?? [];
    }, [getProfessionals]);

    const handleChangeCurrentPage = useCallback(
        (page) => {
            setFilter((state) => ({ ...state, page: page }));
        },
        [setFilter]
    );

    const { PaginationComponent } = usePagination(
        professionals?.pageSummary?.total,
        filter.page,
        professionals?.pageSummary?.totalPages,
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
                                <ProjectsFilter />
                            </Col>
                            <Col xs="12" className="my-2">
                                <SectorsFilter />
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
                    <Col xs="12" lg="4">
                        <YearExperienceSort />
                    </Col>
                </Row>
                <Row className="mb-2">
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
                        professionals?.records?.map((p, i) => (
                            <Col xs="12" md="6" key={i} className="mb-3">
                                <Card className="shadow-sm h-100">
                                    <CardBody>
                                        <Row>
                                            <Col xs="12">
                                                <Row>
                                                    <Col xs="4" className="d-flex justify-content-center align-items-center">
                                                        {p.avatar
                                                            ? <img src={p.avatar.replace('http://127.0.0.1:5000', 'https://bepinion.com')} alt="profile" width={100} height={100} style={{ objectFit: 'cover' }} className="rounded-circle border mb-3" />
                                                            : <DefaultImageUser text={`${p.firstName} ${p.lastName}`} role='p' size={90} />
                                                        }
                                                    </Col>
                                                    <Col xs="8">
                                                        <Row>
                                                            <Col xs="12">
                                                                <Link to={`/professional/${p.idProfessional}`} className="text-dark">
                                                                    <h4>{p.firstName} {p.lastName}</h4>
                                                                </Link>
                                                            </Col>
                                                            <Col xs="12">
                                                                <p>{p.yearOfExperience} year experience</p>
                                                            </Col>
                                                            <Col xs="12">
                                                                <p>
                                                                    <span className="text-muted">Sector</span>
                                                                    <br />
                                                                    {p.sectors.map((s, i) => `${s.name}${p.sectors.length === i + 1 ? '' : ','} `)}
                                                                </p>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col xs="12">
                                                {p.skills.map((s, i) => (
                                                    <Badge key={i} style={{ backgroundColor: ColorSkill[s.category] }} className="text-uppercase mx-1 font-sm text-light">{s.name}</Badge>
                                                ))}
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        ))}
                </Row>
            </Col>
            <Col xs="12">
                <PaginationComponent />
            </Col>
        </Row>
    )
}

export default Professional