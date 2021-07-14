import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export default ({ isOpen, toggle, data, onDeleteCard }) => {
    const handleToggle = () => {
        toggle()
    }

    return (
        <Modal isOpen={!!isOpen} toggle={() => handleToggle()} size="sm" centered>
            <ModalHeader>
                Pilih Card yang ingin anda buat!
            </ModalHeader>
            <ModalBody>
                Apa anda yakin ingin menghapus card ini ?
            </ModalBody>
            <ModalFooter>
                <Button className="mr-2" color="netis-secondary" onClick={() => handleToggle()}>
                    Batal
                </Button>
                <Button color="netis-danger" onClick={() => {
                    onDeleteCard(data)
                    toggle()
                }}>
                    Hapus
                </Button>
            </ModalFooter>
        </Modal>
    )
}