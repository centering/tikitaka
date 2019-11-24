import React from 'react';
import Grid from '@material-ui/core/Grid';

import AddIntent from '../../component/Intent/AddIntent';
import DeleteIntents from '../../component/Intent/DeleteIntents';
import ExportIntents from '../../component/Intent/ExportIntents';
import ImportIntents from '../../component/Intent/ImportIntents';

const IntentPage = ({
    
}) => {
    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <AddIntent  />
                </Grid>
                <Grid item xs={12}>
                    <ImportIntents  />
                </Grid>
                <Grid item xs={12}>
                    <ExportIntents  />
                </Grid>
                <Grid item xs={12}>
                    <DeleteIntents  />
                </Grid>
            </Grid>
        </div>
    );
};

export default IntentPage;
