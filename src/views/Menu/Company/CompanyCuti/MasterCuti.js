import React, { useEffect, useState, useMemo} from 'react';
import { translate,t } from 'react-switch-lang';
import request from "../../../../utils/request";
import LoadingAnimation from '../../../../components/LoadingAnimation';
import DataNotFound from '../../../../components/DataNotFound';
import * as Yup from 'yup';
import { Button, Col, CustomInput, Form, Input, Label, Modal, ModalBody, ModalFooter, Row, Table, Spinner } from 'reactstrap';
import { useFormik } from 'formik';
import { toast } from'react-toastify';

function MasterCuti(){

    const [modalCategory, setModalCategory] = useState(false)
    const [submitLoad, setSubmitLoad] = useState(false)
    const [loading, setLoading] = useState(true)
    const [notFound, setNotFound] = useState(false)
    const [data, setData] = useState(null)
    const [type, setType] = useState("create");
    const [id, setId] = useState(null)
    const [deletingId, setDeletingId] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const toggle = () => {
        setModalCategory(!modalCategory)
    }

    const ValidationFormSchema = useMemo(() =>{
        return Yup.object().shape({
            name: Yup.string().required().label("Nama kategori")
        })
    }, [])

    const {values, touched, errors, isSubmitting, ...formik} = useFormik({
        initialValues:{
            name:'',
            description:'',
            has_file:false,
            cut_balance:false,
            icon:''
        },
        validationSchema: ValidationFormSchema,
        onSubmit : (values, {setSubmitting, setErrors}) => {
            setSubmitting(true);
            setSubmitLoad(true);
            if(type === "create"){
                request.post('v1/master/holiday-categories', values)
                .then(res => {
                    setModalCategory(false)
                    toast.success(t('Kategori Cuti Berhasil Dibuat'));
                    getData();
                })
                .catch(err => {
                    if (err.response?.status === 422) {
                        setErrors(err.response.data.errors);
                        toast.error(t('terjadikesalahan'));
                        return;
                    }
                    Promise.reject(err);
                })
                .finally(() => {
                    setSubmitLoad(false)
                    setSubmitting(false)
                });
            }
            else if(type === "edit"){
                request.put(`v1/master/holiday-categories/${id}`, values)
                .then(res => {
                    setModalCategory(false)
                    toast.success(t('Kategori Cuti Berhasil Diedit'));
                    getData();
                })
                .catch(err => {
                    if (err.response?.status === 422) {
                        setErrors(err.response.data.errors);
                        toast.error(t('terjadikesalahan'));
                        return;
                    }
                    Promise.reject(err);
                })
                .finally(() => {
                    setSubmitLoad(false)
                    setSubmitting(false)
                });
            }
            
        }
    })

    function getData(){
        setLoading(true)        
        request.get('v1/master/holiday-categories')
        .then(res =>{
            setData(res.data.data);
            setNotFound(false)
        })
        .catch(err => {
            if (err.response.status === 404) {
                setNotFound(true);
            }
        }).finally(() => setLoading(false))
    }

    function doDelete() {
        if (deleteLoading) return;
        setDeleteLoading(true);
        request.delete('v1/master/holiday-categories/' + deletingId).then(() => {
            setData(data.filter(category => category.id !== deletingId));
            setDeletingId(null);
            toast.success('Kategori Cuti Berhasil dihapus.');
        })
            .catch(err => {
                toast.error('Terjadi kesalahan');
                throw err;
            })
            .finally(() => {
                setDeleteLoading(false);
            });
    }

    function createCategory(){
        formik.setValues({
            name: '',
            description: '',
            has_file: false,
            cut_balance: false,
            icon:''
        })
        setType("create")
        toggle()
    }

    function editCategory(category){
        formik.setValues({
            name: category.name,
            description: category.description,
            has_file: Boolean(category.has_file),
            cut_balance: Boolean(category.cut_balance),
            icon:category.icon
        })
        setType("edit")
        setId(category.id)
        toggle()
    }

    function changeIcon(e){
        const { value } = e.target;
        formik.setFieldValue('icon', value)
    }

    useEffect(getData,[])

    return(
        <div className="animated fadeIn">
            <div className="md-company-header mb-2">
                <Button color="netis-color" onClick={() => createCategory()}>
                    {t('Tambah Kategori Cuti')}
                </Button>
            </div>
            <Table responsive className="mt-2">
                <thead>
                    <tr>
                        <th className="text-left w-50">{t('nama')}</th>
                        <th className="text-center">Icon</th>
                        <th className="text-center">Mengurangi Kuota</th>
                        <th className="text-center">Lampiran</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {loading ?
                        <LoadingAnimation />
                    : notFound ?
                        <DataNotFound />
                    :
                    data && data?.map((category, idx) => {
                        return(
                        <tr key={idx}>
                            <td className="text-left w-50">
                                {category.name}<br />
                                <span className="text-muted">{category.description}</span>
                            </td>
                            <td className="text-center">
                                <img
                                    alt={category.icon}
                                    src={require("../../../../assets/img/cuti/" + category.icon + ".png")}
                                    className="img-icon"
                                />
                            </td>
                            <td className="text-center">
                                {category.cut_balance ?
                                    <i className="fa fa-check text-info" />
                                : <i className="fa fa-times text-danger" />
                                }
                            </td>
                            <td className="text-center">
                                {category.has_file ?
                                    <i className="fa fa-check text-info" />
                                : <i className="fa fa-times text-danger" />
                                }
                            </td>
                            <td className="text-center text-nowrap">
                                <Button className="mr-1" color="netis-color" onClick={() => editCategory(category)}>
                                    <i className="fa fa-pencil mr-1" />&nbsp;Edit
                                </Button>
                                <Button className="ml-1" color="netis-danger" onClick={() => setDeletingId(category.id)}>
                                    <i className="fa fa-trash" />
                                </Button>
                            </td>
                        </tr>
                        )
                    })
                }
                </tbody>
            </Table>

            <Modal isOpen={modalCategory} className="p-2">
                <Form className="p-2 px-3" onSubmit={formik.handleSubmit}>
                    <Row form className="mb-2">
                        <Col xs="12" className="my-2">
                            <Label htmlFor="name" className="input-label">
                                Nama <span className="required">*</span>
                            </Label>
                            <Input
                                type="input" 
                                name="name"
                                id="name"
                                className="form-control needs-validation"
                                value={values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {touched.name && errors.name && 
                                <small className="text-danger">{errors.name}</small>
                            }
                        </Col>
                        <Col xs="12" className="my-2">
                            <Label htmlFor="description" className="input-label">
                                Deskripsi
                            </Label>
                            <Input
                                type="textarea"
                                name="description"
                                id="description"
                                className="form-control needs-validation"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={values.description}                       
                            />
                        </Col> 
                        <Col xs="12" className="my-2">
                            <CustomInput type="checkbox" id="cut_Balance" name="cut_balance" inline
                                label="Mengurangi Kuota Cuti"
                                checked={values.cut_balance}
                                onChange={
                                    (event) => formik.setFieldValue('cut_balance', event.target.checked)
                                }
                            />
                        </Col>
                        <Col xs="12" className="mt-2 mb-4">
                            <CustomInput type="checkbox" id="has_file" name="has_file" inline
                                label="Membutuhkan Lampiran"
                                checked={values.has_file}
                                onChange={
                                    (event) => formik.setFieldValue('has_file', event.target.checked)
                                }
                            />
                        </Col>
                        <br />
                        <Row form className="master-icon text-center mx-auto">
                            <Col xs="3" className="p-1">
                                <label className="container-master">
                                    <Input type="radio"
                                        name="cuti_tahunan"
                                        id="cuti_tahunan"
                                        value="cuti_tahunan"
                                        onChange={changeIcon}
                                        checked={values.icon === "cuti_tahunan"}
                                    />
                                    <img alt="cuti tahunan" src={require('../../../../assets/img/cuti/cuti_tahunan.png')} />
                                    <div className="overlay-master">
                                        <div className="text-master">
                                            Cuti Tahunan
                                        </div>
                                    </div>
                                </label>
                            </Col>
                            <Col xs="3" className="p-1">
                                <label className="container-master">
                                <Input type="radio"
                                        name="cuti_baptis"
                                        id="cuti_baptis"
                                        value="cuti_baptis"
                                        onChange={changeIcon}
                                        checked={values.icon === "cuti_baptis"}
                                    />
                                    <img alt="cuti baptis" src={require('../../../../assets/img/cuti/cuti_baptis.png')} />
                                    <div className="overlay-master">
                                        <div className="text-master">
                                            Cuti Baptis
                                        </div>
                                    </div>
                                </label>
                            </Col>
                            <Col xs="3" className="p-1">
                                <label className="container-master">
                                    <Input type="radio"
                                        name="cuti_hamil"
                                        id="cuti_hamil"
                                        value="cuti_hamil"
                                        onChange={changeIcon}
                                        checked={values.icon === "cuti_hamil"}
                                    />
                                    <img alt="cuti hamil" src={require('../../../../assets/img/cuti/cuti_hamil.png')} />
                                    <div className="overlay-master">
                                        <div className="text-master">
                                            Cuti Hamil
                                        </div>
                                    </div>
                                </label>
                            </Col>
                            <Col xs="3" className="p-1">
                                <label className="container-master">
                                    <Input type="radio"
                                        name="cuti_khitan"
                                        id="cuti_khitan"
                                        value="cuti_khitan"
                                        onChange={changeIcon}
                                        checked={values.icon === "cuti_khitan"}
                                    />
                                    <img alt="cuti khitan" src={require('../../../../assets/img/cuti/cuti_khitan.png')} />
                                    <div className="overlay-master">
                                        <div className="text-master">
                                            Cuti Khitan
                                        </div>
                                    </div>
                                </label>
                            </Col>
                            <Col xs="3" className="p-1">
                                <label className="container-master">
                                    <Input type="radio"
                                        name="cuti_keguguran"
                                        id="cuti_keguguran"
                                        value="cuti_keguguran"
                                        onChange={changeIcon}
                                        checked={values.icon === "cuti_keguguran"}
                                    />
                                    <img alt="cuti keguguran" src={require('../../../../assets/img/cuti/cuti_keguguran.png')} />
                                    <div className="overlay-master">
                                        <div className="text-master">
                                            Cuti Keguguran
                                        </div>
                                    </div>
                                </label>
                            </Col>
                            <Col xs="3" className="p-1">
                                <label className="container-master">
                                    <Input type="radio"
                                        name="cuti_nikah"
                                        id="cuti_nikah"
                                        value="cuti_nikah"
                                        onChange={changeIcon}
                                        checked={values.icon === "cuti_nikah"}
                                    />
                                    <img alt="cuti menikah" src={require('../../../../assets/img/cuti/cuti_nikah.png')} />
                                    <div className="overlay-master">
                                        <div className="text-master">
                                            Cuti Menikah
                                        </div>
                                    </div>
                                </label>
                            </Col>
                            <Col xs="3" className="p-1">
                                <label className="container-master">
                                    <Input type="radio"
                                        name="cuti_sakit"
                                        id="cuti_sakit"
                                        value="cuti_sakit"
                                        onChange={changeIcon}
                                        checked={values.icon === "cuti_sakit"}
                                    />
                                    <img alt="cuti sakit" src={require('../../../../assets/img/cuti/cuti_sakit.png')} />
                                    <div className="overlay-master">
                                        <div className="text-master">
                                            Cuti Sakit
                                        </div>
                                    </div>
                                </label>
                            </Col>
                            <Col xs="3" className="p-1">
                                <label className="container-master">
                                    <Input type="radio"
                                        name="cuti_menikahkan_anak"
                                        id="cuti_menikahkan_anak"
                                        value="cuti_menikahkan_anak"
                                        onChange={changeIcon}
                                        checked={values.icon === "cuti_menikahkan_anak"}
                                    />
                                    <img alt="cuti menikahkan anak" src={require('../../../../assets/img/cuti/cuti_menikahkan_anak.png')} />
                                    <div className="overlay-master">
                                        <div className="text-master">
                                            Cuti Menikahkan Anak
                                        </div>
                                    </div>
                                </label>
                            </Col>
                            <Col xs="3" className="p-1">
                                <label className="container-master">
                                    <Input type="radio"
                                        name="cuti_melahirkan"
                                        id="cuti_melahirkan"
                                        value="cuti_melahirkan"
                                        onChange={changeIcon}
                                        checked={values.icon === "cuti_melahirkan"}
                                    />
                                    <img alt="cuti melahirkan" src={require('../../../../assets/img/cuti/cuti_melahirkan.png')} />
                                    <div className="overlay-master">
                                        <div className="text-master">
                                            Cuti Melahirkan
                                        </div>
                                    </div>
                                </label>
                            </Col>
                            <Col xs="3" className="p-1">
                                <label className="container-master">
                                    <Input type="radio"
                                        name="cuti_kel_besar_meninggal"
                                        id="cuti_kel_besar_meninggal"
                                        value="cuti_kel_besar_meninggal"
                                        onChange={changeIcon}
                                        checked={values.icon === "cuti_kel_besar_meninggal"}
                                    />
                                    <img alt="keluarga besar meninggal" src={require('../../../../assets/img/cuti/cuti_kel_besar_meninggal.png')} />
                                    <div className="overlay-master">
                                        <div className="text-master">
                                            Keluarga Besar Meninggal
                                        </div>
                                    </div>
                                </label>
                            </Col>
                            <Col xs="3" className="p-1">
                                <label className="container-master">
                                    <Input type="radio"
                                        name="cuti_kel_inti_meninggal"
                                        id="cuti_kel_inti_meninggal"
                                        value="cuti_kel_inti_meninggal"
                                        onChange={changeIcon}
                                        checked={values.icon === "cuti_kel_inti_meninggal"}
                                    />
                                    <img alt="keluarga inti meninggal" src={require('../../../../assets/img/cuti/cuti_kel_inti_meninggal.png')} />
                                    <div className="overlay-master">
                                        <div className="text-master">
                                            Keluarga Inti Meninggal
                                        </div>
                                    </div>
                                </label>
                            </Col>
                            <Col xs="3" className="p-1">
                                <label className="container-master">
                                    <Input type="radio"
                                        name="other"
                                        id="other"
                                        value="other"
                                        onChange={changeIcon}
                                        checked={values.icon === "other"}
                                    />
                                    <img alt="other" src={require('../../../../assets/img/cuti/other.png')} />
                                    <div className="overlay-master">
                                        <div className="text-master">
                                            Lainnya...
                                        </div>
                                    </div>
                                </label>
                            </Col>
                        </Row>
                    </Row>
                    <ModalFooter className="border-top-0">
                        <Button onClick={toggle} color="netis-danger">
                            <i className="fa fa-times mr-1" />&nbsp;Batal
                        </Button>
                        <Button type="submit" color="netis-color" disabled={submitLoad}>
                            {submitLoad ?
                                <><Spinner size="sm" color="light" /> &nbsp; Loading... </>
                            : <><i className="fa fa-check mr-1" />&nbsp;Simpan</>
                            }
                        </Button>
                    </ModalFooter>
                </Form>
            </Modal>

                {/* Menghapus Kategori Cuti */}
                <Modal isOpen={!!deletingId} toggle={() => {
                    if (!deleteLoading) {
                        setDeletingId(null)
                    }
                }}>
                <ModalBody>
                    <h6>{t('yakinmenghapus')}</h6>
                    <div className="d-flex justify-content-end">
                        {!deleteLoading && <Button className="mr-2" color="light" onClick={() => setDeletingId(null)}>{t('batal')}</Button>}
                        <Button color="netis-primary" onClick={doDelete} disabled={deleteLoading}>
                            {deleteLoading ? <React.Fragment><Spinner size="sm" color="light" /> menghapus...</React.Fragment> : t('hapus')}
                        </Button>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    )
}


export default translate(MasterCuti);