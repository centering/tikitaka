import React from 'react';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const ImportIntents = ({ importIntents, envVar }) => {
    return (
        <>
            <Button
                onClick={() => importIntents()}
                variant="contained"
                color="primary"
                startIcon={<CloudUploadIcon />}
            >
                Import intents
            </Button>
        </>
    );
};

export default ImportIntents;
