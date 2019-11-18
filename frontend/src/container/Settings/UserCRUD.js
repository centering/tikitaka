import {setLoading, setNotiboxOpt,setActionStatus} from "../../lib/common";
import {UserActions} from "../../store/actionCreator";
import {createUser} from "../../lib/api/post";
import {modifyUser} from "../../lib/api/put";
import {deleteUser} from "../../lib/api/delete";

import {GET_TRANS_LANG} from "../../lib/common";

export async function GetUserList(project_id,from,size,sort,order,search_col,search_val){
    try{

        let status='success';

        setLoading(true)
        let res = await UserActions.get_user_list(project_id,from,size,sort,order,search_col,search_val)

        if(res.code!='ok')
            status='error'

        setNotiboxOpt({
            variant:status,
            message:res?  res.message :'FAIL_GET_USER',
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


export  async function CreateUser(info){


    try{

        if(!info.hasOwnProperty('email') ||info.hasOwnProperty('user_groups')){
            setNotiboxOpt({
                variant:'error',
                message:GET_TRANS_LANG('BLANK_INFO'),
                open:true
            })
            return
        }
        else{
            if(info.email==''||info.user_groups.length==0){
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

         let info = {
            email:info.email,
            user_groups:info.user_groups.map(groups=>{
                return {user_group_id:groups.user_group_id}
            })
        }

        let res = await createUser(info);


        if(res.code!='ok')
            status='error'


        setNotiboxOpt({
            variant:status,
           message:res?  res.message :'FAIL_CREATE_USER',
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
export async function ModifyUser(newInfo,oldInfo){

    console.log(newInfo)

    try{



        let status='success';
        // setLoading(true)

        let info = {
            email:newInfo.email,
            user_groups:newInfo.user_groups.map(groups=>{
                return {user_group_id:groups.user_group_id}
            })
        }
        let res = await modifyUser(info);


        if(res.code!='ok')
            status='error'


        setNotiboxOpt({
            variant:status,
              message:res?  res.message :'FAIL_MODIFY_USER',
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
export async function DeleteUser(info){


    try{
        let status='success';
        setLoading(true)
        let res = await deleteUser(info.email);


        if(res.code!='ok')
            status='error'


        setNotiboxOpt({
            variant:status,
               message:res?  res.message :'FAIL_DELETE_USER',
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