import React from 'react'
import Select from 'react-select';
import { useFilterProjectContext } from '../ProjectContext';

function ClosingDateSort() {
    const [filter, setFilter] = useFilterProjectContext()

    const closing = [
        { label: 'Oldest to Newest', value: 'closingDate_DESC' },
        { label: 'Newest to Oldest', value: 'closingDate_ASC' },
    ]

    const handleChange = (e) => {
        setFilter(state => ({ ...state, sortSkill: null, sortDuration: null, sortBudgetary: null, sortClosing: e }))
    }

    return (
        <>
            <small className="font-weight-bold mb-2 text-center">Closing Date</small>
            <div className="px-3"></div>
            <Select
                isSearchable={false}
                options={closing}
                onChange={(e) => handleChange(e)}
                components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                value={filter.sortClosing} />
        </>
    )
}

export default ClosingDateSort