import React from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

const DeleteIntents = ({ deleteIntents, envVar }) => {
    return (
        <>
            <Button
                onClick={() => deleteIntents()}
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
