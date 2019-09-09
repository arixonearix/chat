import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ChatWindow from "./ChatWindow";
import ChatInput from "./ChatInput";

class MainChat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: props.login,
            tempMessage: '',
            messages: [
                {nickname:'Server', message:'Welcome message!'}
            ]
        };
    }

    componentWillMount() {
        window.socket.on('message', (message) => {
            this.setState(state => {
                state.messages.push(message);
                return {
                    messages: state.messages,
                    tempMessage: state.tempMessage
                };
            });
        });
        window.socket.on('notification', (data) => {
            window.toastr.info(data.message);
        });
    }

    handleChange(message) {
        this.setState({tempMessage: message});
    }
    sendMessage() {
        if(this.state.tempMessage) {
            window.socket.emit('message', this.state.tempMessage);
        } else {
            console.log('Enter message');
        }
    }
    render() {
        console.log(this.state);
        let messages = this.state.messages;
        return <div className="App">
                <ChatWindow messages={messages} />
                <ChatInput sendMessage={this.sendMessage.bind(this)} handleMessage={this.handleChange.bind(this)} />
        </div>
    };
}

export default MainChat;
