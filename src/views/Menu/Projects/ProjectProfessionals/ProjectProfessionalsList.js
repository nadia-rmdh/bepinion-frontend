import React, { useCallback, useMemo, useState } from "react"
import { Card, CardBody, Row, Col, Button, ModalBody, Modal, Badge, Input, InputGroup, InputGroupAddon, InputGroupText, CardFooter, CustomInput } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from 'yup';
import skills from '../../../DataDummy/SkillsDummy'
import ProfessionalsDummy from '../../../DataDummy/ProfessionalsDummy'
import skillsColours from '../../../DataDummy/SkillsColorsDummy'
import FilterProjectProfessionalsProvider, { useFilterProjectProfessionalsContext } from "./ProjectProfessionalsContext";
import SkillsFilter from "./Filters/SkillsFilter";
import SectorsFilter from "./Filters/SectorsFilter";
import ExperienceFilter from "./Filters/ExperienceFilter";
import YearExperienceSort from "./Sorts/YearExperienceSort";
import { DefaultImageUser } from "../../../../components/DefaultImageUser/DefaultImageUser";
import CostSort from "./Sorts/CostSort";
import SkillMatchSort from "../Sorts/SkillMatchSort";
import ResetFilter from "./Filters/ResetFilter";
import { convertToRupiah } from "../../../../utils/formatter";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import usePagination from "../../../../hooks/usePagination";
import { Link } from "react-router-dom";

export default ({ data }) => {
    const [modalApply, setModalApply] = useState(false);

    const ValidationFormSchema = () => {
        return Yup.object().shape({
            cost: Yup.number().min(1, 'Min value 1.').label('Duration'),
        })
    }

    const { values, touched, errors, setValues, handleSubmit } = useFormik({
        initialValues: {
            cost: 0,
        },
        validationSchema: ValidationFormSchema,
        onSubmit: (values, { setSubmitting, setErrors }) => {
            setSubmitting(true)
        }
    })

    return (
        <FilterProjectProfessionalsProvider>
            <Row>
                <Col xs="12" md="6">
                    <Card className="shadow-sm">
                        <CardBody>
                            <Row>
                                <Col xs="12">
                                    <div className="font-xl font-weight-bold">Project Name</div>
                                </Col>
                                <Col xs="9">
                                    <div><span className="text-muted">Completion Date</span> DD MMMM YYYY</div>
                                    <div><span className="text-muted">Closing On</span> DD MMMM YYYY</div>
                                    <div><span className="text-muted">Sector</span> Sector A</div>
                                    <div><span className="text-muted">Duration</span> 12 Hours</div>
                                    <div><span className="text-muted">Years of experience</span> 1 Years</div>
                                    <div><span className="text-muted">Degree</span> Bachelor Degree</div>
                                    <div><span className="text-muted">Field</span> Mechanical Engineering</div>
                                </Col>
                                <Col xs="3">
                                    {skills.map((s, i) => (
                                        <Badge key={i} color={skillsColours[i]} className="w-100 text-uppercase font-sm my-1 text-light">{s.label}</Badge>
                                    ))}
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
                <Col xs="12" md="6">
                    <Card className="shadow-sm">
                        <CardBody>
                            <Row>
                                <Col xs="12">
                                    <div className="font-xl font-weight-bold">Statistics</div>
                                </Col>
                                <Col xs="12" className="d-flex my-1 justify-content-center">
                                    <Row className="text-center">
                                        <Col xs="12" md="4">
                                            <div className="d-flex justify-content-center" style={{ fontSize: '50pt' }}>10</div>
                                            <p style={{ whiteSpace: 'nowrap' }}>Number of applicant</p>
                                        </Col>
                                        <Col xs="12" md="4">
                                            <div className="d-flex justify-content-center" style={{ fontSize: '50pt' }}>500k</div>
                                            <p style={{ whiteSpace: 'nowrap' }}>Average Cost</p>
                                        </Col>
                                        <Col xs="12" md="4">
                                            <div className="d-flex justify-content-center" style={{ fontSize: '50pt' }}>50%</div>
                                            <p style={{ whiteSpace: 'nowrap' }}>Avarage Skills Match</p>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
                <Col xs="12">
                    <ProfessionalsList onClickAward={(data) => setModalApply(data)} />
                </Col>
                <Modal isOpen={modalApply} centered toggle={() => setModalApply(!modalApply)}>
                    <ModalBody className="p-5">
                        <Row>
                            <Col xs="12" className="mb-5">
                                <div className="mb-2">
                                    <div className="text-muted">Sector</div>
                                    <div>Sector A</div>
                                </div>
                                <div className="mb-2">
                                    <div className="text-muted">Duration</div>
                                    <div>12 Hours</div>
                                </div>
                                <div className="mb-2">
                                    <div className="text-muted">Completion Date</div>
                                    <div>DD MMMM YYYY</div>
                                </div>
                                <div className="mb-2">
                                    <div className="text-muted">Submited Cost</div>
                                    <div>
                                        {convertToRupiah(modalApply?.cost ?? 0)}
                                        {touched.cost && errors.cost && <small className="text-danger">{errors.cost}</small>}
                                    </div>
                                </div>
                            </Col>
                            <Col xs="12" className="d-flex justify-content-end">
                                <Button color="secondary" className="mr-2" onClick={() => setModalApply(!modalApply)}>Cancel</Button>
                                <Button color="primary" onClick={handleSubmit}>Apply</Button>
                            </Col>
                        </Row>
                    </ModalBody>
                </Modal>
            </Row>
        </FilterProjectProfessionalsProvider>
    );
}

