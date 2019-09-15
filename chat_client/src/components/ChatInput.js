import React from 'react';
import '../App.css';

class ChatInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tempMessage: ''
        };
    }
    handleChange(event) {
        this.props.handleMessage(event.target.value);
    }
    handleKeyDown(event) {
        if (event.key === 'Enter') {
            this.sendMessage();
        }
    }
    sendMessage() {
        this.props.sendMessage();
        this.refs.chatInput.value = '';
    }
    render() {
        return <div className={'input-holder'}>
            <input
                ref="chatInput"
                type="text"
                className={'form-control chat-input-text'}
                onChange={this.handleChange.bind(this)}
                onKeyDown={this.handleKeyDown.bind(this)}
            />
            <button
                className={'btn btn-success chat-input-button'}
                onClick={this.sendMessage.bind(this)}
            >SEND</button>
        </div>
    };
}

export default ChatInput;
