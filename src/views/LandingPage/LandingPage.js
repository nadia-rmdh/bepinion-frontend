import React, { useRef } from 'react';
import { LandingPageProvider } from './context';
import { translate } from "react-switch-lang";
import Home from './Home';
import PageLayout from './PageLayout';
import About from './About';
import Contact from './ContactUs';
import FAQ from './FAQ';

function LandingPage() {

    const homeRef = useRef();
    const aboutRef = useRef();
    const faqRef = useRef();
    const contactRef = useRef();

    return (
        <LandingPageProvider value={{ homeRef, aboutRef, faqRef, contactRef }}>
            <PageLayout>
                <Home ref={homeRef} />
                <About ref={aboutRef} />
                <FAQ ref={faqRef} />
                <Contact ref={contactRef} />
            </PageLayout>
        </LandingPageProvider>
    )
}

export default translate(LandingPage);
