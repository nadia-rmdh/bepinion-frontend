import React, { createContext, useCallback, useContext } from 'react';

const LandingPageContext = createContext();

export const useLandingPageContext = () => {
    const { homeRef, featureRef, pricingRef } = useContext(LandingPageContext);
    const scrollTo = useCallback((element) => {
        window.scrollTo({
            top: Number(element.offsetTop) - 80,
            left: 0,
            behavior: 'smooth'
        })
    }, []);
    return { homeRef, featureRef, pricingRef, scrollTo };
}

export const LandingPageProvider = ({ value, children }) => {
    return (
    <LandingPageContext.Provider value={value}>
        {children}
    </LandingPageContext.Provider>
)

}

export const withLandingPageContext = (Component) => (props) => {
    const landingPageRefs = useLandingPageContext();
    return <Component {...props} landingPageRefs={landingPageRefs}/>
}