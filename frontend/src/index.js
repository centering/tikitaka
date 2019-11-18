// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router-dom';

import HeaderContainer from './container/Header/HeaderContainer'
import {Provider} from 'react-redux';
import store from './store';
import { createBrowserHistory } from 'history';
import SignUpContainer from "./container/Sign/SignUpContainer";

const root = document.getElementById('root')

if( !(root instanceof Element)){
    throw "Invalid Root"
}
ReactDOM.render(
    <Provider store={store}>
        <Router history={createBrowserHistory()}>
            <div>
                <Route path="/" component={HeaderContainer} />
                   <Route exact path='/SignUp' component={SignUpContainer}/>
            </div>
        </Router>
    </Provider>,
   root
);