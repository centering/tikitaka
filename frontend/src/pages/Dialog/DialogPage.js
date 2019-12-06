import React from 'react';
import Grid from '@material-ui/core/Grid';

import DialogFlow from '../../component/Dialog/DialogFlow';

const DialogPage = ({
    flow_data, onChange
}) => {
    return (
        <div>
            <h2>Dialog Flow</h2>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <DialogFlow flow_data={flow_data} onChange={onChange}/>
                </Grid>
            </Grid>
        </div>
    );
};

export default DialogPage;
