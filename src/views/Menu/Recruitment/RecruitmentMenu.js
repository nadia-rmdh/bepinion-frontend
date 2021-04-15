import React from "react";
import { useState } from "react";
import { Button, Modal, ModalBody, Spinner, Card, CardBody, Row, Col, Badge, ModalHeader } from "reactstrap";
import { Link } from "react-router-dom";
import request from "../../../utils/request";
import { translate, t } from "react-switch-lang";
import { toast } from "react-toastify";
import { useAuthUser, useUserPrivileges } from "../../../store";
import * as moment from "moment";
import SkeletonRecruitmentMenu from '../Recruitment/Skeleton/SkeletonRecruitmentMenu'
import "react-input-range/lib/css/index.css";
import DataNotFound from "../../../components/DataNotFound";
import { useRecruitmentsFiltersCtx } from "./Context/RecruitmentContext";
import { useCallback } from "react";
import { useMemo } from "react";
import { memo } from "react";
import useSWR from "swr";
import { RecruitmentListFilters, RecruitmentListModalFilters } from "./RecruitmentListFilters";
import { SearchJobNameFilters } from "./Filters/SearchJobNameFilters";
import usePagination from "../../../hooks/usePagination";
import { useBalance } from "../../../hooks/useBalance";
import FloatingButtonJob from "./Components/FloatingButtonJob";
import { useEffect } from "react";
import { useRef } from "react";
import { useMediaQuery } from 'react-responsive'
import Tour from "reactour";
import disableScroll from 'disable-scroll';
import { getMe } from "../../../actions/auth";
import { useDispatch } from "react-redux";
import ModalPrivilegeForbidden from "../../../components/ModalPrivilegeForbidden";

