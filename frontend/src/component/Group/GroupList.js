import React from 'react';
import Chip from '@material-ui/core/Chip';

const GroupList = ({ scenarioGroup, envVar, setEnvVar, deleteScenarioGroup }) => {
    function handleDelete(id) {
        deleteScenarioGroup(id);
    }
    function handleClick(group) {
        const new_state = envVar.set('selected_scenario_group_id', group.id).set('selected_scenario_group_name', group.name);

        setEnvVar(new_state);
    }

    return (
        <>
            {scenarioGroup.map(group => {
                return (
                    <Chip
                        key={group.id}
                        clickable
                        label={group.name}
                        onDelete={() => handleDelete(group.id)}
                        onClick={() => handleClick(group)}
                        color="primary"
                        variant="outlined"
                    />
                );
            })}
        </>
    );
};

export default GroupList;
