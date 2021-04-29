import React from 'react'
import { Table } from 'reactstrap'
import DataNotFound from "../../../components/DataNotFound";

function ProjectList({data}){

    if(data.length < 1){
        return <DataNotFound />
    }
    return(
        <Table hover responsive>
            <thead>
                <tr>
                    <th>Nama</th>
                    <th>User</th>
                    <th>Waktu</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, idx) => (
                    <tr key={idx}>
                        <td>{item.title}</td>
                        <td>{item.name}</td>
                        <td>{item.createdAt}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

export default ProjectList