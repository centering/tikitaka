import React from 'react';
import Button from '@material-ui/core/Button';

const AddScenario = ({ createScenario, envVar }) => {
    return (
        <>
            <Button
                onClick={() => createScenario({ scenario_group_id: envVar.get('selected_scenario_group_id') })}
                variant="contained"
                color="primary"
            >
                시나리오 추가
            </Button>
        </>
    );
};

export default AddScenario;
