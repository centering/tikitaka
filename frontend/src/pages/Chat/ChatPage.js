import React, { useState } from 'react';
import { ThemeProvider, MessageList, Message, MessageText, MessageGroup } from '@livechat/ui-kit';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

const styles = makeStyles(() => ({
    MessageOwn: { border: '1px #D4F4FA solid', borderRadius: '10px 10px 10px 10px', backgroundColor: '#D4F4FA', padding: '8px', marginTop: '5px' },
    MessageCustomer: { border: '1px #E4F7BA solid', borderRadius: '10px 10px 10px 10px', backgroundColor: '#E4F7BA', padding: '8px' },
}));

const ChatPage = ({ chat, updateChat, setChat, loading }) => {
    const [text, setText] = useState('');

    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            setText('');
            setChat(chat.push(text));
        }
    }

    return (
        <>
            <h2>대화하기</h2>
            <div style={{ width: '100%', overflow: 'auto', height: 700, border: '0.1em inset #009688' }}>
                <ThemeProvider>
                    <MessageList id="dialog" active>
                        {chat.map((utterance, idx) => {
                            return <ShowChat utterance={utterance} key={idx} idx={idx} />;
                        })}
                    </MessageList>
                </ThemeProvider>
            </div>
            <TextField
                value={text}
                fullWidth
                disabled={loading}
                label="대화입력"
                autoFocus
                margin="normal"
                onKeyPress={e => handleKeyPress(e)}
                onChange={e => setText(e.target.value)}
            />
        </>
    );
};

const ShowChat = ({ utterance, idx }) => {
    const classes = styles();
    return (
        <MessageGroup>
            <Message isOwn={idx % 2 === 0} authorName={idx % 2 === 0 ? 'Me' : 'Bot'}>
                <MessageText className={idx % 2 === 0 ? classes.MessageOwn : classes.MessageCustomer}>{utterance}</MessageText>
            </Message>
        </MessageGroup>
    );
};

export default ChatPage;
