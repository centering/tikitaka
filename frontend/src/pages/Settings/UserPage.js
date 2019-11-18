
import React from 'react';
import User from '../../component/Settings/User'
import {GET_TRANS_LANG} from "../../lib/common";

const UserPage = (props)=>{
    return(
        <div>
             <h2>{GET_TRANS_LANG('USER')}</h2>
            <User SetTableQuery={props.SetTableQuery}
                       UserList={props.UserList}
                       CreateUser={props.CreateUser}
                       ModifyUser={props.ModifyUser}
                       DeleteUser={props.DeleteUser}
                       GetUser={props.GetUser}
                       TableQuery={props.TableQuery}
                  UserGroupList={props.UserGroupList}

            />
        </div>
    )


}

export default UserPage