import React, { useState, Fragment } from 'react'
import { Row, Button, Modal, ModalBody, FormGroup, Label, Input, ModalHeader, UncontrolledTooltip } from 'reactstrap';
import Select from 'react-select';
import ImagePdf from '../../../../../assets/assets_ari/pdf.png';
import Info from '../../../../../assets/assets_ari/info.png';
import { DatePickerInput } from 'rc-datepicker';
import 'rc-datepicker/lib/style.css';
import {
    translate,
} from 'react-switch-lang';
export default translate(function ModalDocumentComponent(props) {
    // eslint-disable-next-line
    const [state, setState] = useState({
        preview: null,
        previewType: '',
        previewName: '',
        tooltipOpen: false,
    })
    const { t } = props;

    return (
        <Modal isOpen={props.isShow} className="modal-lg">
            <ModalHeader>
                {props.title}
            </ModalHeader>
            <ModalBody>
                {props.status === 'delete' ?
                    (
                        <Fragment>
                            <Row className="mb-5">
                                <div className="col-12 text-center">
                                    <h6>{t('yakinmenghapus')}</h6>
                                </div>
                            </Row>
                            <Row>
                                <div className="col-12 d-flex justify-content-end">
                                    <Button className="mr-2" color="white" onClick={props.onClickCancel}>{t('batal')}</Button>
                                    <Button color="danger" style={{ width: '67px' }} onClick={props.processData}>
                                        {t('hapus')}
                                    </Button>
                                </div>
                            </Row>
                        </Fragment>
                    ) :
                    (
                        <form onSubmit={props.processData}>
                            <Row className="mb-4">
                                <div className="col-md-6 d-flex justify-content-center align-items-center">
                                    {props.preview !== null ? (
                                        <Row>
                                            <div className="col-md-12 d-flex justify-content-center align-items-center">
                                                <p>Upload {t('dokumen')} ( Max 5 MB ) :</p>
                                            </div>
                                            <div className="col-md-12 d-flex justify-content-center align-items-center">
                                                <FormGroup>
                                                    {props.previewType === 'application/pdf' ? (
                                                        <img src={ImagePdf} alt="pdf" width="130" height="130" />
                                                    ) :
                                                        <img src={props.preview} alt="preview" width="300" height="300" />
                                                    }
                                                    <p className="text-center">{props.previewName}</p>
                                                </FormGroup>
                                            </div>
                                            <div className="col-md-12 d-flex justify-content-center align-items-center">
                                                <FormGroup>
                                                    <Input type="file" id="document-img-upload" name="document-img-upload" onChange={props.changeDocument} />
                                                </FormGroup>
                                            </div>
                                        </Row>
                                    ) : props.data.document === null ? (
                                        <Row>
                                            <div className="col-md-12 d-flex justify-content-center align-items-center">
                                                <p>Upload {t('dokumen')} ( Max 5 MB ) :</p>
                                            </div>
                                            <div className="col-md-12 d-flex justify-content-center align-items-center">
                                                <div className="input-personnel-document d-flex justify-content-center align-items-center">
                                                    <Label htmlFor="document-img-upload" className="input-label btn-circle"><span className="fa fa-plus"></span></Label>
                                                    <Input type="file" id="document-img-upload" name="document-img-upload" className="d-none" onChange={props.changeDocument} />
                                                </div>
                                            </div>
                                        </Row>
                                    ) : (
                                                <Row>
                                                    <div className="col-md-12 d-flex justify-content-center align-items-center">
                                                        <p>Upload {t('dokumen')} ( Max 5 MB ) :</p>
                                                    </div>

                                                    <div className="col-md-12 d-flex justify-content-center align-items-center">
                                                        <FormGroup>
                                                            <img src={process.env.REACT_APP_DOMAIN + "" + props.data.path} alt="dummy" width="300" height="300" />
                                                        </FormGroup>
                                                    </div>
                                                    <br />
                                                    <div className="col-md-12 d-flex justify-content-center align-items-center">
                                                        <FormGroup>
                                                            <Input type="file" id="document" name="document" onChange={props.changeDocument} />
                                                        </FormGroup>
                                                    </div>
                                                </Row>
                                            )
                                    }
                                </div>
                                <div className="col-md-6">
                                    <FormGroup>
                                        <Label htmlFor="type" className="input-label">{t('tipedokumen')}</Label>
                                        <Select
                                            name="type"
                                            value={props.data.type}
                                            onChange={props.changeInputDropdown('type')}
                                            options={props.types}
                                            required
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="number" className="input-label">{t('nomordokumen')}</Label>
                                        <Input type="text" name="number" id="number" value={props.data.number} onChange={props.changeInput} required={true} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="expiryDate" className="input-label">{t('berlakuhingga')} <img src={Info} alt="info" width="15" height="15" id='Tooltip-info' /> </Label>
                                        <UncontrolledTooltip placement="right" target="Tooltip-info">
                                            {t('hintdokumen')}
                                        </UncontrolledTooltip>
                                        <DatePickerInput
                                            name="expiryDate"
                                            id="expiryDate"
                                            onChange={props.changeDate('expiryDate')}
                                            value={props.data.expiryDate}
                                            className='my-custom-datepicker-component'
                                            required={true}
                                            showOnInputClick={true}
                                            closeOnClickOutside={true}
                                            displayFormat="DD MMMM YYYY"
                                            readOnly
                                        />
                                    </FormGroup>
                                </div>
                            </Row>
                            <Row>
                                <div className="col-12 d-flex justify-content-end">
                                    <Button className="mr-2" color="white" onClick={props.onClickCancel}>{t('batal')}</Button>
                                    <Button type="submit" color="netis-color" style={{ width: '67px' }}>
                                        {t('simpan')}
                                    </Button>
                                </div>
                            </Row>
                        </form>
                    )
                }
            </ModalBody>
        </Modal>
    )
})