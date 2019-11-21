import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ScenarioContainer from '../../container/Scenario/ScenarioContainer';

const NoMatch = () => {
    return (
        <div>
            <h2>PAGE NOT FOUND</h2>
        </div>
    );
};

const Router = () => {
    return (
        <Switch>
            <Route exact path="/" render={() => <></>} />
            <Route exact path="/Scenario" component={ScenarioContainer} />
            <Route path="*" component={NoMatch} />
        </Switch>
    );
};

export default Router;
