import React from 'react'
import { Col, Input, Row } from 'reactstrap'
import {data} from '../Project/dummy';
import ProjectCard from '../Project/ProjectCard';

function Dashboard(){
  return(
    <div className="dashboard-page text-center">
      <Row>
        <Col md="5" className="text-left">
          <h5 className="mt-3"><b>Idea Collaboration</b></h5>
        </Col>
        <Col xs="12" md="5" className="text-left">
          <div className="form-group mt-2 mb-3 relative-input search-addon">
            <Input style={{ borderRadius: "8px" }} type="text" id="search" name="search" placeholder="Search..." />
            <i className="fa fa-search icon-inside-left text-netis-primary" />
          </div>
        </Col>
      </Row>
      {data.filter(item => item.status !== 'rejected').map((item, idx) => (
        <div key={idx} className="my-2">
          <ProjectCard data={item} />
        </div>
      ))}
    </div>
  )
}

export default Dashboard