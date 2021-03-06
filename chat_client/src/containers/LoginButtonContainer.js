import React from 'react';
import {connect} from "react-redux";
import {makeLogin} from '../actions/actions';
import LoginButton from "../components/LoginButton";

const mapDispatchToProps = (dispatch) => {
    return {
        click: () => {
            dispatch(makeLogin());
        }
    };
};

export default connect(null, mapDispatchToProps) (LoginButton);