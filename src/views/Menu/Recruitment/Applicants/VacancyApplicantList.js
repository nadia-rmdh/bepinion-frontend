import React, { useState, useEffect } from 'react';
import { Button, Card, CardHeader, Badge, CardBody, Col, Row, Modal, ModalBody, Nav, NavItem } from 'reactstrap';
import request from '../../../../utils/request';
import DataNotFound from '../../../../components/DataNotFound';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import { translate } from 'react-switch-lang';
import { convertToRupiah } from '../../../../utils/formatter';
import { useAuthUser, useUserPrivileges } from '../../../../store';
import profilePhotoNotFound from '../../../../assets/img/no-photo.png'
import SkeletonVacancyApplicantList from '../Skeleton/SkeletonVacancyApplicantList';
import moment from "moment";
import { SearchApplicantNameFilter } from '../Filters/SearchApplicantNameFilter';
import { useRecruitmentsFiltersCtx } from '../Context/RecruitmentContext';
import { useMemo } from 'react';
import { useCallback } from 'react';
import usePagination from '../../../../hooks/usePagination';
import { DateFilters } from '../Filters/DateFilters';
import { GenderFilter } from '../Filters/GenderFilter';
import { EducationFilter } from '../Filters/EducationFilter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ResetFilters } from '../Filters/ResetFilters';
import disableScroll from 'disable-scroll';
import { useDispatch } from 'react-redux';
import { getMe } from '../../../../actions/auth';
import { useMediaQuery } from 'react-responsive'
import Tour from 'reactour';

