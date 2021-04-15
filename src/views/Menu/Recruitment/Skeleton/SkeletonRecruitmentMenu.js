import React from "react";
import Skeleton from "react-loading-skeleton";
import { Card, CardBody, Row, Col } from "reactstrap";

const SkeletonRecruitmentMenu = () => {
    return (
        <section>
            {Array(5)
                .fill()
                .map((item, index) => (
                    <Card key={index}>
                        <CardBody>
                            <Row>
                                <Col sm md="6">
                                    <Skeleton height={50} />
                                    <h4 className="card-title">
                                        <Skeleton height={36} width={72} />
                                    </h4>
                                    <p className="card-channel">
                                        <Skeleton />
                                    </p>
                                </Col>
                                <Col sm md="6" className="text-center">
                                    <Skeleton height={`60%`} width={`30%`} className="mr-1" />
                                    <Skeleton height={`60%`} width={`30%`} className="mr-1" />
                                    <Skeleton height={`60%`} width={`30%`} className="mr-1" />
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                ))}
        </section>
    );
};
export default SkeletonRecruitmentMenu;
