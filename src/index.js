// import 'react-app-polyfill/ie9'; // For IE 9-11 support
// import 'react-app-polyfill/stable';
// // import 'react-app-polyfill/ie11'; // For IE 11 support
// import './polyfill'
// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';
// import { createStore } from 'redux';
// import { Provider } from 'react-redux';
// import { appMiddleware } from "./middlewares/app";
// import { apiMiddleware } from "./middlewares/core";
// // const persistedState = loadState();

// // const globalState = {
// //     sessionId: null
// // }
// // //Reducer 
// // const rootReducer = (state = globalState, action) => {
// //     if (action.type === 'SET_SESSION') {
// //         return {
// //             sessionId: action.value
// //         }
// //     }
// //     return state;

// // }

// // //Store
// // const store = createStore(rootReducer, persistedState);
// // store.subscribe(() => {
// //     saveState({
// //         'sessionId': store.getState().sessionId
// //     });
// // })

// ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
import './polyfill';
import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import request from "./utils/request";
import { SWRConfig } from "swr";
// import { t } from 'react-switch-lang';

if (process.env.NODE_ENV === 'production') {
    Sentry.init({ 
        environment: process.env.NODE_ENV,
        ignoreErrors: ['Request failed with status code 403', 'Request failed with status code 401', 'Request failed with status code 422'],
        dsn: "https://2fcf451c3d9c4fbbb7e8bc1a84c77c55@o487735.ingest.sentry.io/5557540",
        autoSessionTracking: true,
        integrations: [
            new Integrations.BrowserTracing()
        ],
        tracesSampleRate: 1.0,
    });
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Router><SWRConfig value={{fetcher: (...args) => request.get(...args)}} ><App /></SWRConfig></Router>, rootElement);

serviceWorker.unregister();
