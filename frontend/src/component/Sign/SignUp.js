import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {GET_TRANS_LANG} from "../../lib/common";


function Copyright() {
  return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        {new Date().getFullYear()}{' '}
        {'Piglet.'}
        {' All rights reserved.'}
      </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    margin: theme.spacing(1),
    height:100
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
}));

export default function SignUp(props) {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
      <img src='/assets/image/piglet.png' className={classes.logo}/>
        <Typography component="h1" variant="h5">
          {GET_TRANS_LANG('SIGN_UP')}
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="f_name"
                variant="outlined"
                value={props.SignUpInput.get('f_name')}
                onChange={props.SetSignUpInput.bind(this)}
                required
                fullWidth
                label={GET_TRANS_LANG('FIRST_NAME')}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={props.SignUpInput.get('l_name')}
                onChange={props.SetSignUpInput.bind(this)}
                label={GET_TRANS_LANG('LAST_NAME')}
                name="l_name"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={props.SignUpInput.get('email')}
                onChange={props.SetSignUpInput.bind(this)}
                label={GET_TRANS_LANG('EMAIL')}
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="pwd"
                value={props.SignUpInput.get('pwd')}
                onChange={props.SetSignUpInput.bind(this)}
                label={GET_TRANS_LANG('PASSWORD')}
                type="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="check_pwd"
                value={props.SignUpInput.get('check_pwd')}
                onChange={props.SetSignUpInput.bind(this)}
                label={GET_TRANS_LANG('CHECK_PASSWORD')}
                type="password"
              />
            </Grid>
            <Grid item xs={12}></Grid>
            <Grid item xs={12}>
              <Box>
              <Typography variant="body2" color="secondary" align="center">
                {props.SignUpInput.get('status')=='BLANK_INFO' && GET_TRANS_LANG('BLANK_INFO')}
                {props.SignUpInput.get('status')=='PASSWORD_CHECK_WRONG'  &&  GET_TRANS_LANG('PASSWORD_CHECK_WRONG')}
              </Typography>
              </Box>
              </Grid>
            
          </Grid>
          <Button
            fullWidth
            onClick={props.SignUp}
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {GET_TRANS_LANG('SIGN_UP')}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
            <Link href='#' onClick={props.GoSignInPage} variant="body2">
                  {GET_TRANS_LANG('ALREADY_ACCOUNT')}
                </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}