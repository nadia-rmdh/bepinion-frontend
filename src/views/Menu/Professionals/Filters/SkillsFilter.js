import React from 'react'
import Select from 'react-select';
import { useFilterProfessionalContext } from '../ProfessionalContext';

function SkillsFilter() {
    const [filter, setFilter] = useFilterProfessionalContext()

    const skills = [
        { label: 'PHP', value: '1' },
        { label: 'Phyton', value: '2' },
        { label: 'Javascript', value: '3' },
        { label: 'Flutter', value: '4' },
        { label: 'Golang', value: '5' },
        { label: 'Laravel', value: '6' },
        { label: 'React JS', value: '7' },
        { label: 'Node JS', value: '8' },
        { label: 'React Native', value: '9' },
    ]

    const handleChangeSkills = (e) => {
        setFilter(state => ({ ...state, skills: e ?? [] }))
    }

    return (
        <>
            <div className="font-weight-bold mb-2 text-center">Skills Requirements</div>
            <div className="px-3">
                <Select
                    closeMenuOnSelect={false}
                    options={skills}
                    isClearable
                    isMulti
                    placeholder="Choose some skills..."
                    onChange={(e) => handleChangeSkills(e)}
                    components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                    value={filter.skills} />
            </div>
        </>
    )
}

export default SkillsFilter