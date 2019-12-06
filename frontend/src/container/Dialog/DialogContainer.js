import React, { Component } from 'react';

import { connect } from 'react-redux';

import DialogPage from '../../pages/Dialog/DialogPage';
import { DialogActions } from '../../store/actionCreator';

import * as DialogCRUD from './DialogCRUD';

class DialogContainer extends Component {
    componentDidMount() {
        DialogCRUD.getDialogFlow();
    }

    componentDidUpdate(prevProps) {
        const { env_var, action_status } = this.props;
        
        if (prevProps.action_status === '' && action_status === 'NEED_UPDATE_DIALOG_FLOW') {
            DialogCRUD.getDialogFlow();
        }
    }

    setEnvVar(value) {
        DialogActions.set_env_var(value);
    }

    render() {
        const { dialog_flow, dialog, env_var } = this.props;

        return (
            <div>
                <DialogPage flow_data={dialog_flow} onChange={DialogCRUD.updateDialogFlow}/>
            </div>
        );
    }
}

export default connect(({ common, dialog }) => ({
    dialog_flow: dialog.get('dialog_flow'),
    dialog: dialog.get('dialog'),
    env_var: dialog.get('env_var'),
    action_status: common.get('action_status'),
}))(DialogContainer);
