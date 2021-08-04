import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Select from 'react-select'
import noProject from '../../../../assets/img/no-project.png'
import { badgeStatus } from '../ProjectCard'

function SearchComponent({data}){
    const history = useHistory()
    const [filter, setFilter] = useState("")
    const onErrorImage = (e) => {
        e.target.src = noProject;
        e.target.onerror = null;
    }

    const options = data.map((item, idx) => ({
        id:item?.code,
        value:item?.title,
        label:
        <div key={idx} className="my-2 d-flex align-items-center">
            <img src={item?.media[0]?.storage} width={35} height={35} alt="profile" className="project-photo-review rounded mr-1" onError={(e) => onErrorImage(e)} style={{ objectFit: 'cover' }} />
            <div className="text-left ml-2">
                <h6 className="font-weight-bold ml-2">{item?.title}</h6>
                <span className="ml-2">
                    {badgeStatus(item?.status)}
                </span>
            </div>
        </div>
    }))
    // const filtered = options?.filter(item => item?.value?.toUppercase().includes(filter?.toUppercase()))

    const handleSearchChange = (e) => {
        setFilter(e)
    }
    const handleClickCode = (e) => {
        history.push(`/project/${e.id}`)
    }

    return(
        <div style={{maxWidth:'600px'}} className="ml-auto">
            <Select
                isSearchable={true}
                closeMenuOnSelect={false}
                menuIsOpen={Boolean(filter)}
                options={options}
                onInputChange={handleSearchChange}
                onChange={handleClickCode}
                components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                placeholder="Cari nama proyek..."
                className="shadow-sm"
            />
        </div>
    )
}

export default SearchComponent