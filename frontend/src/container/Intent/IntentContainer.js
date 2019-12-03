import React, { Component } from 'react';

import { connect } from 'react-redux';

import IntentPage from '../../pages/Intent/IntentPage';
import { IntentActions } from '../../store/actionCreator';

import * as IntentCRUD from './IntentCRUD';

class IntentContainer extends Component {
    componentDidMount() {
        IntentCRUD.GetIntentList();
    }

    componentDidUpdate(prevProps) {
        const { env_var, action_status } = this.props;
        
    }

    setEnvVar(value) {
        IntentActions.set_env_var(value);
    }

    render() {
        const { intent_list, env_var } = this.props;
        return (
            <div>
                <IntentPage 
                    intent_list={intent_list}
                    createIntent={IntentCRUD.CreateIntent}
                    importIntents={IntentCRUD.ImportIntents}
                    exportIntents={IntentCRUD.ExportIntents}
                    deleteIntents={IntentCRUD.DeleteIntents}
                    envVar={env_var}
                />
            </div>
        );
    }
}

export default connect(({ common, intent }) => ({
    intent_list: intent.get('intent_list'),
    env_var: intent.get('env_var'),
    action_status: common.get('action_status'),
}))(IntentContainer);
 