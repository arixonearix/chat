import React, {Component} from 'react';
import LoginButton from "../components/LoginButton";
import {connect} from "react-redux";
import NameInput from "../components/NameInput";

const mapDispatchToProps = (dispatch) => {
    return {
        click: () => {
            alert('sdf');
        }
    };
};
function mapStateToProps(state) {

    return {
        ...state
    };
}

export default connect(mapDispatchToProps, mapStateToProps) (NameInput);