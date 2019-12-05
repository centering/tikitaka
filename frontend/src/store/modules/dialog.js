import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import { applyPenders } from 'redux-pender';
import { getDialogFlow } from '../../lib/api/get';

const GET_DIALOG_FLOW = 'DIALOG/GET_DIALOG_FLOW';
const GET_DIALOG = 'DIALOG/GET_DIALOG';
const SET_ENV_VAR = 'SCENARIO/SET_ENV_VAR';

export const get_dialog_flow = createAction(GET_DIALOG_FLOW, getDialogFlow);
export const get_dialog = createAction(GET_DIALOG_FLOW, getDialogFlow);
export const set_env_var = createAction(SET_ENV_VAR, value => value);

const initialState = Map({
    dialog_flow: [],
    dialog: {},
    env_var: Map({ selected_dialog_id: -1 }),
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
        type: GET_DIALOG_FLOW,
        onSuccess: (state, action) => {
            let new_state = state.set('dialog_flow', action.payload.data);
            if (action.payload.data.length !== 0 && new_state.get('env_var').get('selected_dialog_id') === -1) {
                new_state = new_state.set(
                    'env_var',
                    new_state
                        .get('env_var')
                        .set('selected_dialog_id', action.payload.data[0].id)
                        .set('selected_dialog_title', action.payload.data[0].title),
                );
            }
            return new_state;
        },
        onFailure: state => {
            return state.set('dialog_flow', []);
        },
    },
]);
