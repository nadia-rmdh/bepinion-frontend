import React, { createContext, useCallback, useContext } from 'react';

const LandingPageContext = createContext();

export const useLandingPageContext = () => {
    const { homeRef, aboutRef, faqRef, contactRef } = useContext(LandingPageContext);
    const scrollTo = useCallback((element) => {
        console.log(element)
        window.scrollTo({
            top: Number(element.offsetTop),
            left: 0,
            behavior: 'smooth'
        })
    }, []);
    return { homeRef, aboutRef, faqRef, contactRef, scrollTo };
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
    return <Component {...props} landingPageRefs={landingPageRefs} />
}