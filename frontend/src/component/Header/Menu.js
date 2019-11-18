import React from "react";

import {Link,withRouter} from "react-router-dom";
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

import PersonIcon from '@material-ui/icons/Person';
import UserGroupIcon from '@material-ui/icons/People';
import SettingIcon from '@material-ui/icons/Settings';
import DataIcon from '@material-ui/icons/CloudUpload';
import GeneralIcon from '@material-ui/icons/Info';
import JobIcon from '@material-ui/icons/CheckBox';
import TaskIcon from '@material-ui/icons/ViewList';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Divider from '@material-ui/core/Divider';
import {GET_TRANS_LANG} from "../../lib/common";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));




const MyMenu =()=>{

    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    function handleClick() {
        setOpen(!open);
    }


    return(

        <div>


            <ListItem  onClick={handleClick} button>
                <ListItemIcon>
                    <SettingIcon/>
                </ListItemIcon>
                <ListItemText primary={GET_TRANS_LANG("SETTINGS")} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button className={classes.nested}>
                        <ListItemIcon>
                            <GeneralIcon />
                        </ListItemIcon>
                        <ListItemText primary={GET_TRANS_LANG("GENERAL")}  />
                    </ListItem>

                    <ListItem component={Link} to="/Settings/User" button className={classes.nested}>
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary={GET_TRANS_LANG("USER")}  />
                    </ListItem>
                    <ListItem component={Link} to="/Settings/UserGroup" button className={classes.nested}>
                        <ListItemIcon>
                            <UserGroupIcon />
                        </ListItemIcon>
                        <ListItemText primary={GET_TRANS_LANG("USER_GROUP")}  />
                    </ListItem>


                    <ListItem button className={classes.nested}>
                        <ListItemIcon>
                            <DataIcon />
                        </ListItemIcon>
                        <ListItemText primary={GET_TRANS_LANG("DATA")}  />
                    </ListItem>

                    <ListItem button className={classes.nested}>
                        <ListItemIcon>
                            <TaskIcon />
                        </ListItemIcon>
                        <ListItemText primary={GET_TRANS_LANG("TASK")}  />
                    </ListItem>


                </List>
            </Collapse>
            <Divider />
            <ListItem component={Link} to="/" button>
                <ListItemIcon>
                    <DashboardIcon/>
                </ListItemIcon>
                <ListItemText primary={GET_TRANS_LANG('DASHBOARD')}/>
            </ListItem>
            <Divider />
            <ListItem component={Link} to="/Job" button>
                <ListItemIcon>
                    <JobIcon/>
                </ListItemIcon>
                <ListItemText primary={GET_TRANS_LANG("JOB")}  />
            </ListItem>

            {/*<ListSubheader>Management</ListSubheader>*/}

            {/*<ListItem component={Link} to="/project" button>*/}
            {/*<ListItemIcon>*/}
            {/*<InboxIcon/>*/}
            {/*</ListItemIcon>*/}
            {/*<ListItemText primary={'Project'} />*/}
            {/*</ListItem>*/}

            {/*<ListItem component={Link} to="/User" button>*/}
            {/*<ListItemIcon>*/}
            {/*<UserManagementIcon/>*/}
            {/*</ListItemIcon>*/}
            {/*<ListItemText primary={'User'} />*/}
            {/*</ListItem>*/}

            {/*<ListSubheader>Annotate for Generation Text</ListSubheader>*/}

            {/*<ListItem component={Link} to="/SingleTurn" button>*/}
            {/*<ListItemIcon>*/}
            {/*<SingleTurnIcon/>*/}
            {/*</ListItemIcon>*/}
            {/*<ListItemText primary={'Single Turn'} />*/}
            {/*</ListItem>*/}

            {/*<ListItem component={Link} to="/MultiTurn" button>*/}
            {/*<ListItemIcon>*/}
            {/*<MultiTurnIcon/>*/}
            {/*</ListItemIcon>*/}
            {/*<ListItemText primary={'Multi Turn'} />*/}
            {/*</ListItem>*/}

            {/*<ListSubheader>Annotate for Log Text</ListSubheader>*/}

            {/*<ListItem component={Link} to="/MultiTurnLog" button>*/}
            {/*<ListItemIcon>*/}
            {/*<MultiTurnIcon/>*/}
            {/*</ListItemIcon>*/}
            {/*<ListItemText primary={'Multi Turn Log'} />*/}
            {/*</ListItem>*/}


            {/*<ListSubheader>Labels</ListSubheader>*/}

            {/*<ListItem component={Link} to="/Domain" button>*/}
            {/*<ListItemIcon>*/}
            {/*<DomainIcon/>*/}
            {/*</ListItemIcon>*/}
            {/*<ListItemText primary={'Domain'} />*/}
            {/*</ListItem>*/}

            {/*<ListItem component={Link} to="/Intent" button>*/}
            {/*<ListItemIcon>*/}
            {/*<IntentIcon/>*/}
            {/*</ListItemIcon>*/}
            {/*<ListItemText primary={'Intent'} />*/}
            {/*</ListItem>*/}

            {/*<ListItem component={Link} to="/DialogAct" button>*/}
            {/*<ListItemIcon>*/}
            {/*<DialogActIcon/>*/}
            {/*</ListItemIcon>*/}
            {/*<ListItemText primary={'Dialog Act'} />*/}
            {/*</ListItem>*/}

            {/*<ListItem component={Link} to="/Entity" button>*/}
            {/*<ListItemIcon>*/}
            {/*<EntityIcon/>*/}
            {/*</ListItemIcon>*/}
            {/*<ListItemText primary={'Named Entity'} />*/}
            {/*</ListItem>*/}

            {/*<ListSubheader>Config</ListSubheader>*/}

            {/*<ListItem component={Link} to="/Setting" button>*/}
            {/*<ListItemIcon>*/}
            {/*<SettingIcon/>*/}
            {/*</ListItemIcon>*/}
            {/*<ListItemText primary={'Setting'} />*/}
            {/*</ListItem>*/}

            {/*<ListItem component={Link} to="/Dashboard" button>*/}
            {/*<ListItemIcon>*/}
            {/*<DashboardIcon/>*/}
            {/*</ListItemIcon>*/}
            {/*<ListItemText primary={'Dashboard'} />*/}
            {/*</ListItem>*/}

        </div>


    )

}

export default withRouter(MyMenu)