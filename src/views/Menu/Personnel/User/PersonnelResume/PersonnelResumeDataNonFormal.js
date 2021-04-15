import React, { useEffect, useCallback, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { translate, t } from "react-switch-lang";
import { Button, Col, FormGroup, Input, Label, Modal, ModalBody, Row, Spinner, Table, Form, FormFeedback } from "reactstrap";
import LoadingAnimation from "../../../../../components/LoadingAnimation";
import request from "../../../../../utils/request";
import { useFormik } from "formik";
import SelectYear from "../../../../../components/Form/SelectYear";
import * as Yup from "yup";

function PersonnelResumeDataNonFormal({ user }) {
    const [loading, setLoading] = useState(true);
    const [resume, setResume] = useState([]);

    const getResume = useCallback(() => {
        request.get('v1/personnels/' + user.personnel.id + '/resumes-training')
            .then(res => {
                setResume(res.data.data)
            })
            .finally(() => setLoading(false))
    }, [user])

    useEffect(() => {
        getResume()
    }, [getResume])

    const changedResume = (changed) => {
        if (changed) {
            getResume()
        }
    };

    if (loading) {
        return (
            <div className="animated fadeIn">
                <LoadingAnimation />
            </div>
        );
    }

    return (
        <div className="content-body">
            <Row className="md-company-header mb-3">
                <Col className="d-flex justify-content-between align-items-center">
                    <h5 className="content-sub-title mb-0">{t('pendidikannonformal')}</h5>
                    <ModalResume label="Tambah" action="create" data={[]} onChanged={(changed) => changedResume(changed)} icon="fa fa-plus" color="netis-color" size="md" personnelId={user.personnel.id} />
                </Col>
            </Row>
            <Row>
                <Col xs="12" lg="12">
                    <Table responsive>
                        <thead>
                            <tr>
                                <th className="text-center w-10">No.</th>
                                <th className="w-30">{t('nama')} {t('institusi')}</th>
                                <th className="w-30">{t('posisi')}</th>
                                <th className="text-center">{t('tahunmulai')}</th>
                                <th className="text-center">{t('tahunselesai')}</th>
                                <th className="text-center w-20">{t('aksi')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!resume
                                ? 'No data'
                                : resume.map((data, idx) => (
                                    <tr key={idx}>
                                        <td className="text-center">{idx + 1}</td>
                                        <td>{data.institution}</td>
                                        <td>{data.title}</td>
                                        <td className="text-center">{data.yearStart}</td>
                                        <td className="text-center">{data.yearEnd}</td>
                                        <td className="text-center">
                                            <ModalResume action="edit" data={data} onChanged={(changed) => changedResume(changed)} icon="fa fa-pencil" color="netis-color" personnelId={user.personnel.id} />
                                            <ModalResume action="delete" data={data} onChanged={(changed) => changedResume(changed)} icon="fa fa-trash" color="danger" personnelId={user.personnel.id} />
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </div>
    )
}

function ModalResume(props) {
    const { label, action, data, onChanged, icon, color, size, personnelId } = props;
    const [, setCreateData] = useState([]);
    const [updateData, setUpdateData] = useState([]);
    const [deletingData, setDeletingData] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [modal, setModal] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);

    const ValidationFormSchema = useMemo(() => {
        return Yup.object().shape({
            institution: Yup.string().required().label(t("institusi")),
            title: Yup.string().required().label(t("jurusan")),
            yearStart: Yup.string().required()
            .test('isLower', t('tahunmulaiharuskurang'), function(value){
                return value <= this.parent.yearEnd
            })
            .label(t("tahunmulai")),
            yearEnd: Yup.string().required()
            .test('isHigher', t('tahunselesaiharuslebih'), function(value){
                return value >= this.parent.yearStart
            })
            .label(t("tahunselesai")),
            number: Yup.string().required().label(t("nomorijazah")),
        });
    }, []);

    const { values, touched, errors, isSubmitting, setFieldValue, setValues, handleChange, ...formik } = useFormik({
        initialValues: {
            institution: '',
            title: '',
            yearStart: '',
            yearEnd: '',
            number: '',
            certificate: null
        },
        validationSchema: action === 'delete' ? '' : ValidationFormSchema,
        onSubmit: (values, { setSubmitting, setErrors }) => {
            setSubmitting(true);
            setModalLoading(true)
            var formData = new FormData();
            formData.append('institution', values.institution);
            formData.append('title', values.title);
            formData.append('yearStart', values.yearStart);
            formData.append('yearEnd', values.yearEnd);
            formData.append('number', values.number);
            if (action !== 'delete') {
                if (values.certificate !== data.certificate && values.certificate !== null) {
                    formData.append('certificate', values.certificate, values.certificate.name);
                }
            }
            if (action === 'create') {
                request.post('v1/personnels/' + personnelId + '/resumes-training', formData)
                    .then(res => {
                        toast.success(t('Berhasil'));
                        closeModal()
                        onChanged(true)
                    })
                    .catch(err => {
                        console.log(err)
                        if (err.response?.status === 422) {
                            setErrors(err.response.data.errors);
                            return;
                        }
                    })
                    .finally(() => {
                        setModalLoading(false)
                        setSubmitting(false)
                    });
            } else if (action === 'edit') {
                request.post('v1/personnels/' + personnelId + '/resumes-training/' + updateData.id, formData)
                    .then(res => {
                        toast.success(t('databerhasildiubah'));
                        closeModal()
                        onChanged(true)
                    })
                    .catch(err => {
                        if (err.response?.status === 422) {
                            setErrors(err.response.data.errors);
                            return;
                        }
                    })
                    .finally(() => {
                        setModalLoading(false)
                        setSubmitting(false)
                    });
            } else {
                request.delete('v1/personnels/' + personnelId + '/resumes-training/' + deletingData)
                    .then(res => {
                        toast.success(t('databerhasildihapus'));
                        closeModal()
                        onChanged(true)
                    })
                    .catch(err => {
                        console.log(err)
                        if (err.response?.status === 422) {
                            setErrors(err.response.data.errors);
                            return;
                        }
                    })
                    .finally(() => {
                        setModalLoading(false)
                        setSubmitting(false)
                    });
            }
        }
    });

    function showModal(data = []) {
        if (action === 'create') {
            setCreateData(data)
        } else if (action === 'edit') {
            setValues(data)
            setUpdateData(data)
        } else {
            setDeletingData(data.id)
        }
        setModal(true)
    }

    const selectedYearStart = useCallback(() => {
        const year = values.yearStart
        return { value: year, label: year }
    }, [values.yearStart])

    const selectedYearEnd = useCallback(() => {
        const year = values.yearEnd
        return { value: year, label: year }
    }, [values.yearEnd])

    function closeModal() {
        setModal(false)
        setValues(values => {
            return { institution: '', title: '', yearStart: '', yearEnd: '', number: '', certificate: null }
        })
        setCreateData([])
        setUpdateData([])
        setDeletingData(null)
    }

    const handleChangeDocument = (value) => {
        const preview = value.target.files[0];
        setImagePreview(URL.createObjectURL(preview));
        setFieldValue('certificate', preview)
    }

    const handleChangeYearStart = (value) => {
        setFieldValue('yearStart', value)
    }

    const handleChangeYearEnd = (value) => {
        setFieldValue('yearEnd', value)
    }

    return (
        <>
            <Button color={color}
                className="d-inline mr-1"
                size={size ?? 'sm'}
                onClick={() => showModal(data)}>
                <i className={`${icon} ${label ? 'mr-1' : ''}`}></i>
                {label ?? ''}
            </Button>
            <Modal
                isOpen={modal}
                size={action === 'delete' ? 'md' : 'lg'}
                toggle={() => {
                    closeModal();
                }}
            >
                <ModalBody>
                    <Form onSubmit={formik.handleSubmit}>
                        {action !== 'delete' && (
                            <>
                                <Row>
                                    <Col col="6" sm="12" md="12" lg="6" className="d-flex justify-content-center align-items-center">
                                        <Row>
                                            <Col col="12" sm="12" md="12" className="d-flex justify-content-center align-items-center">
                                                <p>Upload {t('foto')} {t('sertifikat')} ( Max. 5 MB ) :</p>
                                            </Col>
                                            {
                                                values.certificate
                                                    ? <> <Col className="col-md-12 d-flex justify-content-center align-items-center">
                                                        <FormGroup>
                                                            {console.log(imagePreview)}
                                                            <img src={imagePreview === '' ? process.env.REACT_APP_DOMAIN + "" + values.certificate : imagePreview} alt="preview" width="200" height="200" />
                                                        </FormGroup>
                                                    </Col>
                                                        <Col className="col-md-12 d-flex justify-content-center align-items-center">
                                                            <FormGroup>
                                                                <Input type="file" id="certificate" name="certificate" onChange={handleChangeDocument} />
                                                            </FormGroup>
                                                        </Col></>
                                                    : <Col col="12" sm="12" md="12" className="d-flex justify-content-center align-items-center">
                                                        <div className="input-personnel-document d-flex justify-content-center align-items-center">
                                                            <Label htmlFor="certificate" className="input-label btn-circle"><span className="fa fa-plus"></span></Label>
                                                            <Input type="file" id="certificate" name="certificate" className="d-none" onChange={handleChangeDocument} />
                                                        </div>
                                                    </Col>
                                            }
                                        </Row>
                                    </Col>
                                    <Col col="6" sm="12" md="12" lg="6">
                                        <FormGroup>
                                            <Label htmlFor="institution" className="input-label">{t('institusi')}</Label>
                                            <Input type="text" name="institution" id="institution" value={values.institution} onChange={handleChange} className={touched.institution && errors.institution ? ' is-invalid' : ''} />
                                            {touched.institution && errors.institution && (
                                                <FormFeedback>{errors.institution}</FormFeedback>
                                            )}
                                        </FormGroup>
                                        <FormGroup>
                                            <Label htmlFor="title" className="input-label">{t('judulpelatihan')}</Label>
                                            <Input type="text" name="title" id="title" value={values.title} onChange={handleChange} className={touched.title && errors.title ? ' is-invalid' : ''} />
                                            {touched.title && errors.title && (
                                                <FormFeedback>{errors.title}</FormFeedback>
                                            )}
                                        </FormGroup>
                                        <FormGroup>
                                            <Label htmlFor="yearStart" className="input-label">{t('tahunmulai')}</Label>
                                            <SelectYear name="yearStart" id="yearStart" onChanged={handleChangeYearStart} value={selectedYearStart}
                                                styles={{
                                                    control: base => ({
                                                        ...base,
                                                        borderColor: touched.yearStart && errors.yearStart ? 'red' : 'hsl(0,0%,80%)',
                                                    })
                                                }}
                                            />
                                            {touched.yearStart && errors.yearStart && (
                                                <small className="text-danger">{errors.yearStart}</small>
                                            )}
                                        </FormGroup>
                                        <FormGroup>
                                            <Label htmlFor="yearEnd" className="input-label">{t('tahunselesai')}</Label>
                                            <SelectYear name="yearEnd" id="yearEnd" onChanged={handleChangeYearEnd} value={selectedYearEnd}
                                                styles={{
                                                    control: base => ({
                                                        ...base,
                                                        borderColor: touched.yearEnd && errors.yearEnd ? 'red' : 'hsl(0,0%,80%)',
                                                    })
                                                }}
                                            />
                                            {touched.yearEnd && errors.yearEnd && (
                                                <small className="text-danger">{errors.yearEnd}</small>
                                            )}
                                        </FormGroup>
                                        <FormGroup>
                                            <Label htmlFor="number" className="input-label">{t('nomorijazah')}</Label>
                                            <Input type="number" name="number" id="number" value={values.number} onChange={handleChange} onWheel={(e) => { e.target.blur() }} className={touched.number && errors.number ? ' is-invalid' : ''} />
                                            {touched.number && errors.number && (
                                                <small className="text-danger">{errors.number}</small>
                                            )}
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </>)}
                        {action === 'delete' && (
                            <>
                                <h6>{t("yakinmenghapus")}</h6>
                            </>)}
                        <div className="d-flex justify-content-end">
                            {!modalLoading && (
                                <Button
                                    className="mr-2"
                                    color="light"
                                    onClick={() => closeModal()}
                                >
                                    {t("batal")}
                                </Button>
                            )}
                            <Button
                                type="submit"
                                color="netis-primary"
                                disabled={modalLoading}
                            >
                                {modalLoading ? (
                                    <React.Fragment>
                                        <Spinner size="sm" color="light" /> Tunggu...
                                    </React.Fragment>
                                ) : (
                                        deletingData ? t("hapus") : t("simpan")
                                    )}
                            </Button>
                        </div>
                    </Form>
                </ModalBody>
            </Modal>
        </>
    )
}
export default translate(PersonnelResumeDataNonFormal);
