import React, { useMemo } from "react";
import { connect } from "react-redux";
import { Redirect, Route, useLocation } from "react-router";
import { Spinner } from "reactstrap";
import { getMe } from "../actions/auth";
// import LandingPage from "../views/LandingPage/LandingPage";

const Forbidden = () => <div><center><h1>403 Sorry, this page is forbidden.</h1></center></div>;

const AuthRoute = ({ isLoggedIn, user, token, type, privileges, oneOfPrivileges, getMe, ...props }) => {
  const shouldAuthenticate = useMemo(() => ['guest', 'private'].includes(type) || privileges !== undefined || oneOfPrivileges !== undefined, [oneOfPrivileges, privileges, type]);
  const location = useLocation();

  if (shouldAuthenticate) {
    if (user === null && token) {
      getMe();
      return (
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            background: "rgba(255,255,255, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner style={{ width: 48, height: 48 }} />
        </div>
      );
    }

    if (type === "guest" && isLoggedIn === true) {
      const search = new URLSearchParams(location.search);
      if (location.pathname === '/login') {
        if (search.get('to')) {
          return <Redirect to={search.get('to')} />
        }
      }
      return <Redirect to={'/home'} />;
    }
    if (type === "private" && isLoggedIn === false) {
      const searchParams = new URLSearchParams(location.search);
      if (location.pathname !== '/login') {
        searchParams.set('to', location.pathname);
      }
      // return <Redirect to={'/login?' + searchParams.toString()} />;
      return <Redirect to={'/login'} />;
    }

    const userPrivileges = user?.privileges || [];

    if (privileges !== undefined) {
      return privileges.every((p) => userPrivileges.includes(p)) ? (
        <Route {...props} />
      ) : (
        <Forbidden />
      );
    }

    if (oneOfPrivileges !== undefined) {
      return oneOfPrivileges.some((p) => userPrivileges.includes(p)) ? (
        <Route {...props} />
      ) : (
        <Forbidden />
      );
    }
  }

  // if (1613113200000 - (new Date()) > 0) {
  //   return <LandingPage />;
  // }

  return <Route {...props} />;
};

const mapStateToProps = ({ user, token }) => ({
  isLoggedIn: user != null,
  user,
  token,
});

export default connect(mapStateToProps, { getMe })(AuthRoute);
