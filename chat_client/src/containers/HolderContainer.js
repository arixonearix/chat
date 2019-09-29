import React from 'react';
import {connect} from "react-redux";
import {
    changeTempMessage,
    closeConnection,
    handleControl,
    makeLogin,
    newMessage,
    sendTempMessage
} from '../actions/actions';
import LoginButton from "../components/LoginButton";
import Holder from '../components/Holder';

const mapDispatchToProps = (dispatch) => {
    return {
        handleControl: (message) => {
            dispatch(handleControl(message));
        }
    };
};
function mapStateToProps(state) {
    return {
        ...state
    };
}

export default connect(mapStateToProps, mapDispatchToProps) (Holder);