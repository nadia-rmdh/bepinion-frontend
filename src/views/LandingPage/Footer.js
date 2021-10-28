import React, { useCallback, useEffect } from 'react';
import { translate } from "react-switch-lang";
import { Row, Col } from "reactstrap";
import ig from '../../assets/landingpage/sosmed/ig.svg';
import fb from '../../assets/landingpage/sosmed/fb.svg';
import twt from '../../assets/landingpage/sosmed/twt.svg';
import linkedin from '../../assets/landingpage/sosmed/linked.png';

function Footer() {
  const windowOnScroll = useCallback((e) => {
    console.log(window.scrollY)
    if (window.scrollY > 2200) {
      if (!document.getElementsByClassName('footer-landing')[0].classList.contains('fullscreen')) {
        document.getElementsByClassName('footer-landing')[0].classList.add('fullscreen')
        document.getElementsByClassName('footer-landing-information')[0].classList.remove('d-none')
        document.getElementsByClassName('footer-landing-socmed')[0].classList.add('col-6')
        document.getElementsByClassName('footer-landing-socmed')[0].classList.remove('col-12')
        document.getElementsByClassName('sosmed-lg')[0].classList.remove('justify-content-center')
        document.getElementsByClassName('sosmed-lg')[0].classList.add('float-right')
        document.getElementsByClassName('sosmed-lg')[0].classList.remove('fullscreen')
      }
      if (!document.getElementsByClassName('footer-landing')[0].classList.contains('shadow-sm')) {
        document.getElementsByClassName('footer-landing')[0].classList.add('shadow-sm')
      }
    } else {
      if (document.getElementsByClassName('footer-landing')[0].classList.contains('fullscreen')) {
        document.getElementsByClassName('footer-landing')[0].classList.remove('fullscreen')
        document.getElementsByClassName('footer-landing-information')[0].classList.add('d-none')
        document.getElementsByClassName('footer-landing-socmed')[0].classList.remove('col-6')
        document.getElementsByClassName('footer-landing-socmed')[0].classList.add('col-12')
        document.getElementsByClassName('sosmed-lg')[0].classList.add('justify-content-center')
        document.getElementsByClassName('sosmed-lg')[0].classList.remove('float-right')
        document.getElementsByClassName('sosmed-lg')[0].classList.add('fullscreen')
      }
      if (document.getElementsByClassName('footer-landing')[0].classList.contains('shadow-sm')) {
        document.getElementsByClassName('footer-landing')[0].classList.remove('shadow-sm')
      }
    }
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", windowOnScroll);

    return () => {
      window.removeEventListener("scroll", windowOnScroll);
    }
  }, [windowOnScroll])

  return (
    <div className="footer-landing">
      <Row>
        <Col xs="6" className="footer-landing-information d-none">
          <div className="font-weight-bold font-2xl">PT PINION TEKNOLOGI INDONESIA</div>
          <div className="font-weight-bold font-lg">ABC BUILDING</div>
        </Col>
        <Col xs="12" className="footer-landing-socmed">
          <div className="sosmed-lg fullscreen d-flex justify-content-center">
            <a href="https://www.instagram.com/" target="blank">
              <img src={ig} alt="instagram" className="mx-2" />
            </a>
            <a href="https://www.facebook.com/" target="blank">
              <img src={fb} alt="facebook" className="mx-2" />
            </a>
            <a href="https://www.twitter.com/" target="blank">
              <img src={twt} alt="twitter" className="mx-2" />
            </a>
            <a href="https://www.linkedin.com/" target="blank">
              <img src={linkedin} alt="linkedin" className="mx-2" />
            </a>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default translate(Footer)
