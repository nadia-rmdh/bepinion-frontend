import React from 'react';
import { translate, t } from 'react-switch-lang';
import { Link } from 'react-router-dom';
import { ListGroup, ListGroupItem, Collapse, Badge, Button, Spinner, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Col, Modal, ModalBody, FormGroup, Label } from 'reactstrap';
import { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import request from '../../../../utils/request';
import LoadingAnimation from '../../../../components/LoadingAnimation';

function RoleSetting(props) {
    const [roles, setRoles] = useState([]);
    const [privileges, setPrivileges] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const roleRequest = request.get('v1/master/roles?with=privileges')
        const privilegeRequest = request.get('v1/master/privileges')
        Promise.all([roleRequest, privilegeRequest]).then(([roleRes, privilegeRes]) => {
            if (roleRes.data) {
                setRoles(roleRes.data.data)
            }
            if (privilegeRes.data) {
                setPrivileges(privilegeRes.data.data);
            }
        }).finally(() => setLoading(false))
    }, [])

    const onChangedRole = (changed) => {
        const itemIndex = roles.findIndex(item => item.id === changed.id);
        roles[itemIndex].name = changed.name
        setRoles(roles)
    };

    const onDeletedRole = (deleted) => {
        let newData = [...roles];
        const itemIndex = newData.findIndex(item => item.id === deleted.id);
        newData.splice(itemIndex, 1);
        setRoles(newData)
    };

    return <div className="animated fadeIn">
        <Row>
            <Col col="12" sm="12" md="12">
                <h5 className="content-sub-title mb-0">{t('daftar')} {t('role')}</h5>
            </Col>
            <Col col="12" sm="12" md="12" className="d-flex justify-content-end">
                <Link className="btn btn-netis-color" to="/company/pengaturan-role/create">
                    <i className="fa fa-plus mr-2"></i>{t('tambah')} {t('role')}
                </Link>
            </Col>
        </Row>
        {loading ? <LoadingAnimation /> :
            (<ListGroup className="mt-5">
                {roles.map((role, idx) =>
                    <RoleItem key={role.id} role={role} privileges={privileges} onChanged={(changed) => onChangedRole(changed)} onDeleted={(deleted) => onDeletedRole(deleted)} />
                )}
            </ListGroup>)
        }
    </div>;
}


