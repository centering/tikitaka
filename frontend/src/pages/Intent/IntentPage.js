import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MaterialTable from 'material-table'

import AddIntent from '../../component/Intent/AddIntent';
import DeleteIntents from '../../component/Intent/DeleteIntents';
import ExportIntents from '../../component/Intent/ExportIntents';
import ImportIntents from '../../component/Intent/ImportIntents';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

const IntentPage = ({
}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <AddIntent />
                    <ImportIntents  />
                    <ExportIntents  />
                    <DeleteIntents  />
                </Grid>
            </Grid>
        </div>
    );
};

export default IntentPage;
