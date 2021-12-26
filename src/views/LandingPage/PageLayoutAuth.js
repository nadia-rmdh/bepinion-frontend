import React from "react";
import PropTypes from "prop-types";
import NavbarAuth from './NavbarAuth'
import Footer from './Footer'

function PageLayoutAuth(props) {

  return (
    <div className="position-relative">
      <div className="position-absolute landing-page-about">
      </div>
      <div className="container">
        <NavbarAuth />
        <div className="wrapper-landing-page" style={{ paddingTop: '5rem' }}>
          {props.children}
        </div>
      </div>
      <Footer />
    </div>
  );
}
PageLayoutAuth.propTypes = {
  children: PropTypes.node,
  footer: PropTypes.bool,
};
PageLayoutAuth.defaultTypes = {
  footer: true,
};
export default PageLayoutAuth;
