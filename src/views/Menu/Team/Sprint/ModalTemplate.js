import React, { useState } from "react";
import { toast } from "react-toastify";
import { Button, Card, CardBody, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import request from "../../../../utils/request";

export default ({ isOpen, toggle, mutate, teamId, container, category }) => {
    const templates = {
        'analysis': [
            { value: 'basic', label: 'Basic' },
            { value: 'c8', label: 'Crazy Eight' },
            { value: 'fishbone', label: 'Fishbone' },
            { value: 'sprintmap', label: 'Sprint Map' },
            { value: 'storyboard9', label: 'Story Board 9' }
        ],
        'prototyping': [
            { value: 'basic', label: 'Basic' },
        ]
    }

    const [template, setTemplate] = useState('')
    const handleToggle = () => {
        toggle(false)
    }

    const handleCreateTemplate = () => {
        request.post('v1/cards', {
            teamId: teamId,
            title: template.label,
            description: '...',
            container: container,
            category: category,
            template: template.value
        })
            .then(() => {
                // toast.success('Berhasil menambahkan Card')
                mutate()
                toggle(false)
            })
            .catch(() => {
                toast.error('Gagal menambahkan Card')
                return;
            })
    }

    return (
        <Modal isOpen={isOpen} toggle={() => handleToggle()} size="lg">
            <ModalHeader>
                Pilih Card yang ingin anda buat!
            </ModalHeader>
            <ModalBody>
                <Row className="d-flex justify-content-center align-items-center">
                    {templates[container]?.map((t, i) => (
                        <Col xs="4" key={i} className="d-flex justify-content-center align-items-center px-0">
                            <Card className={`card-template ${template.value === t.value && 'card-template-active'}`} onClick={() => setTemplate(t)}>
                                <CardBody className="d-flex justify-content-center align-items-center">
                                    <b>{t.label}</b>
                                </CardBody>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button className="mr-2" color="netis-secondary" onClick={() => handleToggle()}>
                    Batal
                </Button>
                <Button color="netis-primary" onClick={() => handleCreateTemplate()}>
                    Buat
                </Button>
            </ModalFooter>
        </Modal>
    )
}