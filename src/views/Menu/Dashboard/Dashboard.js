import React, { useState, useEffect } from 'react'
import { Col, Row, Card, CardBody } from 'reactstrap'
import LoadingAnimation from '../../../components/LoadingAnimation';
import { useAuthUser } from '../../../store';
import request from '../../../utils/request';
import ProjectCard, { badgeStatus } from '../Project/ProjectCard';
import noProject from '../../../assets/img/no-project.png';
import { Link } from 'react-router-dom';
import { MemberItem } from '../Project/ProjectDetail';

function Dashboard() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true);
  const [loadingReview, setLoadingReview] = useState(true);
  const [result, setResult] = useState([]);
  const user = useAuthUser();

  useEffect(() => {
    request.get('v1/projects?verified=verified').then(res => {
      setResult(res.data.data);
    }).finally(() => setLoading(false))

    request.get('v1/teams/me')
      .then((res) => {
        setData(res.data.data)
      })
      // .catch(() => setError(true))
      .finally(() => setLoadingReview(false))
  }, []);

  const onErrorImage = (e) => {
    e.target.src = noProject;
    e.target.onerror = null;
  }

  if (loading || loadingReview) {
    return <LoadingAnimation />
  }

  return (
    <div className="dashboard-page text-center">
      <Row>
        <Col xs="12" md="8" xl="7">
          {result.map((item, idx) => (
            <div key={idx} className="my-2">
              <ProjectCard data={item} />
            </div>
          ))}
        </Col>
        <Col xs="4" className="d-none d-md-block text-left profile-review">
          <Card className="mt-2 shadow-sm" style={{ borderRadius: '5px' }}>
            <CardBody className="py-1 px-3">
              <div className="my-4 d-flex align-items-center">
                <img src={user?.detail.photo} alt="profile" className="profile-photo-review rounded-circle" onError={(e) => onErrorImage(e)} style={{ objectFit: 'cover' }} />
                <div>
                  <h6 className="font-weight-bold ml-3">{user.detail.fullName}</h6>
                  <h6 className="text-muted ml-3 mb-0">{user.email}</h6>
                </div>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <h6 className="font-weight-bold text-muted">Project yang anda ikuti</h6>
                <h6 className="font-weight-bold">
                  <Link
                    to={{
                      pathname: `/profile`,
                    }}
                    style={{ color: 'black' }}
                  >Lihat Semua
                  </Link>
                </h6>
              </div>
              <div>
                {data.filter(item => item.status === 'approved').map((item, idx) => (
                  <Link
                    key={idx}
                    to={{
                      pathname: `/project/${item.project.code}/team/${item.id}`,
                      // search: `?team=${item.lead.leadId}`,
                      state: { team: item.lead.leadName }
                    }}
                    style={{ color: 'black' }}
                  >
                    <Card className="card-team-review mb-1" style={{ borderRadius: '5px' }} key={idx}>
                      <CardBody className="py-2 px-0">
                        <Row className="card-team-info">
                          <Col xs="12" className="d-flex mb-2">
                            <img src={item?.project.imagePreview.url} alt="profile" className="project-photo-review rounded" onError={(e) => onErrorImage(e)} style={{ objectFit: 'cover' }} />
                            <div>
                              <h6 className="font-weight-bold ml-3">{item.project.title}</h6>
                              <h6 className="text-muted ml-3 mb-0">Tim {item.lead.leadName}</h6>
                            </div>
                          </Col>
                          <Col xs="6">
                            <div className="d-flex flex-column flex-lg-fill float-left">
                              <span className="text-muted text-left">Status Proyek</span>
                              <div className="d-flex align-items-center mt-2">
                                {badgeStatus(item.project.status)}
                              </div>
                            </div>
                          </Col>
                          <Col xs="6">
                            <div className="d-flex flex-column flex-lg-fill float-right">
                              <span className="text-muted text-right">Members</span>
                              <div className="symbol-group symbol-hover">
                                {/* {item.members.map((member, k) => (
                                  k >= 3 ? null :
                                    <MemberItem member={member} project={item.project} key={k} />
                                ))}
                                {item.members.length > 3 &&
                                  <div className="symbol symbol-30 symbol-circle symbol-light">
                                    <span className="symbol-label font-weight-bold">{item.members.length - 3}+</span>
                                  </div>
                                } */}
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Link>
                ))}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard