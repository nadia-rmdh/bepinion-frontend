import React, { useMemo, memo, useEffect, useRef, useState } from 'react'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
import { useUserNotification } from '../../hooks/useUserNotification';
import { t } from 'react-switch-lang';
import { Link } from 'react-router-dom';
import * as firebase from '../../firebaseInit';
import moment from 'moment';
import noImageFound from '../../assets/img/no-project.png';
import { useAuthUser } from '../../store';
import { toast } from 'react-toastify';
import { DefaultProfile } from '../../components/Initial/DefaultProfile';

const NotificationDropdown = memo(() => {
    const { unreadCount } = useUserNotification([]);
    const user = useAuthUser();
    const bellRef = useRef();
    const ringedTimeout = useRef(null);

    useEffect(() => {
        const handler = firebase.onNotificationMessage((obj) => {
            clearTimeout(ringedTimeout.current)
            if (bellRef.current && !bellRef.current.classList.contains('ringed')) {
                bellRef.current.classList.add('ringed');
            }
            ringedTimeout.current = setTimeout(() => {
                if (bellRef.current && bellRef.current.classList.contains('ringed')) {
                    bellRef.current.classList.remove('ringed');
                }
            }, 12900);
            toast.info(<NotificationToastContent notification={obj} />, {
                position: "top-right",
                autoClose: false,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            })
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
        <Dropdown isOpen={dropdownOpened} toggle={toggle} nav direction="down" className="notification-dropdown-menu mt-2 d-block d-md-block">
            <DropdownToggle nav><i ref={bellRef} className={`fa fa-bell-o${unreadCount ? ' marked' : ''}`} style={{ fontSize: '1.6em' }}></i></DropdownToggle>
            {dropdownOpened && <NotificationDropdownMenu />}
        </Dropdown>
    )
})

function NotificationDropdownMenu() {
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
                        <NotificationDropdownItem key={notification.id} notification={notification} />
                    ))}
                </React.Fragment>
        }
        <Link to="/notifications" tabIndex="0" role="button"
            className="dropdown-link dropdown-header text-center border-bottom-0 text-light"
        >
            {t('Lihat Semua')}
            {unreadCount > 0 && ` (${unreadCount > 99 ? '99+' : unreadCount} Belum dibaca)`}
        </Link>
    </DropdownMenu>);
}

const NotificationDropdownItem = memo(({ notification }) => {
    const { markAsRead } = useUserNotification();

    const notificationTypes = {
        'Project': {
            generateUrl: (notification) => notification?.link ?? `/project/${notification.payload.data?.code}`
        },
        'Team': {
            generateUrl: (notification) => notification?.link ?? `/project/${notification.payload.data?.code}/team/${notification.payload.data?.id}`
        },
    }

    const onClick = () => {
        if (notification.readAt === null) {
            markAsRead(notification);
        }
    };

    const LinkComponent = useMemo(() => {
        const url = notificationTypes[notification.payload.subject]?.generateUrl(notification);

        if (url && url.substr(0, 4) === 'http') {
            return (props) => <a href={url} {...props}>{props.children}</a>
        }

        return (props) => <Link to={url} {...props} />
    }, [notification, notificationTypes])

    const onErrorImage = (e) => {
        e.target.src = noImageFound;
        e.target.onerror = null;
    }

    return (
        <LinkComponent role="menuitem" tabIndex="0" className={`dropdown-item d-flex align-items-center border-bottom-0${notification.readAt ? ' dropdown-read' : ' dropdown-unread'}`} onClick={onClick}>
            {notification.payload.data?.image ?
                <img src={notification.payload.data?.image ?? ''} alt="notification-img" onError={(e) => onErrorImage(e)} width="50" height="50" className="mr-2" style={{ objectFit: 'cover', borderRadius: '100%' }} />
                :
                <DefaultProfile init={notification.payload.message.body} size="50px" className="mr-2" />
            }
            <div className="flex-fill small">
                <div className="d-flex">
                    <span className="font-weight-bold mr-3">{notification.payload.message.title}</span>
                    <span className="ml-auto text-muted"><i className="icon-clock mx-0 w-auto text-muted" style={{ fontSize: 10 }}></i> {moment(notification.created_at).fromNow(true)}</span>
                </div>
                <p className="mb-0 text-muted">{notification.payload.message.body}</p>
            </div>
        </LinkComponent>
    );
});

const NotificationToastContent = memo(({ notification }) => {
    const { markAsReadToast } = useUserNotification();

    const notificationTypes = {
        'Project': {
            generateUrl: (notification) => notification?.link ?? `/project/${notification.data?.code}`
        },
        'Team': {
            generateUrl: (notification) => notification?.link ?? `/project/${notification.data?.code}/team/${notification.data?.id}`
        },
    }

    const handleReadClick = () => {
        markAsReadToast(notification);
    };

    const onErrorImage = (e) => {
        e.target.src = noImageFound;
        e.target.onerror = null;
    }

    return (
        <a role="button" target="_blank" rel="noopener noreferrer" onClick={handleReadClick} href={notificationTypes[notification.data.notificationModel].generateUrl(notification)} className="text-decoration-none text-dark">
            <div className={`d-flex align-items-center border-bottom-0`}>
                {notification.data?.image ?
                    <img src={notification.data?.image ?? ''} alt="notification-img" onError={(e) => onErrorImage(e)} width="50" height="50" className="mr-2" style={{ objectFit: 'cover', borderRadius: '100%' }} />
                    :
                    <DefaultProfile init={notification.message.body} size="50px" className="mr-2" />
                }
                <div className="flex-fill small">
                    <div className="d-flex">
                        <span className="font-weight-bold mr-3">{notification.notification.title}</span>
                    </div>
                    <div className="mb-0" style={{ width: '100%' }}>{notification.notification.body}</div>
                </div>
            </div>
        </a>
    );
});

export default NotificationDropdown
