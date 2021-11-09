import React, { useCallback, useMemo, useState } from "react"
import { Card, CardBody, Row, Col, Button, ModalBody, Modal, Badge, CardFooter, CustomInput, Spinner } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from 'yup';
import skillsColours from '../../../DataDummy/SkillsColorsDummy'
import FilterProjectProfessionalsProvider, { useFilterProjectProfessionalsContext } from "./ProjectProfessionalsContext";
import SkillsFilter from "./Filters/SkillsFilter";
import SectorsFilter from "./Filters/SectorsFilter";
import ExperienceFilter from "./Filters/ExperienceFilter";
import YearExperienceSort from "./Sorts/YearExperienceSort";
import { DefaultImageUser } from "../../../../components/DefaultImageUser/DefaultImageUser";
import CostSort from "./Sorts/CostSort";
import SkillMatchSort from "../Sorts/SkillMatchSort";
import { convertNumberCurrencies, convertToRupiah } from "../../../../utils/formatter";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import usePagination from "../../../../hooks/usePagination";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import useSWR from "swr";
import moment from "moment";
import request from "../../../../utils/request";
import { toast } from "react-toastify";
import EducationFilter from "./Filters/EducationFilter";
import EducationFieldFilter from "./Filters/EducationFieldFilter";
import FeeFilter from "./Filters/FeeFilter";
import { useAuthUser } from "../../../../store";

export default () => {
    const history = useHistory();
    const matchRoute = useRouteMatch();
    const [modalApply, setModalApply] = useState(false);
    const { data: getData, error, mutate } = useSWR(() => `v1/project/${matchRoute.params.projectId}/selection`);
    const loading = !getData || error
    const data = useMemo(() => {
        return getData?.data?.data ?? [];
    }, [getData]);

    const ValidationFormSchema = () => {
        return Yup.object().shape({
            cost: Yup.number().min(1, 'Min value 1.').label('Duration'),
        })
    }

    const { setValues, handleSubmit, isSubmitting } = useFormik({
        initialValues: {
            professionalIds: modalApply?.id,
        },
        validationSchema: ValidationFormSchema,
        onSubmit: (values, { setSubmitting, setErrors }) => {
            setSubmitting(true)
            request.post(`v1/project/${matchRoute.params.projectId}/submit`, { professionalIds: [values.professionalIds] })
                .then(() => {
                    toast.success(`Successfully submitted`);
                    mutate()
                })
                .catch(() => {
                    toast.error(`Failed to submit`);
                })
                .finally(() => {
                    setSubmitting(false)
                    setModalApply(false)
                });
        }
    })
    if (loading) {
        if (error) history.push('/')
        return (
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
        )
    }

    return (
        <FilterProjectProfessionalsProvider>
            <Row>
                <Col xs="12" md="6">
                    <Card className="shadow-sm h-100">
                        <CardBody>
                            <Row>
                                <Col xs="12" className="d-flex justify-content-between mb-3">
                                    <div className="font-xl font-weight-bold">{data.name}</div>
                                </Col>
                                <Col xs="12">
                                    <div><span className="text-muted">Completion Date</span> {moment(data.completeDate).format('DD MMMM YYYY')}</div>
                                    <div><span className="text-muted">Closing Date</span> {moment(data.closingDate).format('DD MMMM YYYY')}</div>
                                    <div><span className="text-muted">Sector</span> {data.sectors.map((s, i) => `${s.sector.name}${data.sectors.length === i + 1 ? '' : ','} `)}</div>
                                    <div><span className="text-muted">Meeting Duration</span> {data.duration} hours</div>
                                    <div><span className="text-muted">Years of experience</span> {data.minYearExp} Years</div>
                                    {/* <div><span className="text-muted">Degree</span> {data.requirementEducationDegree}</div>
                                    <div><span className="text-muted">Field</span> {data.requirementEducationField}</div> */}
                                </Col>
                                <Col xs="12" className="mt-3">
                                    {data?.projectRequirementSkill?.map((s, i) => (
                                        <Badge key={i} color={skillsColours[i]} className="text-uppercase font-sm mb-1 mr-1 text-light">{s.name}</Badge>
                                    ))}
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
                <Col xs="12" md="6">
                    <Card className="shadow-sm h-100">
                        <CardBody className="d-flex justify-content-center align-items-center">
                            <Row>
                                <Col xs="12">
                                    <div className="font-xl font-weight-bold">Statistics</div>
                                </Col>
                                <Col xs="12" className="d-flex my-1 justify-content-center">
                                    <Row className="text-center">
                                        <Col xs="12" md="4">
                                            <div className="d-flex justify-content-center" style={{ fontSize: '40pt' }}>{data.numberOfAplicants ?? 0}</div>
                                            <p style={{ whiteSpace: 'nowrap' }}>Number of applicant</p>
                                        </Col>
                                        <Col xs="12" md="4">
                                            <div className="d-flex justify-content-center" style={{ fontSize: '40pt' }}>{convertNumberCurrencies(data?.averageSubmittedCost ?? 0)}</div>
                                            <p style={{ whiteSpace: 'nowrap' }}>Average Cost</p>
                                        </Col>
                                        <Col xs="12" md="4">
                                            <div className="d-flex justify-content-center" style={{ fontSize: '40pt' }}>{data?.averageSkillMatch?.toFixed(2) ?? 0}%</div>
                                            <p style={{ whiteSpace: 'nowrap' }}>Avarage Skills Match</p>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
                <Col xs="12" className="mt-5">
                    <ProfessionalsList onClickAward={(data) => {
                        setModalApply(data);
                        setValues(state => ({ ...state, professionalIds: data.idProfessional }))
                    }} project={data} />
                </Col>
                <Modal isOpen={modalApply} centered toggle={() => setModalApply(!modalApply)}>
                    <ModalBody className="p-5">
                        <Row>
                            <Col xs="12" className="mb-5">
                                <div className="mb-2">
                                    <div className="text-muted">Sector</div>
                                    <div>{modalApply?.sectors?.map((s, i) => `${s.name}${modalApply.sectors.length === i + 1 ? '' : ','} `)}</div>
                                </div>
                                <div className="mb-2">
                                    <div className="text-muted">Duration</div>
                                    <div>{data.duration} Hours</div>
                                </div>
                                <div className="mb-2">
                                    <div className="text-muted">Completion Date</div>
                                    <div>{moment(data.completeDate).format('DD MMMM YYYY')}</div>
                                </div>
                                <div className="mb-2">
                                    <div className="text-muted">Submited Cost</div>
                                    <div>
                                        IDR {convertToRupiah(modalApply.submittedCost ?? 0)}
                                    </div>
                                </div>
                            </Col>
                            <Col xs="12" className="d-flex justify-content-end">
                                <Button color="secondary" className="mr-2" onClick={() => setModalApply(!modalApply)}>Cancel</Button>
                                <Button color="primary" disabled={isSubmitting} onClick={handleSubmit}>{isSubmitting ? <><Spinner color="light" size="sm" /> Loading...</> : 'Award'}</Button>
                            </Col>
                        </Row>
                    </ModalBody>
                </Modal>
            </Row>
        </FilterProjectProfessionalsProvider>
    );
}

