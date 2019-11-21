import React, { useState } from 'react';
import Sidebar from 'react-sidebar';
import GroupCreate from '../Group/GroupCreate';
import Button from '@material-ui/core/Button';
import GroupList from '../Group/GroupList';

const Bot = () => {
    const [open, setOpen] = useState(false);
    setOpen;
    return (
        <Sidebar
            sidebar={<b>Sidebar content</b>}
            open={open}
            onSetOpen={setOpen}
            pullRight
            shadow={false}
            styles={{
                sidebar: {
                    background: 'white',
                    width: 400,

                    border: '1px outset gray',
                },
                root: {
                    left: 250,
                    top: 80,
                    overfloY: 'hidden',
                },
                overlay: {
                    backgroundColor: '',
                },
            }}
        >
            <div style={{ float: 'right' }}>
                <Button variant="outlined" size="small" onClick={() => setOpen(true)}>
                    대화하기
                </Button>
            </div>
        </Sidebar>
    );
};

export default Bot;
