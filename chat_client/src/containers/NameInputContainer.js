import React from 'react';
import {connect} from "react-redux";
import {changeTempLogin} from '../actions/actions';
import NameInput from "../components/NameInput";

const mapDispatchToProps = (dispatch) => {
    return {
        handleChange: (login) => {
            dispatch(changeTempLogin(login));
        }
    };
};
function mapStateToProps(state) {
    return {
        ...state
    };
}

export default connect(mapStateToProps, mapDispatchToProps) (NameInput);