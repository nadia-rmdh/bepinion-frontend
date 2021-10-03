import React from 'react';
import { Button, Modal, ModalBody } from 'reactstrap';

const ModalError = ({isOpen}) => {
    return(
        <Modal isOpen={isOpen} className="modal-md" backdropClassName="back-home" style={{marginTop: '10vh'}}>
            <ModalBody>
                <div className="row justify-content-center mt-2">
                    <div className="col-12">
                        <div className="text-center" style={{ borderRadius: "5px" }}>
                            <i className="fa fa-2x fa-exclamation-triangle mb-2 text-danger" /><br />
                            <h5 className="my-3">
                                Terjadi kesalahan pemuatan, silahkan muat ulang halaman anda
                            </h5>
                            <Button className="button-pinion-outline px-3" onClick={() => window.location.reload()}>
                                Muat ulang
                            </Button>
                        </div>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    )
}

export default ModalError