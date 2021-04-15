import React, { useState } from "react";
import {translate, t } from 'react-switch-lang';
import Question from "./Question";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Progress } from "reactstrap";
import { useEffect } from "react";
import request from "../../../../utils/request";
import LoadingAnimation from "../../../../components/LoadingAnimation";
import DiscResult from "./DiscResult";
// import DiscResultAdmin from "./DiscResultAdmin";
import { Prompt } from "react-router-dom";

function arrayChunk(array, size = 10) {
    return Array(Math.ceil(array.length / size))
        .fill()
        .map((_, index) => index * size)
        .map(begin => array.slice(begin, begin + size));
}

function AssesmentDisc(props) {
    // const {isAdminPanel} = props;
    const [source, setSource] = useState([])
    const [loading, setLoading] = useState(true)

    const [answers, setAnswers] = useState({});

    const [page, setPage] = useState(0);
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState(null);
    const [hint, setHint] = useState(false)
    const [indicator, setIndicator] = useState(0);

    useEffect(() => {
        request.get('v1/assessment/test/disc').then(res => {
            if (res.data?.data) {
                const source = res.data.data;
                setSource(source);
                setLoading(false);
                setHint(true)
            }
        })
        .catch(err => {
            if (err.response?.status === 422 && err.response.data.data.error_type === 'HAS_DONE_TEST') {
                const resultExpiredDateTime = new Date(err.response.data.data.result_expired_at);
                request.get('v1/assessment/test/disc/result').then(res => {
                    const resultResponse = res.data.data;
                    resultResponse['expired_at'] = resultExpiredDateTime;
                    setResult(resultResponse);
                    setLoading(false);
                })
            } else {
                setLoading(false)
                return Promise.reject(err);
            }
        })
    }, []);
    useEffect(() => {
        let arr = []
        // eslint-disable-next-line
        const tempContain = Object.values(answers).map((item) =>
            Object.values(item).map((value) => arr.push(value))
        )
        let filtered = arr.filter((a) => {
            return a !== undefined;
        });
        setIndicator(
            Math.round((filtered.length / 2 / source.length) * 100),
        );
    }, [answers, source.length])

    if (loading || analyzing) {
        return <LoadingAnimation/>
    }

    if (result) {
        return <DiscResult result={result} />
    }

    function onAnswered(code, answer) {
        setAnswers({...answers, [code]: answer});
        // {q1: {most: 'a1'}}
    }

    const groupedQuestions = arrayChunk(source, 4);
    const pagesLength = groupedQuestions.length;
    // const keyAnswers = Object.keys(answers);
    const canGoToNext =
        // groupedQuestions[page].map(q => q.code).every(code => Object.keys(answers).indexOf(code) !== -1)
        groupedQuestions[page].length === 4
        && groupedQuestions[page].every((qcode) => answers[qcode.code]?.most)
        && groupedQuestions[page].every((qcode) => answers[qcode.code]?.least)



    function nextPage() {
        if (page < pagesLength && canGoToNext) {
            setPage(page + 1);
        }
        window.scroll({top: 0, behavior: 'smooth' })
    }
    function prevPage() {
        if (page > 0) {
            setPage(page - 1);
        }
        window.scroll({top: 0, behavior: 'smooth' })
    }
    function submitAnswers() {
        setAnalyzing(true);
        request.post('v1/assessment/test/disc', { answers })
            .then(res => {
                setResult(res.data.data);
            })
            .finally(() => {
                setAnalyzing(false)
                window.location.reload();
            });

    }
    const numAnswered = Object.keys(answers).length;
    const numQuestions = source.length;

    return <div className="pb-5">
        <Prompt when={numAnswered > 0 && numAnswered !== numQuestions} message={location => t('assessment leave confirmation')} />
        <div className="d-flex justify-content-between">
            <h3 className="h1">{t('Tes Kepribadian')}</h3>
            <Button onClick={() => setHint(true)} className="text-nowrap" style={{backgroundColor:"transparent", border:"transparent"}}>
                <i className="fa fa-lg fa-question-circle text-primary" />&nbsp;
                <small>{t('petunjuk')}</small>
            </Button>
        </div>
        <hr/>
        <p autoCapitalize="none">
        Pilihlah salah satu pernyataan yang <b>paling menggambarkan diri anda,</b>&nbsp;
        serta salah satu pernyataan yang <b>paling tidak menggambarkan diri anda.</b>
        </p>

        <Progress className="my-4" color={page === pagesLength - 1 && canGoToNext ? 'success' : undefined} value={indicator}></Progress>

        {groupedQuestions[page].map((question, idx) =>
            <Question {...question} page={page} idx={idx} key={question.code} onAnswered={onAnswered} answer={answers[question.code]} />
        )}
        <div className="d-flex justify-content-around" style={{ width: '100%' }}>
            {page > 0 && <Button style={{width:'125px'}} className="btn-two btn btn-lg btn-netis-color" onClick={prevPage}><i className="fa fa-arrow-left mr-2"></i>{t('back')}</Button>}
            {page < (pagesLength - 1) && <Button style={{width:'125px'}} className="btn-two btn btn-lg btn-netis-color" onClick={nextPage} disabled={!canGoToNext}>{t('selanjutnya')}<i className="fa fa-arrow-right ml-2"></i></Button>}
            {page === (pagesLength -1 ) && <Button style={{width:'125px'}} className="btn-two btn btn-lg btn-netis-success" onClick={submitAnswers} disabled={!canGoToNext}><i className="fa fa-paper-plane mr-2"></i>{t('Submit')}</Button>}
            {/* {page === (pagesLength -1 ) && <Button className="btn btn-lg btn-success" onClick={submitAnswers} disabled={!canGoToNext}><i className="fa fa-paper-plane mr-2"></i>SUBMIT</Button>} */}
        </div>

        <Modal isOpen={hint} style={{fontSize:"12pt"}}>
            <ModalHeader>Petunjuk Pengerjaan Tes Kepribadian</ModalHeader>
            <ModalBody>
                <p>Sebelum melakukan asesmen ini, Anda perlu memperhatikan petunjuk singkat berikut :</p>
                <ol>
                    <li>Pada kolom centang (&nbsp;
                        <i className="fa fa-check" style={{color:'#32CD32'}} />
                    &nbsp;) pilih salah satu dari empat pernyataan yang sesuai dengan diri Anda.</li><br />
                    <li>Pada kolom silang (&nbsp;
                        <i className="fa fa-times" style={{color:'#FF0000'}} />
                    &nbsp;) pilih salah satu dari empat pernyataan yang tidak sesuai dengan diri Anda.</li><br />
                    <li>Anda tidak bisa memilih pernyataan yang sama pada kedua kolom centang
                        (&nbsp;<i className="fa fa-check" style={{color:'#32CD32'}} />&nbsp;)
                        dan silang
                        (&nbsp;<i className="fa fa-times" style={{color:'#FF0000'}} />&nbsp;).
                    </li>
                </ol>
            </ModalBody>
            <ModalFooter>
                <Button color="netis-color" onClick={() => setHint(false)}>Setuju dan Lanjutkan</Button>
            </ModalFooter>
        </Modal>
    </div>
}

export default translate(AssesmentDisc);