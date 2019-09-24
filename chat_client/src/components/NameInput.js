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
        this.props.handleChange(event.target.value);
    }

    render() {
        return <div>
            <input
                type="text"
                className={'form-control'}
                onChange={this.handleChange.bind(this)}
            />
        </div>
    };
}

export default NameInput;
