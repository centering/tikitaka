import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import { applyPenders } from 'redux-pender';
import { getBlacklistGroup, getBlacklist } from '../../lib/api/get';

const GET_BLACKLIST_GROUP = 'BLACKLIST/GET_BLACKLIST_GROUP';
const GET_BLACKLIST = 'BLACKLIST/GET_BLACKLIST';
const SET_ENV_VAR = 'BLACKLIST/SET_ENV_VAR';
export const get_blacklist_group = createAction(GET_BLACKLIST_GROUP, getBlacklistGroup);
export const get_blacklist = createAction(GET_BLACKLIST, getBlacklist);
export const set_env_var = createAction(SET_ENV_VAR, value => value);

const initialState = Map({
    blacklist_group: [],
    blacklist: [],
    env_var: Map({ selected_blacklist_group_id: -1 }),
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
        type: GET_BLACKLIST_GROUP,
        onSuccess: (state, action) => {
            let new_state = state.set('blacklist_group', action.payload.data);
            if (action.payload.data.length !== 0 && new_state.get('env_var').get('selected_blacklist_group_id') === -1) {
                new_state = new_state.set(
                    'env_var',
                    new_state
                        .get('env_var')
                        .set('selected_blacklist_group_id', action.payload.data[0].id)
                        .set('selected_blacklist_group_name', action.payload.data[0].name),
                );
            }
            return new_state;
        },
        onFailure: state => {
            return state.set('blacklist_group', []);
        },
    },
    {
        type: GET_BLACKLIST,
        onSuccess: (state, action) => {
            const new_state = state.set('blacklist', action.payload.data);
            return new_state;
        },
        onFailure: state => {
            return state.set('blacklist', []);
        },
    },
]);
