import React from 'react';
import Button from '@material-ui/core/Button';

const AddIntent = ({ createIntent, envVar }) => {
    return (
        <>
            <Button
                onClick={() => createIntent({ scenario_group_id: envVar.get('selected_scenario_group_id') })}
                variant="contained"
                color="primary"
            >
                Create intent
            </Button>
        </>
    );
};

export default AddIntent;
