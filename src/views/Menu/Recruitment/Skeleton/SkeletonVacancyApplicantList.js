import React from "react";
import Skeleton from "react-loading-skeleton";
import { Card, CardBody, Row, Col } from "reactstrap";

const SkeletonVacancyApplicantList = () => {
    return (
        <Row>
            {Array(6)
                .fill()
                .map((item, index) => (
                    <Col key={index} xs="12" sm="6" md="6" lg="4" className="text-center">
                        <Card className="shadow-sm border-0">
                            <CardBody>
                                <Row>
                                    <Col xs="12" className="text-center">
                                        <div className="card-image d-flex justify-content-center p-3">
                                            <Skeleton circle={true} height={150} width={150} />
                                        </div>
                                    </Col>
                                    <Col xs="12" className="text-center">
                                        <Skeleton height={24} width={`100%`} />
                                    </Col>
                                    <Col xs="12" className="px-5 mt-1">
                                        <p className="mb-1">
                                            <Skeleton height={16} width={`100%`} />
                                        </p>
                                        <p>
                                            <Skeleton height={16} width={`100%`} />
                                        </p>
                                    </Col>
                                    {/* <Col xs="12">
                                        <Skeleton height={`100%`} width={`45%`} className="mr-1" />
                                        <Skeleton height={`100%`} width={`45%`} className="mr-1" />
                                    </Col> */}
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
        </Row>
    );
};
export default SkeletonVacancyApplicantList;
