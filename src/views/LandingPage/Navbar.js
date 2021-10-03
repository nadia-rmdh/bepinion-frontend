import React, { memo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarToggler, NavItem, Nav, Collapse, Modal, Container, ModalBody, ModalHeader, Row, Col, Button } from "reactstrap";
// import langUtils from "../../utils/language/index";
import { translate, t } from "react-switch-lang";
import Login from '../Auth/Login/Login';
import Logo from '../../assets/brands/logo.png';
// import * as moment from "moment";

function NavbarLandingPage() {
  const location = useLocation()
  const [openDrawer, setOpenDrawer] = useState(false)
  const [modalLogin, setModalLogin] = useState(false)
  const [modalRegister, setModalRegister] = useState(false)

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

  const getNavItemClass = (pos) =>
    pos === 'home' ? "mr-3 active" : "mr-3";

  return (
    <>
      <Navbar
        color="white"
        className="navbar-expand-md fixed-top navbar-landigpage"
        light
      >
        <Container>
          <NavbarBrand href="/" className="mr-auto">
            <img src={Logo} alt="widya-skilloka" className="navbar-logo" />
          </NavbarBrand>
          <div className="ml-auto d-flex">
            <Collapse isOpen={!true} navbar>
              <Nav navbar>
                <NavItem
                  className={location.pathname === '/about' ? 'active-navbar' : ''}
                >
                  <Link className="custom-nav" to="/about">
                    {t('About')}
                  </Link>
                </NavItem>
                <NavItem
                  className={location.pathname === '/faq' ? 'active-navbar' : ''}
                >
                  <Link className="custom-nav" to="/faq">
                    {t("FAQ")}
                  </Link>
                </NavItem>
                <NavItem
                  className={location.pathname === '/contact' ? 'active-navbar' : ''}
                >
                  <Link className="custom-nav" to="/contact">
                    {t("Contact")}
                  </Link>
                </NavItem>
                <NavItem
                  className={location.pathname === '/contact' ? 'active-navbar' : ''}
                >
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
                className={`nav-item ${getNavItemClass("about")}`}
                onClick={() => {
                  closeDrawer();
                }}
              >
                <Link to="/about" className="nav-link m-0 py-2">
                  {t('About')}
                </Link>
              </li>
              <li
                className={`nav-item ${getNavItemClass("faq")}`}
                onClick={() => {
                  closeDrawer();
                }}
              >
                <Link to="/faq" className="nav-link m-0 py-2">
                  {t('FAQ')}
                </Link>
              </li>
              <li
                className={`nav-item ${getNavItemClass("contact")}`}
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
    <Modal isOpen={isOpen} toggle={() => handleToggle()}>
      <ModalHeader toggle={() => handleToggle()}>Login</ModalHeader>
      <ModalBody>
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
    <Modal isOpen={isOpen} toggle={() => handleToggle()}>
      <ModalHeader toggle={() => handleToggle()}>Register</ModalHeader>
      <ModalBody className="p-3">
        <Row className="text-center">
          <Col xs="12">
            Register as
          </Col>
          <Col xs="12" className="mb-3">
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
              <Button color="primary" block>Professional</Button>
            </Link>
          </Col>
          <Col xs="12">
            <Row>
              <Col xs="12" className="mb-3">
                <Button color="warning" block onClick={() => setShowClientType(!showClientType)}>Client</Button>
              </Col>
              {showClientType &&
                <>
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
                </>
              }
            </Row>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  )
})

export default translate(NavbarLandingPage)
