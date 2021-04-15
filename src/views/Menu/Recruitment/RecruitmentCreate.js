import React, { useState, useEffect, useMemo, useRef } from "react";
import { Button, Form, Input, Label, Row, Col, CustomInput, Spinner } from "reactstrap";
import { useFormik } from 'formik';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import request from "../../../utils/request";
import { toast } from 'react-toastify';
import NumberFormat from 'react-number-format';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import * as Yup from 'yup';
import { draftToMarkdown, markdownToDraft } from 'markdown-draft-js';
import LoadingAnimation from '../../../components/LoadingAnimation';
import DataNotFound from '../../../components/DataNotFound';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { t, translate } from 'react-switch-lang';
import * as moment from "moment";
import Modal from "reactstrap/lib/Modal";
import ModalBody from "reactstrap/lib/ModalBody";
import ModalHeader from "reactstrap/lib/ModalHeader";
import { useBalance } from "../../../hooks/useBalance";
import { useAuthUser } from "../../../store";
import { useDispatch } from "react-redux";
import disableScroll from 'disable-scroll';
import Tour from "reactour";
import { getMe } from "../../../actions/auth";

const SkillInput = ({ onChange, values = [], placeholder }) => {
    const [inputValue, setInputValue] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const handleInputChange = React.useCallback(function (value) {
        if (errorMessage) {
            setErrorMessage(null);
        }
        setInputValue(value);
    }, [errorMessage]);

    function handleKeyDown(event) {
        if (!inputValue) return;
        switch (event.key) {
            case 'Enter':
            case 'Tab':
            case ',':
                if (values.some(val => val.toLowerCase() === inputValue.toLowerCase())) {
                    setErrorMessage(`'${inputValue}' sudah ada dalam isian.`);
                    event.preventDefault();
                    return;
                }
                setInputValue('');
                onChange([...values, inputValue])
                event.preventDefault();
                break;
            default: ;
        }
    }

    return (
        <React.Fragment>
            <CreatableSelect
                components={{ DropdownIndicator: null }}
                isClearable
                isMulti
                menuIsOpen={false}
                placeholder={placeholder}
                value={values.map(value => ({ value, label: value }))}
                onChange={(newItems) => onChange(newItems ? newItems.map(item => item.value) : [])}
                inputValue={inputValue}
                onInputChange={handleInputChange}
                onKeyDown={handleKeyDown}
            />
            {errorMessage && <small className="text-danger">{errorMessage}</small>}
        </React.Fragment>);
}


const options = [
    { value: 'Full-time', label: 'Full-Time' },
    { value: 'Part-time', label: 'Part-Time' },
    { value: 'Kontrak', label: t('kontrak') },
    { value: 'Freelance', label: 'Freelance' },
    { value: 'Magang', label: t('magang') }
];

const experience = [
    { value: 0, label: 'Fresh Graduate' },
    { value: 1, label: t('1tahun') },
    { value: 2, label: t('2tahun') },
    { value: 3, label: t('3tahun') },
    { value: 4, label: t('4tahun') },
    { value: 5, label: t('5tahunlebih') }
];

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

const country = [
    { value: 1, label: 'Indonesia' }
];

const defaultContent = convertFromRaw(markdownToDraft(`
**Deskripsi Pekerjaan**
- Membuat (Sebutkan pekerjaan yang akan dilakukan)
- Mengelola (Sebutkan pekerjaan yang akan dilakukan)
- Mendukung dan memperbarui (Sebutkan pekerjaan yang akan dilakukan)
- Mengembangkan (Sebutkan pekerjaan yang akan dilakukan)
- Memahami (Sebutkan pekerjaan yang akan dilakukan)

**Kualifikasi**
- Minimal usia (sebutkan rentang usia)
- Mampu mengelola (sebutkan contoh pekerjaan yang akan dilakukan)
- Mampu bekerja sama dengan tim dan mudah beradaptasi
- Memiliki kemampuan berbahasa (sebutkan bahasa)
- Bersedia ditempatkan di (Sebutkan wilayah atau lokasi kerja)
`));
const defaultContentEditorState = EditorState.createWithContent(defaultContent)


