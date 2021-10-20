import React, { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { ArcherContainer, ArcherElement } from 'react-archer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const NavigationDot = (props) => {
    const pageName = useCallback((i) => {
        if (props.role === 'professional') {
            if (i === 1) return 'Registrant Information'
            if (i === 2) return 'Education'
            if (i === 3) return 'Work Experience'
            if (i === 4) return 'Project Experience'
            if (i === 5) return 'Skill'
            if (i === 6) return 'Document Verification'
        }
        if (props.role === 'business') {
            if (i === 1) return 'Company Information'
            if (i === 2) return 'Registrant Information'
            if (i === 3) return 'Document Verification'
        }
        if (props.role === 'individual') {
            if (i === 1) return 'Registrant Information'
            if (i === 2) return 'Document Verification'
        }
    }, [props.role])

    const pageIcon = useCallback((i) => {
        if (props.role === 'professional') {
            if (i === 1) return 'user'
            if (i === 2) return 'university'
            if (i === 3) return 'building'
            if (i === 4) return 'laptop-house'
            if (i === 5) return 'briefcase'
            if (i === 6) return 'book'
        }
        if (props.role === 'business') {
            if (i === 1) return 'building'
            if (i === 2) return 'user'
            if (i === 3) return 'book'
        }
        if (props.role === 'individual') {
            if (i === 1) return 'user'
            if (i === 2) return 'book'
        }
    }, [props.role])

    const dots = [];
    for (let i = 1; i <= props.totalSteps; i += 1) {
        dots.push(i);
    }

    return (
        <div className="register-nav mb-4">
            <div className={`mb-3 mb-md-3 mx-auto`} style={{ width: '80%' }}>
                <ArcherContainer>
                    <Row>
                        {dots.map((p, i) => (
                            <Col className="text-center" key={i}>
                                <ArcherElement
                                    id={`step-${i}`}
                                    relations={i + 1 !== props.totalSteps ? [
                                        {
                                            targetId: `step-${i + 1}`,
                                            targetAnchor: 'middle',
                                            sourceAnchor: 'middle',
                                            style: { strokeColor: '#f7b190', strokeWidth: 5, endMarker: false },
                                        },
                                    ] : []}
                                >
                                    <div
                                        className={`mx-auto round-100 text-center d-flex justify-content-center align-items-center`}
                                        style={{ backgroundColor: props.currentStep === i + 1 ? '#f7b190' : '#fff', border: 'solid 1px #f7b190', width: '60px', height: '60px' }}
                                    // onClick={() => props.goToStep(i + 1)}
                                    >
                                        <FontAwesomeIcon icon={pageIcon(i + 1)} color={`${props.currentStep === i + 1 ? '#fff' : '#f7b190'}`} size="2x" />
                                    </div>
                                </ArcherElement>
                                <span className="mt-2">
                                    <br />
                                    {pageName(i + 1)}
                                </span>
                            </Col>
                        ))}
                    </Row>
                </ArcherContainer>
            </div>
        </div>
    );
};

export const NavigationPage = (props) => {
    const location = useLocation();
    return (
        <div className={`d-flex ${(location.hash !== '#registrantInformation' || location.hash === '#companyInformation') && location.hash !== '#documentVerification' ? 'justify-content-between' : (location.hash === '#registrantInformation' || location.hash === '#companyInformation' ? 'justify-content-end' : '')}`}>
            {(location.hash !== '#registrantInformation' || location.hash === '#companyInformation') && <Button color="primary" onClick={props.SW.previousStep}>Previous</Button>}
            {location.hash !== '#documentVerification' && <Button color="primary" onClick={props.SW.nextStep}>Next</Button>}
        </div>
    )
};

export const Stats = ({
    currentStep,
    firstStep,
    goToStep,
    lastStep,
    nextStep,
    previousStep,
    totalSteps,
    step,
}) => (
    <div className={`d-flex ${step > 1 ? 'justify-content-between' : (step === 1 ? 'justify-content-end' : '')}`}>
        {step > 1 &&
            <Button color="primary" type="submit" onClick={previousStep}>Back</Button>
        }
        {step < totalSteps && step !== totalSteps &&
            <Button color="primary" type="submit" onClick={nextStep}>Next</Button>
        }
        {step === totalSteps &&
            <Button color="primary" type="submit" onClick={nextStep}>Finish</Button>
        }
    </div>
);