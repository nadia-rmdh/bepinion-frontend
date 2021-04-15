import React from "react";
import { useCallback, memo, useMemo } from "react";
import { Row, Col } from "reactstrap";
import Select from 'react-select';
import useSWR from "swr";
import { useRecruitmentsFiltersCtx } from "../Context/RecruitmentContext";

export const SelectJobFilter = memo(() => {
    const [filters, setFilters] = useRecruitmentsFiltersCtx()
    const { data: jobResponse, error: jobError } = useSWR('v1/recruitment/vacancies');
    const loadingJob = !jobResponse && !jobError;
    const job = useMemo(() => jobResponse?.data?.data ?? [], [jobResponse]);

    const optionJob = job.map(getJob =>
        ({ value: getJob.id, label: getJob.name })
    )

    const changeFilter = useCallback((e) => {
        setFilters(state => ({ ...state, selectJob: e }));
    }, [setFilters])

    return (
        <>
            <Row>
                <Col sm="12">
                    <b>Lowongan</b>
                </Col>
                <Col sm="12">
                    <Select
                        className="my-2"
                        name="jobtype"
                        id="jobtype"
                        options={optionJob}
                        onChange={changeFilter}
                        isClearable={true}
                        disabled={loadingJob}
                        isMulti
                        value={filters.selectJob}
                    />
                </Col>
            </Row>
        </>
    )
})