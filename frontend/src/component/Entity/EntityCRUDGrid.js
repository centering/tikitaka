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

const IntentCRUDGrid = ({ createEntity, importEntities, exportEntities, deleteEntities, envVar }) => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Button
                        onClick={() => createEntity()}
                        variant="contained"
                        color="primary"
                        
                    >
                        Create Entity
                    </Button>

                    <Button
                        onClick={() => importEntities()}
                        variant="contained"
                        startIcon={<CloudUploadIcon />}
                    >
                        Import Entities
                    </Button>

                    <Button
                        onClick={() => exportEntities()}
                        variant="contained"
                        startIcon={<CloudDownloadIcon />}
                    >
                        Export Entitiess
                    </Button>

                    <Button
                        onClick={() => deleteEntities()}
                        variant="contained"
                        color="secondary"
                        startIcon={<DeleteIcon />}
                    >
                        Delete Entities
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default IntentCRUDGrid;
