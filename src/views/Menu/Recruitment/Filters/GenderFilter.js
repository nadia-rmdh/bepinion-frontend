import React from "react";
import { useCallback, memo } from "react";
import { Row, Col, CustomInput, FormGroup } from "reactstrap";
import { useRecruitmentsFiltersCtx } from "../Context/RecruitmentContext";

export const GenderFilter = memo(() => {
    const [filters, setFilters] = useRecruitmentsFiltersCtx()

    const changeFilter = useCallback((e) => {
        const { value, checked } = e.target;
        if (value === "all") {
            setFilters(state => ({ ...state, genderApplicant: [] }));
        } else {
            let arr = filters.genderApplicant;
            arr.push(value);
            const set = new Set(arr);
            if (!checked) {
                set.delete(value);
            }
            const setArr = Array.from(set);
            setFilters(state => ({ ...state, genderApplicant: setArr }));
        }
    }, [setFilters, filters.genderApplicant])

    return (
        <>
            <Row>
                <Col sm="12">
                    <b>Jenis Kelamin</b>
                </Col>
                <Col sm="12">
                    <FormGroup>
                        <CustomInput className="my-2" onChange={changeFilter} checked={filters.genderApplicant?.length === 0} id="allGender" value="all" type="checkbox" label="Semua" />
                        <CustomInput className="my-2" onChange={changeFilter} checked={filters.genderApplicant?.length > 0 && filters.genderApplicant?.includes("pria")} id="pria" value="pria" type="checkbox" label="Pria" />
                        <CustomInput className="my-2" onChange={changeFilter} checked={filters.genderApplicant?.length > 0 && filters.genderApplicant?.includes("wanita")} id="wanita" value="wanita" type="checkbox" label="Wanita" />
                    </FormGroup>
                </Col>
            </Row>
        </>
    )
})