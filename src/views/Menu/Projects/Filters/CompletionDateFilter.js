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
                            <CustomInput type="checkbox" id="this-week" value="this-week" checked={filter.date === 'this-week'} onChange={handleChange} />
                        </InputGroupText>
                    </InputGroupAddon>
                    <div className="d-flex bg-transparent p-1 align-items-center">
                        This Week
                    </div>
                </InputGroup>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText className="bg-transparent border-0 px-0">
                            <CustomInput type="checkbox" id="next-week" value="next-week" checked={filter.date === 'next-week'} onChange={handleChange} />
                        </InputGroupText>
                    </InputGroupAddon>
                    <div className="d-flex bg-transparent p-1 align-items-center">
                        Next Week
                    </div>
                </InputGroup>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText className="bg-transparent border-0 px-0">
                            <CustomInput type="checkbox" id="this-month" value="this-month" checked={filter.date === 'this-month'} onChange={handleChange} />
                        </InputGroupText>
                    </InputGroupAddon>
                    <div className="d-flex bg-transparent p-1 align-items-center">
                        This month
                    </div>
                </InputGroup>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText className="bg-transparent border-0 px-0">
                            <CustomInput type="checkbox" id="next-month" value="next-month" checked={filter.date === 'next-month'} onChange={handleChange} />
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