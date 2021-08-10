import React from 'react'
import Select from 'react-select';
import { useFilterProjectContext } from '../ProjectContext';

function BudgetarySort() {
    const [filter, setFilter] = useFilterProjectContext()

    const budgetary = [
        { label: 'Lowest to Highest', value: 'lowest' },
        { label: 'Highest to Lowest', value: 'highest' },
    ]

    const handleChange = (e) => {
        setFilter(state => ({ ...state, sortSkill: e }))
    }

    return (
        <>
            <small className="font-weight-bold mb-2 text-center">Budgetary</small>
            <div className="px-3"></div>
            <Select
                closeMenuOnSelect={false}
                options={budgetary}
                onChange={(e) => handleChange(e)}
                components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                value={filter.sortBudgetary} />
        </>
    )
}

export default BudgetarySort