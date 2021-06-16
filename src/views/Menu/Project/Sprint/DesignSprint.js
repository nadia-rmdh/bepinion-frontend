import React from 'react'
import { useLocation } from 'react-router-dom';
import { Table } from 'reactstrap'
import SprintCard from './SprintCard';

function DesignSprint(){
    const location = useLocation()
    // console.log(location)

    return(
        <div style={{minWidth:'95vw', borderRadius:'20px'}}>
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
                        <td className="px-4"><SprintCard title="Analisis ide" column={2} item={10} /></td>
                        <td className="px-4"><SprintCard title="Prototyping" column={3} item={15} /></td>
                        <td className="px-4"><SprintCard title="Hasil" column={1} item={1} /></td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default DesignSprint;