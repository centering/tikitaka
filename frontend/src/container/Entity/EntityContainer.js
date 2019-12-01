import React, { Component } from 'react';

import { connect } from 'react-redux';

import EntityPage from '../../pages/Entity/EntityPage';
import { EntityActions } from '../../store/actionCreator';

import * as EntityCRUD from './EntityCRUD';

class EntityContainer extends Component {
    componentDidMount() {
        EntityCRUD.GetEntityList();
    }

    componentDidUpdate(prevProps) {
        const { env_var, action_status } = this.props;
        
    }

    setEnvVar(value) {
        EntityActions.set_env_var(value);
    }

    render() {
        const { entity_list, env_var } = this.props;
        return (
            <div>
                <EntityPage />
            </div>
        );
    }
}

export default connect(({ common, entity_list }) => ({
    
}))(EntityContainer);
