import React, { useMemo, memo, useEffect, useRef, useState } from 'react'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
import { useUserNotification } from '../../hooks/useUserNotification';
import { t } from 'react-switch-lang';
import { Link } from 'react-router-dom';
import * as firebase from '../../firebaseInit';
import moment from 'moment';
import { useAuthUser } from '../../store';

const MessageDropdown = memo(() => {
    const { unreadCount } = useUserNotification([]);
    const user = useAuthUser();
    const bellRef = useRef();
    const ringedTimeout = useRef(null);

    useEffect(() => {
        const handler = firebase.onNotificationMessage((obj) => {
            if (bellRef.current && obj.data?.notificationRole === 'user' && parseInt(obj.data?.personnelId) !== user?.personnel?.id) {
                clearTimeout(ringedTimeout.current)
                if (bellRef.current && !bellRef.current.classList.contains('ringed')) {
                    bellRef.current.classList.add('ringed');
                }
                ringedTimeout.current = setTimeout(() => {
                    if (bellRef.current && bellRef.current.classList.contains('ringed')) {
                        bellRef.current.classList.remove('ringed');
                    }
                }, 12900);
            }
        });

        return () => {
            handler();
        };
    }, [user])

    const [dropdownOpened, setDropdownOpened] = useState(false);
    const toggle = () => {
        setDropdownOpened(opened => !opened);
        if (bellRef.current && bellRef.current.classList.contains('ringed')) {
            clearTimeout(ringedTimeout.current)
            bellRef.current.classList.remove('ringed');
        }
    };

    return (
        <Dropdown isOpen={dropdownOpened} toggle={toggle} nav direction="down" className="notification-dropdown-menu d-none d-md-flex">
            <DropdownToggle  nav><i ref={bellRef} className={`fa fa-envelope-o${ unreadCount ? ' marked' : '' }`} style={{ fontSize: '1.6em' }}></i></DropdownToggle>
            {dropdownOpened && <MessageDropdownMenu/>}
        </Dropdown>
    )
})

function MessageDropdownMenu() {
    const { data, loading, error, unreadCount } = useUserNotification([], {
        refreshInterval: 30000
    });

    const notifications = useMemo(() => data.slice(0, 5), [data]);

    return (<DropdownMenu right>
        {error ? <DropdownItem><i className="fa fa-warning text-danger"></i> {t('Terjadi Kesalahan!')}</DropdownItem> :
        loading ? <DropdownItem>Loading...</DropdownItem> :
        <React.Fragment>
            <DropdownItem header className="d-flex align-items-center border-bottom-0">
                <strong>Pemberitahuan</strong>
            </DropdownItem>
            {notifications.map(notification => (
                <MessageDropdownItem key={notification.id} notification={notification} />
            ))}
        </React.Fragment>
        }
        <Link to="/notifications" tabIndex="0" role="button"
            className="dropdown-link dropdown-header text-center border-bottom-0"
        >
            {t('Lihat Semua')}
            {unreadCount > 0 && ` (${unreadCount > 99 ? '99+' : unreadCount} ${t('belum dibaca')})`}
        </Link>
    </DropdownMenu>);
}

const notificationTypes = {
    'Reimburse': {
        icon: 'icon-wallet text-primary',
        generateUrl: (notification) => notification?.link ?? `/reimburse/detail/${notification.payload.id}`
    },
    'Holiday': {
        icon: 'icon-user-unfollow text-netis-secondary',
        generateUrl: (notification) => notification?.link ?? `/cuti/detail/${notification.payload.id}`
    },
    'Overtime': {
        icon: 'icon-hourglass text-pink',
        generateUrl: (notification) => notification?.link ?? `/overtimes/detail/${notification.payload.id}`
    }
}
notificationTypes['Reimbursement'] = notificationTypes.Reimburse;


const MessageDropdownItem = memo(({ notification }) => {
    const { markAsRead } = useUserNotification();

    const onClick = () => {
        if (notification.read_at === null) {
            markAsRead(notification);
        }
    };

    const LinkComponent = useMemo(() => {
        const url = notificationTypes[notification.notificationType]?.generateUrl(notification);

        if (url && url.substr(0, 4) === 'http') {
            return (props) => <a href={url} {...props}>{props.children}</a>
        }

        return (props) => <Link to={url} {...props}/>
    }, [notification])

    return (
        <LinkComponent role="menuitem" tabIndex="0" className={`dropdown-item d-flex align-items-center border-bottom-0${notification.read_at ? '' : ' dropdown-unread'}`} onClick={onClick}>
            <i className={`mr-3 font-xl ${notificationTypes[notification.notificationType]?.icon ?? ''}`}></i>
            <div className="flex-fill small">
                <div className="d-flex">
                    <span className="font-weight-bold mr-3">{notification.message.title}</span>
                    <span className="ml-auto text-muted"><i className="icon-clock mx-0 w-auto text-muted" style={{ fontSize: 10}}></i> {moment(notification.created_at).fromNow(true)}</span>
                </div>
                <p className="mb-0 text-muted">{notification.message.body}</p>
            </div>
        </LinkComponent>
    );
});

export default MessageDropdown
