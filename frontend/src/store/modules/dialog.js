import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import { applyPenders } from 'redux-pender';
import { getScenarioGroup, GetScenario } from '../../lib/api/get';

const GET_SCENARIO_GROUP = 'SCENARIO/GET_SCENARIO_GROUP';
const GET_SCENARIO = 'SCENARIO/GET_SCGET_SCENARIOENARIO_GROUP';
const SET_ENV_VAR = 'SCENARIO/SET_ENV_VAR';

export const get_scenario_group = createAction(GET_SCENARIO_GROUP, getScenarioGroup);
export const get_scenario = createAction(GET_SCENARIO, GetScenario);
export const set_env_var = createAction(SET_ENV_VAR, value => value);

const initialState = Map({
    scenario_group: [],
    scenario: [],
    env_var: Map({ selected_scenario_group_id: -1 }),
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
        type: GET_SCENARIO_GROUP,
        onSuccess: (state, action) => {
            let new_state = state.set('scenario_group', action.payload.data);
            if (action.payload.data.length !== 0 && new_state.get('env_var').get('selected_scenario_group_id') === -1) {
                new_state = new_state.set(
                    'env_var',
                    new_state
                        .get('env_var')
                        .set('selected_scenario_group_id', action.payload.data[0].id)
                        .set('selected_scenario_group_name', action.payload.data[0].name),
                );
            }
            return new_state;
        },
        onFailure: state => {
            return state.set('scenario_group', []);
        },
    },
    {
        type: GET_SCENARIO,
        onSuccess: (state, action) => {
            const new_state = state.set('scenario', action.payload.data);
            return new_state;
        },
        onFailure: state => {
            return state.set('scenarioscenario', []);
        },
    },
]);
