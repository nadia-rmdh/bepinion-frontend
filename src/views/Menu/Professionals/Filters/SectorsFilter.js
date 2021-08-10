import React from 'react'
import Select from 'react-select';
import { useFilterProfessionalContext } from '../ProfessionalContext';

function SectorsFilter() {
    const [filter, setFilter] = useFilterProfessionalContext()

    const sectors = [
        { label: 'Sector 1', value: 'sector_1' },
        { label: 'Sector 2', value: 'sector_2' },
        { label: 'Sector 3', value: 'sector_3' },
        { label: 'Sector 4', value: 'sector_4' },
        { label: 'Sector 5', value: 'sector_5' },
        { label: 'Sector 6', value: 'sector_6' },
    ]

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
                    placeholder="Choose some sectors..."
                    onChange={(e) => handleChangeSectors(e)}
                    components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                    value={filter.sectors} />
            </div>
        </>
    )
}

export default SectorsFilter