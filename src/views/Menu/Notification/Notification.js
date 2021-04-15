import React, { useState } from 'react'
import LoadingAnimation from '../../../components/LoadingAnimation';
import { useUserNotification } from '../../../hooks/useUserNotification'
import NotificationItem from './NotificationItem';
import moment from 'moment';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { useCallback } from 'react';

function Notification() {
    const { data: notifications, loading, error, markAllAsRead, markAsRead, markAsUnread } = useUserNotification([], {
        refreshInterval: 30000
    }); 
    const [readAllLoading, setReadAllLoading] = useState(false);

    function handleMarkAllAsRead() {
        setReadAllLoading(true);
        markAllAsRead()
            .finally(() => setReadAllLoading(false));
    }

    const handleReadNotificationClick = useCallback((notification) => {
        return markAsRead(notification);
    }, [markAsRead])

    const handleUnreadNotificationClick = useCallback((notification) => {
        return markAsUnread(notification);
    }, [markAsUnread])

    if (loading) {
        return <LoadingAnimation/>
    }

    if (error) {
        return <div className="alert alert-danger">
            <h5>Maaf, Terjadi Galat!</h5>
            <span>Silahkan muat ulang halaman ini atau laporkan kepada tim IT Support kami</span>
        </div>
    }

    const monthNames = Array.from(new Set(notifications.map(n => moment(n.created_at).format('MMMM YYYY'))));
    const notificationPerMonths = {};
    monthNames.forEach(month => {
        notificationPerMonths[month] = [];
    });
    notifications.forEach(n => {
        const month = moment(n.created_at).format('MMMM YYYY');
        notificationPerMonths[month].push(n);
    });

    return (
        <div className="animated fadeIn">
            <div className="d-flex align-items-center">
                <h4>Riwayat Notifikasi</h4>
                <div className="ml-auto">
                    <button className="btn btn-link text-netis-primary d-none d-md-inline-block" onClick={handleMarkAllAsRead} disabled={readAllLoading}>tandai semua telah dibaca</button>
                    <UncontrolledDropdown className="d-inline-block d-md-none">
                        <DropdownToggle color="netis-primary" size="sm">
                            <i className="fa fa-angle-down"></i>
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem onClick={handleMarkAllAsRead} disabled={readAllLoading}>tandai semua telah dibaca</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </div>
            </div>
            {Object.keys(notificationPerMonths).map(month => (
                <div key={month}>
                    <h5 className="mb-1">{month}</h5>
                    <div className="list-group mb-3 bg-white shadow-sm">
                    {notificationPerMonths[month].map(notification => (
                        <NotificationItem
                            key={notification.id}
                            data={notification}
                            onReadClick={handleReadNotificationClick}
                            onUnreadClick={handleUnreadNotificationClick}
                        />
                    ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Notification
