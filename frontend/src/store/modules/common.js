import {createAction, handleActions} from 'redux-actions';
import { Map,List } from 'immutable';
import  {createNewwProject} from "../../lib/api/post";
import { applyPenders } from 'redux-pender';
import {CommonActions} from "../actionCreator";


// SIGN IN
const SET_SIGNIN_INPUT='SET_SIGNIN_INPUT';
const SET_USER_INFO='SET_USER_INFO';

// SIGN UP
const SET_SIGNUP_INPUT='SET_SIGNUP_INPUT';

// PROJECT CREATE
const SET_CREATE_PROJECT_INPUT='SET_CREATE_PROJECT_INPUT'
const POST_CREATE_NEW_PROJECT='POST_CREATE_NEW_PROJECT'

// PAGE STATUS
const SET_PAGE_STATUS='SET_PAGE_STATUS';


// NOTIBOX, LOADING BAR
const SET_NOTIBOX='SET_NOTIBOX'
const SET_LOADING='SET_LOADING'

const SET_ACTION_STATUS='SET_ACTION_STATUS'

export const set_signin_input = createAction(SET_SIGNIN_INPUT, value=>value);
export const set_user_info = createAction(SET_USER_INFO, value=>value);
export const set_signup_input = createAction(SET_SIGNUP_INPUT, value=>value);
export const set_page_status = createAction(SET_PAGE_STATUS, value=>value);
export const set_create_project_input = createAction(SET_CREATE_PROJECT_INPUT, value=>value);
export const post_create_new_project = createAction(POST_CREATE_NEW_PROJECT,createNewwProject);

export const set_notibox = createAction(SET_NOTIBOX, value=>value);
export const set_loading = createAction(SET_LOADING, value=>value);
export const set_action_status = createAction(SET_ACTION_STATUS,value=>value)


const initialState = Map({
    signin_input:Map({email:'',pwd:'',status:'',remember:false}),
    signup_input:Map({email:'',pwd:'',check_pwd:'',f_name:'',l_name:'',status:''}),
    create_project_input:Map({project_name:'',project_desc:'',status:''}),
    page_status:'SIGN_IN',

    user_info:
        Map({
            email:'',
            name:'',
            projects:List([])
        }),
    noti_opt:Map({variant:'info',message:'',open:false}),
    loading:false,
    action_status:''



});

const reducer = handleActions({
      [SET_SIGNIN_INPUT]:(state,{payload:value}) => {
        return state.set('signin_input',Map(value))
    },
    [SET_USER_INFO]:(state,{payload:value}) => {
        return state.set('user_info',Map(value))
    },
    [SET_SIGNUP_INPUT]:(state,{payload:value}) => {
        return state.set('signup_input',Map(value))
    },
    [SET_PAGE_STATUS]:(state,{payload:value}) => {
        return state.set('page_status',value)
    },
    [SET_CREATE_PROJECT_INPUT]:(state,{payload:value}) => {
        return state.set('create_project_input',Map(value))
    },
    [SET_NOTIBOX]:(state,{payload:value}) => {
        return state.set('noti_opt',Map(value))
    },
    [SET_LOADING]:(state,{payload:value}) => {
        return state.set('loading',value)
    },
    [SET_ACTION_STATUS]:(state,{payload:value}) => {
        return state.set('action_status',value)
    },

}, initialState);



export default applyPenders(reducer, [
    {
        type: POST_CREATE_NEW_PROJECT,

        onSuccess: (state, action) => {

            const user_info = state.get('user_info');
            let new_state = state.set('user_info',user_info.set('projects',List(action.payload.data.projects)))
            new_state = new_state.set('create_project_input',Map({project_name:'',project_desc:'',status:''}))

            return new_state

        },
        // onFailure: (state, action) => {
        //     return state.set('user_group_list', List([]))
        // }
    }
])

