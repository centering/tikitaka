import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MaterialTable from 'material-table'

import IntentCRUDGrid from '../../component/Intent/IntentCRUDGrid';

const IntentPage = ({
    intent_list, createIntent, importIntents, exportIntents, deleteIntents, envVar
}) => {
    
    return (
        <div>
            <IntentCRUDGrid
                createIntent={createIntent}
                importIntents={importIntents}
                exportIntents={exportIntents}
                deleteIntents={deleteIntents}
                envVar={envVar}
            />
            <MaterialTable
                title="Intent List"
                columns={[
                    {title: 'Intent', filed: 'name'},
                    {title: 'examples', filed: 'utterance_count'},
                    
                ]}
                data = {intent_list}
                options={{
                    sorting: true,
                    search: true
                }}
            />
            
        </div>
    );
};

export default IntentPage;
