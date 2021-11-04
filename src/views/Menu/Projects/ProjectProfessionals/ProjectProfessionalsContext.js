import React, { createContext } from 'react'
import { useState } from 'react'
import { useContext } from 'react'

const filterProjectProfessionalsContext = createContext()
const setFilterProjectProfessionalsContext = createContext()

export default function FilterProjectProfessionalsProvider(props) {
    const [filterProjectProfessionalsCtx, setFilterProjectProfessionalsCtx] = useState({
        limit: 10,
        page: 0,
        skills: [],
        sectors: [],
        exp: '',
        degree: [],
        education: [],
        fee: { min: 0, max: 0 },
        disableFee: true,
        sortExp: { label: 'Highest to Lowest', value: 'yearOfExperience_DESC' },
        sortCost: { label: 'Lowest to Highest', value: 'submittedCost_ASC' },
        sortSkillsMatch: { label: 'Lowest to Highest', value: 'matchedSkills_ASC' },
    })

    return (
        <setFilterProjectProfessionalsContext.Provider value={setFilterProjectProfessionalsCtx}>
            <filterProjectProfessionalsContext.Provider value={filterProjectProfessionalsCtx}>
                {props.children}
            </filterProjectProfessionalsContext.Provider>
        </setFilterProjectProfessionalsContext.Provider>
    )
}


export const useFilterProjectProfessionalsContext = () => {
    return [useContext(filterProjectProfessionalsContext), useContext(setFilterProjectProfessionalsContext)]
}