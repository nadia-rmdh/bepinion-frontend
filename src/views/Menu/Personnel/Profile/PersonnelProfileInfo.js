import React, {useState, useEffect} from 'react';
import { Button, Row, Form, FormGroup, Label, Input, Spinner } from 'reactstrap';
import {translate, t} from 'react-switch-lang';
import { useUserPrivileges } from '../../../../store';
import Select from 'react-select';
import { DatePickerInput } from 'rc-datepicker';
import { useFormik } from 'formik';
import request from '../../../../utils/request';
import DataNotFound from '../../../../components/DataNotFound';
import { toast } from 'react-toastify';
import { formatDate } from '../../../../utils/formatter';

const statuses = [
    { value: 'pekerjatetap', label: t('pekerjatetap') },
    { value: 'kontrak', label: t('pekerjakontrak') },
    { value: 'pekerjalepas', label: t('pekerjalepas') },
    { value: 'magang', label: t('magang') },
]

function PersonnelProfileInfo({info}){

    const {can} = useUserPrivileges();
    const [jobs, setJobs] = useState([]);
    const [roles, setRoles] = useState([]);
    const [units, setUnits] = useState([]);
    const [parents, setParents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [notFound, setNotFound] = useState(false)
    const [editInfo, setEditInfo] = useState(false)
    const [avatar, setAvatar] = useState(info.avatar)
    const [initial, setInitial] = useState({
        fullName: info.fullName,
        nickName: info.nickName,
        job: {
            value: info.job.id,
            label: info.job.name
        },
        unit: {
            value: info.unit.id,
            label: info.unit.name
        },
        parent: {
            value: info.parentId.id,
            label: info.parentId.name
        },
        role: {
            value: info.roleId.id,
            label: info.roleId.name
        },
        status: info.status,
        joinDate: info.joinDate
    })
    const [image, setImage] = useState({
        preview: '',
        raw: ''
    })
    const {values, ...formik} = useFormik({
        initialValues:{
            fullName: initial.fullName,
            nickName: initial.nickName,
            job: {
                value: initial.job.value,
                label: initial.job.label
            },
            unit: {
                value: initial.unit.value,
                label: initial.unit.label
            },
            parent: {
                value: initial.parent.value,
                label: initial.parent.label
            },
            role: {
                value: initial.role.value,
                label: initial.role.label
            },
            status: initial.status,
            joinDate: initial.joinDate
        },
        onSubmit: (values, {setSubmitting, setErrors}) => {
            setLoading(true)
            setSubmitting(true)
            if (!can('edit-employee-profile')) {
                toast.error('Maaf anda tidah boleh melakukan aksi ini.')
                setLoading(false)
                setSubmitting(false)
                return
            }
            else {
                    if(image.preview){
                        let formImage =  new FormData();
                        formImage.append('ava', avatar)
                        request.post('v1/personnels/avatar/' + info.id, formImage)
                            .then(() => {
                                console.log("Success upload Profile Picture")
                            })
                            .catch(errorImage => {
                                console.log(errorImage)
                                setErrors(errorImage.response.data.errors);
                                toast.error('Gagal Mengunggah Foto Profil')
                                return;
                            })
                    }
                    console.log(values)
                    request.put('v1/personnels/' + info.id, {
                        fullName: values.fullName,
                        nickName: values.nickName,
                        jobId: values.job?.value ?? null,
                        unitId: values.unit?.value ?? null,
                        parent: values.parent?.value ?? null,
                        roleId: values.role?.value ?? null,
                        status: values.status?.value ?? null,
                        joinDate: formatDate(values.joinDate)
                    })
                        .then(res => {
                            toast.success('Berhasil Mengedit Informasi Umum')
                            setEditInfo(false)
                            setInitial({
                                fullName: values.fullName,
                                nickName: values.nickName,
                                job: {
                                    value: values.job?.value,
                                    label: values.job?.label
                                },
                                unit: {
                                    value: values.unit?.value,
                                    label: values.unit?.label
                                },
                                parent: {
                                    value: values.parent?.value,
                                    label: values.parent?.label
                                },
                                role: {
                                    value: values.role?.value,
                                    label: values.role?.label
                                },
                                status: values.status?.value,
                                joinDate: values.joinDate
                            })
                        })
                        .catch(err => {
                            console.log(err)
                            toast.error('Gagal Mengedit Informasi Umum')
                            return;
                        })
                        .finally(() => {
                            setLoading(false)
                            setSubmitting(false)
                        })
            }
        }
    })

    useEffect(() => {
        getJobs();
        getUnit();
        getRoles();
        getParents();
        // eslint-disable-next-line
    },[])

    function getJobs(){
        request.get('v1/master/jobs')
        .then(res =>{
            setJobs(res.data.data);
        })
        .catch(err => {
            if (err.response.status === 404) {
                setNotFound(true);
            }
        })
    }
    function getUnit(){
        request.get('v1/master/units')
        .then(res =>{
            setUnits(res.data.data);
        })
        .catch(err => {
            if (err.response.status === 404) {
                setNotFound(true);
            }
        })
    }
    function getRoles(){
        request.get('v1/master/roles')
        .then(res =>{
            setRoles(res.data.data.concat([{ id: 'User', 'name': 'User' }]));
        })
        .catch(err => {
            if (err.response.status === 404) {
                setNotFound(true);
            }
        })
    }
    function getParents(){
        request.get('v1/personnels/parent/'+ info.id)
        .then(res =>{
            setParents(res.data.data);
        })
        .catch(err => {
            if (err.response.status === 404) {
                setNotFound(true);
            }
        })
    }

    const changeAvatar = (e) => {
        e.preventDefault();
        if (e.target.files.length) {
            let preview = { ...image };
            preview['preview'] = URL.createObjectURL(e.target.files[0]);
            setAvatar(e.target.files[0])
            setImage(preview)
        }
    }

    const jobOption = jobs.map(jobs =>
        ({value : jobs.id, label: jobs.name})
    )
    const roleOption = roles.map(roles =>
        ({value : roles.id, label: roles.name})
    )
    const unitOption = units.map(units =>
        ({value : units.id, label: units.name})
    )
    const parentOption = parents.map(parents =>
        ({value : parents.id, label: parents.fullName})
    )

    const changeJob = function(pilihan){
        formik.setFieldValue('job', pilihan);
        formik.setFieldTouched('job', true)
    }
    const changeRole = function(pilihan){
        formik.setFieldValue('role', pilihan);
        formik.setFieldTouched('role', true)
    }
    const changeUnit = function(pilihan){
        formik.setFieldValue('unit', pilihan);
        formik.setFieldTouched('unit', true)
    }
    const changeParent = function(pilihan){
        formik.setFieldValue('parent', pilihan);
        formik.setFieldTouched('parent', true)
    }
    const changeStatus = function(pilihan){
        formik.setFieldValue('status', pilihan);
        formik.setFieldTouched('status', true)
    }
    const onDatepickerChange = function (val) {
        formik.setFieldTouched('joinDate', true);
        formik.setFieldValue('joinDate', val instanceof Date && !isNaN(val) ? val : undefined, true);
    };
    const onDatepickerClear = React.useCallback(function () {
        formik.setFieldTouched('joinDate', true);
        formik.setFieldValue('joinDate', undefined, true);
    }, [formik]);

    const cancelEditInfo = () => {
        setEditInfo(false)
        formik.handleReset()
        setImage(info.avatar)
        setAvatar(info.avatar)
    }


    if (notFound) {
        return <DataNotFound />
    }

    return(
        <div>
            {/* <Button onClick={() => console.log(info)} /> */}
            <Form onSubmit={formik.handleSubmit}>
                <Row className="my-1">
                    <div className="col-12 d-flex justify-content-between align-items-center mb-3">
                        <h5 className="content-sub-title mb-0">{t('informasiumum')}</h5>
                        {!editInfo ? 
                            <Button color="netis-color" 
                            className={`${can('edit-employee-profile') ? '' : ' d-none'}`}
                            onClick={() => setEditInfo(true)}
                            >
                                <i className="fa fa-pencil" style={{ marginRight: 5 }}></i>Edit
                            </Button>
                            : null
                        }
                    </div>
                </Row>
                <Row className="my-1">
                    <div className="col-md-4">
                        <div className="text-center">
                        {avatar === null ?
                            image.preview ?
                                (
                                    <img src={image.preview} alt="dummy" width="200px" height="auto" />
                                ) :
                                (
                                    <div className="frame-profile-picture-empty">
                                        {t('belumadafoto')}
                                    </div>
                                ) :
                            image.preview ?
                                (
                                    <img src={image.preview} alt="dummy" width="200px" height="auto" />
                                ) :
                                (
                                    <div className="frame-profile-picture">
                                        <img src={process.env.REACT_APP_DOMAIN + "" + info.avatar} alt="avatar" className="img-fluid" />
                                    </div>
                                )
                        }
                        </div>
                        {editInfo ?
                            <FormGroup>
                                <p className="text-center"> Upload Avatar <span style={{ fontWeight: 'bold' }} >( Max. 5 MB )</span></p>
                                <Input type="file" id="avatar" accept="image/x-png,image/jpeg" name="avatar" onChange={changeAvatar} />
                            </FormGroup>
                        : null
                        }
                    </div>
                    <div className="col-md-8">
                        <FormGroup>
                            <Label htmlFor="fullName" className="input-label">{t('namalengkap')}</Label>
                            <Input type="text" id="fullName" name="fullName" placeholder={t('namalengkap')}
                                disabled={editInfo === false ? true : false}
                                value={values.fullName} onChange={formik.handleChange} required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="nickName" className="input-label">{t('namapanggilan')}</Label>
                            <Input type="text" id="nickName" name="nickName" placeholder={t('namapanggilan')}
                                disabled={editInfo === false ? true : false}
                                value={values.nickName} onChange={formik.handleChange} required
                            />
                        </FormGroup>
                    </div>
                </Row>
                {can('edit-employee-profile') ?
                <>
                    <Row style={{ marginBottom: 20 }} className="my-1">
                        <div className="col-md-4">
                            <FormGroup >
                                <Label htmlFor="job" className="input-label">{t('jabatan')}</Label>
                                <Select
                                    value={values.job}
                                    onChange={changeJob}
                                    options={jobOption}
                                    isDisabled={editInfo === false ? true : false}
                                />
                            </FormGroup>
                        </div>
                        <div className="col-md-4">
                            <FormGroup style={{ marginBottom: 5 }}>
                                <Label htmlFor="unit" className="input-label">Unit</Label>
                                <Select
                                    name="unit"
                                    value={values.unit}
                                    onChange={changeUnit}
                                    options={unitOption}
                                    isDisabled={editInfo === false ? true : false}
                                />
                            </FormGroup>
                        </div>
                        <div className="col-md-4">
                            <FormGroup>
                                <Label htmlFor="parentId" className="input-label">{t('atasan')}</Label>
                                <Select
                                    value={parentOption.find(parent => parent.value === values.parent.value)}
                                    onChange={changeParent}
                                    options={parentOption}
                                    isDisabled={editInfo === false ? true : false}
                                />
                            </FormGroup>
                        </div>
                    </Row>
                    <Row>
                        <div className="col-md-4">
                            <FormGroup>
                                <Label htmlFor="parentId" className="input-label">Role User</Label>
                                <Select
                                    value={roleOption.find(role => values.role?.value ? role.value === values.role.value : role.value === 'User')}
                                    onChange={changeRole}
                                    options={roleOption}
                                    isDisabled={editInfo === false ? true : false}
                                />
                            </FormGroup>
                        </div>
                        <div className="col-md-4">
                            <FormGroup>
                                <Label htmlFor="joinDate" className="input-label">{t('tanggalbergabung')}</Label>
                                <DatePickerInput
                                    onClear={onDatepickerClear}
                                    showOnInputClick={true}
                                    closeOnClickOutside={true}
                                    onChange={onDatepickerChange}
                                    disabled={editInfo === false ? true : false}
                                    value={values.joinDate}
                                    className='my-custom-datepicker-component'
                                    displayFormat="DD MMMM YYYY"
                                    readOnly
                                    maxDate={new Date()}
                                />
                            </FormGroup>
                        </div>
                        <div className="col-md-4">
                            <FormGroup>
                                <Label htmlFor="contractStatus" className="input-label">{t('kontrakstatus')}</Label>
                                <Select
                                    value={statuses.find(stat => stat.value === values.status)}
                                    onChange={changeStatus}
                                    options={statuses}
                                    isDisabled={editInfo === false ? true : false}
                                />
                            </FormGroup>
                        </div>
                    </Row>
                </>
                    :
                    null
                }
                <Row>
                    <div className="col-12 d-flex justify-content-end">
                        {
                            editInfo ?
                                <>
                                    <Button color="white" disabled={loading} className="btn-white mr-3" onClick={cancelEditInfo}>{t('batal')}</Button>
                                    <Button type="submit" disabled={loading} color="netis-color" style={{ width: '67px' }}>
                                        {loading ? <Spinner color="light" size="sm" /> : t('simpan')}
                                    </Button>
                                </>
                            : null
                        }
                    </div>
                </Row>
            </Form>
        </div>
    )
}

export default translate(PersonnelProfileInfo)
