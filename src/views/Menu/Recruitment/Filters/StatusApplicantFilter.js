import React from "react";
import { useCallback, memo } from "react";
import { CustomInput, Row, Col } from "reactstrap";
import { useRecruitmentsFiltersCtx } from "../Context/RecruitmentContext";

export const StatusApplicantFilter = memo(() => {
    const [filters, setFilters] = useRecruitmentsFiltersCtx()

    const changeFilterStatus = useCallback((e) => {
        const { value, checked } = e.target;
        if (value === "allApplicant") {
            setFilters(state => ({ ...state, statusApplicant: [] }));
        }
        else {
            let arr = filters.statusApplicant;
            arr.push(value);
            const set = new Set(arr);
            if (!checked) {
                set.delete(value);
            }
            const setArr = Array.from(set);
            setFilters(state => ({ ...state, statusApplicant: setArr }));
        }
    }, [setFilters, filters.statusApplicant])

    return (
        <>
            <Row>
                <Col sm="12">
                    <b>Status Lamaran</b>
                </Col>
                <Col sm="12">
                    <CustomInput className="my-2" name="allApplicant" id="allApplicant" onChange={changeFilterStatus} checked={filters.statusApplicant.length === 0} value="allApplicant" type="checkbox" label="Semua pelamar" />
                    <CustomInput className="my-2" name="pending" id="pending" onChange={changeFilterStatus} checked={filters.statusApplicant.length > 0 && filters.statusApplicant.includes("pending")} value="pending" type="checkbox" label="Belum diproses" />
                    <CustomInput className="my-2" name="accepted" id="accepted" onChange={changeFilterStatus} checked={filters.statusApplicant.length > 0 && filters.statusApplicant.includes("accepted")} value="accepted" type="checkbox" label="Sesuai" />
                    <CustomInput className="my-2" name="rejected" id="rejected" onChange={changeFilterStatus} checked={filters.statusApplicant.length > 0 && filters.statusApplicant.includes("rejected")} value="rejected" type="checkbox" label="Belum Sesuai" />
                </Col>
            </Row>
        </>
    )
})