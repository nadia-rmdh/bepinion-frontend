import React, { useMemo } from 'react'
import { Col, Row, Card, CardBody, Badge } from 'reactstrap'
import { useFilterProfessionalContext } from './ProfessionalContext';
import SectorsFilter from './Filters/SectorsFilter';
import ExperienceFilter from './Filters/ExperienceFilter';
import SkillsFilter from './Filters/SkillsFilter';
import { DefaultImageUser } from '../../../components/DefaultImageUser/DefaultImageUser';
import YearExperienceSort from './Sorts/YearExperienceSort';
import ProfessionalsDummy from '../../DataDummy/ProfessionalsDummy'
import useSWR from 'swr';
import { Link } from 'react-router-dom';

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

function Professional() {
    const [filter,] = useFilterProfessionalContext()

    const { data: getProfessionals, error: errorProfessionals, mutate: mutateProfessionals } = useSWR(() => `v1/professional`);
    const loading = !getProfessionals && !errorProfessionals;
    const professionals = useMemo(() => {
        return getProfessionals?.data?.data ?? [];
    }, [getProfessionals]);

    console.log(professionals)
    // const filteredData = useMemo(() => {
    //     let data = ProfessionalsDummy;
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
    //     }
    //     return data;
    // }, [filter]);

    if (loading) {
        return (
            <div>Loading...</div>
        )
    }
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
                    <Col xs="4">
                        <YearExperienceSort />
                    </Col>
                </Row>
                <Row className="mb-2">
                    {professionals?.records?.map((p, i) => (
                        <Col xs="6" key={i}>
                            <Card className="shadow-sm">
                                <CardBody>
                                    <Row>
                                        <Col xs="12">
                                            <Row>
                                                <Col xs="4" className="d-flex justify-content-center align-items-center">
                                                    <DefaultImageUser text={p.firstName} size={90} />
                                                </Col>
                                                <Col xs="8">
                                                    <Row>
                                                        <Col xs="12">
                                                            <Link to={`/professional/${p.id}`} className="text-dark">
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
                                                <Badge key={i} color={colorSkills[i]} className="text-uppercase mx-1 font-sm text-light">{s.name}</Badge>
                                            ))}
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Col>
        </Row>
    )
}

export default Professional