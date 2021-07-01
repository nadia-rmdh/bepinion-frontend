import React, { useMemo, useState, useEffect } from "react";
import { Row, Col, Progress, Spinner } from "reactstrap";
import request from "../../../../../../utils/request";
import { useAuthUser } from "../../../../../../store";
import ReactStars from "react-rating-stars-component";

export default ({ data, cardId, mutate }) => {
    const user = useAuthUser();
    const [loading, setLoading] = useState(true);
    const [hasRated, setHasRated] = useState(null);
    const postRating = (rate) => {
        request.post('v1/cards/' + data.id + '/rating', { rate })
            .then(() => {
                mutate()
            })
        // .catch(() => alert('Error'))
    }

    useEffect(() => {
        if (data) {
            Object.values(data?.rating).map((v, i) => v.filter((r, k) => r.userId === user.id ? setHasRated(r) : []))
            setLoading(false)
        };
    }, [data, user])

    const rate1 = useMemo(() => data?.rating[1] ?? [], [data])
    const rate2 = useMemo(() => data?.rating[2] ?? [], [data])
    const rate3 = useMemo(() => data?.rating[3] ?? [], [data])
    const rate4 = useMemo(() => data?.rating[4] ?? [], [data])
    const rate5 = useMemo(() => data?.rating[5] ?? [], [data])
    const rateCount = useMemo(() => parseInt(rate5.length) + parseInt(rate4.length) + parseInt(rate3.length) + parseInt(rate2.length) + parseInt(rate1.length), [rate5, rate4, rate3, rate2, rate1])
    const rateAmount = useMemo(() => ((5 * rate5.length) + (4 * rate4.length) + (3 * rate3.length) + (2 * rate2.length) + (1 * rate1.length)) / rateCount, [rate5, rate4, rate3, rate2, rate1, rateCount])

    const ratePercents = useMemo(() => (
        {
            1: rate1.length / rateCount * 100,
            2: rate2.length / rateCount * 100,
            3: rate3.length / rateCount * 100,
            4: rate4.length / rateCount * 100,
            5: rate5.length / rateCount * 100,
        }
    ), [rate5, rate4, rate3, rate2, rate1, rateCount])

    if (loading) {
        return (
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    background: "rgba(255,255,255, 0.5)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Spinner style={{ width: 48, height: 48 }} />
            </div>
        )
    }

    return (
        <>
            <Row style={{ padding: '0px 1rem' }}>
                <Col xs="12" className="px-0">
                    <div className="font-weight-bold font-lg">Penilaian</div>
                </Col>
                <Col xs="4" className="px-0 text-center">
                    <div className="font-weight-bold" style={{ fontSize: '50pt', lineHeight: 1 }}>{rateAmount ? rateAmount : 0}</div>
                    <div style={{ fontSize: '12pt' }}>dari 5</div>
                </Col>
                <Col xs="8" className="px-0 d-flex justify-content-center">
                    <div className="w-100" style={{ marginLeft: '-2rem', marginTop: '6px' }}>
                        <div className="d-flex align-items-center">
                            <div className="d-block" style={{ width: '40%' }}>
                                <i className="fa fa-star text-muted float-right" style={{ fontSize: '12px' }}></i>
                                <i className="fa fa-star text-muted float-right" style={{ fontSize: '12px' }}></i>
                                <i className="fa fa-star text-muted float-right" style={{ fontSize: '12px' }}></i>
                                <i className="fa fa-star text-muted float-right" style={{ fontSize: '12px' }}></i>
                                <i className="fa fa-star text-muted float-right" style={{ fontSize: '12px' }}></i>
                            </div>
                            <Progress color='secondary' value={ratePercents[5]} className="ml-2" style={{ height: '8px', width: '60%' }}></Progress>
                        </div>
                        <div className="d-flex align-items-center">
                            <div className="d-block" style={{ width: '40%' }}>
                                <i className="fa fa-star text-muted float-right" style={{ fontSize: '12px' }}></i>
                                <i className="fa fa-star text-muted float-right" style={{ fontSize: '12px' }}></i>
                                <i className="fa fa-star text-muted float-right" style={{ fontSize: '12px' }}></i>
                                <i className="fa fa-star text-muted float-right" style={{ fontSize: '12px' }}></i>
                            </div>
                            <Progress color='secondary' value={ratePercents[4]} className="ml-2" style={{ height: '8px', width: '60%' }}></Progress>
                        </div>
                        <div className="d-flex align-items-center">
                            <div className="d-block" style={{ width: '40%' }}>
                                <i className="fa fa-star text-muted float-right" style={{ fontSize: '12px' }}></i>
                                <i className="fa fa-star text-muted float-right" style={{ fontSize: '12px' }}></i>
                                <i className="fa fa-star text-muted float-right" style={{ fontSize: '12px' }}></i>
                            </div>
                            <Progress color='secondary' value={ratePercents[3]} className="ml-2" style={{ height: '8px', width: '60%' }}></Progress>
                        </div>
                        <div className="d-flex align-items-center">
                            <div className="d-block" style={{ width: '40%' }}>
                                <i className="fa fa-star text-muted float-right" style={{ fontSize: '12px' }}></i>
                                <i className="fa fa-star text-muted float-right" style={{ fontSize: '12px' }}></i>
                            </div>
                            <Progress color='secondary' value={ratePercents[2]} className="ml-2" style={{ height: '8px', width: '60%' }}></Progress>
                        </div>
                        <div className="d-flex align-items-center">
                            <div className="d-block" style={{ width: '40%' }}>
                                <i className="fa fa-star text-muted float-right" style={{ fontSize: '12px' }}></i>
                            </div>
                            <Progress color='secondary' value={ratePercents[1]} className="ml-2" style={{ height: '8px', width: '60%' }}></Progress>
                        </div>

                        <div className="w-100 mt-1">
                            <div className="float-right">{rateCount} Penilaian</div>
                        </div>
                    </div>
                </Col>
                <Col xs="12" className="px-0 d-flex align-items-center" style={{ borderTop: '1px solid' }}>
                    <div className="mr-1 font-lg">{hasRated ? 'Penilaian dari anda' : 'Beri penilaian anda'}</div>
                    <ReactStars
                        count={5}
                        onChange={(e) => postRating(e)}
                        size={32}
                        value={hasRated?.rate ?? 0}
                        edit={hasRated ? false : true}
                        // isHalf={true}
                        emptyIcon={<i className="fa fa-star"></i>}
                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                        fullIcon={<i className="fa fa-star"></i>}
                        activeColor="#ffd700"
                    />
                </Col>
            </Row>
        </>
    )
}