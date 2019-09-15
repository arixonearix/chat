import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ChatWindow from "./ChatWindow";
import ChatInput from "./ChatInput";

class MainChat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: props.messages
        };
    }
    componentWillMount() {
        window.socket.on('message', (message) => {
            this.newMessage(message);
        });
        window.socket.on('notification', (data) => {
            window.toastr.info(data.message);
        });
    }
    handleChange(event) {
        this.props.handleMessage(event);
    }
    sendMessage() {
        this.props.sendMessage();
    }
    newMessage(messageObject){
        this.props.newMessage(messageObject);
    }
    render() {
        console.log(this.state);
        return <div className="App">
                <ChatWindow messages={this.state.messages.messages} />
                <ChatInput sendMessage={this.sendMessage.bind(this)} handleMessage={this.handleChange.bind(this)} />
        </div>
    };
}

export default MainChat;
