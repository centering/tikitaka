import React, { Component } from 'react';

import { connect } from 'react-redux';

import ScenarioPage from '../../pages/Scenario/ScenarioPage';
import { ScenarioActions } from '../../store/actionCreator';

import * as ScenarioCRUD from './ScenarioCRUD';

class ScenarioContainer extends Component {
    componentDidMount() {
        ScenarioCRUD.GetScenarioGroup();
    }

    componentDidUpdate(prevProps) {
        const { env_var, action_status } = this.props;
        if (
            (prevProps.env_var.get('selected_scenario_group_id') !== env_var.get('selected_scenario_group_id') ||
                (prevProps.action_status === '' && action_status === 'NEED_UPDATE_SCENARIO')) &&
            env_var.get('selected_scenario_group_id') !== undefined
        ) {
            ScenarioCRUD.GetScenario(env_var.get('selected_scenario_group_id'));
        }

        if (prevProps.action_status === '' && action_status === 'NEED_UPDATE_SCENARIO_GROUP') {
            ScenarioCRUD.GetScenarioGroup();
        }
    }

    setEnvVar(value) {
        ScenarioActions.set_env_var(value);
    }

    render() {
        const { scenario, scenario_group, env_var } = this.props;
        return (
            <div>
                <ScenarioPage
                    scenarioGroup={scenario_group}
                    scenario={scenario}
                    envVar={env_var}
                    setEnvVar={this.setEnvVar}
                    createScenarioGroup={ScenarioCRUD.CreateScenarioGroup}
                    reviseScenario={ScenarioCRUD.ReviseScenario}
                    deleteScenario={ScenarioCRUD.DeleteScenario}
                    deleteScenarioGroup={ScenarioCRUD.DeleteScenarioGroup}
                    createScenario={ScenarioCRUD.CreateScenario}
                />
            </div>
        );
    }
}

export default connect(({ common, scenario }) => ({
    scenario: scenario.get('scenario'),
    scenario_group: scenario.get('scenario_group'),
    env_var: scenario.get('env_var'),
    action_status: common.get('action_status'),
}))(ScenarioContainer);
