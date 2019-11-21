import { createStore, applyMiddleware } from 'redux';
// import {createLogger} from "redux-logger";
import penderMiddleware from 'redux-pender';
import { composeWithDevTools } from 'redux-devtools-extension';
import modules from './modules';

const configure = () => {
    if (process.env.NODE_ENV === `development`) {
        // const {createLogger}  = require ('redux-logger')
        // const logger = createLogger();
        // middlewares.push(logger);
    }

    const store = createStore(modules, composeWithDevTools(applyMiddleware(penderMiddleware())));

    return store;
};

export default configure;
