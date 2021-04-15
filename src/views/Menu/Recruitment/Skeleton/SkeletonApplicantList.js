import React from "react";
import Skeleton from "react-loading-skeleton";
import { Card, CardBody, Row, Col } from "reactstrap";

const SkeletonApplicantList = () => {
    return (
        <section>
            <Card className="border-0 mb-0">
                <CardBody className="p-0">
                    <Row>
                        <Col sm md="3">
                            <h4 className="card-title">
                                <Skeleton height={36} width="100%" />
                            </h4>
                        </Col>
                        <Col sm md="3">
                            <h4 className="card-title">
                                <Skeleton height={36} width="100%" />
                            </h4>
                        </Col>
                        <Col sm md="3">
                            <h4 className="card-title">
                                <Skeleton height={36} width="100%" />
                            </h4>
                        </Col>
                        <Col sm md="3">
                            <h4 className="card-title">
                                <Skeleton height={36} width="100%" />
                            </h4>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
            <Skeleton height={2} width="100%" />
            {Array(15)
                .fill()
                .map((item, index) => (
                    <Card key={index} className="border-0">
                        <CardBody className="p-0">
                            <Row>
                                <Col sm md="3">
                                    <h4 className="card-title">
                                        <Skeleton height={36} width="100%" />
                                    </h4>
                                </Col>
                                <Col sm md="3">
                                    <h4 className="card-title">
                                        <Skeleton height={36} width="100%" />
                                    </h4>
                                </Col>
                                <Col sm md="3">
                                    <h4 className="card-title">
                                        <Skeleton height={36} width="100%" />
                                    </h4>
                                </Col>
                                <Col sm md="3">
                                    <h4 className="card-title">
                                        <Skeleton height={36} width="49%" className="mr-1" />
                                        <Skeleton height={36} width="49%" />
                                    </h4>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                ))}
        </section>
    );
};
export default SkeletonApplicantList;
