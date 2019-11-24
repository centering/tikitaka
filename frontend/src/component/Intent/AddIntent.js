import React from 'react';
import Button from '@material-ui/core/Button';

const AddIntent = ({ createIntent, envVar }) => {
    return (
        <>
            <Button
                onClick={() => createIntent()}
                variant="contained"
                color="primary"
            >
                Create intent
            </Button>
        </>
    );
};

export default AddIntent;
