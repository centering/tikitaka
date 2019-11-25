import React, { Component } from 'react';

import { connect } from 'react-redux';

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

    render() {
        const { setting } = this.props;
        return (
            <>
                <SettingPage setting={setting} reviseSetting={SettingCRUD.ReviseSetting} />
            </>
        );
    }
}

export default connect(({ common, setting }) => ({
    setting: setting.get('setting'),
    action_status: common.get('action_status'),
}))(SettingContainer);
