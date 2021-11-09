import React, { useMemo } from 'react'
import Select from 'react-select';
import { useFilterProjectProfessionalsContext } from '../ProjectProfessionalsContext';
import useDataEducationDegrees from '../../../../../hooks/useDataEducationDegrees';

function EducationFilter() {
    const [filter, setFilter] = useFilterProjectProfessionalsContext()

    const { data: getData } = useDataEducationDegrees();
    const degrees = useMemo(() => getData.map(p => ({ label: p.name, value: p.id })), [getData])

    const handleChangeEducation = (e) => {
        setFilter(state => ({ ...state, degree: e ?? [] }))
    }

    return (
        <>
            <div className="font-weight-bold mb-2 text-center">Academic Qualification</div>
            <div className="px-3">
                <Select
                    closeMenuOnSelect={false}
                    options={degrees}
                    isClearable
                    isMulti
                    onChange={(e) => handleChangeEducation(e)}
                    components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                    value={filter.degree} />
            </div>
        </>
    )
}

export default EducationFilter