import React, {Component} from 'react';
import { UserActions} from '../../store/actionCreator';
import {connect} from "react-redux";
import * as UserCRUD from "./UserCRUD";
import {GetUserGroupList} from "./UserGroupCRUD";

import UserPage from '../../pages/Settings/UserPage'
import {GET_TRANS_LANG,setNotiboxOpt} from "../../lib/common";

class UserContainer extends Component {



    componentDidUpdate(prevProps, prevState, snapshot) {

        // if changed page then get user group
        // console.log(prevProps)
        if(prevProps.table_query.get('cur_page')!=this.props.table_query.get('cur_page')
            ||prevProps.table_query.get('row_per_page')!=this.props.table_query.get('row_per_page')
            || prevProps.action_status==''&&this.props.action_status=='NEED_UPDATE'
            ||prevProps.table_query.get('sort')!=this.props.table_query.get('sort')
            ||prevProps.table_query.get('order')!=this.props.table_query.get('order')
        )
        {
           this.GetUser()

        }
    }

    componentDidMount() {

      this.GetUser()
    }

    GetUser(){
        const {table_query,user_info,}=this.props;
        const from  = table_query.get('cur_page')*table_query.get('row_per_page');
        const size = table_query.get('row_per_page');
        const project_id = user_info.get('project_id');
        const sort_id = table_query.get('sort');
        const order = table_query.get('order');
        const sort_col= table_query.get('sort_col');
        const search_col = table_query.get('search_col');
        const search_val = table_query.get('search_val')

        if(search_col && !search_val || !search_col && search_val )
        {
            setNotiboxOpt({
                variant:'error',
                message:GET_TRANS_LANG("BLANK_INFO"),
                open:true
            })
            return
        }


        UserCRUD.GetUserList(project_id,from,size,sort_id==-1?false:sort_col,sort_id==-1?false:order,
            search_col==''?false:search_col,search_val==''?false:search_val)


        GetUserGroupList(project_id)
        let new_state = table_query.set('search_col','').set('search_val','')
        UserActions.set_table_query(new_state)


    }

    setTableQuery(value){
        UserActions.set_table_query(value)
    }


    render() {

        const {user_list,table_query,user_group_list} = this.props;

        return (
            <div>

                <UserPage SetTableQuery={this.setTableQuery.bind(this)}
                               TableQuery={table_query}
                               UserList={user_list}
                                UserGroupList={user_group_list}
                               CreateUser={UserCRUD.CreateUser}
                               ModifyUser={UserCRUD.ModifyUser}
                               DeleteUser={UserCRUD.DeleteUser}
                               GetUser={this.GetUser.bind(this)}

                />
            </div>
        );
    }

};

UserContainer = connect(
    ({ User }) => ({
        user_list:User.get('user_list'),
        table_query:User.get('table_query')

    })

)(UserContainer)

UserContainer = connect(
    ({ UserGroup }) => ({
        user_group_list:UserGroup.get('user_group_list'),

    })

)(UserContainer)


UserContainer = connect(
    ({common}) => ({
        user_info : common.get('user_info'),
        action_status:common.get('action_status')
    })

)(UserContainer)


export default UserContainer;
