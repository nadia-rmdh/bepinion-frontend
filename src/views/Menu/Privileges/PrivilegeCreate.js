import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useFormik } from 'formik';
import { Card, CardBody, CardHeader, Button, Spinner, Form, Label, Input, Col, Row } from 'reactstrap';
import LoadingAnimation from '../../../components/LoadingAnimation';
import ModalError from '../../../components/ModalError';
import request from '../../../utils/request';
import { useHistory } from 'react-router';
import Switch from "react-switch";
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useAuthUser } from '../../../store';
import disableScroll from 'disable-scroll';
import { useDispatch } from 'react-redux';
import { getMe } from '../../../actions/auth';
import Tour from 'reactour';

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

function PrivilegeCreate(){
    const history = useHistory();
    const [data, setData] = useState([])
    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [isTour, setIsTour] = useState(false)
    const user = useAuthUser();
    const disableBody = () => disableScroll.on();
    const enableBody = () => disableScroll.off();
    const accentColor = "#1d5a8e";
    const dispatch = useDispatch();
    const formRef = useRef();
    const checkRef = useRef();
    
    const validationSchema = useMemo(() => {
        return Yup.object().shape({
            fullName: Yup.string().required().label('Nama User'),
            position: Yup.string().required().label('Posisi User'),
            department: Yup.string().required().label('Departemen User'),
            email: Yup.string().email().required().label('Email User'),
        })
    }, [])

    const {values, ...formik} = useFormik({
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
            request.post('v1/personnels', values)
                .then(() => {
                    toast.success('Berhasil menambahkan User')
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
        if(user.guidance.layout && user.guidance.header){
            window.scroll({top: 0, behavior: 'smooth' })
            if(!user.guidance.privilegesForm){
                setIsTour(true);
            }
        }
    }, [user])

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

    const disableGuidePrivilegesForm = () => {
        setIsTour(false);
        window.scroll({ top: 0, behavior: 'smooth' })
        request.put('auth/guidance', {guidance: 'privilegesForm'})
            .then(() => {
                dispatch(getMe());
            })
    }

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

    const steps = [
        {
            selector: ".tour-formPrivileges",
            content: ({ goTo, inDOM }) => (
                <div>
                    <h5
                        className="title-upgrade text-center"
                        style={{ color: "#93aad6" }}
                    >
                        Selamat datang di Halaman Pembuatan / Penambahan User!
                    </h5>
                    <p>
                        Untuk menambahkan user, Anda perlu mengisi data user ke dalam kolom ini.
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
                                window.scrollTo({top:checkRef.current?.offsetTop - 80})
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
            )
        },
        {
            selector: ".tour-checkPrivileges",
            content: ({ goTo, inDOM }) => (
                <div>
                    <p>
                        Anda juga bisa mengatur hak akses user dengan cara mengaktifkan dan menonaktifkannya.
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
                                window.scrollTo({top:formRef.current.offsetTop - 80})
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
                            color="netis-success"
                            onClick={() => {
                                disableGuidePrivilegesForm();
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

    if(error){
        return <ModalError isOpen={true} />
    }
    if(loading){
        return <LoadingAnimation />
    }

    return(
    <>
        <Tour
            steps={steps}
            accentColor={accentColor}
            showButtons={false}
            rounded={5}
            isOpen={isTour}
            closeWithMask={false}
            disableFocusLock={true}
            disableInteraction={true}
            onAfterOpen={disableBody}
            onBeforeClose={enableBody}
            onRequestClose={() => {
                disableGuidePrivilegesForm();
            }}
        />
        <Card className="privilege-card">
            <CardHeader className="d-flex align-items-center bg-netis-primary privilege-card-header">
                <h5 className="mb-0" style={{color:"#fff"}}>Tambah User</h5>
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
                        <div className="col-12 tour-formPrivileges" ref={formRef}>
                            <Row>
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
                            </Row>
                        </div>
                        <div className="col-7 my-2 tour-checkPrivileges" ref={checkRef}>
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
                        </div>
                    </Row>
                </Form>
            </CardBody>
        </Card>
    </>
    )
}

export default PrivilegeCreate;