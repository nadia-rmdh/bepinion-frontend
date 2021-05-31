import React, { useState, useCallback } from 'react'
import { Row, Col, InputGroup, InputGroupAddon, InputGroupText, Input, Form, Button, Spinner } from "reactstrap";
import { useProjectContext } from '../ProjectContext';
import foto from '../../../../assets/img/projects_dummy/1.jpeg'
import { useFormik } from 'formik';
import request from '../../../../utils/request';
import { toast } from 'react-toastify';
import { Map, Marker, GoogleApiWrapper, Circle } from 'google-maps-react'
import PlaceAutoComplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import {
    translate, t
} from 'react-switch-lang';
import SelectMap from './SelectMap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ProjectCreateDetail(props) {
    const { state } = props.location
    // const history = useHistory()
    const [projectCtx, setProjectCtx] = useProjectContext();
    const [submitLoadPublish, setSubmitLoadPublish] = useState(false);
    const [selectLocation, setSelectLocation] = useState(false);
    const [loadingLocation, setLoadingLocation] = useState(true);

    if (!projectCtx.file) {
        props.history.goBack()
    }

    const { values, touched, errors, isSubmitting, ...formik } = useFormik({
        initialValues: {
            title: '',
            description: '',
            locationName: '',
            locationLatitude: '',
            locationLongitude: '',
            locationCity: '',
        },
        // validationSchema: ValidationFormSchema,
        onSubmit: (values, { setSubmitting, setErrors }) => {
            setSubmitting(true);
            setSubmitLoadPublish(true);

            let formData = new FormData();
            formData.append('title', values.title);
            formData.append('description', values.description);
            formData.append('locationName', values.locationName);
            formData.append('locationLatitude', values.locationLatitude);
            formData.append('locationLongitude', values.locationLongitude);
            formData.append('locationCity', values.locationCity);
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

    const toggleLocation = () => setSelectLocation(!selectLocation);

    const handleLocation = useCallback((location) => {
        formik.setFieldValue('locationName', location.address)
        formik.setFieldValue('locationLatitude', location.latitude)
        formik.setFieldValue('locationLongitude', location.longitude)
        formik.setFieldValue('locationCity', location.city)
    }, [formik])

    return (
        <div className="project-create position-relative h-100">
            { loadingLocation &&
                <div className="text-center" style={{ position: 'relative', width: '100%', height: '100%', zIndex: '99', backgroundColor: 'rgba(255,255,255, 0.7)', justifyContent: 'center', alignItems: 'center' }}>
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0,
                            background: "rgba(255,255,255, 0.5)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Spinner style={{ width: 48, height: 48 }} />
                    </div>
                </div>
            }
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
                        <Row className="mt-3">
                            <Col xs="10">
                                <Input type="text" placeholder="Lokasi" className="input-search" name="locationName" id="locationName"
                                    value={values.locationName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} />
                            </Col>
                            <Col xs="2" className="p-0 d-flex justify-content-center">
                                <Button color="primary" onClick={() => setSelectLocation(true)}>
                                    <FontAwesomeIcon icon="map-marker-alt" className="mx-auto" />
                                </Button>
                            </Col>
                        </Row>
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
                <SelectMap toggle={toggleLocation} isOpen={selectLocation} location={handleLocation} loadingLocation={(e) => setLoadingLocation(e)} />
            </Form>
        </div >
    )
}

export default (translate(ProjectCreateDetail));