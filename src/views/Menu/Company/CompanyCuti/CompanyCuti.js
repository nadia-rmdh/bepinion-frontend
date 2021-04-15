import React, { useState, Fragment, useEffect, useRef, useMemo } from 'react';
import { FormGroup, ListGroup, ListGroupItem, ListGroupItemHeading, CustomInput, Button, Spinner } from 'reactstrap';
import { toast } from 'react-toastify';
import request from '../../../../utils/request'
import {
    translate,
} from 'react-switch-lang';
import LoadingAnimation from '../../../../components/LoadingAnimation';
import { useUserPrivileges } from '../../../../store';
toast.configure()

const CompanyCuti = (props) => {
    const { t } = props;
    const [initialSettings, setInitialSettings] = useState({});
    const [settings, setSettings] = useState({});
    const [fetching, setFetching] = useState(true);
    const [loading, setLoading] = useState(false);
    const formRef = useRef(null);
    const { can } = useUserPrivileges();

    const isChanged = useMemo(() => {
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
    }, [loading, formRef]);

    useEffect(() => {
        request.get('v1/company/settings/holidays')
            .then((response) => {
                setInitialSettings(response.data.data);
            })
            .finally(() => setFetching(false));
    }, [])

    useEffect(() => {
        setSettings(initialSettings);
    }, [initialSettings]);

    const months = [
        { value: 0, label: t('tidakadacutoff') },
        { value: 1, label: t('Januari') },
        { value: 2, label: t('Februari') },
        { value: 3, label: t('Maret') },
        { value: 4, label: t('April') },
        { value: 5, label: t('Mei') },
        { value: 6, label: t('Juni') },
        { value: 7, label: t('Juli') },
        { value: 8, label: t('Agustus') },
        { value: 9, label: t('September') },
        { value: 10, label: t('Oktober') },
        { value: 11, label: t('November') },
        { value: 12, label: t('Desember') },
    ];

    const onChange = function (e) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : parseInt(target.value);
        const key = target.name;
        setSettings((state) => ({ ...state, [key]: value }))
    }

    const onSubmit = function (e) {
        if (!can('edit-company-holiday')) {
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
        request.post('v1/company/settings/holidays', changedSettings)
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
        <Fragment>
            <div className="animated fadeIn">
                <div className="md-company-header">
                    <h4 className="content-title mb-4">{t('pengaturan')} {t('kebijakan cuti')}</h4>
                    <hr className="mb-0" />
                </div>

                <form onSubmit={onSubmit} ref={formRef}>
                    <div className="card card-body p-0">
                        <ListGroup flush className="settings-list">
                            <ListGroupItem className={initialSettings.holidayAfterYear !== settings.holidayAfterYear ? 'is-changed' : undefined}>
                                <ListGroupItemHeading tag="h6">{t('pengaturancutitahunan')}</ListGroupItemHeading>
                                <FormGroup className="mt-2 mb-0">
                                    <CustomInput id="holidayAfterYearInstantly" disabled={!can('edit-company-holiday')} type="radio" name="holidayAfterYear" value="0" onChange={onChange} checked={!settings.holidayAfterYear} label={t('langsung')} />
                                </FormGroup>
                                <FormGroup className="mt-2 mb-0">
                                    <CustomInput id="holidayAfterYearYes" disabled={!can('edit-company-holiday')} type="radio" name="holidayAfterYear" value="1" onChange={onChange} checked={settings.holidayAfterYear} label={t('setelahstahun')} />
                                </FormGroup>
                            </ListGroupItem>

                            <ListGroupItem className={initialSettings.holidayIsYearly !== settings.holidayIsYearly ? 'is-changed' : undefined}>
                                <ListGroupItemHeading tag="h6">{t('apakahjatahcuti')}</ListGroupItemHeading>
                                <FormGroup className="mt-2 mb-0">
                                    <CustomInput id="holidayQtyPerMonth" disabled={!can('edit-company-holiday')} type="radio" name="holidayIsYearly" value="0" onChange={onChange} checked={!settings.holidayIsYearly} label={t('perbulansatu')} />
                                </FormGroup>
                                <FormGroup className="mt-2 mb-0">
                                    <CustomInput id="holidayQtyPerYear" disabled={!can('edit-company-holiday')} type="radio" name="holidayIsYearly" value="1" onChange={onChange} checked={settings.holidayIsYearly} label={t('setelahstahun')} />
                                </FormGroup>
                            </ListGroupItem>

                            <ListGroupItem className={initialSettings.holidayCutOffMonth !== settings.holidayCutOffMonth ? 'is-changed' : undefined}>
                                <ListGroupItemHeading tag="h6">{t('kapancutoff')}</ListGroupItemHeading>
                                <FormGroup className="mt-2 mb-0">
                                    <CustomInput type="select" id="holidayCutOffMonth" name="holidayCutOffMonth" value={settings.holidayCutOffMonth} onChange={onChange}>
                                        {months.map(({ value, label }) => (
                                            <option key={value} value={value}>{label}</option>
                                        ))}
                                    </CustomInput>
                                </FormGroup>

                            </ListGroupItem>
                        </ListGroup>
                    </div>
                    {can('edit-company-holiday') &&
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
        </Fragment>
    )
}
export default translate(CompanyCuti);
