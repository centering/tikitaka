import React from 'react';

import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

const SettingPage = ({ setting, reviseSetting, setSetting }) => {
    const keys = setting.keySeq().toArray();

    return (
        <>
            <h2>설정</h2>

            {keys.map((key, idx) => {
                return <ShowSetting setSetting={setSetting} key={idx} keyName={key} setting={setting} />;
            })}

            <Button onClick={() => reviseSetting(setting.toJS())} variant="contained" color="primary">
                저장
            </Button>
        </>
    );
};

const ShowSetting = ({ keyName, setting, setSetting }) => {
    function handleChange(e, value) {
        const new_state = setting.set(keyName, value);
        setSetting(new_state);
    }

    return (
        <div style={{ width: '400px' }}>
            <Typography gutterBottom>{keyName}</Typography>
            <Slider onChange={handleChange} defaultValue={setting.get(keyName)} min={0} max={1} step={0.01} marks valueLabelDisplay="auto" />
        </div>
    );
};

export default SettingPage;
