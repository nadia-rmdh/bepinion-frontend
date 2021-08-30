import React, { useMemo } from 'react'
import Select from 'react-select';
import { useFilterProfessionalContext } from '../ProfessionalContext';
import useDataSkills from "../../../../hooks/useDataSkills";

function SkillsFilter() {
    const [filter, setFilter] = useFilterProfessionalContext()

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
                    placeholder="Choose some skills..."
                    onChange={(e) => handleChangeSkills(e)}
                    components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                    value={filter.skills} />
            </div>
        </>
    )
}

export default SkillsFilter