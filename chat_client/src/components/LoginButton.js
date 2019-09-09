import React from 'react';
import '../App.css';

class LoginButton extends React.Component {
    render() {
        console.log(this.props);
        return <button
            type="button"
            className="btn btn-warning"
            onClick={this.props.sendLogin}
        >Login</button>
    };
}

export default LoginButton;
