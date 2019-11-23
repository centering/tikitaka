import React from 'react';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const ImportEntities = ({ importEntities, envVar }) => {
    return (
        <>
            <Button
                onClick={() => importEntities({ scenario_group_id: envVar.get('selected_scenario_group_id') })}
                variant="contained"
                color="primary"
                startIcon={<CloudUploadIcon />}
            >
                Import entities
            </Button>
        </>
    );
};

export default ImportEntities;
