import React from 'react'
import { Button } from 'reactstrap';
import { useFilterProjectProfessionalsContext } from '../ProjectProfessionalsContext';

function ResetFilter() {
    const [, setFilter] = useFilterProjectProfessionalsContext()

    const handleReset = () => {
        setFilter(state => ({
            ...state,
            skills: [],
            sectors: [],
            exp: [],
            degree: [],
            education: [],
        }))
    }

    return (
        <Button color="danger" onClick={handleReset}>
            Reset Filter
        </Button>
    )
}

export default ResetFilter