import React from 'react'
import { Modal, ModalBody, Button } from 'reactstrap';

const forbiddenDesc = {
    canManagementTopUp: "dalam manajemen TopUp akun ini",
    canManagementJob: "dalam manajemen lowongan dalam akun ini",
    canManagementToken: "dalam penggunaan token akun ini",
    canManagementCompany: "dalam mengubah profil perusahaan",
    canManagementUser: "manajemen user dalam akun ini",
    canInternalAssesment: "pada fitur Internal Asesmen Perusahaan"
}

function ModalPrivilegeForbidden({isOpen, isClose, forbidden}){

    return(
        <Modal isOpen={isOpen} className="modal-md" backdropClassName="back-home" style={{marginTop: '10vh'}}>
            <ModalBody>
                <div className="row justify-content-center mt-2">
                    <div className="col-12">
                        <div className="text-center" style={{ borderRadius: "5px" }}>
                            <i className="fa fa-2x fa-exclamation-triangle mb-2 text-danger" /><br />
                            <h5 className="my-3" style={{lineHeight:2}}>
                                Mohon maaf, Anda tidak memiliki akses {forbiddenDesc[forbidden]},
                                silahkan hubungi Admin Anda jika Anda ingin mengakses fitur ini.
                            </h5>
                            <Button className="button-pinion-outline px-3" onClick={isClose}>
                                Oke, saya mengerti
                            </Button>
                        </div>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    )
}

export default ModalPrivilegeForbidden;