import React, { Component } from 'react';

import { connect } from 'react-redux';

import ChatPage from '../../pages/Chat/ChatPage';
import { ChatActions } from '../../store/actionCreator';

import * as ChatCRUD from './ChatCRUD';
import { setLoading, setNotiboxOpt, setActionStatus } from '../../lib/common';

setActionStatus

class ChatContainer extends Component {
    
    setEnvVar(value) {
        ChatActions.set_env_var(value);
    }

    setChat(value) {
        ChatActions.set_chat_data(value);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.action_status === '' && this.props.action_status === 'NEED_UPDATE_CHAT') {
            const { chat_data, } = this.props;
           
            this.updateChat(chat_data.get(chat_data.size-1));
        }
    }

    async updateChat(value) {
        const { chat_data, } = this.props;

        const res = await ChatCRUD.UpdateChat(value);
        this.setChat(chat_data.push(res.response));

        setActionStatus('');
    }

    render() {
        const { chat_data, loading } = this.props;

        return (
            <div>
                <ChatPage loading={loading} chat={chat_data} setChat={this.setChat} />
            </div>
        );
    }
}

export default connect(({ common, chat }) => ({
    chat_data: chat.get('chat_data'),
    loading: common.get('loading'),
    action_status: common.get('action_status'),
}))(ChatContainer);
