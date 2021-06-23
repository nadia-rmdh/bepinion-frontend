import React, { useMemo } from 'react'
import { useRouteMatch } from 'react-router-dom';
// import { toast } from 'react-toastify';
import { Table, Spinner, Card, CardHeader, CardBody } from 'reactstrap'
import useSWR from 'swr';
// import request from '../../../../utils/request';
import SprintCard from './SprintCard';

function DesignSprint() {
    const matchRoute = useRouteMatch();
    const { data, error: dataError, mutate } = useSWR('v1/teams/' + matchRoute.params.teamId + '/cards', { refreshInterval: 15000 });
    const loading = !data && !dataError;
    const getData = useMemo(() => data?.data?.data ?? [], [data]);

    const dataAnalysis = useMemo(() => getData?.filter((d) => d.category === 'idealist').concat(getData?.filter((d) => d.category === 'analysis')), [getData])
    const dataPrototyping = useMemo(() => getData?.filter((d) => d.category === 'todo').concat(getData?.filter((d) => d.category === 'inprogress'), getData?.filter((d) => d.category === 'done')), [getData])
    const dataResult = useMemo(() => getData?.filter((d) => d.container === 'result'), [getData])

    return (
        <Card className="design-sprint shadow-sm border-0">
            <CardHeader className="design-sprint-header">
                <div className="ml-2"><b className="font-lg">Design Sprint</b></div>
            </CardHeader>
            <CardBody>
                {loading ?
                    <div
                        style={{
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0,
                            background: "rgba(255,255,255, 0.5)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "75vh",
                        }}
                    >
                        <Spinner style={{ width: 48, height: 48 }} />
                    </div>
                    :
                    <Table borderless responsive className="table-sprint">
                        <tbody>
                            <tr>
                                <td className="px-4"><SprintCard title="Analisis ide" column={'analysis'} getData={() => mutate()} cards={dataAnalysis} /></td>
                                <td className="px-4"><SprintCard title="Prototyping" column={'prototyping'} getData={() => mutate()} cards={dataPrototyping} /></td>
                                <td className="px-4"><SprintCard title="Hasil" column={'result'} getData={() => mutate()} cards={dataResult} /></td>
                            </tr>
                        </tbody>
                    </Table>
                }
            </CardBody>
        </Card>
    )
}

export default DesignSprint;