function RecruitmentMenu(props) {
  const isSmallSize = useMediaQuery({ query: '(max-width: 768px)' })
  const { data: jobResponse, error: jobError, mutate } = useSWR('v1/recruitment/vacancies');
  const loading = !jobResponse && !jobError;
  const jobData = useMemo(() => jobResponse?.data?.data ?? [], [jobResponse]);
  const [deletingId, setDeletingId] = useState(null);
  const [updateId, setUpdateId] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { privileges, can } = useUserPrivileges();
  const [updateLoading, setUpdateLoading] = useState(false);
  const [modalFilter, setModalFilter] = useState(false);
  const [filters, setFilters] = useRecruitmentsFiltersCtx();
  const [isTour, setIsTour] = useState(false);
  const [isTutorAfter, setIsTutorAfter] = useState(false);
  const disableBody = () => disableScroll.on();
  const enableBody = () => disableScroll.off();
  const accentColor = "#1d5a8e";
  const toastId = useRef(null);
  const user = useAuthUser();
  const dispatch = useDispatch();
  const jobAfterTutor = user.guidance.createJobTutorial && !user.guidance.jobListNewData;
  const [forbidden, setForbidden] = useState(false)
  const { data } = useBalance();
  const myBalance = useMemo(() => data?.balance ?? 0, [data])
  const isExpired = useMemo(() => data?.isExpired, [data])

  useEffect(() => {
    mutate()
  }, [mutate])

  useEffect(() => {
    if(user.guidance.layout && user.guidance.header){
      window.scroll({top: 0, behavior: 'smooth' })
      if(!user.guidance.jobList){
        setIsTour(true);
      }
    }
  }, [user])

  useEffect(() => {
    if(user.guidance.layout && user.guidance.header && user.guidance.createJobTutorial){
      if(!user.guidance.jobListNewData){
        setIsTutorAfter(true);
      }
    }
  }, [user])

  const filtered = useMemo(() => {
    let data = jobData;
    if (filters) {
      data = data.filter((item) => (
        filters.searchJob ? item?.name?.toLowerCase().includes(filters.searchJob.toLowerCase()) : true
      ))
        .filter((item) => {
          return filters.status.length > 0 ? filters.status.includes(item.status) : true
        })
        .filter((item) => {
          return filters.type.length > 0 ? filters.type.includes(item.type) : true
        })
        .filter((itemSalary) => {
          return itemSalary.minSalary >= filters.salary.min && itemSalary.maxSalary <= filters.salary.max
        })
    }
    return data
  }, [filters, jobData])

  const handleDeleteClick = useCallback((id) => {
    setDeletingId(id)
  }, [])

  const handleUpdateClick = useCallback((id) => {
    if(can('canManagementJob')){
      setUpdateId(id)
    }
    else{
      setForbidden(true)
    }
  }, [can])

  const handleChangeCurrentPage = useCallback((page) => {
    setFilters(state => ({ ...state, paginationJobs: page }))
  }, [setFilters])

  async function doDelete() {
    if (deleteLoading) return;
    try {
      setDeleteLoading(true);
      await request.delete("v1/recruitment/vacancies/" + deletingId)
      setDeletingId(null);
      toastId.current = toast('Sedang menghapus lowongan...', { autoClose: false, type: toast.TYPE.INFO })
      await mutate((response) => {
        return {
          ...response,
          data: {
            ...response.data,
            data: response.data.data.filter(r => r.id !== deletingId)
          }
        };
      }, false);
      await new Promise((resolve) => setTimeout(() => {
        toast.update(toastId.current, { render: 'Berhasil menghapus lowongan.', type: toast.TYPE.SUCCESS, autoClose: 4000 });
        resolve()
      }, 1000))
    } catch (err) {
      setTimeout(() => {
        toast.update(toastId.current, { render: 'Gagal menghapus lowongan.', type: toast.TYPE.ERROR, autoClose: false });
      }, 2000)
    } finally {
      setDeleteLoading(false);
    }
  }

  async function doUpdate() {
    if (updateLoading) return;
    setUpdateLoading(true);
    let url = ""
    let body = {}
    if (updateId[1] === "repost") {
      url = "v1/recruitment/vacancies/renew/"
    } else if (updateId[1] === "tutup") {
      url = "v1/recruitment/vacancies/"
      body = { published: false }
    } else if (updateId[1] === "publish") {
      url = "v1/recruitment/vacancies/"
      body = { published: true }
    } else {
      toast.error("Terjadi kesalahan");
    }

    let message = '';
    try {
      setUpdateLoading(true);
      await request.put(url + updateId[0], body)
      if (updateId[1] === "repost") {
        message = ' membuka kembali lowongan.';
      } else if (updateId[1] === "tutup") {
        message = ' menutup lowongan.';
      } else if (updateId[1] === "publish") {
        message = ' mempublikasikan lowongan.';
      }
      toastId.current = toast('Sedang' + message + '..', { autoClose: false, type: toast.TYPE.INFO })
      await mutate();
      setUpdateId([]);;
      await new Promise((resolve) => setTimeout(() => {
        toast.update(toastId.current, { render: 'Berhasil' + message, type: toast.TYPE.SUCCESS, autoClose: 4000 });
        resolve();
      }, 1000))
    } catch (err) {
      setTimeout(() => {
        toast.update(toastId.current, { render: 'Gagal' + message, type: toast.TYPE.ERROR, autoClose: false });
      }, 2000)
    } finally {
      setUpdateLoading(false);
    }
  }

  const disableGuideJobList = () => {
    setIsTour(false);
    request.put('auth/guidance', {guidance: 'jobList'})
      .then(() => {
        dispatch(getMe());
      })
  }

  const disableGuideJobTutor = () => {
    setIsTutorAfter(false);
    request.put('auth/guidance', {guidance: 'jobListNewData'})
      .then(() => {
        dispatch(getMe());
      })
  }

  const { data: groupFiltered, PaginationComponent } = usePagination(filtered, 8, filters.paginationJobs, handleChangeCurrentPage)

  const steps = [
    {
      selector: ".tour-jobtab",
      content: ({ goTo, inDOM }) => (
        <div>
          <h5
            className="title-upgrade text-center"
            style={{ color: "#93aad6" }}
          >
            Selamat datang di Halaman Daftar Lowongan!
          </h5>
          <p>
            Pada halaman beranda Aikrut, terdapat dua menu utama yaitu 
            Daftar Lowongan dan Daftar Pelamar.
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
      selector: ".tour-joblist",
      content: ({ goTo, inDOM }) => (
        <div>
          <p>
            Halaman Daftar Lowongan menampilkan seluruh 
            lowongan perkerjaan yang pernah di posting.
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
      selector: ".tour-createjob",
      content: ({ goTo, inDOM }) => (
        <div>
          <p>
            Jika anda ingin memposting lowongan pekerjaan baru, 
            silahkan klik tombol ini
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
                  color="netis-color"
                  onClick={() => goTo(3)}
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
      selector: ".tour-filterjob",
      content: ({ goTo, inDOM }) => (
        <div>
          <p>
            Dari seluruh lowongan pekerjaan yang pernah di posting, 
            gunakan filter ini untuk memilih kategori-kategori tertentu yang ingin Anda tampilkan.
          </p>
          <div className="col-12 text-center">
            <Row>
              <div className="col-6 text-center p-0">
                <Button
                  className="mt-2"
                  type="submit"
                  color="netis-color"
                  onClick={() => goTo(2)}
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
                    disableGuideJobList();
                  }}
                >
                  Oke, saya paham
                </Button>
              </div>
            </Row>
          </div>
        </div>
      ),
    }
  ]

  const stepTutor = [
    {
      selector: ".tour-tutorAfter",
      content: ({ goTo, inDOM }) => (
        <div>
          <p>
            Lowongan pekerjaan yang dibuat akan ditampilkan disini.
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
      selector: ".tour-unprocessed",
      content: ({ goTo, inDOM }) => (
        <div>
          <p>
            Pilih tombol ini untuk melihat detail pelamar yang lamarannya belum di proses.
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
      selector: ".tour-accepted",
      content: ({ goTo, inDOM }) => (
        <div>
          <p>
            Pilih tombol ini untuk melihat detail pelamar yang lamarannya sesuai dengan kriteria.
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
                  color="netis-color"
                  onClick={() => goTo(3)}
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
      selector: ".tour-rejected",
      content: ({ goTo, inDOM }) => (
        <div>
          <p>
            Pilih tombol ini untuk melihat detail pelamar yang lamarannya tidak sesuai.
          </p>
          <div className="col-12 text-center">
            <Row>
              <div className="col-6 text-center p-0">
                <Button
                  className="mt-2"
                  type="submit"
                  color="netis-color"
                  onClick={() => goTo(2)}
                >
                  <i className="fa fa-arrow-left mr-2"></i>Sebelumnya
                </Button>
              </div>
              <div className="col-6 text-center p-0">
                <Button
                  className="mt-2"
                  type="submit"
                  color="netis-color"
                  onClick={() => goTo(4)}
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
      selector: ".tour-action",
      content: ({ goTo, inDOM }) => (
        <div>
          <p>
            Tombol-tombol ini dapat digunakan untuk melihat detail, mengedit, 
            menghapus dan menutup lamaran pekerjaan yang dibuat.
          </p>
          <div className="col-12 text-center">
            <Row>
              <div className="col-6 text-center p-0">
                <Button
                  className="mt-2"
                  type="submit"
                  color="netis-color"
                  onClick={() => goTo(3)}
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
                    disableGuideJobTutor();
                  }}
                >
                  Oke, saya paham
                </Button>
              </div>
            </Row>
          </div>
        </div>
      ),
    }
  ]
  const stepTutorMobile = [
    {
      selector: ".tour-mobileAfter",
      content: ({ goTo, inDOM }) => (
        <div>
          <p>
            Lowongan pekerjaan yang dibuat akan ditampilkan disini.
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
      selector: ".tour-mobileStatus",
      content: ({ goTo, inDOM }) => (
        <div>
          <p>
            Pilih tombol ini untuk melihat status detail pelamar.
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
      selector: ".tour-mobileAction",
      content: ({ goTo, inDOM }) => (
        <div>
          <p>
            Tombol-tombol ini dapat digunakan untuk melihat detail, mengededit, 
            menghapus dan menutup lamaran pekerjaan yang dibuat.
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
                    disableGuideJobTutor();
                  }}
                >
                  Oke, saya paham
                </Button>
              </div>
            </Row>
          </div>
        </div>
      ),
    }
  ]

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
          disableGuideJobList();
        }}
    />
    <Tour
        steps={stepTutor}
        accentColor={accentColor}
        showButtons={false}
        rounded={5}
        isOpen={isTutorAfter && !isSmallSize}
        closeWithMask={false}
        disableInteraction={true}
        disableFocusLock={true}
        onAfterOpen={disableBody}
        onBeforeClose={enableBody}
        onRequestClose={() => {
          disableGuideJobTutor();
        }}
    />
    <Tour
        steps={stepTutorMobile}
        accentColor={accentColor}
        showButtons={false}
        rounded={5}
        isOpen={isTutorAfter && isSmallSize}
        closeWithMask={false}
        disableInteraction={true}
        disableFocusLock={true}
        onAfterOpen={disableBody}
        onBeforeClose={enableBody}
        onRequestClose={() => {
          disableGuideJobTutor();
        }}
    />
    {forbidden && <ModalPrivilegeForbidden isOpen={true} forbidden="canManagementJob" isClose={() => setForbidden(false)} />}
    <div className="px-1 mb-5">
      <Row className="menu-dashboard">
        <Col className="mb-3 text-right">
          {privileges.includes("canManagementJob") ?
            <div className={`p-2`}>
              {/* <h4 className="d-inline mr-3">Daftar Lowongan</h4> */}
              <Link to={"/dashboard/vacancies/create"} className={`btn btn-sm btn-netis-primary px-4 py-2 scale-div  ${!isSmallSize ? 'tour-createjob' : ``}`} style={{ borderRadius: "8px" }}>
                <i className="fa fa-plus mr-2"></i>
                {t("buatlowonganbaru")}
              </Link>
            </div>
          :
          <div className={`p-2`}>
            <Button onClick={() => setForbidden(true)} className={`btn btn-sm btn-netis-primary px-4 py-2 scale-div  ${!isSmallSize ? 'tour-createjob' : ``}`} style={{ borderRadius: "8px" }}>
              <i className="fa fa-plus mr-2"></i>
              {t("buatlowonganbaru")}
            </Button>
          </div>
        }
          <hr />
        </Col>
        <Col sm="12">
          <Row>
            <Col sm="3" style={{ paddingRight: 10 }} className={!isSmallSize ? 'tour-filterjob' : ''}>
              <RecruitmentListFilters />
            </Col>
            <Col sm="9" className={!isSmallSize ? 'tour-joblist' : ''}>
              {loading ?
                <SkeletonRecruitmentMenu />
                :
                <RecruitmentLists can={can} data={groupFiltered} filteredData={filtered} Pagination={PaginationComponent} filters={filters} onDeleteClick={handleDeleteClick} onUpdateClick={handleUpdateClick} jobAfterTutor={jobAfterTutor} publish={(myBalance || !isExpired) ? true : false} />
              }
            </Col>
          </Row>
        </Col>
      </Row>
      <div className="menu-mobile">
        <Row className={`mb-3 ${isSmallSize ? `tour-filterjob` : ``}`}>
          <Col xs="9">
            <SearchJobNameFilters />
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
        {loading ?
          <SkeletonRecruitmentMenu />
          :
          <RecruitmentListsMobile can={can} data={groupFiltered} filteredData={filtered} Pagination={PaginationComponent} filters={filters} onDeleteClick={handleDeleteClick} jobAfterTutor={jobAfterTutor} onUpdateClick={handleUpdateClick} publish={(myBalance || !isExpired) ? true : false} />
        }
      </div>
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
          <RecruitmentListModalFilters />
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

      {/* Delete Job */}
      <Modal
        isOpen={!!deletingId}
        toggle={() => {
          if (!deleteLoading) {
            setDeletingId(null);
          }
        }}
      >
        <ModalBody>
          <h6>{t("yakinmenghapus")}</h6>
          <div className="d-flex justify-content-end mt-3">
            {!deleteLoading && (
              <Button
                className="mr-2"
                color="light"
                onClick={() => setDeletingId(null)}
              >
                {t("batal")}
              </Button>
            )}
            <Button
              color="netis-primary"
              onClick={doDelete}
              disabled={deleteLoading}
            >
              {deleteLoading ? (
                <React.Fragment>
                  <Spinner size="sm" color="light" /> menghapus...
                </React.Fragment>
              ) : (
                  t("hapus")
                )}
            </Button>
          </div>
        </ModalBody>
      </Modal>

      {/* Update Status */}
      <Modal
        isOpen={updateId[0] ? true : false}
        toggle={() => {
          if (!updateLoading) {
            setUpdateId([]);
          }
        }}
      >
        <ModalBody>
          <h6>
            {
              updateId[1] === "repost" ?
                "Apakah anda yakin akan mempublikasikan kembali lowongan ini?" :
                updateId[1] === "publish" ?
                  "Apakah anda yakin akan mempublikasikan kembali lowongan ini?" :
                  "Apakah anda yakin akan menutup lowongan ini?"
            }
          </h6>
          <div className="d-flex justify-content-end mt-3">
            {!updateLoading && (
              <Button
                className="mr-2"
                color="light"
                onClick={() => setUpdateId([])}
              >
                {t("batal")}
              </Button>
            )}
            <Button
              color="netis-primary"
              onClick={doUpdate}
              disabled={updateLoading}
            >
              {updateLoading ? (
                <>
                  <Spinner size="sm" color="light" /> Merubah...
                </>
              ) : (
                  t("ubah")
                )}
            </Button>
          </div>
        </ModalBody>
      </Modal>

    </div>
    </>
  );
}

