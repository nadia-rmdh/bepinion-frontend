import React, { useEffect, useRef, useState } from "react";
import moment from '../../../../utils/moment';
import { Radar } from "react-chartjs-2";
import { Button, Col, Collapse, Row, Table } from "reactstrap";
import { t, translate } from "react-switch-lang";
import "./papikostickresult.css";
import Star from "../../../../components/Star.js";
import { connect } from "react-redux";
import { groupingLabel, colorsByIndex } from "./labels";
import 'chartjs-plugin-datalabels';

function PapikostickResult({ result, isAdminPanel, collapse }) {
    const data = {
        labels: "FWNGALPITVXSBORDCZEK".split(""),
        datasets: [
            {
                label: "RESULT",
                borderWidth: 1,
                pointRadius: 2,
                backgroundColor: "rgba(0,0,0,0.3)",
                borderColor: (option) => {
                    return colorsByIndex[option.dataIndex];
                },
                pointBackgroundColor: (option) => colorsByIndex[option.dataIndex],
                pointBorderColor: (option) => colorsByIndex[option.dataIndex],
                data: "FWNGALPITVXSBORDCZEK".split("").map((huruf) => {
                    if (huruf === "Z") {
                        return 9 - result.scores[huruf];
                    } else if (huruf === "K") {
                        return 9 - result.scores[huruf];
                    } else return result.scores[huruf];
                }),
            },
        ],
    };

    const options = {
        plugins: {
            datalabels: {
                display: isAdminPanel ? true : false,
                backgroundColor: (option) => colorsByIndex[option.dataIndex],
                color: "#fff",
                font: {
                    weight: "bold",
                    size: 11
                },
                borderColor: "#fff",
                borderWidth: 2,
                padding: {
                    top: 6,
                    bottom: 5,
                    left: 8,
                    right: 8
                },
                borderRadius: 999
            }
        },
        tooltips: {
            callbacks: {
                title: (tooltipItem, data) => {
                    return (
                        groupingLabel[data.labels[tooltipItem[0].index]].category +
                        " (" +
                        data.labels[tooltipItem[0].index] +
                        ")"
                    );
                },
                label: (tooltipItem, data) => {
                    if (data.labels[tooltipItem.index] === "Z") {
                        return 9 - tooltipItem.value;
                    } else if (data.labels[tooltipItem.index] === "K") {
                        return 9 - tooltipItem.value;
                    } else return tooltipItem.value;
                    // return parseInt(tooltipItem.value)
                },
            },
        },
        legend: {
            display: false,
        },
        title: {
            display: false,
            // text: 'Hasil PAPIKostick'
        },
        scale: {
            gridLines: {
                display: false,
                circular: true,
            },
            angleLines: {
                // display: false,
            },
            ticks: {
                display: false,
                max: 9,
                min: 0,
                stepSize: 1,
                beginAtZero: true,
                showLabelBackdrop: true,
            },
            pointLabels: {
                display: false,
                fontStyle: "bold",
                fontSize: 12,
                fontColor: Object.keys(groupingLabel).map(
                    (label) => groupingLabel[label].color
                ),
            },
        },
    };

    const chartRef = useRef(null);
    const [backgroundSize, setBackgroundSize] = useState(null);

    const updateBackgroundSize = React.useCallback(() => {
        if (chartRef.current) {
            const chartHeight = chartRef?.current?.chartInstance?.height;
            if (chartHeight) {
                setBackgroundSize(chartHeight + chartHeight * (isAdminPanel ? 0.25 : 0.2));
            } else {
                setBackgroundSize(null);
            }
        }
    }, [chartRef, isAdminPanel]);

    useEffect(() => {
        updateBackgroundSize();
        window.addEventListener("resize", updateBackgroundSize);
        return () => {
            window.removeEventListener("resize", updateBackgroundSize);
        };
    }, [updateBackgroundSize]);

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <>
            <div className="row justify-content-center">
                <div className="col-sm-8 col-md-6 mb-4">
                    {collapse ? '' :
                        <div className="alert alert-success text-center">
                            <h4 className="h5 mb-0 font-weight-bold">
                                {isAdminPanel
                                    ? t("Hasil Tes PAPI Kostick-admin")
                                    : t("Hasil Tes PAPI Kostick-user")}
                            </h4>
                            <i>{result.type_description}</i>
                            {result.expired_at && (
                                <div className="small text-muted">
                                    {t("Anda dapat melakukan asesmen kembali setelah")}
                                    <br />
                                    <strong>
                                        {moment(result.expired_at).format(
                                            "[Tanggal:] DD MMMM YYYY, [Pukul:] HH:mm"
                                        )}
                                    </strong>
                                </div>
                            )}
                        </div>
                    }
                </div>
            </div>

            <div
                className={`mx-auto ${isAdminPanel ? "grafik-papikostick-admin" : "grafik-papikostick-user"
                    }`}
                style={{
                    backgroundSize: backgroundSize ?? "auto 95%",
                }}
            >
                <Radar
                    data={data}
                    options={options}
                    width={100}
                    height={isAdminPanel ? 70 : 75}
                    ref={chartRef}
                />
            </div>
            { collapse ? (
                <>
                    <Row className="md-company-header mb-3 mt-5">
                        <Col className="d-flex flex-column justify-content-center align-items-center">
                            <Button color="netis-color" onClick={toggle} style={{ marginBottom: '1rem' }}>Lihat Selengkapnya <i className="fa-sm ml-1 fa fa-chevron-down"></i></Button>
                            <Collapse isOpen={isOpen}>
                                <div className="table my-4 mx-3">
                                    {result.result && <TablePapikostick result={result} isAdminPanel={isAdminPanel} />}
                                </div>
                            </Collapse>
                        </Col>
                    </Row>
                </>
            ) :
                result.result && <TablePapikostick result={result} isAdminPanel={isAdminPanel} />
            }
        </>
    );
}

