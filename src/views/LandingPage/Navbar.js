import React, { memo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarToggler, NavItem, Nav, Collapse, Modal, Container, ModalBody, ModalHeader } from "reactstrap";
// import langUtils from "../../utils/language/index";
import { translate, t } from "react-switch-lang";
import Login from '../Auth/Login/Login';
// import * as moment from "moment";

function NavbarLandingPage() {
  const location = useLocation()
  const [openDrawer, setOpenDrawer] = useState(false)
  const [modalLogin, setModalLogin] = useState(false)

  const toggleLogin = () => {
    setModalLogin(!modalLogin)
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
            P-Platform
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
                <NavItem className="nav-button">
                  <Link
                    className="btn button-landing px-2"
                    to="/register"
                    style={{ color: "#fff" }}
                  >
                    {t("Register")}
                  </Link>
                </NavItem>
                <NavItem className="nav-button">
                  <div
                    className="btn button-landing px-2"
                    style={{ color: "#fff", cursor: "pointer" }}
                    onClick={() => toggleLogin()}
                  >
                    {t("Login")}
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
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="btn button-landing px-2 py-2"
                  to="/login"
                  style={{ color: "#fff" }}
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Modal>
      <ModalLogin isOpen={modalLogin} toggle={(e) => toggleLogin(e)} />
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
export default translate(NavbarLandingPage)
