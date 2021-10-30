import React, { useMemo } from 'react'
import Select from 'react-select';
import { useFilterProjectProfessionalsContext } from '../ProjectProfessionalsContext';
import useDataSectors from "../../../../../hooks/useDataSectors";

function SectorsFilter() {
    const [filter, setFilter] = useFilterProjectProfessionalsContext()

    const { data: getSector } = useDataSectors();
    const sectors = useMemo(() => getSector.map(p => ({ label: p.name, value: p.id })), [getSector])

    const handleChangeSectors = (e) => {
        setFilter(state => ({ ...state, sectors: e ?? [] }))
    }

    return (
        <>
            <div className="font-weight-bold mb-2 text-center">Sector</div>
            <div className="px-3">
                <Select
                    closeMenuOnSelect={false}
                    options={sectors}
                    isClearable
                    isMulti
                    onChange={(e) => handleChangeSectors(e)}
                    components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                    value={filter.sectors} />
            </div>
        </>
    )
}

export default SectorsFilter