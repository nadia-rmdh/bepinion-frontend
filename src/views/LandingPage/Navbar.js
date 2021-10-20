import React, { memo, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarToggler, NavItem, Nav, Collapse, Modal, Container, ModalBody, Row, Col, Button } from "reactstrap";
// import langUtils from "../../utils/language/index";
import { translate, t } from "react-switch-lang";
import Login from '../Auth/Login/Login';
import Logo from '../../assets/brands/logo.png';
import { withLandingPageContext } from './context';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function NavbarLandingPage(props) {
  const { homeRef, aboutRef, faqRef, contactRef, scrollTo } = props.landingPageRefs;
  const [openDrawer, setOpenDrawer] = useState(false)
  const [modalLogin, setModalLogin] = useState(false)
  const [modalRegister, setModalRegister] = useState(false)
  const [currentPage, setCurrentPage] = useState('home')

  const toggleLogin = () => {
    setModalLogin(!modalLogin)
  }

  const toggleRegister = () => {
    setModalRegister(!modalRegister)
  }

  const toggleNavbar = () => {
    setOpenDrawer(true)
  }

  const closeDrawer = () => {
    setOpenDrawer(false)
  }

  const windowOnScroll = useCallback((e) => {
    if (window.scrollY > 100) {
      if (!document.getElementsByTagName('nav')[0].classList.contains('bg-white')) {
        document.getElementsByTagName('nav')[0].classList.add('bg-white')
      }
      if (!document.getElementsByTagName('nav')[0].classList.contains('shadow-sm')) {
        document.getElementsByTagName('nav')[0].classList.add('shadow-sm')
      }
    } else {
      if (document.getElementsByTagName('nav')[0].classList.contains('bg-white')) {
        document.getElementsByTagName('nav')[0].classList.remove('bg-white')
      }
      if (document.getElementsByTagName('nav')[0].classList.contains('shadow-sm')) {
        document.getElementsByTagName('nav')[0].classList.remove('shadow-sm')
      }
    }

    if (homeRef.current && aboutRef.current && faqRef.current && contactRef.current) {
      if (window.scrollY > (homeRef.current.offsetTop - 250) && window.scrollY <= ((homeRef.current.offsetTop - 250) + homeRef.current.offsetHeight)) {
        setCurrentPage('home')
      }
      else if (window.scrollY > (aboutRef.current.offsetTop - 250) && (window.scrollY <= ((aboutRef.current.offsetTop - 250) + aboutRef.current.offsetHeight))) {
        setCurrentPage('about');
      }
      else if (window.scrollY > (faqRef.current.offsetTop - 250) && window.scrollY <= ((faqRef.current.offsetTop - 250) + faqRef.current.offsetHeight)) {
        setCurrentPage('faq')
      }
      else if (window.scrollY > (contactRef.current.offsetTop - 250) && window.scrollY <= ((contactRef.current.offsetTop - 250) + contactRef.current.offsetHeight)) {
        setCurrentPage('contact')
      }
      else {
        setCurrentPage('')
      }
    }
  }, [homeRef, aboutRef, faqRef, contactRef])

  useEffect(() => {
    window.addEventListener("scroll", windowOnScroll);

    return () => {
      window.removeEventListener("scroll", windowOnScroll);
    }
  }, [windowOnScroll])

  return (
    <>
      <Navbar
        className="navbar-expand-md fixed-top navbar-landingpage"
        light
      >
        <Container>
          <NavbarBrand onClick={() => scrollTo(homeRef.current)} className="mr-auto" style={{ cursor: "pointer" }}>
            <img src={Logo} alt="widya-skilloka" className="navbar-logo" />
          </NavbarBrand>
          <div className="ml-auto d-flex">
            <Collapse isOpen={!true} navbar>
              <Nav navbar>
                <NavItem
                  className={currentPage === 'about' ? 'active' : ''}
                >
                  <div className="custom-nav" style={{ cursor: "pointer" }} onClick={() => scrollTo(aboutRef.current)}>
                    {t('About')}
                  </div>
                </NavItem>
                <NavItem
                  className={currentPage === 'faq' ? 'active' : ''}
                >
                  <div className="custom-nav" style={{ cursor: "pointer" }} onClick={() => scrollTo(faqRef.current)}>
                    {t('FAQ')}
                  </div>
                </NavItem>
                <NavItem
                  className={currentPage === 'contact' ? 'active' : ''}
                >
                  <div className="custom-nav" style={{ cursor: "pointer" }} onClick={() => scrollTo(contactRef.current)}>
                    {t('Contact')}
                  </div>
                </NavItem>
                <NavItem>
                  <div
                    className="px-2"
                    style={{ cursor: "pointer" }}
                    onClick={() => toggleLogin()}
                  >
                    Sign In
                  </div>
                </NavItem>
                <NavItem className="nav-button">
                  <div
                    className="btn button-landing px-2"
                    onClick={() => toggleRegister()}
                    style={{ color: "#fff", cursor: "pointer" }}
                  >
                    Join
                  </div>
                </NavItem>
              </Nav>
            </Collapse>
          </div>
          <NavbarToggler onClick={toggleNavbar} className="" />
        </Container>
      </Navbar>
      <Modal
        isOpen={openDrawer}
        toggle={closeDrawer}
        className={"modal-drawer"}
      >
        <div className="drawer container">
          <div className="drawer-header pb-2">
            <NavbarToggler
              onClick={closeDrawer}
              className="close-drawer ml-auto"
            />
          </div>
          <div className="text-center d-flex flex-column justify-content-center">
            <ul>
              <li
                className={`nav-item ${"about" === currentPage ? "active" : ""}`}
                onClick={() => {
                  closeDrawer();
                }}
              >
                <Link to="/about" className="nav-link m-0 py-2">
                  {t('About')}
                </Link>
              </li>
              <li
                className={`nav-item ${"faq" === currentPage ? "active" : ""}`}
                onClick={() => {
                  closeDrawer();
                }}
              >
                <Link to="/faq" className="nav-link m-0 py-2">
                  {t('FAQ')}
                </Link>
              </li>
              <li
                className={`nav-item ${"contact" === currentPage ? "active" : ""}`}
                onClick={() => {
                  closeDrawer();
                }}
              >
                <Link to="/contact" className="nav-link m-0 py-2">
                  {t('Contact')}
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="btn button-landing px-2 py-2"
                  to="/login"
                  style={{ color: "#fff" }}
                >
                  Sign In
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="btn button-landing px-2 py-2"
                  to="/login"
                  style={{ color: "#fff" }}
                >
                  Join
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Modal>
      <ModalLogin isOpen={modalLogin} toggle={(e) => toggleLogin(e)} />
      <ModalRegister isOpen={modalRegister} toggle={(e) => toggleRegister(e)} />
    </>
  )
}

