import { bindActionCreators } from 'redux';

import * as commonActions from './modules/common'
import * as userGroupActions from './modules/UserGroup'
import * as userActions from './modules/User'

import store from './index';

const { dispatch } = store;


export const CommonActions = bindActionCreators(commonActions,dispatch)
export const UserGroupActions = bindActionCreators(userGroupActions,dispatch)
export const UserActions = bindActionCreators(userActions,dispatch)
