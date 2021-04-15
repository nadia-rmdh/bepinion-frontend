import React, { memo, useEffect, useState } from "react";
import { Row, Col, InputGroup, InputGroupAddon, InputGroupText, Input } from "reactstrap";
import { useRecruitmentsFiltersCtx } from "../Context/RecruitmentContext";

export const SearchApplicantNameFilter = memo(({data}) => {
    const [filters, setFilters] = useRecruitmentsFiltersCtx()
    const [search, setSearch] = useState(filters.searchApplicant)

    useEffect(() => {
        setFilters(state => ({ ...state, searchApplicant: search }));
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
                        <Input type="text" placeholder={`Cari Nama ${data ?? 'Pelamar'}`} className="input-search"
                            value={filters.searchApplicant}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </InputGroup>
                </Col>
            </Row>
        </>
    )
})