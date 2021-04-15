import React, {useState} from 'react';
import { Button, Row, Form, FormGroup, Label, Input, Spinner } from 'reactstrap';
import {translate, t} from 'react-switch-lang';
import { useUserPrivileges } from '../../../../store';
import Select from 'react-select';
import { DatePickerInput } from 'rc-datepicker';
import { useFormik } from 'formik';
import request from '../../../../utils/request';
import { toast } from 'react-toastify';

const genderOption = [
    {value: 1, label: t('Laki-laki')},
    {value: 2, label: t('Perempuan')}
]

const bloodOption = [
    {value:"A", label: "A"},
    {value:"B", label: "B"},
    {value:"O", label: "O"},
    {value:"AB", label: "AB"}
]

const religionOption = [
    {value: 1, label: t('Islam')},
    {value: 2, label: t('Kristen')},
    {value: 3, label: t('Katolik')},
    {value: 4, label: t('Hindu')},
    {value: 5, label: t('Budha')}
]

const maritalOption = [
    {value: 1, label: t('Lajang')},
    {value: 2, label: t('Nikah')},
    {value: 3, label:t('Cerai') }
]

function PersonnelProfileIdentity({identity, country}){

    const {can} = useUserPrivileges();
    const [editIdentity, setEditIdentity] = useState(false)
    const countries = country
    const [loading, setLoading] = useState(false)

    const [initial, setInitial] = useState({
        bloodType: {
            value: identity.bloodType,
            label: identity.bloodType
        },
        child: identity.child,
        citizenship: {
            value: identity.citizenship.id,
            label: identity.citizenship.name
        },
        dateOfBirth: identity.dateOfBirth,
        gender: {
            value: identity.gender.id,
            label: identity.gender.name
        },
        maritalStatus: {
            value: identity.maritalStatus.id,
            label: identity.maritalStatus.name
        },
        nationalId: identity.nationalId,
        npwp: identity.npwp,
        passport: identity.passport,
        passportIssuer: {
            value: identity.passportIssuer.id,
            label: identity.passportIssuer.name
        },
        placeOfBirth: identity.placeOfBirth,
        religion: {
            value: identity.religion.id,
            label: identity.religion.name
        }
    })
    const {values, ...formik} = useFormik({
        initialValues:{
            bloodType: {
                value: initial.bloodType.value,
                label: initial.bloodType.label
            },
            child: initial.child,
            citizenship: {
                value: initial.citizenship.value,
                label: initial.citizenship.label
            },
            dateOfBirth: initial.dateOfBirth,
            gender: {
                value: initial.gender.value,
                label: initial.gender.label
            },
            maritalStatus: {
                value: initial.maritalStatus.value,
                label: initial.maritalStatus.label
            },
            nationalId: initial.nationalId,
            npwp: initial.npwp,
            passport: initial.passport,
            passportIssuer: {
                value: initial.passportIssuer.value,
                label: initial.passportIssuer.label
            },
            placeOfBirth: initial.placeOfBirth,
            religion: {
                value: initial.religion.value,
                label: initial.religion.label
            }
        },
        onSubmit: (values, {setSubmitting, setErrors}) => {
            setSubmitting(true)
            setLoading(true)
            if (!can('edit-employee-profile')) {
                toast.error('Maaf anda tidah boleh melakukan aksi ini.')
                setLoading(false)
                setSubmitting(false)
                return
            }
            else{
                console.log(values.passportIssuer?.value ?? null)
                request.put('v1/personnels/' + identity.id, {
                    bloodType: values.bloodType?.value ,
                    child: values.child ,
                    citizenship: values.citizenship?.value ,
                    dateOfBirth: values.dateOfBirth ,
                    gender: values.gender?.value ,
                    maritalStatus: values.maritalStatus?.value ,
                    nationalId: values.nationalId ,
                    npwp: values.npwp ,
                    passport: values.passport ,
                    passportIssuer: values.passportIssuer?.value ?? null ,
                    placeOfBirth: values.placeOfBirth ,
                    religion: values.religion?.value
                })
                .then(res => {
                    toast.success('Berhasil Mengedit Identitas')
                    setEditIdentity(false)
                    setInitial({
                        bloodType:{
                            value: values.bloodType?.value,
                            label: values.bloodType?.label
                        },
                        citizenship:{
                            value: values.citizenship?.value,
                            label: values.citizenship?.label
                        },
                        gender:{
                            value: values.gender?.value,
                            label: values.gender?.label
                        },
                        maritalStatus:{
                            value: values.maritalStatus?.value,
                            label: values.maritalStatus?.label
                        },
                        passportIssuer:{
                            value: values.passportIssuer?.value,
                            label: values.passportIssuer?.label
                        },
                        religion:{
                            value: values.religion?.value,
                            label: values.religion?.label
                        },
                        child: values.child,
                        dateOfBirth: values.dateOfBirth,
                        nationalId: values.nationalId,
                        npwp: values.npwp,
                        passport: values.passport,
                        placeOfBirth: values.placeOfBirth
                    })
                })
                .catch(err => {
                    console.log(err)
                    setErrors(err.response.data.errors);
                    toast.error('Gagal Mengedit Identitas')
                    return;
                })
                .finally(() => {
                    setLoading(false)
                    setSubmitting(false)
                })
            }
        }
    })

    const countryOption = countries?.map(countries => 
        ({value:countries.id, label: countries.name})    
    )

    const onDatepickerChange = function (val) {
        formik.setFieldTouched('joinDate', true);
        formik.setFieldValue('joinDate', val instanceof Date && !isNaN(val) ? val : undefined, true);
    };
    const onDatepickerClear = React.useCallback(function () {
        formik.setFieldTouched('joinDate', true);
        formik.setFieldValue('joinDate', undefined, true);
    }, [formik]);

    const handleNumberOnly = (evt) => {
        var charCode = (evt.which) ? evt.which : evt.keyCode;
            if (charCode > 31 && (charCode < 48 || charCode > 57)){
                evt.preventDefault()
            }
            return true;
    }

    const changeBloodType = function(pilihan){
        formik.setFieldValue('bloodType', pilihan);
        formik.setFieldTouched('bloodType', true)
    }
    const changeCitizenship = function(pilihan){
        formik.setFieldValue('citizenship', pilihan);
        formik.setFieldTouched('citizenship', true)
    }
    const changeGender = function(pilihan){
        formik.setFieldValue('gender', pilihan);
        formik.setFieldTouched('gender', true)
    }
    const changeMarital = function(pilihan){
        formik.setFieldValue('maritalStatus', pilihan);
        formik.setFieldTouched('maritalStatus', true)
    }
    const changePassportIssuer = function(pilihan){
        formik.setFieldValue('passportIssuer', pilihan);
        formik.setFieldTouched('passportIssuer', true)
    }
    const changeReligion = function(pilihan){
        formik.setFieldValue('religion', pilihan);
        formik.setFieldTouched('religion', true)
    }

    const cancelEditIdentity = () => {
        setEditIdentity(false)
        formik.handleReset()
    }

    return(
        <div>
            <Form onSubmit={formik.handleSubmit}>
                <Row className="my-1">
                    <div className="col-12 d-flex justify-content-between align-items-center mb-3">
                        <h5 className="content-sub-title mb-0">{t('identitas')}</h5>
                        {!editIdentity ? 
                            <Button color="netis-color" 
                            className={`${can('edit-employee-profile') ? '' : ' d-none'}`}
                            onClick={() => setEditIdentity(true)}
                            >
                                <i className="fa fa-pencil" style={{ marginRight: 5 }}></i>Edit
                            </Button>
                            : null
                        }
                    </div>
                </Row>
                <Row className="my-1">
                    <div className="col-md-6">
                        <FormGroup>
                            <Label htmlFor="dateOfBirth" className="input-label">{t('tanggallahir')}</Label>
                            <DatePickerInput
                                disabled={editIdentity === false ? true : false}
                                showOnInputClick={true}
                                closeOnClickOutside={true}
                                onChange={onDatepickerChange}
                                onClear={onDatepickerClear}
                                value={values.dateOfBirth}
                                className='my-custom-datepicker-component'
                                displayFormat="DD MMMM YYYY"
                                readOnly
                                maxDate={new Date()}
                            />
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup>
                            <Label htmlFor="placeOfBirth" className="input-label">{t('tempatlahir')}</Label>
                            <Input type="text" id="placeOfBirth" name="placeOfBirth" placeholder={t('tempatlahir')}
                                disabled={editIdentity === false ? true : false} value={values.placeOfBirth} onChange={formik.handleChange} />
                        </FormGroup>
                    </div>
                </Row>
                <Row className="my-1">
                    <div className="col-md-6">
                        <FormGroup>
                            <Label htmlFor="gender" className="input-label">{t('jk')}</Label>
                            <Select
                                value={genderOption.find(gender => gender.value === values.gender.value)}
                                onChange={changeGender}
                                options={genderOption}
                                isDisabled={editIdentity === false ? true : false}
                            />
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup>
                            <Label htmlFor="nationality" className="input-label">{t('kewarganegaraan')}</Label>
                            <Select
                                value={countryOption.find(country => country.value === values.citizenship.value)}
                                onChange={changeCitizenship}
                                options={countryOption}
                                isDisabled={editIdentity === false ? true : false}
                            />
                        </FormGroup>
                    </div>
                </Row>
                <Row>
                    <div className="col-md-6">
                        <FormGroup>
                            <Label htmlFor="bloodType" className="input-label">{t('goldarah')}</Label>
                            <Select
                                value={bloodOption.find(blood => blood.value === values.bloodType.value)}
                                onChange={changeBloodType}
                                options={bloodOption}
                                isDisabled={editIdentity === false ? true : false}
                            />
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup>
                            <Label htmlFor="religion" className="input-label">{t('agama')}</Label>
                            <Select
                                value={religionOption.find(religion => religion.value === values.religion.value)}
                                onChange={changeReligion}
                                options={religionOption}
                                isDisabled={editIdentity === false ? true : false}
                            />
                        </FormGroup>
                    </div>
                </Row>
                <Row className="my-1">
                    <div className="col-md-6">
                        <FormGroup>
                            <Label htmlFor="maritalStatus" className="input-label">{t('statusperkawinan')}</Label>
                            <Select
                                value={maritalOption.find(marital => marital.value === values.maritalStatus.value)}
                                onChange={changeMarital}
                                options={maritalOption}
                                isDisabled={editIdentity === false ? true : false}
                            />
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup>
                            <Label htmlFor="child" className="input-label">{t('jumlahanak')}</Label>
                            <Input type="text" id="child" name="child" placeholder={t('jumlahanak')}
                                disabled={editIdentity === false ? true : false}
                                value={values.child}
                                onKeyPress={handleNumberOnly} pattern="[0-9]*" inputMode="numeric"
                                maxLength="30"
                                onChange={formik.handleChange} />
                        </FormGroup>
                    </div>
                </Row>
                <Row className="my-1">
                    <div className="col-md-6">
                        <FormGroup>
                            <Label htmlFor="nationalId" className="input-label">{t('nomor')} KTP</Label>
                            <Input type="text" id="nationalId" name="nationalId" placeholder={"Nomor KTP"}
                                disabled={editIdentity === false ? true : false}
                                value={values.nationalId}
                                onKeyPress={handleNumberOnly} pattern="[0-9]*" inputMode="numeric"
                                onChange={formik.handleChange} />
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup>
                            <Label htmlFor="npwp" className="input-label">{t('nomor')} NPWP</Label>
                            <Input type="text" id="npwp" name="npwp" placeholder={"Nomor NPWP"}
                                disabled={editIdentity === false ? true : false}
                                value={values.npwp}
                                onKeyPress={handleNumberOnly} pattern="[0-9]*" inputMode="numeric"
                                onChange={formik.handleChange} />
                        </FormGroup>
                    </div>
                </Row>
                <Row className="my-1">
                    <div className="col-md-6">
                        <FormGroup>
                            <Label htmlFor="passport" className="input-label">{t('nomor')} Passport</Label>
                            <Input type="text" id="passport" name="passport" placeholder={"Nomor Passport"}
                                disabled={editIdentity === false ? true : false}
                                value={values.passport}
                                onKeyPress={handleNumberOnly} pattern="[0-9]*" inputMode="numeric"
                                onChange={formik.handleChange} />
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup>
                            <Label htmlFor="passportIssuer" className="input-label">{t('negara')} Passport</Label>
                            <Select
                                value={countryOption.find(country => country.value === values.passportIssuer?.value)}
                                onChange={changePassportIssuer}
                                options={countryOption}
                                isDisabled={editIdentity === false ? true : false}
                                isClearable={true}
                            />
                        </FormGroup>
                    </div>
                </Row>
                        <Row>
                            <div className="col-12 d-flex justify-content-end">
                                {
                                    editIdentity ?
                                        <>
                                            <Button color="white" disabled={loading} className="btn-white mr-3" onClick={cancelEditIdentity}>{t('batal')}</Button>
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

export default translate(PersonnelProfileIdentity);