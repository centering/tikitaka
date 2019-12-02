import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table'

import EntityCRUDGrid from '../../component/Entity/EntityCRUDGrid';

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
            <EntityCRUDGrid 

            />
            <MaterialTable
                title="Entity List"
                columns={[
                    {title: 'Entity', filed: 'name'},
                    {title: 'Value', filed: 'value'},
                    {title: 'Synonyms', filed: 'synonym'},
                ]}
                data = {[]}
                options={{
                    sorting: true
                }}
            />
        </div>
    );
};

export default EntityPage;
