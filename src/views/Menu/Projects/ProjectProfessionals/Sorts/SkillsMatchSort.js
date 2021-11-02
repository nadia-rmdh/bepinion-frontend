import React from 'react'
import Select from 'react-select';
import { useFilterProjectProfessionalsContext } from '../ProjectProfessionalsContext';

function SkillsMatchSort() {
    const [filter, setFilter] = useFilterProjectProfessionalsContext()

    const sorts = [
        { label: 'Lowest to Highest', value: 'matchedSkills_ASC' },
        { label: 'Highest to Lowest', value: 'matchedSkills_DESC' },
    ]

    const handleChange = (e) => {
        setFilter(state => ({ ...state, sortSkillsMatch: e }))
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
                value={filter.sortExp} />
        </>
    )
}

export default SkillsMatchSort