import React, { memo } from "react";
import { Row, Col } from "reactstrap";
import { SalaryJobFilters } from "./Filters/SalaryJobFilters";
import { SearchJobNameFilters } from "./Filters/SearchJobNameFilters";
import { TypeJobFilters } from "./Filters/TypeJobFilters";
import { StatusJobFilters } from "./Filters/StatusJobFilters";
import { ResetFilters } from "./Filters/ResetFilters";

export const RecruitmentListFilters = memo(() => {
    return (
        <Row>
            <Col sm="12">
                <SearchJobNameFilters />
                <hr />
            </Col>
            <Col sm="12">
                <StatusJobFilters />
                <hr />
            </Col>
            {/* Hide dulu buat rilis */}
            {/* <Col sm="12">
                <TypeJobFilters />
                <hr />
            </Col>
            <Col sm="12">
                <SalaryJobFilters />
                <hr />
            </Col> */}
            <Col sm="12">
                <ResetFilters />
            </Col>
        </Row>
    )
})

export const RecruitmentListModalFilters = memo(() => {
    return (
        <Row>
            <Col sm="12">
                <StatusJobFilters />
                <hr />
            </Col>
            <Col sm="12">
                <TypeJobFilters />
                <hr />
            </Col>
            <Col sm="12">
                <SalaryJobFilters showInputRange={false} />
                <hr />
            </Col>
            <Col sm="12">
                <ResetFilters />
            </Col>
        </Row>
    )
})