export const ModalLogin = memo(({ isOpen, toggle }) => {

  const handleToggle = () => {
    toggle(false)
  }
  return (
    <Modal size="lg" contentClassName="rounded-5" isOpen={isOpen} toggle={() => handleToggle()}>
      <ModalBody>
        <div className="d-flex px-3 mb-3 justify-content-between">
          <div className="bg-transparent text-pinion-primary" style={{ cursor: "pointer" }} onClick={() => handleToggle()}><FontAwesomeIcon icon="times" /></div>
          <div className="font-2xl font-weight-bold text-pinion-primary text-center">
            Sign In
          </div>
          <div className="bg-transparent text-pinion-primary" style={{ cursor: "pointer" }}><FontAwesomeIcon icon="question" /></div>
        </div>
        <Login />
      </ModalBody>
    </Modal>
  )
})

export const ModalRegister = memo(({ isOpen, toggle }) => {
  const [showClientType, setShowClientType] = useState(false)
  const handleToggle = () => {
    toggle(false)
  }
  return (
    <Modal size="lg" contentClassName="rounded-5" isOpen={isOpen} toggle={() => handleToggle()}>
      <ModalBody>
        <div className="d-flex px-3 mb-3 justify-content-between">
          <div className="bg-transparent text-pinion-primary" style={{ cursor: "pointer" }} onClick={() => handleToggle()}><FontAwesomeIcon icon="times" /></div>
          <div className="font-2xl font-weight-bold text-pinion-primary text-center">
            Signing up as...
          </div>
          <div className="bg-transparent text-pinion-primary" style={{ cursor: "pointer" }}><FontAwesomeIcon icon="question" /></div>
        </div>
        <Row className="px-5 pb-5 mb-5">
          <Col xs="6" className="border-right">
            <div className="register-client d-flex justify-content-center" onClick={() => setShowClientType(!showClientType)}>
              <div className="d-flex align-items-end h-100 font-weight-bold font-xl" style={{ marginTop: '2rem' }}>
                {showClientType
                  ? <Row style={{ marginTop: '2rem' }}>
                    <Col xs="6">
                      <Link
                        to={{
                          pathname: "/register",
                          search: `?form=business`,
                          hash: 'companyInformation'
                        }}
                        style={{ color: "#fff", textDecoration: 'none' }}
                        onClick={() => {
                          handleToggle()
                          localStorage.setItem("registrationForm", 'business');
                        }}
                      >
                        <Button color="info" block>Business Entity</Button>
                      </Link>
                    </Col>
                    <Col xs="6">
                      <Link
                        to={{
                          pathname: "/register",
                          search: `?form=individual`,
                          hash: 'registrantInformation'
                        }}
                        style={{ color: "#fff", textDecoration: 'none' }}
                        onClick={() => {
                          handleToggle()
                          localStorage.setItem("registrationForm", 'individual');
                        }}
                      >
                        <Button color="secondary" block>Individual</Button>
                      </Link>
                    </Col>
                  </Row>
                  : 'Client'
                }
              </div>
            </div>
          </Col>
          <Col xs="6">
            <Link
              to={{
                pathname: "/register",
                search: `?form=professional`,
                hash: 'registrantInformation'
              }}
              style={{ color: "#fff", textDecoration: 'none' }}
              onClick={() => {
                handleToggle()
                localStorage.setItem("registrationForm", 'professional');
              }}
            >
              <div className="register-consultant d-flex justify-content-center">
                <div className="d-flex align-items-end h-100 font-weight-bold font-xl">
                  Consultant
                </div>
              </div>
            </Link>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  )
})

export default withLandingPageContext(translate(NavbarLandingPage))
