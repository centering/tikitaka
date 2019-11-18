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
    marginTop: theme.spacing(1),
  },

}));

export default function SignIn(props) {
  const classes = useStyles();


  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <img src='/assets/image/piglet.png' className={classes.logo}/>
         
          <Typography component="h1" variant="h5">
            {GET_TRANS_LANG('SIGN_IN')}
          </Typography>
          <form className={classes.form} >
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                value={props.SignInInput.get('email')}
                onChange={props.SetSignInInput.bind(this)}
                name="email"
                label={GET_TRANS_LANG('EMAIL')}
                autoComplete="email"
                autoFocus
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                value={props.SignInInput.get('pwd')}
                onChange={props.SetSignInInput.bind(this)}
                label={GET_TRANS_LANG('PASSWORD')}
                type="password"
                name="pwd"
                autoComplete="current-password"
            />
            <FormControlLabel
                control={<Checkbox name="remember" onChange={props.SetSignInInput.bind(this)} checked={props.SignInInput.get('remember')} color="primary" />}
                label={GET_TRANS_LANG('REMEMBER_ME')}
            />
            <Box>
              <Typography variant="body2" color="secondary" align="center">
                {props.SignInInput.get('status')=='INVALID' &&GET_TRANS_LANG('INVALID_LOGIN')}
                {props.SignInInput.get('status')=='BLANK_INFO' && GET_TRANS_LANG('BLANK_INFO')}
                {props.SignInInput.get('status')=='EXPIRED'  &&  GET_TRANS_LANG('EXPIRED')}
              </Typography>
            </Box>
            <Button
                onClick={props.SignIn}
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
              {GET_TRANS_LANG('SIGN_IN')}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  {GET_TRANS_LANG('FORGOT_PASSWORD')}
                </Link>
              </Grid>
              <Grid item>
                <Link href='#' onClick={props.GoSignUpPage} variant="body2">
                  {GET_TRANS_LANG('SIGN_UP')}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
  );
}
