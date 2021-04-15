import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { t, translate } from 'react-switch-lang';
import { Row, Button, Form, FormGroup, Input, Label, Spinner, CustomInput, Collapse } from 'reactstrap';
import { useUserPrivileges } from '../../../../store';
import { useFormik } from 'formik';
import request from '../../../../utils/request';
import { toast } from 'react-toastify';
import DataNotFound from '../../../../components/DataNotFound';

function PersonnelProfileAddress({ address, country }) {

    const {can} = useUserPrivileges();
    const [editAddress, setEditAddress] = useState(false)
    const [loading, setLoading] = useState(false)
    const [notFound, setNotFound] = useState(false)
    const [sameAddress, setSameAddress] = useState(() => {
        const { identityAddress, currentAddress } = address;
        return identityAddress.country.id === currentAddress.country.id
            && identityAddress.province.id === currentAddress.country.id
            && identityAddress.city.id === currentAddress.city.id
            && identityAddress.district.id === currentAddress.district.id
            && identityAddress.village.id === currentAddress.village.id
            && identityAddress.postalCode === currentAddress.postalCode
            && identityAddress.address === currentAddress.address
    })

    const [countries, setCountries] = useState([])

    const [editIdentityProvince, setEditIdentityProvince] = useState(false)
    const [editIdentityCity, setEditIdentityCity] = useState(false)
    const [editIdentityDistrict, setEditIdentityDistrict] = useState(false)
    const [editIdentityVillage, setEditIdentityVillage] = useState(false)

    const [editCurrentProvince, setEditCurrentProvince] = useState(false)
    const [editCurrentCity, setEditCurrentCity] = useState(false)
    const [editCurrentDistrict, setEditCurrentDistrict] = useState(false)
    const [editCurrentVillage, setEditCurrentVillage] = useState(false)

    const [loadingIdentityProvince, setLoadingIdentityProvince] = useState(false)
    const [loadingIdentityCity, setLoadingIdentityCity] = useState(false)
    const [loadingIdentityDistrict, setLoadingIdentityDistrict] = useState(false)
    const [loadingIdentityVillage, setLoadingIdentityVillage] = useState(false)

    const [loadingCurrentProvince, setLoadingCurrentProvince] = useState(false)
    const [loadingCurrentCity, setLoadingCurrentCity] = useState(false)
    const [loadingCurrentDistrict, setLoadingCurrentDistrict] = useState(false)
    const [loadingCurrentVillage, setLoadingCurrentVillage] = useState(false)
    
    const [identityProvinces, setIdentityProvinces] = useState(address.identityAddress?.province?.id ? [address.identityAddress?.province] : [])
    const [identityCities, setidentityCities] = useState(address.identityAddress?.city?.id ? [address.identityAddress?.city] : [])
    const [identityDistricts, setidentityDistricts] = useState(address.identityAddress?.district?.id ? [address.identityAddress?.district] : [])
    const [identityVillages, setidentityVillages] = useState(address.identityAddress?.village?.id ? [address.identityAddress?.village] : [])

    const [currentCities, setCurrentCities] = useState(address.currentAddress?.city?.id ? [address.currentAddress?.city] : [])
    const [currentProvinces, setCurrentProvinces] = useState(address.currentAddress?.province?.id ? [address.currentAddress?.province] : [])
    const [currentDistricts, setCurrentDistricts] = useState(address.currentAddress?.district?.id ? [address.currentAddress?.district] : [])
    const [currentVillages, setCurrentVillages] = useState(address.currentAddress?.village?.id ? [address.currentAddress?.village] : [])

    const [initialCurrent, setInitialCurrent] = useState({
        country:{
            value: address.currentAddress.country?.id,
            label: address.currentAddress.country?.name
        },
        province:{
            value: address.currentAddress.province?.id,
            label: address.currentAddress.province?.name
        },
        city:{
            value: address.currentAddress.city?.id,
            label: address.currentAddress.city?.name
        },
        district: {
            value: address.currentAddress.district?.id,
            label: address.currentAddress.district?.name
        },
        village: {
            value: address.currentAddress.village?.id,
            label: address.currentAddress.village?.name
        },
        postalCode : address.currentAddress.postalCode,
        address: address.currentAddress.address
    })

    const [initialIdentity, setInitialIdentity] = useState({
        country:{
            value: address.identityAddress.country?.id,
            label: address.identityAddress.country?.name
        },
        province:{
            value: address.identityAddress.province?.id,
            label: address.identityAddress.province?.name
        },
        city:{
            value: address.identityAddress.city?.id,
            label: address.identityAddress.city?.name
        },
        district: {
            value: address.identityAddress.district?.id,
            label: address.identityAddress.district?.name
        },
        village: {
            value: address.identityAddress.village?.id,
            label: address.identityAddress.village?.name
        },
        postalCode : address.identityAddress.postalCode,
        address: address.identityAddress.address
    })

    const {values, ...formik} = useFormik({
        initialValues:{
            currentCountry:{
                value: initialCurrent.country?.value,
                label: initialCurrent.country?.label
            },
            currentProvince:{
                value: initialCurrent.province?.value,
                label: initialCurrent.province?.label
            },
            currentCity:{
                value: initialCurrent.city?.value,
                label: initialCurrent.city?.label
            },
            currentDistrict:{
                value: initialCurrent.district?.value,
                label: initialCurrent.district?.label
            },
            currentVillage:{
                value: initialCurrent.village?.value,
                label: initialCurrent.village?.label
            },
            currentPostalCode: initialCurrent.postalCode,
            currentAddress: initialCurrent.address,
            identityCountry:{
                value: initialIdentity.country?.value,
                label: initialIdentity.country?.label
            },
            identityProvince:{
                value: initialIdentity.province?.value,
                label: initialIdentity.province?.label
            },
            identityCity:{
                value: initialIdentity.city?.value,
                label: initialIdentity.city?.label
            },
            identityDistrict:{
                value: initialIdentity.district?.value,
                label: initialIdentity.district?.label
            },
            identityVillage:{
                value: initialIdentity.village?.value,
                label: initialIdentity.village?.label
            },
            identityPostalCode: initialIdentity.postalCode,
            identityAddress: initialIdentity.address,
            sameCheck: sameAddress
            
        },
        onSubmit:(values, {setSubmitting, setErrors}) => {
            setSubmitting(true)
            setLoading(true)
            if (!can('edit-employee-profile')) {
                toast.error('Maaf anda tidah boleh melakukan aksi ini.')
                setLoading(false)
                setSubmitting(false)
                return
            }
            else{
                console.log(values)
                request.put('v1/personnels/' + address.id, {
                    currentCountry:values.sameCheck ? values.identityCountry?.value : values.currentCountry?.value ?? null,
                    currentProvince:values.sameCheck ? values.identityProvince?.value : values.currentProvince?.value ?? null,
                    currentCity:values.sameCheck ? values.identityCity?.value : values.currentCity?.value ?? null,
                    currentDistrict:values.sameCheck ? values.identityDistrict?.value : values.currentDistrict?.value ?? null,
                    currentVillage:values.sameCheck ? values.identityVillage?.value : values.currentVillage?.value ?? null,
                    currentPostalCode:values.sameCheck ? values.identityPostalCode : values.currentPostalCode,
                    currentAddress:values.sameCheck ? values.identityAddress : values.currentAddress,
                    identityCountry: values.identityCountry?.value ?? null,
                    identityProvince: values.identityProvince?.value ?? null,
                    identityCity: values.identityCity?.value ?? null,
                    identityDistrict: values.identityDistrict?.value ?? null,
                    identityVillage: values.identityVillage?.value ?? null,
                    identityPostalCode: values.identityPostalCode,
                    identityAddress: values.identityAddress
                })
                    .then(() => {
                        toast.success('Sukses mengedit Alamat')
                        setEditAddress(false)
                        setInitialCurrent({
                            country:{
                                value: values.currentCountry?.value,
                                label: values.currentCountry?.label
                            },
                            province:{
                                value: values.currentProvince?.value,
                                label: values.currentProvince?.label
                            },
                            city:{
                                value: values.currentCity?.value,
                                label: values.currentCity?.label
                            },
                            district: {
                                value: values.currentDistrict?.value,
                                label: values.currentDistrict?.label
                            },
                            village: {
                                value: values.currentVillage?.value,
                                label: values.currentVillage?.label
                            },
                            postalCode : values.currentPostalCode,
                            address: values.currentAddress
                        })
                        setInitialIdentity({
                            country:{
                                value: values.identityCountry?.value,
                                label: values.identityCountry?.label
                            },
                            province:{
                                value: values.identityProvince?.value,
                                label: values.identityProvince?.label
                            },
                            city:{
                                value: values.identityCity?.value,
                                label: values.identityCity?.label
                            },
                            district: {
                                value: values.identityDistrict?.value,
                                label: values.identityDistrict?.label
                            },
                            village: {
                                value: values.identityVillage?.value,
                                label: values.identityVillage?.label
                            },
                            postalCode : values.identityPostalCode,
                            address: values.identityAddress
                        })
                        setSameAddress(values.sameCheck)
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

    useEffect(() => {
        setCountries(country)
        formik.setFieldValue('currentCountry', {
            value: address.currentAddress.country.id,
            label: address.currentAddress.country.name
        })
        formik.setFieldValue('identityCountry', {
            value: address.identityAddress.country.id,
            label: address.identityAddress.country.name
        })
    // eslint-disable-next-line
    }, [address, country])

    const changeIdentityCountry = function(pilihan){
        setEditIdentityProvince(false)
        setLoadingIdentityProvince(true)
        request.get('v1/location/provinces?countryId=' + pilihan.value)
            .then((res) => {
                setIdentityProvinces(res.data.data)
                setEditIdentityProvince(true)
                setLoadingIdentityProvince(false)
                formik.setFieldValue('identityProvince', null)
                formik.setFieldValue('identityCity', null)
                formik.setFieldValue('identityDistrict', null)
                formik.setFieldValue('identityVillage', null)
            })
            .catch(err => {
                if (err.response.status === 404) {
                    setNotFound(true);
                }
            })
        
        formik.setFieldValue('identityCountry', pilihan)
        formik.setFieldTouched('identityCountry', true)
    }
    const changeCurrentCountry = function(pilihan){
        setEditCurrentProvince(false)
        setLoadingCurrentProvince(true)
        request.get('v1/location/provinces?countryId=' + pilihan.value)
            .then((res) => {
                setCurrentProvinces(res.data.data)
                setEditCurrentProvince(true)
                setLoadingCurrentProvince(false)
                formik.setFieldValue('currentProvince', null)
                formik.setFieldValue('currentCity', null)
                formik.setFieldValue('currentDistrict', null)
                formik.setFieldValue('currentVillage', null)
            })
            .catch(err => {
                if (err.response.status === 404) {
                    setNotFound(true);
                }
            })
        formik.setFieldValue('currentCountry', pilihan)
        formik.setFieldTouched('currentCountry', true)
    }

    const changeIdentityProvince = function(pilihan){
        setEditIdentityCity(false)
        setLoadingIdentityCity(true)
        request.get('/v1/location/cities?provinceId=' + pilihan.value)
            .then((res) => {
                setidentityCities(res.data.data)
                setEditIdentityCity(true)
                setLoadingIdentityCity(false)
                formik.setFieldValue('identityCity', null)
                formik.setFieldValue('identityDistrict', null)
                formik.setFieldValue('identityVillage', null)
            })
            .catch(err => {
                if (err.response.status === 404) {
                    setNotFound(true);
                }
            })
        formik.setFieldValue('identityProvince', pilihan)
        formik.setFieldTouched('identityProvince', true)
    }
    const changeCurrentProvince = function(pilihan){
        setEditCurrentCity(false)
        setLoadingCurrentCity(true)
        request.get('/v1/location/cities?provinceId=' + pilihan.value)
            .then((res) => {
                setCurrentCities(res.data.data)
                setEditCurrentCity(true)
                setLoadingCurrentCity(false)
                formik.setFieldValue('currentCity', null)
                formik.setFieldValue('currentDistrict', null)
                formik.setFieldValue('currentVillage', null)
            })
            .catch(err => {
                if (err.response.status === 404) {
                    setNotFound(true);
                }
            })
        formik.setFieldValue('currentProvince', pilihan)
        formik.setFieldTouched('currentProvince', true)
    }

    const changeIdentityCity = function(pilihan){
        setEditIdentityDistrict(false)
        setLoadingIdentityDistrict(true)
        request.get('v1/location/districts?cityId=' + pilihan.value)
            .then((res) => {
                setidentityDistricts(res.data.data)
                setEditIdentityDistrict(true)
                setLoadingIdentityDistrict(false)
                formik.setFieldValue('identityDistrict', null)
                formik.setFieldValue('identityVillage', null)
            })
            .catch(err => {
                if (err.response.status === 404) {
                    setNotFound(true);
                }
            })
        formik.setFieldValue('identityCity', pilihan)
        formik.setFieldTouched('identityCity', true)
    }
    const changeCurrentCity = function(pilihan){
        setEditCurrentDistrict(false)
        setLoadingCurrentDistrict(true)
        request.get('v1/location/districts?cityId=' + pilihan.value)
            .then((res) => {
                setCurrentDistricts(res.data.data)
                setEditCurrentDistrict(true)
                setLoadingCurrentDistrict(false)
                formik.setFieldValue('currentDistrict', null)
                formik.setFieldValue('currentVillage', null)
            })
            .catch(err => {
                if (err.response.status === 404) {
                    setNotFound(true);
                }
            })
        formik.setFieldValue('currentCity', pilihan)
        formik.setFieldTouched('currentCity', true)
    }

    const changeIdentityDistrict = function(pilihan){
        setEditIdentityVillage(false)
        setLoadingIdentityVillage(true)
        request.get('v1/location/villages?districtId=' + pilihan.value)
            .then((res) => {
                setidentityVillages(res.data.data)
                setEditIdentityVillage(true)
                setLoadingIdentityVillage(false)
                formik.setFieldValue('identityVillage', null)
            })
            .catch(err => {
                if (err.response.status === 404) {
                    setNotFound(true);
                }
            })
        formik.setFieldValue('identityDistrict', pilihan)
        formik.setFieldTouched('identityDistrict', true)
    }
    const changeCurrentDistrict = function(pilihan){
        setEditCurrentVillage(false)
        setLoadingCurrentVillage(true)
        request.get('v1/location/villages?districtId=' + pilihan.value)
            .then((res) => {
                setCurrentVillages(res.data.data)
                setEditCurrentVillage(true)
                setLoadingCurrentVillage(false)
                formik.setFieldValue('currentVillage', null)
            })
            .catch(err => {
                if (err.response.status === 404) {
                    setNotFound(true);
                }
            })
        formik.setFieldValue('currentDistrict', pilihan)
        formik.setFieldTouched('currentDistrict', true)
    }

    const changeIdentityVillage = function(pilihan){
        formik.setFieldValue('identityVillage', pilihan)
        formik.setFieldTouched('identityVillage', true)
    }
    const changeCurrentVillage = function(pilihan){
        formik.setFieldValue('currentVillage', pilihan)
        formik.setFieldTouched('currentVillage', true)
    }

    const countryOption = countries?.map(countries =>
        ({value: countries.id, label: countries.name})
    )
    const identityProvinceOption = identityProvinces?.map(province =>
        ({value: province.id, label: province.name})
    )
    const identityCityOption = identityCities?.map(city =>
        ({value: city.id, label: city.name})
    )
    const identityDistrictOption = identityDistricts?.map(district =>
        ({value: district.id, label: district.name})
    )
    const identityVillageOption = identityVillages?.map(village =>
        ({value: village.id, label: village.name})
    )
    const currentProvinceOption = currentProvinces?.map(province =>
        ({value: province.id, label: province.name})
    )
    const currentCityOption = currentCities?.map(city =>
        ({value: city.id, label: city.name})
    )
    const currentDistrictOption = currentDistricts?.map(district =>
        ({value: district.id, label: district.name})
    )
    const currentVillageOption = currentVillages?.map(village =>
        ({value: village.id, label: village.name})
    )
    
    const handleNumberOnly = (evt) => {
        var charCode = (evt.which) ? evt.which : evt.keyCode;
            if (charCode > 31 && (charCode < 48 || charCode > 57)){
                evt.preventDefault()
            }
            return true;
    }

    const cancelEditAddress = () => {
        setEditAddress(false)
        setEditIdentityCity(false)
        setEditIdentityProvince(false)
        setEditIdentityDistrict(false)
        setEditIdentityVillage(false)
        setEditCurrentCity(false)
        setEditCurrentProvince(false)
        setEditCurrentDistrict(false)
        setEditCurrentVillage(false)
        formik.handleReset()
    }

    const changeSameAddress = () => {
        formik.setFieldValue('sameCheck', !values.sameCheck)
        setSameAddress(!sameAddress)
        console.log("sameAddress : " + sameAddress)
        console.log("sameCheck :" + values.sameCheck)
        if(!values.sameCheck){
            setCurrentProvinces(identityProvinces)
            setCurrentCities(identityCities)
            setCurrentDistricts(identityDistricts)
            setCurrentVillages(identityVillages)
            formik.setValues((values) => {
                return { ...values,
                sameCheck: !values.sameCheck,
                currentCountry:{
                    value: values.identityCountry?.value,
                    label: values.identityCountry?.label
                },
                currentProvince:{
                    value: values.identityProvince?.value,
                    label: values.identityProvince?.label
                },
                currentCity:{
                    value: values.identityCity?.value,
                    label: values.identityCity?.label
                },
                currentDistrict:{
                    value: values.identityDistrict?.value,
                    label: values.identitydistrict?.label
                },
                currentVillage:{
                    value: values.identityVillage?.value,
                    label: values.identityVillage?.label
                },
                currentPostalCode: values.identityPostalCode,
                currentAddress: values.identityAddress
                };
            });
            // formik.setFieldValue('currentCountry', values.identityCountry);
            // formik.setFieldValue('currentProvince', values.identityProvince);
            // formik.setFieldValue('currentCity', values.identityCity);
            // formik.setFieldValue('currentDistrict', values.identityDistrict);
            // formik.setFieldValue('currentVillage', values.identityVillage);
            // formik.setFieldValue('currentPostalCode', values.identityPostalCode);
            // formik.setFieldValue('currentAddress', values.currentAddress);
        }
        else{
            setEditCurrentProvince(true)
            setEditCurrentCity(true)
            setEditCurrentDistrict(true)
            setEditCurrentVillage(true)
        }
    }

    if (notFound) {
        return <DataNotFound />
    }

    return (
            <div>
                {/* <Button onClick={() => console.log(initialCurrent)}>Current</Button> */}
                <Form onSubmit={formik.handleSubmit}>
                    <Row className="mt-2">
                        <div className="col-12 d-flex justify-content-between align-items-center mb-3">
                            <h5 className="content-sub-title mb-0">{t('alamatasal')}</h5>
                            {!editAddress ? 
                                <Button color="netis-color" 
                                    className={`${can('edit-employee-profile') ? '' : ' d-none'}`}
                                    onClick={() => setEditAddress(true)}
                                >
                                        <i className="fa fa-pencil" style={{ marginRight: 5 }}></i>Edit
                                </Button>
                                : null
                            }
                        </div>
                    </Row>
                    <Row>
                        <div className="col-md-6">
                            <FormGroup>
                                <Label htmlFor="identityCountry" className="input-label">{t('negara')}</Label>
                                <Select
                                    id="identityCountry"
                                    name="identityCountry"
                                    value={countryOption.find(country => country.value === values.identityCountry?.value)}
                                    onChange={changeIdentityCountry}
                                    options={countryOption}
                                    isDisabled={!editAddress}
                                />
                            </FormGroup>
                        </div>
                        <div className="col-md-6">
                            <FormGroup>
                                <Label htmlFor="identityProvince" className="input-label">
                                    {t('provinsi')}&nbsp;
                                    {loadingIdentityProvince ? <Spinner size="sm" color="primary" /> : null}
                                </Label>
                                <Select
                                    id="identityProvince"
                                    name="identityProvince"
                                    value={identityProvinceOption.find(province => province.value === values.identityProvince?.value) ?? null}
                                    onChange={changeIdentityProvince}
                                    options={identityProvinceOption}
                                    isDisabled={!editAddress || !editIdentityProvince}
                                />
                            </FormGroup>
                        </div>
                    </Row>
                    <Row>
                        <div className="col-md-6">
                            <FormGroup>
                                <Label htmlFor="identityCity" className="input-label">
                                    {t('kabupaten')}&nbsp;
                                    {loadingIdentityCity ? <Spinner size="sm" color="primary" /> : null}
                                </Label>
                                <Select
                                    id="identityCity"
                                    name="identityCity"
                                    value={identityCityOption.find(city => city.value === values.identityCity?.value) ?? null}
                                    onChange={changeIdentityCity}
                                    options={identityCityOption}
                                    isDisabled={!editAddress || !editIdentityCity}
                                />
                            </FormGroup>
                        </div>
                        <div className="col-md-6">
                            <FormGroup>
                                <Label htmlFor="identityDistrict" className="input-label">
                                    {t('kecamatan')}&nbsp;
                                    {loadingIdentityDistrict ? <Spinner size="sm" color="primary" /> : null}
                                </Label>
                                <Select
                                    id="identityDistrict"
                                    name="identityDistrict"
                                    value={identityDistrictOption.find(district => district.value === values.identityDistrict?.value) ?? null}
                                    onChange={changeIdentityDistrict}
                                    options={identityDistrictOption}
                                    isDisabled={!editAddress || !editIdentityDistrict}
                                />
                            </FormGroup>
                        </div>
                    </Row>
                    <Row>
                        <div className="col-md-6">
                            <FormGroup>
                                <Label htmlFor="identityVillage" className="input-label">
                                    {t('kelurahan')}&nbsp;
                                    {loadingIdentityVillage ? <Spinner size="sm" color="primary" /> : null}
                                </Label>
                                <Select
                                    id="identityVillage"
                                    name="identityVillage"
                                    value={identityVillageOption.find(village => village.value === values.identityVillage?.value) ?? null}
                                    onChange={changeIdentityVillage}
                                    options={identityVillageOption}
                                    isDisabled={!editAddress || !editIdentityVillage}
                                />
                            </FormGroup>
                        </div>
                        <div className="col-md-6">
                            <FormGroup>
                                <Label htmlFor="identityPostalCode" className="input-label">{t('kodepos')}</Label>
                                <Input
                                    type="text"
                                    id="identityPostalCode"
                                    name="identityPostalCode"
                                    placeholder={t('kodepos')}
                                    disabled={!editAddress}
                                    onKeyPress={handleNumberOnly}
                                    pattern="[0-9]*"
                                    inputMode="numeric"
                                    value={values.identityPostalCode}
                                    onChange={formik.handleChange}
                                    maxLength="10"
                                />
                            </FormGroup>
                        </div>
                    </Row>
                    <Row className="mb-1">
                        <div className="col-12">
                            <FormGroup>
                                <Label htmlFor="identityAddress" className="input-label">{t('alamat')}</Label>
                                <Input
                                    type="textarea"
                                    name="identityAddress"
                                    id="identityAddress"
                                    rows="3"
                                    placeholder={t('alamat')}
                                    disabled={!editAddress}
                                    value={values.identityAddress}
                                    onChange={formik.handleChange}
                                />
                            </FormGroup>
                        </div>
                    </Row>

                    <CustomInput
                        className="mt-2 mb-3"
                        label={t('Alamat Domisili sama dengan Alamat Asal')}
                        id="sameAddress"
                        name="sameAddress"
                        type="checkbox"
                        checked={values.sameCheck}
                        onChange={changeSameAddress}
                        disabled={!editAddress}
                    />

                    {/* alamat domisili */}

                    <Collapse isOpen={!values.sameCheck}>
                        <Row className="mt-3">
                            <div className="col-12 d-flex justify-content-between align-items-center mb-3">
                                <h5 className="content-sub-title mb-0">{t('alamatdomisili')}</h5>
                                <div></div>
                            </div>
                        </Row>
                        <Row>
                            <div className="col-md-6">
                                <FormGroup>
                                    <Label htmlFor="currentCountry" className="input-label">{t('negara')}</Label>
                                    <Select
                                        id="currentCountry"
                                        name="currentCountry"
                                        value={countryOption.find(country => country.value === values.currentCountry?.value)}
                                        onChange={changeCurrentCountry}
                                        options={countryOption}
                                        isDisabled={!editAddress}
                                    />
                                </FormGroup>
                            </div>
                            <div className="col-md-6">
                                <FormGroup>
                                    <Label htmlFor="currentProvince" className="input-label">
                                        {t('provinsi')}&nbsp;
                                        {loadingCurrentProvince ? <Spinner size="sm" color="primary" /> : null}
                                    </Label>
                                    <Select
                                        id="currentProvince"
                                        name="currentProvince"
                                        value={currentProvinceOption.find(province => province.value === values.currentProvince?.value) ?? null}
                                        onChange={changeCurrentProvince}
                                        options={currentProvinceOption}
                                        isDisabled={!editAddress || !editCurrentProvince}
                                    />
                                </FormGroup>
                            </div>
                        </Row>
                        <Row>
                            <div className="col-md-6">
                                <FormGroup>
                                    <Label htmlFor="currentCity" className="input-label">
                                        {t('kabupaten')}&nbsp;
                                        {loadingCurrentCity ? <Spinner size="sm" color="primary" /> : null}
                                    </Label>
                                    <Select
                                        id="currentCity"
                                        name="currentCity"
                                        value={currentCityOption.find(city => city.value === values.currentCity?.value) ?? null}
                                        onChange={changeCurrentCity}
                                        options={currentCityOption}
                                        isDisabled={!editAddress || !editCurrentCity}
                                    />
                                </FormGroup>
                            </div>
                            <div className="col-md-6">
                                <FormGroup>
                                    <Label htmlFor="currentDistrict" className="input-label">
                                        {t('kecamatan')}&nbsp;
                                        {loadingCurrentDistrict ? <Spinner size="sm" color="primary" /> : null}
                                    </Label>
                                    <Select
                                        id="currentDistrict"
                                        name="currentDistrict"
                                        value={currentDistrictOption.find(district => district.value === values.currentDistrict?.value) ?? null}
                                        onChange={changeCurrentDistrict}
                                        options={currentDistrictOption}
                                        isDisabled={!editAddress || !editCurrentDistrict}
                                    />
                                </FormGroup>
                            </div>
                        </Row>
                        <Row>
                            <div className="col-md-6">
                                <FormGroup>
                                    <Label htmlFor="currentVillage" className="input-label">
                                        {t('kelurahan')}&nbsp;
                                        {loadingCurrentVillage ? <Spinner size="sm" color="primary" /> : null}
                                    </Label>
                                    <Select
                                        id="currentVillage"
                                        name="currentVillage"
                                        value={currentVillageOption.find(village => village.value === values.currentVillage?.value) ?? null}
                                        onChange={changeCurrentVillage}
                                        options={currentVillageOption}
                                        isDisabled={!editAddress || !editCurrentVillage}
                                    />
                                </FormGroup>
                            </div>
                            <div className="col-md-6">
                                <FormGroup>
                                    <Label htmlFor="currentPostalCode" className="input-label">{t('kodepos')}</Label>
                                    <Input type="text"
                                        id="currentPostalCode"
                                        name="currentPostalCode"
                                        placeholder={t('kodepos')}
                                        disabled={!editAddress}
                                        onKeyPress={handleNumberOnly}
                                        pattern="[0-9]*"
                                        inputMode="numeric"
                                        value={values.currentPostalCode}
                                        onChange={formik.handleChange}
                                        maxLength="10"
                                    />
                                </FormGroup>
                            </div>
                        </Row>
                        <Row>
                            <div className="col-12">
                                <FormGroup>
                                    <Label htmlFor="currentAddress" className="input-label">{t('alamat')}</Label>
                                    <Input
                                        type="textarea"
                                        name="currentAddress"
                                        id="currentAddress"
                                        rows="3"
                                        placeholder={t('alamat')}
                                        disabled={!editAddress}
                                        value={values.currentAddress}
                                        onChange={formik.handleChange}
                                    />
                                </FormGroup>
                            </div>
                        </Row>
                    </Collapse>
                    <Row>
                        <div className="col-12 d-flex justify-content-end">
                            {
                                editAddress ?
                                    <>
                                        <Button color="white" disabled={loading} className="btn-white mr-3" onClick={cancelEditAddress} >{t('batal')}</Button>
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

export default translate(PersonnelProfileAddress)