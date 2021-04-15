import React, { useEffect, useCallback, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { translate, t } from "react-switch-lang";
import { Button, Col, FormGroup, Input, Label, Modal, ModalBody, Row, Spinner, Table, Form, FormFeedback } from "reactstrap";
import LoadingAnimation from "../../../../../components/LoadingAnimation";
import request from "../../../../../utils/request";
import { useFormik } from "formik";
import * as Yup from "yup";
import StarRatingComponent from "react-star-rating-component";

function PersonnelResumeDataSkill({ user }) {
    const [loading, setLoading] = useState(true);
    const [resume, setResume] = useState([]);

    const getResume = useCallback(() => {
        request.get('v1/personnels/' + user.personnel.id + '/resumes-skill')
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
                    <h5 className="content-sub-title mb-0">{t('keahlian')}</h5>
                    <ModalResume label="Tambah" action="create" data={[]} onChanged={(changed) => changedResume(changed)} icon="fa fa-plus" color="netis-color" size="md" personnelId={user.personnel.id} />
                </Col>
            </Row>
            <Row>
                <Col xs="12" lg="12">
                    <Table responsive>
                        <thead>
                            <tr>
                                <th className="text-center w-10">No.</th>
                                <th className="w-30">{t('nama')} {t('keahlian')}</th>
                                <th className="text-center">Level</th>
                                <th className="text-center w-20">{t('aksi')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!resume
                                ? 'No data'
                                : resume.map((data, idx) => (
                                    <tr key={idx}>
                                        <td className="text-center">{idx + 1}</td>
                                        <td>{data.name}</td>
                                        <td className="text-center">
                                            <StarRatingComponent
                                                name="level"
                                                starCount={5}
                                                value={data.level}
                                            />
                                        </td>
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
    const [modal, setModal] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);

    const ValidationFormSchema = useMemo(() => {
        return Yup.object().shape({
            name: Yup.string().required().label(t("nama")),
            level: Yup.string().required().label(t("keahlian")),
        });
    }, []);

    const { values, touched, errors, isSubmitting, setFieldValue, setValues, handleChange, ...formik } = useFormik({
        initialValues: {
            name: '',
            level: ''
        },
        validationSchema: action === 'delete' ? '' : ValidationFormSchema,
        onSubmit: (values, { setSubmitting, setErrors }) => {
            setSubmitting(true);
            setModalLoading(true)
            if (action === 'create') {
                request.post('v1/personnels/' + personnelId + '/resumes-skill', values)
                    .then(res => {
                        toast.success(t('Berhasil'));
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
                        closeModal()
                    });
            } else if (action === 'edit') {
                request.put('v1/personnels/' + personnelId + '/resumes-skill/' + updateData.id, values)
                    .then(res => {
                        toast.success(t('Berhasil'));
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
                        closeModal()
                    });
            } else {
                request.delete('v1/personnels/' + personnelId + '/resumes-skill/' + deletingData)
                    .then(res => {
                        toast.success(t('Berhasil'));
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
                        closeModal()
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

    function closeModal() {
        setModal(false)
        setValues(values => {
            return { name: '', level: '' }
        })
        setCreateData([])
        setUpdateData([])
        setDeletingData(null)
    }

    function onStarClick(nextValue, prevValue, name) {
        setFieldValue('level', nextValue)
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
                                    <Col col="12" sm="12" md="12" lg="12">
                                        <FormGroup>
                                            <Label htmlFor="name" className="input-label">{t('nama')} {t('keahlian')}</Label>
                                            <Input type="text" name="name" id="name" value={values.name} onChange={handleChange} className={touched.name && errors.name ? ' is-invalid' : ''} />
                                            {touched.name && errors.name && (
                                                <FormFeedback>{errors.name}</FormFeedback>
                                            )}
                                        </FormGroup>
                                        <FormGroup>
                                            <Label htmlFor="level" className="input-label">Level {t('keahlian')}</Label>
                                            <br />
                                            <StarRatingComponent
                                                name="level"
                                                starCount={5}
                                                value={values.level}
                                                onStarClick={onStarClick.bind(this)}
                                                emptyStarColor={touched.level && errors.level ? 'red' : ''}
                                            />
                                            <br/>
                                            {touched.level && errors.level && (
                                                <small className="text-danger">{errors.level}</small>
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
export default translate(PersonnelResumeDataSkill);
