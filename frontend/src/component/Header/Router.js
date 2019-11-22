import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ScenarioContainer from '../../container/Scenario/ScenarioContainer';
import AnswerContainer from '../../container/Answer/AnswerContainer';
import SettingContainer from '../../container/Setting/SettingContainer';

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
            <Route exact path="/Answer" component={AnswerContainer} />
            <Route exact path="/Setting" component={SettingContainer} />
            <Route path="*" component={NoMatch} />
        </Switch>
    );
};

export default Router;
