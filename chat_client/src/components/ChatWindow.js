import React from 'react';
import '../App.css';
import Message from "./Message";

class ChatWindow extends React.Component {
    render() {
        let list = this.props.messages.map((message ,index) => {
            return <div key={index}>
                <Message nickname={message.nickname} message={message.message} />
            </div>
        });
        return <div className={'chat-holder'}>
            {list}
        </div>;
    };
}

export default ChatWindow;
