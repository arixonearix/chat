import React from 'react';
import '../App.css';

class Message extends React.Component {
    render() {
        return <div>
            <span className={'badge badge-secondary'}>{this.props.nickname}: </span>
            <span>{this.props.message} </span>
        </div>
    };
}

export default Message;
