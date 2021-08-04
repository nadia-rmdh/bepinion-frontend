import React from 'react'
import * as moment from 'moment';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown, UncontrolledTooltip } from 'reactstrap';
import { memo } from 'react';
import { useState } from 'react';
import { t } from 'react-switch-lang';
import noImageFound from '../../../assets/img/no-project.png';

const notificationDefinitions = {
    'Project': {
        badgeClass: 'badge-info text-white',
        iconStatus: (payload) => {
            if (payload.status === 'done') {
                return { backround: 'bg-primary', icon: 'fa fa-dollar' }
            }
            if (['process1', 'process2'].includes(payload.status)) {
                return { background: 'bg-success', icon: 'fa fa-check' };
            }
            if (payload.status === 'rejected') {
                return { background: 'bg-danger', icon: 'fa fa-times' };
            }
        },
        generateUrl: (notification) => notification?.link ?? `/project/${notification.payload.data?.code}`
    },
    'Team': {
        badgeClass: 'badge-netis-secondary text-white',
        iconStatus: (payload) => {
            if (['approved', 'approved2'].includes(payload.status)) {
                return { background: 'bg-success', icon: 'fa fa-check' };
            }
            if (payload.status === 'rejected') {
                return { background: 'bg-danger', icon: 'fa fa-times' };
            }
        },
        generateUrl: (notification) => notification?.link ?? `/project/${notification.payload.data?.code}/team/${notification.payload.data?.id}`
    },
}


const NotificationItem = memo((props) => {
    const data = props.data;

    // const iconStatus = notificationDefinitions[data.payload.subject].iconStatus(data.payload);
    // const badgeClass = notificationDefinitions[data.payload.subject].badgeClass;

    const [actionLoading, setActionLoading] = useState(false);

    const handleReadClick = () => {
        setActionLoading(true);
        props.onReadClick(props.data)
            .finally(() => setActionLoading(false));
    }

    const onErrorImage = (e) => {
        e.target.src = noImageFound;
        e.target.onerror = null;
    }

    return (
        <div className="list-group-item d-flex position-relative" style={!data.readAt ? { background: '#ebf3ff' } : null}>
            <div className="mr-3 pt-1">
                <div className={`rounded`} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img src={data.payload.data?.image ?? ''} alt="notification-img" onError={(e) => onErrorImage(e)} width="30" height="30" /></div>
            </div>
            <div className="flex-fill">
                <div className="d-flex d-md-block">
                    <div className="ml-auto d-flex align-items-center d-md-none mr-n2" style={{ zIndex: 2 }}>
                        <div className="small text-muted" id={`notification-${data.notificationId}-time`}>
                            {moment(data.created_at).fromNow(true)}
                            <UncontrolledTooltip placement="top" target={`notification-${data.notificationId}-time`}>
                                {data.created_at}
                            </UncontrolledTooltip>
                        </div>
                        {!!data.readAt ?
                            null
                            :
                            <UncontrolledDropdown>
                                <DropdownToggle color="transparent text-dark" size="sm" className="ml-1" disabled={actionLoading}>
                                    <i className="icon-options-vertical small"></i>
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem onClick={handleReadClick}>Tandai telah dibaca</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        }
                    </div>
                </div>
                <div className="mt-md-3">
                    <h6 className="mb-0">{data.payload.message.title}</h6>
                    <p className="mb-0 small text-muted">{data.payload.message.body}</p>
                </div>
            </div>
            <a href={notificationDefinitions[data.payload.subject].generateUrl(data)} className="d-md-none stretched-link" onClick={handleReadClick} target="_blank" rel="noopener noreferrer">&nbsp;</a>
            <div className="d-none d-md-flex flex-column text-right">
                <div className="mb-2">
                    <span className="small text-muted" id={`notification-${data.notificationId}-time-md`}>
                        <i className="icon-clock mr-1"></i> {moment(data.created_at).fromNow(true)}
                    </span>
                    <UncontrolledTooltip placement="top" target={`notification-${data.notificationId}-time-md`}>
                        {moment(data.created_at).format('YYYY-MM-DD HH:mm')}
                    </UncontrolledTooltip>
                </div>

                <div className="mt-auto">
                    {!data.readAt ?
                        <>
                            <button className="btn btn-light btn-sm text-netis-primary" onClick={handleReadClick} id={`notification-${data.notificationId}-read-btn-md`} disabled={actionLoading}><i className="icon-check"></i></button>
                            <UncontrolledTooltip placement="top" target={`notification-${data.notificationId}-read-btn-md`}>
                                Tandai telah dibaca
                            </UncontrolledTooltip>
                        </>
                        :
                        null
                    }
                    <a role="button" target="_blank" rel="noopener noreferrer" onClick={handleReadClick} href={notificationDefinitions[data.payload.subject].generateUrl(data)} className="btn btn-netis-primary px-3 btn-sm ml-2"><i className="fa fa-external-link mr-1 ml-n1"></i> {t('Lihat')}</a>
                </div>
            </div>
        </div>
    );
});

export default NotificationItem;
