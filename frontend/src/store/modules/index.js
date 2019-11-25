import { combineReducers } from 'redux';
import { penderReducer } from 'redux-pender';

import common from './common';
import scenario from './scenario';
import answer from './answer';
import setting from './setting';
import chat from './chat';

export default combineReducers({
    common,
    scenario,
    answer,
    setting,
    chat,
    pender: penderReducer,
});
