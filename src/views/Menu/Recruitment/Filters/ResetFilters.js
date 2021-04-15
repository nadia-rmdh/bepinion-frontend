import React, { memo, useCallback } from "react";
import { Row, Col, Button } from "reactstrap";
import { useRecruitmentsFiltersCtx } from "../Context/RecruitmentContext";

export const ResetFilters = memo(() => {
    const [, setFilters] = useRecruitmentsFiltersCtx()

    const handleReset = useCallback(() => {
        setFilters(old => ({
            ...old,
            searchJob: '', searchApplicant: '',
            status: [], statusApplicant: [],
            type: [],
            genderApplicant: [],
            educationApplicant: [],
            selectJob: [],
            date: {
                start: '',
                end: '',
            },
            salary: {
                min: 0,
                max: 50000000
            }
        }))
    }, [setFilters])

    return (
        <>
            <Row>
                <Col sm="12">
                    <div className="text-center mt-2">
                        <Button onClick={handleReset} className="button-reset btn btn-sm btn-outline-netis-primary px-5 mx-auto">
                            Reset Filter
                        </Button>
                    </div>
                </Col>
            </Row>
        </>
    )
})