import React, { useState, useCallback, memo } from "react";
import { Row, Col, CustomInput, InputGroup, InputGroupAddon, InputGroupText, Badge } from "reactstrap";
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import moment from 'moment'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default memo(({ matchRoute, socket, data, cardId, write }) => {
    const [dueDate, setDueDate] = useState(data?.isActive);
    const [date, setDate] = useState({
        start: data?.startDate ? moment(data?.startDate) : moment(),
        end: data?.endDate ? moment(data?.endDate) : moment().add(1, 'days'),
    });

    const updateActivation = useCallback((active) => {
        socket.emit('putDueDate', { dueDateActive: active, cardId, teamId: matchRoute.params.teamId }, () => { console.log('berhasil update') })
    }, [cardId, matchRoute, socket])


    const updateStartDate = useCallback((date) => {
        socket.emit('putDueDate', { startDate: date.toDate(), cardId, teamId: matchRoute.params.teamId }, () => { console.log('berhasil update') })
    }, [cardId, matchRoute, socket])

    const updateEndDate = useCallback((date) => {
        socket.emit('putDueDate', { endDate: date.toDate(), cardId, teamId: matchRoute.params.teamId }, () => { console.log('berhasil update') })
    }, [cardId, matchRoute, socket])

    return (
        <>
            <Row className="mb-1 pr-5">
                <Col xs="12" className="px-0 mb-2">
                    <div className="d-flex align-items-center">
                        <div className={`font-weight-bold mb-0 font-md text-muted`}>Batas Tanggal</div>
                    </div>
                </Col>
                <Col xs="12" className="pl-0">
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            {write &&
                                <InputGroupText className="bg-transparent border-0 px-0">
                                    <CustomInput type="checkbox" id="dueDateCheckbox" checked={dueDate} onChange={(e) => {
                                        updateActivation(e.target.checked)
                                        setDueDate(e.target.checked)
                                    }} />
                                </InputGroupText>
                            }
                        </InputGroupAddon>
                        <div className="d-flex bg-gray-200 p-1 position-relative" style={{ width: '90%' }}>
                            {!write &&
                                <div className="position-absolute d-block w-100 h-100" style={{ zIndex: 99, backgroundColor: '#acb4bc69', top: 0, left: 0 }}>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                </div>
                            }

                            <div className={`w-100 h-100 font-weight-bold due-date ${write && !dueDate ? 'off' : 'on'}`} style={{}}>
                                <Badge color="warning" pill>As soon as possible</Badge>
                            </div>

                            <DateRangePicker
                                initialSettings={{
                                    singleDatePicker: true,
                                    showDropdowns: true,
                                    startDate: date.start.toDate(),
                                    minYear: 2021,
                                    maxDate: date.end.toDate(),
                                }}
                                onApply={(e, p) => {
                                    updateStartDate(p.startDate)
                                    setDate(state => ({ ...state, start: p.startDate }))
                                }}
                            >
                                <div
                                    id="reportrange"
                                    style={{
                                        background: '#fff',
                                        cursor: 'pointer',
                                        padding: '5px 10px',
                                        border: '1px solid #ccc',
                                        width: '100%',
                                    }}
                                >
                                    <i className="fa fa-calendar mr-2"></i>
                                    <span>{date.start.format('MMMM D, YYYY')}</span> <i className="fa fa-caret-down"></i>
                                </div>
                            </DateRangePicker>
                            <small className="text-muted mx-1 d-flex align-items-center">s/d</small>
                            <DateRangePicker
                                initialSettings={{
                                    singleDatePicker: true,
                                    showDropdowns: true,
                                    startDate: date.end.toDate(),
                                    minYear: 2021,
                                    minDate: date.start.toDate()
                                }}
                                onApply={(e, p) => {
                                    updateEndDate(p.startDate)
                                    setDate(state => ({ ...state, end: p.startDate }))
                                }}
                            >
                                <div
                                    id="reportrange"
                                    style={{
                                        background: '#fff',
                                        cursor: 'pointer',
                                        padding: '5px 10px',
                                        border: '1px solid #ccc',
                                        width: '100%',
                                    }}
                                >
                                    <i className="fa fa-calendar mr-2"></i>
                                    <span>{date.end.format('MMMM D, YYYY')}</span> <i className="fa fa-caret-down"></i>
                                </div>
                            </DateRangePicker>
                        </div>
                    </InputGroup>
                </Col>
            </Row>
        </>
    )
})

export const DueDatePreview = memo(({ data }) => {
    return (
        <Badge color={moment().diff(data?.endDate, 'days') > 0 ? 'success' : 'warning'} className="text-light">
            <FontAwesomeIcon icon="clock" size="sm" /> {moment(data?.endDate).format('D MMMM')}
        </Badge>
    )
})