import { combineReducers } from 'redux';
import { penderReducer } from 'redux-pender';

import common from './common';
import scenario from './scenario';

export default combineReducers({
    common,
    scenario,
    pender: penderReducer,
});
