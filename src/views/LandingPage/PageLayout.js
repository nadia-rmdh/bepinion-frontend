import React from "react";
import PropTypes from "prop-types";
import NavbarLandingPage from './Navbar'
import Footer from './Footer'

function PageLayout(props) {

  return (
    <div className="position-relative">
      <div className="position-absolute landing-page-about">
      </div>
      <div className="position-absolute landing-page-contact">
      </div>

      <div className="container">
        <NavbarLandingPage />
        <div className="wrapper-landing-page">
          {props.children}
        </div>
      </div>
      <Footer />
      <div className="line-container"></div>
    </div>
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