const ProfessionalsList = ({ onClickAward }) => {
    const [filter, setFilter] = useFilterProjectProfessionalsContext()
    const [comparedData, setComparedData] = useState([])

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

    const handleChangeCurrentPage = useCallback(
        (page) => {
            setFilter((state) => ({ ...state, pagination: page }));
        },
        [setFilter]
    );

    const { data: resultsData, PaginationComponent } = usePagination(
        filteredData,
        5,
        filter.pagination,
        handleChangeCurrentPage
    );

    const handleCompareProfessionals = useCallback((e, p) => {
        const { value, checked } = e.target;

        if (checked) {
            setComparedData(state => [...state, { id: p.id, professionalName: p.professionalName, skillsMatch: p.skillsMatch, cost: p.cost, yearExperience: p.experience }])
        } else {
            setComparedData(state => state.filter(d => d.id !== p.id))
        }

    }, [])

    const handleClearOne = useCallback((p) => {
        setComparedData(state => state.filter(d => d.id !== p.id))
    }, [])

    const handleClearAll = useCallback((p) => {
        setComparedData([])
    }, [])

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
                                <SkillsFilter />
                            </Col>
                            <Col xs="12" className="my-2">
                                <SectorsFilter />
                            </Col>
                            <Col xs="12" className="my-2">
                                <ExperienceFilter />
                            </Col>
                            <Col xs="12" className="my-2">
                                <ResetFilter />
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
            <Col xs="12" lg="9">
                {comparedData.length > 0 &&
                    <ProfessionalsCompare data={comparedData} onClear={handleClearOne} />
                }
                <Row className="mb-4">
                    <Col xs="3">
                        <YearExperienceSort />
                    </Col>
                    <Col xs="3">
                        <CostSort />
                    </Col>
                    <Col xs="3">
                        <SkillMatchSort />
                    </Col>
                    <Col xs="3" className="d-flex align-items-center">
                        <Button color="danger" onClick={handleClearAll}>
                            Remove all ticked
                        </Button>
                    </Col>
                </Row>
                <Row className="mb-2">
                    {resultsData.map((p, i) => (
                        <Col xs="12" key={i}>
                            <Card className="shadow-sm">
                                <CardBody>
                                    <Row>
                                        <Col xs="9">
                                            <Row>
                                                <Col xs="4" className="d-flex justify-content-center align-items-center">
                                                    <DefaultImageUser text={p.professionalName} size={90} />
                                                </Col>
                                                <Col xs="8">
                                                    <Row>
                                                        <Col xs="12">
                                                            <Link to={`/professional/${p.id}`}>
                                                                <h4>{p.professionalName}</h4>
                                                            </Link>
                                                        </Col>
                                                        <Col xs="12">
                                                            <p>{p.education.field} in {p.education.degree}</p>
                                                        </Col>
                                                        <Col xs="12">
                                                            <p>{p.experience} year experience</p>
                                                        </Col>
                                                        <Col xs="12">
                                                            <p>{p.sector.name}</p>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col xs="3">
                                            {p.skills.map((s, i) => (
                                                <Badge key={i} color={skillsColours[i]} className="w-100 text-uppercase mx-1 font-sm text-light">{s}</Badge>
                                            ))}
                                        </Col>
                                    </Row>
                                </CardBody>
                                <CardFooter style={{ backgroundColor: '#fde2c1' }}>
                                    <Row>
                                        <Col xs="4" className="d-flex align-items-center">
                                            {convertToRupiah(p.cost)}
                                        </Col>
                                        <Col xs="4" className="d-flex align-items-center">
                                            Skills Match {p.skillsMatch}%
                                        </Col>
                                        <Col xs="4" className="d-flex justify-content-end">
                                            <div className="d-flex align-items-center">
                                                <CustomInput type="checkbox" id={p.id} value={p.id} checked={comparedData.find(c => c.id === p.id)} disabled={comparedData.length === 3 ? (comparedData.find(c => c.id === p.id) ? false : true) : false} onChange={(e) => handleCompareProfessionals(e, p)} />
                                                <div className="d-flex bg-transparent p-1 align-items-center">
                                                    Compare
                                                </div>
                                            </div>
                                            <Button color="primary" size="sm" className="ml-2" onClick={() => onClickAward(p)}>
                                                Award
                                            </Button>
                                        </Col>
                                    </Row>
                                </CardFooter>
                            </Card>
                        </Col>
                    ))}
                    <Col xs="12">
                        <PaginationComponent />
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

const ProfessionalsCompare = ({ data, onClear }) => {
    return (
        <Row className="mb-4">
            <Col xs="12">
                <Row className="text-center px-3">
                    <Col xs="3" className="p-0">
                        <div className="border font-weight-bold" style={{ backgroundColor: '#fde2c1', lineHeight: '25pt' }}>Comparing</div>
                        <div style={{ lineHeight: '25pt' }} className="border font-weight-bold">Skill Match</div>
                        <div style={{ lineHeight: '25pt' }} className="border font-weight-bold">Cost</div>
                        <div style={{ lineHeight: '25pt' }} className="border font-weight-bold">Years of experience</div>
                    </Col>
                    {data.map((p, i) => (
                        <Col xs="3" className="p-0" key={i}>
                            <div className="border font-weight-bold position-relative" style={{ backgroundColor: '#fde2c1', lineHeight: '25pt' }}>
                                {p.professionalName}
                                <Button size="sm" className="position-absolute" color="danger" style={{ top: '2px', right: '4px' }} onClick={() => onClear(p)}>
                                    <FontAwesomeIcon icon="times" size="sm" />
                                </Button>
                            </div>
                            <div style={{ lineHeight: '25pt' }} className="border">{p.skillsMatch}%</div>
                            <div style={{ lineHeight: '25pt' }} className="border">{convertToRupiah(p.cost)}</div>
                            <div style={{ lineHeight: '25pt' }} className="border">{p.yearExperience}</div>
                        </Col>
                    ))}
                </Row>
            </Col>
        </Row>
    )
}
