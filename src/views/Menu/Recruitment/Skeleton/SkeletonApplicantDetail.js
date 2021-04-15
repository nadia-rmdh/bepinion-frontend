import React from "react";
import Skeleton from "react-loading-skeleton";
import { Card, CardBody, Row, Col } from "reactstrap";

const SkeletonApplicantDetail = () => {
    return (
        <section>
            <Card>
                <CardBody>
                    <Row style={{ minHeight: 400 }}>
                        <Col sm="12">
                            <Skeleton height={25} width={100} className="mr-1" />
                        </Col>
                        <Col>
                            <div className="detail-applicant-photo d-flex justify-content-center p-3">
                                <Skeleton circle={true} height={200} width={200} />
                            </div>
                        </Col>
                        <Col xs="12" sm="12" md="6" lg="6" xl="6">
                            <Row className="mt-5 text-sm-center text-md-left text-lg-left text-xl-left">
                                <Col xs="12" className="text-netis-primary">
                                    <Skeleton height={30} width={150} className="mr-1" />
                                </Col>
                                <Col xs="12" className="text-netis-primary">
                                    <Skeleton height={20} width={120} className="mr-1" />
                                </Col>
                                <Col xs="12" className="text-muted">
                                    <Skeleton height={10} width={100} className="mr-1" />
                                </Col>
                                <Col xs="12">
                                    <Skeleton height={30} width={`30%`} className="mr-4" />
                                    <Skeleton height={30} width={`30%`} className="mr-1" />
                                </Col>
                            </Row>
                        </Col>
                        <Col xs="12">
                            <Skeleton height={30} width={`10%`} className="mr-1" /><Skeleton height={30} width={`10%`} className="mr-1" /><Skeleton height={30} width={`10%`} className="mr-1" /><br/>
                            <Skeleton height={5} width={`100%`} />
                        </Col>
                    </Row>
                    <Row className="px-5 mx-4" style={{ minHeight: 400 }}>
                        {Array(7)
                            .fill()
                            .map((item, index) => (
                                <Col key={index} sm md="6">
                                    <Skeleton height={20} width={`15%`} /><br />
                                    <Skeleton height={30} width={`75%`} />
                                </Col>
                            ))}
                    </Row>
                </CardBody>
            </Card>
        </section>
    );
};
export default SkeletonApplicantDetail;
