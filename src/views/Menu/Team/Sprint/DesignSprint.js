import React, { useState, useEffect, useMemo } from 'react'
import { useRouteMatch } from 'react-router-dom';
// import { toast } from 'react-toastify';
import { Table, Spinner, Card, CardHeader, CardBody } from 'reactstrap'
import AnalysisSprint from './Columns/AnalysisSprint';
import PrototypingSprint from './Columns/PrototypingSprint';
import ResultSprint from './Columns/ResultSprint';

function DesignSprint({ socket, project, members, leadId }) {
    const matchRoute = useRouteMatch();
    const [getData, setData] = useState(null);

    useEffect(() => {
        socket.emit("joinCards", { teamId: matchRoute.params.teamId }, (res) => {
            if (!res.success) {
                // setFlag(1);
                console.log('Socket Error')
            } else {
                // setLoading(false)
            }
            // console.log('socket join')
        });
        socket.on('getDataCards', (res) => {
            setData(res.data)
        })
        // eslint-disable-next-line
    }, []);

    const dataAnalysis = useMemo(() => getData?.filter((d) => d.category === 'idealist').concat(getData?.filter((d) => d.category === 'analysis')), [getData])
    const dataPrototyping = useMemo(() => getData?.filter((d) => d.category === 'todo').concat(getData?.filter((d) => d.category === 'inprogress'), getData?.filter((d) => d.category === 'done')), [getData])
    const dataResult = useMemo(() => getData?.filter((d) => d.category === 'result'), [getData])

    return (
        <Card className="design-sprint shadow-sm border-0">
            <CardHeader className="design-sprint-header">
                <div className="ml-2"><b className="font-lg">Design Sprint</b></div>
            </CardHeader>
            <CardBody className='p-0'>
                {!getData ?
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
                    <>
                        {project.status === 'registration' &&
                            <div className="lock-sprint text-center">
                                <i className="fa fa-lock lock-icon" aria-hidden="true" /><br />
                                <div>
                                    <span style={{ fontSize: "14pt" }}><b>Status proyek masih dalam tahap "Pembentukan Tim"</b></span><br />
                                    <span>Silahkan tunggu sampai status proyek menjadi "Ideasi Tim"</span><br />
                                </div>
                            </div>
                        }
                        <Table borderless responsive className="table-sprint mb-0">
                            <tbody>
                                <tr>
                                    <td className="pl-4"><AnalysisSprint title="Analisis ide" socket={socket} column={'analysis'} cards={dataAnalysis} members={members} status={project.status} leadId={leadId} /></td>
                                    <td className="px-3"><PrototypingSprint title="Prototyping" socket={socket} column={'prototyping'} cards={dataPrototyping} members={members} status={project.status} leadId={leadId} /></td>
                                    <td className="pr-4"><ResultSprint title="Hasil" socket={socket} column={'result'} cards={dataResult} members={members} status={project.status} leadId={leadId} /></td>
                                </tr>
                            </tbody>
                        </Table>
                    </>
                }
            </CardBody>
        </Card>
    )
}

export default DesignSprint;