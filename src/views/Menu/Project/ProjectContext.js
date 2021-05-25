import React, { createContext } from 'react'
import { useState } from 'react'
import { useContext } from 'react'

const projectContext = createContext()
const setProjectContext = createContext()

export default function ProjectProvider(props) {
    const [projectCtx, setProjectCtx] = useState({
        file: null
    })

    return (
        <setProjectContext.Provider value={setProjectCtx}>
            <projectContext.Provider value={projectCtx}>
                {props.children}
            </projectContext.Provider>
        </setProjectContext.Provider>
    )
}

export const useProjectContext = () => {
    return [useContext(projectContext), useContext(setProjectContext)]
}