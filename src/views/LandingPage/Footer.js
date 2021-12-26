import React from 'react';
import { translate } from "react-switch-lang";
import { Row, Col } from "reactstrap";
import Logo from '../../assets/brands/logo-white.png';

function Footer() {
  // const windowOnScroll = useCallback((e) => {
  //   if (window.scrollY > 2100) {
  //     if (!document.getElementsByClassName('footer-landing')[0].classList.contains('fullscreen')) {
  //       document.getElementsByClassName('footer-landing')[0].classList.add('fullscreen')
  //       document.getElementsByClassName('footer-landing-information')[0].classList.remove('d-none')
  //       document.getElementsByClassName('footer-landing-socmed')[0].classList.remove('d-none')
  //     }
  //     if (!document.getElementsByClassName('footer-landing')[0].classList.contains('shadow-sm')) {
  //       document.getElementsByClassName('footer-landing')[0].classList.add('shadow-sm')
  //     }
  //   } else {
  //     if (document.getElementsByClassName('footer-landing')[0].classList.contains('fullscreen')) {
  //       document.getElementsByClassName('footer-landing-information')[0].classList.add('d-none')
  //       document.getElementsByClassName('footer-landing-socmed')[0].classList.add('d-none')
  //     }
  //     if (document.getElementsByClassName('footer-landing')[0].classList.contains('shadow-sm')) {
  //       document.getElementsByClassName('footer-landing')[0].classList.remove('shadow-sm')
  //     }
  //   }
  // }, [])

  // useEffect(() => {
  //   window.addEventListener("scroll", windowOnScroll);

  //   return () => {
  //     window.removeEventListener("scroll", windowOnScroll);
  //   }
  // }, [windowOnScroll])

  return (
    <div className="footer-landing fullscreen text-light">
      <Row className="px-0 px-lg-5">
        <Col xs="12" md="6" className="footer-landing-information mb-3 mb-md-0 d-flex align-items-center">
          <img src={Logo} alt="bepinion" style={{ width: '200px' }} />
        </Col>
        <Col xs="12" md="6" className="footer-landing-socmed">
          <div className="sosmed-lg fullscreen d-flex justify-content-lg-end">
            <div className="mr-5">
              <div>
                Privacy Policy
              </div>
              <div>
                Terms of Service
              </div>
              <div>
                Developments
              </div>
              <div>
                Suggestions
              </div>
            </div>
            <div>
              <a href="https://business.facebook.com/Pinion-110670174750741/?business_id=4380984315283360" className="d-block text-light" target="blank">
                Pinion on Facebook
              </a>
              <a href="https://instagram.com/wearePinion" className="d-block text-light" target="blank">
                Pinion on Instagram
              </a>
              <a href="https://twitter.com/wearePinion" className="d-block text-light" target="blank">
                Pinion on Twitter
              </a>
              <a href="https://www.linkedin.com/company/thepinion/?viewAsMember=true" className="d-block text-light" target="blank">
                Pinion on LinkedIn
              </a>
            </div>
          </div>
        </Col>
      </Row>
      <div className="position-absolute text-center copyright" style={{ bottom: '10px', left: 'calc(45% - (5rem + 5rem))' }}>
        Copyright &copy; 2021 PT Pinion Teknologi Indonesia. All rights reserved.
      </div>
    </div>
  )
}

export default translate(Footer)
