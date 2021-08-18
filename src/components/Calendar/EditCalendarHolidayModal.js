import { useFormik } from 'formik';
import { DatePickerInput } from 'rc-datepicker';
import React, { memo, useCallback, useEffect, useMemo } from 'react'
import { toast } from 'react-toastify';
import { FormFeedback, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from 'reactstrap';
import * as Yup from 'yup';
import { t, translate } from 'react-switch-lang';
import request from '../../../utils/request';
import { dequal } from 'dequal/lite'

function EditCalendarHolidayModal({ cancel, onEdited, agenda }) {
    const showModal = !!agenda;

    const validationSchema = useMemo(() => {
        return Yup.object().shape({
            date: Yup.string().required().label(t('tanggal')),
            title: Yup.string().required()
        });
    }, [])

    const { values, touched, errors, resetForm, setFieldTouched, setFieldValue, setSubmitting, ...formik } = useFormik({
        enableReinitialize: true,
        initialValues: {
            date: agenda?.date ?? null,
            title: agenda?.title ?? '',
        },
        validationSchema,
        onSubmit: (values, { setSubmitting }) => {
            setSubmitting(true);
            request.put(`v2/company/event/${agenda.id}`, values)
                .then(res => {
                    onEdited(res.data.data);
                    resetForm();
                })
                .catch(err => {
                    toast.error(err.response?.data?.message ?? 'Terjadi Galat')
                })
                .finally(() => {
                    setSubmitting(false);
                })
        }
    });

    const hasChanged = useMemo(() => !dequal(formik.initialValues, values), [formik.initialValues, values]);

    useEffect(() => {
        if (! showModal) {
            resetForm();
        }
    }, [showModal, resetForm]);

    const handleChangeDate = useCallback((_,formattedDate) => {
        setFieldTouched('date');
        setFieldValue('date', formattedDate);
    }, [setFieldTouched, setFieldValue]);

    const handleDelete = useCallback(() => {
        setSubmitting(true);
        request.delete(`v2/company/event/${agenda.id}`)
            .then(() => {
                onEdited(agenda, 'DELETE');
            }).catch(err => {
                toast.error(err.response?.data?.message ?? 'Terjadi Galat');
            }).finally(() => {
                setSubmitting(false);
            })
    }, [agenda, onEdited, setSubmitting])

    return (
        <Modal isOpen={showModal} toggle={cancel}>
            <ModalHeader className="content-sub-title mb-0 text-capitalize" toggle={cancel}>
                {t('Edit Hari libur')}
            </ModalHeader>
            <ModalBody>
                <FormGroup>
                    <Label htmlFor="title-create-holiday" className="input-label">{t('Nama Hari Libur')}</Label>
                    <Input type="text" name="title" id="title-create-holiday" placeholder={t('Nama Hari Libur')}
                        disabled={formik.isSubmitting}
                        value={values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        invalid={Boolean(touched.title && errors.title)}
                        />
                    <FormFeedback>{errors.title}</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="date-create-holiday" className="input-label">{t('tanggal')}</Label>
                    <DatePickerInput
                        id="date-create-holiday"
                        name="date"
                        onChange={handleChangeDate}
                        value={values.date}
                        className='my-custom-datepicker-component'
                        disabled={formik.isSubmitting}
                        showOnInputClick={true}
                        closeOnClickOutside={true}
                        displayFormat="DD MMMM YYYY"
                        returnFormat="YYYY-MM-DD"
                        readOnly
                    />
                </FormGroup>
            </ModalBody>
            <ModalFooter className="d-flex">
                <button type="button" className="btn btn-link text-danger mr-auto" disabled={formik.isSubmitting} onClick={handleDelete}><i className="fa fa-trash-o mr-1"></i> {t('Hapus Hari Libur')}</button>
                <button type="button" className="btn btn-secondary ml-auto" disabled={formik.isSubmitting} onClick={cancel}>{t('batal')}</button>
                <button className="btn btn-netis-primary" disabled={formik.isSubmitting || !hasChanged} onClick={formik.handleSubmit}>
                    {formik.isSubmitting ? <Spinner color="light" size="sm" /> : t('simpan') }
                </button>
            </ModalFooter>
        </Modal>
    )
}

export default memo(translate(EditCalendarHolidayModal))
