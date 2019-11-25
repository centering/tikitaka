import React, { Component } from 'react';

import { connect } from 'react-redux';

import ChatPage from '../../pages/Chat/ChatPage';
import { ChatActions } from '../../store/actionCreator';

import * as ChatCRUD from './ChatCRUD';

class ChatContainer extends Component {
    // componentDidUpdate(prevProps) {
    //     const { env_var, action_status } = this.props;
    // }

    setEnvVar(value) {
        ChatActions.set_env_var(value);
    }

    setChat(value) {
        ChatActions.set_chat_data(value);
    }

    render() {
        const { chat_data, loading } = this.props;

        return (
            <div>
                <ChatPage loading={loading} chat={chat_data} setChat={this.setChat} updateChat={ChatCRUD.updateChat} />
            </div>
        );
    }
}

export default connect(({ common, chat }) => ({
    chat_data: chat.get('chat_data'),
    loading: common.get('loading'),
    action_status: common.get('action_status'),
}))(ChatContainer);
