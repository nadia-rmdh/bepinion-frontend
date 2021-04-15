import React, { useEffect, useMemo, useState } from 'react'
import { useFormik } from 'formik';
import { Button, Col, CustomInput, Form, Input, Label, Row, Spinner } from 'reactstrap'
import request from '../../../../utils/request';
import ModalError from '../../../../components/ModalError';
import LoadingAnimation from '../../../../components/LoadingAnimation';
import { t, translate } from 'react-switch-lang';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

function LinkAssessmentCreate(props) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [req, setReq] = useState([])
    const [submit, setSubmit] = useState(false)

    const ValidationFormSchema = useMemo(() => {
        return Yup.object().shape({
            name: Yup.string().required().label('Keperluan'),
            requirements: Yup.array()
                .test('required', 'Isi Kebutuhan asesmen yang diinginkan', function(value){
                    return value.length > 0;
                })
        })
    }, [])

    const { values, touched, errors, ...formik } = useFormik({
        initialValues: {
            name: '',
            requirements: []
        },
        validationSchema: ValidationFormSchema,
        onSubmit: (values, { setSubmitting, setErrors }) => {
            setSubmitting(true)
            setSubmit(true)
            request.post('v1/recruitment/vacancies', {
                name: values.name,
                published: false,
                isInternal: true,
                requirements: values.requirements
            })
                .then(() => {
                    toast.success('Berhasil mengirim permintaan link assessment')
                    props.history.goBack();
                })
                .catch((err) => {
                    // console.log(err)
                    if (err?.response?.status === 403) {
                        toast.error('Maaf, anda sudah memiliki Internal Assessment')
                    }
                    else if (err?.response?.status) {
                        toast.error('Terjadi Kesalahan, silahkan coba lagi')
                    }
                    return;
                })
                .finally(() => {
                    setSubmit(false)
                    setSubmitting(false)
                })
        }
    })

    useEffect(() => {
        setLoading(true)
        request.get('v1/recruitment/vacancies/requirements')
            .then((res) => {
                setReq(res.data.data)
            })
            .catch(() => setError(true))
            .finally(() => setLoading(false))
    }, [])

    const changeRequirements = (e) => {
        const { value, checked } = e.target;
        if (value === 'all') {
            if (checked) {
                const allSet = new Set(req)
                const allArr = Array.from(allSet)
                formik.setFieldValue('requirements', allArr)
            }
            else if (!checked) {
                formik.setFieldValue('requirements', [])
            }
        }
        else {
            let arr = values.requirements;
            arr.push(value);
            const set = new Set(arr);
            if (!checked) {
                set.delete(value);
            }
            const setArr = Array.from(set);
            // console.log(setArr)
            formik.setFieldValue('requirements', setArr)
        }
    }

    if (loading) {
        return (
            <div style={{ marginTop: '30vh' }}>
                <LoadingAnimation />
            </div>
        )
    }

    if (error) {
        return <ModalError isOpen={true} />
    }

    // console.log(values.requirements)
    // console.log(req)
    return (
        <div className="animated fadeIn d-flex flex-column bd-highlight mb-3 p-4">
            <div className="bd-highlight mb-4">
                <h5>Buat Link Internal Assesment</h5>
            </div>
            <Form onSubmit={formik.handleSubmit}>
                <Row>
                    <Col md="6">
                        <Row className="mb-5">
                            <Col xs="3">
                                <Label htmlFor="name" className="input-label pt-2">Keperluan</Label>
                            </Col>
                            <Col xs="9">
                                <Input
                                    type="input"
                                    value={values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    name="name"
                                    id="name"
                                    required
                                    maxLength="50"
                                    placeholder="Keperluan pembuatan link"
                                    className="form-control needs-validation"
                                />
                                {(touched.name && errors.name) && 
                                    <small className="text-danger">{errors.name}</small>
                                }
                            </Col>
                        </Row>
                        <Row className="my-5">
                            <Col xs="3">
                                <Label htmlFor="all" className="input-label">Kebutuhan</Label>
                            </Col>
                            <Col xs="9">
                                <CustomInput
                                    type="checkbox"
                                    id="all"
                                    name="all"
                                    label="Semua"
                                    value="all"
                                    onChange={changeRequirements}
                                    checked={values.requirements.length === req.length}
                                />
                                {req.length > 0 && req.map((item, idx) => {
                                    return (
                                        <CustomInput
                                            key={idx}
                                            type="checkbox"
                                            id={item}
                                            name={item}
                                            value={item}
                                            label={t(item)}
                                            onChange={changeRequirements}
                                            checked={values.requirements.includes(item)}
                                        />
                                    )
                                })}
                                {(touched.requirements && errors.requirements) && 
                                    <small className="text-danger">{errors.requirements}</small>
                                }
                            </Col>
                        </Row>
                        <Row className="text-center mt-5 mb-2">
                            <Col xs="12" className="text-center">
                                <Button className="btn btn-sm btn-netis-primary px-4" type="submit" disabled={submit}>
                                    {submit ? <><Spinner size="sm" color="light" /> Loading... </> : "Kirim Permintaan"}
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default translate(LinkAssessmentCreate);