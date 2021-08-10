import React from 'react'
import Select from 'react-select';
import { useFilterProjectContext } from '../ProjectContext';

function DurationSort() {
    const [filter, setFilter] = useFilterProjectContext()

    const duration = [
        { label: 'Shortest to Longest', value: 'shortest' },
        { label: 'Longest to Shortest', value: 'longest' },
    ]

    const handleChange = (e) => {
        setFilter(state => ({ ...state, sortSkill: e }))
    }

    return (
        <>
            <small className="font-weight-bold mb-2 text-center">Duration</small>
            <div className="px-3"></div>
            <Select
                closeMenuOnSelect={false}
                options={duration}
                onChange={(e) => handleChange(e)}
                components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                value={filter.sortDuration} />
        </>
    )
}

export default DurationSort