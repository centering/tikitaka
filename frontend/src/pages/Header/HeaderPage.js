
import React from 'react';

import Header from '../../component/Header/Header'

import Progress from '../../component/common/Progress'
import Notibox from '../../component/common/Notibox'


const HeaderPage = ({Loading,NotiOpt,SetNotiboxOpt})=>{

    return(
        <React.Fragment>
            {Loading && <Progress/>}
            <Header/>

            <Notibox Variant={NotiOpt.get('variant')}
                     Message={NotiOpt.get('message')}
                     Open={NotiOpt.get('open')}
                     Onclose={()=>SetNotiboxOpt({open:false})}
            />


        </React.Fragment>

    )


}

export default HeaderPage