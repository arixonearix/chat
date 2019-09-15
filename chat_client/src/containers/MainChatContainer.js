import React from 'react';
import {connect} from "react-redux";
import {changeTempLogin, changeTempMessage, newMessage, sendTempMessage} from '../actions/actions';
import NameInput from "../components/NameInput";
import MainChat from '../components/MainChat';

const mapDispatchToProps = (dispatch) => {
    return {
        handleMessage: (message) => {
            dispatch(changeTempMessage(message));
        },
        sendMessage: () => {
            dispatch(sendTempMessage());
        },
        newMessage: (messageObject) => {
            dispatch(newMessage(messageObject));
        }
    };
};
function mapStateToProps(state, props) {
    return {
        logins: state.logins,
        messages: props.messages
    };
}

export default connect(mapStateToProps, mapDispatchToProps) (MainChat);