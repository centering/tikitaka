// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import HeaderContainer from './container/Header/HeaderContainer';
import store from './store';
import { createBrowserHistory } from 'history';

import 'react-sortable-tree/style.css'; // This only needs to be imported once

const root = document.getElementById('root');

if (!(root instanceof Element)) {
    throw 'Invalid Root';
}
ReactDOM.render(
    <Provider store={store}>
        <Router history={createBrowserHistory()}>
            <div>
                <Route path="/" component={HeaderContainer} />
            </div>
        </Router>
    </Provider>,
    root,
);
