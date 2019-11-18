
import {createAction, handleActions} from 'redux-actions';
import { Map,List } from 'immutable';
import {getUserGroup} from "../../lib/api/get";
import { applyPenders } from 'redux-pender';


// USER GROUP
const GET_USER_GROUP_LIST='GET_USER_GROUP_LIST';

const SET_TABLE_QUERY ='SET_TABLE_QUERY'


export const get_user_group_list = createAction(GET_USER_GROUP_LIST, getUserGroup);
export const set_table_query =  createAction(SET_TABLE_QUERY, value=>value);

const initialState = Map({
    user_group_list:[],
    table_query:Map({cur_page:0,row_per_page:10,total_cnt:0,sort:-1,sort_col:'',order:'',search_val:'',search_col:''}),

});


const reducer = handleActions({
   [SET_TABLE_QUERY]:(state,{payload:value}) => {
        return state.set('table_query',Map(value))
    },

}, initialState);


export default applyPenders(reducer, [
    {
        type: GET_USER_GROUP_LIST,

        onSuccess: (state, action) => {

            if(action.payload.code!='ng'){
                let new_state = state.set('user_group_list',action.payload.data)
                new_state = new_state.set('table_query',new_state.get('table_query').set('total_cnt',action.payload.total_cnt))
                return new_state
            }
            else{
                return state.set('user_group_list', List([]))
            }

        },
        onFailure: (state, action) => {
            return state.set('user_group_list', List([]))
        }
    }
])

