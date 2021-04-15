import React, { memo, useEffect, useState } from "react";
import { Row, Col, InputGroup, InputGroupAddon, InputGroupText, Input } from "reactstrap";
import { useRecruitmentsFiltersCtx } from "../Context/RecruitmentContext";

export const SearchJobNameFilters = memo(() => {
    const [filters, setFilters] = useRecruitmentsFiltersCtx()
    const [search, setSearch] = useState(filters.searchJob)

    useEffect(() => {
        setFilters(state => ({ ...state, searchJob: search }));
    }, [search, setFilters])

    return (
        <>
            <Row>
                <Col sm="12">
                    <InputGroup className="my-2" style={{ borderRadius: "12px" }}>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText className="input-group-transparent">
                                <i className="fa fa-search"></i>
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Cari Nama Pekerjaan" className="input-search"
                            value={filters.searchJob}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </InputGroup>
                </Col>
            </Row>
        </>
    )
})