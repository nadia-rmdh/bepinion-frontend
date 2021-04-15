import React, { useState } from 'react'
import { Row, Col, ListGroupItem, ListGroup, ListGroupItemHeading, Collapse, ListGroupItemText } from 'reactstrap'
import { Line } from "react-chartjs-2";
import ReactMarkdown from "react-markdown";

const label = ['D', 'I', 'S', 'C'];
const title = {
    most: "Mask, Public Self",
    least: "Core, Private Self",
    changes: "Mirror, Perceived Self"
}

const description = {
    most: "Menunjukkan perilaku yang diharapkan oleh orang lain",
    least: "Menunjukkan respon secara instingtif menghadapi tekanan",
    changes: "Menunjukkan gambaran dan identitas diri"
}

function DiscResultAdmin({ result, hideDescription = false }) {
    const [open, setOpen] = useState('karakter')
    return (
        <div style={{ marginBottom: "5em" }}>
            <div className="row justify-content-center mb-2">
                <div className="col-sm-8 col-md-6">
                    {
                        !hideDescription && (
                            <div className="alert alert-success text-center">
                                <h4>HASIL TES KEPRIBADIAN</h4>
                            </div>
                        )
                    }
                </div>
            </div>

            <Row className="my-2">
                {result.scores &&
                    Object.keys(result.scores).map((category, idx) => {
                        const desc = result?.type_description ? result?.type_description[category][0] : null;
                        return (
                            <Col md="4" lg="4" sm="12" key={idx}>
                                <div className="text-center mb-3">
                                    <h5>{title[category]}</h5>
                                    <small><i>{description[category]}</i></small>
                                </div>
                                <br />
                                <Line
                                    data={{
                                        labels: label,
                                        datasets: [{
                                            label: "",
                                            fill: false,
                                            lineTension: 0.1,
                                            backgroundColor: 'rgba(75,192,192,0.4)',
                                            borderColor: 'rgba(75,192,192,1)',
                                            borderCapStyle: 'butt',
                                            borderDash: [],
                                            borderDashOffset: 0.0,
                                            borderJoinStyle: 'miter',
                                            pointBorderColor: 'rgba(75,192,192,1)',
                                            pointBackgroundColor: '#fff',
                                            pointBorderWidth: 1,
                                            pointHoverRadius: 5,
                                            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                                            pointHoverBorderColor: 'rgba(220,220,220,1)',
                                            pointHoverBorderWidth: 2,
                                            pointRadius: 1,
                                            pointHitRadius: 10,
                                            data: label.map((scores) => {
                                                return result.scores[category][scores];
                                            })
                                        }]
                                    }}
                                    options={{
                                        // title: {
                                        //     display: true,
                                        //     // text: category.toUpperCase()
                                        //     text: description[category]
                                        // },
                                        scales: {
                                            xAxes: [{
                                                /* For changing color of x-axis coordinates */
                                                ticks: {
                                                    // fontSize: 18,
                                                    // padding: 0,
                                                    fontColor: '#000',
                                                    fontStyle: 'bold'
                                                },
                                            }],
                                            yAxes: [{
                                                ticks: {
                                                    min: -8,
                                                    max: 8
                                                },
                                                gridLines: {
                                                    zeroLineWidth: 2,
                                                    zeroLineColor: "#555"
                                                }
                                            }]
                                        },
                                        legend: {
                                            display: false
                                        }
                                    }}
                                    height={350}
                                />
                                <br />
                                {
                                    !hideDescription && (
                                        <DiscResultDesription category={category} desc={desc} open={open} setOpen={(e) => setOpen(e)} />
                                    )
                                }
                            </Col>
                        )
                    })
                }
            </Row>
        </div>
    )
}

