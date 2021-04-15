import React from "react";
import { useCallback, memo } from "react";
import { CustomInput, Row, Col } from "reactstrap";
import { useRecruitmentsFiltersCtx } from "../Context/RecruitmentContext";

export const StatusJobFilters = memo(() => {
    const [filters, setFilters] = useRecruitmentsFiltersCtx()

    const changeFilterStatus = useCallback((e) => {
        const { value, checked } = e.target;
        if (value === "allJob") {
            setFilters(state => ({ ...state, status: [] }));
        }
        else {
            let arr = filters.status;
            arr.push(value);
            const set = new Set(arr);
            if (!checked) {
                set.delete(value);
            }
            const setArr = Array.from(set);
            setFilters(state => ({ ...state, status: setArr }));
        }
    }, [setFilters, filters.status])

    return (
        <>
            <Row>
                <Col sm="12">
                    <b>Status Lowongan</b>
                </Col>
                <Col sm="12">
                    <CustomInput className="my-2" name="allJob" id="allJob" onChange={changeFilterStatus} checked={filters.status.length === 0} value="allJob" type="checkbox" label="Semua lowongan" />
                    <CustomInput className="my-2" name="published" id="published" onChange={changeFilterStatus} checked={filters.status.length > 0 && filters.status.includes("published")} value="published" type="checkbox" label="Publish" />
                    <CustomInput className="my-2" name="draft" id="draft" onChange={changeFilterStatus} checked={filters.status.length > 0 && filters.status.includes("draft")} value="draft" type="checkbox" label="Draft" />
                    <CustomInput className="my-2" name="expired" id="expired" onChange={changeFilterStatus} checked={filters.status.length > 0 && filters.status.includes("expired")} value="expired" type="checkbox" label="Kadaluarsa" />
                    <CustomInput className="my-2" name="closed" id="closed" onChange={changeFilterStatus} checked={filters.status.length > 0 && filters.status.includes("closed")} value="closed" type="checkbox" label="Ditutup" />
                </Col>
            </Row>
        </>
    )
})