function VacancyApplicantList(props) {
    const { search, state: locationState = {} } = useLocation();
    const { params } = useRouteMatch();
    const { data: dataVacancy } = locationState;
    const { can } = useUserPrivileges();
    const [vacancy, setVacancy] = useState(dataVacancy);
    const [applicants, setApplicants] = useState([]);
    const [dataNotFound, setDataNotFound] = useState(false);
    const [loading, setLoading] = useState(true);
    const [modalFilter, setModalFilter] = useState(false);
    const [filters, setFilters] = useRecruitmentsFiltersCtx()
    const user = useAuthUser();
    const [isTour, setIsTour] = useState(false);
    const disableBody = () => disableScroll.on();
    const enableBody = () => disableScroll.off();
    const accentColor = "#1d5a8e";
    const dispatch = useDispatch();
    const isSmallSize = useMediaQuery({ query: '(max-width: 768px)' })

    useEffect(() => {
        if (user.guidance.layout && user.guidance.header) {
            window.scroll({ top: 0, behavior: 'smooth' })
            if (!user.guidance.jobApplicantList) {
                setIsTour(true);
            }
        }
    }, [user])

    const disableGuideJobApplicantList = () => {
        setIsTour(false);
        request.put('auth/guidance', { guidance: 'jobApplicantList' })
            .then(() => {
                dispatch(getMe());
            })
    }

    useEffect(() => {
        const queryParams = new URLSearchParams(search);
        setLoading(true);
        setDataNotFound(false);
        request.get('v1/recruitment/applicants', { params: { job_vacancy: params.id, status: queryParams.get('status') } }).then(res => {
            setApplicants(res.data.data);
        }).catch(err => {
            if (err.response.status === 404) {
                setDataNotFound(true);
            }
        }).finally(() => setLoading(false));
    }, [params.id, search])

    useEffect(() => {
        if (!dataVacancy) {
            request.get(`v1/recruitment/vacancies/${params.id}`).then(res => {
                setVacancy(res.data.data);
            });
        }
    }, [dataVacancy, params.id])

    const steps = [
        {
            selector: ".tour-filterJobApplicant",
            content: ({ goTo, inDOM }) => (
                <div>
                    <p>
                        Dari seluruh pelamar yang pernah melamar pada pekerjaan ini gunakan
                        filter untuk memilih kategori-kategori tertentu yang ingin Anda tampilkan.
                    </p>
                    <div className="col-12 text-center">
                        <Row>
                            <div className="col-12 text-right p-0">
                                <Button
                                    className="mt-2"
                                    type="submit"
                                    color="netis-color"
                                    onClick={() => {
                                        goTo(1)
                                    }}
                                >
                                    Selanjutnya <i className="fa fa-arrow-right ml-2"></i>
                                </Button>
                            </div>
                        </Row>
                    </div>
                </div>
            ),
        },
        {
            selector: ".tour-tabJobApplicant",
            content: ({ goTo, inDOM }) => (
                <div>
                    <p>
                        Jika Anda ingin melihat daftar pelamar dengan kategori lainnya,
                        silahkan pilih tab yang ada disini.
                    </p>
                    <div className="col-12 text-center">
                    <Row>
                        <div className="col-6 text-center p-0">
                        <Button
                            className="mt-2"
                            type="submit"
                            color="netis-color"
                            onClick={() => goTo(0)}
                        >
                            <i className="fa fa-arrow-left mr-2"></i>Sebelumnya
                        </Button>
                        </div>
                        <div className="col-6 text-center p-0">
                        <Button
                            className="mt-2"
                            type="submit"
                            color="netis-color"
                            onClick={() => goTo(2)}
                        >
                            Selanjutnya <i className="fa fa-arrow-right ml-2"></i>
                        </Button>
                        </div>
                    </Row>
                    </div>
                </div>
            ),
        },
        {
            selector: ".tour-vacancyApplicantList",
            content: ({ goTo, inDOM }) => (
                <div>
                    <p>
                        Anda dapat melihat data lamaran pelamar secara detail dengan
                        memilih salah satu dari nama pelamar yang Anda inginkan pada kolom ini.
                    </p>
                    <div className="col-12 text-center">
                    <Row>
                        <div className="col-6 text-center p-0">
                        <Button
                            className="mt-2"
                            type="submit"
                            color="netis-color"
                            onClick={() => goTo(1)}
                        >
                            <i className="fa fa-arrow-left mr-2"></i>Sebelumnya
                        </Button>
                        </div>
                        <div className="col-6 text-center p-0">
                        <Button
                            className="mt-2"
                            type="submit"
                            color="netis-success"
                            onClick={() => {
                                disableGuideJobApplicantList();
                            }}
                        >
                            Oke, Saya Paham
                        </Button>
                        </div>
                    </Row>
                    </div>
                </div>
            ),
        },
    ]

    const filtered = useMemo(() => {
        let data = applicants;
        if (filters) {
            data = data
                .filter((item) => (
                    filters.searchApplicant ? item.detail?.fullName?.toLowerCase().includes(filters.searchApplicant.toLowerCase()) : true
                ))
                .filter((item) => {
                    return filters.genderApplicant && filters.genderApplicant.length > 0 ? filters.genderApplicant.includes(item.detail.gender?.toLowerCase()) : true
                })
                .filter((item) => {
                    const getFilters = filters.educationApplicant?.map(e => e.value) ?? [];
                    return getFilters.length > 0 ? getFilters.includes(item.detail.lastEducation) : true
                })
            if (filters.date.start && filters.date.end) {
                data = data.filter((item) => {
                    return moment(moment(item.createdAt).format('YYYY-MM-DD')).isBetween(moment(filters.date.start).subtract(1, 'day'), moment(filters.date.end).add(1, 'day'))
                })
            }
        }
        data.length > 0 ? setDataNotFound(false) : setDataNotFound(true)
        return data
    }, [filters, applicants])

    const handleChangeCurrentPage = useCallback((page) => {
        setFilters(state => ({ ...state, paginationApplicants: page }))
    }, [setFilters])

    const { data: groupFiltered, PaginationComponent } = usePagination(filtered, 9, filters.paginationApplicants, handleChangeCurrentPage)

    const queryParams = new URLSearchParams(search);
    const status = queryParams.get('status');

    const onErrorImage = (e) => {
        e.target.src = profilePhotoNotFound;
        e.target.onerror = null;
    }

    return (
        <>
            <Tour
                steps={steps}
                accentColor={accentColor}
                showButtons={false}
                rounded={5}
                isOpen={isTour}
                closeWithMask={false}
                disableInteraction={true}
                disableFocusLock={true}
                onAfterOpen={disableBody}
                onBeforeClose={enableBody}
                onRequestClose={() => {
                    disableGuideJobApplicantList();
                }}
            />
            <Card>
                <CardHeader className="d-flex align-items-center bg-netis-primary">
                    <h5 className="mb-0" style={{ color: '#ffff' }}>{vacancy?.name}</h5>
                </CardHeader>
                <CardBody style={{ minHeight: "1000px" }}>
                    <div className="ml-auto mr-n1">
                        <Nav tabs className="text-center tour-tabJobApplicant" disabled={isTour}>
                            <NavItem>
                                <div className={`d-md-none text-center mb-n2 ${status === 'unprocessed' ? 'text-netis-primary font-weight-bold' : 'text-secondary'}`} style={{ fontSize: '12pt' }}>{vacancy?.unprocessedApplicantCount}</div>
                                <Link className={`nav-link ${status === 'unprocessed' ? 'active' : ''}`} replace={true} to={location => ({ ...location, search: '?status=unprocessed', state: { data: vacancy } })} >
                                    <div className="label d-md-inline">Belum diproses</div>
                                    {vacancy?.unprocessedApplicantCount !== 0 ?
                                        <Badge pill color={`${status === 'unprocessed' ? 'danger' : 'secondary'}`} className="ml-1 pt-1 d-none d-md-inline" style={{ top: -2 }}>{vacancy?.unprocessedApplicantCount}</Badge>
                                        :
                                        ''
                                    }
                                </Link>
                            </NavItem>
                            <NavItem>
                                <div className={`d-md-none text-center mb-n2 ${status === 'accepted' ? 'text-netis-primary font-weight-bold' : 'text-secondary'}`} style={{ fontSize: '12pt' }}>{vacancy?.acceptedApplicantCount}</div>
                                <Link className={`nav-link ${status === 'accepted' ? 'active' : ''}`} replace={true} to={location => ({ ...location, search: '?status=accepted', state: { data: vacancy } })} >
                                    <div className="label d-md-inline">Sesuai</div>
                                    {vacancy?.acceptedApplicantCount !== 0 ?
                                        <Badge pill color={`${status === 'accepted' ? 'danger' : 'secondary'}`} className="ml-1 pt-1 d-none d-md-inline" style={{ top: -2 }}>{vacancy?.acceptedApplicantCount}</Badge>
                                        :
                                        ''
                                    }
                                </Link>
                            </NavItem>
                            <NavItem>
                                <div className={`d-md-none text-center mb-n2 ${status === 'rejected' ? 'text-netis-primary font-weight-bold' : 'text-secondary'}`} style={{ fontSize: '12pt' }}>{vacancy?.rejectedApplicantCount}</div>
                                <Link className={`nav-link ${status === 'rejected' ? 'active' : ''}`} replace={true} to={location => ({ ...location, search: '?status=rejected', state: { data: vacancy } })} >
                                    <div className="label d-md-inline">Tidak Sesuai</div>
                                    {vacancy?.rejectedApplicantCount !== 0 ?
                                        <Badge pill color={`${status === 'rejected' ? 'danger' : 'secondary'}`} className="ml-1 pt-1 d-none d-md-inline" style={{ top: -2 }}>{vacancy?.rejectedApplicantCount}</Badge>
                                        :
                                        ''
                                    }
                                </Link>
                            </NavItem>
                        </Nav>
                    </div>
                    <div className="menu-mobile">
                        <Row className={`mb-1 ${isSmallSize ? `tour-filterJobApplicant` : ``}`}>
                            <Col xs="9">
                                <SearchApplicantNameFilter />
                            </Col>
                            <Col xs="3" className="p-0 text-nowrap text-center">
                                <Button
                                    onClick={() => setModalFilter(true)}
                                    disabled={isTour}
                                    style={{
                                        backgroundColor: "transparent",
                                        border: "0px"
                                    }}
                                >
                                    <i className="fa fa-2x fa-filter" style={{ color: "#335877" }} />&nbsp;
                            <small style={{ color: "#335877" }}>Filter</small>
                                </Button>
                            </Col>
                        </Row>
                    </div>
                    <Row className="mt-4">
                        <Col sm="3" className={`menu-dashboard ${!isSmallSize ? `tour-filterJobApplicant` : ``}`}>
                            <SearchApplicantNameFilter />
                            <hr />
                            <DateFilters />
                            <hr />
                            <GenderFilter />
                            <hr />
                            <EducationFilter />
                            <hr />
                            <ResetFilters />
                        </Col>
                        {
                            loading ?
                                <Col>
                                    <SkeletonVacancyApplicantList />
                                </Col>
                                :
                                (dataNotFound || groupFiltered?.length === 0) ?
                                    <Col md="9" className="py-5 text-center">
                                        <DataNotFound />
                                    </Col>
                                    :
                                    <Col md="9">
                                        <Row className="tour-vacancyApplicantList">
                                            {groupFiltered?.map((applicant, idx) => (
                                                <Col xs="12" sm="6" md="6" lg="4" key={idx} className="pt-3">
                                                    <Link disabled={isTour} to={`/dashboard/applicants/${applicant.id}`} className={`${can('canManagementJob') ? '' : ' disabled'} card-detail-job`}>
                                                        <Card className="shadow-sm rounded border-0 ribbons" style={{ minHeight: 100 }} data-label={`Melamar pada ${moment(applicant.createdAt).format('DD MMMM YYYY')}`}>
                                                            <div className="card-container">
                                                                <CardBody>
                                                                    <Row>
                                                                        <Col xs="12" className="text-center mt-3">
                                                                            <div className="card-image d-flex justify-content-center p-3">
                                                                                <img src={applicant.detail.avatar ?? profilePhotoNotFound} alt="photos profile" className="rounded-circle" onError={(e) => onErrorImage(e)} />
                                                                            </div>
                                                                        </Col>
                                                                        <Col xs="12" className="text-center">
                                                                            <h6 className="mt-3 text-netis-primary font-weight-bolder" style={{ fontSize: '12pt' }}>{applicant.detail?.fullName ?? applicant.userEmail}</h6>
                                                                        </Col>
                                                                        <Col xs="12" className="px-3 mt-3">
                                                                            <Row>
                                                                                <Col xs="1" className="text-center" style={{ color: "#909090" }}><FontAwesomeIcon icon="university" size="lg" /></Col>
                                                                                <Col>{applicant.detail?.lastEducation ?? '-'}</Col>
                                                                            </Row>
                                                                            <Row className="mt-2">
                                                                                <Col xs="1" className="text-center" style={{ color: "#ffc107" }}><FontAwesomeIcon icon="graduation-cap" size="lg" /></Col>
                                                                                <Col>{applicant.detail?.major ?? '-'}</Col>
                                                                            </Row>
                                                                            <Row className="mt-2">
                                                                                <Col xs="1" className="text-center" style={{ color: "#3a9234" }}><FontAwesomeIcon icon="money-bill" size="lg" /></Col>
                                                                                <Col>{(applicant.detail?.expectedSalary && convertToRupiah(applicant.detail.expectedSalary)) || ' - '}</Col>
                                                                            </Row>
                                                                        </Col>
                                                                    </Row>
                                                                </CardBody>
                                                            </div>
                                                        </Card>
                                                    </Link>
                                                </Col>
                                            ))}
                                        </Row>
                                    </Col>
                        }
                        <Col xs="12">
                            {filtered.length > 9 ? <PaginationComponent /> : ''}
                        </Col>
                    </Row>
                </CardBody>
            </Card >
            <Modal
                className="bottom"
                isOpen={modalFilter}
                toggle={() => setModalFilter(false)}
            >
                <ModalBody>
                    <div className="text-center">
                        <Button
                            className="mx-auto mt-1 mb-3"
                            style={{ width: "50%", height: "6px", borderRadius: "10px", backgroundColor: "#696969", padding: "0px" }}
                            onClick={() => setModalFilter(false)}
                        />
                    </div>
                    <DateFilters />
                    <hr />
                    <GenderFilter />
                    <hr />
                    <EducationFilter />
                    <hr />
                    <ResetFilters />
                    <div className="text-center">
                        <Button
                            color="netis-color"
                            className="my-3"
                            onClick={() => setModalFilter(false)}
                        >
                            Tampilkan Hasil
                        </Button>
                    </div>
                </ModalBody>
            </Modal>
        </>
    )
}

export default translate(VacancyApplicantList);
