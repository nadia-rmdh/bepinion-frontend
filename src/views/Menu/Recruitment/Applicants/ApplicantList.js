import React, { useMemo, memo, useCallback, useState, useEffect } from 'react';
import { Button, Row, Col, Card, CardBody, Modal, ModalBody } from 'reactstrap';
import DataNotFound from '../../../../components/DataNotFound';
import * as moment from 'moment';
import StatusBadge from './StatusBadge';
import { Link } from 'react-router-dom';
import { t, translate } from 'react-switch-lang';
import useSWR from 'swr';
import { ApplicantFilters, ApplicantModalFilters } from './ApplicantFilters';
import { useRecruitmentsFiltersCtx } from '../Context/RecruitmentContext';
import SkeletonApplicantList from '../Skeleton/SkeletonApplicantList';
import usePagination from '../../../../hooks/usePagination';
import { SearchApplicantNameFilter } from '../Filters/SearchApplicantNameFilter';
import { useMediaQuery } from 'react-responsive';
import Tour from "reactour";
import { useAuthUser } from '../../../../store';
import disableScroll from 'disable-scroll';
import { getMe } from '../../../../actions/auth';
import { useDispatch } from 'react-redux';
import request from '../../../../utils/request';


function ApplicantList() {
    const isSmallSize = useMediaQuery({ query: '(max-width: 768px)' })
    const { data: applicantResponse, error: applicantError } = useSWR('v1/recruitment/applicants');
    const loadingApplicant = !applicantResponse && !applicantError;
    const [filters, setFilters] = useRecruitmentsFiltersCtx()
    const applicants = useMemo(() => applicantResponse?.data?.data ?? [], [applicantResponse]);
    const [modalFilter, setModalFilter] = useState(false);
    const [dataNotFound, setDataNotFound] = useState(false);
    const user = useAuthUser();
    const [isTour, setIsTour] = useState(false);
    const disableBody = () => disableScroll.on();
    const enableBody = () => disableScroll.off();
    const accentColor = "#1d5a8e";
    const dispatch = useDispatch();

    useEffect(() => {
        if(user.guidance.layout && user.guidance.header){
            window.scroll({top: 0, behavior: 'smooth' })
            if(!user.guidance.applicantList){
                setIsTour(true);
            }
        }
    }, [user])

    const disableGuideApplicantList = () => {
        setIsTour(false);
        request.put('auth/guidance', {guidance: 'applicantList'})
            .then(() => {
                dispatch(getMe());
            })
    }

    const filtered = useMemo(() => {
        let data = applicants;
        if (filters) {
            data = data
                .filter((item) => (
                    filters.searchApplicant ? item.detail?.fullName?.toLowerCase().includes(filters.searchApplicant.toLowerCase()) : true
                ))
                .filter((item) => {
                    return filters.statusApplicant.length > 0 ? filters.statusApplicant.includes(item.status) : true
                })
                .filter((item) => {
                    const getFilters = filters.selectJob?.map(e => e.value) ?? [];
                    return getFilters.length > 0 ? getFilters.includes(item.job_vacancy.id) : true
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

    const { data: groupFiltered, PaginationComponent } = usePagination(filtered, 15, filters.paginationApplicants, handleChangeCurrentPage)

    const steps = [
        {
            selector: ".tour-applicantlist",
            content: ({ goTo, inDOM }) => (
                <div>
                    <h5
                        className="title-upgrade text-center"
                        style={{ color: "#93aad6" }}
                    >
                        Selamat datang di Halaman Daftar Pelamar!
                    </h5>
                    <p>
                        Seluruh daftar pelamar dengan semua status lamaran pekerjaan 
                        akan ditampilkan pada halaman ini.
                    </p>
                    <div className="col-12 text-center">
                        <Row>
                        <div className="col-12 text-right p-0">
                            <Button
                            className="mt-2"
                            type="submit"
                            color="netis-color"
                            onClick={() => goTo(1)}
                            >
                            Selanjutnya <i className="fa fa-arrow-right ml-2"></i>
                            </Button>
                        </div>
                        </Row>
                    </div>
                </div>
            )
        },
        {
            selector: ".tour-filterapplicant",
            content: ({ goTo, inDOM }) => (
                <div>
                    <p>
                        Dari seluruh pelamar yang pernah melamar gunakan filter ini untuk 
                        memilih kategori-kategori tertentu yang ingin Anda tampilkan.
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
            selector: ".tour-detailbutton",
            content: ({ goTo, inDOM }) => (
                <div>
                    <p>
                        Jika Anda ingin melihat informasi detail dari pelamar, silahkan klik tombol ini.
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
                                disableGuideApplicantList();
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

    return (
        <div className="px-1" style={{ borderBottom: 0 }}>
            <Tour
                steps={steps}
                accentColor={accentColor}
                showButtons={false}
                rounded={5}
                isOpen={isTour}
                closeWithMask={false}
                disableFocusLock={true}
                disableInteraction={true}
                onAfterOpen={disableBody}
                onBeforeClose={enableBody}
                onRequestClose={() => {
                    disableGuideApplicantList();
                }}
            />
            <div className="menu-mobile">
                <Row className={`mb-1 ${isSmallSize ? `tour-filterapplicant` : ``}`}>
                    <Col xs="9">
                        <SearchApplicantNameFilter />
                    </Col>
                    <Col xs="3" className="p-0 text-nowrap text-center">
                        <Button
                            onClick={() => setModalFilter(true)}
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
            <Row className="mb-5">
                {/* <Col sm="12" className="menu-dashboard">
                    <div className="p-2">
                        <h4 className="d-inline mr-3">Daftar Pelamar</h4>
                    </div>
                    <hr />
                </Col> */}
                <Col sm="3" className={`menu-dashboard ${!isSmallSize ? `tour-filterapplicant` : ``}`}>
                    <ApplicantFilters />
                </Col>
                <Col sm="9">
                    {loadingApplicant ?
                        <SkeletonApplicantList /> :
                        dataNotFound || filtered.length === 0 ?
                            <DataNotFound />
                            :
                            <TableListApplicants data={groupFiltered} Pagination={PaginationComponent} filtered={filtered} />
                    }
                </Col>
            </Row>
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
                    <ApplicantModalFilters />
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
        </div>
    )
}

const TableListApplicants = memo(({ data = [], Pagination, filtered }) => {
    return (
        <div className="tour-applicantlist">
            <Row className="font-weight-bold d-none d-md-flex">
                <Col sm md="3">
                    Nama Pelamar
                </Col>
                <Col sm md="3">
                    Lowongan
                </Col>
                <Col sm md="3">
                    Tanggal
                </Col>
                <Col sm md="3">
                    Status
                </Col>
            </Row>
            <hr />
            {
                data.length > 0 ?
                    data.map((data, idx) => (
                        <Card key={data.id} className="shadow-sm border-0">
                            <CardBody>
                                <Row>
                                    <Col sm="12" md="6" xl="3">
                                        {data.detail.fullName}
                                    </Col>
                                    <Col sm="12" md="6" xl="3">
                                        {data.job_vacancy.name}
                                    </Col>
                                    <Col sm="12" md="12" xl="3">
                                        {moment(data.createdAt).format('DD MMMM YYYY')}
                                    </Col>
                                    <Col sm="12" md="12" xl="3">
                                        <Row>
                                            <Col sm="6" md="6" xl="6" className="mb-2">
                                                <StatusBadge status={data.status} size={11} />
                                            </Col>
                                            <Col sm="6" md="6" xl="6">
                                                <Link to={`/dashboard/applicants/${data.id}`}>
                                                    <Button size="sm" color="netis-color" className={idx === 0 ? 'tour-detailbutton' : ''}>{t('lihatdetail')}</Button>
                                                </Link>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    ))
                    : <DataNotFound />
            }
            {filtered.length > 8 ? <Pagination /> : ''}
        </div>
    )
})

export default translate(ApplicantList);
