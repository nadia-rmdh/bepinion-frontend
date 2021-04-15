import React, { useState, useEffect, useRef } from 'react'
import { ListGroup, ListGroupItem, FormGroup, ListGroupItemHeading, Button, Spinner, CustomInput } from 'reactstrap'
import { translate } from 'react-switch-lang'
import request from '../../../../utils/request';
import { toast } from 'react-toastify'
import LoadingAnimation from '../../../../components/LoadingAnimation';
import { useUserPrivileges } from '../../../../store';

function OvertimePolicySetting({ t }) {
    const [initialSettings, setInitialSettings] = useState({});
    const [settings, setSettings] = useState({});
    const [fetching, setFetching] = useState(true);
    const [loading, setLoading] = useState(false);
    const formRef = useRef(null);
    const { can } = useUserPrivileges();

    const isChanged = React.useMemo(() => {
        const objKeys = Object.keys(settings);
        for (let i = 0; i < objKeys.length; i++) {
            if (settings[objKeys[i]] !== initialSettings[objKeys[i]]) {
                return true;
            }
        }
        return false;
    }, [initialSettings, settings]);

    useEffect(() => {
        if (formRef.current) {
            const inputs = formRef.current.getElementsByTagName('input');
            for (let i = 0, l = inputs.length; i < l; ++i) {
                inputs[i].disabled = loading
            }
        }
    }, [loading, formRef])

    useEffect(() => {
        request.get('v1/company/settings/overtimes')
            .then(res => {
                setInitialSettings(res.data.data);
            })
            .finally(() => setFetching(false))
    }, [])
    useEffect(() => {
        setSettings(initialSettings);
    }, [initialSettings])

    const onChange = function (e) {
        const target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        if (value === 'true') {
            value = true;
        } else if (value === 'false') {
            value = false;
        }
        const key = target.name;
        setSettings((state) => ({ ...state, [key]: value }))
    }

    const onSubmit = function (e) {
        if (!can('edit-company-overtime')) {
            toast.error('Maaf anda tidah boleh melakukan aksi ini.')
            return
        }
        e.preventDefault();
        if (!isChanged) return;

        const changedSettings = {};
        const objKeys = Object.keys(settings);
        for (let i = 0; i < objKeys.length; i++) {
            if (settings[objKeys[i]] !== initialSettings[objKeys[i]]) {
                changedSettings[objKeys[i]] = settings[objKeys[i]];
            }
        }
        setLoading(true);
        request.post('v1/company/settings/overtimes', changedSettings)
            .then(res => {
                setInitialSettings({ ...settings });
            })
            .catch(() => toast.error('Gagal menyimpan'))
            .finally(() => setLoading(false));
    }

    if (fetching) {
        return <LoadingAnimation />
    }

    return (
        <div className="animated fadeIn">
            <div className="md-company-header">
                <h4 className="content-title mb-4">{t('pengaturan')} {t('kebijakan lembur')}</h4>
                <hr className="mb-0" />
            </div>

            <form onSubmit={onSubmit} ref={formRef}>
                <div className="card card-body p-0">
                    <ListGroup flush className="settings-list">

                        <ListGroupItem className={initialSettings.overtimeMustRequest !== settings.overtimeMustRequest ? 'is-changed' : undefined}>
                            <ListGroupItemHeading tag="h6">{t('Lembur dengan persetujuan')}</ListGroupItemHeading>
                            <FormGroup className="mt-2 mb-0">
                                <CustomInput id="overtimeMustRequest" disabled={!can('edit-company-overtime')} type="radio" name="overtimeMustRequest" value="true" onChange={onChange}
                                    checked={settings.overtimeMustRequest}
                                    label={t('Karyawan harus membuat permintaan lembur lalu disetujui oleh admin sebelum bisa melakukan absen lembur')} />
                            </FormGroup>
                            <FormGroup className="mt-2 mb-0">
                                <CustomInput id="overtimeMustNotRequest" disabled={!can('edit-company-overtime')} type="radio" name="overtimeMustRequest" value="false" onChange={onChange}
                                    checked={!settings.overtimeMustRequest}
                                    label={t('Permintaan lembur akan otomatis dibuat ketika karyawan melakukan absen lembur.')} />
                            </FormGroup>
                            {/* <small className="text-muted">{t('Jika tidak dipilih, maka permintaan lembur akan otomatis dibuat ketika karyawan melakukan absen lembur.')}</small> */}
                        </ListGroupItem>

                        <ListGroupItem className={initialSettings.overtimeTimeCounting !== settings.overtimeTimeCounting ? 'is-changed' : undefined}>
                            <ListGroupItemHeading tag="h6">{t('Perhitungan lembur')}</ListGroupItemHeading>
                            <FormGroup className="mt-2 mb-0">
                                <CustomInput id="overtimeTimeCounting-request" disabled={!can('edit-company-overtime')} type="radio" value="request" name="overtimeTimeCounting" onChange={onChange}
                                    checked={settings.overtimeTimeCounting === 'request'}
                                    label={t('Sesuai jam yang tertera di permintaan lembur')} />
                            </FormGroup>
                            <FormGroup className="mb-0">
                                <CustomInput id="overtimeTimeCounting-reality" disabled={!can('edit-company-overtime')} type="radio" value="reality" name="overtimeTimeCounting" onChange={onChange}
                                    checked={settings.overtimeTimeCounting === 'reality'}
                                    label={t('Sesuai dengan durasi absen lembur')} />
                            </FormGroup>
                        </ListGroupItem>

                    </ListGroup>
                </div>
                {can('edit-company-overtime') &&
                    <div className="d-flex mt-3 justify-content-center">
                        <Button color="secondary" disabled={!isChanged}><i className="fa fa-repeat mr-1"></i> {t('reset')}</Button>
                        <Button className="ml-2" color="netis-color" type="submit" disabled={loading || !isChanged}>
                            {loading ? <React.Fragment><Spinner size="sm" color="light" /> {t('loading')}</React.Fragment> :
                                <React.Fragment><i className="fa fa-check-circle mr-1"></i> {t('simpan')}</React.Fragment>}
                        </Button>
                    </div>
                }
            </form>
        </div>
    )
}


export default translate(OvertimePolicySetting)
