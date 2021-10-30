import React, { useMemo } from 'react'
import Select from 'react-select';
import { useFilterProjectContext } from './../ProjectContext';
import useDataSkills from "../../../../hooks/useDataSkills";

function SkillsFilter() {
    const [filter, setFilter] = useFilterProjectContext()

    const { data: getSkills } = useDataSkills();
    const skills = useMemo(() => getSkills.map(p => ({ label: p.name, value: p.id })), [getSkills])

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
                    onChange={(e) => handleChangeSkills(e)}
                    components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                    value={filter.skills} />
            </div>
        </>
    )
}

export default SkillsFilter