import React, { Component } from 'react';

import { connect } from 'react-redux';

import HeaderPage from '../../pages/Header/HeaderPage';

import { setNotiboxOpt } from '../../lib/common';

import ErrorBoundary from '../Common/ErrorBoundary';

class HeaderContainer extends Component {
    render() {
        const { loading, noti_opt } = this.props;

        return (
            <ErrorBoundary>
                <div>
                    <HeaderPage SetNotiboxOpt={setNotiboxOpt} Loading={loading} NotiOpt={noti_opt} />
                </div>
            </ErrorBoundary>
        );
    }
}

export default connect(({ common }) => ({
    noti_opt: common.get('noti_opt'),
    loading: common.get('loading'),
}))(HeaderContainer);
