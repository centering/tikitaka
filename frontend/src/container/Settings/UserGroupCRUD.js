import {setLoading, setNotiboxOpt,setActionStatus} from "../../lib/common";
import {UserGroupActions} from "../../store/actionCreator";
import {createUserGroup} from "../../lib/api/post";
import {modifyUserGroup} from "../../lib/api/put";
import {deleteUserGroup} from "../../lib/api/delete";

import {GET_TRANS_LANG} from "../../lib/common";

export async function GetUserGroupList(project_id,from,size,sort,order,search_col,search_val){
    try{

        let status='success';

        setLoading(true)
        let res = await UserGroupActions.get_user_group_list(project_id,from,size,sort,order,search_col,search_val)

        if(res.code!='ok')
            status='error'

        setNotiboxOpt({
            variant:status,
            message:res.message,
            open:true
        })

        setLoading(false)
        setActionStatus('')
    }
    catch(e){
        setLoading(false)

        setNotiboxOpt({
            variant:'error',
            message:e,
            open:true
        })
        console.log(e)
    }

}


export  async function CreateUserGroup(info){


    try{
        if(Object.keys(info).length!=4){
            setNotiboxOpt({
                variant:'error',
                message:GET_TRANS_LANG('BLANK_INFO'),
                open:true
            })
            return
        }
        else{
            if(info.user_group_name==''||info.user_group_desc==''||info.role==''){
                setNotiboxOpt({
                    variant:'error',
                    message:GET_TRANS_LANG('BLANK_INFO'),
                    open:true
                })
                return
            }
        }

        let status='success';
        setLoading(true)
        let res = await createUserGroup(info);


        if(res.code!='ok')
            status='error'


        setNotiboxOpt({
            variant:status,
            message:res.message,
            open:true
        })

        // setLoading(false)

        if(status!='error')
            setActionStatus('NEED_UPDATE')


    }
    catch(e){

        setLoading(false)
        setNotiboxOpt({
            variant:'error',
            message:e,
            open:true
        })
        console.log(e)
    }
}
export async function ModifyUserGroup(newInfo,oldInfo){

    try{

        if(Object.keys(newInfo).length!=4){
            setNotiboxOpt({
                variant:'error',
                message:GET_TRANS_LANG('BLANK_INFO'),
                open:true
            })
            return
        }
        else{
            if(newInfo.user_group_name==''||newInfo.user_group_desc==''||newInfo.role==''){
                setNotiboxOpt({
                    variant:'error',
                    message:GET_TRANS_LANG('BLANK_INFO'),
                    open:true
                })
                return
            }
        }

        let status='success';
        // setLoading(true)
        let res = await modifyUserGroup(newInfo);


        if(res.code!='ok')
            status='error'


        setNotiboxOpt({
            variant:status,
            message:res.message,
            open:true
        })

        // setLoading(false)
        if(status!='error')
            setActionStatus('NEED_UPDATE')



    }
    catch(e){

        setLoading(false)
        setNotiboxOpt({
            variant:'error',
            message:e,
            open:true
        })
        console.log(e)
    }
}
export async function DeleteUserGroup(info){


    try{
        let status='success';
        setLoading(true)
        let res = await deleteUserGroup(info.user_group_id);


        if(res.code!='ok')
            status='error'


        setNotiboxOpt({
            variant:status,
            message:res.message,
            open:true
        })

        // setLoading(false)
        if(status!='error')
            setActionStatus('NEED_UPDATE')


    }
    catch(e){

        setLoading(false)
        setNotiboxOpt({
            variant:'error',
            message:e,
            open:true
        })
        console.log(e)
    }
}