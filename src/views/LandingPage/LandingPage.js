import React, { useRef } from 'react';
import { LandingPageProvider } from './context';
import { translate } from "react-switch-lang";
import Home from './Home';
import PageLayout from './PageLayout';
import About from './About';
import Contact from './ContactUs';
import FAQ from './FAQ';
import ScrollToTop from 'react-scroll-up'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
            <ScrollToTop showUnder={500} style={{
                position: 'fixed',
                bottom: 80,
                right: 30,
                cursor: 'pointer',
                transitionDuration: '0.2s',
                transitionTimingFunction: 'linear',
                transitionDelay: '0s'
            }}>
                <div className="bg-pinion-primary text-light d-flex justify-content-center align-items-center" style={{width: '40px', height: '40px', borderRadius: '10px', opacity: '0.7'}}>
                    <FontAwesomeIcon icon="angle-double-up" size="2x" />
                </div>
            </ScrollToTop>
        </LandingPageProvider>
    )
}

export default translate(LandingPage);
