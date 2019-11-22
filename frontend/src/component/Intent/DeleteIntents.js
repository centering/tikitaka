import React from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

const DeleteIntents = ({ deleteIntents, envVar }) => {
    return (
        <>
            <Button
                onClick={() => deleteIntents({ scenario_group_id: envVar.get('selected_scenario_group_id') })}
                variant="contained"
                color="primary"
                startIcon={<DeleteIcon />}
            >
                Delete intents
            </Button>
        </>
    );
};

export default DeleteIntents;
