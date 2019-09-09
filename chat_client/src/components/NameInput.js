import React from 'react';
import logo from '../logo.svg';
import '../App.css';

class NameInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: ''
        };
    }
    handleChange(event) {
        this.setState({login: event.target.value});
        this.props.updateLogin(event.target.value);
    }
    render() {
        return <div className={'input-holder'}>
            <input
                type="text"
                className={'form-control'}
                onChange={this.handleChange.bind(this)}
            />
        </div>
    };
}

export default NameInput;
