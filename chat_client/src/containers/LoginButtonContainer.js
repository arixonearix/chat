import React, {Component} from 'react';
import LoginButton from "../components/LoginButton";
import {connect} from "react-redux";

const mapDispatchToProps = (dispatch) => {
    return {
        click: info => {
            dispatch();
        }
    };
};
const mapStateToProps = (state, props) => {

    return {
        login: props.login,
        socket: props.socket
    };
};

export default connect(mapDispatchToProps, mapStateToProps) (LoginButton);