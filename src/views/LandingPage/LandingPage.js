import React, { useRef } from 'react';
import Hero from './Hero';
import Advantage from './Advantage';
import Partner from './Partner';
import OurWork from "./OurWork";
import Feature from "./Feature";
import Pricing from "./Pricing";
// import TopButton from "./TopButton";
import PageLayout from '../Pages/Layout/PageLayout';
import { LandingPageProvider } from './context';
import FloatingButton from '../Pages/components/FloatingButton';
import FloatingButtonMobile from '../Pages/components/FloatingButtonMobile';

function LandingPage() {

    const homeRef = useRef();
    const pricingRef = useRef();
    const featureRef = useRef();

    return (
        <LandingPageProvider value={{ homeRef, pricingRef, featureRef }}>
            <PageLayout>
                <Hero ref={homeRef} />
                <Advantage />
                <Partner />
                <OurWork />
                <Feature ref={featureRef} />
                <Pricing ref={pricingRef} />
                <div className="d-none d-md-block">
                    <FloatingButton />
                </div>
                <div className="d-md-none">
                    <FloatingButtonMobile />
                </div>
                {/* <TopButton /> */}
            </PageLayout>
        </LandingPageProvider>
    )
}

export default LandingPage;
