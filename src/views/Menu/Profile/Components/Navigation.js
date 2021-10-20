import React, { useCallback } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

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
        if (props.role === 'company') {
            if (i === 1) return 'Company Information'
            if (i === 2) return 'Registrant Information'
            if (i === 3) return 'Document Verification'
        }
        if (props.role === 'individual') {
            if (i === 1) return 'Registrant Information'
            if (i === 2) return 'Document Verification'
        }
    }, [props.role])

    const dots = [];
    for (let i = 1; i <= props.totalSteps; i += 1) {
        dots.push(i);
    }

    return (
        <div className="register-nav mb-4">
            <div className={`mb-3 mb-md-3`}>
                <Nav tabs className="text-center border-bottom-0">
                    {dots.map((p, i) => (
                        <NavItem key={i}>
                            <NavLink className="profile-tabs-item" active={props.currentStep === i + 1} onClick={() => props.goToStep(i + 1)}>
                                {pageName(i + 1)}
                            </NavLink>
                        </NavItem>
                    ))}
                </Nav>
            </div>
        </div>
    );
};