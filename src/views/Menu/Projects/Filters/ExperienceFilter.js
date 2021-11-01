import React, { useCallback } from 'react'
import { InputGroup, InputGroupAddon, InputGroupText, CustomInput } from 'reactstrap'
import { useFilterProjectContext } from './../ProjectContext';

function ExperienceFilter() {
    const [filter, setFilter] = useFilterProjectContext()

    const handleChange = useCallback((e) => {
        const { value, checked } = e.target;
        setFilter(state => ({ ...state, exp: checked ? value : '' }));
    }, [setFilter])

    return (
        <>
            <div className="font-weight-bold mb-2 text-center">Years of experience</div>
            <div className="px-3">
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText className="bg-transparent border-0 px-0">
                            <CustomInput type="checkbox" id="<3" value="<3" checked={filter.exp === '<3'} onChange={handleChange} />
                        </InputGroupText>
                    </InputGroupAddon>
                    <div className="d-flex bg-transparent p-1 align-items-center">
                        Less than 3 years
                    </div>
                </InputGroup>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText className="bg-transparent border-0 px-0">
                            <CustomInput type="checkbox" id="3-6" value="3-6" checked={filter.exp === '3-6'} onChange={handleChange} />
                        </InputGroupText>
                    </InputGroupAddon>
                    <div className="d-flex bg-transparent p-1 align-items-center">
                        3-5 years
                    </div>
                </InputGroup>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText className="bg-transparent border-0 px-0">
                            <CustomInput type="checkbox" id="6-10" value="6-10" checked={filter.exp === '6-10'} onChange={handleChange} />
                        </InputGroupText>
                    </InputGroupAddon>
                    <div className="d-flex bg-transparent p-1 align-items-center">
                        6-10 years
                    </div>
                </InputGroup>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText className="bg-transparent border-0 px-0">
                            <CustomInput type="checkbox" id="10-20" value="10-20" checked={filter.exp === '10-20'} onChange={handleChange} />
                        </InputGroupText>
                    </InputGroupAddon>
                    <div className="d-flex bg-transparent p-1 align-items-center">
                        10-20 years
                    </div>
                </InputGroup>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText className="bg-transparent border-0 px-0">
                            <CustomInput type="checkbox" id=">20" value=">20" checked={filter.exp === '>20'} onChange={handleChange} />
                        </InputGroupText>
                    </InputGroupAddon>
                    <div className="d-flex bg-transparent p-1 align-items-center">
                        More than 20 years
                    </div>
                </InputGroup>
            </div>
        </>
    )
}

export default ExperienceFilter