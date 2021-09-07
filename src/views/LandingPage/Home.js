import React from 'react';
import { translate } from "react-switch-lang";
import PageLayout from './PageLayout';

function LandingPage() {
  return (
    <PageLayout>
      Home
    </PageLayout>
  )
}

export default translate(LandingPage)
