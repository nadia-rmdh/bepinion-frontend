import React, { useCallback, useMemo, useState } from 'react'
import { Calendar, momentLocalizer } from "react-big-calendar";
import { t } from 'react-switch-lang'
import * as moment from 'moment';
import { useUserPrivileges } from '../../../store';
import useSWR from 'swr';
import { Card, CardBody, Col, Row, Spinner} from 'reactstrap';
import AddCalendarModalButton from './AddCalendarModalButton';
import EditCalendarModal from './EditCalendarModal';
import AddCalendarHoliday from './AddCalendarHoliday';
import EditCalendarHolidayModal from './EditCalendarHolidayModal';

const localizer = momentLocalizer(moment);
const calendarViews = ["month", "week", "day"];
const calendarStyle = { height: 'calc(100vh - 80px)'};
const today = new Date();


function CalendarFunc() {
    const { can } = useUserPrivileges();
    const [activeDate, setActiveDate] = useState({ 
        start: moment().subtract(1, 'month').startOf('month'),
        end: moment().add(1, 'month').endOf('month')
    });
    const { data: eventsResponse, error: eventsError, mutate: mutateEvents } = useSWR(() => `v2/company/event?start=${activeDate.start.format('YYYY-MM-DD')}&end=${activeDate.end.format('YYYY-MM-DD')}`);
    const loading = !eventsResponse && !eventsError;
    const events = useMemo(() => {
        const data = eventsResponse?.data?.data ?? [];
        return data.map((item) => ({
            ...item,
            startTime: item.start,
            endTime: item.end,
            start: new Date(`${item.date} ${item.start || '00:00:00'}`),
            end: new Date(`${item.date} ${item.end || '00:00:00'}`),
        }));
    }, [eventsResponse]);

    const calendarToolbar = useMemo(() => ({
        today: t("hariini"),
        previous: <i className="fa fa-angle-left"></i>,
        next: <i className="fa fa-angle-right"></i>,
        month: t("bulanan"),
        week: t("mingguan"),
        day: t("harian")
    }), []); 

    const [showAgenda, setShowAgenda] = useState(null);
    const handleSelectEvent = useCallback((agenda) => {
        setShowAgenda(agenda);
    }, []); 
    const toggleShowAgenda = useCallback(() => { setShowAgenda(null); }, [])

    const calendarEventStyleGetter = useCallback((event, start, end, isSelected) => {
        const backgroundColor = event.type === 'holiday' ? '#f86c6b' : '#4dbd74';
        return { style: { backgroundColor } };
    }, []);

    const handleCalendarChange = useCallback((newAgenda) => {
        setShowAgenda(null);
        if (moment(newAgenda.date).isBetween(activeDate.start, activeDate.end, null, "[]")) {
            mutateEvents()
        } else {
            mutateEvents((eventResponse) => {
                const updated = {...eventResponse};
                updated.data = {...updated.data, data: updated.data.data.filter(agenda => agenda.id !== newAgenda.id) };
                return updated;
            }, false);
        }
    }, [activeDate, mutateEvents]);

    const onRangeChange = useCallback((dates) => {
        if (Array.isArray(dates)) {
            const start = moment(dates[0]);
            const end = moment(dates[dates.length - 1]);
            setActiveDate(currentDate => {
                if (start.isBetween(currentDate.start, currentDate.end, null, "[]") && end.isBetween(currentDate.start, currentDate.end, null, "[]")) {
                    return currentDate;
                } else {
                    return { start, end };
                }
            });
        } else {
            const start = moment(dates.start);
            const end = moment(dates.end);
            setActiveDate(currentDate => {
                if (start.isBetween(currentDate.start, currentDate.end, null, "[]") && end.isBetween(currentDate.start, currentDate.end, null, "[]")) {
                    return currentDate;
                } else {
                    return { start, end };
                }
            });
        }
    }, []);

    return (
        <div className="animated fadeIn">
            <h4 className="content-title mb-4">{t('Kalender Perusahaan')}</h4>
            <div className="content">
                <Row>
                    <Col xs="12" className="d-flex justify-content-end mb-4">
                        {can('add-calendar') && 
                            <>
                            <AddCalendarHoliday btnClass="mr-2" onCreated={handleCalendarChange} />
                            <AddCalendarModalButton onCreated={handleCalendarChange}/>
                            </>
                        }
                    </Col>
                </Row>
                <Card className="dashboard-card">
                    <CardBody>
                        {loading && <div style={{ zIndex: 10, position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, background: 'rgba(255,255,255, 0.75)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Spinner style={{width: 48, height: 48 }} />
                        </div>}
                        <Calendar
                            startAccessor="start"
                            endAccessor="end"
                            popup={true}
                            localizer={localizer}
                            defaultDate={today}
                            messages={calendarToolbar}
                            defaultView="month"
                            views={calendarViews}
                            events={events}
                            style={calendarStyle}
                            onSelectEvent={handleSelectEvent}
                            onRangeChange={onRangeChange}
                            eventPropGetter={calendarEventStyleGetter}
                        />
                    </CardBody>     
                </Card>   
            </div>

            <EditCalendarModal cancel={toggleShowAgenda} agenda={showAgenda?.type !== 'holiday' ? showAgenda : undefined} onEdited={handleCalendarChange} />
            <EditCalendarHolidayModal cancel={toggleShowAgenda} agenda={showAgenda?.type === 'holiday' ? showAgenda : undefined} onEdited={handleCalendarChange} />
        </div>
    )
}

export default CalendarFunc
