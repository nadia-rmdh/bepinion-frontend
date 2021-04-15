import React, { useState, Fragment } from 'react'
import { Row, Button, Modal, ModalBody, FormGroup, Label, Input, ModalHeader } from 'reactstrap';
import Select from 'react-select';
import { HandleChangeInput } from '../../../../../utils/HandleChangeInput';
import { HandleChangeDropdown } from '../../../../../utils/HandleChangeDropdown';
import { AddData } from '../../../../../utils/AddData';
import { EditData } from '../../../../../utils/EditData';
import { DeleteData } from '../../../../../utils/DeleteData';
import {
    translate,
} from 'react-switch-lang';
export default translate(function ModalBankComponent(props) {
    const [state, setState] = useState({
        data: props.data
    })
    const changeInput = (e) => {
        let data = HandleChangeInput(state.data, e);
        setState({ data });
    }
    const changeInputDropdown = (param) => (e) => {
        let data = HandleChangeDropdown(param, state.data, e);
        setState({ data });
    }
    const processData = async (e) => {
        e.preventDefault();
        let response;
        const id = state.data.id;
        const url = props.url;
        const dataSubmit = {
            bankId: state.data.bank.id,
            currencyId: state.data.currency.id,
            number: state.data.number,
            holderName: state.data.holderName
        };

        if (props.status === 'add') {
            response = await AddData(url, dataSubmit);
        } else if (props.status === 'edit') {
            response = await EditData(url, dataSubmit, id);
        } else if (props.status === 'delete') {
            response = await DeleteData(url, id);
        }

        if (response === true) {
            props.getData();
            props.onClickCancel();
        }
    }
    const { t } = props;
    return (
        <Modal isOpen={props.isShow}>
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
                                    <Button color="danger" style={{ width: '67px' }} onClick={processData}>
                                        {t('hapus')}
                                    </Button>
                                </div>
                            </Row>
                        </Fragment>
                    ) :
                    (
                        <form onSubmit={processData}>
                            <Row className="mb-4">
                                <div className="col-md-12">
                                    <FormGroup>
                                        <Label htmlFor="currencies" className="input-label">{t('matauang')}</Label>
                                        <Select
                                            name="currency"
                                            value={state.data.currency}
                                            onChange={changeInputDropdown('currency')}
                                            options={props.currencies}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="bank" className="input-label">{t('namabank')}</Label>
                                        <Select
                                            name="bank"
                                            value={state.data.bank}
                                            onChange={changeInputDropdown('bank')}
                                            options={props.banks}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="number" className="input-label">{t('nomorrekening')}</Label>
                                        <Input type="text" name="number" id="number" value={state.data.number} onChange={changeInput} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="holderName" className="input-label">{t('namapemilikrekening')}</Label>
                                        <Input type="text" name="holderName" id="holderName" value={state.data.holderName} onChange={changeInput} />
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