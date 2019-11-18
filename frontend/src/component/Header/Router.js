import React from "react";
import { Route,Switch} from 'react-router-dom';
import {GET_TRANS_LANG} from "../../lib/common";
import DashboardContainer from '../../container/Dashboard/DashboardContainer'
import UserGroupContainer from '../../container/Settings/UserGroupContainer'
import UserContainer from '../../container/Settings/UserContainer'

const Router =({CheckAuth})=> {

    return(

        <Switch>
            <Route exact path='/' render={() =>
                CheckAuth('Dashboard') ?
                    <Route component={DashboardContainer}/> :
                    <UnAuthorize/>

            }/>
            <Route exact path='/Settings/UserGroup' render={() =>
                CheckAuth('Settings') ?
                    <Route component={UserGroupContainer}/> :
                    <UnAuthorize/>

            }/>
             <Route exact path='/Settings/User' render={() =>
                CheckAuth('Settings') ?
                    <Route component={UserContainer}/> :
                    <UnAuthorize/>

            }/>


            <Route path='*' component={NoMatch}/>
        </Switch>
    )
}


const NoMatch =()=>{

    return (
        <div>
            <h2>{GET_TRANS_LANG('PAGE_NOT_FOUND')}</h2>
        </div>
    )

}


const UnAuthorize =()=>{

    return (
        <div>
            <h2>{GET_TRANS_LANG('PAGE_UNAUTHROIZED')}</h2>
        </div>
    )

}




export default Router


