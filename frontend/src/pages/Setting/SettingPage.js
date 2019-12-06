import React from 'react';

import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';

const SettingPage = ({ setting, reviseSetting }) => {
    function onSave() {
        const value = setting.reduce((obj, set) => {
            obj[set.name] = set.value;
            return obj;
        }, {});
        reviseSetting(value);
    }
    return (
        <>
            <h2>설정</h2>

            {setting.map((set, idx) => {
                return <ShowSetting key={idx} setting={set} />;
            })}

            <Button onClick={onSave} variant="contained" color="primary">
                저장
            </Button>
        </>
    );
};

const ShowSetting = ({ setting }) => {
    function handleChange(e, value) {
        setting.value = value;
    }
    return (
        <div style={{ width: '400px' }}>
            <Typography gutterBottom>{setting.name}</Typography>
            <InputLabel>{setting.description}</InputLabel>
            <Slider onChange={handleChange} defaultValue={setting.value} min={0} max={1} step={0.01} marks valueLabelDisplay="on" />
        </div>
    );
};

export default SettingPage;
