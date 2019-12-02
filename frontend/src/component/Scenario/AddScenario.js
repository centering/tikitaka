import React from 'react';
import Button from '@material-ui/core/Button';

const AddScenario = ({ createScenario, envVar, type }) => {
    function Create() {
        if (type === 'scenario') {
            createScenario({ scenario_group_id: envVar.get('selected_scenario_group_id') });
        } else {
            createScenario({ reaction_group_id: envVar.get('selected_answer_group_id') });
        }
    }
    return (
        <>
            <Button onClick={Create} variant="contained" color="primary">
                추가
            </Button>
        </>
    );
};

export default AddScenario;
