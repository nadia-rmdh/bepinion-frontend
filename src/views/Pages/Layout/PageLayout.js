import React from "react";
import NavbarComp from "../../LandingPage/Navbar";
import Footer from "../../LandingPage/Footer";
import PropTypes from "prop-types";

// import ComingSoon from "../../LandingPage/ComingSoon";

function PageLayout(props) {
  return (
    // <ComingSoon>
      <div className="landing-page">
        <NavbarComp />
        {props.children}
        {props.footer === false ? null : <Footer />}
      </div>
    // </ComingSoon>
  );
}
PageLayout.propTypes = {
  children: PropTypes.node,
  footer: PropTypes.bool,
};
PageLayout.defaultTypes = {
  footer: true,
};
export default PageLayout;
