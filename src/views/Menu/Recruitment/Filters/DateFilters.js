import { DatePickerInput } from "rc-datepicker";
import React from "react";
import { useCallback, memo } from "react";
import { Row, Col } from "reactstrap";
import { useRecruitmentsFiltersCtx } from "../Context/RecruitmentContext";
import moment from "moment"
import { useState } from "react";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const DateFilters = memo(() => {
    const [filters, setFilters] = useRecruitmentsFiltersCtx()
    const [date, setDate] = useState({
        start: filters.date.start,
        end: filters.date.end
    })

    const changeDateFilterStart = useCallback((date) => {
        setDate(state => ({ ...state, start: moment(date).format('YYYY-MM-DD') }));
    }, [setDate])

    const changeDateFilterEnd = useCallback((date) => {
        setDate(state => ({ ...state, end: moment(date).format('YYYY-MM-DD') }));
    }, [setDate])

    useEffect(() => {
        setFilters(state => ({ ...state, date: date }));
    }, [date, setFilters])

    return (
        <>
            <Row>
                <Col sm="12" className="mb-2">
                    <b>Tanggal</b>
                </Col>
                <Col sm="12">
                    <DatePickerInput
                        name="startDate"
                        id="startDate"
                        onChange={changeDateFilterStart}
                        value={filters.date.start}
                        defaultValue=""
                        className='my-custom-datepicker-component'
                        showOnInputClick={true}
                        closeOnClickOutside={true}
                        displayFormat="DD MMMM YYYY"
                        readOnly
                        placeholder="Dari"
                    />
                </Col>
                <Col sm="12" className="justify-content-center text-center my-1">
                    <FontAwesomeIcon icon="exchange-alt" color="#b2bbce" />
                </Col>
                <Col sm="12">
                    <DatePickerInput
                        name="endDate"
                        id="endDate"
                        onChange={changeDateFilterEnd}
                        value={filters.date.end}
                        defaultValue=""
                        className='my-custom-datepicker-component'
                        showOnInputClick={true}
                        closeOnClickOutside={true}
                        displayFormat="DD MMMM YYYY"
                        readOnly
                        placeholder="Sampai"
                    />
                </Col>
            </Row>
        </>
    )
})