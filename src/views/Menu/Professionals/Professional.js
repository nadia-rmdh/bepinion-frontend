import React, { useMemo } from 'react'
import { Col, Row, Card, CardBody, Badge } from 'reactstrap'
import { useFilterProfessionalContext } from './ProfessionalContext';
import SectorsFilter from './Filters/SectorsFilter';
import ExperienceFilter from './Filters/ExperienceFilter';
import SkillsFilter from './Filters/SkillsFilter';
import { DefaultImageUser } from '../../../components/DefaultImageUser/DefaultImageUser';
import YearExperienceSort from './Sorts/YearExperienceSort';
import ProfessionalsDummy from '../../DataDummy/ProfessionalsDummy'

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

    const filteredData = useMemo(() => {
        let data = ProfessionalsDummy;
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
        }
        return data;
    }, [filter]);

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
                    {filteredData.map((p, i) => (
                        <Col xs="6" key={i}>
                            <Card className="shadow-sm">
                                <CardBody>
                                    <Row>
                                        <Col xs="12">
                                            <Row>
                                                <Col xs="4" className="d-flex justify-content-center align-items-center">
                                                    <DefaultImageUser text={p.professionalName} size={90} />
                                                </Col>
                                                <Col xs="8">
                                                    <Row>
                                                        <Col xs="12">
                                                            <h4>{p.professionalName}</h4>
                                                        </Col>
                                                        <Col xs="12">
                                                            <p>{p.experience} year</p>
                                                        </Col>
                                                        <Col xs="12">
                                                            <p>Sector {p.sector.name}</p>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col xs="12">
                                            {p.skills.map((s, i) => (
                                                <Badge key={i} color={colorSkills[i]} className="text-uppercase mx-1 font-sm text-light">{s}</Badge>
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