import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table'

import AddEntity from '../../component/Entity/AddEntity';
import DeleteEntities from '../../component/Entity/DeleteEntities';
import ExportEntities from '../../component/Entity/ExportEntities';
import ImportEntities from '../../component/Entity/ImportEntities';

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

const EntityPage = ({
}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <AddEntity />
                    <ImportEntities  />
                    <ExportEntities  />
                    <DeleteEntities  />
                </Grid>
            </Grid>
            <MaterialTable
                title="Entity List"
                columns={[
                    {title: 'Entity', filed: 'name'},
                    {title: 'Value', filed: 'value'},
                    {title: 'Synonyms', filed: 'synonym'},
                ]}
                data = {[]}
                options={[
                    sorting: true
                ]}
            />
        </div>
    );
};

export default EntityPage;
