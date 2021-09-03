import React, { useCallback, useMemo } from "react"
import { Card, CardBody, Row, Col } from "reactstrap";
import Select from 'react-select';
import { useFormik } from "formik";
import * as Yup from 'yup';
import useDataSectors from "../../../../hooks/useDataSectors";
import useDataSkills from "../../../../hooks/useDataSkills";

const colorSkills = [
    '#1372BA',
    '#5380a2',
    '#8453a2',
    '#53a276',
    '#a25353',
    '#bfb327',
    '#2733bf',
    '#27bf4f'
]

export default (props) => {
    const ValidationFormSchema = () => {
        return Yup.object().shape({
            sectors: Yup.array().min(1).max(3).label('Sector'),
            skills: Yup.array().min(1).max(5).label('Skills'),
        })
    }

    const { values: skillSectorData, touched, errors, setValues: setSkillSectorData, handleSubmit } = useFormik({
        initialValues: {
            sectors: [],
            skills: [],
        },
        validationSchema: ValidationFormSchema,
        onSubmit: (values, { setSubmitting, setErrors }) => {
            setSubmitting(true)
            props.onSubmitForm(values)
            props.nextStep();
        }
    })
    const colourStyles = {
        multiValue: (styles, { data }) => {
            const color = data.color;
            return {
                ...styles,
                backgroundColor: color,
            };
        },
        multiValueLabel: (styles, { data }) => ({
            ...styles,
            color: '#fff',
        }),
    };

    const { data: getSector } = useDataSectors();
    const sectors = useMemo(() => {
        const opt = []
        const dataSectors = getSector.map(p => ({ label: p.name, value: p.id }))
        dataSectors.map((v) => {
            const dataOptions = skillSectorData.sectors?.find(u => u.value === v.value);
            if (!dataOptions) opt.push({ ...v, color: colorSkills[Math.floor(Math.random() * colorSkills.length)] })
            return dataOptions;
        })

        return opt
    }, [skillSectorData.sectors, getSector])

    const { data: getSkills } = useDataSkills();
    const skills = useMemo(() => {
        const opt = []
        const dataSkills = getSkills.map(p => ({ label: p.name, value: p.id }))
        dataSkills.map((v) => {
            const dataOptions = skillSectorData.skills?.find(u => u.value === v.value);
            if (!dataOptions) opt.push({ ...v, color: colorSkills[Math.floor(Math.random() * colorSkills.length)] })
            return dataOptions;
        })

        return opt
    }, [skillSectorData.skills, getSkills])

    const handleChangeSector = useCallback((e) => {
        setSkillSectorData(old => ({ ...old, sectors: e ?? [] }))
    }, [setSkillSectorData])

    const handleChangeSkills = useCallback((e) => {
        setSkillSectorData(old => ({ ...old, skills: e ?? [] }))
    }, [setSkillSectorData])

    return (
        <Row>
            <Col xs="12">
                <Card className="shadow-sm">
                    <CardBody>
                        <Row className="px-5">
                            <Col xs="12" className="mb-3">
                                <div className="font-xl font-weight-bold text-uppercase">My Top 5 Skills</div>
                            </Col>
                            {/* <Col xs="12">
                                <Card className="shadow-sm">
                                    <CardBody>
                                        {skillSectorData.skills.map((skill, i) => (
                                            <Badge key={i} color={colorSkills[i]} className="text-uppercase font-sm mx-1 text-light">{skill.label}</Badge>
                                        ))}
                                    </CardBody>
                                </Card>
                            </Col> */}
                            <Col xs="12">
                                <Select
                                    closeMenuOnSelect={false}
                                    options={skills}
                                    isClearable
                                    isMulti
                                    placeholder="Choose some skills..."
                                    onChange={(e) => handleChangeSkills(e)}
                                    components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                    value={skillSectorData.skills}
                                    styles={colourStyles}
                                    isOptionDisabled={(option) => skillSectorData.skills.length >= 5}
                                />
                                {touched.skills && errors.skills && <small className="text-danger">{errors.skills}</small>}
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
            <Col xs="12">
                <Card className="shadow-sm">
                    <CardBody>
                        <Row className="px-5">
                            <Col xs="12">
                                <div className="font-xl font-weight-bold text-uppercase">My top 3 Sectors</div>
                            </Col>
                            <Col xs="12">
                                <Row className="my-3">
                                    <Col xs="12">
                                        <Select
                                            closeMenuOnSelect={false}
                                            options={sectors}
                                            isClearable
                                            isMulti
                                            placeholder="Choose some sectors..."
                                            onChange={(e) => handleChangeSector(e)}
                                            components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                                            value={skillSectorData.sectors}
                                            styles={colourStyles}
                                            isOptionDisabled={(option) => skillSectorData.sectors.length >= 3}
                                        />
                                        {touched.sectors && errors.sectors && <small className="text-danger">{errors.sectors}</small>}
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
}
