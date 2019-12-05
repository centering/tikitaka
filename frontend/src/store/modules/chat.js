import { createAction, handleActions } from 'redux-actions';
import { Map, List } from 'immutable';
import { applyPenders } from 'redux-pender';
import { doChat } from '../../lib/api/post';

const SET_ENV_VAR = 'CHAT/SET_ENV_VAR';
const SET_CHAT_DATA = 'CHAT/SET_CHAT_DATA';

export const set_env_var = createAction(SET_ENV_VAR, value => value);
export const set_chat_data = createAction(SET_CHAT_DATA, value => value);

const initialState = Map({
    chat_data: List(['안녕하세요 반갑습니다~!']),
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

export default applyPenders(reducer, [
    {
        type: SET_CHAT_DATA,
        onSuccess: (state, action) => {
            return {
                ...state,
                arr: [...state.chat_data, action.payload.data]
            }
        },
        onFailure: state => {
            //return state.set('chat_data', []);
            alert('chat response inference fail!');
        },
    },
]);