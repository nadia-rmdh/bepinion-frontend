import 'react-orgchart/index.css';
import './struktur-unit.scss';
import React, { useRef, useState, useEffect, createContext, useReducer } from 'react';
import OrgChart from 'react-orgchart';
import { Node } from './components/TreeStruktur';
import domtoimage from 'dom-to-image';
import { Button, Spinner, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Table } from 'reactstrap';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useContext } from 'react';
import { EditModal, AddNodeModal, DeleteModalConfirmation } from './components/StrukturUnitModal';
import request from '../../../../utils/request';
import { toast } from 'react-toastify';
import { Formik, Field, Form } from 'formik'
import FormikInput from '../../../../components/Form/FormikInput';
import {
    translate,
} from 'react-switch-lang';
import { useUserPrivileges } from '../../../../store';
const initialState = { actionMode: null, activeNode: null };
const componentStore = createContext(initialState);
const { Provider: StoreProvider } = componentStore;

export default translate(function PengaturanStruktur(props) {
    const printAreaRef = useRef(null);
    const [root, setRoot] = useState(null);
    const [loading, setLoading] = useState(true);
    const [changed, setChanged] = useState(false);
    const [saving, setSaving] = useState(false);
    const [modalState, dispatchModal] = useReducer((modalState, action) => {
        const { type, node = null } = action;
        const allowedTypes = ['edit', 'addChild', 'addParent', 'delete'];
        if (allowedTypes.indexOf(type) !== -1) {
            return { actionMode: type, activeNode: node };
        }
        return { actionMode: null, activeNode: null };
    }, initialState);
    const { can } = useUserPrivileges();

    useEffect(() => {
        request.get('v1/org-chart')
            .then(res => {
                if (res.data.data.data) {
                    const rootNode = Node.create(JSON.parse(res.data.data.data));
                    setRoot(rootNode);
                }
            })
            .finally(() => {
                setLoading(false);
            })
    }, [])

    function downloadImage(e) {
        e.preventDefault();
        domtoimage.toJpeg(printAreaRef.current, {
            quality: 0.95, filter: (node) => {
                if (node.classList && node.classList.contains('struktur__nodeActions')) return false;
                return true;
            }, bgcolor: '#ffffff'
        })
            .then(function (dataUrl) {
                const a = document.createElement('a');
                a.download = 'struktur-perusahaan.jpeg';
                a.href = dataUrl;
                a.click();
            })
    }

    function saveStruktur() {
        if (!can('edit-company-structure')) {
            toast.error('Maaf anda tidah boleh melakukan aksi ini.')
            return
        }
        setLoading(true); setSaving(true);
        const req = request.put('/v1/org-chart', {
            data: JSON.stringify(root.toJson()),
        });
        req.then(() => {
            toast.success('Success');
            setChanged(false);
        }).catch(err => {
            if (err.response?.status === 422) {
                toast.error(err.response.data.message);
            } else {
                toast.error('Error');
            }
        }).finally(() => {
            setLoading(false); setSaving(false);
        })
    }

    function handleRootCreated(node) {
        setRoot(node);
        setChanged(true);
    }
    function handleEditNode({ name, title, image }) {
        if (!can('edit-company-structure')) {
            toast.error('Maaf anda tidah boleh melakukan aksi ini.')
            return
        }
        const { activeNode } = modalState;
        activeNode.name = name;
        activeNode.title = title;
        activeNode.image = image;
        dispatchModal({ type: 'close' });
        setChanged(true);
    }

    function handleAddChild(createdNode) {
        if (!can('edit-company-structure')) {
            toast.error('Maaf anda tidah boleh melakukan aksi ini.')
            return
        }
        const { activeNode } = modalState;
        activeNode.addChild(createdNode);
        dispatchModal({ type: 'close' });
        setChanged(true);
    }

    function handleAddParent(createdNode) {
        if (!can('edit-company-structure')) {
            toast.error('Maaf anda tidah boleh melakukan aksi ini.')
            return
        }
        const { activeNode } = modalState;
        const activeParentNode = activeNode.getParent();
        createdNode.addChild(activeNode);
        if (activeParentNode) {
            activeParentNode.addChild(createdNode);
            activeParentNode.removeChild(activeNode);
        } else {
            setRoot(createdNode);
        }
        setChanged(true);
        dispatchModal({ type: 'close' });
    }

    function handleDeleteNode() {
        if (!can('edit-company-structure')) {
            toast.error('Maaf anda tidah boleh melakukan aksi ini.')
            return
        }
        const { activeNode } = modalState;
        if (activeNode.getParent()) {
            activeNode.getParent().removeChild(activeNode);
        } else {
            setRoot(null);
        }
        setChanged(true);
        dispatchModal({ type: 'close' });
    }

    function handleMoveNode(movedNode, targetNode) {
        if (!can('edit-company-structure')) {
            toast.error('Maaf anda tidah boleh melakukan aksi ini.')
            return
        }
        movedNode.getParent().removeChild(movedNode)
        targetNode.addChild(movedNode);
        dispatchModal({ type: '' });
        setChanged(true);
    }

    function cancelAction() {
        dispatchModal({ type: 'cancel' })
    }

    if (loading) {
        return (<div className="d-flex justify-content-center align-items-center" style={{ minHeight: 150 }}>
            <Spinner />
        </div>);
    }

    return (<div style={{ minHeight: ' calc(100vh - 5rem - 180px)', boxShadow: 'inset 1px 1px 3px 1px rgba(0,0,0,0.075)', fontSize: '80%', padding: 16 }}>
        {root == null ? <CreateRootNodeForm onCreated={handleRootCreated} /> :
            <Table responsive className="table-structure">
                <div className="d-flex justify-content-between">
                    <Button color="netis-color" onClick={downloadImage}>Image</Button>
                    {changed && <Button color="success ml-3" onClick={saveStruktur} disabled={saving}>{saving ? <Spinner size="sm"></Spinner> : 'simpan'}</Button>}
                </div>
                <DndProvider backend={HTML5Backend}>
                    <StoreProvider value={{ state: modalState, dispatch: dispatchModal }}>
                        <div ref={printAreaRef} className="py-3">
                            <OrgChart
                                tree={root}
                                NodeComponent={(props) => (<NodeComponent {...props} onMoved={handleMoveNode}></NodeComponent>)}
                            />
                        </div>
                        <EditModal isOpen={modalState.actionMode === 'edit'} toggle={cancelAction} node={modalState.activeNode} onSubmitted={handleEditNode} />
                        <AddNodeModal isOpen={modalState.actionMode === 'addChild'} toggle={cancelAction} node={modalState.activeNode} onSubmitted={handleAddChild} />
                        <AddNodeModal isOpen={modalState.actionMode === 'addParent'} toggle={cancelAction} node={modalState.activeNode} onSubmitted={handleAddParent} />
                        <DeleteModalConfirmation isOpen={modalState.actionMode === 'delete'} toggle={cancelAction} node={modalState.activeNode} onConfirmed={handleDeleteNode} />
                    </StoreProvider>
                </DndProvider>
            </Table>}
    </div>);
})

