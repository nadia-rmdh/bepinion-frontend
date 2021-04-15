import React, { useState, useEffect, useMemo } from "react";
import { Button, Form, Input, Label, Row, Col, CustomInput, Spinner, Modal, ModalBody, ModalHeader } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouteMatch } from "react-router-dom";
import Loading from "../../../components/LoadingAnimation";
import DataNotFound from "../../../components/DataNotFound";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import request from "../../../utils/request";
import { toast } from "react-toastify";
import { t, translate } from "react-switch-lang";
import NumberFormat from "react-number-format";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { draftToMarkdown, markdownToDraft } from "markdown-draft-js";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import * as moment from "moment";
import { useBalance } from "../../../hooks/useBalance";

const education = [
  { value: 'sd', label: 'SD' },
  { value: 'smp', label: 'SMP' },
  { value: 'sma', label: 'SMA/SMK' },
  { value: 'd1', label: t('d1') },
  { value: 'd2', label: t('d2') },
  { value: 'd3', label: 'D3' },
  { value: 'd4', label: 'D4' },
  { value: 's1', label: 'S1' },
  { value: 's2', label: 'S2' },
  { value: 's3', label: 'S3' }
];

function RecruitmentDetail(props) {
  const { loading, data } = useBalance();
  const myBalance = useMemo(() => data?.balance ?? 0, [data])
  const isExpired = useMemo(() => data?.isExpired, [data])

  const [notFound, setNotFound] = useState(false);
  const [btnReopen, setBtnReopen] = useState(false);
  const [btnAkhiri, setAkhiri] = useState(false);
  const [btnRepost, setRepost] = useState(false);
  const matchRoute = useRouteMatch();
  const [province, setProvince] = useState([]);
  const [city, setCity] = useState([]);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const editorStateChange = (changeEditorState) => {
    setEditorState(changeEditorState);
    formik.setFieldValue(
      "description",
      draftToMarkdown(convertToRaw(changeEditorState.getCurrentContent()))
    );
  };
  const [editDetail, setEditDetail] = useState(true);
  const [modalTokenNull, setModalTokenNull] = useState(false);
  const momentToday = moment().format("YYYY-MM-DD");

  const toggle = () => {
    setModalTokenNull(!modalTokenNull)
  }

  const ValidationFormSchema = useMemo(() => {
    return Yup.object().shape({
      minSalary: Yup.number().required().label("gaji minimal"),
      maxSalary: Yup.number()
        .min(
          Yup.ref("minSalary"),
          t("gaji maksimal harus lebih besar dari gaji minimal")
        )
        .required()
        .label("gaji maksimal"),
    });
  }, []);

  const {
    values,
    touched,
    errors,
    isSubmitting,
    setValues,
    ...formik
  } = useFormik({
    initialValues: {
      name: "",
      type: [],
      provinceId: "",
      cityId: "",
      minSalary: "",
      maxSalary: "",
      showSalary: false,
      minEducation: [],
      major: "",
      minYearExperience: "",
      description: "",
      skills: [],
      expiredAt: "",
      published: false,
    },
    validationSchema: ValidationFormSchema,
    onSubmit: (values, { setSubmitting, setErrors }) => {
      setSubmitting(true);
      request
        .put(`v1/recruitment/vacancies/${matchRoute.params.id}`, {
          name: values.name,
          type: values.type.value,
          provinceId: values.provinceId.value,
          cityId: values.cityId.value,
          minSalary: values.minSalary,
          maxSalary: values.maxSalary,
          major: values.major,
          showSalary: values.showSalary,
          minEducation: values.minEducation.value,
          minYearExperience: values.minYearExperience.value,
          description: values.description,
          skills: values.skills,
          expiredAt: values.expiredAt,
          published: values.published,
        })
        .then((res) => {
          toast.success("Lowongan berhasil diubah");
          props.history.goBack();
        })
        .catch((err) => {
          if (err.response?.status === 422) {
            setErrors(err.response.data.errors);
            return;
          }
          Promise.reject(err);
        })
        .finally(() => setSubmitting(false));
    },
  });

  useEffect(() => {
    request
      .get(`v1/recruitment/vacancies/${matchRoute.params.id}`)
      .then((response) => {
        var data = response.data.data;
        setValues({
          name: data.name,
          type: { label: data.type, value: data.type },
          provinceId: { value: data.province.id, label: data.province.name },
          cityId: { value: data.city.id, label: data.city.name },
          minSalary: data.minSalary,
          maxSalary: data.maxSalary,
          major: data.major,
          showSalary: data.showSalary,
          minEducation: { label: data.minEducation, value: data.minEducation },
          minYearExperience: {
            label: data.minYearExperience,
            value: data.minYearExperience,
          },
          description: data.description,
          skills: data.skills,
          expiredAt: data.expiredAt,
          published: data.published,
        });
        request
          .get(`v1/location/cities?provinceId=${data.province.id}`)
          .then((res) => {
            setCity(res.data.data);
          });
        const draftContent = convertFromRaw(markdownToDraft(data.description));
        setEditorState(EditorState.createWithContent(draftContent));
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          setNotFound(true);
        } else {
          toast.error("terjadikesalahan");
          setNotFound(true);
        }
      })
    // .finally(() => setLoading(false));
  }, [matchRoute.params.id, setValues]);

  useEffect(() => {
    request
      .get("v1/location/provinces?countryId=1")
      .then((res) => {
        setProvince(res.data.data);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          setNotFound(true);
        }
      })
    // .finally(() => setLoading(false));
  }, []);

  const options = [
    { value: "Full-time", label: "Full-Time" },
    { value: "Part-time", label: "Part-Time" },
    { value: "Kontrak", label: t("kontrak") },
    { value: "Freelance", label: "Freelance" },
    { value: "Magang", label: t("magang") },
  ];

  const experience = [
    { value: 0, label: "Fresh Graduate" },
    { value: 1, label: t("1tahun") },
    { value: 2, label: t("2tahun") },
    { value: 3, label: t("3tahun") },
    { value: 4, label: t("4tahun") },
    { value: 5, label: t("5tahunlebih") },
  ];

  const country = [{ value: 1, label: "Indonesia" }];

  const changeJenisKerja = function (pilihan) {
    formik.setFieldValue("type", pilihan);
    formik.setFieldTouched("type", true);
  };

  const prov = province.map((province) => ({
    value: province.id,
    label: province.name,
  }));

  const changeProvince = function (province) {
    request
      .get(`v1/location/cities?provinceId=${province.value}`)
      .then((res) => {
        setCity(res.data.data);
      });
    formik.setFieldValue("provinceId", province);
    formik.setFieldValue("cityId", null);
    formik.setFieldTouched("provinceId", true);
  };

  const kota = city.map((city) => ({ value: city.id, label: city.name }));

  const changeCity = function (city) {
    formik.setFieldValue("cityId", city);
    formik.setFieldTouched("cityId", true);
  };

  const changeCountry = function (country) {
    formik.setFieldValue("country", country);
    formik.setFieldTouched("country", true);
  };

  const changePendidikan = function (edu) {
    formik.setFieldValue("minEducation", edu);
    formik.setFieldTouched("minEducation", true);
  };

  const changeExperience = function (edu) {
    formik.setFieldValue("minYearExperience", edu);
    formik.setFieldTouched("minYearExperience", true);
  };

  if (loading) {
    return <Loading />;
  }
  if (notFound) {
    return <DataNotFound />;
  }

  function edit() {
    setEditDetail(false);
  }

  function batal() {
    setEditDetail(true);
  }

  function akhiri() {
    setAkhiri(true);
    request
      .put(`v1/recruitment/vacancies/${matchRoute.params.id}`, {
        published: false,
      })
      .then((res) => {
        toast.success("Berhasil menutup lowongan.");
        props.history.goBack();
      })
      .catch((err) => {
        setAkhiri(false);
        if (err.response?.status === 422) {
          toast.error("Gagal");
        }
        Promise.reject(err);
      })
    // .finally(() => setLoading(false));
  }

  function reopen() {
    setBtnReopen(true);
    request
      .put(`v1/recruitment/vacancies/${matchRoute.params.id}`, {
        published: true,
      })
      .then((res) => {
        props.history.goBack();
        toast.success("Lowongan berhasil dibuka kembali");
      })
      .catch((err) => {
        setBtnReopen(false);
        if (err.response?.status === 422) {
          toast.error("Gagal");
        }
        Promise.reject(err);
      })
    // .finally(() => setLoading(false));
  }

  function repost() {
    setRepost(true);
    request
      .put(`v1/recruitment/vacancies/renew/${matchRoute.params.id}`, {
        published: true,
      })
      .then((res) => {
        props.history.goBack();
        toast.success("Lowongan berhasil dibuka kembali");
      })
      .catch((err) => {
        setRepost(false);
        if (err.response?.status === 422) {
          toast.error("Gagal");
        }
        Promise.reject(err);
      })
    // .finally(() => setLoading(false));
  }

  return (
    <div className="animated fadeIn d-flex flex-column bd-highlight mb-3 p-4">
      <div className="bd-highlight mb-4">
        {/* <Button onClick={props.history.goBack} color="netis-color">
          <i className="fa fa-chevron-left mr-1"></i>
          {t("kembali")}
        </Button> */}

        <h4>Detail Lowongan Pekerjaan</h4>
        <hr />
      </div>
      <Form onSubmit={formik.handleSubmit}>
        <div className="row">
          <div className="col-md-2 mb-2">
            <h5>{t("Publikasi")}</h5>
          </div>
          <div className="col-sm-12 col-md-10">
            <Row form>
              <Col xs="12">
                {values.expiredAt !== null && values.published ? (
                  moment(momentToday).isSameOrAfter(values.expiredAt, "day") ? (
                    (!myBalance || isExpired) ?
                      <Button
                        className="mr-2 mb-2"
                        color="netis-primary"
                        onClick={toggle}
                      >
                        <i className="fa fa-refresh"></i>&nbsp;&nbsp;
                        Repost
                      </Button>
                      :
                      <Button color="netis-primary" onClick={() => repost()}
                        disabled={btnRepost}
                      >
                        {btnRepost ? (
                          <Spinner color="light" size="sm" />
                        ) : (
                            <>
                              <i className="fa fa-refresh"></i> Repost
                            </>
                          )}
                      </Button>
                  ) : (
                      <Button
                        color="danger"
                        className="btn btn-danger"
                        onClick={() => akhiri()}
                        disabled={btnAkhiri}
                      >
                        {btnAkhiri ? (
                          <Spinner color="light" size="sm" />
                        ) : (
                            <span>
                              <i className="fa fa-window-close mr-2"></i> Tutup
                            </span>
                          )}
                      </Button>
                    )
                ) : (
                    (!myBalance || isExpired) ?
                      <Button
                        className="mr-2 mb-2"
                        color="success"
                        onClick={toggle}
                      >
                        <i className={values.expiredAt ? "fa fa-repeat" : "fa fa-bullhorn"}></i>&nbsp;&nbsp;
                        {values.expiredAt ? "Reopen" : "Publish"}
                      </Button>
                      :
                      <Button
                        color="success"
                        className="btn btn-success"
                        onClick={() => reopen()}
                        disabled={btnReopen}
                      >
                        {btnReopen ? (
                          <Spinner color="light" size="sm" />
                        ) : (
                            <span>
                              <i className={values.expiredAt ? "fa fa-repeat" : "fa fa-bullhorn"}></i>&nbsp;&nbsp;
                              {values.expiredAt ? "Reopen" : "Publish"}
                            </span>
                          )}
                      </Button>
                  )}
              </Col>
            </Row>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-12">
            {editDetail ? (
              <Button
                color="netis-color"
                className="btn-netis-color pull-right"
                onClick={() => edit()}
              >
                <i className="fa fa-pencil mr-2"></i>Edit
              </Button>
            ) : (
                <Button
                  color="white"
                  className="btn-white pull-right"
                  onClick={() => batal()}
                >
                  {t("batal")}
                </Button>
              )}
          </div>
          <div className="col-md-2">
            <h5>{t("detailpekerjaan")}</h5>
          </div>
          <div className="col-sm-12 col-md-10">
            <Row form>
              <Col xs="12" className="mb-2">
                <Label htmlFor="name" className="input-label">
                  {t("Posisi")} <span className="required">*</span>
                </Label>
                <Input
                  type="input"
                  value={values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="name"
                  id="name"
                  required
                  maxLength="255"
                  placeholder={t("namapekerjaan")}
                  className="form-control needs-validation"
                  disabled={editDetail}
                />
              </Col>

              <Col xs="12" className="mb-2">
                <Label htmlFor="type" className="input-label">
                  {t("Status Kepegawaian")} <span className="required">*</span>
                </Label>
                <Select
                  isSearchable={false}
                  isClearable={true}
                  name="type"
                  id="type"
                  onChange={changeJenisKerja}
                  onBlur={formik.handleBlur}
                  value={values.type}
                  options={options}
                  className="needs-validation"
                  required
                  isDisabled={editDetail}
                />
              </Col>

              <Col xs="12" className="mb-2">
                <Label htmlFor="country" className="input-label">
                  {t("Negara")}
                </Label>
                <Select
                  isSearchable={false}
                  name="country"
                  id="country"
                  onChange={changeCountry}
                  onBlur={formik.handleBlur}
                  value={country[0]}
                  options={country}
                  defaultValue={country[0]}
                  isDisabled={editDetail}
                />
              </Col>

              <Col xs="6" className="mb-2">
                <Label htmlFor="provinceId" className="input-label">
                  {t("Provinsi")}
                  <span className="required">*</span>
                </Label>
                <Select
                  isSearchable={true}
                  name="provinceId"
                  id="provinceId"
                  onChange={changeProvince}
                  onBlur={formik.handleBlur}
                  options={prov}
                  value={values.provinceId}
                  className="needs-validation"
                  required
                  isDisabled={editDetail}
                />
              </Col>

              <Col xs="6" className="mb-2">
                <Label htmlFor="cityId" className="input-label">
                  {t("Kota")}
                  <span className="required">*</span>
                </Label>
                <Select
                  isSearchable={true}
                  name="cityId"
                  id="cityId"
                  onChange={changeCity}
                  onBlur={formik.handleBlur}
                  options={kota}
                  value={values.cityId}
                  className="needs-validation"
                  required
                  isDisabled={editDetail}
                />
              </Col>

              <Col xs="6" className="mb-2">
                <Label htmlFor="minSalary" className="input-label">
                  {t("Gaji Minimal")}
                  <span className="required">*</span>
                </Label>
                <NumberFormat
                  // thousandSeparator={'.'}
                  // decimalSeparator={','}
                  // prefix={'Rp '}
                  name="minSalary"
                  id="minSalary"
                  allowNegative={false}
                  onChange={formik.handleChange}
                  value={values.minSalary}
                  className="form-control needs-validation"
                  required
                  disabled={editDetail}
                />
                {touched.minSalary && errors.minSalary && (
                  <small className="text-danger">{errors.minSalary}</small>
                )}
              </Col>

              <Col xs="6" className="mb-2">
                <Label htmlFor="maxSalary" className="input-label">
                  {t("Gaji Maksimal")}
                  <span className="required">*</span>
                </Label>
                <NumberFormat
                  // thousandSeparator={'.'}
                  // decimalSeparator={','}
                  // prefix={'Rp '}
                  // invalid={Boolean(touched.maxSalary && errors.maxSalary)}
                  name="maxSalary"
                  id="maxSalary"
                  allowNegative={false}
                  onChange={formik.handleChange}
                  value={values.maxSalary}
                  className="form-control needs-validation"
                  required
                  disabled={editDetail}
                />
                {touched.maxSalary && errors.maxSalary && (
                  <small className="text-danger">{errors.maxSalary}</small>
                )}
              </Col>
              <Col xs="6">
                <CustomInput
                  className="ml-1"
                  label={t("Tampilkan Gaji")}
                  id="showSalary"
                  name="showSalary"
                  type="checkbox"
                  checked={values.showSalary}
                  onChange={(event) =>
                    formik.setFieldValue("showSalary", event.target.checked)
                  }
                  disabled={editDetail}
                />
              </Col>
              {/* <small><i>
                                <span className="required">*</span>
                                {t('tandaigaji')}
                            </i></small> */}
            </Row>
          </div>
        </div>

        <>
          <hr />
        </>

        <div className="row">
          <div className="col-md-2">
            <h5>{t("persyaratanpekerjaan")}</h5>
          </div>
          <div className="col-sm-12 col-md-10">
            <Row form>
              <Col xs="6" className="mb-2">
                <Label htmlFor="minEducation" className="input-label">
                  {t("pendidikanminimal")}
                  <span className="required">*</span>
                </Label>
                <Select
                  styles={{
                    menu: (provided) => ({ ...provided, zIndex: 9999 }),
                  }}
                  isSearchable={false}
                  name="minEducation"
                  id="minEducation"
                  onChange={changePendidikan}
                  onBlur={formik.handleBlur}
                  value={education.find(
                    (edu) => edu.value === values.minEducation.value
                  )}
                  options={education}
                  className="needs-validation"
                  required
                  isDisabled={editDetail}
                />
              </Col>
              <Col xs="6" className="mb-2">
                <Label htmlFor="major" className="input-label">
                  {t("Jurusan")}
                </Label>
                <Input
                  type="input"
                  value={values.major}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="major"
                  id="major"
                  maxLength="255"
                  disabled={editDetail}
                />
              </Col>
              <Col xs="12" className="mb-2">
                <Label htmlFor="minYearExperience" className="input-label">
                  {t("Minimal Pengalaman")}
                </Label>
                {/* <NumberFormat
                                suffix={' tahun'}
                                allowNegative={false}
                                name="minYearExperience"
                                id="minYearExperience"
                                onChange={formik.handleChange}
                                value={values.minYearExperience}
                                className="form-control"
                            /> */}
                <Select
                  styles={{
                    menu: (provided) => ({ ...provided, zIndex: 9999 }),
                  }}
                  isSearchable={false}
                  name="minYearExperience"
                  id="minYearExperience"
                  onChange={changeExperience}
                  onBlur={formik.handleBlur}
                  // value={values.minYearExperience}
                  value={experience.find(
                    (ex) => ex.value === values.minYearExperience.value
                  )}
                  options={experience}
                  isDisabled={editDetail}
                />
              </Col>

              <Col xs="12" className="mb-2">
                <Label htmlFor="skills" className="input-label">
                  {t("keterampilan")}
                </Label>
                <CreatableSelect
                  components={{ DropdownIndicator: null }}
                  isClearable
                  isMulti
                  menuIsOpen={false}
                  value={values.skills?.map((skill) => ({
                    label: skill,
                    value: skill,
                  }))}
                  onChange={(newValues) =>
                    formik.setFieldValue(
                      "skills",
                      newValues ? newValues.map((item) => item.value) : []
                    )
                  }
                  isDisabled={editDetail}
                />
                <small className="text-form text-muted d-block">
                  {t("contoh")}: Excel, Programming
                </small>
              </Col>
            </Row>
          </div>
        </div>

        <>
          <hr />
        </>

        <div className="row">
          <div className="col-md-2">
            <h5>{t("deskripsipekerjaan")}</h5>
          </div>
          <div className="col-sm-12 col-md-10">
            <Row form>
              <Col xs="12" className="mb-2">
                <div className="editor">
                  <Editor
                    editorState={editorState}
                    value={values.description}
                    editorClassName="border p-2 rounded"
                    onEditorStateChange={editorStateChange}
                    editorStyle={{ height: 200 }}
                    toolbar={{
                      options: ["inline", "list"],
                      inline: {
                        inDropdown: false,
                        options: ["bold", "italic", "underline"],
                      },
                      list: {
                        inDropdown: false,
                        options: ["unordered", "ordered"],
                      },
                    }}
                    readOnly={editDetail}
                  />
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            {!editDetail ? (
              <Button
                className="float-right mr-1"
                type="submit"
                color="netis-primary"
              >
                {t("simpan")}
              </Button>
            ) : null}
          </div>
        </div>
      </Form>
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
    </div>
  );
}

export default translate(RecruitmentDetail);
