import React, {forwardRef} from 'react';

import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import DeleteIcon from '@material-ui/icons/Delete';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import MaterialTable from 'material-table'

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};


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
    const [state, setState] = React.useState({
        drawerOpen: false,
    });

    const toggleDrawer = (flag) => event => {
        setState({ drawerOpen: flag });
    };

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Button
                        onClick={toggleDrawer(true)}
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
                        onClick={toggleDrawer(true)}
                        variant="contained"
                        color="secondary"
                        startIcon={<DeleteIcon />}
                    >
                        Delete intents
                    </Button>
                </Grid>
            </Grid>
            <Drawer anchor='bottom' open={state.drawerOpen} onClose={toggleDrawer(false)}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            id="intentNameTextField"
                            label="Intent Name"
                            style={{ margin: 8 }}
                            helperText="input unique intent name"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="intentDescriptionTextField"
                            label="Intent Description(optional)"
                            style={{ margin: 8 }}
                            helperText="describe intent description"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="intentUtteranceTextField"
                            label="User Example"
                            style={{ margin: 8 }}
                            helperText="Add unique examples of what the user might say. (tip: Add at least 10 unique examples to help model understand)"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            onClick={toggleDrawer(false)}
                            variant="contained"
                        >
                            Save Intent
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <MaterialTable
                            icons={tableIcons}
                            title=''
                            columns={[
                                {title: 'User examples', field: 'text'},
                                {title: 'When', field: 'modify_dt'},
                            ]}
                            data = {[]}
                            options={{
                                sorting:true,
                                search:false,
                            }}
                        />
                    </Grid>
                </Grid>
            </Drawer>
        </div>
    );
};

export default IntentCRUDGrid;
