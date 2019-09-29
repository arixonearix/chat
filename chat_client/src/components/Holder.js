import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainChat from "../containers/MainChatContainer";
import Main from "./Main";

class Holder extends React.Component {
    componentWillMount() {
        window.socket.on('control', (message) => {
            this.props.handleControl(message);
        });
    }
    render() {
        let props = this.props.logins;
        let messages = this.props.messages;

        return <div>
            {props.switchPages
                ? <MainChat messages={messages} />
                : <Main />
            }
        </div>
    };
}

export default Holder;
