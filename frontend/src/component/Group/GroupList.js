import React from 'react';
import Chip from '@material-ui/core/Chip';

const GroupList = ({ Group, envVar, setEnvVar, deleteGroup, groupName }) => {
    function handleDelete(id) {
        deleteGroup(id);
    }
    function handleClick(group) {
        const new_state = envVar.set(`selected_${groupName}_id`, group.id).set(`selected_${groupName}_name`, group.name);

        setEnvVar(new_state);
    }
    return (
        <>
            {Group.map(group => {
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
