import React from 'react';
import { translate } from "react-switch-lang";
import { Row, Col } from "reactstrap";
import ig from '../../assets/landingpage/sosmed/ig.svg';
import fb from '../../assets/landingpage/sosmed/fb.svg';
import twt from '../../assets/landingpage/sosmed/twt.svg';
import linkedin from '../../assets/landingpage/sosmed/linked.png';

function Footer() {
  return (
    <div className="footer-landing position-relative mt-5">
      <Row>
        <Col xs="6">
          <div className="font-weight-bold font-2xl">PT PINION TEKNOLOGI INDONESIA</div>
          <div className="font-weight-bold font-lg">ABC BUILDING</div>
        </Col>
        <Col xs="6">
          <div className="sosmed-lg mt-3 float-right">
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
