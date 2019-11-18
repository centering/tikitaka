
import React from 'react';
import UserGroup from '../../component/Settings/UserGroup'
import {GET_TRANS_LANG} from "../../lib/common";

const UserGroupPage = (props)=>{
    return(
        <div>
             <h2>{GET_TRANS_LANG('USER_GROUP')}</h2>
            <UserGroup SetTableQuery={props.SetTableQuery}
                       UserGroupList={props.UserGroupList}
                       CreateUserGroup={props.CreateUserGroup}
                       ProjectId={props.ProjectId}
                       ModifyUserGroup={props.ModifyUserGroup}
                       DeleteUserGroup={props.DeleteUserGroup}
                       GetUserGroup={props.GetUserGroup}
                       TableQuery={props.TableQuery}

            />
        </div>
    )


}

export default UserGroupPage