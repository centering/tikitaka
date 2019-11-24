import React from 'react';
import Button from '@material-ui/core/Button';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

const ExportEntities = ({ exportEntities, envVar }) => {
    return (
        <>
            <Button
                onClick={() => exportEntities({ scenario_group_id: envVar.get('selected_scenario_group_id') })}
                variant="contained"
                color="primary"
                startIcon={<CloudDownloadIcon />}
            >
                Export entities
            </Button>
        </>
    );
};

export default ExportEntities;
