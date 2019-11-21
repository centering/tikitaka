import React from 'react';

import { Link, withRouter } from 'react-router-dom';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import ListItemText from '@material-ui/core/ListItemText';

import DashboardIcon from '@material-ui/icons/Dashboard';

const MyMenu = () => {
    return (
        <div>
            <ListItem component={Link} to="/Scenario" button>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="대화 시나리오" />
            </ListItem>
        </div>
    );
};

export default withRouter(MyMenu);
