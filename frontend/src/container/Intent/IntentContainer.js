import React, { Component } from 'react';

import { connect } from 'react-redux';

import IntentPage from '../../pages/Intent/IntentPage';
import { ScenarioActions } from '../../store/actionCreator';

import * as IntentCRUD from './IntentCRUD';

class IntentContainer extends Component {
    componentDidMount() {
        IntentCRUD.GetScenarioGroup();
    }

    componentDidUpdate(prevProps) {
        const { env_var, action_status } = this.props;
        
    }

    setEnvVar(value) {
        ScenarioActions.set_env_var(value);
    }

    render() {
        const { scenario, scenario_group, env_var } = this.props;
        return (
            <div>
            </div>
        );
    }
}

export default connect(({ common, scenario }) => ({
    
}))(IntentContainer);
