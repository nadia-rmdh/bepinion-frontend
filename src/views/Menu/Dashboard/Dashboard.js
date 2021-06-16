import React, { useState, useEffect } from 'react'
// import { Col, Input, Row } from 'reactstrap'
import LoadingAnimation from '../../../components/LoadingAnimation';
import request from '../../../utils/request';
import ProjectCard from '../Project/ProjectCard';

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState([]);

  useEffect(() => {
    request.get('v1/projects?verified=verified').then(res => {
      setResult(res.data.data);
    }).finally(() => setLoading(false))
  }, []);

  if (loading) {
    return <LoadingAnimation />
  }

  return (
    <div className="dashboard-page text-center">
      {/* <Row>
        <Col md="5" className="text-left d-none d-md-block">
          <h5 className="mt-3"><b>Idea Collaboration</b></h5>
        </Col>
        <Col xs="12" md="5" className="text-left d-none d-md-block">
          <div className="form-group mt-2 mb-3 relative-input search-addon px-1 px-md-0">
            <Input style={{ borderRadius: "8px" }} type="text" id="search" name="search" placeholder="Search..." />
            <i className="fa fa-search icon-inside-left text-netis-primary" />
          </div>
        </Col>
      </Row> */}
      {result.map((item, idx) => (
        <div key={idx} className="my-2">
          <ProjectCard data={item} />
        </div>
      ))}
    </div>
  )
}

export default Dashboard