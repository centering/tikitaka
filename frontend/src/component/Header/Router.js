import React from "react";
import { Route,Switch} from 'react-router-dom';
import ScenarioContainer from "../../container/Scenario/ScenarioContainer";

const Router = ()=> {

    return(

        <Switch>
            <Route exact path='/' render={() =><div></div> }/>
            <Route exact path='/Scenario' component={ScenarioContainer}/>
            <Route path='*' component={NoMatch}/>
        </Switch>
    )
}


const NoMatch =()=>{

    return (
        <div>
            <h2>PAGE NOT FOUND</h2>
        </div>
    )

}




export default Router


