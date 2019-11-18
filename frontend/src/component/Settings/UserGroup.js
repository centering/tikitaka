import React from "react";
import {PigletTable} from '../common/Table'
import {GET_TRANS_LANG} from "../../lib/common";

const columns=[
    { title: GET_TRANS_LANG('ID'), field: 'user_group_id',editable:'never' },
    { title: GET_TRANS_LANG('USER_GROUP_NAME'), field: 'user_group_name' ,initialEditValue:''},
    { title: GET_TRANS_LANG('DESC'), field: 'user_group_desc' ,initialEditValue:''},
    { title: GET_TRANS_LANG('ROLE'), field: 'role',initialEditValue:'Annotator',
        lookup: { Admin:'Admin', Annotator:'Annotator',QC:'QC',Guest:'Guest'},

    },

]

const options=[

    {label:GET_TRANS_LANG('USER_GROUP_NAME'),value:'user_group_name'},
    {label:GET_TRANS_LANG('ROLE'),value:'role'}
]



const UserGroup =(props)=> {

    const {TableQuery,UserGroupList,ProjectId} = props;




    return(
        <div style={{ width: '100%' }}>
            <PigletTable
                columns={columns}
                data={UserGroupList}
                TableQuery={TableQuery}
                SetTableQuery={props.SetTableQuery}
                SearchOptions={options}
                GetSearchData={props.GetUserGroup}
                editable={{

                    isEditable: rowData => rowData.user_group_name !='Admin' && rowData.user_group_name !='Guest',
                    isDeletable: rowData => rowData.user_group_name !='Admin' && rowData.user_group_name !='Guest',
                    onRowAdd: (newData) => props.CreateUserGroup({...newData,project_id:ProjectId}),
                    onRowUpdate: (newData, oldData) =>props.ModifyUserGroup(newData,oldData),
                    onRowDelete: oldData => props.DeleteUserGroup(oldData)
                }}
            />

        </div>


    )
}





export default UserGroup


