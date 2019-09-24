import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NameInput from "../containers/NameInputContainer";
import LoginButton from "../containers/LoginButtonContainer";

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
    render() {
        return <div className="App">
            <header className="App-header">
                <img src="/logo512.png" className="App-logo" alt="logo"/>
                <div className={'name-input-holder'}>
                    <NameInput />
                    <LoginButton />
                </div>

            </header>
        </div>
    };
}

export default Main;
