import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import { applyPenders } from 'redux-pender';
import { getEntityList, getEntity } from '../../lib/api/get';

const GET_ENTITY_LIST = 'ENTITY/GET_ENTITY_LIST';
const GET_ENTITY = 'ENTITY/GET_ENTITY';
const SET_ENV_VAR = 'INTENT/SET_ENV_VAR';

export const get_entity_list = createAction(GET_ENTITY_LIST, getEntityList);
export const get_entity = createAction(GET_ENTITY, getEntity);
export const set_env_var = createAction(SET_ENV_VAR, value => value);

const initialState = Map({
    entity_list: [],
    env_var: Map({ selected_entity: -1 }),
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
        type: GET_ENTITY_LIST,
        onSuccess: (state, action) => {
            let new_state = state.set('entity_list', action.payload.data);
            if (action.payload.data.length !== 0) {
                new_state = new_state.set(
                    'env_var',
                    new_state
                        .get('env_var')
                        .set('entity_list', action.payload.data),
                );
            }
            return new_state;
        },
        onFailure: state => {
            return state.set('entity_list', []);
        },
    },
    {
        type: GET_ENTITY,
        onSuccess: (state, action) => {
            const new_state = state.set('entity', action.payload.data);
            return new_state;
        },
        onFailure: state => {
            return state.set('entity', []);
        },
    },
]);