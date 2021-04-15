import React, {useState} from 'react'
import {Form, FormGroup, Input, Label, Row, Button, Spinner} from 'reactstrap'
import { useUserPrivileges } from '../../../../store';
import {translate, t} from 'react-switch-lang';
import { useFormik } from 'formik';
import request from '../../../../utils/request';
import { toast } from 'react-toastify';

function PersonnelProfileContact({contact}){

    const {can} = useUserPrivileges();
    const [loading, setLoading] = useState(false);
    const [editContact, setEditContact] = useState(false);
    const [initial, setInitial] = useState({
        email: contact.email,
        phone: contact.phone,
        emergencyName: contact.emergencyName,
        emergencyContact: contact.emergencyContact,
        emergencyStatus: contact.emergencyStatus
    })
    const {values, ...formik} = useFormik({
        initialValues:{
            email: initial.email,
            phone: initial.phone,
            emergencyName: initial.emergencyName,
            emergencyContact: initial.emergencyContact,
            emergencyStatus: initial.emergencyStatus
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
                request.put('v1/personnels/' + contact.id, {
                    email: values.email,
                    phone: values.phone,
                    emergencyName: values.emergencyName,
                    emergencyContact: values.emergencyContact,
                    emergencyStatus: values.emergencyStatus
                })
                .then(res => {
                    toast.success('Berhasil Mengedit Kontak')
                    setEditContact(false)
                    setInitial({
                        email: values.email,
                        phone: values.phone,
                        emergencyName: values.emergencyName,
                        emergencyContact: values.emergencyContact,
                        emergencyStatus: values.emergencyStatus
                    })
                })
                .catch(err => {
                    console.log(err)
                    setErrors(err.response.data.errors);
                    toast.error('Gagal Mengedit Kontak')
                    return;
                })
                .finally(() => {
                    setLoading(false)
                    setSubmitting(false)
                })
            }
        }
    })

    const handleNumberOnly = (evt) => {
        var charCode = (evt.which) ? evt.which : evt.keyCode;
            if (charCode > 31 && (charCode < 48 || charCode > 57)){
                evt.preventDefault()
            }
            return true;
    }
    
    const cancelEditContact = () => {
        setEditContact(false)
        formik.handleReset()
    }
    
    return(
        <div>
            <Form onSubmit={formik.handleSubmit}>
                <Row className="my-1">
                    <div className="col-12 d-flex justify-content-between align-items-center mb-3">
                        <h5 className="content-sub-title mb-0">{t('kontak')}</h5>
                        {!editContact ? 
                            <Button color="netis-color" 
                            className={`${can('edit-employee-profile') ? '' : ' d-none'}`}
                            onClick={() => setEditContact(true)}
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
                            <Label htmlFor="email" className="input-label">Email</Label>
                            <Input type="email" id="email" name="email" placeholder="Email"
                                disabled={editContact === false ? true : false}
                                value={values.email} onChange={formik.handleChange} />
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup>
                            <Label htmlFor="phone" className="input-label">{t('telepon')}</Label>
                            <Input type="text" id="phone" name="phone" placeholder={t('telepon')}
                                disabled={editContact === false ? true : false}
                                onKeyPress={handleNumberOnly} pattern="[0-9]*" inputMode="numeric"
                                value={values.phone} onChange={formik.handleChange} />
                        </FormGroup>
                    </div>
                </Row>
                <Row>
                    <div className="col-md-4">
                        <FormGroup>
                            <Label htmlFor="emergencyContact" className="input-label">{t('kontakdarurat')}</Label>
                            <Input type="text" id="emergencyContact" name="emergencyContact" placeholder={t('kontakdarurat')}
                                disabled={editContact === false ? true : false}
                                onKeyPress={handleNumberOnly} pattern="[0-9]*" inputMode="numeric"
                                value={values.emergencyContact} onChange={formik.handleChange} />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup>
                            <Label htmlFor="emergencyName" className="input-label">{t('namakontakdarurat')}</Label>
                            <Input type="text" id="emergencyName" name="emergencyName" placeholder={t('namakontakdarurat')}
                                disabled={editContact === false ? true : false}
                                value={values.emergencyName} onChange={formik.handleChange} />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup>
                            <Label htmlFor="emergencyStatus" className="input-label">{t('hubkontakdarurat')}</Label>
                            <Input type="text" id="emergencyStatus" name="emergencyStatus" placeholder={t('hubkontakdarurat')}
                                disabled={editContact === false ? true : false}
                                value={values.emergencyStatus} onChange={formik.handleChange} />
                        </FormGroup>
                    </div>
                </Row>
                <Row>
                    <div className="col-12 d-flex justify-content-end">
                        {
                            editContact ?
                                <>
                                    <Button color="white" disabled={loading} className="btn-white mr-3" onClick={cancelEditContact}>{t('batal')}</Button>
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

export default translate(PersonnelProfileContact)