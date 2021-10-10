import React from "react";
import PropTypes from "prop-types";
import NavbarLandingPage from './Navbar'
// import Footer from './Footer'

function PageLayout(props) {

  return (
    <div className="container">
      <NavbarLandingPage />
      <div className="wrapper-landing-page">
        {props.children}
      </div>
      {/* {props.footer === false ? null : <Footer />} */}
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
