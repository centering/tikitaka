import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import { applyPenders } from 'redux-pender';
import { getSetting } from '../../lib/api/get';

const GET_SETTING = 'SETTING/GET_SETTING';
const SET_SETTING = 'SETTING/SET_SETTING';

export const get_setting = createAction(GET_SETTING, getSetting);
export const set_setting = createAction(SET_SETTING, value => value);
const initialState = Map({
    setting: Map({}),
});

const reducer = handleActions(
    {
        [SET_SETTING]: (state, { payload: value }) => {
            return state.set('setting', value);
        },
    },
    initialState,
);

export default applyPenders(reducer, [
    {
        type: GET_SETTING,
        onSuccess: (state, action) => {
            const new_state = state.set('setting', Map(action.payload.data));
            return new_state;
        },
        onFailure: state => {
            return state.set('setting', Map({}));
        },
    },
]);
