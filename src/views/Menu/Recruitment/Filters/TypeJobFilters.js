import React from "react";
import { memo, useCallback } from "react";
import { FormGroup, CustomInput, Row, Col } from "reactstrap";
import { useRecruitmentsFiltersCtx } from "../Context/RecruitmentContext";

export const TypeJobFilters = memo(() => {
    const [filters, setFilters] = useRecruitmentsFiltersCtx()

    const changeFilterType = useCallback((e) => {
        const { value, checked } = e.target;
        if (value === "all") {
            setFilters(state => ({ ...state, type: [] }));
        }
        else {
            let arr = filters.type;
            arr.push(value);
            const set = new Set(arr);
            if (!checked) {
                set.delete(value);
            }
            const setArr = Array.from(set);
            setFilters(state => ({ ...state, type: setArr }));
        }
    }, [setFilters, filters.type])

    return (
        <>
            <Row>
                <Col sm="12">
                    <b>Tipe Pekerjaan</b>
                </Col>
                <Col sm="12">
                    <FormGroup>
                        <CustomInput className="my-2" name="all" id="all" onChange={changeFilterType} checked={filters.type.length === 0} value="all" type="checkbox" label="Semua Tipe" />
                        <CustomInput className="my-2" name="Full-time" id="Full-time" onChange={changeFilterType} checked={filters.type.length > 0 && filters.type.includes("Full-time")} value="Full-time" type="checkbox" label="Full Time" />
                        <CustomInput className="my-2" name="Part-time" id="Part-time" onChange={changeFilterType} checked={filters.type.length > 0 && filters.type.includes("Part-time")} value="Part-time" type="checkbox" label="Part Time" />
                        <CustomInput className="my-2" name="Magang" id="Magang" onChange={changeFilterType} checked={filters.type.length > 0 && filters.type.includes("Magang")} value="Magang" type="checkbox" label="Magang" />
                        <CustomInput className="my-2" name="Kontrak" id="Kontrak" onChange={changeFilterType} checked={filters.type.length > 0 && filters.type.includes("Kontrak")} value="Kontrak" type="checkbox" label="Kontrak" />
                        <CustomInput className="my-2" name="Freelance" id="Freelance" onChange={changeFilterType} checked={filters.type.length > 0 && filters.type.includes("Freelance")} value="Freelance" type="checkbox" label="Freelance" />
                    </FormGroup>
                </Col>
            </Row>
        </>
    )

})