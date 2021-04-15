import React, { useRef, useEffect } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader, Button, Spinner } from 'reactstrap'
import { Formik, Field, Form } from 'formik'
import FormikInput from '../../../../../components/Form/FormikInput'
import { Node } from './TreeStruktur'

function focusInputAfterModalShown(inputRef, shouldFocus) {
    return () => {
        if (shouldFocus) {
            setTimeout(() => {
                inputRef.current.focus();
            }, 500)
        }
    }
}

export function EditModal(props) {
    const { node, onSubmitted, isOpen, toggle } = props;
    const inputRef = useRef()

    useEffect(focusInputAfterModalShown(inputRef, isOpen), [isOpen])

    return (<Modal isOpen={isOpen} toggle={toggle}>
        <Formik
            initialValues={{ name: node?.name, title: node?.title }}
            validate={(values) => {
                const errors = {};
                if (!values.title) {
                    errors.title = 'Nama Unit tidak boleh kosong.'
                }

                return errors;
            }}
            onSubmit={(values) => onSubmitted(values)}
            render={({ isSubmitting }) => {
                return (
                    <Form>
                        <ModalHeader toggle={toggle}><strong>Edit: </strong>{node?.name}</ModalHeader>
                        <ModalBody>
                            <Field innerRef={inputRef} type="text" label="Nama Unit" name="title" id="editTitle" component={FormikInput} />
                            <Field type="text" label="Nama Orang" name="name" id="editName" component={FormikInput} />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="netis-color" type="submit" disabled={isSubmitting}>
                                {isSubmitting ? <span><Spinner size="sm" className="mr-2" /> Loading...</span> : 'Simpan Perubahan'}
                            </Button>
                            <Button color="secondary" onClick={toggle}>Batal</Button>
                        </ModalFooter>
                    </Form>);
            }} />
    </Modal>);
}

export function AddNodeModal(props) {
    const { node, onSubmitted, isOpen, toggle } = props;
    const inputNameRef = useRef()

    useEffect(focusInputAfterModalShown(inputNameRef, isOpen), [isOpen])

    return (<Modal isOpen={isOpen} toggle={toggle}>
        <Formik
            initialValues={{ title: '', name: '' }}
            validate={(values) => {
                const errors = {};
                if (!values.title) {
                    errors.title = 'Nama tidak boleh kosong.'
                }
                return errors;
            }}
            onSubmit={(values) => onSubmitted(new Node(values))}
            render={({ isSubmitting }) => {
                return (
                    <Form>
                        <ModalHeader toggle={toggle}><strong>Add Child: </strong>{node?.name}</ModalHeader>
                        <ModalBody>
                            <Field innerRef={inputNameRef} type="text" label="Nama Unit" name="title" id="editTitle" component={FormikInput} />
                            <Field type="text" label="Nama Orang" name="name" id="editName" component={FormikInput} />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="netis-color" type="submit" disabled={isSubmitting}>
                                {isSubmitting ? <span><Spinner size="sm" className="mr-2" /> Menyimpan...</span> : 'Simpan'}
                            </Button>
                            <Button color="secondary" onClick={toggle}>Batal</Button>
                        </ModalFooter>
                    </Form>
                )
            }}
        />
    </Modal>)
}

export function DeleteModalConfirmation(props) {
    const { node, onConfirmed, isOpen, toggle } = props;

    return (<Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Apakah anda yakin akan menghapus unit<br />"{node?.name}"</ModalHeader>
        <ModalFooter>
            <Button color="danger" onClick={onConfirmed}>Ya, Hapus</Button>
            <Button color="secondary" onClick={toggle}>Tidak</Button>
        </ModalFooter>
    </Modal>)
}
