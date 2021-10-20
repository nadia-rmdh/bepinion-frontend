import React, { useMemo } from 'react'
import Select from 'react-select';
import { useFilterProjectProfessionalsContext } from '../ProjectProfessionalsContext';
import useDataEducationFields from "../../../../../hooks/useDataEducationFields";

function EducationFieldFilter() {
    const [filter, setFilter] = useFilterProjectProfessionalsContext()

    const { data: getData } = useDataEducationFields();
    const educations = useMemo(() => getData.map(p => ({ label: p.name, value: p.id })), [getData])

    const handleChange = (e) => {
        setFilter(state => ({ ...state, education: e ?? [] }))
    }

    return (
        <>
            <div className="font-weight-bold mb-2 text-center">Education Field</div>
            <div className="px-3">
                <Select
                    closeMenuOnSelect={false}
                    options={educations}
                    isClearable
                    isMulti
                    placeholder="Choose some..."
                    onChange={(e) => handleChange(e)}
                    components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                    value={filter.education} />
            </div>
        </>
    )
}

export default EducationFieldFilter