import React, { useState } from "react";
import { Progress } from "reactstrap";
import ReactMarkdown from 'react-markdown';
import moment from '../../../../utils/moment';
import { t, translate } from "react-switch-lang";

function MbtiResult({ result }) {

    const [resultCollapsed, setResultCollapsed] = useState(true);
    const toggleCollapse = () => setResultCollapsed(!resultCollapsed);
    return (<div>
        <div className="row justify-content-center">
            <div className="col-sm-8 col-md-6">
                <div className="alert alert-success text-center">
                    <h4 className="h5 mb-0 font-weight-bold">Hasil Tes Minat dan Bakat</h4>
                    <i>{result.type.toUpperCase()}</i><br />
                    <i>{result.type_description}</i>
                    {result.expired_at && <div className="small text-muted">
                        {t('Anda dapat melakukan asesmen kembali setelah')}<br />
                        <strong>{moment(result.expired_at).format('[Tanggal:] DD MMMM YYYY, [Pukul:] HH:mm')}</strong>
                    </div>}
                </div>
            </div>
        </div>
        <div className="position-relative">
            <div style={{ maxHeight: resultCollapsed ? 300 : '100%', overflow: 'hidden', marginBottom: '1rem' }}>
                <h1 className="h3 mb-2 title-menu-company text-center text-netis-primary"><b><ReactMarkdown source={result.result.predicate} /></b></h1>

                <div className="text-center">
                    <img src={require("../../../../assets/img/16personalities/" + result.type + ".png")} alt="logo" style={{ width: 180 }} className="mb-4" />
                    <h2 className="mb-2 h4 title-menu-company"><b><ReactMarkdown source={result.type.toUpperCase()} /></b></h2>
                    <blockquote className="blockquote-quote" >
                        <h3 className="h4" style={{ lineHeight: '1.5em' }}>
                            <i>
                                <ReactMarkdown source={'"' + result.result.quotes + '"'} />
                            </i>
                        </h3>
                    </blockquote>
                </div>

                <div className="mb-3">
                    <h3>Karakteristik</h3>
                    <ReactMarkdown source={result.result.characterisctics} />
                </div>

                <div className="mb-3">
                    <h3>Fungsi Kognitif</h3>
                    <h4 className="h5"><i>Kemampuan Berpikir</i></h4>
                </div>

                <div className="row">
                    <div className="col-sm-6">
                        <div className="border rounded p-3 h-100">
                            <h5>Fungsi Dominan</h5>
                            <ReactMarkdown source={result.result.dominan.name} />
                            <ReactMarkdown source={result.result.dominan.desc} />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="border rounded p-3 h-100">
                            <h5>Fungsi Sekunder</h5>
                            <ReactMarkdown source={result.result.sekunder.name} />
                            <ReactMarkdown source={result.result.sekunder.desc} />
                        </div>
                    </div>
                </div>

                <div className="mb-3">
                    <h3>Profesi yang Cocok</h3>
                    <ReactMarkdown source={result.result.profession} />
                </div>

                <div className="mb-3">
                    <h3>Partner Alami</h3>
                    <div className="row">
                        <div className="col-sm-6 text-center">
                            <img src={require("../../../../assets/img/16personalities/" + result.result.partner1 + ".png")} alt="logo" style={{ width: 180 }} className="mb-4" />
                            <h4>{result.result.partner1.toUpperCase()}</h4>
                        </div>
                        <div className="col-sm-6 text-center">
                            <img src={require("../../../../assets/img/16personalities/" + result.result.partner2 + ".png")} alt="logo" style={{ width: 180 }} className="mb-4" />
                            <h4>{result.result.partner2.toUpperCase()}</h4>
                        </div>
                    </div>
                </div>

                <div className="mb-3">
                    <h3>Saran Pengembangan</h3>
                    <ReactMarkdown source={result.result.suggestion} />
                </div>
            </div>
            <div className="text-center" style={resultCollapsed ? { bottom: 0, left: 0, right: 0, position: 'absolute', display: 'd-flex', background: 'linear-gradient(to top, white, rgba(255,255,255, 0.8) 80%, transparent)' } : undefined}>
                <button className="btn btn-sm btn-light mx-auto" onClick={toggleCollapse}>
                    {resultCollapsed ? <React.Fragment>Lebih lengkap <i className="fa-sm ml-1 fa fa-chevron-down"></i> </React.Fragment> : <React.Fragment>Lebih Pendek <i className="fa-sm ml-1 fa fa-chevron-up"></i> </React.Fragment>}
                </button>
            </div>
        </div>
        <div className="p-3 rounded mt-3 border">
            <ProgressGroup
                typeA={'Introvert'}
                valueA={result.scores.introvert}
                typeB={'Extrovert'}
                valueB={result.scores.extrovert}
            />
            <ProgressGroup
                typeA={'Sensing'}
                valueA={result.scores.sensing}
                typeB={'Intuition'}
                valueB={result.scores.intuition}
            />
            <ProgressGroup
                typeA={'Feeling'}
                valueA={result.scores.feeling}
                typeB={'Thinking'}
                valueB={result.scores.thinking}
            />
            <ProgressGroup
                typeA={'Judging'}
                valueA={result.scores.judging}
                typeB={'Perceiving'}
                valueB={result.scores.perceiving}
            />
        </div>
    </div>)
}


function ProgressGroup({ typeA, typeB, valueA, valueB }) {
    return <div className="progress-group ">
        <div className="progress-group-prepend">
            <span className={'progress-group-text' + (valueA >= valueB ? ' font-weight-bold' : '')}>
                {typeA}
            </span>
        </div>
        <div className="progress-group-bars">
            <Progress multi>
                <Progress bar value={valueA}>{valueA} %</Progress>
                <Progress bar color="success" value={valueB}>{valueB} %</Progress>
            </Progress>
        </div>
        <div className="progress-group-prepend ml-3 text-right">
            <span className={'progress-group-text' + (valueA <= valueB ? ' font-weight-bold' : '')}>
                {typeB}
            </span>
        </div>
    </div>;
}

export default translate(MbtiResult);