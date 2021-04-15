import React, { memo } from 'react';
import { translate, t } from 'react-switch-lang';
import { ListGroup, ListGroupItem, Badge, Button, Input, Row, Col, FormGroup, Label, Form, Spinner } from 'reactstrap';
import { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import request from '../../../../utils/request';
import LoadingAnimation from '../../../../components/LoadingAnimation';
import { useFormik } from 'formik';
import { useCallback } from 'react';

function RoleCreate(props) {
    const [privileges, setPrivileges] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const privilegeRequest = request.get('v1/master/privileges')
        Promise.all([privilegeRequest]).then(([privilegeRes]) => {
            if (privilegeRes.data) {
                setPrivileges(privilegeRes.data.data);
            }
        }).finally(() => setLoading(false))
    }, [])

    const { values, touched, errors, isSubmitting, setFieldValue, setValues, handleChange, ...formik } = useFormik({
        initialValues: {
            roleName: '',
            privileges: [],
        },
        // validationSchema: ValidationFormSchema,
        onSubmit: (values, { setSubmitting, setErrors }) => {
            setSubmitting(true);
            request.post('v1/master/roles', {
                roleName: values.roleName,
                privileges: values.privileges,
            })
                .then(res => {
                    toast.success(t('lowonganberhasildibuat'));
                    props.history.goBack();
                })
                .catch(err => {
                    if (err.response?.status === 422) {
                        setErrors(err.response.data.errors);
                        return;
                    }
                    Promise.reject(err);
                })
                .finally(() => setSubmitting(false));
        }
    });

    const onPrivilegeBadgeClick = useCallback((privilege) => {
        setValues((values) => {
            if (values.privileges.includes(privilege.id)) {
                return { ...values, privileges: values.privileges.filter(pid => pid !== privilege.id) };
            } else {
                return { ...values, privileges: [...values.privileges, privilege.id] }
            }
        })
    }, [setValues])

    return <div className="animated fadeIn">
        <Row>
            <Col col="12" sm="12" md="12">
                <h5 className="content-sub-title mb-0">{t('tambah')} {t('role')}</h5>
            </Col>
        </Row>
        {loading ? <LoadingAnimation /> :
            (
                <Form onSubmit={formik.handleSubmit}>
                    <ListGroup className="mt-5 mb-5">
                        <ListGroupItem>
                            <FormGroup>
                                <Label htmlFor="role-name" className="input-label font-weight-bold"><strong>Nama {t('role')}</strong> </Label>
                                <Input type="text" name="roleName" id="role-name" value={values.roleName} onChange={handleChange} required />
                            </FormGroup>
                        </ListGroupItem>
                        <ListGroupItem style={{ borderLeft: 'solid 3px #e4e7ea' }} className="pb-0 rounded-0">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <strong>Permissions:</strong>
                            </div>
                            <div className="py-3 pt-2 bg-gray-100" style={{ margin: '0 -1.25rem', paddingLeft: '1.25rem', paddingRight: '1.25rem' }}>
                                {
                                    privileges.map((m, km) =>
                                        <div key={m.module} style={{ marginTop: 15 }}>
                                            <h5>{m.module.toUpperCase()}</h5>
                                            {m.privileges.map((p, kp) =>
                                                <PrivilegeBadge
                                                    key={p.id}
                                                    privilege={p}
                                                    onClick={onPrivilegeBadgeClick}
                                                    isActive={values.privileges.includes(p.id)}
                                                // isActive={role.privileges.some((pr => pr.id === p.id))}
                                                />
                                            )}
                                        </div>
                                    )
                                }
                            </div>
                        </ListGroupItem>
                        <ListGroupItem>
                            <FormGroup>
                                <Button
                                    type="submit"
                                    color="netis-primary"
                                    size="lg"
                                    disabled={isSubmitting}
                                    className="float-right"
                                >
                                    {isSubmitting ? (
                                        <React.Fragment>
                                            <Spinner size="sm" color="light" /> Menyimpan...
                                        </React.Fragment>
                                    ) : (
                                            t("simpan")
                                        )}
                                </Button>
                            </FormGroup>
                        </ListGroupItem>
                    </ListGroup>
                </Form>
            )
        }
    </div>;
}

const PrivilegeBadge = memo((props) => {
    const { privilege, isActive, onClick } = props;
    function buttonOnClick() {
        onClick(privilege);
    }

    return <Button onClick={buttonOnClick} size="sm" color={isActive ? 'primary' : 'secondary'} className="mr-2 mb-1" >
        {privilege.name}
        <Badge className={'ml-2' + (isActive ? ' text-danger' : ' text-success')} style={{ lineHeight: 1 }}>
            {isActive ? <span>&times;</span> : <small>on</small>}
        </Badge>
    </Button>
});

export default translate(RoleCreate);