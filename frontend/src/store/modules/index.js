import {combineReducers} from 'redux';
import { penderReducer } from 'redux-pender';


import common from './common';
import UserGroup from './UserGroup'
import User from './User'


export default combineReducers({
    common,
    User,
    UserGroup,
    pender: penderReducer



})
