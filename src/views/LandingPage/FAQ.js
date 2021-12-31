import React, { forwardRef } from 'react'
import { Button, Card, CardBody, Col, Row } from 'reactstrap';
import { ArcherContainer, ArcherElement } from 'react-archer';
import { isMobile } from 'react-device-detect';

function importAll(r) {
  return r.keys().map(r);
}

const imagesClient = importAll(require.context('../../assets/landingpage/faq/v2/', false, /\.(png|jpe?g|svg)$/));
const description = {
  client_1: {
    title: 'Join Our Growing Comunity',
    description: 'To get started, submit your application as Client through this website.',
  },
  client_2: {
    title: 'Account Verification Process by Pinion',
    description: 'Complete the registration by submitting required administrative documents.',
  },
  client_3: {
    title: 'Start Your First Project',
    description: 'Start your first project by filling out the form. Make sure the project is well-described to receive accurate bids from the Consultants.',
  },
  client_4: {
    title: 'Choose Your Consultant',
    description: 'When the bids are received, you may review and choose the best available Consultant to work on the project.',
  },
  consultant_1: {
    title: 'Join Our Growing Comunity',
    description: 'Sign up as an individual consultant in the platform.',
  },
  consultant_2: {
    title: 'Account Verification Process by Pinion',
    description: 'Complete the registration by submitting required administrative documents.',
  },
  consultant_3: {
    title: 'Browse The Marketplace',
    description: 'Browse the marketplace and find the projects those are suitable for your expertise, time, and compensation.',
  },
  consultant_4: {
    title: 'Win Your First Project',
    description: 'Fill out the proposal form and send it as a bid. Accurate proposal and bid will have the highest probability to win.',
  },
}

