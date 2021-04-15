import React, { useCallback } from 'react'
import LoadingAnimation from '../../../components/LoadingAnimation';
import NotificationItem from './NotificationItem';
import useAdminNotification from './useAdminNotification';
import moment from 'moment';
import {t} from 'react-switch-lang';
import DataNotFound from "../../../components/DataNotFound";

function AdminNotification() {
    const { data: notifications, loading, error, markAsRead, markAsUnread } = useAdminNotification({ refreshInterval: 30000 });

    const handleReadNotificationClick = useCallback((notification) => {
        return markAsRead(notification);
    }, [markAsRead]);

    const handleUnreadNotificationClick = useCallback((notification) => {
        return markAsUnread(notification);
    }, [markAsUnread]);

    if (loading) {
        return <LoadingAnimation/>
    }

    if (error) {
        return <div className="alert alert-danger">
            <h5>{ t('Maaf, Terjadi Galat!') }</h5>
            <span>{ t('Silahkan muat ulang halaman ini atau laporkan kepada tim IT Support kami') }</span>
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
        {
            notificationPerMonths.length === 0 ?
            <DataNotFound />
            :
            Object.keys(notificationPerMonths).map(month => (
                <div key={month}>
                    <strong className="text-uppercase" style={{ fontSize: 14 }}>{month}</strong>
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
            ))
        }
        </div>
    )
}

export default AdminNotification
