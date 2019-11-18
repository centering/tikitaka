import { bindActionCreators } from 'redux';

import * as commonActions from './modules/common'

import store from './index';

const { dispatch } = store;


export const CommonActions = bindActionCreators(commonActions,dispatch)
