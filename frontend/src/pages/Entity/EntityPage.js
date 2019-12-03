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
    },
  }));

const EntityPage = ({
    entity_list, createEntity, importEntities, exportEntities, deleteEntities, envVar
}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <EntityCRUDGrid 
                createEntity={createEntity}
                importEntities={importEntities}
                exportEntities={exportEntities}
                deleteEntities={deleteEntities}
            />
            <MaterialTable
                title="Entity List"
                columns={[
                    {title: 'Entity', filed: 'name'},
                    {title: 'Value', filed: 'value'},
                    {title: 'Synonyms', filed: 'synonym'},
                ]}
                data = {entity_list}
                options={{
                    sorting: true,
                    search: true
                }}
            />
        </div>
    );
};

export default EntityPage;
