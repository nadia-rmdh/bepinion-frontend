import React, { useEffect, useState } from 'react'
import { useFilterProjectProfessionalsContext } from '../ProjectProfessionalsContext';
import InputRange from 'react-input-range';
import "react-input-range/lib/css/index.css";
import { CustomInput } from 'reactstrap';
import { convertToRupiah } from '../../../../../utils/formatter';

function FeeFilter({ min, max, ecv }) {
    const [filter, setFilter] = useFilterProjectProfessionalsContext()
    const [defaultValue, setDefaultValue] = useState({ min: min, max: max });

    useEffect(() => {
        setDefaultValue({ min: min, max: max })
        setFilter(state => ({ ...state, fee: { min: min, max: max } }))
    }, [setDefaultValue, min, max, setFilter]);

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
                    formatLabel={(value) => convertToRupiah(value)}
                    maxValue={max}
                    minValue={min}
                    value={defaultValue}
                    onChange={handleChange}
                    onChangeComplete={handleComplete} />
            </div>
            <div className="px-1 my-1">
                <small className="text-muted">Minimum Contract Value</small>
                <div className="text-center">{convertToRupiah(min)}</div>
            </div>
            <div className="px-1 my-1">
                <small className="text-muted">Estimated Contract Value</small>
                <div className="text-center">{convertToRupiah(ecv)}</div>
            </div>
            <div className="px-1 my-1 d-flex">
                <CustomInput type="checkbox" checked={filter.disableFee} onChange={handleChangeCheckbox} id="dueDateCheckbox" /> Remove proposal above estimated contract value
            </div>
        </>
    )
}

export default FeeFilter