import React from 'react';
import logo from '../logo.svg';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NameInput from "./NameInput";
import LoginButton from "../components/LoginButton";

class ChatMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        };
    }
    updateLogin = (login) => {
        alert(login);
        this.setState(state => {
            const list = state.list.push(login);
            return {
                list,
                value: '',
            };
        });
    };
    render() {
        return <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <div>
                    {this.state.map((value) => {
                        return value;
                    })}
                    <NameInput />
                    <LoginButton login={this.state.login} updateLogin={this.updateLogin} socket={this.props.socket}/>
                </div>

            </header>
        </div>
    };
}

export default ChatMain;
