import React from 'react'
import Select from 'react-select';
import { useFilterProjectContext } from '../ProjectContext';

function SkillMatchSort() {
    const [filter, setFilter] = useFilterProjectContext()

    const skill = [
        { label: 'Highest skill to Lowest skill', value: 'highest' },
        { label: 'Lowest skill to Highest skill', value: 'lowest' },
    ]

    const handleChange = (e) => {
        setFilter(state => ({ ...state, sortSkill: e }))
    }

    return (
        <>
            <small className="font-weight-bold mb-2 text-center">Skill Match</small>
            <div className="px-3"></div>
            <Select
                isSearchable={false}
                options={skill}
                onChange={(e) => handleChange(e)}
                components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                value={filter.sortSkill} />
        </>
    )
}

export default SkillMatchSort