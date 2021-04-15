import React from "react";
import { useEffect, useState } from "react";
import { Button, Spinner, Input, Row, Col, Modal, ModalBody, FormGroup, Label, Table, Form } from 'reactstrap';
import request from "../../../../../utils/request";
import { t } from "react-switch-lang";
import { toast } from "react-toastify";
import LoadingAnimation from "../../../../../components/LoadingAnimation";
import { useUserPrivileges } from "../../../../../store";
import { useFormik } from "formik";

function WorkingShift(props) {
    const [loading, setLoading] = useState(true);
    const [shift, setShift] = useState([]);
    const { privileges } = useUserPrivileges();

    useEffect(() => {
        getShift()
    }, [])

    function getShift() {
        const shiftRequest = request.get('v2/master/working-shifts')
        Promise.all([shiftRequest]).then(([shiftRes]) => {
            if (shiftRes.data) {
                setShift(shiftRes.data.data)
            }
        }).finally(() => setLoading(false))
    }

    const changeShift = (changed) => {
        if (changed) {
            getShift()
        }
    };

    if (loading) {
        return (
            <div className="animated fadeIn">
                <LoadingAnimation />
            </div>
        );
    }

    return (
        <div className="animated fadeIn">
            <div className="d-flex bd-highlight mb-3">
                {privileges.includes("write-employee-workingShift-master") && (
                    <div className="p-2 bd-highlight">
                        <ModalComp label="Tambah Jadwal Kerja" action="create" data={[]} onChanged={(changed) => changeShift(changed)} icon="fa fa-plus" color="netis-color"></ModalComp>
                    </div>
                )}
            </div>
            <Table>
                <thead>
                    <tr>
                        <th className="column-header text-left">Nama Shift</th>
                        <th className="column-header text-left">Waktu Mulai</th>
                        <th className="column-header text-left">Waktu Selesai</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {shift.map((data) => (
                        <tr key={data.id}>
                            <td>
                                {data.shiftName}
                            </td>
                            <td>
                                Jam {data.startTime}
                            </td>
                            <td>
                                Jam {data.endTime.split(":")[0]}:{data.endTime.split(":")[1]}
                            </td>
                            <td>
                                <FormGroup inline>
                                    {privileges.includes("write-employee-workingShift-master") && (
                                        <ModalComp label="Ubah" action="edit" data={data} onChanged={(changed) => changeShift(changed)} icon="fa fa-pencil" color="netis-color"></ModalComp>
                                    )}
                                    {privileges.includes("write-employee-workingShift-master") && (
                                        <ModalComp label="Hapus" action="delete" data={data} onChanged={(changed) => changeShift(changed)} icon="fa fa-trash" color="danger"></ModalComp>
                                    )}
                                </FormGroup>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>


    );
}

function ModalComp(props) {
    const { label, action, data, onChanged, icon, color } = props;
    const [, setCreateData] = useState([]);
    const [updateData, setUpdateData] = useState([]);
    const [deletingData, setDeletingData] = useState(null);
    const [modal, setModal] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);

    function showModal(data = []) {
        if (action === 'create') {
            setCreateData(data)
        } else if (action === 'edit') {
            setValues(data)
            setUpdateData(data)
        } else {
            setDeletingData(data.id)
        }
        setModal(true)
    }

    function closeModal() {
        setModal(false)
        setCreateData([])
        setUpdateData([])
        setDeletingData(null)
    }

    const { values, touched, errors, isSubmitting, setFieldValue, setValues, handleChange, ...formik } = useFormik({
        initialValues: {
            shiftName: '',
            startTime: '',
            endTime: '',
        },
        // validationSchema: ValidationFormSchema,
        onSubmit: (values, { setSubmitting, setErrors }) => {
            setSubmitting(true);
            if (action === 'create') {
                request.post('v2/master/working-shifts', {
                    ...values
                })
                    .then(res => {
                        toast.success(t('jadwalberhasildibuat'));
                        closeModal()
                        onChanged(true)
                    })
                    .catch(err => {
                        console.log(err)
                        if (err.response?.status === 422) {
                            setErrors(err.response.data.errors);
                            return;
                        }
                        Promise.reject(err);
                    })
                    .finally(() => setSubmitting(false));
            } else if (action === 'edit') {
                request.put('v2/master/working-shifts/' + updateData.id, {
                    ...values
                })
                    .then(res => {
                        toast.success(t('jadwalberhasildiubah'));
                        closeModal()
                        onChanged(true)
                    })
                    .catch(err => {
                        if (err.response?.status === 422) {
                            setErrors(err.response.data.errors);
                            return;
                        }
                        Promise.reject(err);
                    })
                    .finally(() => setSubmitting(false));
            } else {
                request.delete('v2/master/working-shifts/' + deletingData)
                    .then(res => {
                        toast.success(t('jadwalberhasildihapus'));
                        closeModal()
                        onChanged(true)
                    })
                    .catch(err => {
                        console.log(err)
                        if (err.response?.status === 422) {
                            setErrors(err.response.data.errors);
                            return;
                        }
                        Promise.reject(err);
                    })
                    .finally(() => setSubmitting(false));
            }
        }
    });

    return (
        <>
            <Button color={color}
                className="d-inline mr-1"
                onClick={() => showModal(data)}>
                <i className={`${icon} mr-2`}></i>
                {label}
            </Button>
            <Modal
                isOpen={modal}
                toggle={() => {
                    setModalLoading(null);
                }}
            >
                <ModalBody>
                    <Form onSubmit={formik.handleSubmit}>
                        {action !== 'delete' && (
                            <>
                                <Row className="mb-5">
                                    <Col col="12" sm="12" md="12">
                                        <FormGroup>
                                            <Label htmlFor="shift-name" className="input-label">Nama Shift</Label>
                                            <Input type="text" name="shiftName" id="shift-name" value={values.shiftName} onChange={handleChange} required />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label htmlFor="start-time" className="input-label">Waktu Mulai</Label>
                                            <Input type="time" name="startTime" id="start-time" value={values.startTime} onChange={handleChange} required />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label htmlFor="duration-time" className="input-label">Waktu Selesai</Label>
                                            <Input type="time" name="endTime" id="start-time" value={values.endTime} onChange={handleChange} required />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </>)}
                        {action === 'delete' && (
                            <>
                                <h6>{t("yakinmenghapus")}</h6>
                            </>)}
                        <div className="d-flex justify-content-end">
                            {!modalLoading && (
                                <Button
                                    className="mr-2"
                                    color="light"
                                    onClick={() => closeModal()}
                                >
                                    {t("batal")}
                                </Button>
                            )}
                            <Button
                                color="netis-primary"
                                disabled={modalLoading}
                            >
                                {modalLoading ? (
                                    <React.Fragment>
                                        <Spinner size="sm" color="light" /> Merubah...
                                    </React.Fragment>
                                ) : (
                                        deletingData ? t("hapus") : t("simpan")
                                    )}
                            </Button>
                        </div>
                    </Form>
                </ModalBody>
            </Modal>
        </>
    )
}
export default WorkingShift;
