import React, { useCallback, useState } from "react"
import { ListGroup, ListGroupItem, Nav, NavItem, NavLink, TabContent, TabPane, Row, Col } from "reactstrap";
import { translate, t } from "react-switch-lang";
import { useTokenNotification } from '../../../hooks/useTokenNotification';
import LoadingAnimation from "../../../components/LoadingAnimation";
import { Bar } from "react-chartjs-2";
import classnames from "classnames";
import DataNotFound from "../../../components/DataNotFound";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function TokenHistory({ history }) {
    const { data, loading, error } = useTokenNotification([])
    const [activeTab, setActiveTab] = useState("1");
    const toggle = (tab) => {
        if (activeTab !== tab) setActiveTab(tab);
    };
    const [list, setList] = useState([])

    const action = {
        topup: t('melakukan Top Up Token'),
        usage: t('menggunakan 1 token')
    }

    const desc = {
        topup: t('sejumlah'),
        usage: t('untuk fitur')
    }
    const fisiognomi = data.filter(a => a.type === 'usage' && a.usage.tokenType === 'fisiognomi')
    const video = data.filter(a => a.type === 'usage' && a.usage.tokenType === 'video')
    const gesture = data.filter(a => a.type === 'usage' && a.usage.tokenType === 'gesture')
    const palmistry = data.filter(a => a.type === 'usage' && a.usage.tokenType === 'palmistry')
    const bazi = data.filter(a => a.type === 'usage' && a.usage.tokenType === 'bazi')
    const shio = data.filter(a => a.type === 'usage' && a.usage.tokenType === 'shio')
    const zodiac = data.filter(a => a.type === 'usage' && a.usage.tokenType === 'zodiac')
    const disc = data.filter(a => a.type === 'usage' && a.usage.tokenType === 'disc')
    const msdt = data.filter(a => a.type === 'usage' && a.usage.tokenType === 'msdt')
    const spm = data.filter(a => a.type === 'usage' && a.usage.tokenType === 'spm')
    const listTopup = data.filter(a => a.type === 'topup')

    const dataChart = {
        labels: ['DISC', 'MSDT', 'SPM', 'Video', 'Gesture', 'Fisiognomi', 'Palmistry', 'Bazi', 'Shio', 'Zodiac'],
        datasets: [
            {
                label: 'Penggunaan Token',
                backgroundColor: ['rgb(149, 228, 99)', 'rgb(185, 1, 68)', 'rgb(0, 255, 184)', 'rgb(218, 236, 59)', 'rgb(255, 185, 91)', 'rgb(248, 108, 107)', 'rgb(77, 189, 116)', 'rgb(51, 88, 119)', 'rgb(255, 138, 157)', 'rgb(99, 194, 222)'],
                borderColor: ['rgb(149, 228, 99)', 'rgb(185, 1, 68)', 'rgb(0, 255, 184)', 'rgb(218, 236, 59)', 'rgb(255, 185, 91)', 'rgb(248, 108, 107)', 'rgb(77, 189, 116)', 'rgb(51, 88, 119)', 'rgb(255, 138, 157)', 'rgb(99, 194, 222)'],
                borderWidth: 1,
                hoverBackgroundColor: ['rgba(149, 228, 99, 0.5)', 'rgba(185, 1, 68, 0.5)', 'rgba(0, 255, 184, 0.5)', 'rgba(218, 236, 59, 0.5)', 'rgba(255, 185, 91, 0.5)', 'rgba(248, 108, 107, 0.5)', 'rgba(77, 189, 116, 0.5)', 'rgba(51, 88, 119, 0.5)', 'rgba(255, 138, 157, 0.5)', 'rgba(99, 194, 222, 0.5)'],
                hoverBorderColor: ['rgba(149, 228, 99, 0.5)', 'rgba(185, 1, 68, 0.5))', 'rgba(0, 255, 184, 0.5)', 'rgba(218, 236, 59, 0.5)', 'rgba(255, 185, 91, 0.5)', 'rgba(248, 108, 107, 0.5)', 'rgba(77, 189, 116, 0.5)', 'rgba(51, 88, 119, 0.5)', 'rgba(255, 138, 157, 0.5)', 'rgba(99, 194, 222, 0.5)'],
                data: [
                    disc.length, msdt.length, spm.length, video.length, gesture.length, fisiognomi.length, palmistry.length, bazi.length, shio.length, zodiac.length
                ]
            },
        ]
    };

    const changeList = useCallback((keyword) => {
        setList(data.filter(a => a.type === 'usage' && a.usage.tokenType === keyword.toLowerCase()))
        window.scroll({ top: 500, behavior: 'smooth' })
        // const list = document.getElementById("listgroup");
        // list.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    }, [data])

    return (
        <TabContent className="shadow-sm rounded">
            <TabPane>
                <div className="animated fadeIn">
                    <div className="d-flex bd-highlight mb-3">
                        <div className="mr-auto bd-highlight">
                        </div>
                    </div>
                    {loading ?
                        <LoadingAnimation />
                        : error ?
                            <div className="alert alert-danger">
                                <h5>Maaf, Terjadi Galat!</h5>
                                <span>Silahkan muat ulang halaman ini atau laporkan kepada tim IT Support kami</span>
                            </div>
                            :
                            <>
                                <Nav tabs>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: activeTab === "1" })}
                                            onClick={() => {
                                                toggle("1");
                                            }}
                                        >
                                            Penggunaan Token
                                </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: activeTab === "2" })}
                                            onClick={() => {
                                                toggle("2");
                                            }}
                                        >
                                            Top Up
                            </NavLink>
                                    </NavItem>
                                </Nav>
                                <TabContent activeTab={activeTab}>
                                    <TabPane tabId="1">
                                        <Row>
                                            <Col sm="12">
                                                <div style={{ maxHeight: '400px' }}>
                                                    <Bar
                                                        data={dataChart}
                                                        width={100}
                                                        height={400}
                                                        options={{
                                                            maintainAspectRatio: false,
                                                            legend: false,
                                                            tooltips: {
                                                                mode: "label"
                                                            },
                                                            responsive: true,
                                                            responsiveAnimationDuration: 2000,
                                                            hover: {
                                                                intersect: true,
                                                                mode: "point"
                                                            },
                                                            onHover: (event, chartElement) => {
                                                                event.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
                                                            }
                                                        }}
                                                        onElementsClick={e => changeList(e[0]?._model.label ?? '')}
                                                    />
                                                </div>
                                                <ListGroup id="listgroup" className="mt-4">
                                                    {list.length === 0 ? <DataNotFound />
                                                        :
                                                        <>
                                                            <h3 className="mb-3">Daftar penggunaan token pada fitur {list[0]?.usage?.tokenType}</h3>
                                                            {list?.map((data, idx) => {
                                                                return (
                                                                    <ListGroupItem className="p-3" key={idx}>
                                                                        <Row>
                                                                            <Col xs="12">
                                                                                <i className="fa fa-lg fa-ticket text-info mr-1" />Penggunaan Fitur : <span className="text-capitalize">{data?.usage?.tokenType}</span>
                                                                            </Col>
                                                                            <Col md="9">
                                                                                <div className="my-2">
                                                                                    <FontAwesomeIcon icon="coins" className="mx-auto" style={{ color: "#d6ab1d" }} />
                                                                                    <span className="text-primary ml-2 mr-1">
                                                                                        <b>{data?.causer?.name}</b>
                                                                                    </span>
                                                                                    {action[data?.type]} {desc[data?.type]}
                                                                                    <span className="text-capitalize ml-1">
                                                                                        {data?.usage?.tokenType}
                                                                                    </span> pada pelamar
                                                                                    <span className="text-capitalize ml-1">
                                                                                        {data?.usage?.identifier}
                                                                                    </span>
                                                                                </div>
                                                                            </Col>
                                                                            <Col md="3">
                                                                                <div className="text-muted float-right d-block d-md-inline">{data?.date}</div>
                                                                            </Col>
                                                                        </Row>
                                                                    </ListGroupItem>
                                                                )
                                                            })}
                                                        </>
                                                    }
                                                </ListGroup>
                                            </Col>
                                        </Row>
                                    </TabPane>
                                    <TabPane tabId="2">
                                        <Row>
                                            <Col sm="12">
                                                <ListGroup>
                                                    {listTopup.length === 0 ? <DataNotFound /> :
                                                        listTopup?.map((data, idx) => (
                                                            data.causer.id === 0 ?
                                                                data.nominal === 0 ?
                                                                    <>
                                                                        <ListGroupItem className="p-3" key={idx}>
                                                                            <Row>
                                                                                <Col md="9">
                                                                                    <div className="ml-2">
                                                                                        <FontAwesomeIcon icon="calendar-times" className="mx-auto" style={{ color: "#e0474d" }} /> Masa berlaku token anda telah habis
                                                                                    </div>
                                                                                </Col>
                                                                                <Col md="3">
                                                                                    <div className="text-muted float-right d-block d-md-inline">{data?.date}</div>
                                                                                </Col>
                                                                            </Row>
                                                                        </ListGroupItem>
                                                                    </>
                                                                    :
                                                                    <>
                                                                        <ListGroupItem className="p-3" key={idx}>
                                                                            <Row>
                                                                                <Col md="9">
                                                                                    <div className="ml-2">
                                                                                        <FontAwesomeIcon icon="plus-square" className="mx-auto" style={{ color: "#e0474d" }} /> Anda mendapatkan gratis {data.nominal} token
                                                                                </div>
                                                                                </Col>
                                                                                <Col md="3">
                                                                                    <div className="text-muted float-right d-block d-md-inline">{data?.date}</div>
                                                                                </Col>
                                                                            </Row>
                                                                        </ListGroupItem>
                                                                    </>
                                                                :
                                                                <>
                                                                    <ListGroupItem className="p-3" key={idx}>
                                                                        <Row>
                                                                            <Col md="9">
                                                                                <div className="ml-2">
                                                                                    <FontAwesomeIcon icon="plus-square" className="mx-auto" style={{ color: "#47e0af" }} />
                                                                                    <span className="text-primary ml-2 mr-1">
                                                                                        <b>{data?.causer?.name}</b>
                                                                                    </span>
                                                                                    {action[data?.type]} {desc[data?.type]} <span className="mr-1 text-primary">{data?.nominal}</span>
                                                                                </div>
                                                                            </Col>
                                                                            <Col md="3">
                                                                                <div className="text-muted float-right d-block d-md-inline">{data?.date}</div>
                                                                            </Col>
                                                                        </Row>
                                                                    </ListGroupItem>
                                                                </>
                                                        ))}
                                                </ListGroup>
                                            </Col>
                                        </Row>
                                    </TabPane>
                                </TabContent>
                            </>
                    }
                </div>
            </TabPane>
        </TabContent>
    )
}

export default translate(TokenHistory);