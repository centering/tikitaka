
import React from 'react';

import Header from '../../component/Header/Header'

import Progress from '../../component/common/Progress'
import Notibox from '../../component/common/Notibox'


const HeaderPage = ({Loading,NotiOpt,SetNotiboxOpt,OnChangeProject,OnSignIn,OnSignOut,SelectProject,UserInfo})=>{

    return(
        <React.Fragment>
            {Loading && <Progress/>}
            <Header OnChangeProject={OnChangeProject}
                    OnSignIn={OnSignIn}
                    SelectProject={SelectProject}
                    OnSignOut={OnSignOut}
                    UserInfo={UserInfo}/>

            <Notibox Variant={NotiOpt.get('variant')}
                     Message={NotiOpt.get('message')}
                     Open={NotiOpt.get('open')}
                     Onclose={()=>SetNotiboxOpt({open:false})}
            />


        </React.Fragment>

    )


}

export default HeaderPage