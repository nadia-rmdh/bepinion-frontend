import React from "react";
import { useEffect, useState, memo } from "react";
import InputRange from "react-input-range";
import { Row, Col, Input, Label } from "reactstrap";
import { convertNumber } from "../../../../utils/formatter";
import { useRecruitmentsFiltersCtx } from "../Context/RecruitmentContext";

export const SalaryJobFilters = memo(({ showInputRange = true }) => {
    const [filters, setFilters] = useRecruitmentsFiltersCtx()
    const [salary, setSalary] = useState({
        min: filters.salary.min,
        max: filters.salary.max
    })

    useEffect(() => {
        setFilters(state => ({ ...state, salary: salary }));
    }, [salary, setFilters])

    return (
        <>
            <Row className="d-flex justify-content-between mt-1">
                <Col sm="12">
                    <b>Rentan Gaji</b>
                </Col>
                <Col sm="12" className={`${showInputRange ? '' : 'd-none'} my-3`}>
                    <div className="px-1 my-2">
                        <InputRange
                            maxValue={100000000}
                            value={filters.salary}
                            formatLabel={salary => `${convertNumber(salary)}`}
                            onChange={(value) => {
                                setSalary(value)
                            }}
                            onChangeComplete={(value) => {
                                setSalary(value)
                            }}
                        />
                    </div>
                </Col>
                <Col xs="6">
                    <Label htmlFor="setMin"><small>Min.</small></Label>
                    <Input
                        type="number"
                        inputMode="numeric"
                        id="setMin"
                        name="setMin"
                        value={filters.salary.min}
                        onChange={(e) => setSalary({ ...salary, min: parseInt(e.target.value) })}
                    />
                </Col>
                <Col xs="6">
                    <Label htmlFor="setMax"><small>Max.</small></Label>
                    <Input
                        type="number"
                        inputMode="numeric"
                        id="setMax"
                        name="setMax"
                        value={filters.salary.max}
                        onChange={(e) => setSalary({ ...salary, max: parseInt(e.target.value) })}
                    />
                </Col>
            </Row>
        </>
    )

})