import { createAction, handleActions } from 'redux-actions';
import { Map, List } from 'immutable';
import { applyPenders } from 'redux-pender';

const SET_ENV_VAR = 'CHAT/SET_ENV_VAR';
const SET_CHAT_DATA = 'CHAT/SET_CHAT_DATA';

export const set_env_var = createAction(SET_ENV_VAR, value => value);
export const set_chat_data = createAction(SET_CHAT_DATA, value => value);

const initialState = Map({
    chat_data: List(['aaaa', 'bbb']),
    env_var: Map({ selected_scenario_group_id: -1 }),
});

const reducer = handleActions(
    {
        [SET_ENV_VAR]: (state, { payload: value }) => {
            return state.set('env_var', value);
        },
        [SET_CHAT_DATA]: (state, { payload: value }) => {
            return state.set('chat_data', List(value));
        },
    },
    initialState,
);

export default applyPenders(reducer, []);
