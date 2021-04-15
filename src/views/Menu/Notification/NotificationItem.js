import React from 'react'
import * as moment from 'moment';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown, UncontrolledTooltip } from 'reactstrap';
import { memo } from 'react';
import { useState } from 'react';
import { t } from 'react-switch-lang';

const holidayStatusBadgeStyle = {
    width: 20,
    height: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}

const notificationDefinitions = {
    'Reimburse': {
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
        generateUrl: (notification) => notification?.link ?? `/reimburse/detail/${notification.payload.id}`
    },
    'Holiday': {
        badgeClass: 'badge-netis-secondary text-white',
        iconStatus: (payload) => {
            if (['approved', 'approved2'].includes(payload.status)) {
                return { background: 'bg-success', icon: 'fa fa-check' };
            }
            if (payload.status === 'rejected') {
                return { background: 'bg-danger', icon: 'fa fa-times' };
            }
        },
        generateUrl: (notification) => notification?.link ?? `/cuti/detail/${notification.payload.id}`
    },
    'Overtime': {
        badgeClass: 'badge-pink text-white',
        iconStatus: (payload) => {
            if (['approved', 'approved2', 'done'].includes(payload.status)) {
                return { background: 'bg-success', icon: 'fa fa-check' };
            }
            if (payload.status === 'rejected') {
                return { background: 'bg-danger', icon: 'fa fa-times' };
            }
        },
        generateUrl: (notification) => notification?.link ?? `/overtimes/detail/${notification.payload.id}`
    }
}
notificationDefinitions['Reimbursement'] = notificationDefinitions.Reimburse;


const NotificationItem = memo((props) => {
    const data = props.data;

    const iconStatus = notificationDefinitions[data.notificationType].iconStatus(data.payload);
    const badgeClass = notificationDefinitions[data.notificationType].badgeClass;

    const [actionLoading, setActionLoading] = useState(false);

    const handleReadClick = () => {
        setActionLoading(true);
        props.onReadClick(props.data)
            .finally(() => setActionLoading(false));
    }
    
    const handleUnreadClick = () => {
        setActionLoading(true);
        props.onUnreadClick(props.data)
            .finally(() => setActionLoading(false));
    }

    return (
        <div className="list-group-item d-flex position-relative" style={data.read_at ? { background: '#fafafa' } : undefined}>
            <div className="mr-3 pt-1 d-none d-md-block">
                <div className={`rounded ${ iconStatus?.background ?? 'bg-netis-secondary' }`} style={holidayStatusBadgeStyle}><i className={iconStatus?.icon ?? 'fa fa-plus text-white'}></i></div>
            </div>
            <div className="flex-fill">
                <div className="d-flex d-md-block">
                    <div>
                        <div className="d-inline-block d-md-none">
                            <div className={`rounded mr-2 ${ badgeClass ?? 'bg-dark text-white' }`} style={{ width: 16, height: 16, marginTop: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i className={iconStatus?.icon ?? 'fa fa-plus text-white'}></i></div>
                        </div>
                        <div className={`badge px-2 ${ badgeClass ?? 'bg-dark text-white' } ${ data.read_at === null ? 'unread' : ''}`} style={{ verticalAlign: 'text-top'}}>{data.notificationType}</div>
                    </div>
                    <div className="ml-auto d-flex align-items-center d-md-none mr-n2" style={{ zIndex: 2 }}>
                        <div className="small text-muted" id={`notification-${data.notificationId}-time`}>
                            {moment(data.created_at).fromNow(true)}
                            <UncontrolledTooltip placement="top" target={`notification-${data.notificationId}-time`}>
                                {data.created_at}
                            </UncontrolledTooltip>
                        </div>
                        <UncontrolledDropdown>
                            <DropdownToggle color="transparent text-dark" size="sm" className="ml-1" disabled={actionLoading}>
                                <i className="icon-options-vertical small"></i>
                            </DropdownToggle>
                            <DropdownMenu right>
                                {!!data.read_at ?
                                <DropdownItem onClick={handleUnreadClick}>{ t('Tandai belum dibaca') }</DropdownItem>
                                :
                                <DropdownItem onClick={handleReadClick}>{ t('Tandai telah dibaca') }</DropdownItem>
                            }
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </div>
                </div>
                <h6 className="mb-0">{data.message.title}</h6>
                <p className="mb-0 small text-muted">{data.message.body}</p>
            </div>
            <a href={notificationDefinitions[data.notificationType].generateUrl(data)} className="d-md-none stretched-link" onClick={handleReadClick} target="_blank" rel="noopener noreferrer">&nbsp;</a>
            <div className="d-none d-md-flex flex-column text-right">
                <div className="mb-2">
                    <span className="small text-muted" id={`notification-${data.notificationId}-time-md`}>
                        <i className="icon-clock mr-1"></i> {moment(data.created_at).fromNow(true)}
                    </span>
                    <UncontrolledTooltip placement="top" target={`notification-${data.notificationId}-time-md`}>
                        {data.created_at}
                    </UncontrolledTooltip>
                </div>
                
                <div className="mt-auto">
                    <a role="button" target="_blank" rel="noopener noreferrer" onClick={handleReadClick} href={notificationDefinitions[data.notificationType].generateUrl(data)} className="btn btn-netis-primary px-3 btn-sm mr-2"><i className="fa fa-external-link mr-1 ml-n1"></i> { t('Lihat') }</a>
                    {data.read_at ? 
                        <>
                            <button className="btn btn-light btn-sm text-danger" onClick={handleUnreadClick} id={`notification-${data.notificationId}-unread-btn-md`} disabled={actionLoading}><i className="icon-close"></i></button>
                            <UncontrolledTooltip placement="top" target={`notification-${data.notificationId}-unread-btn-md`}>
                                { t('Tandai belum dibaca') }
                            </UncontrolledTooltip>
                        </>
                        :
                        <>
                            <button className="btn btn-light btn-sm text-netis-primary" onClick={handleReadClick} id={`notification-${data.notificationId}-read-btn-md`} disabled={actionLoading}><i className="icon-check"></i></button>
                            <UncontrolledTooltip placement="top" target={`notification-${data.notificationId}-read-btn-md`}>
                                { t('Tandai telah dibaca') }
                            </UncontrolledTooltip>
                        </>
                    }
                </div>
            </div>
        </div>
    );
});

export default NotificationItem;
