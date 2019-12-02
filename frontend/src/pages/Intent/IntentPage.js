import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MaterialTable from 'material-table'

import IntentCRUDGrid from '../../component/Intent/IntentCRUDGrid';

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
            <IntentCRUDGrid

            />
            <MaterialTable
                title="Intent List"
                columns={[
                    {title: 'Intent', filed: 'name'},
                    {title: 'examples', filed: 'utterance_count'},
                    
                ]}
                data = {[]}
                options={{
                    sorting: true
                }}
            />
            
        </div>
    );
};

export default IntentPage;
