import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useLocation, useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Table, Spinner } from 'reactstrap'
import useSWR from 'swr';
import request from '../../../../utils/request';
import SprintCard from './SprintCard';

function DesignSprint() {
    const matchRoute = useRouteMatch();
    const location = useLocation()
    // const [data, setData] = useState([])
    // const [loading, setLoading] = useState(true)
    const { data, error: dataError, mutate } = useSWR('v1/teams/' + matchRoute.params.teamId + '/cards', { refreshInterval: 15000 });
    const loading = !data && !dataError;
    const getData = useMemo(() => data?.data?.data ?? [], [data]);
    console.log(dataError)
    console.log(data)
    // useEffect(() => {
    //     setLoading(true)
    //     getData();
    // eslint-disable-next-line
    // }, []);

    // const getData = useCallback((e) => {
    //     return request.get('v1/teams/' + matchRoute.params.teamId + '/cards')
    //         .then((res) => setData(res.getData?.data))
    //         .catch(() => toast.error('Terjadi Kesalahan'))
    //         .finally(() => setLoading(false))
    // }, [matchRoute])

    const dataAnalysis = useMemo(() => getData?.filter((d) => d.category === 'idealist').concat(getData?.filter((d) => d.category === 'analysis')), [getData])
    const dataPrototyping = useMemo(() => getData?.filter((d) => d.category === 'todo').concat(getData?.filter((d) => d.category === 'inprogress'), getData?.filter((d) => d.category === 'done')), [getData])
    const dataResult = useMemo(() => getData?.filter((d) => d.container === 'result'), [getData])

    // console.log(dataPrototyping)
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
                        <td className="px-4"><SprintCard title="Analisis ide" column={'analysis'} getData={() => mutate()} cards={dataAnalysis} /></td>
                        <td className="px-4"><SprintCard title="Prototyping" column={'prototyping'} getData={() => mutate()} cards={dataPrototyping} /></td>
                        <td className="px-4"><SprintCard title="Hasil" column={'result'} getData={() => mutate()} cards={dataResult} /></td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default DesignSprint;