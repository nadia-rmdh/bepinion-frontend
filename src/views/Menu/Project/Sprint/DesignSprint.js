import React from 'react'
import { Table } from 'reactstrap'
import SprintCard from './SprintCard';

function DesignSprint(){

    return(
        <div style={{minWidth:'90vw'}}>
            <Table borderless responsive className="table-sprint">
                <thead>
                    <tr>
                        <th colSpan={3}>
                            Nama Tim / Proyek
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><SprintCard title="Analisis ide" column={2} item={10} /></td>
                        <td><SprintCard title="Prototyping" column={3} item={15} /></td>
                        <td><SprintCard title="Hasil" column={1} item={1} /></td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default DesignSprint;