const CreateRootNodeForm = translate(function (props) {
    const { onCreated } = props;
    const { t } = props;
    return (
        <Formik
            initialValues={{ title: '', name: '', image: null }}
            validate={(values) => {
                const errors = {};
                if (!values.title) {
                    errors.title = 'Name cannot be empty.'
                }
                return errors;
            }}
            onSubmit={(values) => onCreated(new Node(values))}
            render={({ isSubmitting, setFieldValue, values }) => {
                function changePhoto(event) {
                    const file = event.target.files[0];
                    if (file && file.type.match(/image.*/)) {
                        const reader = new FileReader();
                        reader.onload = function (e) {
                            const image = new Image();
                            image.onload = function () {
                                const canvas = document.createElement('canvas');
                                const maxSize = 64;
                                let width = image.width;
                                let height = image.height;
                                if (width > height && width > maxSize) {
                                    height *= maxSize / width;
                                    width = maxSize;
                                } else if (height > maxSize) {
                                    width *= maxSize / height;
                                    height = maxSize;
                                }
                                canvas.width = width;
                                canvas.height = height;
                                canvas.getContext('2d').drawImage(image, 0, 0, width, height);
                                const dataUrl = canvas.toDataURL('image/jpeg');
                                setFieldValue('image', dataUrl);
                            }
                            image.src = e.target.result;
                        }
                        reader.readAsDataURL(file);
                    } else {
                        setFieldValue('image', null);
                    }
                }
                return (
                    <Form>
                        <h5>{t('strukturteratas')}</h5>
                        <Field type="text" label={t('nama') + ' Unit'} name="title" id="editTitle" component={FormikInput} required={true} />
                        <div className="d-flex align-items-center">
                            <div className="form-group text-center mr-3">
                                <label style={{ position: 'relative' }}>
                                    {!!values.image ?
                                        <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: 64, height: 64, boxShadow: 'inset 0 0 10px rgba(0,0,0,0.15)' }}>
                                            <img src={values.image} className="rounded-circle" alt="ava" height="100%" width="100%" />
                                        </div> :
                                        <div className="rounded flex-column d-flex align-items-center justify-content-center bg-secondary" style={{ width: 64, height: 64, boxShadow: 'inset 0 0 10px rgba(0,0,0,0.15)' }}>
                                            <i className="fa fa-upload fa-2x text-light mb-2"></i>
                                            <small className="text-muted">Upload Foto</small>
                                        </div>
                                    }
                                    <input type="file" style={{ position: 'absolute', display: 'none' }} name="image" onChange={changePhoto} />
                                </label>
                            </div>
                            <Field type="text" label={t('nama') + ' ' + t('orang')} name="name" id="editName" component={FormikInput} />
                        </div>
                        <Button color="netis-color" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? <span><Spinner size="sm" className="mr-2" /> Loading...</span> : t('simpan')}
                        </Button>
                    </Form>
                )
            }}
        />
    )
});

