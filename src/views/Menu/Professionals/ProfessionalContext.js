import React, { createContext } from 'react'
import { useState } from 'react'
import { useContext } from 'react'

const filterProfessionalContext = createContext()
const setFilterProfessionalContext = createContext()

export default function FilterProfessionalProvider(props) {
    const [filterProfessionalCtx, setFilterProfessionalCtx] = useState({
        limit: 10,
        page: 0,
        project: '',
        sectors: [],
        exp: '',
        skills: [],
        sortExp: { label: 'Highest to Lowest', value: 'yearOfExperience_DESC' },
    })

    return (
        <setFilterProfessionalContext.Provider value={setFilterProfessionalCtx}>
            <filterProfessionalContext.Provider value={filterProfessionalCtx}>
                {props.children}
            </filterProfessionalContext.Provider>
        </setFilterProfessionalContext.Provider>
    )
}


export const useFilterProfessionalContext = () => {
    return [useContext(filterProfessionalContext), useContext(setFilterProfessionalContext)]
}