import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';

import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';


import {GET_TRANS_LANG} from "../../lib/common";

import MyMenu from './Menu'
import Router from './Router'
import ProjectSelector from "./ProjectSelector";


const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(2),
    },
    toolbar: theme.mixins.toolbar,
    logo: {

        height:30
      },
    RightToolbar: {
        marginLeft:'auto',
        marginRight:'0'
    }

});

function ClippedDrawer(props) {
    const { classes } = props;
    const { UserInfo,SelectProject} = props;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const lang = localStorage.getItem('lang')
    function handleMenu(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    function checkAuth(type){

        let auth=false;

        if(UserInfo.get('projects')[SelectProject].role=='Admin') {
            return true
        }



        return auth

    }
    function changeLang(){

        if(lang=='KOREAN'){
            localStorage.setItem('lang','ENGLISH')
        }
        else
            localStorage.setItem('lang','KOREAN')

        window.location.reload()
    }

    return (

        <div className={classes.root}>

            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                <img src='/assets/image/piglet.png' className={classes.logo}/>
                    {/* <Typography variant="h6" color="inherit" >
                        Piglet
                    </Typography> */}

                    <div style={{marginLeft:10}}>
                        {GET_TRANS_LANG('WELCOME')}, {UserInfo.get('email')}! {GET_TRANS_LANG('WELCOME_ROLE_PRE')} {UserInfo.get('projects')[parseInt(SelectProject)].user_group_name} {GET_TRANS_LANG('WELCOME_ROLE_POST')}
                    </div>


                    {UserInfo.get('email')!=''?
                        <div className={classes.RightToolbar}>

                            <span style={{paddingTop:'5px',float:'left'}}>
                            <ProjectSelector Project={UserInfo.get('projects')}
                                             SelectProjectIdx={SelectProject}
                                             OnChangeProject={props.OnChangeProject}
                            />
                            </span>

                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >

                                <AccountCircle />

                            </IconButton>
                            <span style={{cursor:'pointer',position:'relative',top:'6px'}}>
                                <img onClick={changeLang} src={`/assets/flag/${lang}.png`} width={'20'}/>
                            </span>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={handleClose}
                            >

                                <MenuItem onClick={props.onModifyUser}>{GET_TRANS_LANG('MY_ACCOUNT')}</MenuItem>
                                <MenuItem onClick={props.OnSignOut}>{GET_TRANS_LANG('SIGN_OUT')}</MenuItem>
                            </Menu>
                        </div>
                        :<div className={classes.RightToolbar}>
                            <a style={{cursor:'pointer'}} onClick={props.onSignIn}>{GET_TRANS_LANG('SIGN_IN')}</a>

                        </div>}

                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.toolbar} />
                <List>
                    <MyMenu/>
                </List>

            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />

                <Router CheckAuth={checkAuth}/>

            </main>
        </div>
    );
}


export default withStyles(styles)(ClippedDrawer);