const NodeComponent = translate(function (props) {
    const { node, onMoved } = props;
    const globalState = useContext(componentStore);
    const { dispatch: dispatchModal } = globalState;
    const { can } = useUserPrivileges();

    const ref = useRef(null);
    const [{ opacity }, drag] = useDrag({
        item: { node, type: 'node' },
        end: function (item, monitor) {
            const dropResult = monitor.getDropResult();
            if (item && dropResult && dropResult.dropEffect === 'move' && item.node !== dropResult.node) {
                onMoved(item.node, dropResult.node);
            }
        },
        collect: (monitor) => ({ opacity: monitor.isDragging() ? 0.4 : 1 })
    })
    const [{ canDrop, isOver }, drop] = useDrop({
        accept: 'node',
        drop: () => ({ node }),
        canDrop: (item) => !node.hasPredecessor(item.node),
        collect: (monitor) => ({ isOver: monitor.isOver(), canDrop: monitor.canDrop() })
    })
    drag(drop(ref));

    let backgroundColor = "#ffffff";
    if (isOver && canDrop) {
        backgroundColor = "#ffffbb";
    } else if (isOver && !canDrop) {
        backgroundColor = "#ffc3c3";
    }
    return (
        <div className="d-flex justify-content-center mx-1">
            <div ref={ref} className="struktur__node d-flex flex-column shadow rounded px-3 pt-3 pb-1" style={{ width: 200, height: '100%', minHeight: 60, opacity, backgroundColor }}>
                <span className="struktur__nodeDragHelper text-muted">drag and drop to move unit</span>
                <div className="d-flex align-items-center">
                    {!!node.image ?
                        <div className="position-relative mr-2 rounded-circle d-inline-block"><img src={node.image} alt="ava" className="rounded-circle" height="32" width="32" /><div className="rounded-circle position-absolute" style={{ top: 0, width: 32, height: 32, boxShadow: 'inset 0 0 5px rgba(0,0,0,0.15)' }}></div></div>
                        :
                        <div className="position-relative mr-2 rounded-circle d-inline-block d-flex justify-content-center align-items-center"><i className="fa fa-question-circle fa-3x"></i><div className="rounded-circle position-absolute" style={{ top: 0, width: 32, height: 32, boxShadow: 'inset 0 0 5px rgba(0,0,0,0.15)' }}></div></div>
                    }
                    <div className="text-left"><strong>{node.title}</strong><br />{node.name || <i style={{ fontSize: '120%' }}>VACANT</i>}</div>
                </div>
                {can('edit-company-structure') &&
                    <div className="struktur__nodeActions d-flex justify-content-end align-items-center text-right mt-auto">
                        <UncontrolledDropdown>
                            <DropdownToggle size="sm" color="link" className="ml-2 px-1 text-info"><i className="fa fa-pencil-square-o"></i> edit</DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={() => dispatchModal({ type: 'edit', node })}>Edit</DropdownItem>
                                <DropdownItem onClick={() => dispatchModal({ type: 'addChild', node })}>Add Sub-unit</DropdownItem>
                                <DropdownItem onClick={() => dispatchModal({ type: 'addParent', node })}>Add Parent</DropdownItem>
                                <DropdownItem onClick={() => dispatchModal({ type: 'delete', node })} className="text-danger">Delete</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </div>
                }
                <span className={`text-danger struktur__nodeDragForbidden${isOver && !canDrop ? ' show' : ''}`}>
                    <i className="fa fa-ban mr-1"></i> Cannot be moved here.
                </span>
            </div>
        </div>
    );
});