function RecruitmentCreate(props) {
    const { loading, data } = useBalance();
    const myBalance = useMemo(() => data?.balance ?? 0, [data])
    const isExpired = useMemo(() => data?.isExpired, [data])

    const [province, setProvince] = useState([]);
    const [city, setCity] = useState([]);
    const [cityForm, setCityForm] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [submitLoadPublish, setSubmitLoadPublish] = useState(false);
    const [submitLoadDraft, setSubmitLoadDraft] = useState(false);
    const [type, setType] = useState(null);
    const [disablePublish, setDisablePublish] = useState(false);
    const [disableDraft, setDisableDraft] = useState(false);
    const [modalNonComplete, setModalNonComplete] = useState(false);
    const [modalTokenNull, setModalTokenNull] = useState(false);
    const user = useAuthUser();
    const [isTour, setIsTour] = useState(false);
    const disableBody = () => disableScroll.on();
    const enableBody = () => disableScroll.off();
    const accentColor = "#1d5a8e";
    const dispatch = useDispatch();
    const detailRef = useRef();
    const requirementRef = useRef();
    const descriptionRef = useRef();
    const publishRef = useRef();

    const [editorState, setEditorState] = useState(defaultContentEditorState);
    const editorStateChange = (changeEditorState) => {
        setEditorState(changeEditorState);
        formik.setFieldValue('description', draftToMarkdown(convertToRaw(changeEditorState.getCurrentContent())));
    }

    const ValidationFormSchema = useMemo(() => {
        return Yup.object().shape({
            minSalary: Yup.number().required().label('gaji minimal'),
            maxSalary: Yup.number().min(Yup.ref('minSalary'), t('gaji maksimal harus lebih besar dari gaji minimal')).required().label('gaji maksimal')
        })
    }, [])

    const { values, touched, errors, isSubmitting, ...formik } = useFormik({
        initialValues: {
            name: '',
            type: [],
            country: [],
            provinceId: '',
            cityId: '',
            minSalary: '',
            maxSalary: '',
            showSalary: false,
            minEducation: [],
            major: '',
            minYearExperience: '',
            description: '',
            skills: [],
            expiredAt: '',
            published: false
        },
        validationSchema: ValidationFormSchema,
        onSubmit: (values, { setSubmitting, setErrors }) => {
            setSubmitting(true);
            if(!user.guidance.createJobTutorial){
                request.put('auth/guidance', { guidance: 'createJobTutorial' })
                .then(() => {
                    dispatch(getMe());
                })
            }
            if (type === "publish") {
                setSubmitLoadPublish(true);
                setDisableDraft(true);
            }
            if (type === "draft") {
                setSubmitLoadDraft(true);
                setDisablePublish(true);
            }
            request.post('v1/recruitment/vacancies', {
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
                expiredAt: values.expiredAt ? moment(values.expiredAt).format('YYYY-MM-DD') : undefined,
                published: values.published
            })
                .then(() => {
                    toast.success(t('lowonganberhasildibuat'));
                    if (!isComplete) {
                        setModalNonComplete(true)
                    }
                    else if (isComplete) {
                        props.history.goBack();
                    }
                })
                .catch(err => {
                    if (err.response?.status === 422) {
                        toast.error("Terjadi Kesalahan Pengisian, silahkan cek data yang anda isikan");
                        setErrors(err.response.data.errors);
                        return;
                    }
                    else if (err.response?.status){
                        toast.error("Terjadi kesalahan, silahkan coba lagi");
                        setErrors(err.response.data.errors);
                        return;
                    }
                    Promise.reject(err);
                })
                .finally(() => {
                    setSubmitLoadPublish(false);
                    setSubmitLoadDraft(false);
                    setDisablePublish(false);
                    setDisableDraft(false);
                    setSubmitting(false);
                });
        }
    });

    const isComplete = values.name != null
        && values.type?.value != null
        && values.provinceId?.value != null
        && values.cityId?.value != null
        && values.minSalary != null
        && values.maxSalary != null
        && values.minEducation?.value != null
        && values.major != null
        && values.description != null
        && values.skills?.length > 0

    useEffect(() => {
        request.get('v1/location/provinces?countryId=1')
            .then(res => {
                setProvince(res.data.data);
            })
            .catch(err => {
                if (err.response.status === 404) {
                    setNotFound(true);
                }
            })
    }, [])

    useEffect(() => {
        if (user.guidance.layout && user.guidance.header) {
            window.scroll({ top: 0, behavior: 'smooth' })
            if (!user.guidance.createJob) {
                setIsTour(true);
            }
        }
    }, [user])

    const disableGuideCreateJob = () => {
        setIsTour(false);
        window.scroll({ top: 0, behavior: 'smooth' })
        request.put('auth/guidance', { guidance: 'createJob' })
            .then(() => {
                dispatch(getMe());
            })
    }

    const prov = province.map(province =>
        ({ value: province.id, label: province.name })
    )

    const changeProvince = function (province) {
        request.get(`v1/location/cities?provinceId=${province.value}`)
            .then(res => {
                setCity(res.data.data);
            })
        setCityForm(false);
        formik.setFieldValue('provinceId', province);
        formik.setFieldValue('cityId', null);
        formik.setFieldTouched('provinceId', true);
    };

    const kota = city.map(city =>
        ({ value: city.id, label: city.name })
    )

    const changeCity = function (city) {
        formik.setFieldValue('cityId', city);
        formik.setFieldTouched('cityId', true);
    };

    const changeJenisKerja = function (pilihan) {
        formik.setFieldValue('type', pilihan);
        formik.setFieldTouched('type', true);
    };

    const changeCountry = function (country) {
        formik.setFieldValue('country', country);
        formik.setFieldTouched('country', true);
    }

    const changePendidikan = function (edu) {
        formik.setFieldValue('minEducation', edu);
        formik.setFieldTouched('minEducation', true);
    }

    const changeExperience = function (edu) {
        formik.setFieldValue('minYearExperience', edu);
        formik.setFieldTouched('minYearExperience', true);
    }

    if (loading) {
        return <LoadingAnimation />;
    }
    else if (notFound) {
        return <DataNotFound />
    }

    const toggle = () => {
        setModalTokenNull(!modalTokenNull)
    }

    const steps = [
        {
            selector: ".tour-detailJob",
            content: ({ goTo, inDOM }) => (
                <div>
                    <p>
                        Saat membuat lowongan pekerjaan baru, 
                        tuliskan detail lowongan pekerjaan yang ingin dibuka dengan mengisi beberapa kolom disana.
                    </p>
                    <div className="col-12 text-center">
                        <Row>
                            <div className="col-12 text-right p-0">
                                <Button
                                    className="mt-2"
                                    type="submit"
                                    color="netis-color"
                                    onClick={() => {
                                        enableBody();
                                        window.scrollTo({top:requirementRef.current.offsetTop - 80})
                                        // window.scrollTo({
                                        //     top: Number(requirementRef.current.offsetTop) - 80,
                                        //     left: 0,
                                        //     behavior: 'smooth'
                                        // })
                                        goTo(1)
                                        disableBody();
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
            selector: ".tour-requirementJob",
            content: ({ goTo, inDOM }) => (
                <div>
                    <p>
                        Tuliskan juga persyaratan pekerjaan yang perlu dipenuhi oleh pelamar.
                    </p>
                    <div className="col-12 text-center">
                    <Row>
                        <div className="col-6 text-center p-0">
                        <Button
                            className="mt-2"
                            type="submit"
                            color="netis-color"
                            onClick={() => {
                                enableBody();
                                window.scrollTo({top:detailRef.current.offsetTop - 80})
                                goTo(0)
                                disableBody();
                            }}
                        >
                            <i className="fa fa-arrow-left mr-2"></i>Sebelumnya
                        </Button>
                        </div>
                        <div className="col-6 text-center p-0">
                        <Button
                            className="mt-2"
                            type="submit"
                            color="netis-color"
                            onClick={() => {
                                enableBody();
                                window.scrollTo({top:descriptionRef.current.offsetTop - 80})
                                goTo(2)
                                disableBody();
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
            selector: ".tour-descriptionJob",
            content: ({ goTo, inDOM }) => (
                <div>
                    <p>
                        Jelaskan dengan lengkap detail pekerjaan seperti 
                        deskripsi pekerjaan dan kualifikasi untuk pelamar
                    </p>
                    <div className="col-12 text-center">
                    <Row>
                        <div className="col-6 text-center p-0">
                        <Button
                            className="mt-2"
                            type="submit"
                            color="netis-color"
                            onClick={() => {
                                enableBody();
                                window.scrollTo({top:requirementRef.current.offsetTop - 80})
                                goTo(1)
                                disableBody();
                            }}
                        >
                            <i className="fa fa-arrow-left mr-2"></i>Sebelumnya
                        </Button>
                        </div>
                        <div className="col-6 text-center p-0">
                        <Button
                            className="mt-2"
                            type="submit"
                            color="netis-color"
                            onClick={() => {
                                enableBody();
                                window.scrollTo({top:publishRef.current.offsetTop - 80})
                                goTo(3)
                                disableBody();
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
            selector: ".tour-submitJob",
            content: ({ goTo, inDOM }) => (
                <div>
                    <p>
                        Setelah mengisi seluruh detail diatas, 
                        Anda bisa memilih untuk langsung mempublikasikannya atau menyimpannya sebagai draft.
                    </p>
                    <div className="col-12 text-center">
                    <Row>
                        <div className="col-6 text-center p-0">
                        <Button
                            className="mt-2"
                            type="submit"
                            color="netis-color"
                            onClick={() => {
                                enableBody();
                                window.scrollTo({top:descriptionRef.current.offsetTop - 80})
                                goTo(2)
                                disableBody();
                            }}
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
                                disableGuideCreateJob();
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
        <div className="animated fadeIn d-flex flex-column bd-highlight mb-3 p-4">
            <Tour
                steps={steps}
                showNavigation={false}
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
                    disableGuideCreateJob();
                }}
            />
            <div className="bd-highlight mb-4">
                <h4>Buat Lowongan Pekerjaan</h4>
                <hr />
            </div>

            <Form onSubmit={formik.handleSubmit}>
                <div className="row tour-detailJob" ref={detailRef}>
                    <div className="col-md-2">
                        <h5>{t('detailpekerjaan')}</h5>
                    </div>
                    <div className="col-sm-12 col-md-10">
                        <Row form>
                            <Col xs="12" className="mb-2">
                                <Label htmlFor="name" className="input-label">{t('Posisi')} <span className="required">*</span></Label>
                                <Input
                                    type="input"
                                    value={values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    name="name"
                                    id="name"
                                    required
                                    maxLength="255"
                                    placeholder={t('namapekerjaan')}
                                    className="form-control needs-validation"
                                />
                            </Col>

                            <Col xs="12" className="mb-2">
                                <Label htmlFor="type" className="input-label">
                                    {t('Status Kepegawaian')} <span className="required">*</span>
                                </Label>
                                <Select
                                    styles={{
                                        menu: provided => ({ ...provided, zIndex: 9999 })
                                    }}
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
                                />
                            </Col>

                            <Col xs="12" className="mb-2">
                                <Label htmlFor="country" className="input-label">
                                    {t('Negara')}
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
                                />
                            </Col>

                            <Col xs="6" className="mb-2">
                                <Label htmlFor="provinceId" className="input-label">{t('Provinsi')}
                                    <span className="required">*</span>
                                </Label>
                                <Select
                                    styles={{
                                        menu: provided => ({ ...provided, zIndex: 9999 })
                                    }}
                                    isSearchable={true}
                                    name="provinceId"
                                    id="provinceId"
                                    onChange={changeProvince}
                                    onBlur={formik.handleBlur}
                                    options={prov}
                                    className="needs-validation"
                                    required
                                />
                            </Col>

                            <Col xs="6" className="mb-2">
                                <Label htmlFor="cityId" className="input-label">{t('Kota')}
                                    <span className="required">*</span>
                                </Label>
                                <Select
                                    value={values.cityId}
                                    isSearchable={true}
                                    name="cityId"
                                    id="cityId"
                                    onChange={changeCity}
                                    onBlur={formik.handleBlur}
                                    isDisabled={cityForm}
                                    options={kota}
                                    // defaultValue={kota[0]}
                                    className="needs-validation"
                                    required
                                />
                            </Col>

                            <Col xs="6" className="mb-2">
                                <Label htmlFor="minSalary" className="input-label">{t('Gaji Minimal')}
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
                                />
                                {touched.minSalary && errors.minSalary && <small className="text-danger">{errors.minSalary}</small>}
                            </Col>

                            <Col xs="6" className="mb-2">
                                <Label htmlFor="maxSalary" className="input-label">{t('Gaji Maksimal')}
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
                                />
                                {touched.maxSalary && errors.maxSalary && <small className="text-danger">{errors.maxSalary}</small>}
                            </Col>
                            <Col xs="6">
                                <CustomInput
                                    className="ml-1"
                                    label={t('Tampilkan Gaji')}
                                    id="showSalary"
                                    name="showSalary"
                                    type="checkbox"
                                    checked={values.showSalary}
                                    onChange={
                                        (event) => formik.setFieldValue('showSalary', event.target.checked)
                                    }
                                />
                                {/* <small><i>
                                <span className="required">*</span>
                                {t('tandaigaji')}
                            </i></small> */}
                            </Col>
                        </Row>
                    </div>
                </div>

                <><hr /></>

                <div className="row tour-requirementJob" ref={requirementRef}>
                    <div className="col-md-2">
                        <h5>{t('persyaratanpekerjaan')}</h5>
                    </div>
                    <div className="col-sm-12 col-md-10">
                        <Row form>
                            <Col xs="6" className="mb-2">
                                <Label htmlFor="minEducation" className="input-label">{t('pendidikanminimal')}
                                    <span className="required">*</span>
                                </Label>
                                <Select
                                    styles={{
                                        menu: provided => ({ ...provided, zIndex: 9999 })
                                    }}
                                    isSearchable={false}
                                    name="minEducation"
                                    id="minEducation"
                                    onChange={changePendidikan}
                                    onBlur={formik.handleBlur}
                                    value={values.minEducation}
                                    options={education}
                                    className="needs-validation"
                                    required
                                />

                            </Col>
                            <Col xs="6" className="mb-2">
                                <Label htmlFor="major" className="input-label">{t('jurusan')}</Label>
                                <Input
                                    type="input"
                                    value={values.major}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    name="major"
                                    id="major"
                                    maxLength="255"
                                />
                            </Col>
                            <Col xs="12" className="mb-2">
                                <Label htmlFor="minYearExperience" className="input-label">
                                    {t('minimalpengalaman')}
                                </Label>
                                {/* <NumberFormat
                                suffix={' tahun'}
                                allowNegative={false}
                                name="minYearExperience"
                                id="minYearExperience"
                                onChange={formik.handleChange}
                                value={values.minYearExperience}
                                className="form-control"
                            />                         */}
                                <Select
                                    styles={{
                                        menu: provided => ({ ...provided, zIndex: 9999 })
                                    }}
                                    isSearchable={false}
                                    name="minYearExperience"
                                    id="minYearExperience"
                                    onChange={changeExperience}
                                    onBlur={formik.handleBlur}
                                    value={values.minYearExperience}
                                    options={experience}
                                />
                            </Col>
                            <Col xs="12" className="mb-2">
                                <Label htmlFor="skills" className="input-label">{t('keterampilan')}</Label>
                                <SkillInput
                                    onChange={(newValues) => formik.setFieldValue('skills', newValues)}
                                    values={values.skills}
                                    placeholder={t('daftarketerampilan')}
                                />
                                <small className="text-form text-muted d-block">{t('contoh')}: Excel, Programming</small>
                            </Col>
                        </Row>
                    </div>
                </div>
                <><hr /></>
                <div className="row tour-descriptionJob" ref={descriptionRef}>
                    <div className="col-md-2">
                        <h5>{t('deskripsipekerjaan')}</h5>
                    </div>
                    <div className="col-sm-12 col-md-10">
                        <Row form>
                            <Col xs="12" className="mb-2">
                                <Editor
                                    editorState={editorState}
                                    value={values.description}
                                    editorClassName="border p-2 rounded"
                                    onEditorStateChange={editorStateChange}
                                    editorStyle={{ height: 500 }}
                                    toolbar={{
                                        options: ['inline', 'list'],
                                        inline: {
                                            inDropdown: false,
                                            options: ['bold', 'italic', 'underline']
                                        },
                                        list: {
                                            inDropdown: false,
                                            options: ['unordered', 'ordered']
                                        }
                                    }}
                                />
                            </Col>
                        </Row>
                    </div>
                </div>

                <><hr /></>

                <div className="row tour-submitJob" ref={publishRef}>
                    <div className="col-md-2 mb-2">
                        <h5>{t('Publikasi')}</h5>
                    </div>
                    <div className="col-sm-12 col-md-10">
                        <Row form>
                            <Col xs="12">
                                {(!myBalance || isExpired) ?
                                    <Button
                                        className="mr-2 mb-2"
                                        color="netis-primary"
                                        onClick={toggle}
                                    >
                                        {submitLoadPublish ? <>< Spinner color="light" size="sm" /> {t('Loading...')}</> : t('publikasikan')}
                                    </Button>
                                    :
                                    <Button
                                        className="mr-2 mb-2"
                                        type="submit"
                                        color="netis-primary"
                                        disabled={disablePublish}
                                        onClick={() => {
                                            formik.setFieldValue('published', true)
                                            setType("publish")
                                        }}
                                    >
                                        {submitLoadPublish ? <><Spinner color="light" size="sm" /> {t('Loading...')}</> : t('publikasikan')}
                                    </Button>
                                }

                                <Button className="ml-2 mb-2" type="submit" color="secondary" disabled={disableDraft}
                                    onClick={() => {
                                        setType("draft")
                                    }}
                                >
                                    {submitLoadDraft ? <><Spinner color="dark" size="sm" /> {t('Loading...')}</> : t('simpandraft')}
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </div>

            </Form >
            <Modal isOpen={modalNonComplete} style={{ marginTop: "40vh" }}>
                <ModalHeader className=" text-center border-bottom-0">
                    Peringatan
            </ModalHeader>
                <ModalBody className="text-center">
                    Data yang anda isikan belum lengkap, namun anda dapat melengkapinya di lain waktu
                <br />
                    <div className="d-flex justify-content-center mx-auto text-center mt-2" style={{ width: "60%" }}>
                        <Button
                            className="button-token"
                            onClick={() => {
                                setModalNonComplete(false)
                                props.history.goBack();
                            }}
                        >
                            Oke
                    </Button>
                    </div>
                </ModalBody>
            </Modal>
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
        </div >
    )
}

export default translate(RecruitmentCreate);
