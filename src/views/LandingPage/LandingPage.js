import React, { useRef } from 'react';
import { LandingPageProvider } from './context';
import { translate } from "react-switch-lang";
import Home from './Home';
import PageLayout from './PageLayout';
import About from './About';
import Contact from './ContactUs';

function LandingPage() {

    const homeRef = useRef();
    const aboutRef = useRef();
    const contactRef = useRef();

    return (
        <LandingPageProvider value={{ homeRef, aboutRef, contactRef }}>
            <PageLayout>
                <Home ref={homeRef} />
                <About ref={aboutRef} />
                <Contact ref={contactRef} />
            </PageLayout>
        </LandingPageProvider>
    )
}

export default translate(LandingPage);
