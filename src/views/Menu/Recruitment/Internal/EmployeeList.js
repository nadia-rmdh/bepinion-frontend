import React, { useCallback, useMemo, useState, memo, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, Col, Modal, ModalBody, Row } from 'reactstrap';
import DataNotFound from '../../../../components/DataNotFound';
import usePagination from '../../../../hooks/usePagination';
// import StatusBadge from '../Applicants/StatusBadge';
import { useRecruitmentsFiltersCtx } from '../Context/RecruitmentContext';
import { SearchApplicantNameFilter } from '../Filters/SearchApplicantNameFilter';
import * as moment from 'moment';
import { t, translate } from 'react-switch-lang';
import { EmployeeFilters, EmployeeModalFilters } from './EmployeeFilters';
import { useAuthUser } from '../../../../store';
import { useDispatch } from 'react-redux';
import disableScroll from 'disable-scroll';
import { getMe } from '../../../../actions/auth';
import Tour from 'reactour';
import { useMediaQuery } from 'react-responsive';
import request from '../../../../utils/request';

function EmployeeList({data : applicants}){
    const isSmallSize = useMediaQuery({ query: '(max-width: 768px)' })
    const [filters, setFilters] = useRecruitmentsFiltersCtx()
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
            if(!user.guidance.internalAssessmentAfter){
                setIsTour(true);
            }
        }
    }, [user])

    const disableGuideAfter = () => {
        setIsTour(false);
        request.put('auth/guidance', {guidance: 'internalAssessmentAfter'})
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
            selector: ".tour-employeeList",
            content: ({ goTo, inDOM }) => (
                <div>
                    <h5
                        className="title-upgrade text-center"
                        style={{ color: "#93aad6" }}
                    >
                        Selamat datang di Halaman Daftar Karyawan!
                    </h5>
                    <p>
                        Pada assesment center, Anda dapat melihat hasil asesmen karyawan 
                        perusahaan Anda yang sudah dilakukan sebelumnya. 
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
            selector: ".tour-filterEmployee",
            content: ({ goTo, inDOM }) => (
                <div>
                    <p>
                        Gunakan filter untuk memilih kategori-kategori tertentu yang ingin Anda lihat, 
                        dari seluruh daftar karyawan yang pernah mengikuti asesmen.
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
            selector: ".tour-employeeDetail",
            content: ({ goTo, inDOM }) => (
                <div>
                    <p>
                        Jika Anda ingin melihat informasi detail dari hasil asesmen karyawan Anda, silahkan klik tombol ini.
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
                                disableGuideAfter();
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
    
    return(
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
                    disableGuideAfter();
                }}
            />

            {/* Kalo sama persis kyk ApplicantList berarti pake ini */}

            <div className="menu-mobile">
            <Row className={`mb-1 ${isSmallSize ? `tour-filterEmployee` : ``}`}>
                    <Col xs="9">
                        <SearchApplicantNameFilter data="Karyawan" />
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
                <Col sm="3" className={`menu-dashboard ${!isSmallSize ? `tour-filterEmployee` : ``}`}>
                    <EmployeeFilters />
                </Col>
                <Col sm="9">
                    {dataNotFound || filtered.length === 0 ?
                        <DataNotFound />
                            :
                            <TableListEmployee data={groupFiltered} Pagination={PaginationComponent} filtered={filtered} />
                    }
                </Col>
            </Row>

            {/* <Row className="mb-5">
                <Col md="4" className="mb-3">
                    <SearchApplicantNameFilter data="Karyawan" />
                </Col>
                <Col xs="12" className="mt-3">
                    {dataNotFound || filtered.length === 0 ?
                        <DataNotFound />
                            :
                            <TableListEmployee data={groupFiltered} Pagination={PaginationComponent} filtered={filtered} />
                    }
                </Col>
            </Row> */}
            <Modal
                className="bottom-small"
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
                    <EmployeeModalFilters />
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

const TableListEmployee = memo(({ data = [], Pagination, filtered }) => {
    return (
        <div className="tour-employeeList">
            <Row className="font-weight-bold d-none d-md-flex">
                <Col sm md="3">
                    Nama Karyawan
                </Col>
                <Col sm md="3">
                    Posisi
                </Col>
                <Col sm md="3">
                    Tanggal
                </Col>
                <Col sm md="3">
                </Col>
            </Row>
            <hr />
            {
                data.length > 0 ?
                    data.map((data, idx) => (
                        <Card key={data.id} className="shadow-sm border-0">
                            <CardBody>
                                <Row>
                                    <Col sm="12" md="3">
                                        {data.detail.fullName}
                                    </Col>
                                    <Col sm="12" md="3">
                                        {data.job_vacancy.name}
                                    </Col>
                                    <Col sm="12" md="3">
                                        {moment(data.createdAt).format('DD MMMM YYYY')}
                                    </Col>
                                    <Col sm="12" md="3">
                                        {/* <Row>
                                            <Col sm="6" md="6" xl="6" className="mb-2">
                                                <StatusBadge status={data.status} size={11} />
                                            </Col>
                                            <Col sm="6" md="6" xl="6">
                                                <Link to={`/dashboard/applicants/${data.id}`}>
                                                    <Button size="sm" color="netis-color" className={idx === 0 ? 'tour-detailbutton' : ''}>{t('lihatdetail')}</Button>
                                                </Link>
                                            </Col>
                                        </Row> */}
                                        <Link to={`/dashboard/applicants/${data.id}`}>
                                            <Button size="sm" color="netis-color" className={idx === 0 ? 'tour-employeeDetail' : ''}>{t('lihatdetail')}</Button>
                                        </Link>
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

export default translate(EmployeeList);