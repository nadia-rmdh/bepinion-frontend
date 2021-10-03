import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.scss";
import { Provider } from "react-redux";

import OfflineIndicator from "./components/OfflineIndicator";

//Route
import store from "./store";
import Layout from "./containers/DefaultLayout/Layout";
import langUtils from "./utils/language/index";
import { setLocale as setValidationLocale } from "yup";
// import validationLocaleID from "./utils/yup/locales/id";
import validationLocaleDefault from "yup/es/locale";
import moment from "moment";
import momentLocales from './utils/language/moment-locales';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import Home from "./views/LandingPage/Home";
import FAQ from "./views/LandingPage/FAQ";
import Contact from "./views/LandingPage/ContactUs";
import About from "./views/LandingPage/About";
import AuthRoute from "./containers/DefaultLayout/AuthRoute";
import Register from "./views/Auth/Register/Register";
import LandingPage from "./views/LandingPage/LandingPage";

library.add(fab, fas, far)

langUtils.onLanguageChanged((lang) => {
  // if (lang.toLowerCase() === "id") {
  //   setValidationLocale(validationLocaleID);
  // } else {
  // }
  setValidationLocale(validationLocaleDefault);
});
langUtils.onLanguageChanged((lang) => {
  const momentLocaleDefinition = momentLocales['en'];
  if (momentLocaleDefinition) {
    moment.locale('en', momentLocaleDefinition);
  } else {
    moment.locale('en');
  }
});
langUtils.init();

export default function App() {
  return (
    <Provider store={store}>
      <OfflineIndicator />

      <Router>
        <Switch>
          <AuthRoute path="/" type="guest" exact>
            <Home />
          </AuthRoute>
          <AuthRoute path="/about" type="guest" exact>
            <About />
          </AuthRoute>
          <AuthRoute path="/faq" type="guest" exact>
            <FAQ />
          </AuthRoute>
          <AuthRoute path="/contact" type="guest" exact>
            <Contact />
          </AuthRoute>
          <AuthRoute path="/register" type="guest" exact>
            <Register />
          </AuthRoute>

          <AuthRoute type="private" exact component={Layout} />
        </Switch>
      </Router>
    </Provider>
  );
}
