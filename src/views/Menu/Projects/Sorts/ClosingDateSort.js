import React from 'react'
import Select from 'react-select';
import { useFilterProjectContext } from '../ProjectContext';

function ClosingDateSort() {
    const [filter, setFilter] = useFilterProjectContext()

    const closing = [
        { label: 'Newest to Oldest', value: 'newest' },
        { label: 'Oldest to Newest', value: 'oldest' },
    ]

    const handleChange = (e) => {
        setFilter(state => ({ ...state, sortSkill: e }))
    }

    return (
        <>
            <small className="font-weight-bold mb-2 text-center">Closing Date</small>
            <div className="px-3"></div>
            <Select
                closeMenuOnSelect={false}
                options={closing}
                onChange={(e) => handleChange(e)}
                components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                value={filter.sortClosing} />
        </>
    )
}

export default ClosingDateSort