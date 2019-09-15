import React from 'react';
import '../App.css';

class LoginButton extends React.Component {
    render() {
        return <button
            type="button"
            className="btn btn-warning"
            onClick={this.props.click}
        >Login</button>
    };
}

export default LoginButton;