function RoleItem({ role, privileges, onChanged, onDeleted }) {
    const [isOpen, setIsOpen] = useState(false);
    const [filterInput, setFilterInput] = useState('');
    const [roleName, setRoleName] = useState(null);
    const [updateId, setUpdateId] = useState(null);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    function doDelete() {
        if (deleteLoading) return;
        setDeleteLoading(true);
        request
            .delete("v1/master/roles/" + deletingId)
            .then(() => {
                setDeletingId(null);
                onDeleted({
                    id: deletingId
                })
                toast.success(t("berhasilhapus"));
            })
            .catch((err) => {
                toast.error(t("gagalhapus"));
                throw err;
            })
            .finally(() => {
                setDeleteLoading(false);
            });
    }

    function onChangeUpdate(data) {
        setUpdateId(data.id)
        setRoleName(data.name)
    }

    function doUpdate() {
        if (deleteLoading) return;
        setUpdateLoading(true);
        request
            .put("v1/master/roles/" + updateId, {
                roleName: roleName
            })
            .then(() => {
                onChanged({
                    id: updateId,
                    name: roleName
                })
                setUpdateId(null);
                if (updateId) {
                    toast.success(t("berhasilmerubah"));
                }
            })
            .catch((err) => {
                toast.error("Terjadi kesalahan");
                throw err;
            })
            .finally(() => {
                setUpdateLoading(false);
            });
    }

    return <React.Fragment>
        <ListGroupItem className={(isOpen ? ' bg-gray-200' : '')}>
            <Row>
                <Col col="2" sm="2" md="2">
                    <Button
                        style={{ border: 0 }}
                        className="btn bg-transparent btn-sm mx-1 mt-1"
                        onClick={() => onChangeUpdate(role)}
                    >
                        <b>{role.name}</b> <i className="fa fa-pencil"></i>
                    </Button>
                </Col>
                <Col col="10" sm="10" md="10" style={{ cursor: "pointer" }} className="d-flex justify-content-end" onClick={() => setIsOpen(!isOpen)} >
                    <i className={`mt-2 fa fa-chevron-${isOpen ? 'down' : 'right'}`}></i>
                </Col>
            </Row>
        </ListGroupItem>
        <Collapse isOpen={isOpen}>
            <ListGroupItem style={{ borderLeft: 'solid 3px #e4e7ea' }} className="pb-0 rounded-0">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <Button
                        style={{ border: 0 }}
                        className="btn btn-danger btn-md mx-1 mt-1"
                        onClick={() => setDeletingId(role.id)}
                    >
                        <i className="fa fa-trash-o"></i> {t("hapus")}
                    </Button>
                    <InputGroup className="mr-3">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText className="input-group-transparent">
                                <i className="fa fa-search"></i>
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="search" className="input-search" style={{ maxWidth: 100 }} value={filterInput} onInput={(e) => setFilterInput(e.target.value)} />
                    </InputGroup>
                </div>
                <div className="py-3 pt-2 bg-gray-100" style={{ margin: '0 -1.25rem', paddingLeft: '1.25rem', paddingRight: '1.25rem' }}>
                    {
                        privileges.map((m, km) =>
                            <div key={m.module} style={{ marginTop: 15 }}>
                                <h5>{m.module.toUpperCase()}</h5>
                                {m.privileges.map((p, kp) =>
                                    <PrivilegeBadge
                                        key={p.id}
                                        privilege={{ ...p, roleId: role.id }}
                                        isActive={role.privileges.some((pr => pr.id === p.id))}
                                    />
                                )}
                            </div>
                        )
                    }
                </div>
            </ListGroupItem>
        </Collapse>

        <Modal
            isOpen={!!deletingId}
            toggle={() => {
                if (!deleteLoading) {
                    setDeletingId(null);
                }
            }}
        >
            <ModalBody>
                <h6>{t("yakinmenghapus")}</h6>
                <div className="d-flex justify-content-end">
                    {!deleteLoading && (
                        <Button
                            className="mr-2"
                            color="light"
                            onClick={() => setDeletingId(null)}
                        >
                            {t("batal")}
                        </Button>
                    )}
                    <Button
                        color="netis-primary"
                        onClick={doDelete}
                        disabled={deleteLoading}
                    >
                        {deleteLoading ? (
                            <React.Fragment>
                                <Spinner size="sm" color="light" /> menghapus...
                            </React.Fragment>
                        ) : (
                                t("hapus")
                            )}
                    </Button>
                </div>
            </ModalBody>
        </Modal>

        <Modal
            isOpen={!!updateId}
            toggle={() => {
                if (!updateLoading) {
                    setUpdateId(null);
                }
            }}
        >
            <ModalBody>
                <Row className="mb-5">
                    <Col col="12" sm="12" md="12">
                        <FormGroup>
                            <Label htmlFor="role-name" className="input-label">{t('role')} </Label>
                            <Input type="text" name="role-name" id="role-name" value={roleName} onChange={(e) => setRoleName(e.target.value)} required />
                        </FormGroup>
                    </Col>
                </Row>
                <div className="d-flex justify-content-end">
                    {!updateLoading && (
                        <Button
                            className="mr-2"
                            color="light"
                            onClick={() => setUpdateId(null)}
                        >
                            {t("batal")}
                        </Button>
                    )}
                    <Button
                        color="netis-primary"
                        onClick={doUpdate}
                        disabled={updateLoading}
                    >
                        {updateLoading ? (
                            <React.Fragment>
                                <Spinner size="sm" color="light" /> Merubah...
                            </React.Fragment>
                        ) : (
                                t("ubah")
                            )}
                    </Button>
                </div>
            </ModalBody>
        </Modal>
    </React.Fragment>
}

function PrivilegeBadge(props) {
    const { privilege, isActive: defaultActive } = props;
    const [loading, setLoading] = useState(false);
    const [isActive, setActive] = useState(defaultActive);
    function toggle() {
        const updatePrivilegeRequest = request.post(`v1/master/privileges/edit`, {
            roleId: privilege.roleId,
            privilegesId: privilege.id
        })
        setLoading(true);
        Promise.all([
            updatePrivilegeRequest,
            new Promise(resolve => {
                setTimeout(() => resolve(), 300);
            })
        ]).then(([response, _]) => {
            setActive(!isActive);
        }).finally(() => {
            // setTimeout(() => {
            setLoading(false)
            // }, 1500);
        })
    }

    return <Button onClick={toggle} disabled={loading} size="sm" color={isActive ? 'primary' : 'secondary'} className="mr-1 mb-1" >
        {privilege.name}
        <Badge className={'ml-2' + (isActive ? ' text-danger' : ' text-success')} style={{ lineHeight: 1 }}>
            {loading ? <Spinner style={{ width: '0.5rem', height: '0.5rem', verticalAlign: 'unset' }} size="sm" /> : (isActive ? <span>&times;</span> : <small>on</small>)}
        </Badge>
    </Button>
}

export default translate(RoleSetting);