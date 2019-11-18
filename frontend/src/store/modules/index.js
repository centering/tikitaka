import {combineReducers} from 'redux';
import { penderReducer } from 'redux-pender';


import common from './common';


export default combineReducers({
    common,
    pender: penderReducer



})
