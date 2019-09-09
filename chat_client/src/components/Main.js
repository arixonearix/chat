import React from 'react';
import logo from '../logo.svg';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NameInput from "./NameInput";
import LoginButton from "../components/LoginButton";


class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            switchPages: props.switchPages
        };
    }
    updateLogin = (login) => {
        this.setState({ login: login });
    };

    sendLogin = () => {
        window.socket.emit('login', this.state.login);
        this.state.switchPages(true);
    };

    render() {
        return <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <div className={'name-input-holder'}>
                    <NameInput updateLogin={this.updateLogin}/>
                    <LoginButton login={this.state.login} sendLogin={this.sendLogin}/>
                </div>

            </header>
        </div>
    };
}

export default Main;
