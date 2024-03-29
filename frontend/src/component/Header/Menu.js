import React from 'react';

import { Link, withRouter } from 'react-router-dom';

import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import DashboardIcon from '@material-ui/icons/Dashboard';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import SpeakerNotesOffIcon from '@material-ui/icons/SpeakerNotesOff';
import BuildIcon from '@material-ui/icons/Build';
import ChatIcon from '@material-ui/icons/Chat';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import ListIcon from '@material-ui/icons/List';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';

const MyMenu = () => {
    return (
        <>
            <ListSubheader>Small Talk</ListSubheader>
            <ListItem component={Link} to="/Scenario" button>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="대화 시나리오" />
            </ListItem>

            <ListItem component={Link} to="/Answer" button>
                <ListItemIcon>
                    <RecordVoiceOverIcon />
                </ListItemIcon>
                <ListItemText primary="자동 답변" />
            </ListItem>

            <ListItem component={Link} to="/Blacklist" button>
                <ListItemIcon>
                    <SpeakerNotesOffIcon />
                </ListItemIcon>
                <ListItemText primary="비속어" />
            </ListItem>

            <ListItem component={Link} to="/Setting" button>
                <ListItemIcon>
                    <BuildIcon />
                </ListItemIcon>
                <ListItemText primary="설정" />
            </ListItem>

            <ListItem component={Link} to="/Chat" button>
                <ListItemIcon>
                    <ChatIcon />
                </ListItemIcon>
                <ListItemText primary="대화하기" />
            </ListItem>

            <Divider />
            
            <ListSubheader>Dialog Assistant</ListSubheader>
            <ListItem component={Link} to="/Intent" button>
                <ListItemIcon>
                    <AnnouncementIcon />
                </ListItemIcon>
                <ListItemText primary="Intents" />
            </ListItem>

            <ListItem component={Link} to="/Entity" button>
                <ListItemIcon>
                    <ListIcon />
                </ListItemIcon>
                <ListItemText primary="Entities" />
            </ListItem>

            <ListItem component={Link} to="/Dialog" button>
                <ListItemIcon>
                    <QuestionAnswerIcon />
                </ListItemIcon>
                <ListItemText primary="Dialog" />
            </ListItem>
        </>
    );
};

export default withRouter(MyMenu);
