import './polyfill';
import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
// import * as Sentry from '@sentry/react';
// import { Integrations } from '@sentry/tracing';
import request from "./utils/request";
import { SWRConfig } from "swr";
// import { t } from 'react-switch-lang';

// if (process.env.NODE_ENV === 'production') {
//     Sentry.init({
//         environment: process.env.NODE_ENV,
//         ignoreErrors: ['Request failed with status code 403', 'Request failed with status code 401', 'Request failed with status code 422'],
//         dsn: "https://2fcf451c3d9c4fbbb7e8bc1a84c77c55@o487735.ingest.sentry.io/5557540",
//         autoSessionTracking: true,
//         integrations: [
//             new Integrations.BrowserTracing()
//         ],
//         tracesSampleRate: 1.0,
//     });
// }

const rootElement = document.getElementById("root");
ReactDOM.render(<Router><SWRConfig value={{fetcher: (...args) => request.get(...args)}} ><App /></SWRConfig></Router>, rootElement);
