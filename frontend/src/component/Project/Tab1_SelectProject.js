import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import {GET_TRANS_LANG} from "../../lib/common";

const useStyles = makeStyles(theme => ({
  root: {
    // width: '100%',
    width: 360,
    overflow: 'auto',
    maxHeight: 400,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline-block',
    textOverflow:'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: 300


  },
}));




const Tab1 = (props) => {

  const classes = useStyles();
  const { Projects } = props;
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  function handleListItemClick(event, index) {
    setSelectedIndex(index);
  }
  function handleListItemDblClick(event,index)
  {
      props.GoProject(index)
  }
  const prj=[
    {'project_name':'aaa',roles:['admin','aa']},
    {'project_name':'aaa',roles:['admin','aa']},
    {'project_name':'aaa',roles:['admin','aa']},
    {'project_name':'aaa',roles:['admin','aa']},
    {'project_name':'aaa',roles:['admin','aa']},
    {'project_name':'aaa',roles:['admin','aa']},
    {'project_name':'aaa',roles:['admin','aa']},
    {'project_name':'aaa',roles:['admin','aa']},
    {'project_name':'aaa',roles:['admin','aa']},
  ]

  return (

    
      <List className={classes.root}>
        {Projects.length==0&&GET_TRANS_LANG('NOT_EXIST_PROJECT')}
        {Projects.map((project, idx) => {
          return <ProjectList Classes={classes}
            key={idx}
            Index={idx}
            Project={project}
            SelectedIndex={selectedIndex}
            HandleListItemClick={handleListItemClick}
            HandleListItemDblClick={handleListItemDblClick}
          />
        })}
      </List>
    
  )
}

function ProjectList(props) {
  const { Index, Project, Classes, SelectedIndex, HandleListItemClick ,HandleListItemDblClick} = props;

  return (
    <React.Fragment>
      <ListItem alignItems="flex-start"
        button
        selected={SelectedIndex === Index}
        onClick={event => HandleListItemClick(event, Index)}
        onDoubleClick={event=>HandleListItemDblClick(event,Index)}
        divider
      >
        <ListItemText primary={
          <React.Fragment>
          <Typography
            component="span"
            variant="body1"
            className={Classes.inline}
            color="primary"
          >
          {Project.project_name}  ({Project.role})
          </Typography>
           </React.Fragment>

          }
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={Classes.inline}
                color="textPrimary"
              >
                {/*{'fadfadsfasdfdsfsdafdsafasdfdsafadsfsfafadfadsfasdfdsfsdafdsafasdfdsafadsfsfafadfadsfasdfdsfsdafdsafasdfdsafadsfsfa'}*/}
                {Project.project_desc}
              </Typography>

            </React.Fragment>
          }
        />
      </ListItem>
      
    </React.Fragment>
  );
}





export default Tab1