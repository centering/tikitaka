import { bindActionCreators } from 'redux';

import * as commonActions from './modules/common';
import * as scenarioActions from './modules/scenario';
import * as answerActions from './modules/answer';
import * as settingActions from './modules/setting';
import store from './index';

const { dispatch } = store;

export const CommonActions = bindActionCreators(commonActions, dispatch);
export const ScenarioActions = bindActionCreators(scenarioActions, dispatch);
export const AnswerActions = bindActionCreators(answerActions, dispatch);
export const SettingActions = bindActionCreators(settingActions, dispatch);
