import React, { createContext } from 'react'
import { useState } from 'react'
import { useContext } from 'react'

const solvingContext = createContext()
const setSolvingContext = createContext()

export default function SolvingProvider(props) {
    const [solvingCtx, setSolvingCtx] = useState({
        file: null
    })

    return (
        <setSolvingContext.Provider value={setSolvingCtx}>
            <solvingContext.Provider value={solvingCtx}>
                {props.children}
            </solvingContext.Provider>
        </setSolvingContext.Provider>
    )
}

export const useSolvingContext = () => {
    return [useContext(solvingContext), useContext(setSolvingContext)]
}