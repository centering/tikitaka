import React, { Component } from 'react';

import { connect } from 'react-redux';

import DialogPage from '../../pages/Dialog/DialogPage';
import { DialogActions } from '../../store/actionCreator';

import * as DialogCRUD from './DialogCRUD';

class DialogContainer extends Component {
    componentDidMount() {
        DialogCRUD.getDialogFlow();
    }

    setEnvVar(value) {
        DialogActions.set_env_var(value);
    }

    render() {
        const { dialog_flow, dialog, env_var } = this.props;

        console.log(dialog_flow);

        return (
            <div>
                <DialogPage flow_data={dialog_flow} />
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
