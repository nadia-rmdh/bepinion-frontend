import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, Modal } from 'reactstrap';

import Logo from '../../assets/assets_ari/logo.png';
import { withLandingPageContext } from './context';

class NavbarComp extends Component {
    state = {
        collapsed: true,
        openDrawer: false,
        curPosition: 'home'
    }

    toggleNavbar = () => this.setState({
        openDrawer: true
    })

    closeDrawer = () => this.setState({
        openDrawer: false
    })
    redirectLink = (link) => (e) => {
        e.preventDefault()
        window.location.replace(link);
    }
    handleAboutClick = (e) => {
        e.preventDefault()
        if (document.getElementById('about')) {
            window.scrollTo({
                top: Number(document.getElementById('about').offsetTop) - 80,
                left: 0,
                behavior: 'smooth'
            })
            this.closeDrawer()
        } else {
            this.props.history.push('/');
        }
    }
    windowOnScroll = () => {
        if (window.scrollY > 0) {
            if (!document.getElementsByTagName('nav')[0].classList.contains('shadow-sm')) {
                document.getElementsByTagName('nav')[0].classList.add('shadow-sm')
            }
        } else {
            if (document.getElementsByTagName('nav')[0].classList.contains('shadow-sm')) {
                document.getElementsByTagName('nav')[0].classList.remove('shadow-sm')
            }
        }

        const { homeRef, featureRef, pricingRef } = this.props.landingPageRefs;
        if (homeRef.current && featureRef.current && pricingRef.current) {
            if (window.scrollY + 100 > (homeRef.current.offsetTop) && window.scrollY + 100 <= (homeRef.current.offsetTop + homeRef.current.offsetHeight)) {
                this.setState({ curPosition: 'home' })
            }
            else if ((window.scrollY + 100 > (featureRef.current.offsetTop)) && (window.scrollY + 100 <= (featureRef.current.offsetTop + featureRef.current.offsetHeight))) {
                this.setState({ curPosition: 'feature' })
            }
            else if (window.scrollY + 100 > (pricingRef.current.offsetTop) && window.scrollY + 100 <= (pricingRef.current.offsetTop + pricingRef.current.offsetHeight)) {
                this.setState({ curPosition: 'price' })
            }
            else {
                this.setState({ curPosition: ''})
            }
        }
    }

    componentDidMount() {
        window.addEventListener("scroll", this.windowOnScroll)
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.windowOnScroll)
    }
    render() {
        const { homeRef, featureRef, pricingRef, scrollTo } = this.props.landingPageRefs;
        // const isActive = (link) => homeRef === link;
        // const getNavItemClass = (link) => isActive(link) ? 'mr-3 active' : 'mr-3';

        const getNavItemClass = (pos) => pos === this.state.curPosition ?  'mr-3 active' : 'mr-3';
        return (
            <Fragment>
                <Navbar color="white" className="navbar-expand-md fixed-top custom-nav" light>
                    <div className="container-fluid">
                        <NavbarBrand href="/" className="mr-auto">
                            <img src={Logo} alt="widya-skilloka" className="navbar-logo" />
                        </NavbarBrand>
                        <NavbarToggler onClick={this.toggleNavbar} className="" />
                        <Collapse isOpen={!this.state.collapsed} navbar>
                            <Nav navbar className="ml-auto">
                                <NavItem className={getNavItemClass('home')} onClick={() => { scrollTo(homeRef.current) }}>
                                    <Link className="custom-nav" to="/" disabled>Beranda</Link>
                                </NavItem>
                                <NavItem className={getNavItemClass('feature')} onClick={() => { scrollTo(featureRef.current) }}>
                                    <Link className="custom-nav" to="/" disabled>Fitur</Link>
                                </NavItem>
                                <NavItem className={getNavItemClass('price')} onClick={() => { scrollTo(pricingRef.current) }}>
                                    <Link className="custom-nav" to="/">Harga</Link>
                                </NavItem>
                                <NavItem className="has-subitem">
                                    <Link className="btn button-landing px-2" to="/login" style={{color:"#fff"}}>Login</Link>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div >
                </Navbar >

                <Modal isOpen={this.state.openDrawer} toggle={this.closeDrawer} className={'modal-drawer'} >
                    <div className="drawer container">
                        <div className="drawer-header pb-2">
                            <NavbarBrand href="/" className="mr-auto">
                                <img src={Logo} alt="widya-skilloka" className="navbar-logo" />
                            </NavbarBrand>
                            <NavbarToggler onClick={this.closeDrawer} className="close-drawer ml-auto" />
                        </div>
                        <div className="text-center d-flex flex-column justify-content-center">
                            <ul>
                                <li className={`nav-item ${getNavItemClass('home')}`}
                                    onClick={() => {
                                        this.closeDrawer();
                                        scrollTo(homeRef.current);
                                    }}
                                >
                                    <Link to="/" disabled className="nav-link m-0 py-2">Beranda</Link>
                                </li>
                                <li className={`nav-item ${getNavItemClass('feature')}`}
                                    onClick={() => {
                                        this.closeDrawer();
                                        scrollTo(featureRef.current);
                                    }}
                                >
                                    <Link to="/" disabled className="nav-link m-0 py-2">Fitur</Link>
                                </li>
                                <li className={`nav-item ${getNavItemClass('price')}`}
                                    onClick={() => {
                                        this.closeDrawer();
                                        scrollTo(pricingRef.current);
                                    }}
                                >
                                    <Link to="/" disabled className="nav-link m-0 py-2">Harga</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="btn button-landing px-2 py-2" to="/login" style={{color:"#fff"}}>Login</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Modal>
            </Fragment>
        )
    }
}

export default withLandingPageContext(withRouter(NavbarComp));
