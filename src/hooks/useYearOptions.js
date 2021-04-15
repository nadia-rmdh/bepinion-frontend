import React, { useMemo } from 'react'


const defaultYearEnd = (new Date).getFullYear() + 1

export function useYearOptions(start = 1900, end = defaultYearEnd) {

    const options = useMemo(() => {
        const yearArr = []
        for (let year = start; year <= end; year++) {
            yearArr.push({ value: year, label: year })
        }

        return yearArr
    })

    return options
}

export function withYearOptions(start = 1900, end = defaultYearEnd) {

    return (Component) => (props) => {
        const options = useYearOptions(start, end)

        return <Component yearOptions={options} {...props}/>
    }
}
