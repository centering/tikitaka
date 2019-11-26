import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import RefreshIcon from '@material-ui/icons/Refresh';
import { shuffleRandom } from '../../lib/common';

const MixMatch = ({ set1, set2 }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [idx, setIdx] = useState(0);

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClick = event => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);

    const posible_list = [];

    set1.forEach(set1_elm => {
        set2.forEach(set2_elm => {
            posible_list.push({ set1: set1_elm.value, set2: set2_elm.value });
        });
    });

    const random_idx = shuffleRandom(posible_list.length - 1);

    const refresh = () => {
        const new_idx = idx + 1 >= random_idx.length ? 0 : idx + 1;
        setIdx(new_idx);
    };

    return (
        <div style={{ float: 'right' }}>
            <Button onClick={handleClick} variant="outlined" size="small" color="primary">
                조합 보기
            </Button>

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
                <div style={{ width: 400, margin: 10, height: 40 }}>
                    <span style={{ float: 'right' }}>
                        <RefreshIcon onClick={refresh} />
                    </span>
                    Q : {posible_list[random_idx[idx]].set1}
                    <br />A : {posible_list[random_idx[idx]].set2}
                </div>
            </Popover>
        </div>
    );
};

export default MixMatch;
