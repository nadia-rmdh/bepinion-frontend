import React, { useState, useEffect, useMemo } from 'react'
import { useLocation, useRouteMatch } from 'react-router-dom';
import { Table, Spinner } from 'reactstrap'
import request from '../../../../utils/request';
import SprintCard from './SprintCard';

function DesignSprint() {
    const matchRoute = useRouteMatch();
    const location = useLocation()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    // console.log(new URLSearchParams(location.search).get('team'))
    useEffect(() => {
        const getAllCards = request.get('v1/teams/' + matchRoute.params.teamId + '/cards')
        Promise.all([getAllCards]).then(([getAllCards]) => {
            if (getAllCards.data) {
                setData(getAllCards.data.data);
            }
        }).finally(() => setLoading(false))
    }, [matchRoute]);

    const dataAnalysis = useMemo(() => data.filter((d) => d.category === 'idealist').concat(data.filter((d) => d.category === 'analysis')), [data])
    const dataPrototyping = useMemo(() => data.filter((d) => d.category === 'todo').concat(data.filter((d) => d.category === 'inprogress'), data.filter((d) => d.category === 'done')), [data])
    const dataResult = useMemo(() => data.filter((d) => d.container === 'result'), [data])

    if (loading) {
        return (
            <div className="text-center" style={{ position: 'absolute', width: '100%', height: '100%', zIndex: '99', backgroundColor: 'rgba(255,255,255, 0.7)', justifyContent: 'center', alignItems: 'center' }}>
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
            </div>
        )
    }

    return (
        <div className="design-sprint">
            <Table borderless responsive className="table-sprint">
                <thead>
                    <tr>
                        <th colSpan={3} className="pl-3">
                            <h5 className="ml-3"><b>Tim {location?.state?.team}</b></h5>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="px-4"><SprintCard title="Analisis ide" column={'analysis'} cards={dataAnalysis} /></td>
                        <td className="px-4"><SprintCard title="Prototyping" column={'prototyping'} cards={dataPrototyping} /></td>
                        <td className="px-4"><SprintCard title="Hasil" column={'result'} cards={dataResult} /></td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default DesignSprint;