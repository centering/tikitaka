import { bindActionCreators } from 'redux';

import * as commonActions from './modules/common';
import * as scenarioActions from './modules/scenario';
import store from './index';

const { dispatch } = store;

export const CommonActions = bindActionCreators(commonActions, dispatch);
export const ScenarioActions = bindActionCreators(scenarioActions, dispatch);
