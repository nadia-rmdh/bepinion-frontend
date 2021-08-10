import React, { useCallback } from 'react'
import { InputGroup, InputGroupAddon, InputGroupText, CustomInput } from 'reactstrap'
import { useFilterProjectContext } from './../ProjectContext';

function CompletionDateFilter() {
    const [filter, setFilter] = useFilterProjectContext()

    const handleChange = useCallback((e) => {
        const { value, checked } = e.target;
        setFilter(state => ({ ...state, date: checked ? value : '' }));
    }, [setFilter])

    return (
        <>
            <div className="font-weight-bold mb-2 text-center">Completion Date</div>
            <div className="px-3">
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText className="bg-transparent border-0 px-0">
                            <CustomInput type="checkbox" id="thisWeek" value="thisWeek" checked={filter.date === 'thisWeek'} onChange={handleChange} />
                        </InputGroupText>
                    </InputGroupAddon>
                    <div className="d-flex bg-transparent p-1 align-items-center">
                        This Week
                    </div>
                </InputGroup>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText className="bg-transparent border-0 px-0">
                            <CustomInput type="checkbox" id="nextWeek" value="nextWeek" checked={filter.date === 'nextWeek'} onChange={handleChange} />
                        </InputGroupText>
                    </InputGroupAddon>
                    <div className="d-flex bg-transparent p-1 align-items-center">
                        Next Week
                    </div>
                </InputGroup>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText className="bg-transparent border-0 px-0">
                            <CustomInput type="checkbox" id="thisMonth" value="thisMonth" checked={filter.date === 'thisMonth'} onChange={handleChange} />
                        </InputGroupText>
                    </InputGroupAddon>
                    <div className="d-flex bg-transparent p-1 align-items-center">
                        This month
                    </div>
                </InputGroup>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText className="bg-transparent border-0 px-0">
                            <CustomInput type="checkbox" id="nextMonth" value="nextMonth" checked={filter.date === 'nextMonth'} onChange={handleChange} />
                        </InputGroupText>
                    </InputGroupAddon>
                    <div className="d-flex bg-transparent p-1 align-items-center">
                        Next month
                    </div>
                </InputGroup>
            </div>
        </>
    )
}

export default CompletionDateFilter