import React from 'react';
import Grid from '@material-ui/core/Grid';

import AddEntity from '../../component/Entity/AddEntity';
import DeleteEntities from '../../component/Entity/DeleteEntities';
import ExportEntities from '../../component/Entity/ExportEntities';
import ImportEntities from '../../component/Entity/ImportEntities';

const EntityPage = ({
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
                        <AddEntity createScenario={createScenario} envVar={envVar} />
                    </div>
                    <div style={{ top: 0, position: 'sticky' }}>
                        <ImportEntities createScenario={createScenario} envVar={envVar} />
                    </div>
                    <div style={{ top: 0, position: 'sticky' }}>
                        <ExportEntities createScenario={createScenario} envVar={envVar} />
                    </div>
                    <div style={{ top: 0, position: 'sticky' }}>
                        <DeleteEntities createScenario={createScenario} envVar={envVar} />
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default EntityPage;