function FAQ(props, ref) {
  return (
    <div className="faq w-100 d-flex align-items-center justify-content-center position-relative" ref={ref}>
      <div className="position-absolute faq-bg">
      </div>
      <Row className="w-100">
        <Col xs="12" className="d-flex align-items-center justify-content-center p-0">
          <div className="w-100">
            <div className="text-pinion-blue text-center font-2xl font-weight-bold mb-5">How It Works</div>
            <div className="d-flex align-items-center justify-content-center mb-5">
              <Button color="pinion-grey" className="rounded-pill text-white" style={{ width: '150px' }}
              >
                Client
              </Button>
            </div>
            <ArcherContainer lineStyle="curve">
              <div className="px-0 pr-5 px-lg-5">
                <Row className="w-100 px-md-5 ml-4 mx-lg-0">
                  <Col xs="12" lg="3" className="d-flex justify-content-center px-3">
                    <ArcherElement
                      id={`client_1`}
                      relations={[
                        {
                          targetId: `client_2`,
                          targetAnchor: isMobile ? 'top' : 'left',
                          sourceAnchor: isMobile ? 'top' : 'right',
                          style: {
                            strokeColor: '#fff', strokeWidth: 2,
                            endShape: {
                              arrow: {
                                arrowLength: 5,
                                arrowThickness: 5,
                              }
                            }
                          },
                        },
                      ]}
                    >
                      <div>
                        <Card className="bg-pinion-primary border-0 shadow rounded-5">
                          <CardBody className="p-0">
                            <div className="position-relative">
                              <div className="position-absolute text-pinion-primary bg-white rounded-circle d-flex align-items-center justify-content-center font-2xl font-weight-bold" style={{ top: -15, left: -15, width: 50, height: 50 }}>
                                1
                              </div>
                              <div className="p-4">
                                <div className="d-flex align-items-center mb-3">
                                  <img src={imagesClient[0]} alt="client_1" style={{ width: 70, height: 70 }} />
                                  <div className="font-xl text-white text-capitalize font-weight-bold ml-3">{description.client_1.title}</div>
                                </div>
                                <div className="text-white">{description.client_1.description}</div>
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      </div>
                    </ArcherElement>
                  </Col>
                  <Col xs="12" lg="3" className="d-flex justify-content-center px-3">
                    <ArcherElement
                      id={`client_2`}
                      relations={[
                        {
                          targetId: `client_3`,
                          targetAnchor: isMobile ? 'top' : 'left',
                          sourceAnchor: isMobile ? 'top' : 'right',
                          style: {
                            strokeColor: '#fff', strokeWidth: 2,
                            endShape: {
                              arrow: {
                                arrowLength: 5,
                                arrowThickness: 5,
                              }
                            }
                          },
                        },
                      ]}
                    >
                      <div>
                        <Card className="bg-pinion-primary border-0 shadow rounded-5">
                          <CardBody className="p-0">
                            <div className="position-relative">
                              <div className="position-absolute text-pinion-primary bg-white rounded-circle d-flex align-items-center justify-content-center font-2xl font-weight-bold" style={{ top: -15, left: -15, width: 50, height: 50 }}>
                                2
                              </div>
                              <div className="p-4">
                                <div className="d-flex align-items-center mb-3">
                                  <img src={imagesClient[1]} alt="client_2" style={{ width: 70, height: 70 }} />
                                  <div className="font-xl text-white text-capitalize font-weight-bold ml-3">{description.client_2.title}</div>
                                </div>
                                <div className="text-white">{description.client_2.description}</div>
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      </div>
                    </ArcherElement>
                  </Col>
                  <Col xs="12" lg="3" className="d-flex justify-content-center px-3">
                    <ArcherElement
                      id={`client_3`}
                      relations={[
                        {
                          targetId: `client_4`,
                          targetAnchor: isMobile ? 'top' : 'left',
                          sourceAnchor: isMobile ? 'top' : 'right',
                          style: {
                            strokeColor: '#fff', strokeWidth: 2,
                            endShape: {
                              arrow: {
                                arrowLength: 5,
                                arrowThickness: 5,
                              }
                            }
                          },
                        },
                      ]}
                    >
                      <div>
                        <Card className="bg-pinion-primary border-0 shadow rounded-5">
                          <CardBody className="p-0">
                            <div className="position-relative">
                              <div className="position-absolute text-pinion-primary bg-white rounded-circle d-flex align-items-center justify-content-center font-2xl font-weight-bold" style={{ top: -15, left: -15, width: 50, height: 50 }}>
                                3
                              </div>
                              <div className="p-4">
                                <div className="d-flex align-items-center mb-3">
                                  <img src={imagesClient[2]} alt="client_3" style={{ width: 70, height: 70 }} />
                                  <div className="font-xl text-white text-capitalize font-weight-bold ml-3">{description.client_3.title}</div>
                                </div>
                                <div className="text-white">{description.client_3.description}</div>
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      </div>
                    </ArcherElement>
                  </Col>
                  <Col xs="12" lg="3" className="d-flex justify-content-center px-3">
                    <ArcherElement
                      id={`client_4`}
                      relations={[
                        {
                          targetId: `target-end`,
                          sourceAnchor: 'right',
                          targetAnchor: 'top',
                          style: {
                            strokeColor: '#fff', strokeWidth: 2,
                            lineStyle: 'curve',
                            endMarker: false,
                            endShape: {
                              arrow: {
                                arrowLength: 5,
                                arrowThickness: 5,
                              }
                            }
                          },
                        },
                      ]}
                    >
                      <div>
                        <Card className="bg-pinion-primary border-0 shadow rounded-5">
                          <CardBody className="p-0">
                            <div className="position-relative">
                              <div className="position-absolute text-pinion-primary bg-white rounded-circle d-flex align-items-center justify-content-center font-2xl font-weight-bold" style={{ top: -15, left: -15, width: 50, height: 50 }}>
                                4
                              </div>
                              <div className="p-4">
                                <div className="d-flex align-items-center mb-3">
                                  <img src={imagesClient[3]} alt="client_4" style={{ width: 70, height: 70 }} />
                                  <div className="font-xl text-white text-capitalize font-weight-bold ml-3">{description.client_4.title}</div>
                                </div>
                                <div className="text-white">{description.client_4.description}</div>
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      </div>
                    </ArcherElement>
                  </Col>
                </Row>
              </div>
              <div className="position-relative">
                <ArcherElement
                  id={`target-end`}
                  relations={[
                    {
                      targetId: `target-end2`,
                      sourceAnchor: 'bottom',
                      targetAnchor: 'right',
                      style: {
                        strokeColor: '#fff', strokeWidth: 2,
                        // endMarker: false,
                        lineStyle: 'curve',
                        endShape: {
                          arrow: {
                            arrowLength: 5,
                            arrowThickness: 5,
                          }
                        }
                      },
                    },
                  ]}
                >
                  <div className="position-absolute" style={{ right: 30, top: -50 }}></div>
                </ArcherElement>
                <div className="my-5 faq-end">
                  <ArcherElement
                    id={`target-end2`}
                    relations={[]}
                  >
                    <div>
                      <Card className="border-0 bg-pinion-info rounded-pill">
                        <CardBody>
                          <Row className="text-white py-4 px-0 px-lg-5">
                            <Col xs="12" lg="4" className={isMobile ? 'text-center' : 'text-right'}>
                              <div className="font-weight-bold font-4xl mr-0 mr-lg-5">Kick It Off!</div>
                            </Col>
                            <Col xs="12" lg="8">
                              <div>Project will start once the administrative requirements are completed. Meet your Client/Consultant in Pinion Project Environment to commence the project.</div>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    </div>
                  </ArcherElement>
                </div>
                <ArcherElement
                  id={`target-end3`}
                  relations={[
                    {
                      targetId: `target-end2`,
                      sourceAnchor: 'bottom',
                      targetAnchor: 'right',
                      style: {
                        strokeColor: '#fff', strokeWidth: 2,
                        // endMarker: false,
                        lineStyle: 'curve',
                        endShape: {
                          arrow: {
                            arrowLength: 5,
                            arrowThickness: 5,
                          }
                        }
                      },
                    },
                  ]}
                >
                  <div className="position-absolute" style={{ right: 30, bottom: -50 }}></div>
                </ArcherElement>
              </div>
              <div className="d-flex align-items-center justify-content-center mb-5">
                <Button color="pinion-grey" className="rounded-pill text-white" style={{ width: '150px' }}
                >
                  Consultant
                </Button>
              </div>
              <div className="px-0 pr-5 pl-lg-5 px-lg-5">
                <Row className="w-100 px-md-5 ml-4 mx-lg-0">
                  <Col xs="12" lg="3" className="d-flex justify-content-center px-3">
                    <ArcherElement
                      id={`consultant_1`}
                      relations={[
                        {
                          targetId: `consultant_2`,
                          targetAnchor: isMobile ? 'top' : 'left',
                          sourceAnchor: isMobile ? 'top' : 'right',
                          style: {
                            strokeColor: '#fff', strokeWidth: 2,
                            endShape: {
                              arrow: {
                                arrowLength: 5,
                                arrowThickness: 5,
                              }
                            }
                          },
                        },
                      ]}
                    >
                      <div>
                        <Card className="bg-pinion-primary border-0 shadow rounded-5">
                          <CardBody className="p-0">
                            <div className="position-relative">
                              <div className="position-absolute text-pinion-primary bg-white rounded-circle d-flex align-items-center justify-content-center font-2xl font-weight-bold" style={{ top: -15, left: -15, width: 50, height: 50 }}>
                                1
                              </div>
                              <div className="p-4">
                                <div className="d-flex align-items-center mb-3">
                                  <img src={imagesClient[4]} alt="consultant_1" style={{ width: 70, height: 70 }} />
                                  <div className="font-xl text-white text-capitalize font-weight-bold ml-3">{description.consultant_1.title}</div>
                                </div>
                                <div className="text-white">{description.consultant_1.description}</div>
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      </div>
                    </ArcherElement>
                  </Col>
                  <Col xs="12" lg="3" className="d-flex justify-content-center px-3">
                    <ArcherElement
                      id={`consultant_2`}
                      relations={[
                        {
                          targetId: `consultant_3`,
                          targetAnchor: isMobile ? 'top' : 'left',
                          sourceAnchor: isMobile ? 'top' : 'right',
                          style: {
                            strokeColor: '#fff', strokeWidth: 2,
                            endShape: {
                              arrow: {
                                arrowLength: 5,
                                arrowThickness: 5,
                              }
                            }
                          },
                        },
                      ]}
                    >
                      <div>
                        <Card className="bg-pinion-primary border-0 shadow rounded-5">
                          <CardBody className="p-0">
                            <div className="position-relative">
                              <div className="position-absolute text-pinion-primary bg-white rounded-circle d-flex align-items-center justify-content-center font-2xl font-weight-bold" style={{ top: -15, left: -15, width: 50, height: 50 }}>
                                2
                              </div>
                              <div className="p-4">
                                <div className="d-flex align-items-center mb-3">
                                  <img src={imagesClient[5]} alt="consultant_2" style={{ width: 70, height: 70 }} />
                                  <div className="font-xl text-white text-capitalize font-weight-bold ml-3">{description.consultant_2.title}</div>
                                </div>
                                <div className="text-white">{description.consultant_2.description}</div>
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      </div>
                    </ArcherElement>
                  </Col>
                  <Col xs="12" lg="3" className="d-flex justify-content-center px-3">
                    <ArcherElement
                      id={`consultant_3`}
                      relations={[
                        {
                          targetId: `consultant_4`,
                          targetAnchor: isMobile ? 'top' : 'left',
                          sourceAnchor: isMobile ? 'top' : 'right',
                          style: {
                            strokeColor: '#fff', strokeWidth: 2,
                            endShape: {
                              arrow: {
                                arrowLength: 5,
                                arrowThickness: 5,
                              }
                            }
                          },
                        },
                      ]}
                    >
                      <div>
                        <Card className="bg-pinion-primary border-0 shadow rounded-5">
                          <CardBody className="p-0">
                            <div className="position-relative">
                              <div className="position-absolute text-pinion-primary bg-white rounded-circle d-flex align-items-center justify-content-center font-2xl font-weight-bold" style={{ top: -15, left: -15, width: 50, height: 50 }}>
                                3
                              </div>
                              <div className="p-4">
                                <div className="d-flex align-items-center mb-3">
                                  <img src={imagesClient[6]} alt="consultant_3" style={{ width: 70, height: 70 }} />
                                  <div className="font-xl text-white text-capitalize font-weight-bold ml-3">{description.consultant_3.title}</div>
                                </div>
                                <div className="text-white">{description.consultant_3.description}</div>
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      </div>
                    </ArcherElement>
                  </Col>
                  <Col xs="12" lg="3" className="d-flex justify-content-center px-3">
                    <ArcherElement
                      id={`consultant_4`}
                      relations={[
                        {
                          targetId: `target-end3`,
                          sourceAnchor: 'right',
                          targetAnchor: 'bottom',
                          style: {
                            strokeColor: '#fff', strokeWidth: 2,
                            lineStyle: 'curve',
                            endMarker: false,
                            endShape: {
                              arrow: {
                                arrowLength: 5,
                                arrowThickness: 5,
                              }
                            }
                          },
                        },
                      ]}
                    >
                      <div>
                        <Card className="bg-pinion-primary border-0 shadow rounded-5">
                          <CardBody className="p-0">
                            <div className="position-relative">
                              <div className="position-absolute text-pinion-primary bg-white rounded-circle d-flex align-items-center justify-content-center font-2xl font-weight-bold" style={{ top: -15, left: -15, width: 50, height: 50 }}>
                                4
                              </div>
                              <div className="p-4">
                                <div className="d-flex align-items-center mb-3">
                                  <img src={imagesClient[7]} alt="consultant_4" style={{ width: 70, height: 70 }} />
                                  <div className="font-xl text-white text-capitalize font-weight-bold ml-3">{description.consultant_4.title}</div>
                                </div>
                                <div className="text-white">{description.consultant_4.description}</div>
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      </div>
                    </ArcherElement>
                  </Col>
                </Row>
              </div>
            </ArcherContainer>
          </div>
        </Col>
      </Row>
    </div>
  )
}
export default forwardRef(FAQ)
