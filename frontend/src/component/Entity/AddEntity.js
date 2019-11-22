import React from 'react';
import Button from '@material-ui/core/Button';

const AddEntity = ({ createEntity, envVar }) => {
    return (
        <>
            <Button
                onClick={() => createEntity({ scenario_group_id: envVar.get('selected_scenario_group_id') })}
                variant="contained"
                color="primary"
            >
                Create entity
            </Button>
        </>
    );
};

export default AddEntity;
