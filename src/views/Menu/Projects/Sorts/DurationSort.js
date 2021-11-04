import React from 'react'
import Select from 'react-select';
import { useFilterProjectContext } from '../ProjectContext';

function DurationSort() {
    const [filter, setFilter] = useFilterProjectContext()

    const duration = [
        { label: 'Longest to Shortest', value: 'duration_DESC' },
        { label: 'Shortest to Longest', value: 'duration_ASC' },
    ]

    const handleChange = (e) => {
        setFilter(state => ({ ...state, sortClosing: null, sortSkill: null, sortBudgetary: null, sortDuration: e }))
    }

    return (
        <>
            <small className="font-weight-bold mb-2 text-center">Meeting Duration</small>
            <div className="px-3"></div>
            <Select
                isSearchable={false}
                options={duration}
                onChange={(e) => handleChange(e)}
                components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                value={filter.sortDuration} />
        </>
    )
}

export default DurationSort