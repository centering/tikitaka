import React from 'react';

import { Link, withRouter } from 'react-router-dom';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import ListItemText from '@material-ui/core/ListItemText';

import DashboardIcon from '@material-ui/icons/Dashboard';

const MyMenu = () => {
    return (
        <>
            <ListItem component={Link} to="/Scenario" button>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="대화 시나리오" />
            </ListItem>

            <ListItem component={Link} to="/Scenario" button>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="자동 답변" />
            </ListItem>

            <ListItem component={Link} to="/Scenario" button>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Intents" />
            </ListItem>

            <ListItem component={Link} to="/Scenario" button>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Entities" />
            </ListItem>

            <ListItem component={Link} to="/Scenario" button>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dialog" />
            </ListItem>
        </>
    );
};

export default withRouter(MyMenu);
