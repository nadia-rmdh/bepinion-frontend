import React from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import TopUpToken from '../../Token/TopUpToken';

function NoToken({ nullData, isOpen, toggle }) {
    const toggleNoToken = () => toggle(!isOpen);
    return (
        <Modal isOpen={isOpen} toggle={toggleNoToken} className="modal-md" centered>
            <ModalHeader toggle={toggleNoToken} className="border-bottom-0">
            </ModalHeader>
            <ModalBody className="pt-0 pb-5">
                <div className="row justify-content-center">
                    <div className="col-12">
                        <div className="text-center" style={{ borderRadius: "5px" }}>
                            <i className="fa fa-4x fa-exclamation-triangle mb-2" style={{ color: "#335877" }} />
                            <h5 className="my-3 font-weight-bold">
                                {nullData === "all" ?
                                    "Maaf, saat ini Anda tidak dapat mengakses beberapa fitur Asesmen. Namun anda tetap dapat mengakses asesmen yang telah anda beli sebelumnya."
                                    :
                                    "Maaf, saat ini Anda tidak dapat mengakses fitur Asesmen ini."
                                }
                                <br /><br />Silahkan melakukan Top Up Token
                            </h5>
                            <TopUpToken className="btn btn-light text-netis-color my-2" />
                        </div>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    )
}

export default NoToken