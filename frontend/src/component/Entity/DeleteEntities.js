import React from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

const DeleteEntities = ({ deleteEntities, envVar }) => {
    return (
        <>
            <Button
                onClick={() => deleteEntities({ scenario_group_id: envVar.get('selected_scenario_group_id') })}
                variant="contained"
                color="secondary"
                startIcon={<DeleteIcon />}
            >
                Delete entities
            </Button>
        </>
    );
};

export default DeleteEntities;
