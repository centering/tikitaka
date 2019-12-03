import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import DeleteIcon from '@material-ui/icons/Delete';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      
    },
}));

const IntentCRUDGrid = ({ createIntent, importIntents, exportIntents, deleteIntents, envVar }) => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Button
                        onClick={() => createIntent()}
                        variant="contained"
                        color="primary"
                    >
                        Create intent
                    </Button>

                    <Button
                        onClick={() => importIntents()}
                        variant="contained"
                        startIcon={<CloudUploadIcon />}
                    >
                        Import intents
                    </Button>

                    <Button
                        onClick={() => exportIntents()}
                        variant="contained"
                        startIcon={<CloudDownloadIcon />}
                    >
                        Export Intents
                    </Button>

                    <Button
                        onClick={() => deleteIntents()}
                        variant="contained"
                        color="secondary"
                        startIcon={<DeleteIcon />}
                    >
                        Delete intents
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default IntentCRUDGrid;
