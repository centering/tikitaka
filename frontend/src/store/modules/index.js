import { combineReducers } from 'redux';
import { penderReducer } from 'redux-pender';

import common from './common';
import scenario from './scenario';
import answer from './answer';
import blacklist from './blacklist';
import setting from './setting';
import chat from './chat';
import intent from './intent';
import entity from './entity';
import dialog from './dialog';

export default combineReducers({
    common,
    scenario,
    answer,
    blacklist,
    setting,
    chat,
    intent,
    entity,
    dialog,
    pender: penderReducer,
});
