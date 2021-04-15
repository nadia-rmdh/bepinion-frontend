import React, { createContext } from 'react'
import { useState } from 'react'
import { useContext } from 'react'

const filtersContext = createContext()
const setFiltersContext = createContext()

export default function RecruitmentsFiltersProvider(props) {
    const [filters, setFilters] = useState({
        searchJob: '', searchApplicant: '',
        status: [], statusApplicant: [],
        type: [],
        genderApplicant: [],
        educationApplicant: [],
        selectJob: [],
        date: {
            start: '',
            end: '',
        },
        salary: {
            min: 0,
            max: 50000000
        },
        paginationJobs: 0,
        paginationApplicants: 0,
    })

    return (
        <setFiltersContext.Provider value={setFilters}>
            <filtersContext.Provider value={filters}>
                {props.children}
            </filtersContext.Provider>
        </setFiltersContext.Provider>
    )
}

export const useRecruitmentsFiltersCtx = () => {
    return [useContext(filtersContext), useContext(setFiltersContext)]
}