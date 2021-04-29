import React from 'react'
import { Table } from 'reactstrap'
import DataNotFound from "../../../components/DataNotFound";
import * as moment from 'moment'

function ProjectList({data}){

    if(data.length < 1){
        return <DataNotFound />
    }
    return(
        <Table hover responsive>
            <thead>
                <tr className="bg-white border-bottom-1">
                    <th className="text-center">Nama Proyek</th>
                    <th className="text-left">Nama User</th>
                    <th className="text-left">Waktu</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, idx) => (
                    <tr key={idx}>
                        <td>
                            <img src={item.img} alt={item.title} height='30px' className="mr-2" />
                            <b>{item.title}</b>
                        </td>
                        <td><i className="fa fa-user-o mr-2" />{item.name}</td>
                        <td>{moment(item.createdAt).format('Do MMMM YYYY')}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

export default ProjectList