import React from "react";
import { useCallback, memo } from "react";
import Select from 'react-select';
import { Row, Col } from "reactstrap";
import { useRecruitmentsFiltersCtx } from "../Context/RecruitmentContext";

export const EducationFilter = memo(() => {
    const [filters, setFilters] = useRecruitmentsFiltersCtx()

    const option = [
        { value: 'SD', label: 'SD' },
        { value: 'SMP', label: 'SMP' },
        { value: 'SMA', label: 'SMA' },
        { value: 'D1', label: 'D1' },
        { value: 'D2', label: 'D2' },
        { value: 'D3', label: 'D3' },
        { value: 'D4', label: 'D4' },
        { value: 'S1', label: 'S1' },
        { value: 'S2', label: 'S2' },
        { value: 'S3', label: 'S3' },
    ]

    const changeFilter = useCallback((e) => {
        setFilters(state => ({ ...state, educationApplicant: e }));
    }, [setFilters])

    return (
        <>
            <Row>
                <Col sm="12">
                    <b>Pendidikan Terakhir</b>
                </Col>
                <Col sm="12">
                    <Select
                        className="my-2"
                        name="jobtype"
                        id="jobtype"
                        options={option}
                        onChange={changeFilter}
                        isClearable={true}
                        isMulti
                        menuPosition="fixed"
                        value={filters.educationApplicant}
                    />
                </Col>
            </Row>
        </>
    )
})