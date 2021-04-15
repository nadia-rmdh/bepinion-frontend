import React, { useEffect, useMemo, useState } from 'react'
import { useFormik } from 'formik';
import { Card, CardBody, CardHeader, Button, Spinner, Form, Label, Input, Col, Row } from 'reactstrap';
import LoadingAnimation from '../../../components/LoadingAnimation';
import ModalError from '../../../components/ModalError';
import request from '../../../utils/request';
import { useHistory, useRouteMatch } from 'react-router';
import Switch from "react-switch";
import * as Yup from 'yup';
import { toast } from 'react-toastify';

const privilegeDesc = {
    canManagementTopUp: "Mengelola akses transaksi top-up token di dalam akun",
    canManagementJob: "Mengelola akses penerbitan lowongan kerja pada akun",
    canManagementToken: "Mengelola akses penggunaan token pada fitur di dalam akun",
    canManagementCompany: "Mengelola akses perubahan profil perusahaan di dalam akun",
    canManagementUser: "Kelola akses seluruh pengguna di dalam akun",
    canInternalAssesment: "Mengelola akses pada fitur asesmen internal perusahaan"
}

const privilegeLabel = {
    canManagementTopUp: "Manajemen TopUp",
    canManagementJob: "Manajemen Lowongan",
    canManagementToken: "Penggunaan Token",
    canManagementCompany: "Manajemen Profil Perusahaan",
    canManagementUser: "Manajemen User",
    canInternalAssesment: "Internal Assessment"
}

function PrivilegeEdit(){
    const history = useHistory();
    const matchRoute = useRouteMatch();
    const [data, setData] = useState([])
    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    
    const validationSchema = useMemo(() => {
        return Yup.object().shape({
            fullName: Yup.string().required().label('Nama User'),
            position: Yup.string().required().label('Posisi User'),
            department: Yup.string().required().label('Departemen User'),
            email: Yup.string().email().required().label('Email User'),
        })
    }, [])

    const {values, setValues, ...formik} = useFormik({
        initialValues: {
            fullName:'',
            position: '',
            department: '',
            email:'',
            privileges: []
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setSubmitting(true)
            request.put(`v1/personnels/${matchRoute.params.id}`, values)
                .then(() => {
                    toast.success('Berhasil memperbarui data User')
                    history.goBack();
                })
                .catch((err) => {
                    console.log(err)
                    toast.error('Terjadi Kesalahan, silahkan coba lagi')
                    return;
                })
                .finally(() => setSubmitting(false))
        }
    })

    useEffect(() => {
        request.get(`v1/personnels?id=${matchRoute.params.id}`)
            .then((res) => {
                let data = res.data.data;
                setValues({
                    fullName: data.fullName,
                    position: data.position,
                    department: data.department,
                    email: data.email,
                    privileges: data.privileges
                })
            .catch(() => {
                setError(true)
            })
        })
    }, [matchRoute.params.id, setValues])

    useEffect(() => {
        setLoading(true)
        request.get('v1/personnels/privileges')
            .then((res) => {
                setData(res.data.data)
            })
            .catch(() => {
                setError(true)
            })
            .finally(() => setLoading(false))
    }, [])

    const changePrivilege = (e, evt, id) => {
        let set = new Set(values.privileges);
        if(e){
            set.add(id)
        }
        else {
            set.delete(id)
        }
        const arr = Array.from(set)
        formik.setFieldValue('privileges', arr)
    }

    if(error){
        return <ModalError isOpen={true} />
    }
    if(loading){
        return <LoadingAnimation />
    }

    return(
        <Card className="privilege-card">
            <CardHeader className="d-flex align-items-center bg-netis-primary privilege-card-header">
                <h5 className="mb-0" style={{color:"#fff"}}>Edit User</h5>
            </CardHeader>
            <CardBody>
                <Form onSubmit={formik.handleSubmit} className="privilege-input">
                    <div className="d-flex flex-row-reverse bd-highlight mb-2">
                        <Button type="submit" color="netis-color" className="ml-2" disabled={submitting} style={{borderRadius: "5px"}}>
                            {submitting ? <> <Spinner size="sm" /> Loading... </> : "Simpan" }
                        </Button>
                        <Button onClick={() => history.goBack()} className="btn-secondary mr-2" style={{borderRadius: "5px", color:"#305574"}}>
                            Batal
                        </Button>
                    </div>
                    <Row form>
                        <Col xs="7" className="my-2">
                            <Label htmlFor="fullName"><strong>Nama Lengkap</strong></Label>
                            <Input
                                type="input"
                                value={values.fullName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                name="fullName"
                                id="fullName"
                                required
                                className="needs-validation"
                                maxLength="255"
                                placeholder="Nama Lengkap"
                            />
                        </Col>
                        <Col xs="7" className="my-2">
                            <Label htmlFor="position"><strong>Posisi</strong></Label>
                            <Input
                                type="input"
                                value={values.position}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                name="position"
                                id="position"
                                required
                                className="needs-validation"
                                maxLength="255"
                                placeholder="Posisi"
                            />
                        </Col>
                        <Col xs="7" className="my-2">
                            <Label htmlFor="department"><strong>Departemen</strong></Label>
                            <Input
                                type="input"
                                value={values.department}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                name="department"
                                id="department"
                                required
                                className="needs-validation"
                                maxLength="255"
                                placeholder="Departemen"
                            />
                        </Col>
                        <Col xs="7" className="my-2">
                            <Label htmlFor="email"><strong>Email</strong></Label>
                            <Input
                                type="email"
                                value={values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                name="email"
                                id="email"
                                required
                                className="needs-validation"
                                maxLength="255"
                                placeholder="Email"
                            />
                        </Col>
                        <Col xs="7" className="my-2">
                            {data.length > 0 && data.map((item, idx) => (
                                <div key={idx} className="my-2 py-1">
                                    <Label htmlFor={item} className="mb-1"><strong>{privilegeLabel[item]}</strong></Label><br />
                                    <Switch
                                        checked={values.privileges.includes(item)}
                                        onChange={changePrivilege}
                                        handleDiameter={27}
                                        offColor="#DCDCDC"
                                        onColor="#305574"
                                        offHandleColor="#808080"
                                        onHandleColor="#fff"
                                        height={30}
                                        width={60}
                                        borderRadius={10}
                                        activeBoxShadow="0px 0px 1px 1px #305574"
                                        // uncheckedIcon={
                                        //     <div className="px-1">Disable</div>
                                        // }
                                        // checkedIcon={
                                        //     <div className="px-1">Enable</div>
                                        // }
                                        // uncheckedHandleIcon={
                                        // <div>Disabled</div>
                                        // }
                                        // checkedHandleIcon={
                                        // <div>Enabled</div>
                                        // }
                                        aria-label={item}
                                        name={item}
                                        className="react-switch"
                                        id={item}
                                    />
                                    <span className="ml-2">{privilegeDesc[item]}</span>
                                    {/* <CustomInput type="switch" id={item} name={item} onChange={changePrivilege} /> */}
                                </div>
                            ))}
                        </Col>
                    </Row>
                </Form>
            </CardBody>
        </Card>
    )
}

export default PrivilegeEdit;