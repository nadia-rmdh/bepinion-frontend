import React, { useMemo, memo, useState } from 'react'
import { DropdownItem, DropdownMenu, DropdownToggle, Dropdown } from 'reactstrap'
import { useTokenNotification } from '../../../hooks/useTokenNotification';
import { Link } from 'react-router-dom';
import { translate, t } from "react-switch-lang"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TokenIcon = memo(() => {
    const { data, loading, error } = useTokenNotification([])
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const toggle = () => setDropdownOpen(!dropdownOpen);

    const notifications = useMemo(() => data.slice(0, 4), [data]);

    return (
        <Dropdown nav direction="down" isOpen={dropdownOpen} toggle={toggle} className="tour-history-token">
            <DropdownToggle nav style={{ minWidth: 100, color: "#305574" }} className="no-hover">
                <i className={`fa fa-history mr-1`} /> <b>{t('riwayat')}</b>
            </DropdownToggle>
            <DropdownMenu right style={{ zIndex: 999 }}>
                {error ? <DropdownItem><i className="fa fa-warning text-danger"></i> {t('Terjadi Kesalahan!')}</DropdownItem> :
                    loading ? <DropdownItem>Loading...</DropdownItem> :
                        data.length === 0 ? <DropdownItem>Belum ada riwayat penggunaan atau Top-Up Token</DropdownItem> :
                            <>
                                <DropdownItem header className="d-flex align-items-center border-bottom-0">
                                    <strong>Pemberitahuan</strong>
                                </DropdownItem>
                                {notifications.map(notification => (
                                    <DropdownItem key={notification.id} className="text-capitalize d-flex justify-content-between">
                                        <div role="menuitem" tabIndex="0" className={`dropdown-item d-flex align-items-center border-bottom-0`}>
                                            {notification.type === "usage" ?
                                                <>
                                                    <div className="mr-4 font-xl dropdown-token">
                                                        <FontAwesomeIcon icon="coins" className="mx-auto" style={{ color: "#ffd601" }} />
                                                    </div>
                                                    <div className="flex-fill small">
                                                        <div className="d-flex">
                                                            <div>
                                                                <span className="font-weight-bold mr-3">{notification.nominal} token digunakan untuk fitur {notification.usage.tokenType}</span><br />
                                                                <span className="ml-auto text-muted"><i className="icon-clock mx-0 w-auto text-muted" style={{ fontSize: 10 }}></i> {notification.date}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                                :
                                                <>
                                                    {notification.causer.id !== 0 ?
                                                        <>
                                                            <div className="mr-4 font-xl dropdown-token">
                                                                <FontAwesomeIcon icon="plus-circle" className="mx-auto" style={{ color: "#47e0af" }} />
                                                            </div>
                                                            <div className="flex-fill small">
                                                                <div className="d-flex">
                                                                    <div>
                                                                        <span className="font-weight-bold mr-3">{notification.nominal} token telah ditambahkan</span><br />
                                                                        <span className="ml-auto text-muted"><i className="icon-clock mx-0 w-auto text-muted" style={{ fontSize: 10 }}></i> {notification.date}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>
                                                        :
                                                        notification.nominal === 0 ?
                                                            <>
                                                                <div className="mr-4 font-xl dropdown-token">
                                                                    <FontAwesomeIcon icon="calendar-times" className="mx-auto" style={{ color: "#e0474d" }} />
                                                                </div>
                                                                <div className="flex-fill small">
                                                                    <div className="d-flex">
                                                                        <div>
                                                                            <span className="font-weight-bold mr-3">Masa berlaku token anda telah habis</span><br />
                                                                            <span className="ml-auto text-muted"><i className="icon-clock mx-0 w-auto text-muted" style={{ fontSize: 10 }}></i> {notification.date}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </>
                                                            :
                                                            <>
                                                                <div className="mr-4 font-xl dropdown-token">
                                                                    <FontAwesomeIcon icon="plus-circle" className="mx-auto" style={{ color: "#47e0af" }} />
                                                                </div>
                                                                <div className="flex-fill small">
                                                                    <div className="d-flex">
                                                                        <div>
                                                                            <span className="font-weight-bold mr-3">Anda mendapatkan gratis {notification.nominal} token </span><br />
                                                                            <span className="ml-auto text-muted"><i className="icon-clock mx-0 w-auto text-muted" style={{ fontSize: 10 }}></i> {notification.date}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </>
                                                    }
                                                </>
                                            }
                                        </div>
                                    </DropdownItem>
                                ))}
                            </>
                }
                <Link to="/tokenhistory" onClick={() => toggle()} className="text-center dropdown-header">{t('Lihat Semua')}</Link>
            </DropdownMenu>
        </Dropdown >
    )
})

export default translate(TokenIcon)