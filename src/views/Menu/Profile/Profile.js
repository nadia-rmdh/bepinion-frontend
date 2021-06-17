import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Button, Card, CardBody, Col, Collapse, Form, Input, Label, Row, Spinner } from 'reactstrap'
import { useAuthUser } from '../../../store'
import { useMediaQuery } from 'react-responsive'
import request from '../../../utils/request';
import ModalError from '../../../components/ModalError';
import LoadingAnimation from '../../../components/LoadingAnimation';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import profilePhotoNotFound from '../../../assets/img/no-photo.png';
import noProject from '../../../assets/img/no-project.png';

function Profile(){
    const inputFile = useRef(null)
    const user = useAuthUser();
    const [loading, setLoading] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [data, setData] = useState([])
    const [error, setError] = useState(false)
    const [edit, setEdit] = useState(false);
    const [teamList, setTeamList] = useState(false);
    const [projectList, setProjectList] = useState(true);
    const isSmallSize = useMediaQuery({ query: '(max-width: 768px)' })
    const [hasAction, setHasAction] = useState(false)
    const [local, setLocal] = useState({
        fullName: null,
        phoneNumber: null,
        photo: null,
        preview: null
    })
    // const myData = (data.length > 0 && data.filter(item => item.user.id === user.id)) ?? null

    const ValidationFormSchema = useMemo(() => {
        return Yup.object().shape({
            fullName: Yup.string().required().label('Nama Lengkap'),
            phoneNumber: Yup.string().label('Nomor Handphone')
        })
    }, [])

    const { values, touched, errors, isSubmitting, ...formik } = useFormik({
        initialValues: {
            fullName: user.detail.fullName,
            phoneNumber: user.detail.phoneNumber,
            photo: user.detail.photo,
            preview: user.detail.photo
        },
        validationSchema: ValidationFormSchema,
        onSubmit: (values, { setSubmitting, setErrors }) => {
            setSubmitting(true)
            let form = new FormData();
            form.append('fullName', values.fullName)
            form.append('phoneNumber', values.phoneNumber)
            form.append('photo', values.photo, values.photo.name)
            request.post('v1/auth/profile', form)
                .then(() => {
                    setHasAction(true)
                    formik.setValues({
                        fullName: values.fullName,
                        phoneNumber: values.phoneNumber,
                        photo: values.photo,
                        preview: values.preview
                    })
                    setLocal({
                        fullName: values.fullName,
                        phoneNumber: values.phoneNumber,
                        photo: values.photo,
                        preview: values.preview
                    })
                    toast.success('Berhasil mengubah Profil')
                    // dispatch(getMe());
                    seeProject()
                })
                .catch(() => {
                    toast.error('Gagal mengubah Foto Profil')
                    return;
                })
                .finally(() => setSubmitting(false))
        }
    })

    useEffect(() => {
        setLoading(true)
        request.get('v1/projects/me')
            .then((res) => {
                setData(res.data.data)
            })
            .catch(() => setError(true))
            .finally(() => setLoading(false))
    }, [])

    const handleNumberOnly = (evt) => {
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            evt.preventDefault()
        }
        return true;
    }
    const doEdit = () => {
        setEdit(true)
        setTeamList(false)
        setProjectList(false)
    }
    const seeProject = () => {
        setEdit(false)
        setTeamList(false)
        setProjectList(true)
    }
    const seeTeam = () => {
        setEdit(false)
        setTeamList(true)
        setProjectList(false)
    }

    const onButtonClick = () => {
        inputFile.current.click();
    }

    const onChangeFile = (e) => {
        e.preventDefault();
        const data = e.target.files[0]
        if(data.size > 5242880){
            toast.error('Foto melebihi ukuran maksimal')
            return;
        }
        formik.setFieldValue('preview', URL.createObjectURL(e.target.files[0]))
        formik.setFieldValue('photo', e.target.files[0])
    }

    const deletePhoto = () => {
        setDeleting(true)
        request.delete('v1/auth/profile/photo')
            .then(() => {
                formik.setFieldValue('photo', null)
                formik.setFieldValue('preview', null)
            })
            .catch(() => toast.error('Gagal menghapus foto profil'))
            .finally(() => setDeleting(false))
    }

    const onErrorImage = (e) => {
        formik.setFieldValue('photo', null)
        formik.setFieldValue('preview', null)
        e.target.src = profilePhotoNotFound;
        e.target.onerror = null;
    }

    const onErrorProject = (e) => {
        e.target.src = noProject;
        e.target.onerror = null;
    }

    if(loading){
        return <LoadingAnimation />
    }
    if(error){
        return <ModalError />
    }

    return(
        <Card className="border-0 shadow-sm mb-5 mb-md-0" style={{borderRadius:'5px', position:'relative'}}>
            <Form onSubmit={formik.handleSubmit}>
                <div className="absolute-right">
                    {!edit && 
                        <Button color="netis-color" className="px-2" onClick={doEdit}>
                            <i className="fa fa-pencil mr-2" />Edit
                        </Button>
                    }
                </div>
                <div className="text-center py-4">
                    <div className="rounded-circle frame-profile-picture-empty mb-3 d-flex justify-content-center align-items-center">
                        {values?.preview ?
                            <img src={values?.preview} alt="profile" className="rounded-circle" onError={(e) => onErrorImage(e)} />
                            :
                            <img src={require('../../../assets/img/no-photo.png')} alt="profile" />
                        }
                        {edit &&
                            <>
                                <input type='file' id='file' ref={inputFile} style={{ display: 'none' }} onChange={(e) => onChangeFile(e)} accept="image/png, image/gif, image/jpeg" />
                                <Button
                                    className="btn border-0 rounded-circle img-profile-button"
                                    style={{position:'absolute'}}
                                    onClick={onButtonClick}
                                >
                                    <i className="fa fa-2x fa-camera" />
                                    <br />
                                    <div className="desc-img-profile text-center d-none d-md-block">
                                        Unggah Foto Profil<br />
                                        <small className="text-danger">Maks. 5 MB</small>
                                    </div>
                                </Button>
                            </>
                        }
                    </div>
                    {(edit && values.photo) &&
                        <Button disabled={deleting} onClick={deletePhoto} style={{ border: 0 }} className="btn btn-sm bg-transparent text-danger">
                            <i className="fa fa-trash" /> Hapus Foto Profil
                        </Button>
                    }
                    <h2>{user.detail.fullName}</h2>
                    <Collapse isOpen={!edit}>
                        <div className="mx-auto text-center" style={{width:'80%'}}>
                            <hr />
                            <div className="d-flex justify-content-around mx-auto profile-list">
                                <div className="text-center mr-1 hover-pointer" onClick={seeProject}>
                                    <h4 style={{lineHeight:0.5}}>{data?.length}</h4>Proyek
                                </div>
                                <div onClick={seeTeam} className="text-center ml-1 hover-pointer">
                                    <h4 style={{lineHeight:0.5}}>4</h4>Tim
                                </div>
                                {/* <Button onClick={seeProject} style={{ border: 0 }} className="text-center btn bg-transparent mr-1">
                                    <h4 style={{lineHeight:0.5}}>{data?.length}</h4>Proyek
                                </Button>
                                <Button onClick={seeTeam} style={{ border: 0 }} className="btn bg-transparent ml-1">
                                    <h4 style={{lineHeight:0.5}}>4</h4>Tim
                                </Button> */}
                            </div>
                        </div>
                    </Collapse>
                </div>
                <CardBody>
                    <Collapse isOpen={edit}>
                            <Row className="mt-1 input-form">
                                <Col sm="6" className="mb-3">
                                    <Label htmlFor="fullName" className="input-label">Nama Lengkap<span className="required">*</span></Label>
                                    <Input
                                        className="form-control"
                                        type="input"
                                        value={values?.fullName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        name="fullName"
                                        id="fullName"
                                        maxLength="255"
                                        placeholder="Nama Lengkap"
                                    />
                                    {touched.fullName && errors.fullName && <small className="text-danger">{errors.fullName}</small>}
                                </Col>
                                <Col sm="6" className="mb-3">
                                    <Label htmlFor="phoneNumber" className="input-label">No. HP<span className="required">*</span></Label>
                                    <Input
                                        onKeyPress={handleNumberOnly}
                                        value={values?.phoneNumber}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        pattern="[0-9]*"
                                        inputMode="numeric"
                                        type="text"
                                        className="form-control"
                                        name="phoneNumber"
                                        id="phoneNumber"
                                        placeholder="No. HP*"
                                    />
                                    {touched.phoneNumber && errors.phoneNumber && <small className="text-danger">{errors.phoneNumber}</small>}
                                </Col>
                            </Row>
                            <div className="d-flex justify-content-end ml-auto">
                                <Button
                                    disabled={isSubmitting}
                                    className="mr-2"
                                    color="netis-secondary"
                                    onClick={() => {
                                        if(!hasAction){
                                            formik.handleReset();
                                        }
                                        else if(hasAction){
                                            formik.setValues({
                                                fullName: local.fullName,
                                                phoneNumber: local.phoneNumber,
                                                photo: local.photo,
                                                preview: local.preview
                                            })
                                        }
                                        seeProject();
                                    }}
                                >
                                    Batal
                                </Button>
                                <Button disabled={isSubmitting} className="ml-2" color="netis-color">
                                    {isSubmitting ? <><Spinner color="light" size="sm" /> loading...</> : 'Submit'}
                                </Button>
                            </div>
                    </Collapse>
                    <Collapse isOpen={projectList}>
                        <Row>
                            {data && data.map((item, idx) => 
                                <Col xs="4" key={idx} className={`p-0 p-md-1`}>
                                    <Link to={`/project/${item.code}`}>
                                        <div className={`frame-project ${!isSmallSize && `scale-div-small`} box`}>
                                            {item?.media[0]?.storage &&
                                                <img src={item?.media[0]?.storage} alt="myProject" className="img img-responsive full-width" onError={(e) => onErrorProject(e)} />
                                            }
                                        </div>
                                    </Link>
                                </Col>
                            )}
                        </Row>
                    </Collapse>
                    <Collapse isOpen={teamList}>
                        Ini list tim<br />
                        <Button onClick={seeProject}>Batal</Button>
                    </Collapse>
                </CardBody>
            </Form>
        </Card>
    )
}

export default Profile