import React, { Component } from 'react';

import { connect } from 'react-redux';

import BlacklistPage from '../../pages/Blacklist/BlacklistPage';
import { BlacklistActions } from '../../store/actionCreator';

import * as BlacklistCRUD from './BlacklistCRUD';

class BlacklistContainer extends Component {
    componentDidMount() {
        BlacklistCRUD.GetBlacklistGroup();
    }

    componentDidUpdate(prevProps) {
        const { env_var, action_status } = this.props;
        if (
            (prevProps.env_var.get('selected_blacklist_group_id') !== env_var.get('selected_blacklist_group_id') ||
                (prevProps.action_status === '' && action_status === 'NEED_UPDATE_BLACKLIST')) &&
            env_var.get('selected_blacklist_group_id') !== undefined
        ) {
            BlacklistCRUD.GetBlacklist(env_var.get('selected_blacklist_group_id'));
        }

        if (prevProps.action_status === '' && action_status === 'NEED_UPDATE_BLACKLIST_GROUP') {
            BlacklistCRUD.GetBlacklistGroup();
        }
    }

    setEnvVar(value) {
        BlacklistActions.set_env_var(value);
    }

    render() {
        const { blacklist, blacklist_group, env_var } = this.props;
        return (
            <div>
                <BlacklistPage
                    blacklistGroup={blacklist_group}
                    blacklist={blacklist}
                    envVar={env_var}
                    setEnvVar={this.setEnvVar}
                    createBlacklistGroup={BlacklistCRUD.CreateBlacklistGroup}
                    reviseBlacklist={BlacklistCRUD.ReviseBlacklist}
                    deleteBlacklist={BlacklistCRUD.DeleteBlacklist}
                    deleteBlacklistGroup={BlacklistCRUD.DeleteBlacklistGroup}
                    createBlacklist={BlacklistCRUD.CreateBlacklist}
                />
            </div>
        );
    }
}

export default connect(({ common, blacklist }) => ({
    blacklist: blacklist.get('blacklist'),
    blacklist_group: blacklist.get('blacklist_group'),
    env_var: blacklist.get('env_var'),
    action_status: common.get('action_status'),
}))(BlacklistContainer);
