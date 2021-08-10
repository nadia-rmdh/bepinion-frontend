import { useFormik } from 'formik';
import { DatePickerInput } from 'rc-datepicker';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify';
import { Button, FormFeedback, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from 'reactstrap';
import * as Yup from 'yup';
import { t, translate } from 'react-switch-lang';
import request from '../../../utils/request';

function AddCalendarHoliday({ onCreated, btnClass = '' }) {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = useCallback(() => {
        setShowModal(val => !val);
    }, []);

    const validationSchema = useMemo(() => {
        return Yup.object().shape({
            date: Yup.string().required().label(t('tanggal')),
            title: Yup.string().required()
        });
    }, [])

    const { values, touched, errors, resetForm, setFieldTouched, setFieldValue, ...formik } = useFormik({
        initialValues: {
            date: null,
            title: '',
            type: 'holiday'
        },
        validationSchema,
        onSubmit: (values, { setSubmitting }) => {
            setSubmitting(true);
            request.post('v2/company/event', values)
                .then(res => {
                    onCreated(res.data.data);
                    setShowModal(false);
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

    useEffect(() => {
        if (! showModal) {
            resetForm();
        }
    }, [showModal, resetForm]);

    const handleChangeDate = useCallback((_,formattedDate) => {
        setFieldTouched('date');
        setFieldValue('date', formattedDate);
    }, [setFieldTouched, setFieldValue]);

    return (
        <>
            <Button color="netis-danger" className={`${btnClass} text-capitalize`} onClick={toggleModal}>
                <i className="fa fa-calendar-times-o mr-2"></i> {t('Tambah Libur')}
            </Button>
            <Modal isOpen={showModal} toggle={toggleModal}>
                <ModalHeader className="content-sub-title mb-0 text-capitalize" toggle={toggleModal}>
                    {t('Tambah Libur')}
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
                    <button type="button" className="btn btn-secondary ml-auto" disabled={formik.isSubmitting} onClick={toggleModal}>{t('batal')}</button>
                    <button className="btn btn-netis-primary" disabled={formik.isSubmitting} onClick={formik.handleSubmit}>
                        {formik.isSubmitting ? <Spinner color="light" size="sm" /> : t('simpan') }
                    </button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default memo(translate(AddCalendarHoliday))
