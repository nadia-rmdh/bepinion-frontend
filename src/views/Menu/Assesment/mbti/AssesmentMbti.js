import React, { useState } from "react";
import {translate, t } from 'react-switch-lang';
import Question from "./Question";
import { Button, Progress } from "reactstrap";
import { useEffect } from "react";
import request from "../../../../utils/request";
import LoadingAnimation from "../../../../components/LoadingAnimation";
import MbtiResult from "./MbtiResult";
import { Prompt } from "react-router-dom";

function arrayChunk(array, size = 10) {
    return Array(Math.ceil(array.length / size))
        .fill()
        .map((_, index) => index * size)
        .map(begin => array.slice(begin, begin + size));
}

function AssesmentMbti(props) {
    const [source, setSource] = useState([])
    const [loading, setLoading] = useState(true)

    const [answers, setAnswers] = useState({});

    const [page, setPage] = useState(0);
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState(null);
    const [indicator, setIndicator] = useState(0)

    useEffect(() => {
        request.get('v1/assessment/test/mbti').then(res => {
            if (res.data?.data) {
                const source = res.data.data;
                setSource(source);
                setLoading(false);
            }
        })
        .catch(err => {
            if (err.response?.status === 422 && err.response.data.data.error_type === 'HAS_DONE_TEST') {
                const resultExpiredDateTime = new Date(err.response.data.data.result_expired_at);
                request.get('v1/assessment/test/mbti/result').then(res => {
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
        const tempContain = Object.values(answers).map(value => arr.push(value))
        setIndicator(
            Math.round((arr.length / source.length) * 100),
        );
    }, [answers, source.length])

    if (loading || analyzing) {
        return <LoadingAnimation/>
    }

    if (result) {
        return <MbtiResult result={result} />
    }

    function onAnswered(code, answer) {
        setAnswers({...answers, [code]: answer});
    }

    const groupedQuestions = arrayChunk(source, 4);
    const pagesLength = groupedQuestions.length;
    const canGoToNext = source ? groupedQuestions[page].map(q => q.code).every(code => Object.keys(answers).indexOf(code) !== -1) : false;

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
        request.post('v1/assessment/test/mbti', { answers })
            .then(res => {
                setResult(res.data.data);
            })
            .finally(() => setAnalyzing(false));
    }
    const numAnswered = Object.keys(answers).length;
    const numQuestions = source.length;

    return <div class="pb-5">
        <Prompt when={numAnswered > 0 && numAnswered !== numQuestions} message={location => t('assessment leave confirmation')} />
        <h3 className="h1">{t('tesmbtionline')}</h3>
        <hr/>
        <p>
        {t('pilihopsiasesmen')}
        </p>
        <Progress className="my-4" color={page === pagesLength - 1 && canGoToNext ? 'success' : undefined} value={indicator}></Progress>
        {groupedQuestions[page].map(question =>
            <Question {...question} key={question.code} onAnswered={onAnswered} checked={answers[question.code]} />
        )}
        <div className="text-center" style={{ width: '100%' }}>
            {page > 0 && <Button style={{width:'125px'}} className="btn btn-lg btn-netis-color mr-5" onClick={prevPage}><i className="fa fa-arrow-left mr-2"></i>{t('back')}</Button>}
            {page < (pagesLength - 1) && <Button style={{width:'125px'}} className="btn btn-lg btn-netis-color" onClick={nextPage} disabled={!canGoToNext}>{t('selanjutnya')}<i className="fa fa-arrow-right ml-2"></i></Button>}
            {page === (pagesLength -1 ) && <Button style={{width:'125px'}} className="btn btn-lg btn-netis-success" onClick={submitAnswers} disabled={!canGoToNext}><i className="fa fa-paper-plane mr-2"></i>{t('Submit')}</Button>}
        </div>
    </div>
}

export default translate(AssesmentMbti);