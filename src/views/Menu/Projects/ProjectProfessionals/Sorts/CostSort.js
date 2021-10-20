import React from 'react'
import Select from 'react-select';
import { useFilterProjectProfessionalsContext } from '../ProjectProfessionalsContext';

function CostSort() {
    const [filter, setFilter] = useFilterProjectProfessionalsContext()

    const sorts = [
        { label: 'Lowest to Highest', value: 'submittedCost_ASC' },
        { label: 'Highest to Lowest', value: 'submittedCost_DESC' },
    ]

    const handleChange = (e) => {
        setFilter(state => ({ ...state, sortCost: e }))
    }

    return (
        <>
            <small className="font-weight-bold mb-2 text-center">Cost</small>
            <div className="px-3"></div>
            <Select
                isSearchable={false}
                options={sorts}
                onChange={(e) => handleChange(e)}
                components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                value={filter.sortCost} />
        </>
    )
}

export default CostSort