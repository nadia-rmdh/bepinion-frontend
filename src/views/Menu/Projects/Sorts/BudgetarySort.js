import React from 'react'
import Select from 'react-select';
import { useFilterProjectContext } from '../ProjectContext';

function BudgetarySort() {
    const [filter, setFilter] = useFilterProjectContext()

    const budgetary = [
        { label: 'Highest to Lowest', value: 'budget_DESC' },
        { label: 'Lowest to Highest', value: 'budget_ASC' },
    ]

    const handleChange = (e) => {
        setFilter(state => ({ ...state, sortClosing: null, sortDuration: null, sortSkill: null, sortBudgetary: e }))
    }

    return (
        <>
            <small className="font-weight-bold mb-2 text-center">Budgetary</small>
            <div className="px-3"></div>
            <Select
                isSearchable={false}
                options={budgetary}
                onChange={(e) => handleChange(e)}
                components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                value={filter.sortBudgetary} />
        </>
    )
}

export default BudgetarySort