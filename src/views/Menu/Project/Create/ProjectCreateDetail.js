import React, { useState } from 'react'
import { Row, Col, InputGroup, InputGroupAddon, InputGroupText, Input, Form, Button, Spinner } from "reactstrap";
import { useProjectContext } from '../ProjectContext';
import foto from '../../../../assets/img/projects_dummy/1.jpeg'
import { useFormik } from 'formik';
import request from '../../../../utils/request';
import { toast } from 'react-toastify';
function ProjectCreateDetail(props) {
    const { state } = props.location
    // const history = useHistory()
    const [projectCtx, setProjectCtx] = useProjectContext();
    const [submitLoadPublish, setSubmitLoadPublish] = useState(false);

    if (!projectCtx.file) {
        props.history.goBack()
    }

    const { values, touched, errors, isSubmitting, ...formik } = useFormik({
        initialValues: {
            title: '',
            description: '',
            locationName: ''
        },
        // validationSchema: ValidationFormSchema,
        onSubmit: (values, { setSubmitting, setErrors }) => {
            setSubmitting(true);
            setSubmitLoadPublish(true);

            let formData = new FormData();
            formData.append('title', values.title);
            formData.append('description', values.description);
            formData.append('locationName', values.locationName);
            formData.append('media', projectCtx.file, projectCtx.file.name);

            request.post('v1/projects', formData)
                .then(() => {
                    toast.success('Berhasil');
                    props.history.goBack()
                })
                .catch(err => {
                    if (err.response?.status === 422) {
                        toast.error("Terjadi Kesalahan Pengisian, silahkan cek data yang anda isikan");
                        setErrors(err.response.data.errors);
                        return;
                    }
                    else if (err.response?.status) {
                        toast.error("Terjadi kesalahan, silahkan coba lagi");
                        setErrors(err.response.data.errors);
                        return;
                    }
                    Promise.reject(err);
                })
                .finally(() => {
                    setSubmitLoadPublish(false);
                    setSubmitting(false);
                });
        }
    });

    return (
        <div className="project-create">
            <Form onSubmit={formik.handleSubmit}>
                <Row>
                    <Col xs="12">
                        <Input type="text" placeholder="Judul" className="input-search mb-3" name="title" id="title"
                            value={values.title}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                    </Col>
                    <Col xs="3">
                        <img src={URL.createObjectURL(projectCtx.file)} alt="project" className="image-post" />
                        {/* <img src={foto} alt="project" className="image-post" /> */}
                    </Col>
                    <Col xs="9">
                        <Input type="textarea" rows="4"
                            placeholder="Deskripsi" name="description" id="description"
                            value={values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                    </Col>
                    <Col xs="12">
                        <Input type="text" placeholder="Lokasi" className="input-search mt-3" name="locationName" id="locationName"
                            value={values.locationName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} />
                    </Col>
                    <Col xs="12">
                        <Button
                            className="mr-2 mt-3 float-right"
                            type="submit"
                            color="netis-primary"
                            disabled={submitLoadPublish}
                        // onClick={() => {
                        //     formik.setFieldValue('published', true)
                        //     setType("publish")
                        // }}
                        >
                            {submitLoadPublish ? <><Spinner color="light" size="sm" /> Loading...</> : 'Publish'}
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default ProjectCreateDetail