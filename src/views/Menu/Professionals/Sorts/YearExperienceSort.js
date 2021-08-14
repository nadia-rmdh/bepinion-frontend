import React from 'react'
import Select from 'react-select';
import { useFilterProfessionalContext } from '../ProfessionalContext';

function YearExperienceSort() {
    const [filter, setFilter] = useFilterProfessionalContext()

    const sorts = [
        { label: 'Lowest to Highest', value: 'lowest' },
        { label: 'Highest to Lowest', value: 'highest' },
    ]

    const handleChange = (e) => {
        setFilter(state => ({ ...state, sortExp: e }))
    }

    return (
        <>
            <small className="font-weight-bold mb-2 text-center">Years of experience</small>
            <div className="px-3"></div>
            <Select
                isSearchable={false}
                options={sorts}
                onChange={(e) => handleChange(e)}
                components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                value={filter.sortExp} />
        </>
    )
}

export default YearExperienceSort