import React, { useMemo, useCallback, memo, useState, useEffect, useRef } from 'react';
import useSWR from 'swr';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { arrayGroupBy } from '../../../utils/array';
import { toast } from 'react-toastify';
import CreatableSelect from 'react-select/creatable';
import { components as SelectComponents } from 'react-select';
import { iconClassByOptionType, validateEmail } from './shared';
import { FormFeedback, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from 'reactstrap';
import { DatePickerInput } from 'rc-datepicker';
import ReactInputMask from 'react-input-mask';
import { t } from 'react-switch-lang';
import moment from 'moment';
import request from '../../../utils/request';
import { dequal } from 'dequal/lite'

const EditCalendarModal = memo(({ onEdited, agenda, cancel }) => {
    const showModal = !!agenda;
    
    const { data: personnelsResponse, error: personnelsError } = useSWR('v1/personnels/all/aktif'); 
    const { data: unitsResponse, error: unitsError } = useSWR('v1/master/units'); 
    const { data: jobsResponse, error: jobsError } = useSWR('v1/master/jobs'); 
    const { data: agendaResponse, error: agendaError } = useSWR(() => `v2/company/event/${agenda.id}`);

    const currentParticipants = useMemo(() => (agendaResponse?.data?.data?.participants ?? []), [agendaResponse]);

    const preparing = (!personnelsResponse && !personnelsError)
                      || (!unitsResponse && !unitsError)
                      || (!jobsResponse && !jobsError)
                      || (!agendaResponse && !agendaError, agendaResponse, agendaError);

    const options = useMemo(() => {
        const personnels = personnelsResponse?.data?.data ?? [];
        const units = unitsResponse?.data?.data ?? [];
        const jobs = jobsResponse?.data?.data ?? [];
        return [
            {
                label: '',
                options: [{
                    value: 1,
                    label: t('Seluruh Karyawan'),
                    type: 'all'
                }]
            },
            {
                label: 'personnel',
                options: personnels.map((personnel) => ({ personnel, value: personnel.id, label: personnel.fullName || 'uknowns', type: 'personnel' })),
            },
            {
                label: 'unit',
                options: units.map(unit => ({ unit, value: unit.id, label: unit.name, type: 'unit' }))
            },
            {
                label: 'job',
                options: jobs.map(job => ({ job, value: job.id, label: job.name, type: 'job'}))
            }
        ]
    }, [personnelsResponse, unitsResponse, jobsResponse])

    const { values, errors, touched, setFieldTouched, setFieldValue, validateForm, ...formik } = useFormik({
        enableReinitialize: true,
        initialValues: {
            date: agenda?.date,
            start: agenda?.startTime ? agenda.startTime.slice(0, -3) : '',
            end: agenda?.endTime ? agenda.endTime.slice(0, -3) : '',
            title: agenda?.title ?? '',
            description: agenda?.description ?? '',
            participants: currentParticipants.map(({ type, id, name }) => {
                if (type === 'all') {
                    return options[0].options[0];
                } else if (type === 'email') {
                    return { value: name, label: `Undang "${name}"`, email: name, type: 'email'};
                } else {
                    return options.find(groupedOption => groupedOption.label === type).options.find(option => option.value === id);
                }
            }).filter(item => item !== undefined),
            optionalMessage: '',
        },
        validationSchema: Yup.object().shape({
            start: Yup.string()
                .required()
                .matches(/([0-1][0-9]|2[0-3]):[0-5][0-9]/, {message: t('invalid time'), excludeEmptyString: true})
                .label(t('waktu mulai')),
            end: Yup.string()
                .required()
                .matches(/([0-1][0-9]|2[0-3]):[0-5][0-9]/, {message: t('invalid time'), excludeEmptyString: true})
                .test('is-greater', t('time should be greater than start time'), function (value) {
                    const momentVal = moment(value, "HH:mm");
                    const momentStart = moment(this.parent.start, "HH:mm");
                    return momentVal.isSameOrAfter(momentStart);
                })
                .label(t('waktu berakhir')),
            title: Yup.string().max(255).required().label(t('Nama Agenda')),
        }),
        onSubmit: (values, { setSubmitting }) => {
            const participants = arrayGroupBy(values.participants, 'type');
            Object.keys(participants).forEach(type => {
                participants[type] = participants[type].map(participant => participant.value);
            })
            request.put(`v2/company/event/${agenda.id}`, {...values, participants })
                .then(res => {
                    onEdited(res.data.data, 'EDIT');
                })
                .catch(err => {
                    toast.error(err.response?.data?.message ?? 'Terjadi Galat');
                })
                .finally(() => setSubmitting(false));
        }
    });

    const handleChangeDate = useCallback((_,formattedDate) => {
        setFieldTouched('date');
        setFieldValue('date', formattedDate);
    }, [setFieldTouched, setFieldValue]);
    
    const participants = useMemo(() => {
        return arrayGroupBy(values.participants, 'type');
    }, [values.participants]);

    const handleParticipantChange = useCallback((options, action) => {
        if (action.option?.type === 'all') {
            setFieldValue('participants', options.filter(opt => !['personnel', 'unit', 'job'].includes(opt.type)));
        } else {
            setFieldValue('participants', options || []);
        }
    }, [setFieldValue]);

    const [showModalOptionalMessage, setShowModalOptionalMessage] = useState(false);
    useEffect(() => {
        if (!!agenda) {
            setShowModalOptionalMessage(false);
        }
    }, [agenda])
    const handleChangeOptMessage = useCallback((event) => {
        setFieldValue('optionalMessage', event.target.value);
    },[setFieldValue])

    const cancelModalOptionalMessage = useCallback(() => {
        setShowModalOptionalMessage(false);
    }, []);

    const hasChanged = useMemo(() => !dequal(formik.initialValues, values), [formik.initialValues, values]);

    const onSubmit = useCallback(() => {
        validateForm().then(() => {
            setShowModalOptionalMessage(true);
        });
    }, [validateForm])

    const [showModalDeleteMessage, setShowModalDeleteMessage] = useState(false);
    useEffect(() => {
        if (!!agenda) {
            setShowModalDeleteMessage(false);
        }
    }, [agenda])
    const [deleteMessage, setDeleteMessage] = useState('');
    const handleChangeDeleteMessage = useCallback((event) => {
        setDeleteMessage(event.target.value)
    }, []);

    const cancelModalDeleteMessage = useCallback(() => {
        setShowModalDeleteMessage(false);
    }, [])

    const handleDelete = useCallback(() => {
        setDeleteMessage('');
        setShowModalDeleteMessage(true);
    }, [])

    const [isDeleting, setIsDeleting] = useState(false);
    const onDelete = useCallback(() => {
        setIsDeleting(true);
        request.delete(`v2/company/event/${agenda.id}`, { data: { optionalMessage: deleteMessage }})
            .then(() => {
                onEdited(agenda, 'DELETE');
            }).catch(err => {
                toast.error(err.response?.data?.message ?? 'Terjadi Galat');
            }).finally(() => {
                setIsDeleting(false);
            })
    }, [deleteMessage, onEdited, agenda]);

    const modalRef = useRef();
    
    return (
        <Modal isOpen={showModal} toggle={cancel} scrollable className="h-100 modal-document" innerRef={modalRef}>
            <ModalHeader className="content-sub-title mb-0" toggle={cancel}>
                {t('Detail Agenda')}
            </ModalHeader>
            {preparing ? 
                <ModalBody className="d-flex justify-content-center align-items-center" style={{ height: 200 }}>
                    <Spinner style={{width: 48, height: 48 }} />
                </ModalBody>
                :
                <ModalBody className="py-3" style={{ overflowY: 'scroll' }}>
                    <Modal isOpen={showModalOptionalMessage}>
                        <ModalBody>
                            <FormGroup>
                                <Label htmlFor="update-optional-message" className="input-label">{t('pesan')}({t('Optional')})</Label>
                                <Input id="update-optional-message" type="textarea" name="optional_message" placeholder={t('Pesan pembaharuan untuk peserta agenda')} rows="3" value={values.optionalMessage} onChange={handleChangeOptMessage}/>
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <button type="button" className="btn btn-secondary ml-auto" disabled={formik.isSubmitting} onClick={cancelModalOptionalMessage}>{t('batal')}</button>
                            <button className="btn btn-netis-primary text-capitalize" disabled={formik.isSubmitting} onClick={formik.handleSubmit}>
                                {formik.isSubmitting ? <Spinner color="light" size="sm" /> : t('kirim') }
                            </button>
                        </ModalFooter>
                    </Modal>
                    <Modal isOpen={showModalDeleteMessage}>
                        <ModalBody>
                            <FormGroup>
                                <Label htmlFor="update-optional-message" className="input-label">Pesan (opsional)</Label>
                                <Input id="update-optional-message" type="textarea" name="optional_message" placeholder={t('Pesan pembatalan untuk peserta agenda')} rows="3" value={deleteMessage} onChange={handleChangeDeleteMessage}/>
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <button type="button" className="btn btn-secondary ml-auto" disabled={isDeleting} onClick={cancelModalDeleteMessage}>{t('batal')}</button>
                            <button className="btn btn-netis-primary text-capitalize" disabled={isDeleting} onClick={onDelete}>
                                {isDeleting ? <Spinner color="light" size="sm" /> : t('kirim') }
                            </button>
                        </ModalFooter>
                    </Modal>
                    <FormGroup>
                        <Label htmlFor="title-update-agenda" className="input-label">{t('Nama Agenda')}</Label>
                        <Input type="text" name="title" id="title-update-agenda" placeholder={t('Nama Agenda')}
                            disabled={formik.isSubmitting}
                            value={values.title}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            invalid={Boolean(touched.title && errors.title)}
                            />
                        <FormFeedback>{errors.title}</FormFeedback>
                    </FormGroup>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <Label htmlFor="date-update-agenda" className="input-label">{t('tanggal')}</Label>
                            <DatePickerInput
                                id="date-update-agenda"
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
                        </div>
                        <div className="col-md-8">
                            <Label htmlFor="start" className="input-label">{t('jam')}</Label>
                            <div className="form-row">
                                <FormGroup className="col-5 col-md-auto flex-md-grow-1">
                                    <ReactInputMask className="form-control pr-2/5" name="start" mask="99:99" placeholder={t('contoh') + ' : 08:00'}
                                        disabled={formik.isSubmitting}
                                        value={values.start}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    >
                                        {(inputProps) => <Input {...inputProps} invalid={Boolean(touched.start && errors.start)} />}
                                    </ReactInputMask>
                                    {touched.start && errors.start && <FormFeedback>{errors.start}</FormFeedback>}
                                </FormGroup>
                                <FormGroup className="col-2 col-md-1 d-flex align-items-start justify-content-center">
                                    <Label className="input-label m-0" style={{ lineHeight: 'calc(1.6em + 0.75rem + 3px)'}}>{t('s/d')}</Label>
                                </FormGroup>
                                <FormGroup className="col-5 col-md-auto flex-md-grow-1">
                                    <ReactInputMask className="form-control pr-2/5" name="end" mask="99:99" placeholder={t('contoh') + ' : 09:00'}
                                        disabled={formik.isSubmitting}
                                        value={values.end}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    >
                                        {(inputProps) => <Input {...inputProps} invalid={Boolean(touched.end && errors.end)} />}
                                    </ReactInputMask>
                                    {touched.end && errors.end && <FormFeedback className="text-nowrap">{errors.end}</FormFeedback>}
                                </FormGroup>
                            </div>
                        </div>
                    </div>
                    <FormGroup>
                        <Label htmlFor="description-update-agenda" className="input-label">{t('deskripsi')}</Label>
                        <Input type="textarea" name="description" id="description-update-agenda" placeholder={t('deskripsi')}
                            disabled={formik.isSubmitting}
                            value={values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="participant-update-agenda" className="input-label text-capitalize">{t('peserta')}</Label>
                        <CreatableSelect 
                            isClearable={false}
                            isMulti
                            placeholder="Masukkan nama karyawan, unit, jabatan, atau email"
                            onChange={handleParticipantChange}
                            value={values.participants}
                            isValidNewOption={(inputValue) => validateEmail(inputValue)}
                            getNewOptionData={(inputValue) => ({ value: inputValue, label: `Undang "${inputValue}"`, email: inputValue, type: 'email'})}
                            options={participants.all ? [] : options}
                            formatGroupLabel={(data) => <div style={{ display: 'flex', alignItems: 'center'}}><span style={{ fontWeight: 'bold', fontSize: '10px', letterSpacing: '1px' }} className="text-muted">{data.label}</span></div>}
                            noOptionsMessage={(inputValue) => <span>Masukkan email untuk mengundang via email</span>}
                            components={{
                                Option: (props) => (<SelectComponents.Option {...props}>
                                    <i className={`mr-2 ${iconClassByOptionType[props.data.type]}`}></i>
                                    {props.data.label}
                                </SelectComponents.Option>),
                            }}
                            filterOption={(candidate, input) => {
                                if (candidate.data.type === 'email') {
                                    return true;
                                }
                                if (candidate.label.toLowerCase().includes(input.toLowerCase())) {
                                    return true;
                                }
                                if (input.includes('@') && candidate.data.type === 'personnel') {
                                    return candidate.data.personnel.email.toLowerCase().includes(input.toLowerCase());
                                }
                                return false;
                            }}
                            controlShouldRenderValue={false}
                            styles={{ menuPortal: base => ({...base, zIndex: 9999 })}}
                            menuPortalTarget={modalRef.current}
                            menuPosition="absolute"
                            menuPlacement="auto"
                            menuShouldScrollIntoView={false}
                        />
                    </FormGroup>
                    {participants.all && 
                        <div className="admin-calendar-selected-participants mt-1">
                            <div key={participants.all[0].value} className="admin-calendar-selected-participants-item">
                                <i className={`mr-3 ${iconClassByOptionType['all']}`}></i>
                                {participants.all[0].label}
                                <button className="btn btn-sm btn-danger py-0 px-1 ml-auto" onClick={() => setFieldValue('participants', values.participants.filter(p => p.type !== 'all'))}><i className="fa fa-close"></i></button>
                            </div>
                        </div>
                    }
                    {participants.unit && <div>
                        <span className="admin-calendar-selected-participants-title text-muted">Unit</span>
                        <div className="admin-calendar-selected-participants mt-1">
                            {participants.unit.map(participant => (
                                <div key={participant.value} className="admin-calendar-selected-participants-item">
                                    <i className={`mr-3 ${iconClassByOptionType[participant.type]}`}></i>
                                    {participant.label}
                                    <button className="btn btn-sm btn-danger py-0 px-1 ml-auto" onClick={() => formik.setValues(values => ({...values, participants: values.participants.filter(p => p !== participant)}))}><i className="fa fa-close"></i></button>
                                </div>
                            ))}
                        </div>
                    </div>}
                    {participants.job && <div>
                        <span className="admin-calendar-selected-participants-title text-muted">Jabatan</span>
                        <div className="admin-calendar-selected-participants mt-1">
                            {participants.job.map(participant => (
                                <div key={participant.value} className="admin-calendar-selected-participants-item">
                                    <i className={`mr-3 ${iconClassByOptionType[participant.type]}`}></i>
                                    {participant.label}
                                    <button className="btn btn-sm btn-danger py-0 px-1 ml-auto" onClick={() => formik.setValues(values => ({...values, participants: values.participants.filter(p => p !== participant)}))}><i className="fa fa-close"></i></button>
                                </div>
                            ))}
                        </div>
                    </div>}
                    {participants.personnel && <div>
                        <span className="admin-calendar-selected-participants-title text-muted">Karyawan</span>
                        <div className="admin-calendar-selected-participants mt-1">
                            {participants.personnel.map(participant => (
                                <div key={participant.value} className="admin-calendar-selected-participants-item">
                                    <i className={`mr-3 ${iconClassByOptionType[participant.type]}`}></i>
                                    {participant.label}
                                    <button className="btn btn-sm btn-danger py-0 px-1 ml-auto" onClick={() => formik.setValues(values => ({...values, participants: values.participants.filter(p => p !== participant)}))}><i className="fa fa-close"></i></button>
                                </div>
                            ))}
                        </div>
                    </div>}
                    {participants.email && <div>
                        <span className="admin-calendar-selected-participants-title text-muted">Undangan Email</span>
                        <div className="admin-calendar-selected-participants mt-1">
                            {participants.email.map(participant => (
                                <div key={participant.value} className="admin-calendar-selected-participants-item">
                                    <i className={`mr-3 ${iconClassByOptionType[participant.type]}`}></i>
                                    {participant.value}
                                    <button className="btn btn-sm btn-danger py-0 px-1 ml-auto" onClick={() => formik.setValues(values => ({...values, participants: values.participants.filter(p => p !== participant)}))}><i className="fa fa-close"></i></button>
                                </div>
                            ))}
                        </div>
                    </div>}
                </ModalBody>
            }
            <ModalFooter className="d-flex">
                <button type="button" className="btn btn-link text-danger mr-auto" disabled={formik.isSubmitting} onClick={handleDelete}><i className="fa fa-trash-o mr-1"></i> {t('hapus')} agenda</button>
                <button type="button" className="btn btn-secondary ml-auto" disabled={formik.isSubmitting} onClick={cancel}>{t('batal')}</button>
                <button className="btn btn-netis-primary" disabled={formik.isSubmitting || !hasChanged} onClick={onSubmit}>
                    {formik.isSubmitting ? <Spinner color="light" size="sm" /> : t('simpan') }
                </button>
            </ModalFooter>
        </Modal>
    );
})

export default EditCalendarModal;