function DiscResultDesription({ category, desc, open, setOpen }) {

    const collapseKarakter = open === 'karakter'
    const collapseKekuatan = open === 'kekuatan'
    const collapsePerkembangan = open === 'perkembangan'
    const collapseNilai = open === 'nilai'
    const collapseTekanan = open === 'tekanan'
    const collapseLingkungan = open === 'lingkungan'

    const changeOpen = (item) => {
        if (item === open) {
            setOpen('')
        } else {
            setOpen(item)
        }
    }
    return (
        <ListGroup className="my-2">
            <ListGroupItem>
                <ListGroupItemHeading className="d-flex justify-content-between mb-0" id={category + '_karakteristik'}
                    onClick={() => {
                        changeOpen('karakter')
                    }}
                    style={{ cursor: "pointer" }}
                >
                    <strong>Karakteristik</strong>
                    {collapseKarakter ?
                        <i className="mt1 fa-sm fa fa-chevron-up" />
                        :
                        <i className="mt1 fa-sm fa fa-chevron-down" />
                    }
                </ListGroupItemHeading>
                <Collapse isOpen={collapseKarakter}>
                    <ListGroupItemText className="mt-3">
                        <hr className="hr-main ml-0" />
                        <ReactMarkdown source={desc.karakteristik} />
                    </ListGroupItemText>
                </Collapse>
            </ListGroupItem>

            <ListGroupItem>
                <ListGroupItemHeading className="d-flex justify-content-between mb-0" id={category + '_kekuatan'}
                    onClick={() => {
                        changeOpen('kekuatan')
                    }}
                    style={{ cursor: "pointer" }}
                >
                    <strong>Kekuatan</strong>
                    {collapseKekuatan ?
                        <i className="mt1 fa-sm fa fa-chevron-up" />
                        :
                        <i className="mt1 fa-sm fa fa-chevron-down" />
                    }
                </ListGroupItemHeading>
                <Collapse isOpen={collapseKekuatan}>
                    <ListGroupItemText className="mt-3">
                        <hr className="hr-main ml-0" />
                        <ReactMarkdown source={desc.kekuatan} />
                    </ListGroupItemText>
                </Collapse>
            </ListGroupItem>

            <ListGroupItem>
                <ListGroupItemHeading className="d-flex justify-content-between mb-0" id={category + '_area_perkembangan'}
                    onClick={() => {
                        changeOpen('perkembangan')
                    }}
                    style={{ cursor: "pointer" }}
                >
                    <strong>Area Perkembangan</strong>
                    {collapsePerkembangan ?
                        <i className="mt1 fa-sm fa fa-chevron-up" />
                        :
                        <i className="mt1 fa-sm fa fa-chevron-down" />
                    }
                </ListGroupItemHeading>
                <Collapse isOpen={collapsePerkembangan}>
                    <ListGroupItemText className="mt-3">
                        <hr className="hr-main ml-0" />
                        <ReactMarkdown source={desc.area_perkembangan} />
                    </ListGroupItemText>
                </Collapse>
            </ListGroupItem>

            <ListGroupItem>
                <ListGroupItemHeading className="d-flex justify-content-between mb-0" id={category + '_nilai_kelompok'}
                    onClick={() => {
                        changeOpen('nilai')
                    }}
                    style={{ cursor: "pointer" }}
                >
                    <strong>Nilai bagi Kelompok</strong>
                    {collapseNilai ?
                        <i className="mt1 fa-sm fa fa-chevron-up" />
                        :
                        <i className="mt1 fa-sm fa fa-chevron-down" />
                    }

                </ListGroupItemHeading>
                <Collapse isOpen={collapseNilai}>
                    <ListGroupItemText className="mt-3">
                        <hr className="hr-main ml-0" />
                        <ReactMarkdown source={desc.nilai_kelompok} />
                    </ListGroupItemText>
                </Collapse>
            </ListGroupItem>

            <ListGroupItem>
                <ListGroupItemHeading className="d-flex justify-content-between mb-0" id={category + '_kecenderungan_bawah_tekanan'}
                    onClick={() => {
                        changeOpen('tekanan')
                    }}
                    style={{ cursor: "pointer" }}
                >
                    <strong>Kecenderungan di Bawah Tekanan</strong>
                    {collapseTekanan ?
                        <i className="mt1 fa-sm fa fa-chevron-up" />
                        :
                        <i className="mt1 fa-sm fa fa-chevron-down" />
                    }

                </ListGroupItemHeading>
                <Collapse isOpen={collapseTekanan}>
                    <ListGroupItemText className="mt-3">
                        <hr className="hr-main ml-0" />
                        <ReactMarkdown source={desc.kecenderungan_bawah_tekanan} />
                    </ListGroupItemText>
                </Collapse>
            </ListGroupItem>

            <ListGroupItem>
                <ListGroupItemHeading className="d-flex justify-content-between mb-0" id={category + '_lingkungan'}
                    onClick={() => {
                        changeOpen('lingkungan')
                    }}
                    style={{ cursor: "pointer" }}
                >
                    <strong>Lingkungan yang Ideal</strong>
                    {collapseLingkungan ?
                        <i className="mt1 fa-sm fa fa-chevron-up" />
                        :
                        <i className="mt1 fa-sm fa fa-chevron-down" />
                    }
                </ListGroupItemHeading>
                <Collapse isOpen={collapseLingkungan}>
                    <ListGroupItemText className="mt-3">
                        <hr className="hr-main ml-0" />
                        <ReactMarkdown source={desc.lingkungan_ideal} />
                    </ListGroupItemText>
                </Collapse>
            </ListGroupItem>
        </ListGroup>
    )
}
export default DiscResultAdmin
