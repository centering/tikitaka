import React from 'react';
import Grid from '@material-ui/core/Grid';

import GroupList from '../../component/Group/GroupList';
import GroupCreate from '../../component/Group/GroupCreate';
import AddScenario from '../../component/Scenario/AddScenario';
import ScenarioList from '../../component/Scenario/ScenarioList';

const ScenarioPage = ({
    scenarioGroup,
    setEnvVar,
    envVar,
    scenario,
    createScenario,
    createScenarioGroup,
    reviseScenario,
    deleteScenario,
    deleteScenarioGroup,
}) => {
    return (
        <div>
            <h2>대화 시나리오({envVar.get('selected_scenario_group_name')})</h2>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <GroupList scenarioGroup={scenarioGroup} envVar={envVar} setEnvVar={setEnvVar} deleteScenarioGroup={deleteScenarioGroup} />
                    <GroupCreate createScenarioGroup={createScenarioGroup} />
                </Grid>
                <Grid item xs={12}>
                    {scenario && <ScenarioList scenario={scenario} deleteScenario={deleteScenario} reviseScenario={reviseScenario} />}
                </Grid>

                <Grid item xs={12}>
                    <div style={{ top: 0, position: 'sticky' }}>
                        <AddScenario createScenario={createScenario} envVar={envVar} />
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default ScenarioPage;