const RecruitmentLists = memo(({ data = [], Pagination, onDeleteClick, onUpdateClick, publish, filteredData, can, jobAfterTutor }) => {
  const today = new Date();
  const momentToday = moment(today).format("YYYY-MM-DD");
  const isSmallSize = useMediaQuery({ query: '(max-width: 768px)' })
  const [forbidden, setForbidden] = useState(false)

  return (
    <>
    {forbidden && <ModalPrivilegeForbidden isOpen={true} forbidden="canManagementJob" isClose={() => setForbidden(false)} />}
      {
        data.length > 0 ?
          data.map((data, idx) => (
            <Card key={data.id} className={`shadow-sm border-0 ${(idx === 0 && !isSmallSize && jobAfterTutor) ? `tour-tutorAfter` : ``}`}>
              <CardBody>
                <Row>
                  <Col sm md="6">
                    {data.expiredAt !== null && data.published ? (
                      <div>
                        <h5 className="d-inline text-capitalize">
                          {data.name}
                        </h5>
                        <Badge color="light" className="ml-2" style={{ fontSize: "9pt", fontWeight: 400 }}>
                          {moment(momentToday).isSameOrAfter(data.expiredAt, "day") ? (
                            <p
                              className="text-danger"
                              style={{ display: "inline" }}
                            >
                              {" "}Kadaluarsa
                            </p>
                          ) : (
                              <p
                                className="text-dark"
                                style={{ display: "inline" }}
                              >
                                {" "}Berlaku hingga{" "}
                                {moment(data.expiredAt)?.format("DD MMM YYYY")}
                              </p>
                            )}
                        </Badge>
                      </div>
                    ) : (
                        <div>
                          <h5 style={{ display: "inline" }}>
                            {data.name.toUpperCase()}
                          </h5>
                          <Badge color="light" className="ml-2" style={{ fontSize: "9pt", fontWeight: 400 }}>
                            {data.expiredAt ? (
                              <p className="text-warning" style={{ display: "inline" }}>
                                Ditutup
                              </p>
                            ) : (
                                <p style={{ display: "inline", color: '#A2A2A2' }} >
                                  Draft
                                </p>
                              )}
                          </Badge>
                        </div>
                      )}
                    <small className="text-muted"><i className="fa fa-clock-o"></i> {data.type}</small>
                    <br /><br />
                    <div className={(idx === 0 && !isSmallSize && jobAfterTutor) ? 'tour-action' : ''}>
                    <a
                      href={data.skillanaURL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        style={{ border: 0 }}
                        className="btn bg-transparent btn-sm mr-1 mt-1"
                      >
                        <i className="fa fa-eye"></i> Lihat
                      </Button>
                    </a>
                    {can('canManagementJob') ?
                      <Link to={`/dashboard/vacancies/${data.id}/edit`}>
                        <Button
                          style={{ border: 0 }}
                          className="btn bg-transparent btn-sm mr-1 mt-1"
                          >
                          <i className="fa fa-pencil"></i> Edit
                        </Button>
                      </Link>
                      :
                      <Button
                          onClick={() => setForbidden(true)}
                          style={{ border: 0 }}
                          className="btn bg-transparent btn-sm mr-1 mt-1"
                          >
                          <i className="fa fa-pencil"></i> Edit
                        </Button>
                    }
                    <Button
                      style={{ border: 0 }}
                      className="btn bg-transparent btn-sm mx-1 mt-1"
                      onClick={() => {
                        if(can('canManagementJob')){
                          onDeleteClick(data.id)
                        }
                        else {
                          setForbidden(true)
                        }
                      }}
                    >
                      <i className="fa fa-trash-o"></i> {t("hapus")}
                    </Button>
                    {data.expiredAt !== null && data.published ? (
                      <div style={{ display: "inline" }}>
                        {moment(momentToday).isSameOrAfter(data.expiredAt, "day")
                          ? (
                            !publish ?
                              <ModalTokenNull icon="fa-refresh" text="Repost" />
                              :
                              <Button
                                style={{ border: 0 }}
                                className="btn bg-transparent btn-sm mx-1 mt-1"
                                onClick={() => onUpdateClick([data.id, "repost"])}
                              >
                                <p
                                  // className="text-info"
                                  style={{ display: "inline" }}
                                >
                                  <i className="fa fa-refresh"></i> Repost
                              </p>
                              </Button>
                          ) : (
                            <Button
                              style={{ border: 0 }}
                              className="btn bg-transparent btn-sm mx-1 mt-1"
                              onClick={() => onUpdateClick([data.id, "tutup"])}
                            >
                              <p
                                // className="text-danger"
                                style={{ display: "inline" }}
                              >
                                <i className="fa fa-window-close"></i> Tutup
                              </p>
                            </Button>
                          )}
                      </div>
                    ) : (
                        <div style={{ display: "inline" }}>
                          {!publish ?
                            <ModalTokenNull icon={data.expiredAt ? "fa fa-repeat" : "fa fa-bullhorn"} text={data.expiredAt ? "Reopen" : "Publish"} />
                            :
                            <Button
                              style={{ border: 0 }}
                              className="btn bg-transparent btn-sm mx-1 mt-1"
                              onClick={() => onUpdateClick([data.id, "publish"])}
                              disabled={!publish}
                            >
                              <p
                                // className="text-success"
                                style={{ display: "inline" }}
                              >
                                <i className={data.expiredAt ? "fa fa-repeat" : "fa fa-bullhorn"}></i> {data.expiredAt ? "Reopen" : "Publish"}
                              </p>
                            </Button>
                          }
                        </div>
                      )}


                    </div>
                  </Col>
                  <Col sm md="6" className="text-center">
                    <Link
                      to={`/dashboard/vacancies/${data.id}/applicants?status=unprocessed`}
                      // state={data}
                      className={`btn text-wrap btn-outline-netis-primary mr-2 my-1 text-capitalize btn-job-applicant-status ${(idx === 0 && !isSmallSize && jobAfterTutor) ? `tour-unprocessed` : ``}`}
                    >
                      <h5 className="mb-0">{data.unprocessedApplicantCount}</h5>
                      {t("belumproses")}
                    </Link>
                    <Link
                      to={`/dashboard/vacancies/${data.id}/applicants?status=accepted`}
                      className={`btn text-wrap btn-outline-success mr-2 my-1 text-capitalize btn-job-applicant-status ${(idx === 0 && !isSmallSize && jobAfterTutor) ? `tour-accepted` : ``}`}
                    >
                      <h5 className="mb-0">{data.acceptedApplicantCount}</h5>
                      {t("sesuai")}
                    </Link>
                    <Link
                      to={`/dashboard/vacancies/${data.id}/applicants?status=rejected`}
                      className={`btn text-wrap btn-outline-danger mr-2 my-1 text-capitalize btn-job-applicant-status ${(idx === 0 && !isSmallSize && jobAfterTutor) ? `tour-rejected` : ``}`}
                    >
                      <h5 className="mb-0">{data.rejectedApplicantCount}</h5>
                      {t("tidaksesuai")}
                    </Link>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          ))
          : <DataNotFound />
      }
      {filteredData.length > 8 ? <Pagination /> : ''}
    </>
  )
})

const RecruitmentListsMobile = memo(({ data = [], Pagination, onDeleteClick, can, onUpdateClick, publish, filteredData, jobAfterTutor }) => {
  const today = new Date();
  const momentToday = moment(today).format("YYYY-MM-DD");
  const isSmallSize = useMediaQuery({ query: '(max-width: 768px)' })
  const [forbidden, setForbidden] = useState(false)

  return (
    <div className={isSmallSize ? 'tour-joblist' : ''}>
      {forbidden && <ModalPrivilegeForbidden isOpen={true} forbidden="canManagementJob" isClose={() => setForbidden(false)} />}
      <FloatingButtonJob forbidden={!can('canManagementJob')} />
      {
        data.length > 0 ?
          data.map((data, idx) => (
            <Card key={idx} className={`shadow border-0 ${(isSmallSize && idx === 0 && jobAfterTutor) ? `tour-mobileAfter` : ``}`} style={{ borderRadius: "10px" }}>
              <div className="recruitment-label text-center" style={data.status === "published" ? { backgroundColor: "#335877" } : { backgroundColor: "#bfbfbf" }}>
                {data.status === "published" ?
                  <span style={{ color: "#fff" }}>Berlaku hingga {moment(data.expiredAt)?.format("DD MMM YYYY")}</span>
                  :
                  <span className="text-capitalize" style={data.status === "draft" ? { color: "#655c5c" } :
                    data.status === "expired" ? { color: "#ff0000" } :
                      { color: "#fdec13" }
                  }>
                    {t(data.status)}
                  </span>
                }
              </div>
              <CardBody className="text-center">
                <i className="fa fa-4x fa-briefcase job-icon mb-2" /><br />
                <strong className="text-capitalize" style={{ fontSize: 18, color: "#335877" }}><b>{data.name} - </b></strong>
                <small className="text-muted">{data.type}</small><br />
                {data.acceptedApplicantCount + data.rejectedApplicantCount + data.unprocessedApplicantCount}
                      &nbsp;pelamar<br />
                <div className={(isSmallSize && jobAfterTutor && idx === 0) ? 'tour-mobileAction' : ''}>
                <a
                  href={data.skillanaURL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    style={{ border: 0 }}
                    className="btn bg-transparent btn-sm mr-1 mt-1"
                  >
                    <i className="fa fa-eye"></i> Lihat
                        </Button>
                </a>
                {can('canManagementJob') ?
                  <Link to={`/dashboard/vacancies/${data.id}/edit`}>
                    <Button
                      style={{ border: 0 }}
                      className="btn bg-transparent btn-sm mr-1 mt-1"
                      >
                      <i className="fa fa-pencil"></i> Edit
                          </Button>
                  </Link>
                  :
                  <Button
                      onClick={() => setForbidden(true)}
                      style={{ border: 0 }}
                      className="btn bg-transparent btn-sm mr-1 mt-1"
                  >
                      <i className="fa fa-pencil"></i> Edit
                  </Button>
                }
                <Button
                  style={{ border: 0 }}
                  className="btn bg-transparent btn-sm mx-1 mt-1"
                  onClick={() => {
                    if(can('canManagementJob')){
                      onDeleteClick(data.id)
                    }
                    else {
                      setForbidden(true)
                    }
                  }}
                >
                  <i className="fa fa-trash-o"></i> {t("hapus")}
                </Button>
                {data.expiredAt !== null && data.published ? (
                  <div style={{ display: "inline" }}>
                    {moment(momentToday).isSameOrAfter(data.expiredAt, "day")
                      ? (
                        !publish ?
                          <ModalTokenNull icon="fa-refresh" text="Repost" />
                          :
                          <Button
                            style={{ border: 0 }}
                            className="btn bg-transparent btn-sm mx-1 mt-1"
                            onClick={() => onUpdateClick([data.id, "repost"])}
                            disabled={publish}
                          >
                            <p
                              // className="text-info"
                              style={{ display: "inline" }}
                            >
                              <i className="fa fa-refresh"></i> Repost
                                </p>
                          </Button>
                      ) : (
                        <Button
                          style={{ border: 0 }}
                          className="btn bg-transparent btn-sm mx-1 mt-1"
                          onClick={() => onUpdateClick([data.id, "tutup"])}
                        >
                          <p
                            // className="text-danger"
                            style={{ display: "inline" }}
                          >
                            <i className="fa fa-window-close"></i> Tutup
                                </p>
                        </Button>
                      )}
                  </div>
                ) : (
                    <div style={{ display: "inline" }}>
                      {!publish ?
                        <ModalTokenNull icon={data.expiredAt ? "fa fa-repeat" : "fa fa-bullhorn"} text={data.expiredAt ? "Reopen" : "Publish"} />
                        :
                        <Button
                          style={{ border: 0 }}
                          className="btn bg-transparent btn-sm mx-1 mt-1"
                          onClick={() => onUpdateClick([data.id, "publish"])}
                          disabled={!publish}
                        >
                          <p
                            // className="text-success"
                            style={{ display: "inline" }}
                          >
                            <i className={`fa ${data.expiredAt ? "fa fa-repeat" : "fa fa-bullhorn"}`}></i>{" "}
                            {data.expiredAt ? "Reopen" : "Publish"}
                          </p>
                        </Button>
                      }
                    </div>
                  )}
                </div>
                <br />
                <Link
                  to={`/dashboard/vacancies/${data.id}/applicants?status=unprocessed`}
                  className={`btn btn-netis-color mt-2 ${(isSmallSize && jobAfterTutor && idx === 0) ? `tour-mobileStatus` : ``}`}
                >
                  Selengkapnya &nbsp; <i className="fa fa-arrow-right" />
                </Link>
              </CardBody>
            </Card>
          ))
          : <DataNotFound />
      }
      {filteredData.length > 8 ? <Pagination /> : ''}
    </div>
  )
})

const ModalTokenNull = memo(({ text, btnColor, className, icon }) => {
  const [modalTokenNull, setModalTokenNull] = useState(false);

  const toggle = () => {
    setModalTokenNull(!modalTokenNull)
  }

  return (
    <>
      <Button
        style={{ border: 0 }}
        className={`btn bg-transparent btn-sm mx-1 mt-1 ${className}`}
        onClick={toggle}
      >
        <p
          style={{ display: "inline" }}
        >
          <i className={`fa ${icon}`}></i> {text}
        </p>
      </Button>
      <Modal isOpen={modalTokenNull} style={{ marginTop: "40vh" }}>
        <ModalHeader className=" text-center border-bottom-0">
          Peringatan
        </ModalHeader>
        <ModalBody className="text-center">
          Anda tidak bisa melakukan publish lowongan (publish, reopen, repost) dikarenakan token anda habis. Harap segera isi token anda untuk menggunakan fitur tersebut.
            <br />
          <div className="d-flex justify-content-center mx-auto text-center mt-2" style={{ width: "60%" }}>
            <Button
              className="button-token"
              onClick={() => {
                setModalTokenNull(false)
              }}
            >
              Mengerti
                </Button>
          </div>
        </ModalBody>
      </Modal>
    </>
  )
})
export default translate(RecruitmentMenu);