function titleColor(resultTitle) {
    switch (resultTitle) {
        case "Followership":
            return "#e53935";
        case "Work Direction":
            return "#8e24aa";
        case "Leadership":
            return "#3949ab";
        case "Activity":
            return "#039be5";
        case "Social Nature":
            return "#00897b";
        case "Work Style":
            return "#7cb342";
        case "Temperament":
            return "#fb8c00";
        default:
            return "#FFFFFF";
    }
}

const template = {
    Followership: ["F", "W"],
    "Work Direction": ["N", "G", "A"],
    Leadership: ["L", "P", "I"],
    Activity: ["T", "V"],
    "Social Nature": ["X", "S", "B", "O"],
    "Work Style": ["C", "D", "R"],
    Temperament: ["Z", "E", "K"],
};

function TablePapikostick({ result, isAdminPanel }) {
    const groupingDesc = {
        F: t("Keb Membantu Atasan"),
        W: t("Keb Mengikuti Aturan dan Pengawasan"),
        N: t("Keb dalam Menyelesaikan Tugas (Kemandirian)"),
        G: t("Peran Pekerja Keras"),
        A: t("Keb dalam Berprestasi"),
        L: t("Peran Kepemimpinan"),
        P: t("Keb Mengatur Orang Lain"),
        I: t("Peran Dalam Membuat Keputusan"),
        T: t("Peran Dalam Kesibukan Kerja"),
        V: t("Peran Dalam Semangat Kerja"),
        X: t("Keb untuk Diperhatikan"),
        S: t("Peran Dalam Hubungan Sosial"),
        B: t("Keb Diterima dalam Kelompok"),
        O: t("Keb Kedekatan dan Kasih Sayang"),
        C: t("Peran Dalam Mengatur"),
        D: t("Peran Bekerja dengan Hal-hal Rinci"),
        R: t("Peran Penalaran Teoritis"),
        Z: t("Keb untuk Berubah"),
        E: t("Peran Dalam Pengendalian Emosi"),
        K: t("Keb untuk Agresif"),
    };

    const group =
        result.result &&
        Object.keys(result.result).map((category) => {
            const item =
                result.result &&
                template[category].map((code, idx) => ({
                    code: code,
                    scores: result.scores[code],
                    description: result.result[category][idx],
                }));

            return {
                kategory: category,
                items: item,
            };
        });

    if (isAdminPanel) {
        return (
            <Table bordered responsive>
                <thead>
                    <tr className="border-bottom">
                        <th className="text-center w-10">{t("Kategori")}</th>
                        <th className="text-center w-25">{t("Aspek")}</th>
                        <th className="text-center w-15">{t("Nilai")}</th>
                        <th className="text-center w-50">{t("deskripsi")}</th>
                    </tr>
                </thead>
                <tbody>
                    {group &&
                        group.map((objKategori) => {
                            return (
                                objKategori &&
                                objKategori.items.map((objItem, idx) => (
                                    <tr>
                                        {idx === 0 && (
                                            <td
                                                rowSpan={objKategori.items.length}
                                                style={{
                                                    backgroundColor: titleColor(objKategori.kategory),
                                                    color: "#FFFFFF",
                                                }}
                                            >
                                                {objKategori.kategory}
                                            </td>
                                        )}
                                        <td>
                                            {objItem.code} : {groupingDesc[objItem.code]}
                                        </td>
                                        <td>
                                            {objItem.code === "Z" ? <Star value={(10 - objItem.scores) / 2} />
                                                : objItem.code === "K" ? <Star value={(10 - objItem.scores) / 2} />
                                                    : <Star value={(objItem.scores + 1) / 2} />
                                            }
                                            {/* <Star value={(objItem.scores + 1) / 2} /> */}
                                            ({objItem.scores})
                                        </td>
                                        <td>{objItem.description}</td>
                                    </tr>
                                ))
                            );
                        })}
                </tbody>
            </Table>
        );
    } else {
        return (
            <Table
                bordered
                className="table table-bordered table-black"
                style={{ borderColor: "#000000" }}
            >
                <thead>
                    <tr className="border-bottom">
                        <th className="text-center w-15">{t("Kategori")}</th>
                        <th className="text-center w-25">{t("Nilai")}</th>
                        <th className="text-center w-60">{t("deskripsi")}</th>
                    </tr>
                </thead>
                <tbody>
                    {group &&
                        group.map((objKategori) => {
                            return (
                                objKategori &&
                                objKategori.items.map((objItem, idx) => (
                                    <tr>
                                        {idx === 0 && (
                                            <td
                                                rowSpan={objKategori.items.length}
                                                style={{
                                                    backgroundColor: titleColor(objKategori.kategory),
                                                    color: "#FFFFFF",
                                                }}
                                            >
                                                {objKategori.kategory}
                                            </td>
                                        )}
                                        <td>
                                            {groupingDesc[objItem.code]}
                                            <br />
                                            {objItem.code === "Z" ? <Star value={(10 - objItem.scores) / 2} />
                                                : objItem.code === "K" ? <Star value={(10 - objItem.scores) / 2} />
                                                    : <Star value={(objItem.scores + 1) / 2} />
                                            }
                                            {/* <Star value={(objItem.scores + 1) / 2} /> */}
                                        </td>
                                        <td>{objItem.description}</td>
                                    </tr>
                                ))
                            );
                        })}
                </tbody>
            </Table>
        );
    }
}

const mapStateToProps = ({ isAdminPanel }) => ({ isAdminPanel });
export default connect(mapStateToProps)(translate(PapikostickResult));
