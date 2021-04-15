import React, { memo } from "react";
import { Row, Col } from "reactstrap";
import { DateFilters } from "../Filters/DateFilters";
import { ResetFilters } from "../Filters/ResetFilters";
import { SearchApplicantNameFilter } from "../Filters/SearchApplicantNameFilter";
// import { SelectJobFilter } from "../Filters/SelectJobFilter";
// import { StatusApplicantFilter } from "../Filters/StatusApplicantFilter";

export const EmployeeFilters = memo(() => {
    return (
        <Row>
            <Col sm="12">
                <SearchApplicantNameFilter data="Karyawan" />
                <hr />
            </Col>
            <Col sm="12">
                <DateFilters />
                <hr />
            </Col>
            {/* <Col sm="12">
                <SelectJobFilter />
                <hr />
            </Col>
            <Col sm="12">
                <StatusApplicantFilter />
                <hr />
            </Col> */}
            <Col sm="12">
                <ResetFilters />
            </Col>
        </Row>
    )
})

export const EmployeeModalFilters = memo(() => {
    return (
        <Row>
            <Col sm="12">
                <DateFilters />
                <hr />
            </Col>
            {/* <Col sm="12">
                <SelectJobFilter />
                <hr />
            </Col>
            <Col sm="12">
                <StatusApplicantFilter />
                <hr />
            </Col>
            <Col sm="12">
                <ResetFilters />
            </Col> */}
        </Row>
    )
})