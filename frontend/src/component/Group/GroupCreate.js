import React from 'react';
import Popover from '@material-ui/core/Popover';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import AddIcon from '@material-ui/icons/Add';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(theme => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

const GroupCreate = ({ createGroup }) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [text, setText] = React.useState('');

    const handleClick = event => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            createGroup({ name: text });
            setText('');
            handleClose();
        }
    }

    const open = Boolean(anchorEl);

    return (
        <>
            <Chip icon={<AddIcon />} label="추가" onClick={handleClick} variant="outlined" />
            <Popover
                placement="bottom-start"
                open={open}
                onClose={handleClose}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <TextField
                    value={text}
                    label="그룹 이름"
                    className={classes.textField}
                    autoFocus
                    margin="normal"
                    onKeyPress={e => handleKeyPress(e)}
                    onChange={e => setText(e.target.value)}
                />
            </Popover>
        </>
    );
};

export default GroupCreate;
