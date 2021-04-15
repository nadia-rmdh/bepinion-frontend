import React from 'react';
import DataNotFound from '../../../components/DataNotFound';
import LoadingAnimation from '../../../components/LoadingAnimation';
import { Nav, NavItem, NavLink, TabContent, TabPane, Badge } from 'reactstrap';
import Card from 'reactstrap/lib/Card';
import CardHeader from 'reactstrap/lib/CardHeader';
import CardBody from 'reactstrap/lib/CardBody';
import moment from "moment";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { convertNumber } from '../../../utils/formatter';
import { useInvoice } from '../../../hooks/useInvoice';
import { Link, useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import { useBalance } from '../../../hooks/useBalance';

function HistoryInvoices({ history }) {
    const { data, loading } = useInvoice([])
    const { data: token } = useBalance();

    const location = useLocation();

    const selectedTab = location.hash ? location.hash.substring(1) : 'pendingData';

    const pendingData = useMemo(() => {
        const pending = data?.filter((data) => {
            return data.status === 'pending'
        })
        return pending
    }, [data]);

    const paidData = useMemo(() => {
        const paid = data?.filter((data) => {
            return data.status === 'paid'
        })
        return paid
    }, [data]);

    const expiredData = useMemo(() => {
        const expired = data?.filter((data) => {
            return data.status === 'expired'
        })
        return expired
    }, [data]);

    if (loading) {
        return <LoadingAnimation />;
    }
    else if (data.length <= 0) {
        return <DataNotFound />
    }

    return (
        <TabContent className="shadow-sm rounded">
            <TabPane>
                <div>
                    <div className="d-flex ml-auto bd-highlight">
                        <div className="mt-3 pl-1 text-right">
                            <i className="fa fa-exclamation-triangle mr-1 text-warning" />
                            <i>
                                Masa berlaku Token Anda sampai<br />
                                {moment(token.expired_at).locale("ID").format("DD MMMM YYYY LT")}
                            </i>
                        </div>
                    </div>
                    <Nav tabs>
                        <NavItem>
                            <NavLink tag={Link} className="pt-2/5" active={selectedTab === 'pendingData'} replace to={{ hash: "#pendingData" }}>
                                Belum Bayar {pendingData.length !== 0 ? <Badge color="danger" pill className="ml-2">{pendingData.length}</Badge> : null}
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} className="pt-2/5" active={selectedTab === 'paidData'} replace to={{ hash: "#paidData" }}>
                                Terbayar
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} className="pt-2/5" active={selectedTab === 'expiredData'} replace to={{ hash: "#expiredData" }}>
                                Kadaluarsa
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={selectedTab}>
                        <TabPane tabId="pendingData">
                            {pendingData.length !== 0 ? <InvoicesList data={pendingData} /> : <DataNotFound />}
                        </TabPane>
                        <TabPane tabId="paidData">
                            {paidData.length !== 0 ? <InvoicesList data={paidData} /> : <DataNotFound />}
                        </TabPane>
                        <TabPane tabId="expiredData">
                            {expiredData.length !== 0 ? <InvoicesList data={expiredData} /> : <DataNotFound />}
                        </TabPane>
                    </TabContent>
                </div>
            </TabPane>
        </TabContent>
    )
}

const InvoicesList = ({ data }) => {
    const paket = {
        500: "Business Package",
        1000: "Pro Package"
    }
    return (
        data && data?.map((item) => {
            return (
                <div key={item.id} className="card-link-invoice" onClick={() => window.open(item.url)}>
                    <Card style={{ borderRadius: "12px" }}>
                        <CardHeader style={{ backgroundColor: "#fff" }} className="d-flex justify-content-between">
                            <div>{moment(item.status === 'pending' ? item.createdAt : item.status === 'expired' ? item.expiredAt : item.paidAt).locale("ID").format("DD MMMM YYYY LT")}</div>
                            <div>
                                {item.status === 'pending' ?
                                    <small className="text-muted">
                                        Bayar sebelum {moment(item.expiredAt).locale("ID").format("DD MMMM YYYY LT")}</small>
                                    : null
                                }
                            </div>
                        </CardHeader>
                        <CardBody>
                            <div className="d-flex align-items-center">
                                <div className="mr-4 font-xl dropdown-token">
                                    <FontAwesomeIcon icon="coins" className="mx-auto" style={{ color: "rgba(243, 216, 50, 1)" }} />
                                </div>
                                <div className="flex-fill small">
                                    <div className="d-flex">
                                        <div>
                                            <span style={{ fontSize: 15 }} className="font-weight-bold mr-3 text-netis-primary">{paket[item.balance]}</span><br />
                                            <span style={{ fontSize: 15 }} className="ml-auto"><FontAwesomeIcon icon="coins" color="#f3d832" className="mr-1" /> {item.balance} token</span><br />
                                            <span style={{ fontSize: 14 }} className="mr-auto"><FontAwesomeIcon icon="money-bill-wave" color="#137500" className="mr-1" /> {convertNumber(item.amount, '$ 0,0[.]00')}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            );
        })
    )
}

export default HistoryInvoices;