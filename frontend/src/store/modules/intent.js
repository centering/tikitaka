import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import { applyPenders } from 'redux-pender';
import { getIntentList, getIntent } from '../../lib/api/get';

const GET_INTENT_LIST = 'INTENT/GET_INTENT_LIST';
const GET_INTENT = 'INTENT/GET_INTENT';
const SET_ENV_VAR = 'INTENT/SET_ENV_VAR';

export const get_intent_list = createAction(GET_INTENT_LIST, getIntentList);
export const get_intent = createAction(GET_INTENT, getIntent);
export const set_env_var = createAction(SET_ENV_VAR, value => value);

const initialState = Map({
    intent_list: [],
    env_var: Map({ selected_intent: -1 }),
});

const reducer = handleActions(
    {
        [SET_ENV_VAR]: (state, { payload: value }) => {
            return state.set('env_var', value);
        },
    },
    initialState,
);

export default applyPenders(reducer, [
    {
        type: GET_INTENT_LIST,
        onSuccess: (state, action) => {
            let new_state = state.set('intent', action.payload.data);
            if (action.payload.data.length !== 0 && new_state.get('env_var').get('selected_intent') === -1) {
                new_state = new_state.set(
                    'env_var',
                    new_state
                        .get('env_var')
                        .set('intent_list', action.payload.data),
                );
            }
            return new_state;
        },
        onFailure: state => {
            return state.set('intent_list', []);
        },
    },
    {
        type: GET_INTENT,
        onSuccess: (state, action) => {
            const new_state = state.set('intent', action.payload.data);
            return new_state;
        },
        onFailure: state => {
            return state.set('intent', []);
        },
    },
]);
