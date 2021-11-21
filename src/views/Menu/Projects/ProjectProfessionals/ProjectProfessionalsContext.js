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
        sortExp: null,
        sortCost: null,
        sortSkillsMatch: { label: 'Highest to Lowest', value: 'matchedSkills_DESC' },
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