const ProfessionalsList = ({ onClickAward, project }) => {
    const matchRoute = useRouteMatch();
    const authUser = useAuthUser();
    const [filter, setFilter] = useFilterProjectProfessionalsContext()
    const [comparedData, setComparedData] = useState([])
    const { data: getData, error } = useSWR(() => "v1/professional?" +
        (filter.limit ? `limit=${filter.limit}` : '') +
        (filter.project ? `&projectId=${filter.project.value}` : '') +
        (filter.exp ? `&yearOfExperience=${filter.exp}` : '') +
        (filter.skills.length > 0 ? `&skillIds=${filter.skills.map(f => f.value).toString()}` : '') +
        (filter.sectors.length > 0 ? `&sectorIds=${filter.sectors.map(f => f.value).toString()}` : '') +
        (filter.degree.length > 0 ? `&educationIds=${filter.degree.map(f => f.value).toString()}` : '') +
        (filter.education.length > 0 ? `&educationFieldIds=${filter.education.map(f => f.value).toString()}` : '') +
        (filter.fee.min ? `&minSubmittedCost=${filter.fee.min}` : `&minSubmittedCost=${authUser.smcv}`) +
        (filter.fee.max && !filter.disableFee ? `&maxSubmittedCost=${filter.fee.max}` : ``) +
        `&sort=${filter.sortExp.value},${filter.sortCost.value}` +
        `&page=${filter.page + 1}&projectId=${matchRoute.params.projectId}&fromSelection=true`
        , { refreshInterval: 1800000 });
    const loading = !getData || error
    const data = useMemo(() => {
        return getData?.data?.data ?? [];
    }, [getData]);

    const handleChangeCurrentPage = useCallback(
        (page) => {
            setFilter((state) => ({ ...state, pagination: page }));
        },
        [setFilter]
    );

    const { PaginationComponent } = usePagination(
        data?.pageSummary?.total,
        filter.page,
        data?.pageSummary?.totalPages,
        handleChangeCurrentPage
    );

    const handleCompareProfessionals = useCallback((e, p) => {
        const { checked } = e.target;

        if (checked) {
            setComparedData(state => [...state, { id: p.id, idProfessional: p.idProfessional, professionalName: p.firstName, skillMatched: p.skillMatched.toFixed(0), submittedCost: p.submittedCost, yearOfExperience: p.yearOfExperience }])
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
                                <EducationFilter />
                            </Col>
                            <Col xs="12" className="my-2">
                                <EducationFieldFilter />
                            </Col>
                            <Col xs="12" className="my-2">
                                <FeeFilter min={authUser?.smcv} max={project.estimatedContractValue} />
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
            <Col xs="12" lg="9">
                {comparedData.length > 0 &&
                    <ProfessionalsCompare data={comparedData} project={project} onClear={handleClearOne} onClickAward={onClickAward} />
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
                        {comparedData.length > 0 &&
                            <Button color="danger" onClick={handleClearAll}>
                                Remove all ticked
                            </Button>
                        }
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
                        data?.records?.map((p, i) => (
                            <Col xs="12" key={i}>
                                <Card className="shadow-sm">
                                    <CardBody>
                                        <Row>
                                            <Col xs="7">
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
                                                                <Link to={`/professional/${p.id}`}>
                                                                    <h4>{p.firstName} {p.lastName}</h4>
                                                                </Link>
                                                            </Col>
                                                            <Col xs="12">
                                                                <p>{p.degree} in {p.educationField}</p>
                                                            </Col>
                                                            <Col xs="12">
                                                                <p>{p.yearOfExperience} year experience</p>
                                                            </Col>
                                                            <Col xs="12">
                                                                <span className="text-muted">Sector</span>
                                                                <br />
                                                                {p.sectors.map((s, i) => `${s.name}${p.sectors.length === i + 1 ? '' : ','} `)}
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col xs="5">
                                                {p.skills.map((s, i) => (
                                                    <Badge key={i} color={skillsColours[i]} className="w-100 text-uppercase mx-1 font-sm text-light">{s.name}</Badge>
                                                ))}
                                            </Col>
                                        </Row>
                                    </CardBody>
                                    <CardFooter style={{ backgroundColor: '#fde2c1' }}>
                                        <Row>
                                            <Col xs="4" className="d-flex align-items-center font-weight-bold">
                                                IDR {convertToRupiah(p.submittedCost)}
                                            </Col>
                                            <Col xs="4" className="d-flex align-items-center font-weight-bold">
                                                Skills Match {p.skillMatched.toFixed(0)}%
                                            </Col>
                                            <Col xs="4" className="d-flex justify-content-end">
                                                <div className="d-flex align-items-center">
                                                    <CustomInput type="checkbox" id={p.id} value={p.id} checked={comparedData.find(c => c.id === p.id)} disabled={comparedData.length === 3 ? (comparedData.find(c => c.id === p.id) ? false : true) : false} onChange={(e) => handleCompareProfessionals(e, p)} />
                                                    <div className="d-flex bg-transparent p-1 align-items-center">
                                                        Compare
                                                    </div>
                                                </div>
                                                <Button color="primary" size="sm" className="ml-2" disabled={['tnc_review', 'on_going', 'close'].includes(project.status)} onClick={() => onClickAward(p)}>
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

const ProfessionalsCompare = ({ data, project, onClear, onClickAward }) => {
    return (
        <Row className="mb-4">
            <Col xs="12">
                <Row className="text-center px-3">
                    <Col xs="3" className="p-0">
                        <div className="border font-weight-bold" style={{ backgroundColor: '#fde2c1', lineHeight: '25pt' }}>Comparing</div>
                        <div style={{ lineHeight: '25pt' }} className="border font-weight-bold">Skill Match</div>
                        <div style={{ lineHeight: '25pt' }} className="border font-weight-bold">Cost</div>
                        <div style={{ lineHeight: '25pt' }} className="border font-weight-bold">Years of experience</div>
                        <div style={{ lineHeight: '25pt' }} className="border font-weight-bold">Action</div>
                    </Col>
                    {data.map((p, i) => (
                        <Col xs="3" className="p-0" key={i}>
                            <div className="border font-weight-bold position-relative" style={{ backgroundColor: '#fde2c1', lineHeight: '25pt' }}>
                                {p.professionalName}
                                <Button size="sm" className="position-absolute" color="danger" style={{ top: '2px', right: '4px' }} onClick={() => onClear(p)}>
                                    <FontAwesomeIcon icon="times" size="sm" />
                                </Button>
                            </div>
                            <div style={{ lineHeight: '25pt' }} className="border">{p.skillMatched}%</div>
                            <div style={{ lineHeight: '25pt' }} className="border">IDR {convertToRupiah(p.submittedCost)}</div>
                            <div style={{ lineHeight: '25pt' }} className="border">{p.yearOfExperience}</div>
                            <div style={{ lineHeight: '25pt' }} className="border">
                                <Button color="primary" size="sm" disabled={['tnc_review', 'on_going', 'close'].includes(project.status)} className="ml-2" onClick={() => onClickAward(p)}>
                                    Award
                                </Button>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Col>
        </Row>
    )
}
