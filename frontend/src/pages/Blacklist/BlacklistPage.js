import React from 'react';
import Grid from '@material-ui/core/Grid';

import GroupList from '../../component/Group/GroupList';
import GroupCreate from '../../component/Group/GroupCreate';
import AddScenario from '../../component/Scenario/AddScenario';
import ScenarioList from '../../component/Scenario/ScenarioList';

const BlacklistPage = ({
    blacklistGroup,
    setEnvVar,
    envVar,
    blacklist,
    createBlacklist,
    createBlacklistGroup,
    reviseBlacklist,
    deleteBlacklist,
    deleteBlacklistGroup,
}) => {
    return (
        <div>
            <h2>비속어({envVar.get('selected_blacklist_group_name')})</h2>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    {blacklistGroup && (
                        <GroupList
                            groupName="blacklist_group"
                            Group={blacklistGroup}
                            envVar={envVar}
                            setEnvVar={setEnvVar}
                            deleteGroup={deleteBlacklistGroup}
                        />
                    )}
                    <GroupCreate createGroup={createBlacklistGroup} />
                </Grid>
                <Grid item xs={12}>
                    {blacklist && <ScenarioList type="scenario" scenario={blacklist} deleteScenario={deleteBlacklist} reviseScenario={reviseBlacklist} />}
                </Grid>

                <Grid item xs={12}>
                    <div style={{ top: 0, position: 'sticky' }}>
                        <AddScenario type="scenario" createScenario={createBlacklist} envVar={envVar} />
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default ScenarioPage;
