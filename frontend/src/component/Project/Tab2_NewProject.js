import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {GET_TRANS_LANG} from "../../lib/common";

const useStyles = makeStyles(theme => ({

    form: {
        width: 360,
        maxHeight:400

    }


}));

const Tab2 = (props) => {

    const classes = useStyles();
    return (

        <form className={classes.form} >
            <TextField
                // variant="outlined"
                margin="normal"
                required
                fullWidth
                value={props.CreateProjectInput.get('project_name')}
                onChange={props.SetcreateProjectInput.bind(this)}
                name="project_name"
                // InputLabelProps={{ shrink: true,margin:'dense' }}
                label={GET_TRANS_LANG('PROJECT_NAME')}
                // autoComplete="project_name"
                autoFocus
            />
            <TextField
                // variant="outlined"
                margin="normal"
                required
                fullWidth
                value={props.CreateProjectInput.get('project_desc')}
                onChange={props.SetcreateProjectInput.bind(this)}
                label={GET_TRANS_LANG('DESC')}
                name="project_desc"
                multiline
                rows="4"
            // autoComplete="current-password"
            />
            <Box>
                <Typography variant="body2" color="secondary" align="center">
                    {props.CreateProjectInput.get('status') == 'BLANK_INFO' && GET_TRANS_LANG('BLANK_INFO')}
                </Typography>
            </Box>
            <Button
                onClick={props.CreateProject}
                fullWidth
                variant="contained"
                color="primary"
            >
                {GET_TRANS_LANG('CREATE_NEW_PROJECT')}
            </Button>

        </form>


    )
}


export default Tab2