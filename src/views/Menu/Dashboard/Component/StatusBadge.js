import React from 'react'
import {
    translate,
} from 'react-switch-lang';
export default translate(function StatusBadge(props) {
    const { t } = props;
    switch (props.status) {
        case 'pending': return <><i className="fa fa-circle text-warning mr-1"></i> {t('diproses')}</>;
        case 'approved1': return <><i className="fa fa-circle-o text-warning mr-1"></i> {t('menunggupersetujuanadmin')}</>;
        case 'approved2': return <><i className="fa fa-circle text-info mr-1"></i> {t('disetujui')}</>;
        case 'rejected': return <><i className="fa fa-circle text-danger mr-1"></i>{t('ditolak')} </>;
        case 'process1': return <><i className="fa fa-circle-o text-info mr-1"></i> {t('diprosesatasan')}</>;
        case 'process2': return <><i className="fa fa-circle text-info mr-1"></i> {t('diprosesadmin')}</>;
        case 'done': return <><i className="fa fa-circle text-success mr-1"></i> {t('ditransfer')}</>;
        default: return props.status
    }
})
