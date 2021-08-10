import React from 'react'
import Select from 'react-select';
import { useFilterProjectContext } from './../ProjectContext';

function SkillsFilter() {
    const [filter, setFilter] = useFilterProjectContext()

    const skills = [
        { label: 'PHP', value: 'php' },
        { label: 'Phyton', value: 'phyton' },
        { label: 'Javascript', value: 'javascript' },
        { label: 'Flutter', value: 'flutter' },
        { label: 'Golang', value: 'golang' },
        { label: 'Laravel', value: 'laravel' },
        { label: 'React JS', value: 'reactjs' },
        { label: 'Node JS', value: 'nodejs' },
        { label: 'React Native', value: 'reactnative' },
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