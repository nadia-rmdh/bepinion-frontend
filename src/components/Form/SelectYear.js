import React, { useMemo, useState } from 'react';
import Select from 'react-select';

const SelectYear = ({ start = 1900, end = (new Date().getFullYear()) + 1, name, id, value, onChanged, styles }) => {
    const [selected, setSelected] = useState(value)

    const options = useMemo(() => {
        const yearArr = []
        for (let year = start; year <= end; year++) {
            yearArr.push({ value: year, label: year })
        }

        return yearArr
    }, [start, end])

    const handleChange = (data) => {
        onChanged(data.value);
        setSelected({ 'value': data.value, 'label': data.label })
    }
    return (
        <Select name={name} id={id} value={selected} options={options} onChange={(e) => handleChange(e)}
            styles={styles}
        />
    );
}

export default SelectYear;
