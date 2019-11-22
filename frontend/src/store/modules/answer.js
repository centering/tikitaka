import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import { applyPenders } from 'redux-pender';
import { getAnswerGroup, GetAnswer } from '../../lib/api/get';

const GET_ANSWER_GROUP = 'ANSWER/GET_ANSWER_GROUP';
const GET_ANSWER = 'ANSWER/GET_ANSWER';
const SET_ENV_VAR = 'ANSWER/SET_ENV_VAR';
export const get_answer_group = createAction(GET_ANSWER_GROUP, getAnswerGroup);
export const get_answer = createAction(GET_ANSWER, GetAnswer);
export const set_env_var = createAction(SET_ENV_VAR, value => value);

const initialState = Map({
    answer_group: [],
    answer: [],
    env_var: Map({ selected_answer_group_id: -1 }),
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
        type: GET_ANSWER_GROUP,
        onSuccess: (state, action) => {
            let new_state = state.set('answer_group', action.payload.data);
            if (action.payload.data.length !== 0 && new_state.get('env_var').get('selected_answer_group_id') === -1) {
                new_state = new_state.set(
                    'env_var',
                    new_state
                        .get('env_var')
                        .set('selected_answer_group_id', action.payload.data[0].id)
                        .set('selected_answer_group_name', action.payload.data[0].name),
                );
            }
            return new_state;
        },
        onFailure: state => {
            return state.set('answer_group', []);
        },
    },
    {
        type: GET_ANSWER,
        onSuccess: (state, action) => {
            const new_state = state.set('answer', action.payload.data);
            return new_state;
        },
        onFailure: state => {
            return state.set('answer', []);
        },
    },
]);
