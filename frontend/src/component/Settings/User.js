import React from "react";
import {PigletTable} from '../common/Table'
import {GET_TRANS_LANG} from "../../lib/common";
import Select from 'react-select'




const User =(props)=> {

    const {TableQuery,UserList,UserGroupList} = props;

    const columns=[
        { title: GET_TRANS_LANG('ID'), field: 'user_id',editable:'never' },
        { title: GET_TRANS_LANG('FIRST_NAME'), field: 'name' ,editable:'never' },
        { title: GET_TRANS_LANG('EMAIL'), field: 'email' ,editable:'onAdd' },
        { title: GET_TRANS_LANG('CREATE_DT'), field: 'create_dt' ,editable:'never'},
        {field:'project_id',hidden:true},
        { title: GET_TRANS_LANG('USER_GROUP'), field: 'user_groups',
            cellStyle: {width:250},
            render: rowData =><ShowGroups Groups={rowData.user_groups}/>,
            editComponent: prop => <EditGroups props={prop} UserGroupList={UserGroupList}/>
        },
        { title: GET_TRANS_LANG('ACTIVATE'), field: 'activate',editable:'never'},
    ]

    const options=[
        {label:GET_TRANS_LANG('FIRST_NAME'),value:'name'},
        {label:GET_TRANS_LANG('EMAIL'),value:'email'},
    ]




    return(
        <div style={{ width: '100%' }}>
            <PigletTable
                columns={columns}
                data={UserList}
                TableQuery={TableQuery}
                SetTableQuery={props.SetTableQuery}
                SearchOptions={options}
                GetSearchData={props.GetUser}
                editable={{
                    onRowAdd: (newData) => props.CreateUser(newData),
                    onRowUpdate: (newData, oldData) =>props.ModifyUser(newData,oldData),
                    onRowDelete: oldData => props.DeleteUser(oldData)
                }}
            />

        </div>


    )
}

const ShowGroups = (props) =>{
    return(
        <div>
            {props.Groups.map((group)=>{
                return group.name
            }).join(', ')}
        </div>

    )
}


const EditGroups = (props)=>{

    const opt = props.UserGroupList.map(user_group=>{
        return {label:user_group.user_group_name, value:user_group.user_group_name,role:user_group.role,user_group_id:user_group.user_group_id}
    })
    function changeGroups(changeVal){


        const val = changeVal.map(value=>{
            return {user_group_id:value.user_group_id,name:value.value,role:value.role}
        })
        props.props.onChange(val)
    }

    return(

        <Select

            placeholder={GET_TRANS_LANG('USER_GROUP')}
            options={opt}
            isMulti
            getOptionLabel={option => `${option.label} (${option.role})`}
            value={ props.props.value?props.props.value.map(value=>{
                return {label:value.name,value:value.name,role:value.role,user_group_id:value.user_group_id}
            }):''}
            isClearable={true}
            onChange={changeGroups}
        />

    )
}
export default User


