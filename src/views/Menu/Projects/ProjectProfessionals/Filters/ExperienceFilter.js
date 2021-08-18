import React, { useCallback } from 'react'
import { InputGroup, InputGroupAddon, InputGroupText, CustomInput } from 'reactstrap'
import { useFilterProjectProfessionalsContext } from '../ProjectProfessionalsContext';

function ExperienceFilter() {
    const [filter, setFilter] = useFilterProjectProfessionalsContext()

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
                            <CustomInput type="checkbox" id="less3" value="less3" checked={filter.exp === 'less3'} onChange={handleChange} />
                        </InputGroupText>
                    </InputGroupAddon>
                    <div className="d-flex bg-transparent p-1 align-items-center">
                        Less than 3 years
                    </div>
                </InputGroup>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText className="bg-transparent border-0 px-0">
                            <CustomInput type="checkbox" id="3of5" value="3of5" checked={filter.exp === '3of5'} onChange={handleChange} />
                        </InputGroupText>
                    </InputGroupAddon>
                    <div className="d-flex bg-transparent p-1 align-items-center">
                        3-5 years
                    </div>
                </InputGroup>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText className="bg-transparent border-0 px-0">
                            <CustomInput type="checkbox" id="6of10" value="6of10" checked={filter.exp === '6of10'} onChange={handleChange} />
                        </InputGroupText>
                    </InputGroupAddon>
                    <div className="d-flex bg-transparent p-1 align-items-center">
                        6-10 years
                    </div>
                </InputGroup>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText className="bg-transparent border-0 px-0">
                            <CustomInput type="checkbox" id="10of20" value="10of20" checked={filter.exp === '10of20'} onChange={handleChange} />
                        </InputGroupText>
                    </InputGroupAddon>
                    <div className="d-flex bg-transparent p-1 align-items-center">
                        10-20 years
                    </div>
                </InputGroup>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText className="bg-transparent border-0 px-0">
                            <CustomInput type="checkbox" id="more20" value="more20" checked={filter.exp === 'more20'} onChange={handleChange} />
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