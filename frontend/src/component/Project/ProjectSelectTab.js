import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { GET_TRANS_LANG } from "../../lib/common";

import Tab1 from './Tab1_SelectProject'
import Tab2 from './Tab2_NewProject'


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      <Box p={1}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
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
  root: {
    flexGrow: 1,
    // backgroundColor: theme.palette.background.paper,
    border: '1px solid #bcbcbc',
    display: 'flex',
    height:'100%'
    // minHeight:'410px'
   
   
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  logo: {
    margin: theme.spacing(1),
    height: 100
  },

}));

export default function VerticalTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <img src='/assets/image/piglet.png' className={classes.logo} />

        <Typography component="h1" variant="h5">
          {GET_TRANS_LANG('PROJECT')}
        </Typography>
      </div>

      <div className={classes.root}>
        <Tabs
          orientation="vertical"
          // variant="scrollable"
          value={value}
          onChange={handleChange}
          // aria-label="Vertical tabs example"
          className={classes.tabs}
        >
          <Tab label={GET_TRANS_LANG('EXIST_PROJECT')} {...a11yProps(0)} />
          <Tab label={GET_TRANS_LANG('CREATE_NEW_PROJECT')} {...a11yProps(1)} />

        </Tabs>
        <TabPanel value={value} index={0}>
          <Tab1
            Projects={props.Projects}
            GoProject={props.GoProject}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Tab2 
            SetcreateProjectInput={props.SetcreateProjectInput}
            CreateProjectInput={props.CreateProjectInput}
            CreateProject={props.CreateProject}
          
          />
        </TabPanel>
      </div>


    </Container>




  );
}