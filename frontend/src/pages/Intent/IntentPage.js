import React from 'react';
import Grid from '@material-ui/core/Grid';

import AddIntent from '../../component/Intent/AddIntent';
import DeleteIntents from '../../component/Intent/DeleteIntents';
import ExportIntents from '../../component/Intent/ExportIntents';
import ImportIntents from '../../component/Intent/ImportIntents';

const IntentPage = ({
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
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    {scenarioGroup && (
                        <GroupList
                            groupName="scenario_group"
                            Group={scenarioGroup}
                            envVar={envVar}
                            setEnvVar={setEnvVar}
                            deleteGroup={deleteScenarioGroup}
                        />
                    )}
                    <GroupCreate createGroup={createScenarioGroup} />
                </Grid>
                <Grid item xs={12}>
                    {scenario && <ScenarioList scenario={scenario} deleteScenario={deleteScenario} reviseScenario={reviseScenario} />}
                </Grid>

                <Grid item xs={12}>
                    <div style={{ top: 0, position: 'sticky' }}>
                        <AddIntent createScenario={createScenario} envVar={envVar} />
                    </div>
                    <div style={{ top: 0, position: 'sticky' }}>
                        <ImportIntents createScenario={createScenario} envVar={envVar} />
                    </div>
                    <div style={{ top: 0, position: 'sticky' }}>
                        <ExportIntents createScenario={createScenario} envVar={envVar} />
                    </div>
                    <div style={{ top: 0, position: 'sticky' }}>
                        <DeleteIntents createScenario={createScenario} envVar={envVar} />
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default IntentPage;
