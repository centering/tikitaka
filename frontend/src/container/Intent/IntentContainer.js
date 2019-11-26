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
        const { intent, intent_list, env_var } = this.props;
        return (
            <div>
                <IntentPage />
            </div>
        );
    }
}

export default connect(({ common, scenario }) => ({
    
}))(IntentContainer);
