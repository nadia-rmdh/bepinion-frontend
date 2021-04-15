import React from 'react'
import { Badge } from 'reactstrap'
import { t } from 'react-switch-lang';

const statuses = {
    'pending': 'warning',
    'accepted': 'success',
    'rejected': 'danger'
}

const statusLamaran = (stat) => {
    let status = '';
    if (stat === 'pending') {
        status = t('belum diproses')
    }
    if (stat === 'accepted') {
        status = t('sesuai')
    }
    if (stat === 'rejected') {
        status = t('belum sesuai')
    }

    return status
}

function StatusBadge({ status, size = 14 }) {
    return <Badge className={`text-capitalize`} style={{ fontSize: size, fontHeight: 16, color: 'white' }} color={statuses[status]}>
        {statusLamaran(status)}
    </Badge>
}

export default StatusBadge
