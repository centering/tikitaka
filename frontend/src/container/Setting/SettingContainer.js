import React, { Component } from 'react';

import { connect } from 'react-redux';
import { SettingActions } from '../../store/actionCreator';
import * as SettingCRUD from './SettingCRUD';
import SettingPage from '../../pages/Setting/SettingPage';

class SettingContainer extends Component {
    componentDidMount() {
        SettingCRUD.GetSetting();
    }

    componentDidUpdate(prevProps) {
        const { action_status } = this.props;

        if (prevProps.action_status === '' && action_status === 'NEED_UPDATE') {
            SettingCRUD.GetSetting();
        }
    }

    setSetting(value) {
        SettingActions.set_setting(value);
    }

    render() {
        const { setting } = this.props;
        return (
            <>
                <SettingPage setSetting={this.setSetting} setting={setting} reviseSetting={SettingCRUD.ReviseSetting} />
            </>
        );
    }
}

export default connect(({ common, setting }) => ({
    setting: setting.get('setting'),
    action_status: common.get('action_status'),
}))(SettingContainer);
