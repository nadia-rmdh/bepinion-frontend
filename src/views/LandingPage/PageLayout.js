import React, { useEffect } from "react";
import PropTypes from "prop-types";
import NavbarLandingPage from './Navbar'
// import Footer from './Footer'

function PageLayout(props) {

  const windowOnScroll = () => {
    if (window.scrollY > 0) {
      if (
        !document.getElementsByTagName("nav")[0].classList.contains("shadow-sm")
      ) {
        document.getElementsByTagName("nav")[0].classList.add("shadow-sm");
      }
    } else {
      if (
        document.getElementsByTagName("nav")[0].classList.contains("shadow-sm")
      ) {
        document.getElementsByTagName("nav")[0].classList.remove("shadow-sm");
      }
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", windowOnScroll);

    return () => {
      window.removeEventListener("scroll", windowOnScroll);

    }
  })

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
