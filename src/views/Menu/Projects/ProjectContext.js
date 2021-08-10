import React, { createContext } from 'react'
import { useState } from 'react'
import { useContext } from 'react'

const filterProjectContext = createContext()
const setFilterProjectContext = createContext()

export default function FilterProjectProvider(props) {
    const [filterProjectCtx, setFilterProjectCtx] = useState({
        sectors: [],
        date: [],
        exp: [],
        skills: [],
        sortClosing: { label: 'Newest to Oldest', value: 'newest' }, sortDuration: { label: 'Longest to Shortest', value: 'longest' }, sortBudgetary: { label: 'Highest to Lowest', value: 'highest' }, sortSkill: { label: 'Highest to Lowest', value: 'highest' },
    })

    return (
        <setFilterProjectContext.Provider value={setFilterProjectCtx}>
            <filterProjectContext.Provider value={filterProjectCtx}>
                {props.children}
            </filterProjectContext.Provider>
        </setFilterProjectContext.Provider>
    )
}


export const useFilterProjectContext = () => {
    return [useContext(filterProjectContext), useContext(setFilterProjectContext)]
}