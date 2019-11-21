import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import { applyPenders } from 'redux-pender';

// NOTIBOX, LOADING BAR
const SET_NOTIBOX = 'SET_NOTIBOX';
const SET_LOADING = 'SET_LOADING';
const SET_ACTION_STATUS = 'SET_ACTION_STATUS';

export const set_notibox = createAction(SET_NOTIBOX, value => value);
export const set_loading = createAction(SET_LOADING, value => value);
export const set_action_status = createAction(SET_ACTION_STATUS, value => value);

const initialState = Map({
    noti_opt: Map({ variant: 'info', message: '', open: false }),
    loading: false,
    action_status: '',
});

const reducer = handleActions(
    {
        [SET_NOTIBOX]: (state, { payload: value }) => {
            return state.set('noti_opt', Map(value));
        },
        [SET_LOADING]: (state, { payload: value }) => {
            return state.set('loading', value);
        },
        [SET_ACTION_STATUS]: (state, { payload: value }) => {
            return state.set('action_status', value);
        },
    },
    initialState,
);

export default applyPenders(reducer, [
    // {
    //     type: POST_CREATE_NEW_PROJECT,
    //     onSuccess: (state, action) => {
    //         const user_info = state.get('user_info');
    //         let new_state = state.set('user_info',user_info.set('projects',List(action.payload.data.projects)))
    //         new_state = new_state.set('create_project_input',Map({project_name:'',project_desc:'',status:''}))
    //         return new_state
    //     },
    //     // onFailure: (state, action) => {
    //     //     return state.set('user_group_list', List([]))
    //     // }
    // }
]);
