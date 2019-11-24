import React from 'react';
import Button from '@material-ui/core/Button';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

const ExportIntents = ({ exportIntents, envVar }) => {
    return (
        <>
            <Button
                onClick={() => exportIntents()}
                variant="contained"
                color="primary"
                startIcon={<CloudDownloadIcon />}
            >
                Export Intents
            </Button>
        </>
    );
};

export default ExportIntents;
