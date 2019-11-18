import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';

import MyMenu from './Menu'
import Router from './Router'

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
    
   

    return (

        <div className={classes.root}>

            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                
                    <Typography variant="h6" color="inherit" >
                        Tikitaka
                    </Typography>

                

        

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

                <Router/>

            </main>
        </div>
    );
}


export default withStyles(styles)(ClippedDrawer);

