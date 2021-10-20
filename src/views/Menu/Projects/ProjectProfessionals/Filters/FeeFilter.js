import React, { useEffect, useState } from 'react'
import { useFilterProjectProfessionalsContext } from '../ProjectProfessionalsContext';
import InputRange from 'react-input-range';
import "react-input-range/lib/css/index.css";
import { CustomInput } from 'reactstrap';

function FeeFilter({ min, max }) {
    const [filter, setFilter] = useFilterProjectProfessionalsContext()
    const [defaultValue, setDefaultValue] = useState({ min: min + 100, max: max - 100 });

    useEffect(() => {
        setDefaultValue({ min: min + 100, max: max - 100 })
    }, [setDefaultValue, min, max]);

    const handleChange = (e) => {
        setDefaultValue(e)
    }

    const handleComplete = (e) => {
        setFilter(state => ({ ...state, fee: e }))
    }

    const handleChangeCheckbox = (e) => {
        const { checked } = e.target;

        setFilter(state => ({ ...state, disableFee: checked }))
    }

    return (
        <>
            <div className="font-weight-bold mb-4 text-center">Proposed Service Fees</div>
            <div className="px-3 mb-4">
                <InputRange
                    maxValue={max}
                    minValue={min}
                    value={defaultValue}
                    onChange={handleChange}
                    onChangeComplete={handleComplete} />
            </div>
            <div className="px-1 d-flex">
                <CustomInput type="checkbox" checked={filter.disableFee} onChange={handleChangeCheckbox} id="dueDateCheckbox" /> Remove proposal above estimated contract value
            </div>
        </>
    )
}

export default FeeFilter