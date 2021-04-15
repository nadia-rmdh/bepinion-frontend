import React from "react";
import { BrowserRouter as Router, Redirect, Switch } from "react-router-dom";
import "./App.scss";
import { Provider } from "react-redux";

import AuthRoute from "./components/AuthRoute.js";
import OfflineIndicator from "./components/OfflineIndicator.js";

//Route
import LoginPage from "./views/Pages/Login/Login.js";
import ForgotPassword from "./views/Pages/Password/ForgotPassword.js";
import ResetPassword from "./views/Pages/Password/ResetPassword.js";
import RegisterPage from "./views/Pages/Register/Register.js";
import VerifRegisterPage from "./views/Pages/Register/Verif.js";
import store from "./store";
import Layout from "./containers/DefaultLayout/Layout";
import langUtils from "./utils/language/index";
import { setLocale as setValidationLocale } from "yup";
import validationLocaleID from "./utils/yup/locales/id";
import validationLocaleDefault from "yup/es/locale";
import moment from "moment";
import momentLocales from './utils/language/moment-locales';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
// import ForceLogin from "./views/Pages/Login/ForceLogin";
// import LandingPage from "./views/LandingPage/LandingPage";

library.add(fab, fas, far)

langUtils.onLanguageChanged((lang) => {
  if (lang.toLowerCase() === "id") {
    setValidationLocale(validationLocaleID);
  } else {
    setValidationLocale(validationLocaleDefault);
  }
});
langUtils.onLanguageChanged((lang) => {
  const momentLocaleDefinition = momentLocales[lang.toLowerCase()];
  if (momentLocaleDefinition) {
    moment.locale(lang.toLowerCase(), momentLocaleDefinition);
  } else {
    moment.locale(lang.toLowerCase());
  }
});
langUtils.init();

export default function App() {
  return (
    <Provider store={store}>
      <OfflineIndicator />

      <Router>
        <Switch>
          {/* <AuthRoute path="/" type="guest" exact>
            <LandingPage />
          </AuthRoute> */}
          <AuthRoute path="/" type="guest" exact>
            <Redirect to="/login" />
            {/* <LoginPage /> */}
          </AuthRoute>
          <AuthRoute path="/login" type="guest" exact>
            <LoginPage />
          </AuthRoute>
          {/* <AuthRoute path="/login/force" exact>
            <ForceLogin />
          </AuthRoute> */}
          <AuthRoute path="/register" type="guest" exact>
            <RegisterPage />
          </AuthRoute>

          <AuthRoute
            path="/verify/:token"
            type="guest"
            exact
            component={VerifRegisterPage}
          ></AuthRoute>

          <AuthRoute
            path="/forgot"
            type="guest"
            exact
            component={ForgotPassword}
          ></AuthRoute>
          <AuthRoute
            path="/reset/:token"
            type="guest"
            exact
            component={ResetPassword}
          ></AuthRoute>

          <AuthRoute type="private" exact component={Layout} />
        </Switch>
      </Router>
    </Provider>
  );
}
